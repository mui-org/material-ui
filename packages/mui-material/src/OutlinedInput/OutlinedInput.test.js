import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import OutlinedInput, { outlinedInputClasses as classes } from '@mui/material/OutlinedInput';
import InputBase from '@mui/material/InputBase';
import describeConformance from '../../test/describeConformance';

describe('<OutlinedInput />', () => {
  const { render } = createRenderer();

  const CustomNotchedOutline = React.forwardRef(({ notched, ownerState, ...props }, ref) => (
    <i ref={ref} data-testid="custom" {...props} />
  ));

  describeConformance(<OutlinedInput label="Label" />, () => ({
    classes,
    inheritComponent: InputBase,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiOutlinedInput',
    testDeepOverrides: { slotName: 'input', slotClassName: classes.input },
    testVariantProps: { variant: 'contained', fullWidth: true },
    testStateOverrides: { prop: 'size', value: 'small', styleKey: 'sizeSmall' },
    slots: {
      // can't test with DOM element as InputBase places an ownerState prop on it unconditionally.
      root: { expectedClassName: classes.root, testWithElement: null },
      input: { expectedClassName: classes.input, testWithElement: null },
      notchedOutline: {
        expectedClassName: classes.notchedOutline,
        testWithElement: CustomNotchedOutline,
      },
    },
    skip: [
      'componentProp',
      'slotPropsCallback', // not supported yet
      'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
    ],
  }));

  it('should render a NotchedOutline', () => {
    const { container } = render(
      <OutlinedInput classes={{ notchedOutline: 'notched-outlined' }} />,
    );

    expect(container.querySelector('.notched-outlined')).not.to.equal(null);
  });

  it('should set correct label prop on outline', () => {
    const { container } = render(
      <OutlinedInput
        classes={{ notchedOutline: 'notched-outlined' }}
        label={<div data-testid="label">label</div>}
        required
      />,
    );
    const notchOutlined = container.querySelector('.notched-outlined legend');
    expect(notchOutlined).to.have.text('label\u2009*');
  });

  it('should forward classes to InputBase', () => {
    render(<OutlinedInput error classes={{ error: 'error' }} />);
    expect(document.querySelector('.error')).not.to.equal(null);
  });

  it('should respect the slotProps if passed', () => {
    render(<OutlinedInput slotProps={{ root: { 'data-test': 'test' } }} />);
    expect(document.querySelector('[data-test=test]')).not.to.equal(null);
  });

  it('should respect the classes coming from InputBase', () => {
    render(
      <OutlinedInput
        data-test="test"
        multiline
        sx={{ [`&.${classes.multiline}`]: { mt: '10px' } }}
      />,
    );
    expect(document.querySelector('[data-test=test]')).toHaveComputedStyle({ marginTop: '10px' });
  });

  it('should have ownerState in the theme style overrides', () => {
    expect(() =>
      render(
        <ThemeProvider
          theme={createTheme({
            components: {
              MuiOutlinedInput: {
                styleOverrides: {
                  root: ({ ownerState }) => ({
                    // test that ownerState is not undefined
                    ...(ownerState.disabled && {}),
                  }),
                },
              },
            },
          })}
        >
          <OutlinedInput />
        </ThemeProvider>,
      ),
    ).not.to.throw();
  });
  describe('theme.focusVisible', () => {
    // The notched outline already recolors on focus, so the theme ring would be a second indicator.
    it.skipIf(isJsdom())('does not render the ring on focus', async () => {
      render(
        <ThemeProvider theme={createTheme({ focusVisible: true })}>
          <OutlinedInput data-testid="root" />
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
