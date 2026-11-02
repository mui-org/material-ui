import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import getJSExports from './getJSExports';

describe('@mui/codemod', () => {
  describe('utils', () => {
    describe('getJSExports', () => {
      let tempDir;

      beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-codemod-'));
        vi.spyOn(process, 'cwd').mockReturnValue(tempDir);
      });

      afterEach(() => {
        vi.restoreAllMocks();
        fs.rmSync(tempDir, { recursive: true, force: true });
      });

      it('should ignore a Babel config that targets another Babel major', () => {
        fs.writeFileSync(
          path.join(tempDir, 'babel.config.cjs'),
          'module.exports = (api) => { api.assertVersion(7); return {}; };\n',
        );
        const file = path.join(tempDir, 'index.js');
        fs.writeFileSync(file, "export { default } from './a';\nexport { b as c } from './b';\n");

        expect([...getJSExports(file)]).to.deep.equal(['default', 'c']);
      });
    });
  });
});
