import * as React from 'react';

export interface CreateFilterOptionsConfig<T> {
  ignoreAccents?: boolean;
  ignoreCase?: boolean;
  limit?: number;
  matchFrom?: 'any' | 'start';
  stringify?: (option: T) => string;
  trim?: boolean;
}

export interface FilterOptionsState<T> {
  inputValue: string;
  getOptionLabel: (option: T) => string;
}

export interface AutocompleteGroupedOption<T = string> {
  key: number;
  index: number;
  group: string;
  options: T[];
}

export function createFilterOptions<T>(
  config?: CreateFilterOptionsConfig<T>,
): (options: T[], state: FilterOptionsState<T>) => T[];

export type AutocompleteFreeSoloValueMapping<FreeSolo> = FreeSolo extends true ? string : never;

export type Value<T, Multiple, DisableClearable, FreeSolo> = Multiple extends undefined | false
  ? DisableClearable extends true
    ? NonNullable<T | AutocompleteFreeSoloValueMapping<FreeSolo>>
    : T | null | AutocompleteFreeSoloValueMapping<FreeSolo>
  : Array<T | AutocompleteFreeSoloValueMapping<FreeSolo>>;

export interface UseAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> {
  /**
   * If `true`, the portion of the selected suggestion that has not been typed by the user,
   * known as the completion string, appears inline after the input cursor in the textbox.
   * The inline completion string is visually highlighted and has a selected state.
   * @default false
   */
  autoComplete?: boolean;
  /**
   * If `true`, the first option is automatically highlighted.
   * @default false
   */
  autoHighlight?: boolean;
  /**
   * If `true`, the selected option becomes the value of the input
   * when the Autocomplete loses focus unless the user chooses
   * a different option or changes the character string in the input.
   * @default false
   */
  autoSelect?: boolean;
  /**
   * Control if the input should be blurred when an option is selected:
   *
   * - `false` the input is not blurred.
   * - `true` the input is always blurred.
   * - `touch` the input is blurred after a touch event.
   * - `mouse` the input is blurred after a mouse event.
   * @default false
   */
  blurOnSelect?: 'touch' | 'mouse' | true | false;
  /**
   * If `true`, the input's text is cleared on blur if no value is selected.
   *
   * Set to `true` if you want to help the user enter a new value.
   * Set to `false` if you want to help the user resume his search.
   * @default !props.freeSolo
   */
  clearOnBlur?: boolean;
  /**
   * If `true`, clear all values when the user presses escape and the popup is closed.
   * @default false
   */
  clearOnEscape?: boolean;
  /**
   * The component name that is using this hook. Used for warnings.
   */
  componentName?: string;
  /**
   * If `true`, the input can't be cleared.
   * @default false
   */
  disableClearable?: DisableClearable;
  /**
   * If `true`, the popup won't close when a value is selected.
   * @default false
   */
  disableCloseOnSelect?: boolean;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true`, the list box in the popup will not wrap focus.
   * @default false
   */
  disableListWrap?: boolean;
  /**
   * A filter function that determines the options that are eligible.
   *
   * @param {T[]} options The options to render.
   * @param {object} state The state of the component.
   * @returns {T[]}
   */
  disableOpenOnClick?: boolean;
  /**
   * If `true`, dropdown of options on a mouse click event will be disabled.
   * @default false
   */
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
  /**
   * If `true`, hide the selected options from the list box.
   * @default false
   */
  filterSelectedOptions?: boolean;
  /**
   * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
   * @default false
   */
  freeSolo?: FreeSolo;
  /**
   * Used to determine the disabled state for a given option.
   *
   * @param {T} option The option to test.
   * @returns {boolean}
   */
  getOptionDisabled?: (option: T) => boolean;
  /**
   * Used to determine the string value for a given option.
   * It's used to fill the input (and the list box options if `renderOption` is not provided).
   *
   * @param {T} option
   * @returns {string}
   * @default (option) => option.label ?? option
   */
  getOptionLabel?: (option: T) => string;
  /**
   * Used to determine if the option represents the given value.
   * Uses strict equality by default.
   * ⚠️ Both arguments need to be handled, an option can only match with one value.
   *
   * @param {T} option The option to test.
   * @param {T} value The value to test against.
   * @returns {boolean}
   */
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  /**
   * If provided, the options will be grouped under the returned string.
   * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
   *
   * @param {T} options The options to group.
   * @returns {string}
   */
  groupBy?: (option: T) => string;
  /**
   * If `true`, the component handles the "Home" and "End" keys when the popup is open.
   * It should move focus to the first option and last option, respectively.
   * @default !props.freeSolo
   */
  handleHomeEndKeys?: boolean;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide an id it will fall back to a randomly generated one.
   */
  id?: string;
  /**
   * If `true`, the highlight can move to the input.
   * @default false
   */
  includeInputInList?: boolean;
  /**
   * The input value.
   */
  inputValue?: string;
  /**
   * Callback fired when the popup requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"selectOption"`, `"removeOption"`, `"blur"`.
   */
  onClose?: (event: React.SyntheticEvent, reason: AutocompleteCloseReason) => void;
  /**
   * Callback fired when the input value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {string} value The new value of the text input.
   * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
   */
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => void;
  /**
   * Callback fired when the popup requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * Callback fired when the highlight option changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T} option The highlighted option.
   * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`.
   */
  onHighlightChange?: (
    event: React.SyntheticEvent,
    option: T | null,
    reason: AutocompleteHighlightChangeReason,
  ) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * If `true`, the popup will open on input focus.
   * @default false
   */
  openOnFocus?: boolean;
  /**
   * Array of options.
   */
  options: ReadonlyArray<T>;
  /**
   * If `true`, the input's text is selected on focus.
   * It helps the user clear the selected value.
   * @default !props.freeSolo
   */
  selectOnFocus?: boolean;
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple?: Multiple;
  /**
   * The value of the autocomplete.
   *
   * The value must have reference equality with the option in order to be selected.
   * You can customize the equality behavior with the `isOptionEqualToValue` prop.
   */
  value?: Value<T, Multiple, DisableClearable, FreeSolo>;
  /**
   * The default value. Use when the component is not controlled.
   * @default props.multiple ? [] : null
   */
  defaultValue?: Value<T, Multiple, DisableClearable, FreeSolo>;
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback.
   * @param {T|T[]} value The new value of the component.
   * @param {string} reason One of "createOption", "selectOption", "removeOption", "blur" or "clear".
   * @param {string} [details]
   */
  onChange?: (
    event: React.SyntheticEvent,
    value: Value<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>,
  ) => void;
}

export type AutocompleteHighlightChangeReason = 'keyboard' | 'mouse' | 'auto';

export type AutocompleteChangeReason =
  | 'createOption'
  | 'selectOption'
  | 'removeOption'
  | 'clear'
  | 'blur';
export interface AutocompleteChangeDetails<T = string> {
  option: T;
}
export type AutocompleteCloseReason =
  | 'createOption'
  | 'toggleInput'
  | 'escape'
  | 'selectOption'
  | 'removeOption'
  | 'blur';
export type AutocompleteInputChangeReason = 'input' | 'reset' | 'clear';

export type AutocompleteGetTagProps = ({ index }: { index: number }) => {
  key: number;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};

export default function useAutocomplete<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  props: UseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
): {
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  getInputProps: () => React.HTMLAttributes<HTMLInputElement>;
  // We pass `getInputLabelProps()` to `@material-ui/core/InputLabel` which does not implement HTMLLabelElement#color.
  getInputLabelProps: () => Omit<React.HTMLAttributes<HTMLLabelElement>, 'color'>;
  getClearProps: () => React.HTMLAttributes<HTMLDivElement>;
  getPopupIndicatorProps: () => React.HTMLAttributes<HTMLDivElement>;
  getTagProps: AutocompleteGetTagProps;
  getListboxProps: () => React.HTMLAttributes<HTMLUListElement>;
  getOptionProps: ({
    option,
    index,
  }: {
    option: T;
    index: number;
  }) => React.HTMLAttributes<HTMLLIElement>;
  id: string;
  inputValue: string;
  value: Value<T, Multiple, DisableClearable, FreeSolo>;
  dirty: boolean;
  popupOpen: boolean;
  focused: boolean;
  anchorEl: null | HTMLElement;
  setAnchorEl: () => void;
  focusedTag: number;
  /**
   * The options to render. It's either `T[]` or `AutocompleteGroupedOption<T>[]` if the groupBy prop is provided.
   */
  groupedOptions: T[] | Array<AutocompleteGroupedOption<T>>;
};
