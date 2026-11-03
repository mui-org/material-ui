import { describe, it, expect } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  reactMajor,
  isJsdom,
} from '@mui/internal-test-utils';
import { ThemeProvider } from '@emotion/react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputBase, { inputBaseClasses as classes } from '@mui/material/InputBase';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<InputBase />', () => {
  const { render, renderToString } = createRenderer();

  describeConformance(<InputBase />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiInputBase',
    testVariantProps: { size: 'small' },
    slots: {
      // can't test with DOM element as InputBase places an ownerState prop on it unconditionally.
      root: { expectedClassName: classes.root, testWithElement: null },
      input: { expectedClassName: classes.input, testWithElement: null },
    },
    skip: [
      'componentProp',
      'slotPropsCallback', // not supported yet
      'slotPropsCallbackWithPropsAsOwnerState', // not supported yet
    ],
  }));

  it('should render an <input /> inside the div', () => {
    const { container } = render(<InputBase />);
    const input = container.querySelector('input');
    expect(input).to.have.attribute('type', 'text');
    expect(input).to.have.class(classes.input);
    expect(input).not.to.have.attribute('required');
  });

  it('should be aria-labelled and aria-describedby if props are provided', () => {
    render(
      <div>
        <InputBase aria-label="label" aria-describedby="helper-text" />
        <p id="helper-text">Helper text</p>
      </div>,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAccessibleName('label');
    expect(input).toHaveAccessibleDescription('Helper text');
  });

  it('should add the right class when size is small', () => {
    const { container } = render(<InputBase size="small" />);
    expect(container.firstChild).to.have.class(classes.sizeSmall);
  });

  describe('multiline', () => {
    it('should render a `textbox` with `aria-multiline`', () => {
      render(<InputBase multiline />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      // implicit `aria-multiline`
      expect(textarea).to.have.tagName('textarea');
    });

    it('should render a `textbox` with `aria-multiline` if `rows` is specified', () => {
      render(<InputBase multiline rows={4} />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      // implicit `aria-multiline`
      expect(textarea).to.have.tagName('textarea');
    });

    it('should forward the value to the textarea', () => {
      render(<InputBase multiline maxRows={4} value="Hello" />);

      const textarea = screen.getByRole('textbox', { hidden: false });
      expect(textarea).to.have.value('Hello');
    });

    it('should preserve state when changing rows', () => {
      const { setProps } = render(<InputBase multiline />);
      const textarea = screen.getByRole('textbox', { hidden: false });
      act(() => {
        textarea.focus();
      });

      setProps({ rows: 4 });

      expect(textarea).toHaveFocus();
    });
  });

  describe('prop: disabled', () => {
    it('should render a disabled <input />', () => {
      const { container } = render(<InputBase disabled />);
      const input = container.querySelector('input');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.class(classes.disabled);
    });

    it('should reset the focused state if getting disabled', () => {
      const handleBlur = spy();
      const handleFocus = spy();
      const { container, setProps } = render(
        <InputBase onBlur={handleBlur} onFocus={handleFocus} />,
      );

      act(() => {
        container.querySelector('input').focus();
      });
      expect(handleFocus.callCount).to.equal(1);

      setProps({ disabled: true });
      expect(handleBlur.callCount).to.equal(1);
      // check if focus not initiated again
      expect(handleFocus.callCount).to.equal(1);
    });

    it('fires the click event when the <input /> is disabled', () => {
      const handleClick = spy();
      render(<InputBase disabled onClick={handleClick} />);
      const input = screen.getByRole('textbox');
      fireEvent.click(input);
      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('prop: readonly', () => {
    it('should render a readonly <input />', () => {
      render(<InputBase readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.class(classes.readOnly);
      expect(input).to.have.property('readOnly');
    });
  });

  it('should fire event callbacks', () => {
    const handleChange = spy();
    const handleFocus = spy();
    const handleBlur = spy();
    const handleKeyUp = spy();
    const handleKeyDown = spy();

    render(
      <InputBase
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
      />,
    );

    const input = screen.getByRole('textbox');

    // simulating user input: gain focus, key input (keydown, (input), change, keyup), blur

    act(() => {
      input.focus();
    });
    expect(handleFocus.callCount).to.equal(1);

    fireEvent.keyDown(input, { key: 'a' });
    expect(handleKeyDown.callCount).to.equal(1);

    fireEvent.change(input, { target: { value: 'a' } });
    expect(handleChange.callCount).to.equal(1);

    fireEvent.keyUp(input, { key: 'a' });
    expect(handleKeyUp.callCount).to.equal(1);

    act(() => {
      input.blur();
    });
    expect(handleBlur.callCount).to.equal(1);
  });

  describe('controlled', () => {
    it('should considered [] as controlled', () => {
      render(<InputBase value={[]} />);
      const input = screen.getByRole('textbox');

      expect(input).to.have.property('value', '');
      fireEvent.change(input, { target: { value: 'do not work' } });
      expect(input).to.have.property('value', '');
    });
  });

  describe('prop: inputComponent', () => {
    it('should accept any html component', () => {
      render(<InputBase inputComponent="span" inputProps={{ 'data-testid': 'input-component' }} />);

      expect(screen.getByTestId('input-component')).to.have.property('nodeName', 'SPAN');
    });

    it('should inject onBlur and onFocus', () => {
      let injectedProps;
      const MyInputBase = React.forwardRef(function MyInputBase(props, ref) {
        // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler
        injectedProps = props;
        return <input ref={ref} {...props} />;
      });
      render(<InputBase inputComponent={MyInputBase} />);
      expect(typeof injectedProps.onBlur).to.equal('function');
      expect(typeof injectedProps.onFocus).to.equal('function');
    });

    describe('target mock implementations', () => {
      it('can just mock the value', () => {
        const MockedValue = React.forwardRef(function MockedValue(props, ref) {
          const { onChange } = props;

          const handleChange = (event) => {
            onChange({ target: { value: event.target.value } });
          };

          return <input ref={ref} onChange={handleChange} />;
        });
        MockedValue.propTypes = { onChange: PropTypes.func.isRequired };

        function FilledState(props) {
          const { filled } = useFormControl();
          return <span {...props}>filled: {String(filled)}</span>;
        }

        render(
          <FormControl>
            <FilledState data-testid="filled" />
            <InputBase inputComponent={MockedValue} />
          </FormControl>,
        );

        expect(screen.getByTestId('filled')).to.have.text('filled: false');

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 1 } });
        expect(screen.getByTestId('filled')).to.have.text('filled: true');
      });

      it("can expose the input component's ref through the inputComponent prop", () => {
        const FullTarget = React.forwardRef(function FullTarget(props, ref) {
          return <input ref={ref} {...props} />;
        });

        function FilledState(props) {
          const { filled } = useFormControl();
          return <span {...props}>filled: {String(filled)}</span>;
        }

        render(
          <FormControl>
            <FilledState data-testid="filled" />
            <InputBase inputComponent={FullTarget} />
          </FormControl>,
        );

        expect(screen.getByTestId('filled')).to.have.text('filled: false');

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 1 } });
        expect(screen.getByTestId('filled')).to.have.text('filled: true');
      });
    });

    describe('errors', () => {
      it("throws on change if the target isn't mocked", () => {
        /**
         * This component simulates a custom input component that hides the inner
         * input value for security reasons e.g. react-stripe-element.
         *
         * A ref is exposed to trigger a change event instead of using fireEvent.change
         */
        const BadInputComponent = React.forwardRef(function BadInputComponent(props, ref) {
          const { onChange } = props;

          // simulates const handleChange = () => onChange({}) and passing that
          // handler to the onChange prop of `input`
          React.useImperativeHandle(ref, () => () => onChange({}));

          return <input />;
        });

        BadInputComponent.propTypes = {
          onChange: PropTypes.func.isRequired,
        };

        const triggerChangeRef = React.createRef();

        const errorMessage =
          'MUI: You have provided a `inputComponent` to the input component\nthat does not correctly handle the `ref` prop.\nMake sure the `ref` prop is called with a HTMLInputElement.';

        let expectedOccurrences = 1;

        if (reactMajor >= 18) {
          expectedOccurrences = 2;
        }

        expect(() => {
          render(
            <InputBase inputProps={{ ref: triggerChangeRef }} inputComponent={BadInputComponent} />,
          );
        }).toErrorDev(Array(expectedOccurrences).fill(errorMessage));
      });
    });
  });

  describe('with FormControl', () => {
    it('should have the formControl class', () => {
      render(
        <FormControl>
          <InputBase data-testid="root" />
        </FormControl>,
      );

      expect(screen.getByTestId('root')).to.have.class(classes.formControl);
    });

    describe('callbacks', () => {
      it('should fire the onClick prop', () => {
        const handleClick = spy();
        const handleFocus = spy();

        render(
          <FormControl>
            <InputBase data-testid="root" onClick={handleClick} onFocus={handleFocus} />
          </FormControl>,
        );

        fireEvent.click(screen.getByTestId('root'));
        expect(handleClick.callCount).to.equal(1);
        expect(handleFocus.callCount).to.equal(1);
      });
    });

    describe('error', () => {
      it('should be overridden by props', () => {
        function InputBaseInErrorForm(props) {
          return (
            <FormControl error>
              <InputBase data-testid="root" {...props} />
            </FormControl>
          );
        }

        const { setProps } = render(<InputBaseInErrorForm />);
        expect(screen.getByTestId('root')).to.have.class(classes.error);

        setProps({ error: false });
        expect(screen.getByTestId('root')).not.to.have.class(classes.error);

        setProps({ error: true });
        expect(screen.getByTestId('root')).to.have.class(classes.error);
      });
    });

    describe('size', () => {
      it('should have the sizeSmall class in a dense context', () => {
        render(
          <FormControl size="small">
            <InputBase data-testid="root" />
          </FormControl>,
        );
        expect(screen.getByTestId('root')).to.have.class(classes.sizeSmall);
        expect(screen.getByRole('textbox')).to.have.class(classes.input);
      });

      it('should be overridden by props', () => {
        function InputBaseInFormWithMargin(props) {
          return (
            <FormControl size="medium">
              <InputBase data-testid="root" {...props} />
            </FormControl>
          );
        }
        const { setProps } = render(<InputBaseInFormWithMargin />);
        expect(screen.getByTestId('root')).not.to.have.class(classes.sizeSmall);

        setProps({ size: 'small' });
        expect(screen.getByTestId('root')).to.have.class(classes.sizeSmall);
        expect(screen.getByRole('textbox')).to.have.class(classes.input);
      });

      it('has a hiddenLabel class to further reduce margin', () => {
        render(
          <FormControl hiddenLabel margin="dense">
            <InputBase data-testid="root" />
          </FormControl>,
        );

        expect(screen.getByTestId('root')).to.have.class(classes.hiddenLabel);
        expect(screen.getByRole('textbox')).to.have.class(classes.input);
      });
    });

    describe('required', () => {
      it('should have the aria-required prop with value true', () => {
        const { container } = render(
          <FormControl required>
            <InputBase />
          </FormControl>,
        );
        const input = container.querySelector('input');
        expect(input).to.have.property('required', true);
      });
    });

    describe('focused', () => {
      it('prioritizes context focus', () => {
        const FormController = React.forwardRef((props, ref) => {
          const { onBlur, onFocus } = useFormControl();

          React.useImperativeHandle(ref, () => ({ onBlur, onFocus }), [onBlur, onFocus]);

          return null;
        });
        const controlRef = React.createRef();

        render(
          <FormControl>
            <FormController ref={controlRef} />
            <InputBase data-testid="root" />
          </FormControl>,
        );

        act(() => {
          screen.getByRole('textbox').focus();
        });
        expect(screen.getByTestId('root')).to.have.class(classes.focused);

        act(() => {
          controlRef.current.onBlur();
        });

        expect(screen.getByTestId('root')).not.to.have.class(classes.focused);

        act(() => {
          controlRef.current.onFocus();
        });

        expect(screen.getByTestId('root')).to.have.class(classes.focused);
      });

      it('propagates focused state', () => {
        function FocusedStateLabel(props) {
          const { focused } = useFormControl();
          return <label {...props}>focused: {String(focused)}</label>;
        }

        render(
          <FormControl>
            <FocusedStateLabel data-testid="label" htmlFor="input" />
            <InputBase id="input" />
          </FormControl>,
        );

        expect(screen.getByTestId('label')).to.have.text('focused: false');

        act(() => {
          screen.getByRole('textbox').focus();
        });
        expect(screen.getByTestId('label')).to.have.text('focused: true');

        act(() => {
          screen.getByRole('textbox').blur();
        });
        expect(screen.getByTestId('label')).to.have.text('focused: false');
      });

      it.skipIf(isJsdom())(
        'should sync focused state when autoFocus is used with SSR (with FormControl)',
        function test() {
          let input;

          try {
            function App() {
              return (
                <FormControl>
                  <InputBase autoFocus data-testid="root" />
                </FormControl>
              );
            }

            const { hydrate } = renderToString(<App />);

            input = screen.getByRole('textbox');
            expect(input).to.have.attribute('autofocus');

            // Simulate the browser focusing the element before hydration
            act(() => {
              input.focus();
            });
            expect(input).to.equal(document.activeElement);

            act(() => {
              hydrate();
            });

            expect(screen.getByTestId('root')).to.have.class(classes.focused);
          } finally {
            if (input === document.activeElement) {
              act(() => {
                input.blur();
              });
            }
          }
        },
      );

      it.skipIf(isJsdom())(
        'should sync focused state when autoFocus is used with SSR (standalone)',
        function test() {
          let input;

          try {
            function App() {
              return <InputBase autoFocus data-testid="root" />;
            }

            const { hydrate } = renderToString(<App />);

            input = screen.getByRole('textbox');

            // Simulate the browser focusing the element before hydration
            act(() => {
              input.focus();
            });
            expect(input).to.equal(document.activeElement);

            act(() => {
              hydrate();
            });

            expect(screen.getByTestId('root')).to.have.class(classes.focused);
          } finally {
            if (input === document.activeElement) {
              act(() => {
                input.blur();
              });
            }
          }
        },
      );

      it.skipIf(isJsdom())(
        'should focus and sync focused state when autoFocus is used with SSR',
        function test() {
          let input;

          try {
            function App() {
              return (
                <FormControl>
                  <InputBase autoFocus data-testid="root" />
                </FormControl>
              );
            }

            const { hydrate } = renderToString(<App />);

            input = screen.getByRole('textbox');
            expect(input).to.have.attribute('autofocus');
            expect(input).not.to.equal(document.activeElement);

            act(() => {
              hydrate();
            });

            expect(input).to.equal(document.activeElement);
            expect(screen.getByTestId('root')).to.have.class(classes.focused);
          } finally {
            if (input === document.activeElement) {
              act(() => {
                input.blur();
              });
            }
          }
        },
      );

      it.skipIf(isJsdom())(
        'should not sync focused state when autoFocus is not set (regression guard)',
        function test() {
          function App() {
            return (
              <FormControl>
                <InputBase data-testid="root" />
              </FormControl>
            );
          }

          const { hydrate } = renderToString(<App />);

          const input = screen.getByRole('textbox');

          // Manually focus the element before hydration (without autoFocus)
          act(() => {
            input.focus();
          });
          expect(input).to.equal(document.activeElement);

          act(() => {
            hydrate();
          });

          expect(screen.getByTestId('root')).not.to.have.class(classes.focused);
        },
      );
    });

    it('propagates filled state when uncontrolled', () => {
      function FilledStateLabel(props) {
        const { filled } = useFormControl();
        return <label {...props}>filled: {String(filled)}</label>;
      }

      render(
        <FormControl>
          <FilledStateLabel data-testid="label" />
          <InputBase />
        </FormControl>,
      );

      expect(screen.getByTestId('label')).to.have.text('filled: false');
      const textbox = screen.getByRole('textbox');

      fireEvent.change(textbox, { target: { value: 'material' } });
      expect(screen.getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(textbox, { target: { value: '0' } });
      expect(screen.getByTestId('label')).to.have.text('filled: true');

      fireEvent.change(textbox, { target: { value: '' } });
      expect(screen.getByTestId('label')).to.have.text('filled: false');
    });

    it('propagates filled state when controlled', () => {
      function FilledStateLabel(props) {
        const { filled } = useFormControl();
        return <label {...props}>filled: {String(filled)}</label>;
      }
      function ControlledInputBase(props) {
        return (
          <FormControl>
            <FilledStateLabel data-testid="label" />
            <InputBase {...props} />
          </FormControl>
        );
      }
      const { setProps } = render(<ControlledInputBase value="" />);
      expect(screen.getByTestId('label')).to.have.text('filled: false');

      setProps({ value: 'material' });
      expect(screen.getByTestId('label')).to.have.text('filled: true');

      setProps({ value: 0 });
      expect(screen.getByTestId('label')).to.have.text('filled: true');

      setProps({ value: '' });
      expect(screen.getByTestId('label')).to.have.text('filled: false');
    });

    describe('registering input', () => {
      it("should warn if more than one input is rendered regardless how it's nested", () => {
        const errorMessage =
          'MUI: There are multiple `InputBase` components inside a FormControl.\nThis creates visual inconsistencies, only use one `InputBase`.';

        let expectedOccurrences = 1;

        if (reactMajor >= 18) {
          expectedOccurrences = 2;
        }
        expect(() => {
          render(
            <FormControl>
              <InputBase />
              <div>
                {/* should work regardless how it's nested */}
                <InputBase />
              </div>
            </FormControl>,
          );
        }).toErrorDev(Array(expectedOccurrences).fill(errorMessage));
      });

      it('should not warn if only one input is rendered', () => {
        expect(() => {
          render(
            <FormControl>
              <InputBase />
            </FormControl>,
          );
        }).not.toErrorDev();
      });

      it('should not warn when toggling between inputs', () => {
        // this will ensure that deregistering was called during unmount
        function ToggleFormInputs() {
          const [flag, setFlag] = React.useState(true);

          return (
            <FormControl>
              {flag ? (
                <InputBase />
              ) : (
                <Select native>
                  <option value="">empty</option>
                </Select>
              )}
              <button type="button" onClick={() => setFlag(!flag)}>
                toggle
              </button>
            </FormControl>
          );
        }

        render(<ToggleFormInputs />);
        expect(() => {
          fireEvent.click(screen.getByText('toggle'));
        }).not.toErrorDev();
      });
    });
  });

  describe('prop: inputProps', () => {
    it('should apply the props on the input', () => {
      const { container } = render(<InputBase inputProps={{ className: 'foo', maxLength: 5 }} />);
      const input = container.querySelector('input');
      expect(input).to.have.class('foo');
      expect(input).to.have.class(classes.input);
      expect(input).to.have.property('maxLength', 5);
    });

    it('should be able to get a ref', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase inputProps={{ ref: inputRef }} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });

    it('should not repeat the same classname', () => {
      const { container } = render(<InputBase inputProps={{ className: 'foo' }} />);
      const input = container.querySelector('input');
      const matches = input.className.match(/foo/g);
      expect(input).to.have.class('foo');
      expect(matches).to.have.length(1);
    });
  });

  describe('prop: slotProps.input', () => {
    it('should call the event handlers and forward the ref', () => {
      const inputRef = React.createRef();
      const handleFocus = spy();
      const handleBlur = spy();
      const handleChange = spy();
      const { container } = render(
        <InputBase
          slotProps={{
            input: {
              ref: inputRef,
              onFocus: handleFocus,
              onBlur: handleBlur,
              onChange: handleChange,
            },
          }}
        />,
      );
      const input = container.querySelector('input');

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.blur(input);

      expect(inputRef.current).to.equal(input);
      expect(handleFocus.callCount).to.equal(1);
      expect(handleChange.callCount).to.equal(1);
      expect(handleBlur.callCount).to.equal(1);
    });
  });

  describe('autofill', () => {
    it.skipIf(isJsdom())(
      'does not animate display during autofill detection',
      async function test() {
        render(<InputBase inputProps={{ className: 'autofill-layout-test' }} />);

        // Simulate an input styled as flex, then start MUI's autofill-cancel animation manually.
        const style = document.createElement('style');
        style.textContent = `
        .${classes.input}.autofill-layout-test {
          animation-duration: 1000s;
          animation-name: none;
          display: flex;
        }

        .${classes.input}.autofill-layout-test.autofill-layout-test--animated {
          animation-name: mui-auto-fill-cancel;
        }
      `;
        document.head.appendChild(style);

        try {
          // Confirm the real MUI keyframes are present and no longer animate display.
          const keyframesRules = Array.from(document.styleSheets).flatMap((sheet) =>
            Array.from(sheet.cssRules).filter((rule) => rule.type === CSSRule.KEYFRAMES_RULE),
          );
          const autofillRule = keyframesRules.find((rule) => rule.name === 'mui-auto-fill');
          const autofillCancelRule = keyframesRules.find(
            (rule) => rule.name === 'mui-auto-fill-cancel',
          );

          expect(autofillRule).not.to.equal(undefined);
          expect(autofillCancelRule).not.to.equal(undefined);
          expect(autofillRule.cssText).not.to.include('display');
          expect(autofillCancelRule.cssText).not.to.include('display');

          const input = screen.getByRole('textbox');

          expect(getComputedStyle(input).display).to.equal('flex');

          // Starting the animation must not let its first keyframe override display.
          input.classList.add('autofill-layout-test--animated');

          expect(getComputedStyle(input).display).to.equal('flex');

          // Check one frame later too, when Chrome's visible layout jump used to happen.
          await act(async () => {
            await new Promise((resolve) => {
              requestAnimationFrame(resolve);
            });
          });

          expect(getComputedStyle(input).display).to.equal('flex');
        } finally {
          document.head.removeChild(style);
        }
      },
    );
  });

  describe('prop: inputComponent with prop: inputProps', () => {
    it('should call onChange inputProp callback with all params sent from custom inputComponent', () => {
      const INPUT_VALUE = 'material';
      const OUTPUT_VALUE = 'test';

      const MyInputBase = React.forwardRef(function MyInputBase(props, ref) {
        const { onChange, ...other } = props;

        const handleChange = (event) => {
          onChange(event.target.value, OUTPUT_VALUE);
        };

        return <input ref={ref} onChange={handleChange} {...other} />;
      });

      MyInputBase.propTypes = {
        onChange: PropTypes.func.isRequired,
      };

      let outputArguments;
      function parentHandleChange(...args) {
        outputArguments = args;
      }

      render(
        <InputBase inputComponent={MyInputBase} inputProps={{ onChange: parentHandleChange }} />,
      );

      const textbox = screen.getByRole('textbox');
      fireEvent.change(textbox, { target: { value: INPUT_VALUE } });

      expect(outputArguments.length).to.equal(2);
      expect(outputArguments[0]).to.equal(INPUT_VALUE);
      expect(outputArguments[1]).to.equal(OUTPUT_VALUE);
    });
  });

  describe('prop: startAdornment, prop: endAdornment', () => {
    it('should render adornment before input', () => {
      render(
        <InputBase
          startAdornment={
            <InputAdornment data-testid="adornment" position="start">
              $
            </InputAdornment>
          }
        />,
      );

      expect(screen.getByTestId('adornment')).not.to.equal(null);
    });

    it('should render adornment after input', () => {
      render(
        <InputBase
          endAdornment={
            <InputAdornment data-testid="adornment" position="end">
              $
            </InputAdornment>
          }
        />,
      );

      expect(screen.getByTestId('adornment')).not.to.equal(null);
    });

    it('should allow a Select as an adornment', () => {
      render(
        <TextField
          value=""
          name="text"
          variant="standard"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Select value="" name="suffix" />
                </InputAdornment>
              ),
            },
          }}
        />,
      );
    });
  });

  describe('prop: inputRef', () => {
    it('should be able to access the native input', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase inputRef={inputRef} />);
      expect(inputRef.current).to.equal(container.querySelector('input'));
    });

    it('should be able to access the native textarea', () => {
      const inputRef = React.createRef();
      const { container } = render(<InputBase multiline inputRef={inputRef} />);
      expect(inputRef.current).to.equal(container.querySelector('textarea'));
    });
  });

  describe('prop: focused', () => {
    it.skipIf(isJsdom())(
      'should render correct border color with `ThemeProvider` imported from `@emotion/react`',
      function test() {
        const theme = createTheme({
          palette: {
            primary: {
              main: 'rgb(0, 191, 165)',
            },
          },
        });

        render(
          <ThemeProvider theme={theme}>
            <TextField focused label="Your email" />
          </ThemeProvider>,
        );

        const fieldset = screen.getByRole('textbox').nextSibling;
        expect(fieldset).toHaveComputedStyle({
          borderTopColor: 'rgb(0, 191, 165)',
          borderRightColor: 'rgb(0, 191, 165)',
          borderBottomColor: 'rgb(0, 191, 165)',
          borderLeftColor: 'rgb(0, 191, 165)',
        });
      },
    );
  });
  describe('theme.focusVisible', () => {
    const focusVisibleTheme = createTheme({ focusVisible: true });

    it.skipIf(isJsdom())('renders the ring on focus', async () => {
      render(
        <MuiThemeProvider theme={focusVisibleTheme}>
          <InputBase data-testid="root" />
        </MuiThemeProvider>,
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

    it.skipIf(isJsdom())('lets a wrapper opt out and draw its own indicator', async () => {
      render(
        <MuiThemeProvider theme={focusVisibleTheme}>
          <InputBase internalDisabledThemeFocusVisible data-testid="root" />
        </MuiThemeProvider>,
      );
      const root = screen.getByTestId('root');

      await act(async () => {
        root.querySelector('input').focus();
      });

      expect(root).toHaveComputedStyle({ outlineStyle: 'none' });
    });

    it('does not forward the private opt-out prop to the DOM', () => {
      render(<InputBase internalDisabledThemeFocusVisible data-testid="root" />);
      expect(screen.getByTestId('root')).not.to.have.attribute('internalDisabledThemeFocusVisible');
    });
  });
});
