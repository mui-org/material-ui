import { describe, expect, afterEach, it } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
import describeConformance from '../../test/describeConformance';

const isJSDOM = isJsdom();

describe('<Box />', () => {
  const { render } = createRenderer();

  describeConformance(<Box />, () => ({
    render,
    inheritComponent: 'div',
    skip: ['rootClass', 'themeVariants', 'themeStyleOverrides', 'themeDefaultProps'],
    refInstanceof: window.HTMLDivElement,
  }));

  it.skipIf(isJSDOM)('respects theme from context', function test() {
    const theme = createTheme({
      palette: {
        primary: {
          main: 'rgb(255, 0, 0)',
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box sx={{ color: 'primary.main' }} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      color: 'rgb(255, 0, 0)',
    });
  });

  describe('ClassNameGenerator', () => {
    afterEach(() => {
      ClassNameGenerator.reset();
    });

    it('get custom className', () => {
      const { container, rerender } = render(<Box />);
      expect(container.firstChild).to.have.class('MuiBox-root');

      ClassNameGenerator.configure((name) => name.replace('Mui', 'Company'));

      rerender(<Box />);

      expect(container.firstChild).to.have.class('CompanyBox-root');
    });
  });
});
