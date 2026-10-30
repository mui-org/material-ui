import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { Field as BaseField } from '@base-ui/react/field';
import type { BaseUIEvent } from '@base-ui/react/types';
import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput, { type OutlinedInputProps } from '@mui/material/OutlinedInput';
import NumberField, {
  numberFieldClasses as classes,
  type NumberFieldOwnerState,
  type NumberFieldProps,
} from '@mui/material/NumberField';
import describeConformance from '../../test/describeConformance';

interface TestSlotProps {
  'data-testid'?: string;
  ownerState?: NumberFieldOwnerState;
  as?: React.ElementType;
}

interface TestNotchedOutlineProps {
  className?: string;
  label?: React.ReactNode;
  notched: boolean;
}

describe('<NumberField />', () => {
  const { render, renderToString } = createRenderer();

  const TestInput = React.forwardRef<HTMLDivElement, OutlinedInputProps & TestSlotProps>(
    function TestInput(props, ref) {
      return <OutlinedInput {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
    },
  );

  const TestHtmlInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentPropsWithoutRef<'input'> & TestSlotProps
  >(function TestHtmlInput(props, ref) {
    const { ownerState, as, ...other } = props;
    return <input {...other} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
  });

  const TestFormControl = React.forwardRef<HTMLDivElement, FormControlProps & TestSlotProps>(
    function TestFormControl(props, ref) {
      return <FormControl {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
    },
  );

  const TestIconButton = React.forwardRef<HTMLButtonElement, IconButtonProps & TestSlotProps>(
    function TestIconButton(props, ref) {
      return <IconButton {...props} ref={ref} data-testid={props['data-testid'] ?? 'custom'} />;
    },
  );

  // Controls is an internal adornment, so cover its theme overrides alongside the
  // replaceable button slots without treating it as a public slot.
  describeConformance(
    <NumberField variant="standard" label="Amount" helperText="Helper text" />,
    () => ({
      classes,
      inheritComponent: FormControl,
      render,
      muiName: 'MuiNumberField',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'outlined' },
      testDeepOverrides: [
        { slotName: 'controls', slotClassName: classes.controls },
        { slotName: 'incrementButton', slotClassName: classes.incrementButton },
        { slotName: 'decrementButton', slotClassName: classes.decrementButton },
      ],
      slots: {
        root: {
          expectedClassName: classes.root,
          testWithComponent: TestFormControl,
          // Keep FormControl context; component conformance covers changing the root's HTML tag.
          testWithElement: null,
        },
        // @ts-expect-error Conformance requires a class name in its types even for slots without one.
        input: {
          testWithComponent: TestInput,
          testWithElement: null,
        },
        // @ts-expect-error Conformance requires a class name in its types even for slots without one.
        htmlInput: {
          testWithComponent: TestHtmlInput,
          testWithElement: 'input',
        },
        // @ts-expect-error Conformance requires a class name in its types even for slots without one.
        inputLabel: {},
        // @ts-expect-error Conformance requires a class name in its types even for slots without one.
        formHelperText: {},
        incrementButton: {
          expectedClassName: classes.incrementButton,
          testWithComponent: TestIconButton,
          testWithElement: 'button',
        },
        decrementButton: {
          expectedClassName: classes.decrementButton,
          testWithComponent: TestIconButton,
          testWithElement: 'button',
        },
      },
    }),
  );

  // Material props must configure the input and surrounding form controls, while
  // slot callbacks retain the public props and Base UI's resolved behavioral flags.
  describe('Material props and owner state', () => {
    // Check the rendered Material components and their context-derived classes so
    // forwarding a prop only to the outer FormControl cannot satisfy the tests.
    describe('Material input and form props', () => {
      const variants = [
        { variant: undefined, expectedVariant: 'outlined', inputClass: 'MuiOutlinedInput-root' },
        { variant: 'outlined', expectedVariant: 'outlined', inputClass: 'MuiOutlinedInput-root' },
        { variant: 'filled', expectedVariant: 'filled', inputClass: 'MuiFilledInput-root' },
        { variant: 'standard', expectedVariant: 'standard', inputClass: 'MuiInput-root' },
      ] as const satisfies readonly {
        variant: NumberFieldProps['variant'];
        expectedVariant: NonNullable<NumberFieldProps['variant']>;
        inputClass: string;
      }[];

      variants.forEach(({ variant, expectedVariant, inputClass }) => {
        it(`renders the ${expectedVariant} Material input with variant=${variant}`, () => {
          render(<NumberField variant={variant} label="Amount" helperText="Helper text" />);
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const wrapper = input.closest('.MuiInputBase-root');
          const label = screen.getByText('Amount', { selector: 'label' });
          const helperText = screen.getByText('Helper text');

          expect(wrapper).to.have.class(inputClass);
          expect(label).to.have.class(`MuiInputLabel-${expectedVariant}`);
          expect(helperText.classList.contains('MuiFormHelperText-contained')).to.equal(
            expectedVariant !== 'standard',
          );
        });
      });

      it('forwards nondefault size, color and fullWidth to Material components', () => {
        render(
          <NumberField
            label="Amount"
            helperText="Helper text"
            size="small"
            color="secondary"
            fullWidth
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const wrapper = input.closest('.MuiInputBase-root')!;
        const root = input.closest(`.${classes.root}`)!;
        const label = screen.getByText('Amount', { selector: 'label' });
        const helperText = screen.getByText('Helper text');

        expect(root).to.have.class('MuiFormControl-fullWidth');
        expect(wrapper).to.have.class('MuiInputBase-fullWidth');
        expect(wrapper).to.have.class('MuiInputBase-sizeSmall');
        expect(label).to.have.class('MuiInputLabel-sizeSmall');
        expect(helperText).to.have.class('MuiFormHelperText-sizeSmall');
        expect(wrapper).to.have.class('MuiInputBase-colorSecondary');
        expect(label).to.have.class('MuiFormLabel-colorSecondary');
      });

      [false, true].forEach((error) => {
        it(`preserves Material error=${error} styling and aria-invalid without Base validation`, () => {
          render(<NumberField label="Amount" helperText="Helper text" error={error} />);
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const wrapper = input.closest('.MuiInputBase-root')!;
          const label = screen.getByText('Amount', { selector: 'label' });
          const helperText = screen.getByText('Helper text');

          expect(input).to.have.attribute('aria-invalid', String(error));
          expect(wrapper.classList.contains('Mui-error')).to.equal(error);
          expect(label.classList.contains('Mui-error')).to.equal(error);
          expect(helperText.classList.contains('Mui-error')).to.equal(error);
        });
      });
    });

    // Observe the actual notch props through OutlinedInput's public slot so these
    // checks verify NumberField's prop precedence without depending on CSS geometry.
    describe('outlined label and notch', () => {
      const TestNotchedOutline = React.forwardRef<HTMLFieldSetElement, TestNotchedOutlineProps>(
        function TestNotchedOutline({ className, label, notched }, ref) {
          return (
            <fieldset
              ref={ref}
              className={className}
              aria-hidden
              data-testid="outline"
              data-notched={notched}
            >
              <legend>{label}</legend>
            </fieldset>
          );
        },
      );

      (['object', 'callback'] as const).forEach((configuration) => {
        [false, true].forEach((shrink) => {
          it(`uses ${configuration} inputLabel.shrink=${shrink} for the outlined notch`, () => {
            render(
              <NumberField
                variant="outlined"
                label="Amount"
                // Make the automatic filled-state notch disagree with the explicit setting.
                defaultValue={shrink ? undefined : 5}
                slotProps={{
                  inputLabel: configuration === 'object' ? { shrink } : () => ({ shrink }),
                  input: { slots: { notchedOutline: TestNotchedOutline } },
                }}
              />,
            );

            expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute(
              'data-shrink',
              String(shrink),
            );
            expect(screen.getByTestId('outline')).to.have.attribute('data-notched', String(shrink));
            expect(screen.getByTestId('outline').querySelector('legend')).to.have.text('Amount');
          });
        });

        [false, true].forEach((notched) => {
          it(`lets ${configuration} input.notched=${notched} override inputLabel.shrink`, () => {
            const inputSlotProps = { notched, slots: { notchedOutline: TestNotchedOutline } };
            render(
              <NumberField
                variant="outlined"
                label="Amount"
                defaultValue={notched ? undefined : 5}
                slotProps={{
                  inputLabel: { shrink: !notched },
                  input: configuration === 'object' ? inputSlotProps : () => inputSlotProps,
                }}
              />,
            );

            expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute(
              'data-shrink',
              String(!notched),
            );
            expect(screen.getByTestId('outline')).to.have.attribute(
              'data-notched',
              String(notched),
            );
          });
        });
      });
    });

    // Every slot callback should see normalized field props and resolved flags,
    // while formatted input text must not replace public numeric value props.
    describe('slot callback owner state', () => {
      const createSlotCallbacks = () => {
        const createCallback = () =>
          vi.fn<(ownerState: NumberFieldOwnerState) => Record<string, never>>(() => ({}));

        return {
          root: createCallback(),
          input: createCallback(),
          htmlInput: createCallback(),
          inputLabel: createCallback(),
          formHelperText: createCallback(),
          incrementButton: createCallback(),
          decrementButton: createCallback(),
        };
      };

      it('exposes normalized defaults and the generated input ID to every slot callback', () => {
        const callbacks = createSlotCallbacks();
        render(<NumberField label="Amount" helperText="Helper text" slotProps={callbacks} />);
        const input = screen.getByRole('textbox', { name: 'Amount' });

        Object.entries(callbacks).forEach(([slot, callback]) => {
          expect(callback, `slotProps.${slot}`).toHaveBeenCalled();
          expect(callback.mock.lastCall![0], `slotProps.${slot}`).to.include({
            variant: 'outlined',
            size: 'medium',
            color: 'primary',
            controlsPosition: 'end',
            disabled: false,
            required: false,
            readOnly: false,
            allowOutOfRange: false,
            allowWheelScrub: false,
            snapOnStep: false,
            id: input.id,
          });
        });
      });

      [
        { inheritedDisabled: true, required: true, readOnly: false },
        { inheritedDisabled: false, required: false, readOnly: true },
      ].forEach(({ inheritedDisabled, required, readOnly }) => {
        it(`exposes resolved disabled=${inheritedDisabled}, required=${required}, readOnly=${readOnly} to every slot callback`, () => {
          const callbacks = createSlotCallbacks();
          render(
            <BaseField.Root disabled={inheritedDisabled}>
              <NumberField
                label="Amount"
                helperText="Helper text"
                disabled={false}
                required={required}
                readOnly={readOnly}
                slotProps={callbacks}
              />
            </BaseField.Root>,
          );

          Object.entries(callbacks).forEach(([slot, callback]) => {
            expect(callback, `slotProps.${slot}`).toHaveBeenCalled();
            expect(callback.mock.lastCall![0], `slotProps.${slot}`).to.include({
              disabled: inheritedDisabled,
              required,
              readOnly,
            });
          });
        });
      });

      const cases = [
        {
          name: 'numeric value',
          props: { value: 1234.5 },
          expectedValue: 1234.5,
          displayValue: '$1,234.50',
        },
        { name: 'zero', props: { value: 0 }, expectedValue: 0, displayValue: '$0.00' },
        { name: 'empty value', props: { value: null }, expectedValue: null, displayValue: '' },
        {
          name: 'uncontrolled default',
          props: { defaultValue: 42 },
          expectedValue: undefined,
          displayValue: '$42.00',
        },
      ] satisfies {
        name: string;
        props: Pick<NumberFieldProps, 'value' | 'defaultValue'>;
        expectedValue: NumberFieldProps['value'];
        displayValue: string;
      }[];

      cases.forEach(({ name, props, expectedValue, displayValue }) => {
        it(`preserves public numeric props alongside formatted text for ${name}`, () => {
          const callbacks = createSlotCallbacks();
          render(
            <NumberField
              label="Amount"
              helperText="Helper text"
              locale="en-US"
              format={{ style: 'currency', currency: 'USD', useGrouping: true }}
              {...props}
              slotProps={callbacks}
            />,
          );
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value(displayValue);

          Object.entries(callbacks).forEach(([slot, callback]) => {
            expect(callback, `slotProps.${slot}`).toHaveBeenCalled();
            const ownerState = callback.mock.lastCall![0];
            expect(ownerState.value, `slotProps.${slot}.value`).to.equal(expectedValue);
            expect(ownerState.defaultValue, `slotProps.${slot}.defaultValue`).to.equal(
              'defaultValue' in props ? props.defaultValue : undefined,
            );
          });
        });
      });
    });
  });

  // Keep Base UI's resolved interaction flags aligned with Material's visual state.
  // Slot customization must preserve editing restrictions and native validation.
  describe('behavioral state', () => {
    const slotPropPaths = [
      { name: 'root', getSlotProps: (props) => ({ root: props }) },
      { name: 'input', getSlotProps: (props) => ({ input: () => props }) },
      { name: 'htmlInput', getSlotProps: (props) => ({ htmlInput: () => props }) },
      { name: 'input.inputProps', getSlotProps: (props) => ({ input: { inputProps: props } }) },
      {
        name: 'input.slotProps.input',
        getSlotProps: (props) => ({ input: { slotProps: { input: props } } }),
      },
    ] satisfies {
      name: string;
      getSlotProps: (
        props: Partial<Pick<NumberFieldOwnerState, 'disabled' | 'required' | 'readOnly'>>,
      ) => NumberFieldProps['slotProps'];
    }[];

    // Exercise conflicting flags at each prop path to catch late spreads that
    // override the field's disabled, required, or read-only behavior.
    describe('slot prop precedence', () => {
      slotPropPaths.forEach(({ name, getSlotProps }) => {
        // Each configuration path can introduce a later spread that changes resolved state.
        describe(`slotProps.${name}`, () => {
          [false, true].forEach((disabled) => {
            it(`preserves top-level disabled=${disabled} despite the opposite slot prop`, async () => {
              const onValueChange = vi.fn();
              const { user } = render(
                <React.Fragment>
                  <NumberField
                    label="Amount"
                    helperText="Helper text"
                    defaultValue={5}
                    disabled={disabled}
                    onValueChange={onValueChange}
                    slotProps={getSlotProps({ disabled: !disabled })}
                  />
                  <button type="button">Next</button>
                </React.Fragment>,
              );
              const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
              const label = screen.getByText('Amount', { selector: 'label' });
              const wrapper = input.closest<HTMLDivElement>('.MuiInputBase-root')!;

              expect(input.disabled).to.equal(disabled);
              expect(wrapper.classList.contains('Mui-disabled')).to.equal(disabled);
              expect(label.classList.contains('Mui-disabled')).to.equal(disabled);
              expect(screen.getByText('Helper text').classList.contains('Mui-disabled')).to.equal(
                disabled,
              );

              await user.tab();
              if (disabled) {
                expect(screen.getByRole('button', { name: 'Next' })).to.equal(
                  document.activeElement,
                );
              } else {
                expect(input).to.equal(document.activeElement);
                await user.keyboard('{ArrowUp}');
              }

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
              const input = screen.getByRole<HTMLInputElement>('textbox', { name: /Amount/ });
              const label = screen.getByText('Amount', { selector: 'label' });

              expect(input.required).to.equal(required);
              expect(label.classList.contains('Mui-required')).to.equal(required);
              expect(label.querySelector('.MuiInputLabel-asterisk') !== null).to.equal(required);
              expect(
                input
                  .closest<HTMLDivElement>('.MuiInputBase-root')!
                  .querySelector('legend')!
                  .textContent.includes('*'),
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
                const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
                const wrapper = input.closest<HTMLDivElement>('.MuiInputBase-root')!;

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
                  expect(onValueChange.mock.lastCall![0]).to.equal(9);
                }
              });
            });
          }
        });
      });
    });

    // Changes after mounting must update Base UI behavior and Material state together,
    // including inherited state, without replacing the input or resetting its value.
    describe('prop updates', () => {
      (['NumberField prop', 'Base Field context'] as const).forEach((source) => {
        it(`updates disabled state from ${source} after mounting`, async () => {
          const onValueChange = vi.fn();

          function Test() {
            const [disabled, setDisabled] = React.useState(false);
            const field = (
              <NumberField
                label="Amount"
                helperText="Helper text"
                defaultValue={5}
                disabled={source === 'NumberField prop' ? disabled : false}
                onValueChange={onValueChange}
                slotProps={{
                  root: { disabled: false },
                  input: { disabled: false },
                  htmlInput: { disabled: false },
                }}
              />
            );

            return (
              <React.Fragment>
                <button type="button" onClick={() => setDisabled((previous) => !previous)}>
                  Toggle disabled
                </button>
                {source === 'Base Field context' ? (
                  <BaseField.Root disabled={disabled}>{field}</BaseField.Root>
                ) : (
                  field
                )}
                <button type="button">Next</button>
              </React.Fragment>
            );
          }

          const { user } = render(<Test />);
          const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
          const wrapper = input.closest<HTMLDivElement>('.MuiInputBase-root')!;
          const label = screen.getByText('Amount', { selector: 'label' });
          const helperText = screen.getByText('Helper text');
          const increment = screen.getByRole<HTMLButtonElement>('button', { name: 'Increase' });
          const decrement = screen.getByRole<HTMLButtonElement>('button', { name: 'Decrease' });
          const toggle = screen.getByRole('button', { name: 'Toggle disabled' });

          const expectDisabledState = (disabled: boolean) => {
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
            expect(input.disabled).to.equal(disabled);
            expect(wrapper.classList.contains('Mui-disabled')).to.equal(disabled);
            expect(label.classList.contains('Mui-disabled')).to.equal(disabled);
            expect(helperText.classList.contains('Mui-disabled')).to.equal(disabled);
            expect(increment.disabled).to.equal(disabled);
            expect(decrement.disabled).to.equal(disabled);
          };

          expectDisabledState(false);
          await user.click(input);
          await user.keyboard('{ArrowUp}');
          expect(input).to.have.value('6');
          expect(onValueChange).toHaveBeenCalledTimes(1);

          await user.click(toggle);
          expectDisabledState(true);
          expect(input).to.have.value('6');
          await user.tab();
          expect(screen.getByRole('button', { name: 'Next' })).to.equal(document.activeElement);
          expect(onValueChange).toHaveBeenCalledTimes(1);

          await user.click(toggle);
          expectDisabledState(false);
          expect(input).to.have.value('6');
          await user.tab();
          expect(input).to.equal(document.activeElement);
          await user.keyboard('{ArrowUp}');
          expect(input).to.have.value('7');
          expect(onValueChange).toHaveBeenCalledTimes(2);
        });
      });

      it('updates required state and validation after mounting', async () => {
        function Test() {
          const [required, setRequired] = React.useState(false);

          return (
            <React.Fragment>
              <button type="button" onClick={() => setRequired((previous) => !previous)}>
                Toggle required
              </button>
              <NumberField label="Amount" required={required} />
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const wrapper = input.closest<HTMLDivElement>('.MuiInputBase-root')!;
        const label = screen.getByText('Amount', { selector: 'label' });
        const toggle = screen.getByRole('button', { name: 'Toggle required' });

        const expectRequiredState = (required: boolean) => {
          expect(screen.getByRole('textbox', { name: /Amount/ })).to.equal(input);
          expect(input.required).to.equal(required);
          expect(label.classList.contains('Mui-required')).to.equal(required);
          expect(label.querySelector('.MuiInputLabel-asterisk') !== null).to.equal(required);
          expect(wrapper.querySelector('legend')!.textContent.includes('*')).to.equal(required);
        };

        expectRequiredState(false);
        expect(input).to.have.value('');
        expect(input.validity.valueMissing).to.equal(false);

        await user.click(toggle);
        expectRequiredState(true);
        expect(input.validity.valueMissing).to.equal(true);
        await user.click(input);
        await user.keyboard('0');
        expect(input).to.have.value('0');
        expect(input.validity.valueMissing).to.equal(false);

        await user.click(toggle);
        expectRequiredState(false);
        expect(input).to.have.value('0');
        await user.clear(input);
        expect(input).to.have.value('');
        expect(input.validity.valueMissing).to.equal(false);
      });

      it('updates read-only state and restores editing after mounting', async () => {
        const onValueChange = vi.fn();

        function Test() {
          const [readOnly, setReadOnly] = React.useState(false);

          return (
            <React.Fragment>
              <button type="button" onClick={() => setReadOnly((previous) => !previous)}>
                Toggle read-only
              </button>
              <NumberField
                label="Amount"
                defaultValue={5}
                readOnly={readOnly}
                onValueChange={onValueChange}
              />
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const wrapper = input.closest<HTMLDivElement>('.MuiInputBase-root')!;
        const increment = screen.getByRole<HTMLButtonElement>('button', { name: 'Increase' });
        const decrement = screen.getByRole<HTMLButtonElement>('button', { name: 'Decrease' });
        const toggle = screen.getByRole('button', { name: 'Toggle read-only' });

        const expectReadOnlyState = (readOnly: boolean) => {
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
          expect(input.readOnly).to.equal(readOnly);
          expect(input.disabled).to.equal(false);
          expect(wrapper.classList.contains('Mui-readOnly')).to.equal(readOnly);
          expect(increment.disabled).to.equal(readOnly);
          expect(decrement.disabled).to.equal(readOnly);
        };

        expectReadOnlyState(false);
        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('6');
        expect(onValueChange).toHaveBeenCalledTimes(1);

        await user.click(toggle);
        expectReadOnlyState(true);
        await user.tab();
        expect(input).to.equal(document.activeElement);
        await user.keyboard('9{ArrowUp}');
        expect(input).to.have.value('6');
        expect(onValueChange).toHaveBeenCalledTimes(1);

        await user.click(toggle);
        expectReadOnlyState(false);
        expect(input).to.have.value('6');
        await user.tab();
        expect(input).to.equal(document.activeElement);
        await user.clear(input);
        await user.keyboard('9');
        expect(input).to.have.value('9');
        expect(onValueChange.mock.lastCall![0]).to.equal(9);
      });
    });

    // A surrounding Base Field can disable NumberField even when its own prop is false.
    // The Material input, label, and helper text must reflect that inherited state.
    describe('inherited disabled state', () => {
      slotPropPaths.forEach(({ name, getSlotProps }) => {
        // Check each override path because any one can clear inherited disabled state.
        describe(`slotProps.${name}`, () => {
          it('preserves inherited Base UI disabled state despite explicit false props', async () => {
            const onValueChange = vi.fn();
            const { user } = render(
              <React.Fragment>
                <BaseField.Root disabled>
                  <NumberField
                    label="Amount"
                    helperText="Helper text"
                    defaultValue={5}
                    disabled={false}
                    onValueChange={onValueChange}
                    slotProps={getSlotProps({ disabled: false })}
                  />
                </BaseField.Root>
                <button type="button">Next</button>
              </React.Fragment>,
            );
            const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });

            expect(input.disabled).to.equal(true);
            expect(input.closest('.MuiInputBase-root')).to.have.class('Mui-disabled');
            expect(screen.getByText('Amount', { selector: 'label' })).to.have.class('Mui-disabled');
            expect(screen.getByText('Helper text')).to.have.class('Mui-disabled');

            await user.tab();
            expect(screen.getByRole('button', { name: 'Next' })).to.equal(document.activeElement);

            expect(input).to.have.value('5');
            expect(onValueChange).toHaveBeenCalledTimes(0);
          });
        });
      });
    });
  });

  // The Material buttons must retain Base UI stepping, commit timing, and availability
  // while supplying the default presentation expected from a Material number field.
  describe('controls', () => {
    // A mouse press changes the value immediately and commits on release; the
    // synthesized click must not repeat either action through the Material wrapper.
    describe('stepping and callbacks', () => {
      [
        { name: 'Increase', expectedValue: 6, reason: 'increment-press' },
        { name: 'Decrease', expectedValue: 4, reason: 'decrement-press' },
      ].forEach(({ name, expectedValue, reason }) => {
        it(`steps once and commits on release for ${name}`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const { user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
            />,
          );
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const button = screen.getByRole('button', { name });

          await user.pointer({ keys: '[MouseLeft>]', target: button });
          expect(input).to.have.value(String(expectedValue));
          expect(input).to.equal(document.activeElement);
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChange.mock.calls[0][0]).to.equal(expectedValue);
          expect(onValueChange.mock.calls[0][1].reason).to.equal(reason);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);

          await user.pointer({ keys: '[/MouseLeft]', target: button });
          expect(input).to.have.value(String(expectedValue));
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueCommitted).toHaveBeenCalledTimes(1);
          expect(onValueCommitted.mock.calls[0][0]).to.equal(expectedValue);
          expect(onValueCommitted.mock.calls[0][1].reason).to.equal(reason);
        });
      });
    });

    // Field state and bounds must disable the native buttons, not just their styling.
    // Ignore CSS hit-testing when attempting disabled clicks to exercise that guard.
    describe('availability', () => {
      it('disables controls at each bound and enables them after stepping away', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const view = render(
          <NumberField
            label="Amount"
            defaultValue={1}
            min={0}
            max={2}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const user = view.user.setup({ pointerEventsCheck: 0 });
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const increment = screen.getByRole<HTMLButtonElement>('button', { name: 'Increase' });
        const decrement = screen.getByRole<HTMLButtonElement>('button', { name: 'Decrease' });

        expect(increment.disabled).to.equal(false);
        expect(decrement.disabled).to.equal(false);

        await user.click(increment);
        expect(input).to.have.value('2');
        expect(increment.disabled).to.equal(true);
        expect(increment).to.have.class('Mui-disabled');
        expect(decrement.disabled).to.equal(false);
        await user.click(increment);
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueCommitted).toHaveBeenCalledTimes(1);

        await user.click(decrement);
        expect(input).to.have.value('1');
        expect(increment.disabled).to.equal(false);
        expect(increment).not.to.have.class('Mui-disabled');

        await user.click(decrement);
        expect(input).to.have.value('0');
        expect(decrement.disabled).to.equal(true);
        expect(decrement).to.have.class('Mui-disabled');
        expect(increment.disabled).to.equal(false);
        await user.click(decrement);
        expect(onValueChange).toHaveBeenCalledTimes(3);
        expect(onValueCommitted).toHaveBeenCalledTimes(3);

        await user.click(increment);
        expect(input).to.have.value('1');
        expect(decrement.disabled).to.equal(false);
        expect(decrement).not.to.have.class('Mui-disabled');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([2, 1, 0, 1]);
        expect(onValueCommitted.mock.calls.map(([value]) => value)).to.deep.equal([2, 1, 0, 1]);
      });

      [
        { name: 'disabled', disabled: true, readOnly: false, inheritedDisabled: false },
        { name: 'read-only', disabled: false, readOnly: true, inheritedDisabled: false },
        { name: 'inherited disabled', disabled: false, readOnly: false, inheritedDisabled: true },
      ].forEach(({ name, disabled, readOnly, inheritedDisabled }) => {
        it(`cannot re-enable ${name} controls with disabled=false slot props`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const view = render(
            <BaseField.Root disabled={inheritedDisabled}>
              <NumberField
                label="Amount"
                defaultValue={5}
                disabled={disabled}
                readOnly={readOnly}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
                slotProps={{
                  incrementButton: { disabled: false },
                  decrementButton: { disabled: false },
                }}
              />
            </BaseField.Root>,
          );
          const user = view.user.setup({ pointerEventsCheck: 0 });
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const buttons = screen.getAllByRole<HTMLButtonElement>('button');

          expect(buttons).to.have.length(2);
          for (const button of buttons) {
            expect(button.disabled).to.equal(true);
            expect(button).to.have.class('Mui-disabled');
          }
          await user.click(buttons[0]);
          await user.click(buttons[1]);

          expect(input).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);
        });
      });

      [
        {
          disabledSlot: 'incrementButton',
          disabledName: 'Increase',
          activeName: 'Decrease',
          value: 4,
        },
        {
          disabledSlot: 'decrementButton',
          disabledName: 'Decrease',
          activeName: 'Increase',
          value: 6,
        },
      ].forEach(({ disabledSlot, disabledName, activeName, value }) => {
        it(`disables ${disabledSlot} independently without blocking the other control`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const view = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={{
                incrementButton: { disabled: disabledSlot === 'incrementButton' },
                decrementButton: { disabled: disabledSlot === 'decrementButton' },
              }}
            />,
          );
          const user = view.user.setup({ pointerEventsCheck: 0 });
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const disabledButton = screen.getByRole<HTMLButtonElement>('button', {
            name: disabledName,
          });
          const activeButton = screen.getByRole<HTMLButtonElement>('button', { name: activeName });

          expect(disabledButton.disabled).to.equal(true);
          expect(activeButton.disabled).to.equal(false);
          await user.click(disabledButton);
          expect(input).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);

          await user.click(activeButton);
          expect(input).to.have.value(String(value));
          expect(disabledButton.disabled).to.equal(true);
          expect(activeButton.disabled).to.equal(false);
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChange.mock.calls[0][0]).to.equal(value);
          expect(onValueCommitted).toHaveBeenCalledTimes(1);
          expect(onValueCommitted.mock.calls[0][0]).to.equal(value);
        });
      });

      [
        {
          name: 'upper',
          min: 0,
          max: 5,
          disabledName: 'Increase',
          activeName: 'Decrease',
          value: 4,
        },
        {
          name: 'lower',
          min: 5,
          max: 10,
          disabledName: 'Decrease',
          activeName: 'Increase',
          value: 6,
        },
      ].forEach(({ name, min, max, disabledName, activeName, value }) => {
        it(`cannot bypass the ${name} bound with disabled=false slot props`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const view = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              min={min}
              max={max}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={{
                incrementButton: { disabled: false },
                decrementButton: { disabled: false },
              }}
            />,
          );
          const user = view.user.setup({ pointerEventsCheck: 0 });
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const disabledButton = screen.getByRole<HTMLButtonElement>('button', {
            name: disabledName,
          });
          const activeButton = screen.getByRole<HTMLButtonElement>('button', { name: activeName });

          expect(disabledButton.disabled).to.equal(true);
          await user.click(disabledButton);
          expect(input).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);

          await user.click(activeButton);
          expect(input).to.have.value(String(value));
          expect(disabledButton.disabled).to.equal(false);
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChange.mock.calls[0][0]).to.equal(value);
          expect(onValueCommitted).toHaveBeenCalledTimes(1);
          expect(onValueCommitted.mock.calls[0][0]).to.equal(value);
        });
      });
    });

    // Defaults must remain visible and inherit the field size, while replacing the
    // icon content must leave button names and stepping behavior intact.
    describe('icons and size', () => {
      it('renders default plus/minus icons and forwards the field size to both controls', () => {
        render(<NumberField label="Amount" size="small" />);
        const increment = screen.getByRole('button', { name: 'Increase' });
        const decrement = screen.getByRole('button', { name: 'Decrease' });
        const addIcon = screen.getByTestId('AddIcon');
        const removeIcon = screen.getByTestId('RemoveIcon');

        expect(increment).to.contain(addIcon);
        expect(decrement).to.contain(removeIcon);
        for (const button of [increment, decrement]) {
          expect(button).to.have.attribute('type', 'button');
          expect(button).to.have.class('MuiIconButton-sizeSmall');
        }
        for (const icon of [addIcon, removeIcon]) {
          expect(icon).to.have.class('MuiSvgIcon-fontSizeInherit');
          expect(icon).to.have.attribute('aria-hidden', 'true');
        }
      });

      it('replaces the default icons with consumer children while preserving stepping', async () => {
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            slotProps={{
              incrementButton: { children: <span>Plus</span> },
              decrementButton: { children: <span>Minus</span> },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const increment = screen.getByRole('button', { name: 'Increase' });
        const decrement = screen.getByRole('button', { name: 'Decrease' });

        expect(increment).to.contain(screen.getByText('Plus'));
        expect(decrement).to.contain(screen.getByText('Minus'));
        expect(screen.queryByTestId('AddIcon')).to.equal(null);
        expect(screen.queryByTestId('RemoveIcon')).to.equal(null);
        await user.click(increment);
        expect(input).to.have.value('6');
        await user.click(decrement);
        expect(input).to.have.value('5');
      });
    });
  });

  // Consumer button props must survive both useSlot and the Base UI render adapter.
  // Exercise each control's wiring without repeating the shared input variants.
  describe('button slot props', () => {
    const NativeButton = React.forwardRef<
      HTMLButtonElement,
      React.ComponentPropsWithoutRef<'button'>
    >(function NativeButton(props, ref) {
      return <button {...props} ref={ref} data-testid="button-component" />;
    });

    (
      [
        { slot: 'incrementButton', name: 'Increase', nextValue: 6 },
        { slot: 'decrementButton', name: 'Decrease', nextValue: 4 },
      ] as const
    ).forEach(({ slot, name, nextValue }) => {
      describe(`slotProps.${slot}`, () => {
        // Ordinary props override defaults, while classes, styles and refs must
        // merge with Base UI's props rather than erase its accessibility or behavior.
        describe('props and refs', () => {
          it('merges object slot props and attaches and clears the consumer ref', async () => {
            const ref = React.createRef<HTMLButtonElement>();
            const { user, unmount } = render(
              <NumberField
                id="amount"
                label="Amount"
                defaultValue={5}
                slotProps={{
                  [slot]: {
                    ref,
                    'aria-label': 'Custom step',
                    title: 'Step amount',
                    style: { marginLeft: 7 },
                    size: 'small',
                  },
                }}
              />,
            );
            const button = screen.getByRole('button', { name: 'Custom step' });
            const input = screen.getByRole('textbox', { name: 'Amount' });

            expect(button).to.have.class('MuiIconButton-sizeSmall');
            expect(button).to.have.attribute('aria-controls', input.id);
            expect(button).to.have.attribute('tabindex', '-1');
            expect(button).to.have.attribute('title', 'Step amount');
            expect(button.style.marginLeft).to.equal('7px');
            expect(button.style.userSelect).to.equal('none');
            expect(ref.current).to.equal(button);

            await user.click(button);

            expect(input).to.have.value(String(nextValue));
            expect(document.activeElement).to.equal(input);
            unmount();
            expect(ref.current).to.equal(null);
          });

          it('resolves callback props for a custom slot and preserves its ref and behavior', async () => {
            const ref = vi.fn();
            const getSlotProps = (ownerState: NumberFieldOwnerState) => ({
              ref,
              'aria-label': `Step ${ownerState.label}`,
              className: 'custom-button',
              style: { userSelect: 'text' as const },
            });
            const { user, unmount } = render(
              <NumberField
                id="amount"
                label="Amount"
                defaultValue={5}
                slots={{ [slot]: TestIconButton }}
                slotProps={{ [slot]: getSlotProps }}
              />,
            );
            const button = screen.getByRole('button', { name: 'Step Amount' });
            const input = screen.getByRole('textbox', { name: 'Amount' });

            expect(button).to.equal(screen.getByTestId('custom'));
            expect(button).to.have.class(classes[slot]);
            expect(button).to.have.class('custom-button');
            expect(button).to.have.attribute('aria-controls', input.id);
            expect(button.style.userSelect).to.equal('text');
            expect(ref).toHaveBeenLastCalledWith(button);

            await user.click(button);

            expect(input).to.have.value(String(nextValue));
            expect(document.activeElement).to.equal(input);
            unmount();
            expect(ref).toHaveBeenLastCalledWith(null);
          });

          it('forwards the component prop through the default Material button slot', async () => {
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                slotProps={{ [slot]: { component: NativeButton } }}
              />,
            );
            const button = screen.getByRole('button', { name });

            expect(button).to.equal(screen.getByTestId('button-component'));
            expect(button).to.have.class('MuiIconButton-root');
            await user.click(button);
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value(
              String(nextValue),
            );
          });
        });

        // Consumer handlers run before Base UI and may cancel it explicitly.
        // A normal handler or an unset handler must retain stepping and commits.
        describe('event composition', () => {
          it('composes pointer and click handlers with a single step and commit', async () => {
            const calls: string[] = [];
            const targets: EventTarget[] = [];
            const record =
              (handler: string) => (event: React.SyntheticEvent<HTMLButtonElement>) => {
                calls.push(handler);
                targets.push(event.currentTarget);
              };
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                onValueChange={() => calls.push('change')}
                onValueCommitted={() => calls.push('commit')}
                slotProps={{
                  [slot]: {
                    onPointerDown: record('pointerdown'),
                    onPointerUp: record('pointerup'),
                    onClick: record('click'),
                  },
                }}
              />,
            );
            const button = screen.getByRole('button', { name });

            await user.click(button);

            expect(calls).to.deep.equal(['pointerdown', 'change', 'pointerup', 'commit', 'click']);
            expect(targets).to.deep.equal([button, button, button]);
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value(
              String(nextValue),
            );
          });

          it('composes a keyboard click handler before Base UI changes the value', async () => {
            const calls: string[] = [];
            const targets: EventTarget[] = [];
            const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
              calls.push('click');
              targets.push(event.currentTarget);
            };
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                onValueChange={() => calls.push('change')}
                onValueCommitted={() => calls.push('commit')}
                slotProps={{ [slot]: { tabIndex: 0, onClick } }}
              />,
            );
            const button = screen.getByRole('button', { name });

            await user.tab();
            await user.tab();
            expect(document.activeElement).to.equal(button);
            await user.keyboard('{Enter}');

            expect(calls).to.deep.equal(['click', 'change', 'commit']);
            expect(targets).to.deep.equal([button]);
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value(
              String(nextValue),
            );
          });

          it('allows the consumer pointer handler to prevent Base UI stepping', async () => {
            const onValueChange = vi.fn();
            const onValueCommitted = vi.fn();
            const onPointerDown = vi.fn(
              (event: BaseUIEvent<React.PointerEvent<HTMLButtonElement>>) =>
                event.preventBaseUIHandler(),
            );
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
                slotProps={{ [slot]: { onPointerDown } }}
              />,
            );

            await user.click(screen.getByRole('button', { name }));

            expect(onPointerDown).toHaveBeenCalledTimes(1);
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('5');
            expect(onValueChange).toHaveBeenCalledTimes(0);
            expect(onValueCommitted).toHaveBeenCalledTimes(0);
          });

          it('allows the consumer click handler to prevent keyboard stepping', async () => {
            const onValueChange = vi.fn();
            const onValueCommitted = vi.fn();
            const onClick = vi.fn((event: BaseUIEvent<React.MouseEvent<HTMLButtonElement>>) =>
              event.preventBaseUIHandler(),
            );
            const { user } = render(
              <NumberField
                label="Amount"
                defaultValue={5}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
                slotProps={{ [slot]: { tabIndex: 0, onClick } }}
              />,
            );
            const button = screen.getByRole('button', { name });

            await user.tab();
            await user.tab();
            expect(document.activeElement).to.equal(button);
            await user.keyboard('{Enter}');

            expect(onClick).toHaveBeenCalledTimes(1);
            expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('5');
            expect(onValueChange).toHaveBeenCalledTimes(0);
            expect(onValueCommitted).toHaveBeenCalledTimes(0);
          });

          [undefined, null].forEach((unsetValue) => {
            it(`preserves Base UI handlers when consumer handlers are ${unsetValue}`, async () => {
              // JavaScript consumers can pass null handlers, which React's types exclude.
              const buttonProps = {
                tabIndex: 0,
                onPointerDown: unsetValue,
                onPointerUp: unsetValue,
                onClick: unsetValue,
              } as IconButtonProps;
              const onValueChange = vi.fn();
              const onValueCommitted = vi.fn();
              const { user } = render(
                <NumberField
                  label="Amount"
                  defaultValue={5}
                  onValueChange={onValueChange}
                  onValueCommitted={onValueCommitted}
                  slotProps={{ [slot]: buttonProps }}
                />,
              );

              const button = screen.getByRole('button', { name });
              const input = screen.getByRole('textbox', { name: 'Amount' });

              await user.click(button);

              expect(input).to.have.value(String(nextValue));
              expect(onValueChange).toHaveBeenCalledTimes(1);
              expect(onValueCommitted).toHaveBeenCalledTimes(1);

              await user.tab();
              expect(document.activeElement).to.equal(button);
              await user.keyboard('{Enter}');

              expect(input).to.have.value(String(nextValue + (nextValue - 5)));
              expect(onValueChange).toHaveBeenCalledTimes(2);
              expect(onValueCommitted).toHaveBeenCalledTimes(2);
            });
          });
        });
      });
    });
  });

  // Controls must occupy the requested adornment, with consumer adornments kept
  // beside the input. Check DOM order and grouping without depending on layout measurements.
  describe('controls placement', () => {
    const placements = [
      {
        controlsPosition: undefined,
        startButtons: [],
        endButtons: ['Increase', 'Decrease'],
      },
      {
        controlsPosition: 'end',
        startButtons: [],
        endButtons: ['Increase', 'Decrease'],
      },
      {
        controlsPosition: 'start',
        startButtons: ['Increase', 'Decrease'],
        endButtons: [],
      },
      {
        controlsPosition: 'split',
        startButtons: ['Decrease'],
        endButtons: ['Increase'],
      },
    ] as const;

    placements.forEach(({ controlsPosition, startButtons, endButtons }) => {
      it(`composes consumer adornments with controlsPosition=${controlsPosition ?? 'default'}`, () => {
        render(
          <NumberField
            label="Amount"
            controlsPosition={controlsPosition}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <button type="button">Start action</button>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <button type="button">End action</button>
                  </InputAdornment>
                ),
              },
            }}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const wrapper = input.closest('.MuiInputBase-root')!;
        const buttons = {
          Increase: screen.getByRole('button', { name: 'Increase' }),
          Decrease: screen.getByRole('button', { name: 'Decrease' }),
        };
        const startAction = screen.getByRole('button', { name: 'Start action' });
        const endAction = screen.getByRole('button', { name: 'End action' });
        const expectedStartButtons = startButtons.map((name) => buttons[name]);
        const expectedEndButtons = endButtons.map((name) => buttons[name]);

        expect(
          Array.from(wrapper.querySelectorAll('button, input:not([type="hidden"])')),
        ).to.deep.equal([
          ...expectedStartButtons,
          startAction,
          input,
          endAction,
          ...expectedEndButtons,
        ]);

        // The built-in groups must contain only their own buttons, leaving consumer
        // adornments outside those groups even when they share the same input side.
        const groups = Array.from(wrapper.querySelectorAll(`.${classes.controls}`));
        const expectedGroups = [
          ...(startButtons.length
            ? [{ positionClass: 'MuiInputAdornment-positionStart', buttons: expectedStartButtons }]
            : []),
          ...(endButtons.length
            ? [{ positionClass: 'MuiInputAdornment-positionEnd', buttons: expectedEndButtons }]
            : []),
        ];

        expect(groups).to.have.length(expectedGroups.length);
        expectedGroups.forEach(({ positionClass, buttons: groupButtons }, index) => {
          expect(groups[index]).to.have.class(positionClass);
          expect(Array.from(groups[index].querySelectorAll('button'))).to.deep.equal(groupButtons);
        });
      });
    });

    it('keeps callback adornment actions independent from the built-in controls', async () => {
      const onStartAction = vi.fn();
      const onEndAction = vi.fn();
      const onValueChange = vi.fn();
      const { user } = render(
        <NumberField
          label="Amount"
          defaultValue={5}
          controlsPosition="split"
          onValueChange={onValueChange}
          slotProps={{
            input: (ownerState) => ({
              startAdornment: (
                <InputAdornment position="start">
                  <button type="button" onClick={onStartAction}>
                    {ownerState.label} start
                  </button>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <button type="button" onClick={onEndAction}>
                    {ownerState.label} end
                  </button>
                </InputAdornment>
              ),
            }),
          }}
        />,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });

      await user.click(screen.getByRole('button', { name: 'Amount start' }));
      expect(input).to.have.value('5');

      await user.click(screen.getByRole('button', { name: 'Amount end' }));
      expect(input).to.have.value('5');

      expect(onStartAction).toHaveBeenCalledTimes(1);
      expect(onEndAction).toHaveBeenCalledTimes(1);
      expect(onValueChange).toHaveBeenCalledTimes(0);

      await user.click(screen.getByRole('button', { name: 'Increase' }));
      expect(input).to.have.value('6');
      await user.click(screen.getByRole('button', { name: 'Decrease' }));
      expect(input).to.have.value('5');
      expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, 5]);
      expect(onStartAction).toHaveBeenCalledTimes(1);
      expect(onEndAction).toHaveBeenCalledTimes(1);
    });

    it('moves controls after mounting without replacing the input or resetting its edited value', async () => {
      function Test() {
        const [controlsPosition, setControlsPosition] =
          React.useState<NonNullable<NumberFieldProps['controlsPosition']>>('end');

        return (
          <React.Fragment>
            <button
              type="button"
              onClick={() =>
                setControlsPosition((position) => {
                  if (position === 'end') {
                    return 'start';
                  }
                  return position === 'start' ? 'split' : 'end';
                })
              }
            >
              Move controls
            </button>
            <NumberField label="Amount" defaultValue={5} controlsPosition={controlsPosition} />
          </React.Fragment>
        );
      }

      const { user } = render(<Test />);
      const input = screen.getByRole('textbox', { name: 'Amount' });

      await user.clear(input);
      await user.keyboard('8');

      const moveAndCheckControls = async (
        position: NonNullable<NumberFieldProps['controlsPosition']>,
      ) => {
        await user.click(screen.getByRole('button', { name: 'Move controls' }));

        expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
        expect(input).to.have.value('8');
        const increment = screen.getByRole('button', { name: 'Increase' });
        const decrement = screen.getByRole('button', { name: 'Decrease' });

        expect(increment.closest(`.${classes.controls}`)).to.have.class(
          position === 'start'
            ? 'MuiInputAdornment-positionStart'
            : 'MuiInputAdornment-positionEnd',
        );
        expect(decrement.closest(`.${classes.controls}`)).to.have.class(
          position === 'end' ? 'MuiInputAdornment-positionEnd' : 'MuiInputAdornment-positionStart',
        );

        await user.click(increment);
        expect(input).to.have.value('9');
        await user.click(decrement);
        expect(input).to.have.value('8');
      };

      await moveAndCheckControls('start');
      await moveAndCheckControls('split');
      await moveAndCheckControls('end');
    });
  });

  // Protect the Base-owned visible input and form input from consumer children,
  // which would otherwise break editing, accessibility links, and submission.
  describe('root children ownership', () => {
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
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const form = screen.getByRole<HTMLFormElement>('form', { name: 'Number form' });

        expect(screen.queryByText('Replacement')).to.equal(null);
        expect(input).to.have.value('5');
        expect(input).to.have.attribute('aria-describedby', screen.getByText('Enter an amount').id);
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

  // Resolve Material and native consumer configurations before composing Base UI
  // behavior, so later InputBase spreads preserve the chosen handlers and refs.
  describe('input slot props', () => {
    // Replacing the Material wrapper or native input must retain the refs and event
    // wiring that connect Base UI editing with Material focus and styling.
    describe('input customization', () => {
      it('preserves Material input behavior with a custom root element', async () => {
        const wrapperRef = React.createRef<HTMLElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        const onValueChange = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            inputRef={inputRef}
            onValueChange={onValueChange}
            slotProps={{
              input: {
                component: 'section',
                ref: wrapperRef,
                className: 'custom-input',
                sx: { paddingLeft: '37px' },
              },
            }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const wrapper = input.closest<HTMLElement>('.MuiInputBase-root')!;
        const label = screen.getByText('Amount', { selector: 'label' });

        expect(wrapper.tagName).to.equal('SECTION');
        expect(wrapper).to.have.class('custom-input');
        expect(window.getComputedStyle(wrapper).paddingLeft).to.equal('37px');
        expect(wrapperRef.current).to.equal(wrapper);
        expect(inputRef.current).to.equal(input);

        await user.click(input);
        expect(input).to.equal(document.activeElement);
        expect(label).to.have.class('Mui-focused');
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('6');
        await user.clear(input);
        await user.keyboard('8');
        expect(input).to.have.value('8');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, null, 8]);
      });

      it('preserves editing, handlers and refs with a custom native input', async () => {
        const inputRef = React.createRef<HTMLInputElement>();
        const nativeRef = React.createRef<HTMLInputElement>();
        const onValueChange = vi.fn();
        const onChange = vi.fn();
        const keyDownTargets: HTMLElement[] = [];
        const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
          keyDownTargets.push(event.currentTarget);
        };
        const { user } = render(
          <React.Fragment>
            <NumberField
              label="Amount"
              defaultValue={5}
              inputRef={inputRef}
              onValueChange={onValueChange}
              slots={{ htmlInput: TestHtmlInput }}
              slotProps={{ htmlInput: { ref: nativeRef, onKeyDown, onChange } }}
            />
            <button type="button">Outside</button>
          </React.Fragment>,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });

        expect(screen.getByTestId('custom')).to.equal(input);
        expect(inputRef.current).to.equal(input);
        expect(nativeRef.current).to.equal(input);

        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('6');
        expect(keyDownTargets).to.deep.equal([input]);
        await user.clear(input);
        await user.keyboard('8');
        expect(input).to.have.value('8');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, null, 8]);

        // A control press uses Base UI's internal input ref to restore focus.
        await user.click(screen.getByRole('button', { name: 'Outside' }));
        expect(input).not.to.equal(document.activeElement);
        await user.click(screen.getByRole('button', { name: 'Increase' }));
        expect(input).to.equal(document.activeElement);
        expect(input).to.have.value('9');
        expect(inputRef.current).to.equal(input);
        expect(nativeRef.current).to.equal(input);
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, null, 8, 9]);
      });

      it('preserves editing, handlers and refs with a custom Material input', async () => {
        const wrapperRef = React.createRef<HTMLDivElement>();
        const inputRef = React.createRef<HTMLInputElement>();
        const nativeRef = React.createRef<HTMLInputElement>();
        const onValueChange = vi.fn();
        const onChange = vi.fn();
        const keyDownTargets: HTMLElement[] = [];
        const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
          keyDownTargets.push(event.currentTarget);
        };
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            inputRef={inputRef}
            onValueChange={onValueChange}
            slots={{ input: TestInput }}
            slotProps={{
              input: { ref: wrapperRef, onKeyDown, onChange },
              htmlInput: { ref: nativeRef },
            }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        const wrapper = screen.getByTestId('custom');
        const label = screen.getByText('Amount', { selector: 'label' });

        expect(wrapper).to.contain(input);
        expect(wrapperRef.current).to.equal(wrapper);
        expect(inputRef.current).to.equal(input);
        expect(nativeRef.current).to.equal(input);

        await user.click(input);
        expect(input).to.equal(document.activeElement);
        expect(label).to.have.class('Mui-focused');
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('6');
        expect(keyDownTargets).to.deep.equal([input]);
        await user.clear(input);
        await user.keyboard('8');
        expect(input).to.have.value('8');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, null, 8]);
      });
    });

    // Compose keyboard handlers and selected refs on the native input so slot
    // customization preserves stepping and access to the visible input.
    describe('keyboard handlers and refs', () => {
      it('composes Material keyboard handlers with Base UI', async () => {
        const targets: HTMLElement[] = [];
        const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLElement>) => {
          targets.push(event.currentTarget);
        });
        const onKeyUp = vi.fn((event: React.KeyboardEvent<HTMLElement>) => {
          targets.push(event.currentTarget);
        });
        const { user } = render(
          <NumberField defaultValue={5} slotProps={{ input: { onKeyDown, onKeyUp } }} />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyUp).toHaveBeenCalledTimes(1);
        expect(targets).to.deep.equal([input, input]);
      });

      it('composes deeper native overrides with Base UI', async () => {
        const earlierHandler = vi.fn();
        const targets: HTMLElement[] = [];
        const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLElement>) => {
          targets.push(event.currentTarget);
        });
        const onKeyUp = vi.fn((event: React.KeyboardEvent<HTMLElement>) => {
          targets.push(event.currentTarget);
        });
        const inputRef = React.createRef<HTMLInputElement>();
        const nativeRef = React.createRef<HTMLInputElement>();
        const earlierRef = React.createRef<HTMLInputElement>();
        const { user } = render(
          <NumberField
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
                  input: {
                    onKeyDown,
                    onKeyUp,
                    ref: nativeRef,
                  } as React.ComponentPropsWithRef<'input'>,
                },
              },
            }}
          />,
        );
        const input = screen.getByRole<HTMLInputElement>('textbox');
        expect(inputRef.current).to.equal(input);
        expect(nativeRef.current).to.equal(input);
        expect(earlierRef.current).to.equal(null);
        expect(screen.getByTitle('Material input')).to.contain(input);

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onKeyUp).toHaveBeenCalledTimes(1);
        expect(targets).to.deep.equal([input, input]);
        expect(earlierHandler).toHaveBeenCalledTimes(0);
      });

      it('allows unset native handlers to clear consumer handlers while preserving Base UI', async () => {
        const earlierHandler = vi.fn();
        const { user } = render(
          <NumberField
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
        const input = screen.getByRole<HTMLInputElement>('textbox');

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(earlierHandler).toHaveBeenCalledTimes(0);
      });
    });

    // Resolve callback slot props with owner state before selecting native props,
    // giving callback configurations the same behavior as object configurations.
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
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        expect(input).to.have.attribute('aria-label', 'Amount');

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
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        expect(input).to.have.attribute('placeholder', 'Amount');

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
      });
    });

    // Preserve precedence between Material handlers, htmlInput, nested inputProps,
    // and the deeper native slot while keeping Base UI's handlers cancellable.
    describe('native prop precedence', () => {
      ['htmlInput', 'inputProps'].forEach((source) => {
        it(`lets ${source} keyboard handlers override Material handlers`, async () => {
          const materialHandler = vi.fn();
          const targets: HTMLElement[] = [];
          const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLElement>) => {
            targets.push(event.currentTarget);
          });
          const onKeyUp = vi.fn((event: React.KeyboardEvent<HTMLElement>) => {
            targets.push(event.currentTarget);
          });
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
          const input = screen.getByRole<HTMLInputElement>('textbox');

          await user.click(input);
          await user.keyboard('{ArrowUp}');

          expect(input).to.have.value('6');
          expect(onKeyDown).toHaveBeenCalledTimes(1);
          expect(onKeyUp).toHaveBeenCalledTimes(1);
          expect(targets).to.deep.equal([input, input]);
          expect(materialHandler).toHaveBeenCalledTimes(0);
        });

        [undefined, null].forEach((unsetValue) => {
          it(`preserves Base UI when ${source} sets keyboard handlers to ${unsetValue}`, async () => {
            const materialHandler = vi.fn();
            // JavaScript consumers can pass null handlers, which React's types exclude.
            const nativeProps = {
              onKeyDown: unsetValue,
              onKeyUp: unsetValue,
            } as React.InputHTMLAttributes<HTMLInputElement>;
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
            const input = screen.getByRole<HTMLInputElement>('textbox');

            await user.click(input);
            await user.keyboard('{ArrowUp}');

            expect(input).to.have.value('6');
            expect(materialHandler).toHaveBeenCalledTimes(0);
          });
        });
      });

      it('allows the selected consumer handler to prevent Base UI handling', async () => {
        const onValueChange = vi.fn();
        const onKeyDown = vi.fn((event: BaseUIEvent<React.KeyboardEvent<HTMLInputElement>>) =>
          event.preventBaseUIHandler(),
        );
        const { user } = render(
          <NumberField
            defaultValue={5}
            onValueChange={onValueChange}
            slotProps={{ input: { slotProps: { input: { onKeyDown } } } }}
          />,
        );

        await user.click(screen.getByRole<HTMLInputElement>('textbox'));
        await user.keyboard('{ArrowUp}');

        expect(screen.getByRole<HTMLInputElement>('textbox')).to.have.value('5');
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledTimes(0);
      });

      it('lets nested inputProps replace htmlInput props and preserves behavior and refs', async () => {
        const htmlInputKeyDown = vi.fn();
        const targets: HTMLElement[] = [];
        const nestedKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
          targets.push(event.currentTarget);
        };
        const onValueChange = vi.fn();
        const inputRef = React.createRef<HTMLInputElement>();
        const htmlInputRef = React.createRef<HTMLInputElement>();
        const nestedRef = React.createRef<HTMLInputElement>();
        const { user } = render(
          <NumberField
            defaultValue={5}
            inputRef={inputRef}
            onValueChange={onValueChange}
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
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
        expect(input).not.to.have.attribute('placeholder');
        expect(htmlInputRef.current).to.equal(null);
        expect(nestedRef.current).to.equal(input);
        expect(inputRef.current).to.equal(input);

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(htmlInputKeyDown).toHaveBeenCalledTimes(0);
        expect(targets).to.deep.equal([input]);
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6]);
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
        const input = screen.getByRole<HTMLInputElement>('textbox');
        expect(input).not.to.have.attribute('placeholder');

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        expect(onKeyDown).toHaveBeenCalledTimes(0);
      });
    });
  });

  // Keep wrapper events and native input callbacks on their intended elements
  // while preserving Material form state and Base UI value commits.
  describe('input events', () => {
    // Clicks bubble from the input or adornments through the Material wrapper to
    // the field root; each callback must retain its own currentTarget and event order.
    describe('wrapper and native events', () => {
      (['top-level', 'root slot'] as const).forEach((source) => {
        it(`preserves click targets and bubbling with a ${source} root handler`, async () => {
          const calls: {
            handler: string;
            currentTarget: HTMLElement;
            target: EventTarget;
          }[] = [];
          const record = (handler: string) => (event: React.MouseEvent<HTMLElement>) => {
            calls.push({ handler, currentTarget: event.currentTarget, target: event.target });
          };
          const { user } = render(
            <NumberField
              helperText="Helper text"
              {...(source === 'top-level' ? { onClick: record('root') } : {})}
              slotProps={{
                ...(source === 'root slot' ? { root: { onClick: record('root') } } : {}),
                input: {
                  onClick: record('wrapper'),
                  endAdornment: <button type="button">Action</button>,
                  slotProps: { root: { title: 'Material input' } },
                },
                htmlInput: { onClick: record('native') },
              }}
            />,
          );
          const input = screen.getByRole<HTMLInputElement>('textbox');
          const wrapper = screen.getByTitle('Material input');
          const root = input.closest<HTMLElement>(`.${classes.root}`)!;
          const action = screen.getByRole('button', { name: 'Action' });
          const helperText = screen.getByText('Helper text');

          await user.click(input);
          await user.click(action);
          await user.click(helperText);

          expect(calls).to.deep.equal([
            { handler: 'native', currentTarget: input, target: input },
            { handler: 'wrapper', currentTarget: wrapper, target: input },
            { handler: 'root', currentTarget: root, target: input },
            { handler: 'wrapper', currentTarget: wrapper, target: action },
            { handler: 'root', currentTarget: root, target: action },
            { handler: 'root', currentTarget: root, target: helperText },
          ]);
        });
      });
    });

    // Compose public, Material, and native callbacks in the expected order without
    // losing FormControl focus/filled state or Base UI editing and commit behavior.
    describe('focus, blur and change handlers', () => {
      it('composes deeper native callbacks while preserving Material callback order and state', async () => {
        const calls: string[] = [];
        const targets: HTMLElement[] = [];
        const record = (name: string) => (event: React.SyntheticEvent<HTMLElement>) => {
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
        const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
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

      [undefined, null].forEach((unsetValue) => {
        it(`preserves focus, editing and commits when deeper native callbacks are ${unsetValue}`, async () => {
          const replacedHandler = vi.fn();
          const materialChange = vi.fn();
          const onFocus = vi.fn();
          const onBlur = vi.fn();
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          // JavaScript consumers can pass null callbacks, which React's types exclude.
          const nativeCallbacks = {
            onFocus: unsetValue,
            onBlur: unsetValue,
            onChange: unsetValue,
          } as React.InputHTMLAttributes<HTMLInputElement>;
          const { user } = render(
            <NumberField
              label="Amount"
              onFocus={onFocus}
              onBlur={onBlur}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={{
                htmlInput: {
                  onFocus: replacedHandler,
                  onBlur: replacedHandler,
                  onChange: replacedHandler,
                },
                input: {
                  onChange: materialChange,
                  slotProps: { input: nativeCallbacks },
                },
              }}
            />,
          );
          const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Amount' });
          const label = screen.getByText('Amount', { selector: 'label' });

          await user.click(input);
          expect(input).to.equal(document.activeElement);
          expect(label).to.have.class('Mui-focused');
          expect(onFocus).toHaveBeenCalledTimes(1);
          await user.keyboard('4');
          expect(input).to.have.value('4');
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChange.mock.calls[0][0]).to.equal(4);
          expect(materialChange).toHaveBeenCalledTimes(1);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);
          expect(replacedHandler).toHaveBeenCalledTimes(0);

          await user.tab();
          expect(input).to.have.value('4');
          expect(label).not.to.have.class('Mui-focused');
          expect(label).to.have.attribute('data-shrink', 'true');
          expect(onBlur).toHaveBeenCalledTimes(1);
          expect(replacedHandler).toHaveBeenCalledTimes(0);
          expect(materialChange).toHaveBeenCalledTimes(1);
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueCommitted).toHaveBeenCalledTimes(1);
          expect(onValueCommitted.mock.calls[0][0]).to.equal(4);
        });
      });

      it('preserves focus, blur and value commits with nested inputProps', async () => {
        const focusTargets: HTMLInputElement[] = [];
        const blurTargets: HTMLInputElement[] = [];
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
        const input = screen.getByRole<HTMLInputElement>('textbox');

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

  // Keep the numeric value owned by Base UI or the parent, while Material renders
  // the corresponding text and filled state and forwards the public callback contract.
  describe('value lifecycle and callbacks', () => {
    // Parent updates must reach the visible input without becoming user changes.
    // User proposals must also respect whether the controlled parent accepts them.
    describe('controlled value', () => {
      it('syncs parent updates through zero and null without firing value callbacks', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();

        function Test() {
          const [value, setValue] = React.useState<number | null>(5);

          return (
            <React.Fragment>
              <button type="button" onClick={() => setValue(0)}>
                Set zero
              </button>
              <button type="button" onClick={() => setValue(null)}>
                Set empty
              </button>
              <button type="button" onClick={() => setValue(8)}>
                Set number
              </button>
              <NumberField
                label="Amount"
                value={value}
                defaultValue={42}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
              />
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const label = screen.getByText('Amount', { selector: 'label' });
        const expectValue = (text: string, shrink: boolean) => {
          expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
          expect(input).to.have.value(text);
          expect(label).to.have.attribute('data-shrink', String(shrink));
        };

        // The controlled value also takes precedence over the initial default.
        expectValue('5', true);
        await user.click(screen.getByRole('button', { name: 'Set zero' }));
        expectValue('0', true);
        await user.click(screen.getByRole('button', { name: 'Set empty' }));
        expectValue('', false);
        await user.click(screen.getByRole('button', { name: 'Set number' }));
        expectValue('8', true);

        expect(onValueChange).toHaveBeenCalledTimes(0);
        expect(onValueCommitted).toHaveBeenCalledTimes(0);
      });

      it('supports a controlled parent accepting clear, typing and keyboard changes', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>();

        function Test() {
          const [value, setValue] = React.useState<number | null>(0);

          return (
            <React.Fragment>
              <NumberField
                label="Amount"
                value={value}
                onValueChange={(nextValue, details) => {
                  onValueChange(nextValue, details);
                  setValue(nextValue);
                }}
              />
              <output aria-label="Current value">{value === null ? 'empty' : value}</output>
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole('textbox', { name: 'Amount' });
        const currentValue = screen.getByLabelText('Current value');
        expect(input).to.have.value('0');

        await user.clear(input);
        expect(input).to.have.value('');
        expect(currentValue).to.have.text('empty');
        await user.keyboard('7');
        expect(input).to.have.value('7');
        expect(currentValue).to.have.text('7');
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('8');
        expect(currentValue).to.have.text('8');
        expect(
          onValueChange.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([
          [null, 'input-clear'],
          [7, 'input-change'],
          [8, 'keyboard'],
        ]);
      });

      it('keeps the parent value when controlled change proposals are ignored', async () => {
        const onValueChange = vi.fn();
        const { user } = render(
          <NumberField label="Amount" value={5} onValueChange={onValueChange} />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('5');
        await user.keyboard('{ArrowDown}');
        expect(input).to.have.value('5');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, 4]);
      });
    });

    // Direct edits report numbers or null immediately and commit on blur. Keyboard
    // steps commit immediately, retaining Base UI's native events and change details.
    describe('change and commit contract', () => {
      it('reports typed numbers as changes and commits the final value on blur', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>();
        const onValueCommitted = vi.fn<NonNullable<NumberFieldProps['onValueCommitted']>>();
        const { user } = render(
          <NumberField
            label="Amount"
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('12');
        expect(input).to.have.value('12');
        expect(onValueCommitted).toHaveBeenCalledTimes(0);

        await user.tab();

        expect(
          onValueChange.mock.calls.map(([value, details]) => [
            value,
            details.reason,
            details.event.target,
          ]),
        ).to.deep.equal([
          [1, 'input-change', input],
          [12, 'input-change', input],
        ]);
        expect(onValueChange.mock.calls[0][1].event).to.be.instanceOf(window.Event);
        expect(
          onValueCommitted.mock.calls.map(([value, details]) => [
            value,
            details.reason,
            details.event.target,
          ]),
        ).to.deep.equal([[12, 'input-blur', input]]);
        expect(onValueCommitted.mock.calls[0][1].event).to.be.instanceOf(window.FocusEvent);
      });

      it('clears zero to null and commits the clear only once on blur', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>();
        const onValueCommitted = vi.fn<NonNullable<NumberFieldProps['onValueCommitted']>>();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={0}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.clear(input);
        expect(input).to.have.value('');
        expect(
          onValueChange.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([[null, 'input-clear']]);
        expect(onValueCommitted).toHaveBeenCalledTimes(0);

        await user.tab();

        expect(
          onValueCommitted.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([[null, 'input-clear']]);
        expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute(
          'data-shrink',
          'false',
        );

        // Focusing and blurring the already-empty field must not report another clear.
        await user.click(input);
        await user.tab();
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueCommitted).toHaveBeenCalledTimes(1);
      });

      it('commits keyboard steps immediately without committing again on blur', async () => {
        const calls: { callback: string; value: number | null; reason: string }[] = [];
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>(
          (value, details) => calls.push({ callback: 'change', value, reason: details.reason }),
        );
        const onValueCommitted = vi.fn<NonNullable<NumberFieldProps['onValueCommitted']>>(
          (value, details) => calls.push({ callback: 'commit', value, reason: details.reason }),
        );
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.tab();
        expect(calls).to.deep.equal([]);

        await user.click(input);
        await user.keyboard('{ArrowUp}');

        expect(input).to.have.value('6');
        const expectedCalls = [
          { callback: 'change', value: 6, reason: 'keyboard' },
          { callback: 'commit', value: 6, reason: 'keyboard' },
        ];
        expect(calls).to.deep.equal(expectedCalls);
        const event = onValueChange.mock.calls[0][1].event;
        expect(event).to.be.instanceOf(window.KeyboardEvent);
        expect(event.target).to.equal(input);
        expect(onValueCommitted.mock.calls[0][1].event).to.equal(event);

        await user.tab();
        expect(calls).to.deep.equal(expectedCalls);
      });

      it('honors cancellation through change details without preventing later changes', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>(
          (value, details) => {
            if (value === 6) {
              details.cancel();
            }
          },
        );
        const onValueCommitted = vi.fn<NonNullable<NumberFieldProps['onValueCommitted']>>();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('5');
        expect(onValueCommitted).toHaveBeenCalledTimes(0);

        await user.keyboard('{ArrowDown}');

        expect(input).to.have.value('4');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([6, 4]);
        expect(
          onValueCommitted.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([[4, 'keyboard']]);
      });
    });
  });

  // Numeric options belong to Base UI's root. Verify they reach its interactions
  // while Material displays the resulting formatted text rather than a raw number.
  describe('numeric options and formatting', () => {
    // Nondefault steps and limits must work through the native input and controls,
    // including the distinction between direct entry and step-based interactions.
    describe('steps and bounds', () => {
      it('uses a fractional step for keyboard and button interactions', async () => {
        const onValueChange = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={0.1}
            step={0.2}
            locale="en-US"
            onValueChange={onValueChange}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('0.3');
        await user.click(screen.getByRole('button', { name: 'Increase' }));
        expect(input).to.have.value('0.5');
        await user.click(screen.getByRole('button', { name: 'Decrease' }));
        expect(input).to.have.value('0.3');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([0.3, 0.5, 0.3]);
      });

      it('uses custom large and small steps with keyboard modifiers', async () => {
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={10}
            step={2}
            largeStep={7}
            smallStep={0.25}
            locale="en-US"
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{Shift>}{ArrowUp}{/Shift}');
        expect(input).to.have.value('17');
        await user.keyboard('{Alt>}{ArrowDown}{/Alt}');
        expect(input).to.have.value('16.75');
      });

      it('snaps an off-step value when snapOnStep is enabled', async () => {
        const { user } = render(
          <NumberField label="Amount" defaultValue={1} min={0} step={2} snapOnStep />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{ArrowUp}');
        expect(input).to.have.value('2');
        await user.click(screen.getByRole('button', { name: 'Decrease' }));
        expect(input).to.have.value('0');
      });

      it('uses Home and End for configured bounds and prevents keyboard steps past them', async () => {
        const onValueChange = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            min={2}
            max={8}
            onValueChange={onValueChange}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('{Home}{ArrowDown}');
        expect(input).to.have.value('2');
        await user.keyboard('{End}{ArrowUp}');
        expect(input).to.have.value('8');
        expect(onValueChange.mock.calls.map(([value]) => value)).to.deep.equal([2, 8]);
      });

      [undefined, true].forEach((allowOutOfRange) => {
        it(`normalizes direct entry with allowOutOfRange=${allowOutOfRange ?? 'default'}`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const { user } = render(
            <NumberField
              label="Amount"
              min={2}
              max={8}
              allowOutOfRange={allowOutOfRange}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
            />,
          );
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const expectedValue = allowOutOfRange ? 9 : 8;

          await user.click(input);
          await user.keyboard('9');
          expect(input).to.have.value('9');
          expect(onValueChange.mock.lastCall![0]).to.equal(expectedValue);
          await user.tab();
          expect(input).to.have.value(String(expectedValue));
          expect(onValueCommitted.mock.lastCall![0]).to.equal(expectedValue);

          // Stepping must still honor the bounds when out-of-range typing is allowed.
          await user.click(input);
          await user.keyboard('{ArrowUp}');
          expect(input).to.have.value('8');
        });
      });
    });

    // Locale and format affect both text parsing and display. Exercise edits and
    // prop updates here; initial formatting and hydration are covered separately.
    describe('locale and format', () => {
      it('parses localized negative decimals and formats them after blur and stepping', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            locale="de-DE"
            step={0.25}
            format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('-12,5');
        expect(input).to.have.value('-12,5');
        expect(onValueChange.mock.lastCall![0]).to.equal(-12.5);
        await user.tab();
        expect(input).to.have.value('-12,50');
        expect(onValueCommitted.mock.lastCall![0]).to.equal(-12.5);

        await user.click(screen.getByRole('button', { name: 'Increase' }));
        expect(input).to.have.value('-12,25');
        expect(onValueChange.mock.lastCall![0]).to.equal(-12.25);
      });

      it('parses pasted currency text while retaining numeric callback values', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            locale="en-US"
            format={{ style: 'currency', currency: 'USD', useGrouping: true }}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.paste('$1,234.50');
        expect(input).to.have.value('$1,234.50');
        expect(
          onValueChange.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([[1234.5, 'input-paste']]);
        await user.tab();
        expect(onValueCommitted.mock.lastCall![0]).to.equal(1234.5);

        await user.click(input);
        await user.keyboard('{ArrowDown}');
        expect(input).to.have.value('$1,233.50');
        expect(onValueChange.mock.lastCall![0]).to.equal(1233.5);
      });

      it('applies fraction-digit rounding without replacing raw text during typing', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            locale="en-US"
            format={{ maximumFractionDigits: 2 }}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        await user.keyboard('1.235');
        expect(input).to.have.value('1.235');
        expect(onValueChange.mock.lastCall![0]).to.equal(1.24);
        await user.tab();
        expect(input).to.have.value('1.24');
        expect(onValueCommitted.mock.lastCall![0]).to.equal(1.24);
      });

      it('updates locale and format without changing the controlled numeric value', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();

        function Test() {
          const [locale, setLocale] = React.useState('en-US');
          const [format, setFormat] = React.useState<Intl.NumberFormatOptions>({
            useGrouping: false,
          });

          return (
            <React.Fragment>
              <button type="button" onClick={() => setLocale('de-DE')}>
                Change locale
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormat({
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                }
              >
                Change format
              </button>
              <NumberField
                label="Amount"
                value={1234.5}
                locale={locale}
                format={format}
                onValueChange={onValueChange}
                onValueCommitted={onValueCommitted}
              />
            </React.Fragment>
          );
        }

        const { user } = render(<Test />);
        const input = screen.getByRole('textbox', { name: 'Amount' });
        expect(input).to.have.value('1234.5');

        await user.click(screen.getByRole('button', { name: 'Change locale' }));
        expect(input).to.have.value('1234,5');
        await user.click(screen.getByRole('button', { name: 'Change format' }));
        expect(input).to.have.value('1.234,50');
        expect(onValueChange).toHaveBeenCalledTimes(0);
        expect(onValueCommitted).toHaveBeenCalledTimes(0);
      });
    });

    // Wheel scrubbing uses a native listener on the visible input, which must retain
    // Base UI's ref and only change values when explicitly enabled and focused.
    describe('wheel scrubbing', () => {
      // user-event does not expose wheel gestures.
      function wheel(input: HTMLElement, deltaY: number) {
        const event = new window.WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY });
        act(() => {
          input.dispatchEvent(event);
        });
        return event;
      }

      it('leaves wheel gestures alone by default even while focused', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        const event = wheel(input, -1);

        expect(input).to.have.value('5');
        expect(event.defaultPrevented).to.equal(false);
        expect(onValueChange).toHaveBeenCalledTimes(0);
        expect(onValueCommitted).toHaveBeenCalledTimes(0);
      });

      it('steps and commits in both wheel directions only while focused and enabled', async () => {
        const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>();
        const onValueCommitted = vi.fn<NonNullable<NumberFieldProps['onValueCommitted']>>();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            step={2}
            allowWheelScrub
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        expect(wheel(input, -1).defaultPrevented).to.equal(false);
        expect(input).to.have.value('5');
        await user.click(input);
        const event = wheel(input, -1);
        expect(input).to.have.value('7');
        expect(event.defaultPrevented).to.equal(true);
        expect(onValueChange.mock.calls[0][1].event).to.equal(event);
        expect(onValueCommitted.mock.calls[0][1].event).to.equal(event);

        wheel(input, 1);
        expect(input).to.have.value('5');
        expect(
          onValueChange.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([
          [7, 'wheel'],
          [5, 'wheel'],
        ]);
        expect(
          onValueCommitted.mock.calls.map(([value, details]) => [value, details.reason]),
        ).to.deep.equal([
          [7, 'wheel'],
          [5, 'wheel'],
        ]);
      });

      it('preserves read-only behavior when wheel scrubbing is enabled', async () => {
        const onValueChange = vi.fn();
        const onValueCommitted = vi.fn();
        const { user } = render(
          <NumberField
            label="Amount"
            defaultValue={5}
            readOnly
            allowWheelScrub
            onValueChange={onValueChange}
            onValueCommitted={onValueCommitted}
          />,
        );
        const input = screen.getByRole('textbox', { name: 'Amount' });

        await user.click(input);
        expect(document.activeElement).to.equal(input);
        expect(wheel(input, -1).defaultPrevented).to.equal(false);
        expect(input).to.have.value('5');
        expect(onValueChange).toHaveBeenCalledTimes(0);
        expect(onValueCommitted).toHaveBeenCalledTimes(0);
      });
    });
  });

  // External form association must reach Base UI's submission input and contribute
  // one raw value while the visible Material input displays formatted text.
  describe('form submission', () => {
    it('submits one raw numeric value to an external form from a formatted field', async () => {
      const submissions: FormData[] = [];
      const { user } = render(
        <React.Fragment>
          <form
            id="number-form"
            onSubmit={(event) => {
              event.preventDefault();
              submissions.push(new FormData(event.currentTarget));
            }}
          >
            <button type="submit">Submit</button>
          </form>
          <NumberField
            label="Amount"
            name="amount"
            form="number-form"
            defaultValue={1234.5}
            locale="en-US"
            format={{ style: 'currency', currency: 'USD', useGrouping: true }}
          />
        </React.Fragment>,
      );

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.have.value('$1,234.50');
      await user.click(screen.getByRole('button', { name: 'Submit' }));

      expect(submissions).to.have.length(1);
      expect(Array.from(submissions[0].entries())).to.deep.equal([['amount', '1234.5']]);
    });
  });

  // NumberField owns the label/helper relationships and the visible input's focus
  // entry points. Cover that wiring without repeating state styling or SSR checks.
  describe('labels, helper text and focus', () => {
    it('links an explicit input ID to its label and accessible description', async () => {
      const { user } = render(
        <NumberField id="amount" label="Amount" helperText="Enter the quantity" defaultValue={5} />,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });

      expect(input).to.have.attribute('id', 'amount');
      expect(input).toHaveAccessibleDescription('Enter the quantity');
      await user.click(label);
      expect(document.activeElement).to.equal(input);
    });

    it('supports an external accessible name without rendering a label or helper', () => {
      render(
        <React.Fragment>
          <span id="amount-name">Amount</span>
          <NumberField slotProps={{ htmlInput: { 'aria-labelledby': 'amount-name' } }} />
        </React.Fragment>,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const root = input.closest(`.${classes.root}`)!;

      expect(root.querySelector('label')).to.equal(null);
      expect(root.querySelector('.MuiFormHelperText-root')).to.equal(null);
      expect(input).not.to.have.attribute('aria-describedby');
    });

    it('renders zero as label and helper content', () => {
      render(<NumberField label={0} helperText={0} />);

      expect(screen.getByRole('textbox', { name: '0' })).toHaveAccessibleDescription('0');
    });

    it('adds and removes label and helper content without leaving dangling associations', async () => {
      function Test() {
        const [showContent, setShowContent] = React.useState(false);

        return (
          <React.Fragment>
            <button type="button" onClick={() => setShowContent((previous) => !previous)}>
              Toggle label and helper
            </button>
            <NumberField
              label={showContent ? 'Amount' : ''}
              helperText={showContent ? <em>Enter the quantity</em> : ''}
              slotProps={{ htmlInput: { 'aria-label': showContent ? undefined : 'Amount' } }}
            />
          </React.Fragment>
        );
      }

      const { user } = render(<Test />);
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const root = input.closest(`.${classes.root}`)!;
      const toggle = screen.getByRole('button', { name: 'Toggle label and helper' });
      const expectNoContent = () => {
        expect(root.querySelector('label')).to.equal(null);
        expect(root.querySelector('.MuiFormHelperText-root')).to.equal(null);
        expect(input).not.to.have.attribute('aria-describedby');
      };

      expectNoContent();
      await user.click(toggle);

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
      expect(input).not.to.have.attribute('aria-label');
      expect(screen.getByText('Amount', { selector: 'label' })).to.have.attribute('for', input.id);
      expect(input).toHaveAccessibleDescription('Enter the quantity');

      await user.click(toggle);

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
      expectNoContent();
      expect(input).toHaveAccessibleDescription('');
    });

    it('autofocuses the visible input and updates the label when focus leaves', async () => {
      const { user } = render(
        <React.Fragment>
          <NumberField label="Amount" autoFocus />
          <button type="button">After</button>
        </React.Fragment>,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });

      expect(document.activeElement).to.equal(input);
      expect(label).to.have.class('Mui-focused');
      expect(label).to.have.attribute('data-shrink', 'true');

      await user.tab();

      expect(document.activeElement).to.equal(screen.getByRole('button', { name: 'After' }));
      expect(label).not.to.have.class('Mui-focused');
      expect(label).to.have.attribute('data-shrink', 'false');
    });

    it('provides one tab stop and allows consumer inputRef focus', async () => {
      const inputRef = React.createRef<HTMLInputElement>();
      const { user } = render(
        <React.Fragment>
          <button type="button" onClick={() => inputRef.current?.focus()}>
            Focus amount
          </button>
          <NumberField label="Amount" inputRef={inputRef} />
          <button type="button">After</button>
        </React.Fragment>,
      );
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const focusButton = screen.getByRole('button', { name: 'Focus amount' });

      await user.tab();
      expect(document.activeElement).to.equal(focusButton);
      await user.tab();
      expect(document.activeElement).to.equal(input);
      await user.tab();
      expect(document.activeElement).to.equal(screen.getByRole('button', { name: 'After' }));
      await user.tab({ shift: true });
      expect(document.activeElement).to.equal(input);

      await user.click(focusButton);
      expect(document.activeElement).to.equal(input);
    });
  });

  // Scrubbing is optional and shares the input adornments with controls and consumer
  // content. Cover composition, slot plumbing, and drag interactions through the Material wrapper.
  describe('scrub area', () => {
    it('omits the scrub area by default', () => {
      const { container } = render(<NumberField />);

      expect(container.querySelector(`.${classes.scrubArea}`)).to.equal(null);
    });

    (['start', 'end', 'split'] as const).forEach((controlsPosition) => {
      (['start', 'end'] as const).forEach((scrubArea) => {
        it(`places the ${scrubArea} scrub area with ${controlsPosition} controls and consumer adornments`, () => {
          const { container } = render(
            <NumberField
              controlsPosition={controlsPosition}
              scrubArea={scrubArea}
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                },
              }}
            />,
          );
          const input = screen.getByRole('textbox');
          const increase = screen.getByRole('button', { name: 'Increase' });
          const decrease = screen.getByRole('button', { name: 'Decrease' });
          const scrub = container.querySelector(`.${classes.scrubArea}`)!;
          const prefix = screen.getByText('$');
          const suffix = screen.getByText('kg');
          const wrapper = input.closest('.MuiInputBase-root')!;
          const startButtons = {
            start: [increase, decrease],
            end: [],
            split: [decrease],
          }[controlsPosition];
          const endButtons = {
            start: [],
            end: [increase, decrease],
            split: [increase],
          }[controlsPosition];
          const expectedOrder = [
            ...startButtons,
            ...(scrubArea === 'start' ? [scrub] : []),
            prefix,
            input,
            suffix,
            ...(scrubArea === 'end' ? [scrub] : []),
            ...endButtons,
          ];

          // Compare element order even though the adornments add their own wrappers.
          const elements = Array.from(wrapper.querySelectorAll('*')).filter((element) =>
            expectedOrder.includes(element),
          );
          expect(elements).to.deep.equal(expectedOrder);
          expect(scrub.parentElement).to.have.class(
            `MuiInputAdornment-position${scrubArea === 'start' ? 'Start' : 'End'}`,
          );
          expect(scrub.closest(`.${classes.controls}`)).to.equal(null);
        });
      });
    });

    it('resolves scrub slot callbacks and preserves custom children and refs', () => {
      const scrubRef = React.createRef<HTMLSpanElement>();
      const { container } = render(
        <NumberField
          scrubArea="start"
          size="small"
          slotProps={{
            scrubArea: (ownerState) => ({
              ref: scrubRef,
              direction: ownerState.size === 'small' ? 'vertical' : 'horizontal',
              children: <span>Drag</span>,
            }),
          }}
        />,
      );
      const scrub = container.querySelector(`.${classes.scrubArea}`)!;

      expect(scrubRef.current).to.equal(scrub);
      expect(scrub).to.have.attribute('data-direction', 'vertical');
      expect(scrub).to.contain(screen.getByText('Drag'));
      expect(scrub.querySelector('svg')).to.equal(null);
    });

    // The rendered handle must retain Base UI's pointer handlers and refs so dragging
    // updates the visible value and commits on release, while unavailable fields stay unchanged.
    describe('dragging', () => {
      // user-event does not supply the movementX/movementY deltas used for scrubbing.
      function movePointer(movementX: number, movementY: number) {
        const event = new window.MouseEvent('pointermove', { bubbles: true, cancelable: true });
        Object.defineProperties(event, {
          movementX: { value: movementX },
          movementY: { value: movementY },
        });
        act(() => {
          window.dispatchEvent(event);
        });
      }

      (['horizontal', 'vertical'] as const).forEach((direction) => {
        it(`changes the value in both ${direction} directions and commits on release`, async () => {
          const onValueChange = vi.fn<NonNullable<NumberFieldProps['onValueChange']>>();
          const onValueCommitted = vi.fn<NonNullable<NumberFieldProps['onValueCommitted']>>();
          const { container, user } = render(
            <NumberField
              label="Amount"
              defaultValue={5}
              scrubArea="start"
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
              slotProps={direction === 'vertical' ? { scrubArea: { direction } } : undefined}
            />,
          );
          const input = screen.getByRole('textbox', { name: 'Amount' });
          const scrub = container.querySelector(`.${classes.scrubArea}`)!;
          const movementX = direction === 'horizontal' ? 4 : 0;
          const movementY = direction === 'vertical' ? -4 : 0;

          await user.pointer({ keys: '[MouseLeft>]', target: scrub });
          movePointer(movementX, movementY);
          expect(input).to.have.value('9');
          movePointer(-movementX, -movementY);
          expect(input).to.have.value('5');
          expect(
            onValueChange.mock.calls.map(([value, details]) => [value, details.reason]),
          ).to.deep.equal([
            [9, 'scrub'],
            [5, 'scrub'],
          ]);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);

          await user.pointer({ keys: '[/MouseLeft]', target: scrub });
          expect(onValueCommitted).toHaveBeenCalledTimes(1);
          expect(onValueCommitted.mock.calls[0][0]).to.equal(5);
          expect(onValueCommitted.mock.calls[0][1].reason).to.equal('scrub');
        });
      });

      (['disabled', 'readOnly'] as const).forEach((state) => {
        it(`does not scrub a ${state} field`, async () => {
          const onValueChange = vi.fn();
          const onValueCommitted = vi.fn();
          const { container, user } = render(
            <NumberField
              defaultValue={5}
              scrubArea="start"
              disabled={state === 'disabled'}
              readOnly={state === 'readOnly'}
              onValueChange={onValueChange}
              onValueCommitted={onValueCommitted}
            />,
          );
          const input = screen.getByRole('textbox');
          const scrub = container.querySelector(`.${classes.scrubArea}`)!;

          await user.pointer({ keys: '[MouseLeft>]', target: scrub });
          movePointer(4, 0);
          await user.pointer({ keys: '[/MouseLeft]', target: scrub });

          expect(input).to.have.value('5');
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueCommitted).toHaveBeenCalledTimes(0);
        });
      });
    });
  });

  // FormControl needs the initial filled/adorned state in server markup so labels
  // render correctly before effects run and stay stable during hydration.
  describe('server rendering', () => {
    function expectStableHydration(
      hydrate: () => void,
      { displayValue, shrink }: { displayValue: string; shrink: boolean },
    ) {
      const input = screen.getByRole('textbox', { name: 'Amount' });
      const label = screen.getByText('Amount', { selector: 'label' });

      // Check server markup before client effects can initialize FormControl.
      expect(input).to.have.value(displayValue);
      expect(label).to.have.attribute('data-shrink', String(shrink));

      hydrate();

      expect(screen.getByRole('textbox', { name: 'Amount' })).to.equal(input);
      expect(screen.getByText('Amount', { selector: 'label' })).to.equal(label);
      expect(input).to.have.value(displayValue);
      expect(label).to.have.attribute('data-shrink', String(shrink));
    }

    // Initial values, including zero and empty values, must determine label shrink
    // before hydration, without relying on client-side FormControl updates.
    describe('initial value', () => {
      const cases = [
        { name: 'value=42', props: { value: 42 }, displayValue: '42', shrink: true },
        { name: 'value=0', props: { value: 0 }, displayValue: '0', shrink: true },
        { name: 'value=null', props: { value: null }, displayValue: '', shrink: false },
        {
          name: 'defaultValue=42',
          props: { defaultValue: 42 },
          displayValue: '42',
          shrink: true,
        },
        { name: 'defaultValue=0', props: { defaultValue: 0 }, displayValue: '0', shrink: true },
        {
          name: 'defaultValue=undefined',
          props: { defaultValue: undefined },
          displayValue: '',
          shrink: false,
        },
      ] satisfies {
        name: string;
        props: Pick<NumberFieldProps, 'value' | 'defaultValue'>;
        displayValue: string;
        shrink: boolean;
      }[];

      cases.forEach(({ name, props, displayValue, shrink }) => {
        it(`initializes label shrink before hydration with ${name}`, () => {
          const { hydrate } = renderToString(<NumberField label="Amount" {...props} />);

          expectStableHydration(hydrate, { displayValue, shrink });
        });
      });
    });

    // Formatting must already appear in server markup, and the same formatted value
    // must initialize FormControl's filled state when the client hydrates it.
    describe('formatted initial values', () => {
      it('preserves formatted initial text through hydration', () => {
        const { hydrate } = renderToString(
          <NumberField
            label="Amount"
            defaultValue={1234.5}
            locale="de-DE"
            format={{ useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          />,
        );

        expectStableHydration(hydrate, { displayValue: '1.234,50', shrink: true });
      });
    });

    // Start adornments affect shrink even when the field is empty. Check object and
    // callback props plus explicit overrides so server labels follow Material rules.
    describe('adornments and shrink overrides', () => {
      (['start', 'end'] as const).forEach((scrubArea) => {
        it(`keeps an empty label stable through hydration with a ${scrubArea} scrub area`, () => {
          const { hydrate } = renderToString(<NumberField label="Amount" scrubArea={scrubArea} />);

          expectStableHydration(hydrate, { displayValue: '', shrink: scrubArea === 'start' });
        });
      });

      (['start', 'split'] as const).forEach((controlsPosition) => {
        it(`shrinks an empty label before hydration with ${controlsPosition} controls`, () => {
          const { hydrate } = renderToString(
            <NumberField label="Amount" controlsPosition={controlsPosition} />,
          );

          expectStableHydration(hydrate, { displayValue: '', shrink: true });
        });
      });

      ['object', 'callback'].forEach((configuration) => {
        it(`shrinks an empty adorned label before hydration with ${configuration} slot props`, () => {
          const adornment = <InputAdornment position="start">$</InputAdornment>;
          const inputSlotProps =
            configuration === 'object'
              ? { startAdornment: adornment }
              : (ownerState: NumberFieldOwnerState) => ({
                  startAdornment: ownerState.label === 'Amount' ? adornment : undefined,
                });
          const { hydrate } = renderToString(
            <NumberField label="Amount" slotProps={{ input: inputSlotProps }} />,
          );
          const adornmentNode = screen.getByText('$');
          const input = screen.getByRole('textbox', { name: 'Amount' });
          expect(input.closest('.MuiInputBase-root')).to.contain(adornmentNode);

          expectStableHydration(hydrate, { displayValue: '', shrink: true });
          expect(screen.getByText('$')).to.equal(adornmentNode);
        });
      });

      it('does not shrink an empty server-rendered label with an end adornment', () => {
        const { hydrate } = renderToString(
          <NumberField
            label="Amount"
            slotProps={{
              input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
            }}
          />,
        );
        const adornmentNode = screen.getByText('kg');
        const input = screen.getByRole('textbox', { name: 'Amount' });
        expect(input.closest('.MuiInputBase-root')).to.contain(adornmentNode);

        expectStableHydration(hydrate, { displayValue: '', shrink: false });
        expect(screen.getByText('kg')).to.equal(adornmentNode);
      });

      it('preserves an explicit shrink override with built-in start controls', () => {
        const { hydrate } = renderToString(
          <NumberField
            label="Amount"
            controlsPosition="start"
            slotProps={{ inputLabel: { shrink: false } }}
          />,
        );

        expectStableHydration(hydrate, { displayValue: '', shrink: false });
      });
    });

    // Generated IDs must be unique across fields and retain their label/helper
    // associations through hydration without depending on React's ID format.
    describe('generated IDs and associations', () => {
      it('preserves unique input, label and helper IDs through hydration', () => {
        const examples = [
          { name: 'First amount', helperText: 'First helper' },
          { name: 'Second amount', helperText: 'Second helper' },
        ];
        const { hydrate } = renderToString(
          <React.Fragment>
            {examples.map(({ name, helperText }) => (
              <NumberField key={name} label={name} helperText={helperText} />
            ))}
          </React.Fragment>,
        );
        const fields = examples.map(({ name, helperText }) => {
          const input = screen.getByRole<HTMLInputElement>('textbox', { name });
          const label = screen.getByText(name, { selector: 'label' });
          const helper = screen.getByText(helperText);

          return {
            name,
            helperText,
            input,
            label,
            helper,
            inputId: input.id,
            labelId: label.id,
            helperId: helper.id,
          };
        });
        const ids = fields.flatMap(({ inputId, labelId, helperId }) => [
          inputId,
          labelId,
          helperId,
        ]);
        ids.forEach((id) => expect(id).not.to.equal(''));
        expect(new Set(ids).size).to.equal(ids.length);

        const expectAssociations = () => {
          fields.forEach(
            ({ name, helperText, input, label, helper, inputId, labelId, helperId }) => {
              expect(screen.getByRole('textbox', { name })).to.equal(input);
              expect(screen.getByText(name, { selector: 'label' })).to.equal(label);
              expect(screen.getByText(helperText)).to.equal(helper);
              expect(input).to.have.attribute('id', inputId);
              expect(label).to.have.attribute('id', labelId);
              expect(helper).to.have.attribute('id', helperId);
              expect(label).to.have.attribute('for', inputId);
              expect(input).to.have.attribute('aria-describedby', helperId);
            },
          );
        };

        expectAssociations();
        hydrate();
        expectAssociations();
      });
    });
  });
});
