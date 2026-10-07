import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { Field as BaseField } from '@base-ui/react/field';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import NumberField, { numberFieldClasses as classes } from '@mui/material/NumberField';
import describeConformance from '../../test/describeConformance';

describe('<NumberField />', () => {
  const { render, renderToString } = createRenderer();

  const TestInput = React.forwardRef(function TestInput(props, ref) {
    return <OutlinedInput {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
  });

  const TestHtmlInput = React.forwardRef(function TestHtmlInput(props, ref) {
    const { ownerState, as, ...other } = props;
    return <input {...other} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
  });

  const TestFormControl = React.forwardRef(function TestFormControl(props, ref) {
    return <FormControl {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
  });

  describeConformance(
    <NumberField variant="standard" label="Amount" helperText="Helper text" />,
    () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiNumberField',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'outlined' },
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithComponent: TestFormControl,
          testWithElement: TestFormControl,
        },
        input: {
          testWithComponent: TestInput,
          testWithElement: null,
        },
        htmlInput: {
          testWithComponent: TestHtmlInput,
          testWithElement: 'input',
        },
        inputLabel: {},
        formHelperText: {},
      },
    }),
  );

  describe('behavioral prop precedence', () => {
    const slotPropPaths = [
      { name: 'root', getSlotProps: (props) => ({ root: props }) },
      { name: 'input', getSlotProps: (props) => ({ input: () => props }) },
      { name: 'htmlInput', getSlotProps: (props) => ({ htmlInput: () => props }) },
      { name: 'input.inputProps', getSlotProps: (props) => ({ input: { inputProps: props } }) },
      {
        name: 'input.slotProps.input',
        getSlotProps: (props) => ({ input: { slotProps: { input: props } } }),
      },
    ];

    slotPropPaths.forEach(({ name, getSlotProps }) => {
      describe(`slotProps.${name}`, () => {
        [false, true].forEach((disabled) => {
          it(`preserves top-level disabled=${disabled} despite the opposite slot prop`, async () => {
            const onValueChange = vi.fn();
            const { user } = render(
              <NumberField
                label="Amount"
                helperText="Helper text"
                defaultValue={5}
                disabled={disabled}
                onValueChange={onValueChange}
                slotProps={getSlotProps({ disabled: !disabled })}
              />,
            );
            const input = screen.getByRole('textbox', { name: 'Amount' });
            const label = screen.getByText('Amount', { selector: 'label' });
            const wrapper = input.closest('.MuiInputBase-root');

            expect(input.disabled).to.equal(disabled);
            expect(wrapper.classList.contains('Mui-disabled')).to.equal(disabled);
            expect(label.classList.contains('Mui-disabled')).to.equal(disabled);
            expect(screen.getByText('Helper text').classList.contains('Mui-disabled')).to.equal(
              disabled,
            );

            if (disabled) {
              await user.tab();
              expect(input).not.to.equal(document.activeElement);
            } else {
              await user.click(input);
              expect(input).to.equal(document.activeElement);
            }
            await user.keyboard('{ArrowUp}');

            expect(input).to.have.value(disabled ? '5' : '6');
            expect(onValueChange).toHaveBeenCalledTimes(disabled ? 0 : 1);
          });
        });

        [false, true].forEach((required) => {
          it(`preserves top-level required=${required} despite the opposite slot prop`, () => {
            render(
              <NumberField
                label="Amount"
                required={required}
                slotProps={getSlotProps({ required: !required })}
              />,
            );
            const input = screen.getByRole('textbox', { name: /Amount/ });
            const label = screen.getByText('Amount', { selector: 'label' });

            expect(input.required).to.equal(required);
            expect(input.validity.valueMissing).to.equal(required);
            expect(label.classList.contains('Mui-required')).to.equal(required);
            expect(label.querySelector('.MuiInputLabel-asterisk') !== null).to.equal(required);
            expect(
              input.closest('.MuiInputBase-root').querySelector('legend').textContent.includes('*'),
            ).to.equal(required);
          });
        });

        // FormControl does not have a readOnly prop; it applies to the Material and native inputs.
        if (name !== 'root') {
          [false, true].forEach((readOnly) => {
            it(`preserves top-level readOnly=${readOnly} despite the opposite slot prop`, async () => {
              const onValueChange = vi.fn();
              const { user } = render(
                <NumberField
                  label="Amount"
                  defaultValue={5}
                  readOnly={readOnly}
                  onValueChange={onValueChange}
                  slotProps={getSlotProps({ readOnly: !readOnly })}
                />,
              );
              const input = screen.getByRole('textbox', { name: 'Amount' });
              const wrapper = input.closest('.MuiInputBase-root');

              expect(input.readOnly).to.equal(readOnly);
              expect(wrapper.classList.contains('Mui-readOnly')).to.equal(readOnly);

              await user.click(input);
              expect(input).to.equal(document.activeElement);
              await user.keyboard('{ArrowUp}');

              expect(input).to.have.value(readOnly ? '5' : '6');
              expect(onValueChange).toHaveBeenCalledTimes(readOnly ? 0 : 1);

              if (readOnly) {
                await user.keyboard('9');
                expect(input).to.have.value('5');
                expect(onValueChange).toHaveBeenCalledTimes(0);
              } else {
                await user.clear(input);
                await user.keyboard('9');
                expect(input).to.have.value('9');
                expect(onValueChange.mock.lastCall[0]).to.equal(9);
              }
            });
          });
        }

        it('preserves inherited Base UI disabled state despite explicit false props', async () => {
          const onValueChange = vi.fn();
          const { user } = render(
            <BaseField.Root disabled>
              <NumberField
                label="Amount"
                helperText="Helper text"
                defaultValue={5}
                disabled={false}
                onValueChange={onValueChange}
                slotProps={getSlotProps({ disabled: false })}
              />
            </BaseField.Root>,
          );
          const input = screen.getByRole('textbox', { name: 'Amount' });

          expect(input.disabled).to.equal(true);
          expect(input.closest('.MuiInputBase-root')).to.have.class('Mui-disabled');
          expect(screen.getByText('Amount', { selector: 'label' })).to.have.class('Mui-disabled');
          expect(screen.getByText('Helper text')).to.have.class('Mui-disabled');

          await user.tab();
          expect(input).not.to.equal(document.activeElement);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
        });
      });
    });

    ['standard', 'filled'].forEach((variant) => {
      [false, true].forEach((state) => {
        it(`keeps resolved state=${state} consistent across all layers (${variant})`, () => {
          const overrides = { disabled: !state, required: !state, readOnly: !state };
          render(
            <NumberField
              variant={variant}
              label="Amount"
              disabled={state}
              required={state}
              readOnly={state}
              slotProps={{
                root: { disabled: !state, required: !state },
                input: {
                  ...overrides,
                  inputProps: overrides,
                  slotProps: { input: overrides },
                },
                htmlInput: overrides,
              }}
            />,
          );
          const input = screen.getByRole('textbox', { name: /Amount/ });
          const wrapper = input.closest('.MuiInputBase-root');
          const label = screen.getByText('Amount', { selector: 'label' });

          expect(input.disabled).to.equal(state);
          expect(input.required).to.equal(state);
          expect(input.readOnly).to.equal(state);
          expect(wrapper.classList.contains('Mui-disabled')).to.equal(state);
          expect(wrapper.classList.contains('Mui-readOnly')).to.equal(state);
          expect(label.classList.contains('Mui-disabled')).to.equal(state);
          expect(label.classList.contains('Mui-required')).to.equal(state);
        });
      });
    });
  });

  describe('server rendering', () => {
    describe('initial value', () => {
      ['outlined', 'filled', 'standard'].forEach((variant) => {
        ['value', 'defaultValue'].forEach((prop) => {
          [
            { value: 42, displayValue: '42', shrink: 'true' },
            { value: 0, displayValue: '0', shrink: 'true' },
            { value: null, displayValue: '', shrink: 'false' },
          ].forEach(({ value, displayValue, shrink }) => {
            it(`initializes label shrink before hydration with ${prop}=${value} (${variant})`, () => {
              const { hydrate } = renderToString(
                <NumberField variant={variant} label="Amount" {...{ [prop]: value }} />,
              );
              const input = screen.getByRole('textbox', { name: 'Amount' });
              const label = screen.getByText('Amount', { selector: 'label' });

              // No adornment or client effect should be needed to initialize filled state.
              expect(input).to.have.value(displayValue);
              expect(label).to.have.attribute('data-shrink', shrink);

              hydrate();

              expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
              expect(screen.getByText('Amount', { selector: 'label' })).to.equal(label);
              expect(input).to.have.value(displayValue);
              expect(label).to.have.attribute('data-shrink', shrink);
            });
          });
        });
      });
    });

    ['outlined', 'filled', 'standard'].forEach((variant) => {
      ['object', 'callback'].forEach((configuration) => {
        it(`shrinks an empty adorned label before hydration with ${configuration} slot props (${variant})`, () => {
          const adornment = <InputAdornment position="start">$</InputAdornment>;
          const inputSlotProps =
            configuration === 'object'
              ? { startAdornment: adornment }
              : (ownerState) => ({
                  startAdornment: ownerState.readOnly ? adornment : undefined,
                });
          const { hydrate } = renderToString(
            <NumberField
              variant={variant}
              label="Amount"
              readOnly
              slotProps={{ input: inputSlotProps }}
            />,
          );
          const label = screen.getByText('Amount', { selector: 'label' });
          const input = screen.getByRole('textbox', { name: 'Amount' });

          // Assert server markup before InputBase's effect can update FormControl.
          expect(input).to.have.value('');
          expect(screen.getByText('$')).not.to.equal(null);
          expect(label).to.have.attribute('data-shrink', 'true');

          hydrate();

          expect(screen.getByText('Amount', { selector: 'label' })).to.equal(label);
          expect(label).to.have.attribute('data-shrink', 'true');
        });
      });
    });

    [
      { name: 'without adornments', inputSlotProps: undefined },
      {
        name: 'with only an end adornment',
        inputSlotProps: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
      },
    ].forEach(({ name, inputSlotProps }) => {
      it(`does not shrink an empty server-rendered label ${name}`, () => {
        renderToString(<NumberField label="Amount" slotProps={{ input: inputSlotProps }} />);

        expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('');
        expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute(
          'data-shrink',
          'false',
        );
      });
    });

    it('preserves an explicit shrink override when server-rendering a start adornment', () => {
      renderToString(
        <NumberField
          label="Amount"
          slotProps={{
            input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
            inputLabel: { shrink: false },
          }}
        />,
      );

      expect(screen.getByText('$')).not.to.equal(null);
      expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute(
        'data-shrink',
        'false',
      );
    });
  });

  describe('slot prop merging', () => {
    describe('root children', () => {
      [
        { name: 'top-level children', props: { children: 'Replacement' } },
        { name: 'root slot children', props: { slotProps: { root: { children: 'Replacement' } } } },
        {
          name: 'root slot callback children',
          props: { slotProps: { root: () => ({ children: 'Replacement' }) } },
        },
      ].forEach(({ name, props }) => {
        it(`preserves the owned inputs when passed ${name}`, async () => {
          const onValueChange = vi.fn();
          const { user } = render(
            <form aria-label="Number form">
              <NumberField
                label="Amount"
                helperText="Enter an amount"
                name="amount"
                defaultValue={5}
                onValueChange={onValueChange}
                {...props}
              />
            </form>,
          );
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const form = screen.getByRole('form', { name: 'Number form' });

          expect(screen.queryByText('Replacement')).to.equal(null);
          expect(input).to.have.value('5');
          expect(input).to.have.attribute(
            'aria-describedby',
            screen.getByText('Enter an amount').id,
          );
          expect(new FormData(form).getAll('amount')).to.deep.equal(['5']);

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChange.mock.calls[0][0]).to.equal(6);
          expect(new FormData(form).getAll('amount')).to.deep.equal(['6']);
        });
      });
    });

    describe('keyboard handlers and refs', () => {
      ['outlined', 'filled', 'standard'].forEach((variant) => {
        it(`composes Material keyboard handlers with Base UI (${variant})`, async () => {
          const onKeyDown = vi.fn();
          const onKeyUp = vi.fn();
          const { user } = render(
            <NumberField
              variant={variant}
              defaultValue={5}
              slotProps={{ input: { onKeyDown, onKeyUp } }}
            />,
          );
          const input = screen.getByRole('textbox');

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyUp).toHaveBeenCalledTimes(1);
        });

        it(`composes deeper native overrides with Base UI (${variant})`, async () => {
          const earlierHandler = vi.fn();
          const onKeyDown = vi.fn();
          const onKeyUp = vi.fn();
          const inputRef = React.createRef();
          const nativeRef = React.createRef();
          const earlierRef = React.createRef();
          const { user } = render(
            <NumberField
              variant={variant}
              defaultValue={5}
              inputRef={inputRef}
              slotProps={{
                htmlInput: { onKeyDown: earlierHandler, onKeyUp: earlierHandler, ref: earlierRef },
                input: {
                  onKeyDown: earlierHandler,
                  onKeyUp: earlierHandler,
                  inputProps: {
                    onKeyDown: earlierHandler,
                    onKeyUp: earlierHandler,
                    ref: earlierRef,
                  },
                  slotProps: {
                    root: { title: 'Material input' },
                    input: { onKeyDown, onKeyUp, ref: nativeRef },
                  },
                },
              }}
            />,
          );
          const input = screen.getByRole('textbox');
          expect(inputRef.current).to.equal(input);
          expect(nativeRef.current).to.equal(input);
          expect(earlierRef.current).to.equal(null);
          expect(screen.getByTitle('Material input')).to.contain(input);

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyUp).toHaveBeenCalledTimes(1);
          expect(earlierHandler).toHaveBeenCalledTimes(0);
        });

        it(`allows unset native handlers to clear consumer handlers while preserving Base UI (${variant})`, async () => {
          const earlierHandler = vi.fn();
          const { user } = render(
            <NumberField
              variant={variant}
              defaultValue={5}
              slotProps={{
                htmlInput: { onKeyDown: earlierHandler, onKeyUp: earlierHandler },
                input: {
                  onKeyDown: earlierHandler,
                  onKeyUp: earlierHandler,
                  slotProps: { input: { onKeyDown: undefined, onKeyUp: undefined } },
                },
              }}
            />,
          );
          const input = screen.getByRole('textbox');

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(earlierHandler).toHaveBeenCalledTimes(0);
        });

        it(`preserves numeric behavior, handlers and refs with nested inputProps (${variant})`, async () => {
          const onKeyDown = vi.fn();
          const onValueChange = vi.fn();
          const inputRef = React.createRef();
          const nativeRef = React.createRef();
          const { user } = render(
            <NumberField
              variant={variant}
              defaultValue={5}
              inputRef={inputRef}
              onValueChange={onValueChange}
              slotProps={{
                input: {
                  inputProps: {
                    'aria-label': 'Amount',
                    onKeyDown,
                    ref: nativeRef,
                  },
                },
              }}
            />,
          );

          const input = screen.getByRole('textbox', { name: 'Amount' });
          expect(inputRef.current).to.equal(input);
          expect(nativeRef.current).to.equal(input);

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChange.mock.calls[0][0]).to.equal(6);
        });
      });
    });

    describe('callback slot props', () => {
      it('supports nested inputProps returned by an input slot callback', async () => {
        const onKeyDown = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            slotProps={{
              input: (ownerState) => ({
                inputProps: { 'aria-label': ownerState.label, onKeyDown },
              }),
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });

      it('uses htmlInput slot props when nested inputProps are absent', async () => {
        const onKeyDown = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            slotProps={{
              htmlInput: (ownerState) => ({ placeholder: ownerState.label, onKeyDown }),
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        expect(input).to.have.attribute('placeholder', 'Amount');

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });
    });

    describe('native prop precedence', () => {
      ['htmlInput', 'inputProps'].forEach((source) => {
        it(`lets ${source} keyboard handlers override Material handlers`, async () => {
          const materialHandler = vi.fn();
          const onKeyDown = vi.fn();
          const onKeyUp = vi.fn();
          const nativeProps = { onKeyDown, onKeyUp };
          const { user } = render(
            <NumberField
              defaultValue={5}
              slotProps={{
                htmlInput: source === 'htmlInput' ? nativeProps : undefined,
                input: {
                  onKeyDown: materialHandler,
                  onKeyUp: materialHandler,
                  ...(source === 'inputProps' && { inputProps: nativeProps }),
                },
              }}
            />,
          );
          const input = screen.getByRole('textbox');

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyUp).toHaveBeenCalledTimes(1);
          expect(materialHandler).toHaveBeenCalledTimes(0);
        });

        [undefined, null].forEach((unsetValue) => {
          it(`preserves Base UI when ${source} sets keyboard handlers to ${unsetValue}`, async () => {
            const materialHandler = vi.fn();
            const nativeProps = { onKeyDown: unsetValue, onKeyUp: unsetValue };
            const { user } = render(
              <NumberField
                defaultValue={5}
                slotProps={{
                  htmlInput: source === 'htmlInput' ? nativeProps : undefined,
                  input: {
                    onKeyDown: materialHandler,
                    onKeyUp: materialHandler,
                    ...(source === 'inputProps' && { inputProps: nativeProps }),
                  },
                }}
              />,
            );
            const input = screen.getByRole('textbox');

            await user.click(input);
            await user.keyboard('{ArrowUp}');

            expect(input).to.have.value('6');
            expect(materialHandler).toHaveBeenCalledTimes(0);
          });
        });
      });

      it('allows the selected consumer handler to prevent Base UI handling', async () => {
        const onValueChange = vi.fn();
        const onKeyDown = vi.fn((event) => event.preventBaseUIHandler());
        const { user } = render(
          <NumberField
            defaultValue={5}
            onValueChange={onValueChange}
            slotProps={{ input: { slotProps: { input: { onKeyDown } } } }}
          />,
        );

        await user.click(screen.getByRole('textbox'));
        await user.keyboard('{ArrowUp}');

        expect(screen.getByRole('textbox')).to.have.value('5');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledTimes(0);
      });

      it('lets nested inputProps replace the consumer htmlInput slot props', async () => {
        const htmlInputKeyDown = vi.fn();
        const nestedKeyDown = vi.fn();
        const htmlInputRef = React.createRef();
        const nestedRef = React.createRef();
        const { user } = render(
          <NumberField
            defaultValue={5}
            slotProps={{
              htmlInput: {
                placeholder: 'Earlier placeholder',
                onKeyDown: htmlInputKeyDown,
                ref: htmlInputRef,
              },
              input: {
                inputProps: {
                  'aria-label': 'Amount',
                  onKeyDown: nestedKeyDown,
                  ref: nestedRef,
                },
              },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        expect(input).not.to.have.attribute('placeholder');
        expect(htmlInputRef.current).to.equal(null);
        expect(nestedRef.current).to.equal(input);

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(htmlInputKeyDown).toHaveBeenCalledTimes(0);
        expect(nestedKeyDown).toHaveBeenCalledTimes(1);
      });

      it('preserves Base UI behavior when nested inputProps are explicitly undefined', async () => {
        const onKeyDown = vi.fn();
        const { user } = render(
          <NumberField
            defaultValue={5}
            slotProps={{
              htmlInput: { placeholder: 'Earlier placeholder', onKeyDown },
              input: { inputProps: undefined },
            }}
          />,
        );
        const input = screen.getByRole('textbox');
        expect(input).not.to.have.attribute('placeholder');

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(0);
      });
    });

    describe('wrapper and native events', () => {
      it('keeps Material click handlers on the wrapper, including clicks on adornments', async () => {
        const wrapperTargets = [];
        const nativeTargets = [];
        const { user } = render(
          <NumberField
            slotProps={{
              input: {
                onClick: (event) => wrapperTargets.push(event.currentTarget),
                endAdornment: <button type="button">Action</button>,
                slotProps: { root: { title: 'Material input' } },
              },
              htmlInput: { onClick: (event) => nativeTargets.push(event.currentTarget) },
            }}
          />,
        );
        const input = screen.getByRole('textbox');
        const wrapper = screen.getByTitle('Material input');

        await user.click(input);
        await user.click(screen.getByRole('button', { name: 'Action' }));

        expect(wrapperTargets).to.deep.equal([wrapper, wrapper]);
        expect(nativeTargets).to.deep.equal([input]);
      });
    });

    describe('focus, blur and change handlers', () => {
      it('composes deeper native callbacks while preserving Material callback order and state', async () => {
        const calls = [];
        const targets = [];
        const record = (name) => (event) => {
          calls.push(name);
          targets.push(event.currentTarget);
        };
        const replacedHandler = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            onFocus={record('public focus')}
            onBlur={record('public blur')}
            onValueCommitted={onValueCommitted}
            slotProps={{
              htmlInput: {
                onFocus: replacedHandler,
                onBlur: replacedHandler,
                onChange: replacedHandler,
              },
              input: {
                onChange: record('Material change'),
                slotProps: {
                  input: {
                    onFocus: record('native focus'),
                    onBlur: record('native blur'),
                    onChange: record('native change'),
                  },
                },
              },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const label = screen.getByText('Amount', { selector: 'label' });

        await user.click(input);
        expect(label).to.have.class('Mui-focused');
        await user.keyboard('4');
        await user.tab();

        expect(input).to.have.value('4');
        expect(label).not.to.have.class('Mui-focused');
        expect(label).to.have.attribute('data-shrink', 'true');
        expect(calls).to.deep.equal([
          'public focus',
          'native focus',
          'native change',
          'Material change',
          'public blur',
          'native blur',
        ]);
        expect(targets).to.deep.equal(Array(6).fill(input));
        expect(replacedHandler).toHaveBeenCalledTimes(0);
        expect(onValueCommitted).toHaveBeenCalledTimes(1);
        expect(onValueCommitted.mock.calls[0][0]).to.equal(4);
      });

      it('preserves editing and commits when deeper native callbacks are unset', async () => {
        const replacedHandler = vi.fn();
        const materialChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            onValueCommitted={onValueCommitted}
            slotProps={{
              htmlInput: {
                onFocus: replacedHandler,
                onBlur: replacedHandler,
                onChange: replacedHandler,
              },
              input: {
                onChange: materialChange,
                slotProps: {
                  input: { onFocus: undefined, onBlur: undefined, onChange: undefined },
                },
              },
            }}
          />,
        );
        const input = screen.getByRole('textbox');

        await user.click(input);
        await user.keyboard('4');
        await user.tab();

        expect(input).to.have.value('4');
        expect(replacedHandler).toHaveBeenCalledTimes(0);
        expect(materialChange).toHaveBeenCalledTimes(1);
        expect(onValueCommitted).toHaveBeenCalledTimes(1);
        expect(onValueCommitted.mock.calls[0][0]).to.equal(4);
      });

      it('preserves focus, blur and value commits with nested inputProps', async () => {
        const focusTargets = [];
        const blurTargets = [];
        const nativeFocus = vi.fn();
        const nativeBlur = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            onFocus={(event) => focusTargets.push(event.currentTarget)}
            onBlur={(event) => blurTargets.push(event.currentTarget)}
            onValueCommitted={onValueCommitted}
            slotProps={{
              input: { inputProps: { onFocus: nativeFocus, onBlur: nativeBlur } },
            }}
          />,
        );
        const input = screen.getByRole('textbox');

        await user.click(input);
        await user.keyboard('4');
        await user.tab();

        expect(input).to.have.value('4');
        expect(focusTargets).to.deep.equal([input]);
        expect(blurTargets).to.deep.equal([input]);
        expect(nativeFocus).toHaveBeenCalledTimes(1);
        expect(nativeBlur).toHaveBeenCalledTimes(1);
        expect(onValueCommitted).toHaveBeenCalledTimes(1);
        expect(onValueCommitted.mock.calls[0][0]).to.equal(4);
      });
    });
  });
});
