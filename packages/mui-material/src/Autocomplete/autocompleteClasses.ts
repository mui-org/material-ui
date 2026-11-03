import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AutocompleteClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: string;
  /** State class applied to the root element if the listbox is displayed. */
  expanded: string;
  /** State class applied to the root element if focused. */
  focused: string;
  /** Styles applied to the option elements if they are keyboard focused. */
  focusVisible: string;
  /** Styles applied to the tag elements, for example the chips. */
  tag: string;
  /** Styles applied to the tag elements, for example the chips if `size="small"`. */
  tagSizeSmall: string;
  /** Styles applied to the tag elements, for example the chips if `size="medium"`. */
  tagSizeMedium: string;
  /** Styles applied when the popup icon is rendered. */
  hasPopupIcon: string;
  /** Styles applied when the clear icon is rendered. */
  hasClearIcon: string;
  /** Styles applied to the Input element. */
  inputRoot: string;
  /** Styles applied to the input element. */
  input: string;
  /** Styles applied to the input element if the input is focused. */
  inputFocused: string;
  /** Styles applied to the endAdornment element. */
  endAdornment: string;
  /** Styles applied to the clear indicator. */
  clearIndicator: string;
  /** Styles applied to the popup indicator. */
  popupIndicator: string;
  /** Styles applied to the popup indicator if the popup is open. */
  popupIndicatorOpen: string;
  /** Styles applied to the popper element. */
  popper: string;
  /** Styles applied to the popper element if `disablePortal={true}`. */
  popperDisablePortal: string;
  /** Styles applied to the Paper component. */
  paper: string;
  /** Styles applied to the listbox component. */
  listbox: string;
  /** Styles applied to the loading wrapper. */
  loading: string;
  /** Styles applied to the no option wrapper. */
  noOptions: string;
  /** Styles applied to the status message container. */
  status: string;
  /** Styles applied to the option elements. */
  option: string;
  /** Styles applied to the group's label elements. */
  groupLabel: string;
  /** Styles applied to the group's ul elements. */
  groupUl: string;
}

export type AutocompleteClassKey = keyof AutocompleteClasses;

export function getAutocompleteUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAutocomplete', slot);
}

const autocompleteClasses: AutocompleteClasses = generateUtilityClasses('MuiAutocomplete', [
  'root',
  'expanded',
  'fullWidth',
  'focused',
  'focusVisible',
  'tag',
  'tagSizeSmall',
  'tagSizeMedium',
  'hasPopupIcon',
  'hasClearIcon',
  'inputRoot',
  'input',
  'inputFocused',
  'endAdornment',
  'clearIndicator',
  'popupIndicator',
  'popupIndicatorOpen',
  'popper',
  'popperDisablePortal',
  'paper',
  'listbox',
  'loading',
  'noOptions',
  'status',
  'option',
  'groupLabel',
  'groupUl',
]);

export default autocompleteClasses;
