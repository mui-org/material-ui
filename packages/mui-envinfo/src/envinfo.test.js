import { describe, expect, it } from 'vitest';
import { isJsdom } from '@mui/internal-test-utils/env';

const { execFileSync } = require('child_process');
const path = require('path');

describe('@mui/envinfo', () => {
  const packagePath = __dirname;
  const testProjectPath = path.resolve(path.dirname(packagePath), 'test');

  function execEnvinfo(args) {
    const envinfoPath = path.resolve(packagePath, 'envinfo.js');
    return execFileSync('node', [envinfoPath, ...args], {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: testProjectPath,
    });
  }

  it.skipIf(!isJsdom())('includes info about the environment relevant to MUI', function test() {
    const envinfoJSON = execEnvinfo(['--json']);

    const envinfo = JSON.parse(envinfoJSON);

    // chai doesn't have expect.any(String) like jest so we have to use what's available
    // We basically want to test like https://github.com/eps1lon/testing-library-envinfo/blob/2543092f4e4af02d79e306ec6546a9c12b258675/index.test.js#L20-L68
    // The specific versions change over time so we can't use snapshots.
    expect(envinfo).to.have.nested.property('Binaries.Node');
    expect(envinfo).to.have.nested.property('Binaries.pnpm');
    expect(envinfo).to.have.nested.property('Binaries.npm');
    // CI doesn't install all the covered browsers. Simply asserting that it does print browsers.
    expect(envinfo).to.have.nested.property('Browsers');
    // Non-exhaustive list of `@mui/*` packages
    expect(envinfo).to.have.nested.property('npmPackages.@mui/material');
    // Other libraries
    expect(envinfo).to.have.nested.property('npmPackages.react');
    expect(envinfo).to.have.nested.property('npmPackages.react-dom');
    expect(envinfo).to.have.nested.property('npmPackages.@types/react');
    expect(envinfo).to.have.nested.property('npmPackages.@emotion/react');
    expect(envinfo).to.have.nested.property('npmPackages.@emotion/styled');
  });
});
