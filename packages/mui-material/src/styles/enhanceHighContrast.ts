import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import checkboxClasses from '../Checkbox/checkboxClasses';
import filledInputClasses from '../FilledInput/filledInputClasses';
import formControlLabelClasses from '../FormControlLabel/formControlLabelClasses';
import formHelperTextClasses from '../FormHelperText/formHelperTextClasses';
import formLabelClasses from '../FormLabel/formLabelClasses';
import inputClasses from '../Input/inputClasses';
import listItemButtonClasses from '../ListItemButton/listItemButtonClasses';
import menuItemClasses from '../MenuItem/menuItemClasses';
import nativeSelectClasses from '../NativeSelect/nativeSelectClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import radioClasses from '../Radio/radioClasses';
import sliderClasses from '../Slider/sliderClasses';
import toggleButtonClasses from '../ToggleButton/toggleButtonClasses';
import type { Theme } from './createTheme';

export interface HighContrastTokens {
  /**
   * Color for disabled elements.
   * @default 'GrayText'
   */
  disabled?: string | undefined;
  /**
   * Color for error states.
   * @default 'ActiveText'
   */
  error?: string | undefined;
  /**
   * Background color for selected items.
   * @default 'SelectedItem'
   */
  selectedBackground?: string | undefined;
  /**
   * Text color on selected items.
   * @default 'SelectedItemText'
   */
  selectedText?: string | undefined;
  /**
   * Background color for active/toggled controls.
   * @default 'Highlight'
   */
  activeBackground?: string | undefined;
  /**
   * Text color on active/toggled controls.
   * @default 'HighlightText'
   */
  activeText?: string | undefined;
  /**
   * Border color for interactive controls.
   * @default 'ButtonBorder'
   */
  buttonBorder?: string | undefined;
  /**
   * Text/icon color on buttons.
   * @default 'ButtonText'
   */
  buttonText?: string | undefined;
  /**
   * Background color for the page/canvas.
   * @default 'Canvas'
   */
  canvas?: string | undefined;
}

// System color keywords used in forced-colors / high contrast mode.
const defaultHcTokens: Required<HighContrastTokens> = {
  disabled: 'GrayText',
  error: 'ActiveText',
  selectedBackground: 'SelectedItem',
  selectedText: 'SelectedItemText',
  activeBackground: 'Highlight',
  activeText: 'HighlightText',
  buttonBorder: 'ButtonBorder',
  buttonText: 'ButtonText',
  canvas: 'Canvas',
};

const HCM = '@media (forced-colors: active)';

/**
 * Enhances a theme with styles for Windows High Contrast Mode (forced-colors).
 *
 * Accepts a fully-created theme, merges in HCM component overrides using arrays
 * so that Emotion emits each entry as a separate CSS rule and the browser
 * cascade (rather than JS object merging) resolves specificity.
 *
 * @param themeInput - The theme to enhance.
 * @param tokens - Override any of the default system color tokens.
 * @returns The enhanced theme (same type as the input).
 *
 * @example
 * // Use defaults
 * const theme = enhanceHighContrast(createTheme({ palette: { ... } }));
 *
 * @example
 * // Override specific tokens
 * const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
 */
export default function enhanceHighContrast<
  T extends { components?: Theme['components'] | undefined },
>(themeInput: T, tokens?: HighContrastTokens): T {
  const hcTokens: Required<HighContrastTokens> = {
    disabled: tokens?.disabled ?? defaultHcTokens.disabled,
    error: tokens?.error ?? defaultHcTokens.error,
    selectedBackground: tokens?.selectedBackground ?? defaultHcTokens.selectedBackground,
    selectedText: tokens?.selectedText ?? defaultHcTokens.selectedText,
    activeBackground: tokens?.activeBackground ?? defaultHcTokens.activeBackground,
    activeText: tokens?.activeText ?? defaultHcTokens.activeText,
    buttonBorder: tokens?.buttonBorder ?? defaultHcTokens.buttonBorder,
    buttonText: tokens?.buttonText ?? defaultHcTokens.buttonText,
    canvas: tokens?.canvas ?? defaultHcTokens.canvas,
  };
  const theme = { ...themeInput };
  const c = theme.components;
  theme.components = {
    ...c,
    MuiAccordionSummary: {
      ...c?.MuiAccordionSummary,
      styleOverrides: {
        ...c?.MuiAccordionSummary?.styleOverrides,
        root: [
          c?.MuiAccordionSummary?.styleOverrides?.root,
          {
            [`&.${accordionSummaryClasses.disabled}`]: {
              [HCM]: {
                opacity: 1,
              },
            },
          },
        ],
      },
    },
    MuiAutocomplete: {
      ...c?.MuiAutocomplete,
      styleOverrides: {
        ...c?.MuiAutocomplete?.styleOverrides,
        listbox: [
          c?.MuiAutocomplete?.styleOverrides?.listbox,
          {
            [`& .${autocompleteClasses.option}`]: {
              '&[aria-disabled="true"]': {
                [HCM]: {
                  color: hcTokens.disabled,
                  opacity: 1,
                },
              },
              [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focusVisible}`]: {
                [HCM]: {
                  forcedColorAdjust: 'none',
                  color: hcTokens.activeText,
                  backgroundColor: hcTokens.activeBackground,
                },
              },
              '&[aria-selected="true"]': {
                [HCM]: {
                  forcedColorAdjust: 'none',
                  color: hcTokens.selectedText,
                  backgroundColor: hcTokens.selectedBackground,
                },
                [`&.${autocompleteClasses.focused}`]: {
                  [HCM]: {
                    color: hcTokens.activeText,
                    backgroundColor: hcTokens.activeBackground,
                  },
                },
              },
            },
          },
        ],
      },
    },
    MuiCheckbox: {
      ...c?.MuiCheckbox,
      styleOverrides: {
        ...c?.MuiCheckbox?.styleOverrides,
        root: [
          c?.MuiCheckbox?.styleOverrides?.root,
          {
            [`&.${checkboxClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiFilledInput: {
      ...c?.MuiFilledInput,
      styleOverrides: {
        ...c?.MuiFilledInput?.styleOverrides,
        root: [
          c?.MuiFilledInput?.styleOverrides?.root,
          {
            [`&.${filledInputClasses.error}`]: {
              '&::before, &::after': {
                [HCM]: {
                  borderBottomColor: hcTokens.error,
                },
              },
            },
            [`&.${filledInputClasses.disabled}:before`]: {
              [HCM]: {
                borderBottomStyle: 'solid',
                borderBottomColor: hcTokens.disabled,
              },
            },
            [`&.${filledInputClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiFormControlLabel: {
      ...c?.MuiFormControlLabel,
      styleOverrides: {
        ...c?.MuiFormControlLabel?.styleOverrides,
        root: [
          c?.MuiFormControlLabel?.styleOverrides?.root,
          {
            [`& .${formControlLabelClasses.label}.${formControlLabelClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiFormHelperText: {
      ...c?.MuiFormHelperText,
      styleOverrides: {
        ...c?.MuiFormHelperText?.styleOverrides,
        root: [
          c?.MuiFormHelperText?.styleOverrides?.root,
          {
            [`&.${formHelperTextClasses.error}`]: {
              [HCM]: {
                color: hcTokens.error,
              },
            },
            [`&.${formHelperTextClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiFormLabel: {
      ...c?.MuiFormLabel,
      styleOverrides: {
        ...c?.MuiFormLabel?.styleOverrides,
        root: [
          c?.MuiFormLabel?.styleOverrides?.root,
          {
            [`&.${formLabelClasses.error}`]: {
              [HCM]: {
                color: hcTokens.error,
              },
            },
            [`&.${formLabelClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiInput: {
      ...c?.MuiInput,
      styleOverrides: {
        ...c?.MuiInput?.styleOverrides,
        root: [
          c?.MuiInput?.styleOverrides?.root,
          {
            [`&.${inputClasses.error}`]: {
              '&::before, &::after': {
                [HCM]: {
                  borderBottomColor: hcTokens.error,
                },
              },
            },
            [`&.${inputClasses.disabled}:before`]: {
              [HCM]: {
                borderBottomStyle: 'solid',
                borderBottomColor: hcTokens.disabled,
              },
            },
            [`&.${inputClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiLinearProgress: {
      ...c?.MuiLinearProgress,
      styleOverrides: {
        ...c?.MuiLinearProgress?.styleOverrides,
        root: [
          c?.MuiLinearProgress?.styleOverrides?.root,
          {
            [HCM]: {
              forcedColorAdjust: 'none',
              outline: `1px solid ${hcTokens.buttonBorder}`,
              backgroundColor: hcTokens.canvas,
            },
          },
        ],
        bar: [
          c?.MuiLinearProgress?.styleOverrides?.bar,
          {
            [HCM]: {
              backgroundColor: hcTokens.buttonText,
            },
          },
        ],
        bar2: [
          c?.MuiLinearProgress?.styleOverrides?.bar2,
          {
            variants: [
              {
                props: { variant: 'buffer' },
                style: {
                  [HCM]: {
                    backgroundColor: hcTokens.disabled,
                  },
                },
              },
            ],
          },
        ],
      },
    },
    MuiInputBase: {
      ...c?.MuiInputBase,
      styleOverrides: {
        ...c?.MuiInputBase?.styleOverrides,
        input: [
          c?.MuiInputBase?.styleOverrides?.input,
          {
            [HCM]: {
              '&::placeholder': {
                opacity: 1,
              },
            },
          },
        ],
      },
    },
    MuiMenuItem: {
      ...c?.MuiMenuItem,
      styleOverrides: {
        ...c?.MuiMenuItem?.styleOverrides,
        root: [
          c?.MuiMenuItem?.styleOverrides?.root,
          {
            [`&.${menuItemClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
                opacity: 1,
              },
            },
            [`&.${menuItemClasses.focusVisible}, &:hover`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground,
                outline: 'none',
              },
            },
            [`&.${menuItemClasses.selected}`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground,
              },
            },
            [`&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}, &.${menuItemClasses.selected}:hover`]:
              {
                [HCM]: {
                  color: hcTokens.activeText,
                  backgroundColor: hcTokens.activeBackground,
                },
              },
          },
        ],
      },
    },
    MuiListItemIcon: {
      ...c?.MuiListItemIcon,
      styleOverrides: {
        ...c?.MuiListItemIcon?.styleOverrides,
        root: [
          c?.MuiListItemIcon?.styleOverrides?.root,
          {
            [HCM]: {
              color: 'inherit',
            },
          },
        ],
      },
    },
    MuiListItemButton: {
      ...c?.MuiListItemButton,
      styleOverrides: {
        ...c?.MuiListItemButton?.styleOverrides,
        root: [
          c?.MuiListItemButton?.styleOverrides?.root,
          {
            [`&.${listItemButtonClasses.focusVisible}, &:hover`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground,
              },
            },
            [`&.${listItemButtonClasses.selected}`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground,
              },
            },
            [`&.${listItemButtonClasses.selected}.${listItemButtonClasses.focusVisible}, &.${listItemButtonClasses.selected}:hover`]:
              {
                [HCM]: {
                  color: hcTokens.activeText,
                  backgroundColor: hcTokens.activeBackground,
                },
              },
          },
        ],
      },
    },
    MuiNativeSelect: {
      ...c?.MuiNativeSelect,
      styleOverrides: {
        ...c?.MuiNativeSelect?.styleOverrides,
        icon: [
          c?.MuiNativeSelect?.styleOverrides?.icon,
          {
            [`&.${nativeSelectClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiOutlinedInput: {
      ...c?.MuiOutlinedInput,
      styleOverrides: {
        ...c?.MuiOutlinedInput?.styleOverrides,
        root: [
          c?.MuiOutlinedInput?.styleOverrides?.root,
          {
            [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
              [HCM]: {
                borderColor: hcTokens.error,
              },
            },
            [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            },
            [`&.${outlinedInputClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiRadio: {
      ...c?.MuiRadio,
      styleOverrides: {
        ...c?.MuiRadio?.styleOverrides,
        root: [
          c?.MuiRadio?.styleOverrides?.root,
          {
            [`&.${radioClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiSlider: {
      ...c?.MuiSlider,
      styleOverrides: {
        ...c?.MuiSlider?.styleOverrides,
        // track doesn't receive the disabled class — use ownerState
        track: [
          c?.MuiSlider?.styleOverrides?.track,
          ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
        ],
        // thumb receives the disabled class directly
        thumb: [
          c?.MuiSlider?.styleOverrides?.thumb,
          {
            [`&.${sliderClasses.disabled}`]: {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            },
          },
        ],
      },
    },
    MuiSwitch: {
      ...c?.MuiSwitch,
      styleOverrides: {
        ...c?.MuiSwitch?.styleOverrides,
        // track and thumb don't receive the disabled class — use ownerState
        track: [
          c?.MuiSwitch?.styleOverrides?.track,
          ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
        ],
        thumb: [
          c?.MuiSwitch?.styleOverrides?.thumb,
          ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
        ],
      },
    },
    MuiButtonBase: {
      ...c?.MuiButtonBase,
      styleOverrides: {
        ...c?.MuiButtonBase?.styleOverrides,
        root: [
          c?.MuiButtonBase?.styleOverrides?.root,
          {
            // Restore the focus outline in HCM since the ripple is not visible.
            // Also handle components where the focusable element is a hidden inner input (Checkbox, Radio, Switch).
            [HCM]: {
              '&:focus-visible, &:focus-within:has(input:focus-visible)': {
                outline: `5px auto ${hcTokens.activeBackground}`,
              },
            },
          },
        ],
      },
    },
    MuiTooltip: {
      ...c?.MuiTooltip,
      styleOverrides: {
        ...c?.MuiTooltip?.styleOverrides,
        tooltip: [
          c?.MuiTooltip?.styleOverrides?.tooltip,
          {
            [HCM]: {
              border: `1px solid ${hcTokens.buttonText}`,
            },
          },
        ],
      },
    },
    MuiToggleButton: {
      ...c?.MuiToggleButton,
      styleOverrides: {
        ...c?.MuiToggleButton?.styleOverrides,
        root: [
          c?.MuiToggleButton?.styleOverrides?.root,
          {
            [`&.${toggleButtonClasses.selected}`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground,
                borderColor: hcTokens.activeBackground,
              },
              '&:hover': {
                [HCM]: {
                  backgroundColor: hcTokens.activeBackground,
                  borderColor: hcTokens.buttonBorder,
                },
              },
            },
          },
        ],
      },
    },
  };
  return theme;
}
