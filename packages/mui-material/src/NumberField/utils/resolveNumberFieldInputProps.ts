import resolveComponentProps from '@mui/utils/resolveComponentProps';

import type { NumberFieldOwnerState, NumberFieldProps } from '../NumberField.types';

type HtmlInputSlotProps = NonNullable<NumberFieldProps['slotProps']>['htmlInput'];
type ResolvedInputSlotProps = Exclude<
  NonNullable<NumberFieldProps['slotProps']>['input'],
  ((ownerState: NumberFieldOwnerState) => unknown) | undefined
>;

interface ResolveNumberFieldInputPropsParameters<T extends ResolvedInputSlotProps> {
  inputProps: T;
  htmlInputSlotProps: HtmlInputSlotProps;
  ownerState: NumberFieldOwnerState;
}

/**
 * Resolves consumer native input props before merging with Base UI, preserving their
 * precedence and preventing InputBase's later prop spreads from replacing merged handlers and refs.
 *
 * Precedence, lowest to highest:
 * 1. Keyboard handlers from slotProps.input.
 * 2. slotProps.htmlInput, replaced entirely by slotProps.input.inputProps when present,
 *    even if undefined.
 * 3. slotProps.input.slotProps.input.
 *
 * Returns:
 * - `materialInputProps`: The props to be spread on the Material wrapper input component.
 * - `nativeSlotProps`: The resolved native input props to be spread on the underlying HTML input element.
 *
 */
export default function resolveNumberFieldInputProps<T extends ResolvedInputSlotProps>({
  inputProps,
  htmlInputSlotProps,
  ownerState,
}: ResolveNumberFieldInputPropsParameters<T>) {
  // Route keyboard handlers through the native merge so they compose with Base UI.
  // Remove them from the wrapper so an overridden handler cannot reappear there.
  const { onKeyDown, onKeyUp, ...materialInputProps } = inputProps;

  // Explicit inputProps replaces htmlInput configuration, even when undefined.
  const effectiveHtmlInputSlotProps: HtmlInputSlotProps =
    'inputProps' in inputProps ? inputProps.inputProps : htmlInputSlotProps;

  const materialSlotProps = 'slotProps' in inputProps ? inputProps.slotProps : undefined;

  // Consume the deeper native props here so InputBase cannot apply them again
  // after Base UI's handlers and refs have been merged.
  const { input: nestedNativeProps, ...remainingMaterialSlotProps } = materialSlotProps ?? {};

  // Resolve callback slot props so their returned props participate in precedence.
  const selectedNativeProps = resolveComponentProps(effectiveHtmlInputSlotProps, ownerState);

  // Native props override Material keyboard handlers; the deeper native slot wins last.
  const consumerNativeProps = {
    onKeyDown,
    onKeyUp,
    ...selectedNativeProps,
    ...nestedNativeProps,
  };

  // Clear overridden consumer handlers without letting undefined/null erase
  // Base UI's internal handlers in useSlot's subsequent prop merge.
  const nativeSlotProps: HtmlInputSlotProps = Object.fromEntries(
    Object.entries(consumerNativeProps).filter(
      ([key, value]) => !(/^on[A-Z]/.test(key) && value == null),
    ),
  );

  return {
    materialInputProps: {
      ...materialInputProps,
      slotProps: remainingMaterialSlotProps,
    },
    nativeSlotProps,
  };
}
