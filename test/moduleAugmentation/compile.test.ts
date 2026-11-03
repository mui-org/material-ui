import path from 'node:path';
import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import type * as compileModule from './compile';

const execute = vi.hoisted(() => vi.fn<() => Promise<{ stdout: string; stderr: string }>>());

vi.mock('node:child_process', async () => {
  const { promisify } = await import('node:util');
  return { exec: Object.assign(vi.fn(), { [promisify.custom]: execute }) };
});

describe('module augmentation compiler', () => {
  let compile: typeof compileModule.default;
  const declaration = path.resolve(
    import.meta.dirname,
    '../../packages/mui-material/build/index.d.ts',
  );

  beforeAll(async () => {
    ({ default: compile } = await import('./compile'));
  });

  afterEach(() => {
    execute.mockReset();
  });

  it('waits for the compiler process to finish', async () => {
    const result = Promise.withResolvers<{ stdout: string; stderr: string }>();
    execute.mockReturnValue(result.promise);
    const completed = vi.fn();
    const run = compile('fixture.tsconfig.json').then(completed);

    await Promise.resolve();
    expect(completed).not.toHaveBeenCalled();
    result.resolve({ stdout: declaration, stderr: '' });
    await run;
    expect(completed).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith(
      `pnpm tsc --project "${path.resolve('fixture.tsconfig.json')}" --listFiles --pretty false`,
      { cwd: import.meta.dirname, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
    );
  });

  it('rejects compiler failures with diagnostics without the file list', async () => {
    execute.mockRejectedValue(
      Object.assign(new Error('Command failed'), {
        stdout: `fixture.tsx(1,1): error TS2345: Invalid breakpoint.\n${declaration}\n`,
      }),
    );

    await expect(compile('fixture.tsconfig.json')).rejects.toThrow(
      /^fixture\.tsx\(1,1\): error TS2345: Invalid breakpoint\.$/,
    );
  });
});

describe.each([
  { name: 'POSIX', paths: path.posix, root: '/repo/material-ui' },
  { name: 'Windows', paths: path.win32, root: 'C:\\repo\\material-ui' },
])('module augmentation file guard on $name', ({ paths, root }) => {
  const fixtureRoot = paths.join(root, 'test/moduleAugmentation/material');
  let assertBuiltDeclarations: typeof compileModule.assertBuiltDeclarations;

  beforeAll(async () => {
    vi.resetModules();
    vi.doMock('node:path', () => ({ default: paths }));
    ({ assertBuiltDeclarations } = await import('./compile'));
  });

  afterAll(() => {
    vi.doUnmock('node:path');
    vi.resetModules();
  });

  function compile(libraryFile: string) {
    // TypeScript lists files with forward slashes, including on Windows.
    const output = [
      paths.join(root, libraryFile),
      paths.join(fixtureRoot, 'breakpointsDefault.spec.tsx'),
    ]
      .map((file) => file.replaceAll('\\', '/'))
      .join('\r\n');

    assertBuiltDeclarations(output, paths.join(root, 'packages'));
  }

  it.each(['ts', 'mts', 'cts'])(
    'accepts the fixture with built .d.%s declarations',
    (extension) => {
      expect(() =>
        compile(`packages/mui-material/build/styles/index.d.${extension}`),
      ).not.to.throw();
    },
  );

  it.each([
    'packages/mui-material/src/styles/index.d.ts',
    'packages/mui-material/src/styles/index.d.mts',
    'packages/mui-material/src/Grid/Grid.tsx',
    'packages/mui-material/build/Grid/Grid.tsx',
  ])('rejects library source: %s', (file) => {
    expect(() => compile(file)).to.throw('Consumer test loaded library source:');
  });
});
