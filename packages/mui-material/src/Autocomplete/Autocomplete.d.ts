import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, PartiallyRequired } from '@mui/types';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { IconButtonProps } from '../IconButton';
import { ChipProps, ChipTypeMap } from '../Chip';
import { PaperProps } from '../Paper';
import { PopperProps } from '../Popper';
import useAutocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  AutocompleteMappedValue,
  AutocompleteValue,
  createFilterOptions,
  UseAutocompleteProps,
  AutocompleteFreeSoloValueMapping,
  AutocompleteValueOrFreeSoloValueMapping,
} from '../useAutocomplete';
import { AutocompleteResolvedValue } from '../useAutocomplete/useAutocomplete';
import { AutocompleteClasses } from './autocompleteClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface AutocompleteRootSlotPropsOverrides {}
export interface AutocompleteChipSlotPropsOverrides {}
export interface AutocompleteClearIndicatorSlotPropsOverrides {}
export interface AutocompleteListboxSlotPropsOverrides {}
export interface AutocompletePopupIndicatorSlotPropsOverrides {}
export interface AutocompletePaperSlotPropsOverrides {}
export interface AutocompletePopperSlotPropsOverrides {}
export interface AutocompleteStatusSlotPropsOverrides {}

export {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteInputChangeReason,
  AutocompleteMappedValue,
  AutocompleteValue,
  createFilterOptions,
};

/** Value describes list items; MappedValue, when supplied, describes the mapped selections. */
export type AutocompleteOwnerState<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
> = AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent, MappedValue> & {
  disablePortal: boolean;
  expanded: boolean;
  focused: boolean;
  fullWidth: boolean;
  getOptionLabel: (option: AutocompleteValueOrFreeSoloValueMapping<Value, FreeSolo>) => string;
  hasClearIcon: boolean;
  hasPopupIcon: boolean;
  inputFocused: boolean;
  popupOpen: boolean;
  size: OverridableStringUnion<'small' | 'medium', AutocompletePropsSizeOverrides>;
};

export type AutocompleteRenderGetTagProps = ({ index }: { index: number }) => {
  key: number;
  className: string;
  disabled: boolean;
  'data-tag-index': number;
  tabIndex: -1;
  onDelete: (event: any) => void;
};

export type AutocompleteRenderValueGetItemProps<Multiple extends boolean | undefined> =
  Multiple extends true
    ? (args: { index: number }) => {
        key: number;
        className: string;
        disabled: boolean;
        'data-item-index': number;
        tabIndex: -1;
        onDelete: (event: any) => void;
      }
    : (args?: { index?: number | undefined }) => {
        className: string;
        disabled: boolean;
        'data-item-index': number;
        tabIndex: -1;
        onDelete: (event: any) => void;
      };

export type AutocompleteRenderValue<Value, Multiple, FreeSolo> = Multiple extends true
  ? Array<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>
  : NonNullable<Value | AutocompleteFreeSoloValueMapping<FreeSolo>>;

export interface AutocompleteRenderOptionState {
  inputValue: string;
  index: number;
  selected: boolean;
}

export interface AutocompleteRenderGroupParams {
  key: number;
  group: string;
  children?: React.ReactNode;
}

export interface AutocompleteRenderInputParams {
  id: string;
  disabled: boolean;
  fullWidth: boolean;
  size: 'small' | undefined;
  slotProps: {
    inputLabel: ReturnType<ReturnType<typeof useAutocomplete>['getInputLabelProps']>;
    input: {
      ref: React.Ref<any>;
      className: string;
      startAdornment: React.ReactNode;
      endAdornment: React.ReactNode;
      onMouseDown: React.MouseEventHandler;
    };
    htmlInput: ReturnType<ReturnType<typeof useAutocomplete>['getInputProps']>;
  };
}

export interface AutocompletePropsSizeOverrides {}

export interface AutocompleteSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component used to render the selected values when `multiple` is `true`.
   * @default Chip
   */
  chip: React.JSXElementConstructor<ChipProps>;
  /**
   * The component used to render the clear indicator element.
   * @default IconButton
   */
  clearIndicator: React.JSXElementConstructor<
    IconButtonProps & AutocompleteClearIndicatorSlotPropsOverrides
  >;
  /**
   * The component used to render the popup indicator element.
   * @default IconButton
   */
  popupIndicator: React.JSXElementConstructor<
    IconButtonProps & AutocompletePopupIndicatorSlotPropsOverrides
  >;
  /**
   * The component used to render the listbox.
   * @default 'ul'
   */
  listbox: React.JSXElementConstructor<
    React.HTMLAttributes<HTMLElement> & AutocompleteListboxSlotPropsOverrides
  >;
  /**
   * The component used to render the status message container.
   * @default 'div'
   */
  status: React.ElementType;
  /**
   * The component used to render the body of the popup.
   * @default Paper
   */
  paper: React.JSXElementConstructor<PaperProps & AutocompletePaperSlotPropsOverrides>;
  /**
   * The component used to position the popup.
   * @default Popper
   */
  popper: React.JSXElementConstructor<PopperProps & AutocompletePopperSlotPropsOverrides>;
}

export type AutocompleteSlotsAndSlotProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
> = CreateSlotsAndSlotProps<
  AutocompleteSlots,
  {
    root: SlotProps<
      'div',
      AutocompleteRootSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    chip: SlotProps<
      React.ElementType<Partial<ChipProps<ChipComponent>>>,
      AutocompleteChipSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    clearIndicator: SlotProps<
      React.ElementType<Partial<IconButtonProps>>,
      AutocompleteClearIndicatorSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    /**
     * Props applied to the Listbox element.
     */
    listbox: SlotProps<
      React.ElementType<
        ReturnType<ReturnType<typeof useAutocomplete>['getListboxProps']> & {
          sx?: SxProps<Theme> | undefined;
          ref?: React.Ref<Element> | undefined;
        }
      >,
      AutocompleteListboxSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    status: SlotProps<
      'div',
      AutocompleteStatusSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    paper: SlotProps<
      React.ElementType<Partial<PaperProps>>,
      AutocompletePaperSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    popper: SlotProps<
      React.ElementType<Partial<PopperProps>>,
      AutocompletePopperSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
    popupIndicator: SlotProps<
      React.ElementType<Partial<IconButtonProps>>,
      AutocompletePopupIndicatorSlotPropsOverrides,
      AutocompleteOwnerState<
        Value,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent,
        MappedValue
      >
    >;
  }
>;

/**
 * Value retains the original option type and generic name for module augmentation.
 * MappedValue is the type returned by getOptionValue; omitting it keeps selections as options.
 */
export interface AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
>
  extends
    UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, MappedValue>,
    StandardProps<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'children'>,
    AutocompleteSlotsAndSlotProps<
      Value,
      Multiple,
      DisableClearable,
      FreeSolo,
      ChipComponent,
      MappedValue
    > {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AutocompleteClasses> | undefined;
  /**
   * The icon to display in place of the default clear icon.
   * @default <ClearIcon fontSize="small" />
   */
  clearIcon?: React.ReactNode;
  /**
   * Override the default text for the *clear* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Clear'
   */
  clearText?: string | undefined;
  /**
   * Override the default text for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText?: string | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the `Popper` content will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean | undefined;
  /**
   * Force the visibility display of the popup icon.
   * @default 'auto'
   */
  forcePopupIcon?: true | false | 'auto' | undefined;
  /**
   * If `true`, the input takes up the full width of its container.
   *
   * `Autocomplete` treats `undefined` and `false` differently.
   * If `undefined`, the inner input takes up the full width of its container.
   * If `false`, the inner input is restricted to its intrinsic width.
   * @default false
   */
  fullWidth?: boolean | undefined;
  /**
   * The label to display when the tags are truncated (`limitTags`).
   *
   * @param {number} more The number of truncated tags.
   * @returns {ReactNode}
   * @default (more) => `+${more}`
   */
  getLimitTagsText?: ((more: number) => React.ReactNode) | undefined;
  /**
   * If `true`, the component is in a loading state.
   * This shows the `loadingText` in place of suggestions (only if there are no suggestions to show, for example `options` are empty).
   * @default false
   */
  loading?: boolean | undefined;
  /**
   * Text to display when in a loading state.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Loading…'
   */
  loadingText?: React.ReactNode;
  /**
   * The maximum number of tags that will be visible when not focused.
   * Set `-1` to disable the limit.
   * @default -1
   */
  limitTags?: number | undefined;
  /**
   * Text to display when there are no options.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'No options'
   */
  noOptionsText?: React.ReactNode;
  /**
   * Callback fired when a key is pressed.
   * Set `event.defaultMuiPrevented` to `true` to skip the default keyboard handling of the component.
   * @param {React.KeyboardEvent} event The event source of the callback.
   */
  onKeyDown?:
    | ((
        event: React.KeyboardEvent<HTMLDivElement> & { defaultMuiPrevented?: boolean | undefined },
      ) => void)
    | undefined;
  /**
   * Override the default text for the *open popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Open'
   */
  openText?: string | undefined;
  /**
   * The icon to display in place of the default popup icon.
   * @default <ArrowDropDownIcon />
   */
  popupIcon?: React.ReactNode;
  /**
   * If `true`, the component becomes readonly. It is also supported for multiple tags where the tag cannot be deleted.
   * @default false
   */
  readOnly?: boolean | undefined;
  /**
   * Render the group.
   *
   * @param {AutocompleteRenderGroupParams} params The group to render.
   * @returns {ReactNode}
   */
  renderGroup?: ((params: AutocompleteRenderGroupParams) => React.ReactNode) | undefined;
  /**
   * Render the input.
   *
   * **Note:** The `renderInput` prop must return a `TextField` component or a compatible custom component
   * that correctly forwards `InputProps.ref` and spreads `inputProps`. This ensures proper integration
   * with the Autocomplete's internal logic (e.g., focus management and keyboard navigation).
   *
   * Avoid using components like `DatePicker` or `Select` directly, as they may not forward the required props,
   * leading to runtime errors or unexpected behavior.
   *
   * @param {object} params
   * @returns {ReactNode}
   */
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  /**
   * Render the option, use `getOptionLabel` by default.
   *
   * @param {object} props The props to apply on the li element.
   * @param {Value} option The option to render.
   * @param {object} state The state of each option.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderOption?:
    | ((
        props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
        option: Value,
        state: AutocompleteRenderOptionState,
        ownerState: AutocompleteOwnerState<
          Value,
          Multiple,
          DisableClearable,
          FreeSolo,
          ChipComponent,
          MappedValue
        >,
      ) => React.ReactNode)
    | undefined;
  /**
   * Renders the selected value(s) as rich content in the input for both single and multiple selections.
   *
   * @param {AutocompleteRenderValue<Value|MappedValue, Multiple, FreeSolo>} value The `value` provided to the component.
   * When `getOptionValue` is provided, this contains mapped values.
   * @param {function} getItemProps The value item props.
   * @param {object} ownerState The state of the Autocomplete component.
   * @returns {ReactNode}
   */
  renderValue?:
    | ((
        value: AutocompleteRenderValue<
          AutocompleteResolvedValue<Value, MappedValue>,
          Multiple,
          FreeSolo
        >,
        getItemProps: AutocompleteRenderValueGetItemProps<Multiple>,
        ownerState: AutocompleteOwnerState<
          Value,
          Multiple,
          DisableClearable,
          FreeSolo,
          ChipComponent,
          MappedValue
        >,
      ) => React.ReactNode)
    | undefined;
  /**
   * The size of the component.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', AutocompletePropsSizeOverrides> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Autocomplete](https://next.mui.com/material-ui/react-autocomplete/)
 *
 * API:
 *
 * - [Autocomplete API](https://next.mui.com/material-ui/api/autocomplete/)
 */
export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  MappedValue extends AutocompleteMappedValue<FreeSolo> = AutocompleteMappedValue<FreeSolo>,
>(
  // With getOptionValue: selections use mapped values; option callbacks receive original options.
  props: PartiallyRequired<
    AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent, MappedValue>,
    'getOptionValue'
  >,
): React.JSX.Element;
/**
 *
 * Demos:
 *
 * - [Autocomplete](https://mui.com/material-ui/react-autocomplete/)
 *
 * API:
 *
 * - [Autocomplete API](https://mui.com/material-ui/api/autocomplete/)
 */
export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(
  // Without getOptionValue: selections use original options.
  // Preserve existing option inference, including from value/defaultValue.
  props: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
): React.JSX.Element;
/**
 *
 * Demos:
 *
 * - [Autocomplete](https://next.mui.com/material-ui/react-autocomplete/)
 *
 * API:
 *
 * - [Autocomplete API](https://next.mui.com/material-ui/api/autocomplete/)
 */
export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  MappedValue extends AutocompleteMappedValue | undefined = undefined,
>(
  // For styled, memo, and createElement: exposes both prop modes through the last overload they infer from.
  props: AutocompleteProps<
    Value,
    Multiple,
    DisableClearable,
    FreeSolo,
    ChipComponent,
    MappedValue
  > &
    // Explicit mapped types require a mapper; raw and erased types allow it to be absent.
    (undefined extends MappedValue ? {} : { getOptionValue: (option: Value) => MappedValue }) &
    // Share callback types while checking each freeSolo/mapper combination separately.
    (FreeSolo extends unknown
      ? {
          freeSolo?: FreeSolo | undefined;
          // Keep undefined so erased props (React.ComponentProps) re-infer both prop modes.
          getOptionValue?:
            | ((option: Value) => MappedValue & (AutocompleteMappedValue<FreeSolo> | undefined))
            | undefined;
        }
      : never),
): React.JSX.Element;
