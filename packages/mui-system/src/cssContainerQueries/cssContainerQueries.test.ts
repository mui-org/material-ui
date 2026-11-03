import { describe, it, expect } from 'vitest';
import createTheme from '@mui/system/createTheme';
import {
  isCqShorthand,
  sortContainerQueries,
  getContainerQuery,
} from '@mui/system/cssContainerQueries';

describe('cssContainerQueries', () => {
  it('should return false if the shorthand is not a container query', () => {
    expect(isCqShorthand(['xs', 'sm', 'md'], '@container (min-width:600px)')).to.equal(false);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@media (min-width:600px)')).to.equal(false);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@page')).to.equal(false);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@support (display: flex)')).to.equal(false);
  });

  it('should return true if the shorthand is a container query', () => {
    expect(isCqShorthand(['xs', 'sm', 'md'], '@')).to.equal(true);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@xs')).to.equal(true);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@xs/sidebar')).to.equal(true);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@md')).to.equal(true);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@200')).to.equal(true);
    expect(isCqShorthand(['xs', 'sm', 'md'], '@15.5rem')).to.equal(true);
  });

  it('should handle `@` without a breakpoint', () => {
    const theme = createTheme();

    expect(getContainerQuery(theme, '@')).to.equal('@container (min-width:0px)');
  });

  it('should have `up`, `down`, `between`, `only`, and `not` functions', () => {
    const theme = createTheme();

    expect(theme.containerQueries.up('sm')).to.equal('@container (min-width:600px)');
    expect(theme.containerQueries.down('sm')).to.equal('@container (max-width:599.95px)');
    expect(theme.containerQueries.between('sm', 'md')).to.equal(
      '@container (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.containerQueries.only('sm')).to.equal(
      '@container (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.containerQueries.not('xs')).to.equal('@container (min-width:600px)');
    expect(theme.containerQueries.not('xl')).to.equal('@container (max-width:1535.95px)');
    expect(theme.containerQueries.not('md')).to.equal(
      '@container (width<900px) or (width>1199.95px)',
    );
  });

  it('should be able to create named containment context', () => {
    const theme = createTheme();

    expect(theme.containerQueries('sidebar').up('sm')).to.equal(
      '@container sidebar (min-width:600px)',
    );
    expect(theme.containerQueries('sidebar').down('sm')).to.equal(
      '@container sidebar (max-width:599.95px)',
    );
    expect(theme.containerQueries('sidebar').between('sm', 'md')).to.equal(
      '@container sidebar (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.containerQueries('sidebar').only('sm')).to.equal(
      '@container sidebar (min-width:600px) and (max-width:899.95px)',
    );
    expect(theme.containerQueries('sidebar').not('xs')).to.equal(
      '@container sidebar (min-width:600px)',
    );
    expect(theme.containerQueries('sidebar').not('xl')).to.equal(
      '@container sidebar (max-width:1535.95px)',
    );
    expect(theme.containerQueries('sidebar').not('sm')).to.equal(
      '@container sidebar (width<600px) or (width>899.95px)',
    );
  });

  it('should sort container queries', () => {
    const theme = createTheme();

    const css = {
      '@container (min-width:960px)': {},
      '@container (min-width:1280px)': {},
      '@container (min-width:0px)': {},
      '@container (min-width:600px)': {},
    };

    const sorted = sortContainerQueries(theme, css);

    expect(Object.keys(sorted)).to.deep.equal([
      '@container (min-width:0px)',
      '@container (min-width:600px)',
      '@container (min-width:960px)',
      '@container (min-width:1280px)',
    ]);
  });

  it('should sort container queries with other unit', () => {
    const theme = createTheme();

    const css = {
      '@container (min-width:30.5rem)': {},
      '@container (min-width:20rem)': {},
      '@container (min-width:50.5rem)': {},
      '@container (min-width:40rem)': {},
    };

    const sorted = sortContainerQueries(theme, css);

    expect(Object.keys(sorted)).to.deep.equal([
      '@container (min-width:20rem)',
      '@container (min-width:30.5rem)',
      '@container (min-width:40rem)',
      '@container (min-width:50.5rem)',
    ]);
  });

  it('should throw an error if shorthand is invalid', () => {
    expect(() => {
      const theme = createTheme();
      getContainerQuery(theme, 'cq0');
    }).to.throw(
      'MUI: The provided shorthand (cq0) is invalid. The format should be `@<breakpoint | number>` or `@<breakpoint | number>/<container>`.\n' +
        'For example, `@sm` or `@600` or `@40rem/sidebar`.',
    );
  });
});
