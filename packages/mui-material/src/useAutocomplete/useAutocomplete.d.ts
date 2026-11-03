import * as React from 'react';
import { PartiallyRequired } from '@mui/types';

export interface CreateFilterOptionsConfig<Value> {
  ignoreAccents?: boolean | undefined;
  ignoreCase?: boolean | undefined;
  limit?: number | undefined;
  matchFrom?: 'any' | 'start' | undefined;
  stringify?: ((option: Value) => string) | undefined;
  trim?: boolean | undefined;
}

export interface FilterOptionsState<Value> {
  inputValue: string;
  getOptionLabel: (option: Value) => string;
}

export interface AutocompleteGroupedOption<Value = string> {
  key: number;
  index: number;
  group: string;
  options: Value[];
}

export function createFilterOptions<Value>(
  config?: CreateFilterOptionsConfig<Value>,
): (options: Value[], state: FilterOptionsState<Value>) => Value[];

export type AutocompleteFreeSoloValueMapping<FreeSolo> = FreeSolo extends true ? string : never;

export type AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo> = FreeSolo extends true
  ? Value | string
  : Value;

/** Allowed IDs; strings are reserved for free-solo input, including when freeSolo is boolean. */
export type AutocompleteMappedValue<FreeSolo = false> = true extends FreeSolo
  ? number | boolean
  : string | number | boolean;

/**
 * Prevents this occurrence of T from contributing inference, including before TypeScript 5.4.
 */
type NoInfer<T> = [T][T extends unknown ? 0 : never];

/**
 * undefined marks an absent mapper; otherwise selections use MappedValue.
 * Distributing includes both modes when wrappers erase generics. NoInfer keeps selected
 * values and callbacks from widening the type inferred from getOptionValue.
 * @internal
 */
export type AutocompleteResolvedValue<Value, MappedValue> = MappedValue extends undefined
  ? Value
  : NoInfer<MappedValue>;

export type AutocompleteValue<Value, Multiple, DisableClearable, FreeSolo> = Multiple extends true
  ? Array<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
  : DisableClearable extends true
    ? NonNullable<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
    : Value | null | AutocompleteFreeSoloValueMapping<FreeSolo>;

/**
 * Value retains the original option type for compatibility with module augmentation.
 * MappedValue is inferred from getOptionValue; its default keeps selections as options.
 */
export interface UseAutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
> {
  /**
   * @internal The prefix of the state class name, temporary for Joy UI
   * @default 'Mui'
   */
  unstable_classNamePrefix?: string | undefined;
  /**
   * @internal
   * Temporary for Joy UI because the parent listbox is the document object
   * TODO v6: Normalize the logic and remove this param.
   */
  unstable_isActiveElementInListbox?:
    ((listbox: React.RefObject<HTMLElement | null>) => boolean) | undefined;
  /**
   * If `true`, the portion of the selected suggestion that the user hasn't typed,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete?: boolean | undefined;
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight?: boolean | undefined;
  /**
   * If `true`, the value is updated when the input loses focus under one of these conditions:
   *
   * - An option highlighted via keyboard navigation or `autoHighlight` is selected.
   *   Hover and touch highlights are ignored.
   * - Otherwise, in `freeSolo` mode, the typed text becomes the value.
   * @default false
   */
  autoSelect?: boolean | undefined;
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect?: 'touch' | 'mouse' | true | false | undefined;
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set it to `true` if you want to help the user enter a new value.
   * Set it to `false` if you want to help the user resume their search.
   * @default !props.freeSolo
   */
  clearOnBlur?: boolean | undefined;
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape?: boolean | undefined;
  /**
   * The component name that is using this hook. Used for warnings.
   */
  componentName?: string | undefined;
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue?:
    | AutocompleteValue<
        AutocompleteResolvedValue<Value, MappedValue>,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    | undefined;
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable?: DisableClearable | undefined;
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect?: boolean | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean | undefined;
  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap?: boolean | undefined;
  /**
   * A function that determines the filtered options to be rendered on search.
   *
   * @default createFilterOptions()
   * @param {Value[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {Value[]}
   */
  filterOptions?: ((options: Value[], state: FilterOptionsState<Value>) => Value[]) | undefined;
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions?: boolean | undefined;
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo?: FreeSolo | undefined;
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {Value} option The option to test.
   * @template Value The option shape. Will be the same shape as an item of the options.
   * @returns {boolean}
   */
  getOptionDisabled?: ((option: Value) => boolean) | undefined;
  /**
   * Used to determine the key for a given option.
   * This can be useful when the labels of options are not unique (since labels are used as keys by default).
   *
   * @param {Value} option The option to get the key for.
   * @returns {string | number}
   */
  getOptionKey?:
    ((option: Value | AutocompleteFreeSoloValueMapping<FreeSolo>) => string | number) | undefined;
  /**
   * Used to determine the selected value for a given option.
   *
   * When provided, the `value`, `defaultValue`, and `onChange` value use the returned type instead
   * of the option type. The returned value must be a unique, non-null primitive.
   * When `freeSolo` is enabled, it must not return a string because strings are reserved for
   * free-solo values.
   *
   * @param {Value} option The option to get the value for.
   * @returns {MappedValue}
   */
  getOptionValue?: ((option: Value) => Exclude<MappedValue, undefined>) | undefined;
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * If used in free solo mode, it must accept both the type of the options and a string.
   *
   * @param {Value|string} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel?:
    ((option: AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo>) => string) | undefined;
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {Value} option The Autocomplete option.
   * @returns {string}
   */
  groupBy?: ((option: Value) => string) | undefined;

  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys?: boolean | undefined;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id?: string | undefined;
  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList?: boolean | undefined;
  /**
   * The input value.
   */
  inputValue?: string | undefined;
  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality against the option by default, or against the value returned by
   * `getOptionValue` when that prop is provided.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {Value} option The option to test.
   * @param {Value|MappedValue|string} value The selected value to test against. When `getOptionValue` is
   * provided, this is the value returned by `getOptionValue` (or a free-solo string).
   * @returns {boolean}
   */
  isOptionEqualToValue?:
    | ((
        option: Value,
        value: AutocompleteValueOrFreeSoloValueMapping<
          AutocompleteResolvedValue<Value, MappedValue>,
          FreeSolo
        >,
      ) => boolean)
    | undefined;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: Multiple | undefined;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value|MappedValue|Array<Value|MappedValue>} value The new selected value of the component. When `getOptionValue` is
   * provided, this contains the value(s) returned by `getOptionValue`.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange?:
    | ((
        event: React.SyntheticEvent,
        value: AutocompleteValue<
          AutocompleteResolvedValue<Value, MappedValue>,
          Multiple,
          DisableClearable,
          FreeSolo
        >,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<Value>,
      ) => void)
    | undefined;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose?: ((event: React.SyntheticEvent, reason: AutocompleteCloseReason) => void) | undefined;
  /**
   * Callback fired when the highlight option changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {Value} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"mouse"`, `"touch"`.
   */
  onHighlightChange?:
    | ((
        event: React.SyntheticEvent,
        option: Value | null,
        reason: AutocompleteHighlightChangeReason,
      ) => void)
    | undefined;
  /**
   * Callback fired when the input value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`, `"blur"`, `"selectOption"`, `"removeOption"`
   */
  onInputChange?:
    | ((event: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => void)
    | undefined;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: ((event: React.SyntheticEvent) => void) | undefined;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean | undefined;
  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus?: boolean | undefined;
  /**
   * A list of options that will be shown in the Autocomplete.
   */
  options: ReadonlyArray<Value>;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * If `true`, clears an option highlighted by mouse movement when the mouse leaves the listbox.
   * This behavior will be enabled by default in the next major version.
   * @default false
   */
  resetHighlightOnMouseLeave?: boolean | undefined;
  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus?: boolean | undefined;
  /**
   * The value of the autocomplete.
   *
   * Without `getOptionValue`, the value must have reference equality with the option in order to
   * be selected. When `getOptionValue` is provided, its returned value is used instead.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value?:
    | AutocompleteValue<
        AutocompleteResolvedValue<Value, MappedValue>,
        Multiple,
        DisableClearable,
        FreeSolo
      >
    | undefined;
}

export interface UseAutocompleteParameters<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
> extends UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, MappedValue> {}

export type AutocompleteHighlightChangeReason = 'keyboard' | 'mouse' | 'touch';

export type AutocompleteChangeReason =
  'createOption' | 'selectOption' | 'removeOption' | 'clear' | 'blur';
export interface AutocompleteChangeDetails<Value = string> {
  option: Value;
}
export type AutocompleteCloseReason =
  'createOption' | 'toggleInput' | 'escape' | 'selectOption' | 'removeOption' | 'blur';
export type AutocompleteInputChangeReason =
  'input' | 'reset' | 'clear' | 'blur' | 'selectOption' | 'removeOption';

export type AutocompleteGetItemProps<Multiple extends boolean | undefined> = Multiple extends true
  ? (args: { index: number }) => {
      key: number;
      'data-item-index': number;
      tabIndex: -1;
      onDelete: (event: any) => void;
    }
  : (args?: { index?: number | undefined }) => {
      'data-item-index': number;
      tabIndex: -1;
      onDelete: (event: any) => void;
    };

export type AutocompleteGetTagProps = ({ index }: { index: number }) => {
  key: number;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};

// With getOptionValue and groupBy: selections use mapped values; groupedOptions contains option groups.
export function useAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  MappedValue extends AutocompleteMappedValue<FreeSolo> = AutocompleteMappedValue<FreeSolo>,
>(
  props: PartiallyRequired<
    UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, MappedValue>,
    'groupBy' | 'getOptionValue'
  >,
): UseAutocompleteReturnValue<Value, Multiple, DisableClearable, FreeSolo, true, MappedValue>;

// With getOptionValue, without groupBy: selections use mapped values; groupedOptions contains options.
export function useAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  MappedValue extends AutocompleteMappedValue<FreeSolo> = AutocompleteMappedValue<FreeSolo>,
>(
  props: PartiallyRequired<
    Omit<UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, MappedValue>, 'groupBy'>,
    'getOptionValue'
  >,
): UseAutocompleteReturnValue<Value, Multiple, DisableClearable, FreeSolo, false, MappedValue>;

// Without getOptionValue, with groupBy: selections use original options; groupedOptions contains option groups.
export function useAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(
  props: PartiallyRequired<
    UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>,
    'groupBy'
  >,
): UseAutocompleteReturnValue<Value, Multiple, DisableClearable, FreeSolo, true>;

// Without getOptionValue or groupBy: selections use original options; groupedOptions contains options.
export function useAutocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(
  props: Omit<UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>, 'groupBy'>,
): UseAutocompleteReturnValue<Value, Multiple, DisableClearable, FreeSolo, false>;

export interface UseAutocompleteRenderedOption<Value> {
  option: Value;
  index: number;
}

/**
 * Value retains its original meaning of option type for compatibility.
 * MappedValue changes selections and resolver inputs; groupedOptions still contains options.
 */
export interface UseAutocompleteReturnValue<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  HasGroupBy extends boolean = false,
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
> {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: (externalProps?: any) => React.HTMLAttributes<HTMLDivElement>;
  /**
   * Resolver for the input element's props.
   * @returns props that should be spread on the input element
   */
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
  /**
   * Resolver for the input label element's props.
   * @returns props that should be spread on the input label element
   */
  getInputLabelProps: () => Omit<React.HTMLAttributes<HTMLLabelElement>, 'color'>;
  /**
   * Resolver for the `clear` button element's props.
   * @returns props that should be spread on the *clear* button element
   */
  getClearProps: () => React.HTMLAttributes<HTMLButtonElement>;
  /**
   * An item props getter
   */
  getItemProps: AutocompleteGetItemProps<Multiple>;
  /**
   * Resolver for the popup icon's props.
   * @returns props that should be spread on the popup icon
   */
  getPopupIndicatorProps: () => React.HTMLAttributes<HTMLButtonElement>;
  /**
   * Resolver for the listbox component's props.
   * @param externalProps props for the listbox component
   * @returns props that should be spread on the listbox component
   */
  getListboxProps: (externalProps?: any) => React.HTMLAttributes<HTMLUListElement>;
  /**
   * Returns `{ option }` for a resolved selection, or `null` for an unmatched mapped value.
   * Wrapping the option distinguishes matched `null`/`undefined` options from lookup misses.
   * Free-solo strings are returned as `{ option: string }`.
   */
  getOptionFromValue: (
    value: AutocompleteValueOrFreeSoloValueMapping<
      AutocompleteResolvedValue<Value, MappedValue>,
      FreeSolo
    >,
  ) => { option: AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo> } | null;
  /**
   * Resolver for the rendered option element's props.
   * @param renderedOption option rendered on the Autocomplete
   * @returns props that should be spread on the li element
   */
  getOptionProps: (
    renderedOption: UseAutocompleteRenderedOption<Value>,
  ) => React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
  /**
   * Id for the Autocomplete.
   */
  id: string;
  /**
   * The input value.
   */
  inputValue: string;
  /**
   * The value of the autocomplete.
   */
  value: AutocompleteValue<
    AutocompleteResolvedValue<Value, MappedValue>,
    Multiple,
    DisableClearable,
    FreeSolo
  >;
  /**
   * If `true`, the component input has some values.
   */
  dirty: boolean;
  /**
   * If `true`, the listbox is being displayed.
   */
  expanded: boolean;
  /**
   * If `true`, the popup is open on the component.
   */
  popupOpen: boolean;
  /**
   * If `true`, the component is focused.
   */
  focused: boolean;
  /**
   * An HTML element that is used to set the position of the component.
   */
  anchorEl: null | HTMLElement;
  /**
   * Setter for the component `anchorEl`.
   * @returns function for setting `anchorEl`
   */
  setAnchorEl: () => void;
  /**
   * Index of the focused item for the component.
   */
  focusedItem: number;
  /**
   * The options to render.
   * - If `groupBy` is provided, the options are grouped and represented as `AutocompleteGroupedOption<Value>[]`.
   * - Otherwise, the options are represented as a flat array of `Value[]`.
   */
  groupedOptions: HasGroupBy extends true ? AutocompleteGroupedOption<Value>[] : Value[];
}

export default useAutocomplete;
