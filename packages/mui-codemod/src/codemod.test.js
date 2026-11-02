import { describe, it, expect } from 'vitest';
import { spawnSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

function runCli(...args) {
  return spawnSync(process.execPath, [path.join(__dirname, 'codemod.js'), ...args], {
    // Run outside the repo, like a user. The root Babel config does not load in jscodeshift workers.
    cwd: os.tmpdir(),
    encoding: 'utf8',
  });
}

describe('@mui/codemod', () => {
  describe('CLI', { timeout: 60000 }, () => {
    it('should print the usage', () => {
      const { status, stdout } = runCli('--help');

      expect(stdout).to.include('npx @mui/codemod <codemod> <paths...>');
      expect(status).to.equal(0);
    });

    it.each(['v5.0.0/top-level-imports', 'v5.0.0/path-imports'])(
      'should run %s on a path outside the package',
      (codemod) => {
        const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-codemod-'));
        const file = path.join(directory, 'index.js');
        const source =
          "import Button from '@mui/material/Button';\nimport { Card } from '@mui/material';\n";
        fs.writeFileSync(file, source);

        try {
          const { stdout } = runCli(codemod, directory, '--dry', '--', '--a=b');

          expect(stdout).to.match(/Executing command: jscodeshift .* --a=b .* --dry/);
          expect(stdout).to.include('1 ok');
          expect(fs.readFileSync(file, 'utf8')).to.equal(source);
        } finally {
          fs.rmSync(directory, { recursive: true });
        }
      },
    );
  });
});
