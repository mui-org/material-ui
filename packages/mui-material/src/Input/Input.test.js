import { describe, it, expect } from 'vitest';
import { act, createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import InputBase from '@mui/material/InputBase';
import Input, { inputClasses as classes } from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<Input />', () => {
  const { render } = createRenderer();

  describeConformance(<Input />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    slots: {
      // can't test with DOM element as Input places an ownerState prop on it unconditionally.
      root: { expectedClassName: classes.root, testWithElement: null },
      input: { expectedClassName: classes.input, testWithElement: null },
    },
    skip: [
      'componentProp',
      'slotPropsCallback', // not supported yet
      'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
    ],
  }));

  it('should forward classes to InputBase', () => {
    render(<Input error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respect the slotProps if passed', () => {
    render(<Input slotProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });

  it('should respect the classes coming from InputBase', () => {
    render(
      <Input data-test="test" multiline sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }} />,
    );
    expect(document.querySelector('[data-test=test]')).toHaveComputedStyle({ marginTop: '10px' });
  });

  it('should not forward the notched prop to the DOM', () => {
    render(<Input notched data-testid="root" />);
    expect(screen.getByTestId('root')).not.to.have.attribute('notched');
  });

  describe('theme.focusVisible', () => {
    const theme = createTheme({ focusVisible: true });

    it.skipIf(isJsdom())('renders the ring on focus when the underline is disabled', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Input disableUnderline data-testid="root" />
        </ThemeProvider>,
      );
      const root = screen.getByTestId('root');

      expect(root).toHaveComputedStyle({ outlineStyle: 'none' });

      await act(async () => {
        root.querySelector('input').focus();
      });

      expect(root).toHaveComputedStyle({
        outlineStyle: 'solid',
        outlineWidth: '2px',
        // inset, so the ring does not crowd the TextField label
        outlineOffset: '-2px',
      });
    });

    it.skipIf(isJsdom())('does not render the ring when the underline is shown', async () => {
      render(
        <ThemeProvider theme={theme}>
          <Input data-testid="root" />
        </ThemeProvider>,
      );
      const root = screen.getByTestId('root');

      await act(async () => {
        root.querySelector('input').focus();
      });

      expect(root).toHaveComputedStyle({ outlineStyle: 'none' });
    });
  });
});
