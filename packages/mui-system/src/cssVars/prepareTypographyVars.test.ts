import { describe, it, expect } from 'vitest';
import { createTheme } from '@mui/material/styles';
import prepareTypographyVars from './prepareTypographyVars';

describe('prepareTypographyVars', () => {
  it('should prepare typography vars', () => {
    const theme = createTheme();
    expect(prepareTypographyVars(theme.typography)).to.deep.equal({
      body1: '400 1rem/1.5 "Roboto", "Helvetica", "Arial", sans-serif',
      body2: '400 0.875rem/1.43 "Roboto", "Helvetica", "Arial", sans-serif',
      button: '500 0.875rem/1.75 "Roboto", "Helvetica", "Arial", sans-serif',
      caption: '400 0.75rem/1.66 "Roboto", "Helvetica", "Arial", sans-serif',
      h1: '300 6rem/1.167 "Roboto", "Helvetica", "Arial", sans-serif',
      h2: '300 3.75rem/1.2 "Roboto", "Helvetica", "Arial", sans-serif',
      h3: '400 3rem/1.167 "Roboto", "Helvetica", "Arial", sans-serif',
      h4: '400 2.125rem/1.235 "Roboto", "Helvetica", "Arial", sans-serif',
      h5: '400 1.5rem/1.334 "Roboto", "Helvetica", "Arial", sans-serif',
      h6: '500 1.25rem/1.6 "Roboto", "Helvetica", "Arial", sans-serif',
      inherit: 'inherit inherit/inherit inherit',
      overline: '400 0.75rem/2.66 "Roboto", "Helvetica", "Arial", sans-serif',
      subtitle1: '400 1rem/1.75 "Roboto", "Helvetica", "Arial", sans-serif',
      subtitle2: '500 0.875rem/1.57 "Roboto", "Helvetica", "Arial", sans-serif',
    });
  });
});
