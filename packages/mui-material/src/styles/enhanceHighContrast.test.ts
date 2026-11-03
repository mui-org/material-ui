import { describe, test, expect } from 'vitest';
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
import createTheme from './createTheme';
import enhanceHighContrast from './enhanceHighContrast';

const HCM = '@media (forced-colors: active)';

type StyleOverride = Record<string, unknown>;

describe('enhanceHighContrast', () => {
  describe('MuiAccordionSummary overrides', () => {
    test('should set opacity: 1 on disabled AccordionSummary root in high contrast mode', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiAccordionSummary?.styleOverrides
        ?.root as Array<StyleOverride>;

      expect(rootOverrides).to.be.an('array');

      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      expect(hcmOverride[`&.${accordionSummaryClasses.disabled}`]).to.deep.equal({
        [HCM]: { opacity: 1 },
      });
    });
  });

  describe('MuiAutocomplete overrides', () => {
    test('should apply disabled color and opacity: 1 to aria-disabled options', () => {
      const theme = enhanceHighContrast(createTheme());
      const listboxOverrides = theme.components?.MuiAutocomplete?.styleOverrides
        ?.listbox as Array<StyleOverride>;
      const hcmOverride = listboxOverrides[listboxOverrides.length - 1] as Record<
        string,
        StyleOverride
      >;
      const optionStyles = hcmOverride[`& .${autocompleteClasses.option}`];

      expect(optionStyles['&[aria-disabled="true"]']).to.deep.equal({
        [HCM]: { color: 'GrayText', opacity: 1 },
      });
    });

    test('should apply activeText and activeBackground to focused/focusVisible options', () => {
      const theme = enhanceHighContrast(createTheme());
      const listboxOverrides = theme.components?.MuiAutocomplete?.styleOverrides
        ?.listbox as Array<StyleOverride>;
      const hcmOverride = listboxOverrides[listboxOverrides.length - 1] as Record<
        string,
        StyleOverride
      >;
      const optionStyles = hcmOverride[`& .${autocompleteClasses.option}`];
      const focusedKey = `&.${autocompleteClasses.focused}, &.${autocompleteClasses.focusVisible}`;

      expect(optionStyles[focusedKey]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'HighlightText',
          backgroundColor: 'Highlight',
        },
      });
    });

    test('should apply selectedText and selectedBackground to aria-selected options', () => {
      const theme = enhanceHighContrast(createTheme());
      const listboxOverrides = theme.components?.MuiAutocomplete?.styleOverrides
        ?.listbox as Array<StyleOverride>;
      const hcmOverride = listboxOverrides[listboxOverrides.length - 1] as Record<
        string,
        StyleOverride
      >;
      const optionStyles = hcmOverride[`& .${autocompleteClasses.option}`];
      const selectedStyles = optionStyles['&[aria-selected="true"]'] as Record<string, unknown>;

      expect(selectedStyles[HCM]).to.deep.equal({
        forcedColorAdjust: 'none',
        color: 'SelectedItemText',
        backgroundColor: 'SelectedItem',
      });
    });

    test('should apply activeText and activeBackground to selected and focused options', () => {
      const theme = enhanceHighContrast(createTheme());
      const listboxOverrides = theme.components?.MuiAutocomplete?.styleOverrides
        ?.listbox as Array<StyleOverride>;
      const hcmOverride = listboxOverrides[listboxOverrides.length - 1] as Record<
        string,
        StyleOverride
      >;
      const optionStyles = hcmOverride[`& .${autocompleteClasses.option}`];
      const selectedFocusedStyles = (optionStyles['&[aria-selected="true"]'] as StyleOverride)[
        `&.${autocompleteClasses.focused}`
      ] as StyleOverride;

      expect(selectedFocusedStyles[HCM]).to.deep.equal({
        color: 'HighlightText',
        backgroundColor: 'Highlight',
      });
    });

    test('should use custom tokens when provided', () => {
      const theme = enhanceHighContrast(createTheme(), {
        disabled: 'ButtonText',
        activeText: 'Canvas',
        activeBackground: 'ButtonBorder',
        selectedText: 'ButtonText',
        selectedBackground: 'ButtonFace',
      });
      const listboxOverrides = theme.components?.MuiAutocomplete?.styleOverrides
        ?.listbox as Array<StyleOverride>;
      const hcmOverride = listboxOverrides[listboxOverrides.length - 1] as Record<
        string,
        StyleOverride
      >;
      const optionStyles = hcmOverride[`& .${autocompleteClasses.option}`];

      expect(optionStyles['&[aria-disabled="true"]']).to.deep.equal({
        [HCM]: { color: 'ButtonText', opacity: 1 },
      });

      const focusedKey = `&.${autocompleteClasses.focused}, &.${autocompleteClasses.focusVisible}`;
      expect(optionStyles[focusedKey]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'Canvas',
          backgroundColor: 'ButtonBorder',
        },
      });

      expect((optionStyles['&[aria-selected="true"]'] as StyleOverride)[HCM]).to.deep.equal({
        forcedColorAdjust: 'none',
        color: 'ButtonText',
        backgroundColor: 'ButtonFace',
      });
    });
  });

  describe('MuiCheckbox overrides', () => {
    test('should apply disabled color to disabled Checkbox root', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiCheckbox?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${checkboxClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom disabled token', () => {
      const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
      const rootOverrides = theme.components?.MuiCheckbox?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${checkboxClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiFilledInput overrides', () => {
    test('should apply error borderBottomColor to error state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiFilledInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;

      expect(hcmOverride[`&.${filledInputClasses.error}`]).to.deep.equal({
        '&::before, &::after': { [HCM]: { borderBottomColor: 'ActiveText' } },
      });
    });

    test('should apply disabled borderBottomStyle and color to disabled state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiFilledInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;

      expect(hcmOverride[`&.${filledInputClasses.disabled}:before`]).to.deep.equal({
        [HCM]: { borderBottomStyle: 'solid', borderBottomColor: 'GrayText' },
      });
      expect(hcmOverride[`&.${filledInputClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom error and disabled tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        error: 'LinkText',
        disabled: 'ButtonText',
      });
      const rootOverrides = theme.components?.MuiFilledInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;

      expect(hcmOverride[`&.${filledInputClasses.error}`]).to.deep.equal({
        '&::before, &::after': { [HCM]: { borderBottomColor: 'LinkText' } },
      });
      expect(hcmOverride[`&.${filledInputClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiFormControlLabel overrides', () => {
    test('should apply disabled color to disabled label', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiFormControlLabel?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      const selector = `& .${formControlLabelClasses.label}.${formControlLabelClasses.disabled}`;

      expect(hcmOverride[selector]).to.deep.equal({ [HCM]: { color: 'GrayText' } });
    });

    test('should use custom disabled token', () => {
      const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
      const rootOverrides = theme.components?.MuiFormControlLabel?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      const selector = `& .${formControlLabelClasses.label}.${formControlLabelClasses.disabled}`;

      expect(hcmOverride[selector]).to.deep.equal({ [HCM]: { color: 'ButtonText' } });
    });
  });

  describe('MuiFormHelperText overrides', () => {
    test('should apply error color to error state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiFormHelperText?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${formHelperTextClasses.error}`]).to.deep.equal({
        [HCM]: { color: 'ActiveText' },
      });
    });

    test('should apply disabled color to disabled state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiFormHelperText?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${formHelperTextClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom error and disabled tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        error: 'LinkText',
        disabled: 'ButtonText',
      });
      const rootOverrides = theme.components?.MuiFormHelperText?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${formHelperTextClasses.error}`]).to.deep.equal({
        [HCM]: { color: 'LinkText' },
      });
      expect(hcmOverride[`&.${formHelperTextClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiFormLabel overrides', () => {
    test('should apply error and disabled colors', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiFormLabel?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${formLabelClasses.error}`]).to.deep.equal({
        [HCM]: { color: 'ActiveText' },
      });
      expect(hcmOverride[`&.${formLabelClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom error and disabled tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        error: 'LinkText',
        disabled: 'ButtonText',
      });
      const rootOverrides = theme.components?.MuiFormLabel?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${formLabelClasses.error}`]).to.deep.equal({
        [HCM]: { color: 'LinkText' },
      });
      expect(hcmOverride[`&.${formLabelClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiInput overrides', () => {
    test('should apply error borderBottomColor, disabled borderBottomStyle and color', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;

      expect(hcmOverride[`&.${inputClasses.error}`]).to.deep.equal({
        '&::before, &::after': { [HCM]: { borderBottomColor: 'ActiveText' } },
      });
      expect(hcmOverride[`&.${inputClasses.disabled}:before`]).to.deep.equal({
        [HCM]: { borderBottomStyle: 'solid', borderBottomColor: 'GrayText' },
      });
      expect(hcmOverride[`&.${inputClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom error and disabled tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        error: 'LinkText',
        disabled: 'ButtonText',
      });
      const rootOverrides = theme.components?.MuiInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as StyleOverride;

      expect(hcmOverride[`&.${inputClasses.error}`]).to.deep.equal({
        '&::before, &::after': { [HCM]: { borderBottomColor: 'LinkText' } },
      });
      expect(hcmOverride[`&.${inputClasses.disabled}:before`]).to.deep.equal({
        [HCM]: { borderBottomStyle: 'solid', borderBottomColor: 'ButtonText' },
      });
      expect(hcmOverride[`&.${inputClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiInputBase overrides', () => {
    test('should set placeholder opacity: 1 in high contrast mode', () => {
      const theme = enhanceHighContrast(createTheme());
      const inputOverrides = theme.components?.MuiInputBase?.styleOverrides
        ?.input as Array<StyleOverride>;
      const hcmOverride = inputOverrides[inputOverrides.length - 1];

      expect(hcmOverride[HCM]).to.deep.equal({ '&::placeholder': { opacity: 1 } });
    });
  });

  describe('MuiLinearProgress overrides', () => {
    test('should apply forcedColorAdjust, outline, and canvas background to root', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiLinearProgress?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[HCM]).to.deep.equal({
        forcedColorAdjust: 'none',
        outline: '1px solid ButtonBorder',
        backgroundColor: 'Canvas',
      });
    });

    test('should apply buttonText color to bar', () => {
      const theme = enhanceHighContrast(createTheme());
      const barOverrides = theme.components?.MuiLinearProgress?.styleOverrides
        ?.bar as Array<StyleOverride>;
      const hcmOverride = barOverrides[barOverrides.length - 1];

      expect(hcmOverride[HCM]).to.deep.equal({ backgroundColor: 'ButtonText' });
    });

    test('should apply disabled color to buffer bar2 variant', () => {
      const theme = enhanceHighContrast(createTheme());
      const bar2Overrides = theme.components?.MuiLinearProgress?.styleOverrides
        ?.bar2 as Array<StyleOverride>;
      const hcmOverride = bar2Overrides[bar2Overrides.length - 1] as {
        variants: Array<{ props: StyleOverride; style: StyleOverride }>;
      };

      expect(hcmOverride.variants[0].props).to.deep.equal({ variant: 'buffer' });
      expect(hcmOverride.variants[0].style).to.deep.equal({
        [HCM]: { backgroundColor: 'GrayText' },
      });
    });

    test('should use custom tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        buttonBorder: 'Highlight',
        canvas: 'ButtonFace',
        buttonText: 'CanvasText',
        disabled: 'ButtonText',
      });
      const rootOverrides = theme.components?.MuiLinearProgress?.styleOverrides
        ?.root as Array<StyleOverride>;
      expect((rootOverrides[rootOverrides.length - 1] as StyleOverride)[HCM]).to.deep.equal({
        forcedColorAdjust: 'none',
        outline: '1px solid Highlight',
        backgroundColor: 'ButtonFace',
      });

      const barOverrides = theme.components?.MuiLinearProgress?.styleOverrides
        ?.bar as Array<StyleOverride>;
      expect((barOverrides[barOverrides.length - 1] as StyleOverride)[HCM]).to.deep.equal({
        backgroundColor: 'CanvasText',
      });

      const bar2Overrides = theme.components?.MuiLinearProgress?.styleOverrides
        ?.bar2 as Array<StyleOverride>;
      const bar2HcmOverride = (
        bar2Overrides[bar2Overrides.length - 1] as {
          variants: Array<{ props: StyleOverride; style: StyleOverride }>;
        }
      ).variants[0].style;
      expect(bar2HcmOverride).to.deep.equal({ [HCM]: { backgroundColor: 'ButtonText' } });
    });
  });

  describe('MuiListItemButton overrides', () => {
    test('should apply activeText and activeBackground to focusVisible/hover', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiListItemButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      const focusedKey = `&.${listItemButtonClasses.focusVisible}, &:hover`;

      expect(hcmOverride[focusedKey]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'HighlightText',
          backgroundColor: 'Highlight',
        },
      });
    });

    test('should apply selectedText and selectedBackground to selected state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiListItemButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${listItemButtonClasses.selected}`]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'SelectedItemText',
          backgroundColor: 'SelectedItem',
        },
      });
    });

    test('should apply activeText and activeBackground to selected+focusVisible/hover', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiListItemButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      const selectedFocusedKey = `&.${listItemButtonClasses.selected}.${listItemButtonClasses.focusVisible}, &.${listItemButtonClasses.selected}:hover`;

      expect(hcmOverride[selectedFocusedKey]).to.deep.equal({
        [HCM]: { color: 'HighlightText', backgroundColor: 'Highlight' },
      });
    });

    test('should use custom tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        activeText: 'Canvas',
        activeBackground: 'ButtonBorder',
        selectedText: 'ButtonText',
        selectedBackground: 'ButtonFace',
      });
      const rootOverrides = theme.components?.MuiListItemButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${listItemButtonClasses.focusVisible}, &:hover`]).to.deep.equal({
        [HCM]: { forcedColorAdjust: 'none', color: 'Canvas', backgroundColor: 'ButtonBorder' },
      });
      expect(hcmOverride[`&.${listItemButtonClasses.selected}`]).to.deep.equal({
        [HCM]: { forcedColorAdjust: 'none', color: 'ButtonText', backgroundColor: 'ButtonFace' },
      });
      const selectedFocusedKey = `&.${listItemButtonClasses.selected}.${listItemButtonClasses.focusVisible}, &.${listItemButtonClasses.selected}:hover`;
      expect(hcmOverride[selectedFocusedKey]).to.deep.equal({
        [HCM]: { color: 'Canvas', backgroundColor: 'ButtonBorder' },
      });
    });
  });

  describe('MuiMenuItem overrides', () => {
    test('should apply disabled color and opacity: 1 to disabled state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiMenuItem?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${menuItemClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText', opacity: 1 },
      });
    });

    test('should apply activeText and activeBackground to focusVisible/hover', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiMenuItem?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      const focusedKey = `&.${menuItemClasses.focusVisible}, &:hover`;

      expect(hcmOverride[focusedKey]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'HighlightText',
          backgroundColor: 'Highlight',
          outline: 'none',
        },
      });
    });

    test('should apply selectedText and selectedBackground to selected state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiMenuItem?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${menuItemClasses.selected}`]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'SelectedItemText',
          backgroundColor: 'SelectedItem',
        },
      });
    });

    test('should apply activeText and activeBackground to selected+focusVisible/hover', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiMenuItem?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];
      const selectedFocusedKey = `&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}, &.${menuItemClasses.selected}:hover`;

      expect(hcmOverride[selectedFocusedKey]).to.deep.equal({
        [HCM]: { color: 'HighlightText', backgroundColor: 'Highlight' },
      });
    });

    test('should use custom tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        disabled: 'ButtonText',
        activeText: 'Canvas',
        activeBackground: 'ButtonBorder',
        selectedText: 'ButtonText',
        selectedBackground: 'ButtonFace',
      });
      const rootOverrides = theme.components?.MuiMenuItem?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${menuItemClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText', opacity: 1 },
      });
      expect(hcmOverride[`&.${menuItemClasses.focusVisible}, &:hover`]).to.deep.equal({
        [HCM]: {
          forcedColorAdjust: 'none',
          color: 'Canvas',
          backgroundColor: 'ButtonBorder',
          outline: 'none',
        },
      });
      expect(hcmOverride[`&.${menuItemClasses.selected}`]).to.deep.equal({
        [HCM]: { forcedColorAdjust: 'none', color: 'ButtonText', backgroundColor: 'ButtonFace' },
      });
      const selectedFocusedKey = `&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}, &.${menuItemClasses.selected}:hover`;
      expect(hcmOverride[selectedFocusedKey]).to.deep.equal({
        [HCM]: { color: 'Canvas', backgroundColor: 'ButtonBorder' },
      });
    });
  });

  describe('MuiNativeSelect overrides', () => {
    test('should apply disabled color to disabled icon', () => {
      const theme = enhanceHighContrast(createTheme());
      const iconOverrides = theme.components?.MuiNativeSelect?.styleOverrides
        ?.icon as Array<StyleOverride>;
      const hcmOverride = iconOverrides[iconOverrides.length - 1];

      expect(hcmOverride[`&.${nativeSelectClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom disabled token', () => {
      const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
      const iconOverrides = theme.components?.MuiNativeSelect?.styleOverrides
        ?.icon as Array<StyleOverride>;
      const hcmOverride = iconOverrides[iconOverrides.length - 1];

      expect(hcmOverride[`&.${nativeSelectClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiOutlinedInput overrides', () => {
    test('should apply error borderColor to notchedOutline in error state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiOutlinedInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;
      const errorKey = `&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`;

      expect(hcmOverride[errorKey]).to.deep.equal({ [HCM]: { borderColor: 'ActiveText' } });
    });

    test('should apply disabled borderColor to notchedOutline and disabled color in disabled state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiOutlinedInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;
      const disabledOutlineKey = `&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`;

      expect(hcmOverride[disabledOutlineKey]).to.deep.equal({
        [HCM]: { borderColor: 'GrayText' },
      });
      expect(hcmOverride[`&.${outlinedInputClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom error and disabled tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        error: 'LinkText',
        disabled: 'ButtonText',
      });
      const rootOverrides = theme.components?.MuiOutlinedInput?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as StyleOverride;
      const errorKey = `&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`;
      const disabledOutlineKey = `&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`;

      expect(hcmOverride[errorKey]).to.deep.equal({ [HCM]: { borderColor: 'LinkText' } });
      expect(hcmOverride[disabledOutlineKey]).to.deep.equal({
        [HCM]: { borderColor: 'ButtonText' },
      });
      expect(hcmOverride[`&.${outlinedInputClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiRadio overrides', () => {
    test('should apply disabled color to disabled Radio root', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiRadio?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${radioClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'GrayText' },
      });
    });

    test('should use custom disabled token', () => {
      const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
      const rootOverrides = theme.components?.MuiRadio?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1];

      expect(hcmOverride[`&.${radioClasses.disabled}`]).to.deep.equal({
        [HCM]: { color: 'ButtonText' },
      });
    });
  });

  describe('MuiSlider overrides', () => {
    test('should apply disabled borderColor to track via ownerState', () => {
      const theme = enhanceHighContrast(createTheme());
      const trackOverrides = theme.components?.MuiSlider?.styleOverrides?.track as Array<unknown>;
      const fn = trackOverrides[trackOverrides.length - 1] as (ctx: {
        ownerState: { disabled?: boolean };
      }) => StyleOverride;

      expect(fn({ ownerState: { disabled: true } })).to.deep.equal({
        [HCM]: { borderColor: 'GrayText' },
      });
      expect(fn({ ownerState: { disabled: false } })).to.deep.equal({});
    });

    test('should apply disabled borderColor to disabled Slider thumb', () => {
      const theme = enhanceHighContrast(createTheme());
      const thumbOverrides = theme.components?.MuiSlider?.styleOverrides
        ?.thumb as Array<StyleOverride>;
      const hcmOverride = thumbOverrides[thumbOverrides.length - 1];

      expect(hcmOverride[`&.${sliderClasses.disabled}`]).to.deep.equal({
        [HCM]: { borderColor: 'GrayText' },
      });
    });

    test('should use custom disabled token', () => {
      const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });
      const trackOverrides = theme.components?.MuiSlider?.styleOverrides?.track as Array<unknown>;
      const fn = trackOverrides[trackOverrides.length - 1] as (ctx: {
        ownerState: { disabled?: boolean };
      }) => StyleOverride;

      expect(fn({ ownerState: { disabled: true } })).to.deep.equal({
        [HCM]: { borderColor: 'ButtonText' },
      });
    });
  });

  describe('MuiSwitch overrides', () => {
    test('should apply disabled borderColor to track and thumb via ownerState', () => {
      const theme = enhanceHighContrast(createTheme());

      for (const slot of ['track', 'thumb'] as const) {
        const slotOverrides = theme.components?.MuiSwitch?.styleOverrides?.[slot] as Array<unknown>;
        const fn = slotOverrides[slotOverrides.length - 1] as (ctx: {
          ownerState: { disabled?: boolean };
        }) => StyleOverride;

        expect(fn({ ownerState: { disabled: true } })).to.deep.equal({
          [HCM]: { borderColor: 'GrayText' },
        });
        expect(fn({ ownerState: { disabled: false } })).to.deep.equal({});
      }
    });

    test('should use custom disabled token', () => {
      const theme = enhanceHighContrast(createTheme(), { disabled: 'ButtonText' });

      for (const slot of ['track', 'thumb'] as const) {
        const slotOverrides = theme.components?.MuiSwitch?.styleOverrides?.[slot] as Array<unknown>;
        const fn = slotOverrides[slotOverrides.length - 1] as (ctx: {
          ownerState: { disabled?: boolean };
        }) => StyleOverride;

        expect(fn({ ownerState: { disabled: true } })).to.deep.equal({
          [HCM]: { borderColor: 'ButtonText' },
        });
      }
    });
  });

  describe('MuiButtonBase overrides', () => {
    test('should restore focus outline in high contrast mode', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiButtonBase?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;

      expect(hcmOverride[HCM]).to.deep.equal({
        '&:focus-visible, &:focus-within:has(input:focus-visible)': {
          outline: '5px auto Highlight',
        },
      });
    });

    test('should use custom activeBackground token for the outline', () => {
      const theme = enhanceHighContrast(createTheme(), { activeBackground: 'ButtonBorder' });
      const rootOverrides = theme.components?.MuiButtonBase?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;

      expect(hcmOverride[HCM]).to.deep.equal({
        '&:focus-visible, &:focus-within:has(input:focus-visible)': {
          outline: '5px auto ButtonBorder',
        },
      });
    });
  });

  describe('MuiTooltip overrides', () => {
    test('should apply buttonText border to tooltip', () => {
      const theme = enhanceHighContrast(createTheme());
      const tooltipOverrides = theme.components?.MuiTooltip?.styleOverrides
        ?.tooltip as Array<StyleOverride>;
      const hcmOverride = tooltipOverrides[tooltipOverrides.length - 1];

      expect(hcmOverride[HCM]).to.deep.equal({ border: '1px solid ButtonText' });
    });

    test('should use custom buttonText token', () => {
      const theme = enhanceHighContrast(createTheme(), { buttonText: 'CanvasText' });
      const tooltipOverrides = theme.components?.MuiTooltip?.styleOverrides
        ?.tooltip as Array<StyleOverride>;
      const hcmOverride = tooltipOverrides[tooltipOverrides.length - 1];

      expect(hcmOverride[HCM]).to.deep.equal({ border: '1px solid CanvasText' });
    });
  });

  describe('MuiToggleButton overrides', () => {
    test('should apply activeText, activeBackground, and borderColor to selected state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiToggleButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;
      const selectedStyles = hcmOverride[`&.${toggleButtonClasses.selected}`] as Record<
        string,
        unknown
      >;

      expect(selectedStyles[HCM]).to.deep.equal({
        forcedColorAdjust: 'none',
        color: 'HighlightText',
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
      });
    });

    test('should apply activeBackground and buttonBorder to selected+hover state', () => {
      const theme = enhanceHighContrast(createTheme());
      const rootOverrides = theme.components?.MuiToggleButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;
      const selectedHoverStyles = (
        hcmOverride[`&.${toggleButtonClasses.selected}`] as StyleOverride
      )['&:hover'] as StyleOverride;

      expect(selectedHoverStyles[HCM]).to.deep.equal({
        backgroundColor: 'Highlight',
        borderColor: 'ButtonBorder',
      });
    });

    test('should use custom tokens', () => {
      const theme = enhanceHighContrast(createTheme(), {
        activeText: 'Canvas',
        activeBackground: 'ButtonBorder',
        buttonBorder: 'Highlight',
      });
      const rootOverrides = theme.components?.MuiToggleButton?.styleOverrides
        ?.root as Array<StyleOverride>;
      const hcmOverride = rootOverrides[rootOverrides.length - 1] as Record<string, StyleOverride>;
      const selectedStyles = hcmOverride[`&.${toggleButtonClasses.selected}`] as Record<
        string,
        unknown
      >;

      expect(selectedStyles[HCM]).to.deep.equal({
        forcedColorAdjust: 'none',
        color: 'Canvas',
        backgroundColor: 'ButtonBorder',
        borderColor: 'ButtonBorder',
      });

      const selectedHoverStyles = (selectedStyles['&:hover'] as StyleOverride)[HCM];
      expect(selectedHoverStyles).to.deep.equal({
        backgroundColor: 'ButtonBorder',
        borderColor: 'Highlight',
      });
    });
  });

  describe('preserves existing styleOverrides', () => {
    const cases: Array<[component: string, slot: string]> = [
      ['MuiAccordionSummary', 'root'],
      ['MuiAutocomplete', 'listbox'],
      ['MuiCheckbox', 'root'],
      ['MuiFilledInput', 'root'],
      ['MuiFormControlLabel', 'root'],
      ['MuiFormHelperText', 'root'],
      ['MuiFormLabel', 'root'],
      ['MuiInput', 'root'],
      ['MuiInputBase', 'input'],
      ['MuiLinearProgress', 'root'],
      ['MuiLinearProgress', 'bar'],
      ['MuiLinearProgress', 'bar2'],
      ['MuiListItemButton', 'root'],
      ['MuiMenuItem', 'root'],
      ['MuiNativeSelect', 'icon'],
      ['MuiOutlinedInput', 'root'],
      ['MuiRadio', 'root'],
      ['MuiSlider', 'track'],
      ['MuiSlider', 'thumb'],
      ['MuiSwitch', 'track'],
      ['MuiSwitch', 'thumb'],
      ['MuiButtonBase', 'root'],
      ['MuiTooltip', 'tooltip'],
      ['MuiToggleButton', 'root'],
    ];

    test.each(cases)('%s %s', (component, slot) => {
      const existingOverride = { color: 'red' };
      const theme = enhanceHighContrast(
        createTheme({
          components: { [component]: { styleOverrides: { [slot]: existingOverride } } } as any,
        }),
      );
      const overrides = (theme.components as any)[component].styleOverrides[
        slot
      ] as Array<StyleOverride>;

      expect(overrides[0]).to.deep.equal(existingOverride);
    });
  });
});
