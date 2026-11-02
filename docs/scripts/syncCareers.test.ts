// @vitest-environment node
import * as fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import syncCareers from './syncCareers';

const apiUrl = 'https://example.com/api/careers';
const job = {
  id: 'current-role',
  title: 'Operations Engineer',
  category: 'Operations',
  description: '<p>Build internal tools.</p>',
  summary: '',
  applicationUrl: 'https://example.com/apply',
  isFutureRole: false,
};

describe('syncCareers', () => {
  let directory: string;

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'mui-careers-'));
  });

  afterEach(async () => {
    vi.unstubAllGlobals();
    await fs.rm(directory, { recursive: true, force: true });
  });

  it('groups current and future roles separately and counts only current roles', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>().mockResolvedValue(
        Response.json({
          data: [
            job,
            { ...job, id: 'future-sales', category: 'Sales', isFutureRole: true },
            { ...job, id: 'current-engineering', category: 'Engineering' },
            { ...job, id: 'future-engineering', category: 'Engineering', isFutureRole: true },
          ],
        }),
      ),
    );

    await syncCareers(apiUrl, directory);

    const snapshot = JSON.parse(
      await fs.readFile(path.join(directory, 'data/careers/roles.json'), 'utf8'),
    );
    expect(snapshot.count).to.equal(2);
    expect(snapshot.roles.map((category: { title: string }) => category.title)).to.deep.equal([
      'Engineering',
      'Operations',
    ]);
    expect(snapshot.futureRoles.map((category: { title: string }) => category.title)).to.deep.equal(
      ['Engineering', 'Sales'],
    );
    expect(
      snapshot.roles.flatMap((category: { roles: { id: string }[] }) =>
        category.roles.map((role) => role.id),
      ),
    ).to.deep.equal(['current-engineering', 'current-role']);
    expect(
      snapshot.futureRoles.flatMap((category: { roles: { id: string }[] }) =>
        category.roles.map((role) => role.id),
      ),
    ).to.deep.equal(['future-engineering', 'future-sales']);
  });

  it.each([false, true])(
    'writes an empty array for the other section when isFutureRole is %s',
    async (isFutureRole) => {
      vi.stubGlobal(
        'fetch',
        vi
          .fn<typeof fetch>()
          .mockResolvedValue(Response.json({ data: [{ ...job, isFutureRole }] })),
      );

      await syncCareers(apiUrl, directory);

      const snapshot = JSON.parse(
        await fs.readFile(path.join(directory, 'data/careers/roles.json'), 'utf8'),
      );
      expect(snapshot.count).to.equal(isFutureRole ? 0 : 1);
      expect(snapshot.roles).to.have.length(isFutureRole ? 0 : 1);
      expect(snapshot.futureRoles).to.have.length(isFutureRole ? 1 : 0);
    },
  );
});
