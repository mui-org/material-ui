import { describe, it, expect } from 'vitest';
import { act, createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import FilledInput, { filledInputClasses as classes } from '@mui/material/FilledInput';
import InputBase from '@mui/material/InputBase';
import describeConformance from '../../test/describeConformance';

describe('<FilledInput />', () => {
  const { render } = createRenderer();

  describeConformance(<FilledInput open />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiFilledInput',
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

  it('should have the underline class', () => {
    const { container } = render(<FilledInput />);
    const root = container.firstChild;
    expect(root).not.to.equal(null);
  });

  it('color={undefined} should not result in crash', () => {
    expect(() => {
      render(<FilledInput color={undefined} />);
    }).not.toErrorDev();
  });

  it('can disable the underline', () => {
    const { container } = render(<FilledInput disableUnderline />);
    const root = container.firstChild;
    expect(root).not.to.have.class(classes.underline);
  });

  it('should forward classes to InputBase', () => {
    render(<FilledInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respect the slotProps if passed', () => {
    render(<FilledInput slotProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });

  it('should respect the classes coming from InputBase', () => {
    render(
      <FilledInput
        data-test="test"
        multiline
        sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }}
      />,
    );
    expect(document.querySelector('[data-test=test]')).toHaveComputedStyle({ marginTop: '10px' });
  });

  it('should not throw: "Maximum call stack size exceeded" if both slotProps and an adornment are passed', () => {
    const Adornment = styled('div')({});
    render(<FilledInput endAdornment={<Adornment />} slotProps={{}} />);
    render(<FilledInput startAdornment={<Adornment />} slotProps={{}} />);
  });

  it('should not have following classes', () => {
    render(
      <FilledInput
        size="small"
        multiline
        startAdornment="start"
        endAdornment="end"
        type="search"
      />,
    );

    expect(document.querySelector('.MuiFilledInput-inputSizeSmall')).to.equal(null);
    expect(document.querySelector('.MuiFilledInput-inputMultiline')).to.equal(null);
    expect(document.querySelector('.MuiFilledInput-inputAdornedStart')).to.equal(null);
    expect(document.querySelector('.MuiFilledInput-inputAdornedEnd')).to.equal(null);
    expect(document.querySelector('.MuiFilledInput-inputTypeSearch')).to.equal(null);
  });

  it('should have following classes', () => {
    const { container } = render(
      <FilledInput hiddenLabel multiline size="small" startAdornment="start" endAdornment="end" />,
    );
    const root = container.firstChild;
    expect(root).to.have.class(classes.hiddenLabel);
    expect(root).to.have.class(classes.multiline);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.adornedEnd);
    expect(root).to.have.class(classes.adornedStart);
  });

  it('should not forward the notched prop to the DOM', () => {
    render(<FilledInput notched data-testid="root" />);
    expect(screen.getByTestId('root')).not.to.have.attribute('notched');
  });

  describe('theme.focusVisible', () => {
    const theme = createTheme({ focusVisible: true });

    it.skipIf(isJsdom())('renders the ring on focus when the underline is disabled', async () => {
      render(
        <ThemeProvider theme={theme}>
          <FilledInput disableUnderline data-testid="root" />
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
        outlineOffset: '2px',
      });
    });

    it.skipIf(isJsdom())('does not render the ring when the underline is shown', async () => {
      render(
        <ThemeProvider theme={theme}>
          <FilledInput data-testid="root" />
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
