import { describe, it, expect } from 'vitest';
import { act, createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import DialogContent, { dialogContentClasses as classes } from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<DialogContent />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiDialogContent',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { dividers: true },
    skip: ['componentProp'],
  }));

  it('should render children', () => {
    const children = <p data-testid="test-children" />;
    render(<DialogContent>{children}</DialogContent>);

    screen.getByTestId('test-children');
  });

  describe('theme.focusVisible', () => {
    async function keyboardFocus(element) {
      fireEvent.keyDown(document.body, { key: 'Tab' });
      await act(async () => {
        element.focus();
      });
    }

    it.skipIf(isJsdom())('insets the ring when the scrollable content takes focus', async () => {
      const theme = createTheme({ focusVisible: true });
      render(
        <ThemeProvider theme={theme}>
          <DialogContent tabIndex={0} data-testid="content" />
        </ThemeProvider>,
      );
      const content = screen.getByTestId('content');

      await keyboardFocus(content);

      expect(content).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineWidth: '2px',
        outlineOffset: '-2px',
      });
    });

    it.skipIf(isJsdom())(
      'does not render the theme ring when focusVisible is not enabled',
      async () => {
        render(<DialogContent tabIndex={0} data-testid="content" />);
        const content = screen.getByTestId('content');

        await keyboardFocus(content);

        expect(content).not.toHaveComputedStyle({ outlineStyle: 'solid' });
      },
    );
  });
});
