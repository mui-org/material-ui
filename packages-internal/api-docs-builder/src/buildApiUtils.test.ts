import { describe, it } from 'vitest';
import sinon from 'sinon';
import { extractPackageFile } from './buildApiUtils';

describe('buildApiUtils', () => {
  describe('extractPackageFilePath', () => {
    it('return info if path is a package (material)', () => {
      const result = extractPackageFile('/material-ui/packages/mui-material/src/Button/Button.js');
      sinon.assert.match(result, {
        packagePath: 'mui-material',
        muiPackage: 'mui-material',
        name: 'Button',
      });
    });

    it('return info if path is a package (lab)', () => {
      const result = extractPackageFile(
        '/material-ui/packages/mui-lab/src/LoadingButton/LoadingButton.js',
      );
      sinon.assert.match(result, {
        packagePath: 'mui-lab',
        muiPackage: 'mui-lab',
        name: 'LoadingButton',
      });
    });

    it('return info if path is a package (data-grid)', () => {
      const result = extractPackageFile('/material-ui/packages/grid/x-data-grid/src/DataGrid.tsx');
      sinon.assert.match(result, {
        packagePath: 'x-data-grid',
        muiPackage: 'mui-data-grid',
        name: 'DataGrid',
      });
    });

    it('return info if path is a package (data-grid-pro)', () => {
      const result = extractPackageFile(
        '/material-ui/packages/grid/x-data-grid-pro/src/DataGridPro.tsx',
      );
      sinon.assert.match(result, {
        packagePath: 'x-data-grid-pro',
        muiPackage: 'mui-data-grid-pro',
        name: 'DataGridPro',
      });
    });

    it('return null if path is not a package', () => {
      const result = extractPackageFile(
        '/material-ui/docs/pages/material/getting-started/getting-started.md',
      );
      sinon.assert.match(result, {
        packagePath: null,
        name: null,
      });
    });
  });
});
