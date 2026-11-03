import { describe, it, expect } from 'vitest';
import extendSxProp from './extendSxProp';

describe('extendSxProp', () => {
  it('should add system props in the sx prop', () => {
    expect(extendSxProp({ mb: 2, mt: [1, 2, 3] })).to.deep.equal({
      sx: {
        mb: 2,
        mt: [1, 2, 3],
      },
    });
  });

  it('should merge system props with the sx prop', () => {
    expect(extendSxProp({ mb: 2, mt: [1, 2, 3], sx: { mr: 2, mb: 1 } })).to.deep.equal({
      sx: {
        mb: 1,
        mt: [1, 2, 3],
        mr: 2,
      },
    });
  });

  it('should not process non system props', () => {
    expect(extendSxProp({ ariaLabel: 'label', sx: { mr: 2, mb: 1 } })).to.deep.equal({
      sx: {
        mr: 2,
        mb: 1,
      },
      ariaLabel: 'label',
    });
  });

  it('should merge system props with the sx prop of function type', () => {
    const { sx } = extendSxProp({ mb: 2, mt: [1, 2, 3], sx: () => ({ mr: 2, mb: 1 }) });
    expect(sx()).to.deep.equal({
      mb: 1,
      mt: [1, 2, 3],
      mr: 2,
    });
  });

  it('should pass params to sx', () => {
    const { sx } = extendSxProp({
      sx: (props) => ({ width: props.theme.width }),
    });
    expect(sx({ theme: { width: 200 } })).to.deep.equal({
      width: 200,
    });
  });

  it('should not process non system props with the sx prop of function type', () => {
    const { sx, ...other } = extendSxProp({ 'aria-label': 'label', sx: () => ({ mr: 2, mb: 1 }) });
    expect(other).to.deep.equal({
      'aria-label': 'label',
    });
  });

  it('neglect sx result that is not plain object', () => {
    const { sx } = extendSxProp({ mb: 2, mt: [1, 2, 3], sx: () => 'unknown' });
    expect(sx()).to.deep.equal({
      mb: 2,
      mt: [1, 2, 3],
    });
  });
});
