import path from 'node:path';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import main from './testModuleAugmentation';

const { compile, glob } = vi.hoisted(() => ({
  compile: vi.fn<(config: string) => Promise<void>>(),
  glob: vi.fn<() => Promise<string[]>>(),
}));

vi.mock('./compile', () => ({ default: compile }));
vi.mock('fast-glob', () => ({ default: glob }));

describe('module augmentation runner', () => {
  const configs = ['first', 'second', 'third'].map((name) =>
    path.join(import.meta.dirname, 'material', `${name}.tsconfig.json`),
  );
  let exitCode: typeof process.exitCode;
  let log: MockInstance<typeof console.log>;

  beforeEach(() => {
    exitCode = process.exitCode;
    glob.mockResolvedValue(configs);
    log = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.exitCode = exitCode;
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('limits compiler processes and starts the next fixture as soon as one finishes', async () => {
    const tasks = configs.map(() => Promise.withResolvers<void>());
    const twoStarted = Promise.withResolvers<void>();
    const threeStarted = Promise.withResolvers<void>();
    compile.mockImplementation((config) => {
      const index = configs.indexOf(config);
      if (index === 1) {
        twoStarted.resolve();
      } else if (index === 2) {
        threeStarted.resolve();
      }
      return tasks[index].promise;
    });

    const run = main(['--concurrency', '2']);
    await twoStarted.promise;
    expect(compile).toHaveBeenCalledTimes(2);
    expect(compile).toHaveBeenNthCalledWith(1, configs[0]);
    tasks[1].resolve();
    await threeStarted.promise;
    tasks[2].resolve();
    tasks[0].resolve();
    await run;
    expect(log).toHaveBeenCalledTimes(3);
  });

  it('reports a compiler failure and continues with the remaining fixtures', async () => {
    compile.mockRejectedValueOnce(new Error('Type error')).mockResolvedValue(undefined);

    await main(['--concurrency', '1']);

    expect(process.exitCode).to.equal(1);
    expect(console.error).toHaveBeenCalledWith(
      `FAIL ${path.join('test/moduleAugmentation/material/first.tsconfig.json')}\nType error`,
    );
    expect(compile).toHaveBeenCalledTimes(3);
    expect(log).toHaveBeenCalledTimes(2);
  });

  it('rejects a run with no fixtures', async () => {
    glob.mockResolvedValue([]);
    await expect(main([])).rejects.toThrow('No module augmentation fixtures found.');
    expect(compile).not.toHaveBeenCalled();
  });

  it.each(['0', '-1', '1.5', 'NaN', 'Infinity'])(
    'rejects invalid concurrency before starting compilers: %s',
    async (concurrency) => {
      await expect(main([`--concurrency=${concurrency}`])).rejects.toThrow(
        'Concurrency must be a positive integer.',
      );
      expect(compile).not.toHaveBeenCalled();
    },
  );
});
