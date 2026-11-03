import { describe, it, expect } from 'vitest';
import { createTheme } from '@mui/material/styles';
import createMixins from './createMixins';

describe('createMixins', () => {
  it('should be able add other mixins', () => {
    const theme = createTheme();
    const mixins = createMixins(theme.breakpoints, { test: { display: 'block' } });

    expect(mixins.test).to.deep.equal({
      display: 'block',
    });
  });
});
