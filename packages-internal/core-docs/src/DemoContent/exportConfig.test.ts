import { describe, expect, it, vi } from 'vitest';
import { buildExportConfig } from './exportConfig';

describe('demo sandbox dependencies', () => {
  it('passes adapter import paths to product dependency hooks', () => {
    const postProcessImport = vi.fn((name: string) =>
      name.endsWith('/AdapterLuxon') ? { luxon: 'latest' } : null,
    );
    const config = buildExportConfig({
      csbConfig: { primaryPackage: '@mui/x-date-pickers', postProcessImport },
      useTypescriptRef: { current: true },
    });

    // New docs-infra versions retain all import paths in the optional third argument.
    const dependencies = Reflect.apply(config.resolveDependencies!, undefined, [
      '@mui/x-date-pickers',
      undefined,
      ['@mui/x-date-pickers/DatePicker', '@mui/x-date-pickers/AdapterLuxon'],
    ]);

    expect(postProcessImport.mock.calls.map(([name]) => name)).to.deep.equal([
      '@mui/x-date-pickers/DatePicker',
      '@mui/x-date-pickers/AdapterLuxon',
    ]);
    expect(dependencies.luxon).to.equal('latest');
    expect(dependencies['@types/luxon']).to.equal('latest');
  });

  it('runs product peer hooks before resolving TypeScript dependencies', () => {
    const includePeerDependencies = vi.fn((dependencies) => ({
      ...dependencies,
      '@emotion/cache': 'latest',
      'date-fns-jalali': 'latest',
      rxjs: 'latest',
      '@tanstack/query-core': 'latest',
      lodash: 'latest',
    }));
    const config = buildExportConfig({
      csbConfig: { primaryPackage: '@mui/x-charts', includePeerDependencies },
      useTypescriptRef: { current: true },
    });

    const dependencies = config.resolveDependencies!('@mui/x-charts');

    expect(includePeerDependencies).toHaveBeenCalledOnce();
    expect(dependencies.lodash).to.equal('latest');
    expect(dependencies['@types/lodash']).to.equal('latest');
    expect(Object.keys(dependencies).filter((name) => name.startsWith('@types/'))).to.deep.equal([
      '@types/lodash',
    ]);
  });

  it('does not request types for an existing types package', () => {
    const config = buildExportConfig({ csbConfig: undefined, useTypescriptRef: { current: true } });

    expect(config.resolveDependencies!('@types/node')).to.deep.equal({ '@types/node': 'latest' });
  });
});
