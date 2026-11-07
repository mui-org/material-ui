import deepmerge from '@mui/utils/deepmerge';
import type { Breakpoint } from '@mui/system';
import type { Theme } from './createTheme';
import type { DensityEnhancedTheme, DensityScaleOverrides, EnhanceableTheme } from './densityScale';
import { applyDensity } from './densityScale';
import switchClasses from '../Switch/switchClasses';
import toggleButtonGroupClasses from '../ToggleButtonGroup/toggleButtonGroupClasses';
import paginationItemClasses from '../PaginationItem/paginationItemClasses';
import breadcrumbsClasses from '../Breadcrumbs/breadcrumbsClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import tabClasses from '../Tab/tabClasses';
import stepLabelClasses from '../StepLabel/stepLabelClasses';
import tablePaginationClasses from '../TablePagination/tablePaginationClasses';
import tableCellClasses from '../TableCell/tableCellClasses';
import accordionSummaryClasses from '../AccordionSummary/accordionSummaryClasses';
import inputLabelClasses from '../InputLabel/inputLabelClasses';
import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import inputBaseClasses from '../InputBase/inputBaseClasses';
import filledInputClasses from '../FilledInput/filledInputClasses';
import inputClasses from '../Input/inputClasses';
import formControlClasses from '../FormControl/formControlClasses';
import formControlLabelClasses from '../FormControlLabel/formControlLabelClasses';
import inputAdornmentClasses from '../InputAdornment/inputAdornmentClasses';
import listItemIconClasses from '../ListItemIcon/listItemIconClasses';
import listItemAvatarClasses from '../ListItemAvatar/listItemAvatarClasses';
import listItemButtonClasses from '../ListItemButton/listItemButtonClasses';
import dialogTitleClasses from '../DialogTitle/dialogTitleClasses';
import cardContentClasses from '../CardContent/cardContentClasses';
import dividerClasses from '../Divider/dividerClasses';
import listItemTextClasses from '../ListItemText/listItemTextClasses';

type ThemeComponents = NonNullable<Theme['components']>;

/** A component the theme knows how to style, e.g. `'MuiButton'`. */
type ThemeComponentName = Exclude<keyof ThemeComponents, 'mergeClassNameAndStyle'>;

type StyleOverridesOf<Name extends ThemeComponentName> =
  NonNullable<ThemeComponents[Name]> extends { styleOverrides?: infer Overrides | undefined }
    ? NonNullable<Overrides>
    : never;

/** The slots (class keys) a component's `styleOverrides` accepts. */
type ThemeComponentSlot<Name extends ThemeComponentName> = Extract<
  keyof StyleOverridesOf<Name>,
  string
>;

/**
 * Attach a `styleOverrides` object to a component slot as the first layer,
 * with any override the incoming theme already had as the last (winning) one:
 * enhancement provides defaults, it does not beat explicit customization.
 * Call it once per slot — a second call would wrap the first, putting the
 * user's layer between the two emissions. **Mutates `components` in place** —
 * pass a `components` object the caller owns.
 */
function addStyleOverride<Name extends ThemeComponentName, Slot extends ThemeComponentSlot<Name>>(
  components: ThemeComponents,
  name: Name,
  slot: Slot,
  overrides: NonNullable<StyleOverridesOf<Name>[Slot]>,
): void {
  const component = components[name] as Record<string, any> | undefined;
  const existing = component?.styleOverrides?.[slot];
  (components as Record<string, any>)[name] = {
    ...component,
    styleOverrides: {
      ...component?.styleOverrides,
      [slot]: existing === undefined ? [overrides] : [overrides, existing],
    },
  };
}

type DefaultPropsOf<Name extends ThemeComponentName> =
  NonNullable<ThemeComponents[Name]> extends { defaultProps?: infer Props | undefined }
    ? NonNullable<Props>
    : never;

/**
 * Attach theme `defaultProps`, the consuming theme's own defaults winning — for
 * values CSS cannot reach (those that feed component JS). **Mutates
 * `components` in place** — same contract as `addStyleOverride`.
 */
function addDefaultProps<Name extends ThemeComponentName>(
  components: ThemeComponents,
  name: Name,
  defaults: DefaultPropsOf<Name>,
): void {
  const component = components[name] as Record<string, any> | undefined;
  // Same merge as `createTheme` itself, so a user `slotProps.<slot>` keeps the
  // density keys it does not name instead of replacing the slot wholesale.
  (components as Record<string, any>)[name] = {
    ...component,
    defaultProps: deepmerge(defaults, component?.defaultProps ?? {}),
  };
}

/**
 * Make every component density-aware on the one shipped scale (`scale`
 * overrides any step). Apply LAST, on the final composed theme — later
 * `createTheme()` wraps rebuild the vars machinery and drop the emitted scale.
 */
export default function enhanceDensity<T extends EnhanceableTheme>(
  theme: T,
  scale?: DensityScaleOverrides,
) {
  const enhanced = applyDensity(theme, scale);
  emitComponentDensity(enhanced);
  return enhanced;
}

/**
 * Every block is a component token -> density-step assignment. Density
 * variation comes purely from the resolved scale values (`applyDensity`),
 * never from remapping.
 */
function emitComponentDensity<T extends EnhanceableTheme>(enhanced: DensityEnhancedTheme<T>): void {
  // Sizing constants on the same terms as the steps: the var ref on a vars
  // theme, the literal px otherwise. Neither is a spacing key.
  const touchTarget = enhanced.vars?.touchTarget ?? enhanced.touchTarget;
  const iconSize = enhanced.vars?.iconSize ?? enhanced.iconSize;
  // Keyed spacing: a scale key resolves to its step (var ref under cssVariables,
  // raw px otherwise); numbers stay plain spacing units.
  const { spacing } = enhanced;
  // Sized components step off the interactive box rather than the ladder, so a
  // `touchTarget` override carries all three sizes instead of only the middle
  // one. Both land on today's px at the default 32.
  const tableRowHeight = `calc(${touchTarget} + 2*${spacing('xxSmall')})`; // 40px
  const tableRowHeightDense = `calc(${touchTarget} + ${spacing('xxSmall')})`; // 36px
  const tinyBox = `calc(${touchTarget} - ${spacing('small')})`; // 20px
  const miniBox = `calc(${touchTarget} - ${spacing('xSmall')})`; // 24px
  const smallBox = `calc(${touchTarget} - ${spacing('xxSmall')})`; // 28px
  const largeBox = `calc(${touchTarget} + ${spacing('small')})`; // 44px
  const hugeBox = `calc(${touchTarget} + ${spacing('medium')})`; // 48px
  // Icons ride the glyph constant the same way boxes ride the interactive one.
  const iconSmall = `calc(${iconSize} - ${spacing('xxSmall')})`;
  const iconLarge = `calc(${iconSize} + 8px)`;
  const inputMediumPadBlock = `calc((${touchTarget} - 1lh) / 2)`;
  const wcagTargetSize = '24px';
  const inputSmallPadBlock = `calc((${touchTarget} - ${spacing('xxSmall')} - 1lh) / 2)`;
  const filledInputMediumPadTop = `calc(${spacing('medium')} + (${touchTarget} - 1lh) / 2)`;
  const filledInputSmallPadTop = `calc(${spacing('medium')} + (${touchTarget} - 1lh) / 4)`;
  // The rtl stylis plugin only mirrors numeric translate() literals, so the
  // var-based inline offsets carry their own sign.
  const dirSign = enhanced.direction === 'rtl' ? -1 : 1;
  const { pxToRem, body2 } = enhanced.typography;
  const sharedCheckboxRadio = {
    padding: 0,
    width: touchTarget,
    height: touchTarget,
    '& svg': { fontSize: iconSize },
    // Pull-in follows the label placement — the control sits at the row's
    // start for `end`, at its end for `start`; top/bottom center it, so no
    // pull applies there. Written as a variable the label root reads, so the
    // :has() specificity never competes with a user's margin on the label.
    [`.${formControlLabelClasses.labelPlacementEnd}:has(&)`]: {
      '--_labelMarginLeft': `calc((${touchTarget} - ${iconSize}) / -2)`,
    },
    [`.${formControlLabelClasses.labelPlacementStart}:has(&)`]: {
      '--_labelMarginRight': `calc((${touchTarget} - ${iconSize}) / -2)`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          width: `max(${wcagTargetSize}, ${smallBox})`,
          height: `max(${wcagTargetSize}, ${smallBox})`,
          '& svg': { fontSize: iconSmall },
          [`.${formControlLabelClasses.labelPlacementEnd}:has(&)`]: {
            '--_labelMarginLeft': `calc((max(${wcagTargetSize}, ${smallBox}) - ${iconSmall}) / -2)`,
          },
          [`.${formControlLabelClasses.labelPlacementStart}:has(&)`]: {
            '--_labelMarginRight': `calc((max(${wcagTargetSize}, ${smallBox}) - ${iconSmall}) / -2)`,
          },
        },
      },
      { props: { edge: 'start' }, style: { marginLeft: `calc(${touchTarget} / -4)` } },
      {
        props: { edge: 'start', size: 'small' },
        style: { marginLeft: `calc(max(${wcagTargetSize}, ${smallBox}) / -8)` },
      },
      { props: { edge: 'end' }, style: { marginRight: `calc(${touchTarget} / -4)` } },
      {
        props: { edge: 'end', size: 'small' },
        style: { marginRight: `calc(max(${wcagTargetSize}, ${smallBox}) / -8)` },
      },
    ],
  };
  addStyleOverride(enhanced.components, 'MuiChip', 'deleteIcon', {
    margin: 0,
    width: 'var(--_childSize)',
    height: 'var(--_childSize)',
    marginRight: 'var(--_offset)',
    fontSize: 22,
    variants: [{ props: { size: 'small' }, style: { fontSize: 16 } }],
  });
  addStyleOverride(enhanced.components, 'MuiAccordionSummary', 'root', {
    minHeight: touchTarget,
    padding: `0 ${spacing('xSmall')}`,
    variants: [
      {
        props: ({ ownerState }) => !ownerState.disableGutters,
        // scoped to expanded: wins master's 64px literal on specificity
        style: {
          [`&.${accordionSummaryClasses.expanded}`]: { minHeight: touchTarget },
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiAccordionSummary', 'content', {
    marginBlock: spacing('xxSmall'),
    alignItems: 'center',
    gap: spacing('xSmall'),
    variants: [
      {
        props: { disableGutters: false },
        style: { [`&.${accordionSummaryClasses.expanded}`]: { marginBlock: spacing('xxSmall') } },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiAccordionDetails', 'root', {
    padding: `${spacing('xxSmall')} ${spacing('small')} ${spacing('small')}`,
  });
  addStyleOverride(enhanced.components, 'MuiButton', 'root', {
    ...enhanced.typography?.button,
    paddingBlock: 0,
    gap: spacing('xSmall'),
    paddingInline: 'var(--_padInline)',
    '--_padInline': spacing('medium'),
    variants: [
      {
        props: { size: 'small' },
        style: {
          minHeight: smallBox,
          '--_padInline': spacing('small'),
          marginBlock: `max(0px, (${wcagTargetSize} - ${smallBox}) / 2)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            insetInline: 0,
            height: `max(100%, ${wcagTargetSize})`,
            transform: 'translateY(-50%)',
          },
        },
      },
      {
        props: { size: 'medium' },
        style: { minHeight: touchTarget },
      },
      {
        props: { size: 'large' },
        style: { minHeight: largeBox, '--_padInline': spacing('large') },
      },
    ],
  });
  // In fullWidth the spinner stays in the flow, so the icon gives back the
  // spinner (fixed at 16px by Button) plus one gap.
  addStyleOverride(enhanced.components, 'MuiButton', 'startIcon', {
    margin: 0,
    '& > *:nth-of-type(1)': { fontSize: '0.8lh' },
    variants: [
      {
        props: { loading: true, loadingPosition: 'start', fullWidth: true },
        style: { marginRight: `calc(-16px - ${spacing('xSmall')})` },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiButton', 'endIcon', {
    margin: 0,
    '& > *:nth-of-type(1)': { fontSize: '0.8lh' },
    variants: [
      {
        props: { loading: true, loadingPosition: 'end', fullWidth: true },
        style: { marginLeft: `calc(-16px - ${spacing('xSmall')})` },
      },
    ],
  });
  // The icon is 0.8lh wide, so its center is 0.4lh from its edge. Button fixes
  // its spinner at 16px, so the spinner's center is 8px from its own edge.
  addStyleOverride(enhanced.components, 'MuiButton', 'loadingIndicator', {
    variants: [
      {
        props: { loadingPosition: 'start' },
        style: { left: 'calc(var(--_padInline) + 0.4lh - 8px)' },
      },
      {
        props: { loadingPosition: 'end' },
        style: { right: 'calc(var(--_padInline) + 0.4lh - 8px)' },
      },
      {
        props: { loadingPosition: 'start', fullWidth: true },
        style: { left: 'calc(8px - 0.4lh)' },
      },
      {
        props: { loadingPosition: 'end', fullWidth: true },
        style: { right: 'calc(8px - 0.4lh)' },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiIconButton', 'root', {
    padding: 0,
    fontSize: iconSize,
    variants: [
      {
        props: { size: 'small' },
        style: {
          minWidth: smallBox,
          minHeight: smallBox,
          margin: `max(0px, (${wcagTargetSize} - ${smallBox}) / 2)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `max(100%, ${wcagTargetSize})`,
            height: `max(100%, ${wcagTargetSize})`,
            transform: 'translate(-50%, -50%)',
          },
        },
      },
      {
        props: { size: 'medium' },
        style: { minWidth: touchTarget, minHeight: touchTarget },
      },
      {
        props: { size: 'large' },
        style: { minWidth: largeBox, minHeight: largeBox },
      },
      { props: { edge: 'start' }, style: { marginLeft: `calc(${touchTarget} / -4)` } },
      { props: { edge: 'end' }, style: { marginRight: `calc(${touchTarget} / -4)` } },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiButtonGroup', 'root', {
    variants: [
      {
        props: { size: 'small', orientation: 'horizontal' },
        style: { marginBlock: `max(0px, (${wcagTargetSize} - ${smallBox}) / 2)` },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiButtonGroup', 'grouped', {
    minWidth: touchTarget,
    variants: [
      { props: { size: 'small' }, style: { marginBlock: 0 } },
      {
        props: { size: 'small', orientation: 'vertical' },
        style: {
          minHeight: `max(${wcagTargetSize}, ${smallBox})`,
          '&::before': { content: 'none' },
        },
      },
    ],
  });

  addStyleOverride(enhanced.components, 'MuiSvgIcon', 'root', {
    variants: [
      { props: { fontSize: 'small' }, style: { fontSize: iconSmall } },
      { props: { fontSize: 'medium' }, style: { fontSize: iconSize } },
      { props: { fontSize: 'large' }, style: { fontSize: iconLarge } },
    ],
  });
  // Mirrors MenuItem's own sm-up reset, which hardcodes the same key. Cast so
  // the file still compiles against an augmented BreakpointOverrides.
  const smUp = enhanced.breakpoints.up('sm' as Breakpoint);
  const menuItemHeight = `max(28px, ${touchTarget})`;
  addStyleOverride(enhanced.components, 'MuiMenuItem', 'root', {
    paddingBlock: spacing('xxSmall'),
    variants: [
      {
        props: { dense: false },
        style: {
          minHeight: menuItemHeight,
          gap: spacing('xSmall'),
          [smUp]: { minHeight: menuItemHeight },
        },
      },
      { props: { disableGutters: false }, style: { paddingInline: spacing('xSmall') } },
      {
        props: { dense: true },
        style: {
          gap: spacing('xSmall'),
          minHeight: `max(24px, ${smallBox})`,
          [`& .${listItemIconClasses.root}`]: { minWidth: '0.8lh' },
          [`& .${listItemIconClasses.root} svg`]: { fontSize: '0.8lh' },
          [`& .${listItemTextClasses.inset}`]: {
            paddingLeft: `calc(0.8lh + ${spacing('xSmall')})`,
          },
          [`& + .${dividerClasses.inset}`]: {
            fontFamily: body2?.fontFamily,
            fontSize: body2?.fontSize,
            lineHeight: body2?.lineHeight,
            marginLeft: `calc(0.8lh + 2*${spacing('xSmall')})`,
          },
        },
      },
    ],
    [`& + .${dividerClasses.inset}`]: {
      marginLeft: `calc(${iconSize} + 2*${spacing('xSmall')})`,
    },
    [`& .${listItemTextClasses.inset}`]: {
      paddingLeft: `calc(${iconSize} + ${spacing('xSmall')})`,
    },
    [`& .${listItemIconClasses.root}`]: { minWidth: iconSize },
  });

  addStyleOverride(enhanced.components, 'MuiTooltip', 'tooltip', {
    ...enhanced.typography?.caption,
    lineHeight: 16 / 12,
    padding: `${spacing('xSmall')} ${spacing('small')}`,
    // Touch keeps its own 24px clearance; an unconditional value would land
    // after the component's touch variant and override it.
    variants: [
      { props: ({ ownerState }) => !ownerState.touch, style: { '--_spacing': '4px' } },
      {
        props: ({ ownerState }) => !!ownerState.arrow && !ownerState.touch,
        style: { '--_spacing': 'calc(4px + 10px / 2)' },
      },
    ],
  });
  // Fixed arrow size due to fixed spacing between tooltip and target
  addStyleOverride(enhanced.components, 'MuiTooltip', 'arrow', { '--_arrowSize': '10px' });
  addStyleOverride(enhanced.components, 'MuiInputBase', 'root', {
    lineHeight: enhanced.typography?.body1?.lineHeight,
    // The medium gap sits on the root: outside a FormControl the ownerState
    // has no `size`, so a `size: 'medium'` variant never matches and a
    // standalone input's adornment would touch the text.
    gap: spacing('xSmall'),
    variants: [
      { props: { size: 'small' }, style: { gap: spacing('xxSmall') } },
      {
        props: { multiline: true },
        style: {
          paddingBlock: spacing('xxSmall'),
          [`:has(.${inputAdornmentClasses.positionStart})`]: { alignItems: 'flex-start' },
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiInputBase', 'input', {
    paddingBlock: inputMediumPadBlock,
    variants: [
      { props: { multiline: false }, style: { height: '1lh' } },
      { props: { size: 'small' }, style: { paddingBlock: inputSmallPadBlock } },
      {
        props: { multiline: true },
        style: { paddingBlock: 0 },
      },
    ],
  });
  // --_outlinedInputPadBlock broadcasts to the FormControl via :has(); the
  // label consumes it as --_restY. Re-assert chain mirrors master.
  addStyleOverride(enhanced.components, 'MuiOutlinedInput', 'root', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_outlinedInputPadBlock': inputMediumPadBlock,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': 'var(--_outlinedInputPadBlock)',
      '--_inlinePad': `${dirSign * 14}px`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_outlinedInputPadBlock': inputSmallPadBlock,
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${inputMediumPadBlock})`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_outlinedInputPadBlock, ${inputSmallPadBlock})`,
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiOutlinedInput', 'input', {
    paddingBlock: `var(--_outlinedInputPadBlock, ${inputMediumPadBlock})`,
    variants: [
      {
        props: { size: 'small' },
        style: { paddingBlock: `var(--_outlinedInputPadBlock, ${inputSmallPadBlock})` },
      },
      {
        props: { multiline: true },
        style: { paddingBlock: 0 },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiFilledInput', 'input', {
    paddingTop: `var(--_filledInputPadTop, ${filledInputMediumPadTop})`,
    paddingBottom: `var(--_filledInputPadBottom, ${inputMediumPadBlock})`,
    paddingInline: spacing('small'),
    variants: [
      {
        props: { size: 'small' },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${filledInputSmallPadTop})`,
          paddingBottom: `var(--_filledInputPadBottom, ${inputSmallPadBlock})`,
        },
      },
      {
        props: { hiddenLabel: true },
        style: { paddingBlock: inputMediumPadBlock },
      },
      {
        props: { hiddenLabel: true, size: 'small' },
        style: { paddingBlock: inputSmallPadBlock },
      },
      {
        props: { multiline: true },
        style: { paddingBlock: 0, paddingInline: 0 },
      },
      {
        props: ({ ownerState }) => !!ownerState.startAdornment,
        style: { paddingLeft: 0 },
      },
      {
        props: ({ ownerState }) => !!ownerState.endAdornment,
        style: { paddingRight: 0 },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiFilledInput', 'root', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_filledInputPadTop': filledInputMediumPadTop,
      '--_filledInputPadBottom': inputMediumPadBlock,
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
      '--_shrinkY': '6px',
      '--_inlinePad': dirSign === 1 ? spacing('small') : `calc(-1 * ${spacing('small')})`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_filledInputPadTop': filledInputSmallPadTop,
            '--_filledInputPadBottom': inputSmallPadBlock,
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc((var(--_filledInputPadTop) + var(--_filledInputPadBottom)) / 2)`,
            '--_shrinkY': '4px',
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${filledInputMediumPadTop})`,
          paddingBottom: `var(--_filledInputPadBottom, ${inputMediumPadBlock})`,
          paddingInline: spacing('small'),
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingTop: `var(--_filledInputPadTop, ${filledInputSmallPadTop})`,
          paddingBottom: `var(--_filledInputPadBottom, ${inputSmallPadBlock})`,
        },
      },
      {
        props: { multiline: true, hiddenLabel: true },
        style: { paddingBlock: inputMediumPadBlock },
      },
      {
        props: { multiline: true, hiddenLabel: true, size: 'small' },
        style: { paddingBlock: inputSmallPadBlock },
      },
      {
        props: ({ ownerState }) => !!ownerState.startAdornment,
        style: { paddingLeft: spacing('small') },
      },
      {
        props: ({ ownerState }) => !!ownerState.endAdornment,
        style: { '--_trailingPad': spacing('small') },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiInput', 'root', {
    [`.${formControlClasses.root}:has(> &)`]: {
      '--_inputPadBlock': inputMediumPadBlock,
      '--_inputMarginTop': spacing('small'),
    },
    [`.${inputLabelClasses.root}:has(~ &)`]: {
      '--_restY': `calc(var(--_inputMarginTop, ${spacing('small')}) + var(--_inputPadBlock, ${inputMediumPadBlock}))`,
    },
    [`label + &, .${inputLabelClasses.root} + &`]: {
      marginTop: `var(--_inputMarginTop, ${spacing('small')})`,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          [`.${formControlClasses.root}:has(> &)`]: {
            '--_inputPadBlock': inputSmallPadBlock,
          },
          [`.${inputLabelClasses.root}:has(~ &)`]: {
            '--_restY': `calc(var(--_inputMarginTop, ${spacing('small')}) + var(--_inputPadBlock, ${inputSmallPadBlock}))`,
          },
        },
      },
      {
        props: { multiline: true },
        style: {
          paddingBlock: `var(--_inputPadBlock, ${inputMediumPadBlock})`,
        },
      },
      {
        props: { multiline: true, size: 'small' },
        style: {
          paddingBlock: `var(--_inputPadBlock, ${inputSmallPadBlock})`,
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiInput', 'input', {
    paddingBlock: `var(--_inputPadBlock, ${inputMediumPadBlock})`,
    variants: [
      {
        props: { size: 'small' },
        style: {
          paddingBlock: `var(--_inputPadBlock, ${inputSmallPadBlock})`,
        },
      },
      {
        props: { multiline: true },
        style: { paddingBlock: 0 },
      },
    ],
  });
  // Each shrink state must re-assert or the rest rules here, landing after
  // master's shrink, would leak the rest transform.
  addStyleOverride(enhanced.components, 'MuiInputLabel', 'root', {
    variants: [
      { props: { variant: 'standard' }, style: { '--_restY': '20px' } },
      { props: { variant: 'standard', size: 'small' }, style: { '--_restY': '17px' } },
      {
        props: ({ ownerState }) => !!ownerState.formControl,
        style: { transform: 'translate(0, var(--_restY)) scale(1)' },
      },
      {
        props: { shrink: true },
        style: { transform: 'translate(0, -1.5px) scale(0.75)' },
      },
      {
        props: { variant: 'filled' },
        style: {
          '--_inlinePad': `${dirSign * 12}px`,
          '--_restY': '16px',
          '--_shrinkY': '7px',
          transform: 'translate(var(--_inlinePad), var(--_restY)) scale(1)',
        },
      },
      {
        props: { variant: 'filled', size: 'small' },
        style: { '--_restY': '13px', '--_shrinkY': '4px' },
      },
      {
        props: { variant: 'filled', shrink: true },
        style: {
          transform: 'translate(var(--_inlinePad), var(--_shrinkY)) scale(0.75)',
        },
      },
      {
        props: { variant: 'outlined' },
        style: {
          '--_inlinePad': `${dirSign * 14}px`,
          '--_restY': '16px',
          transform: 'translate(var(--_inlinePad), var(--_restY)) scale(1)',
        },
      },
      { props: { variant: 'outlined', size: 'small' }, style: { '--_restY': '9px' } },
      {
        props: { variant: 'outlined', shrink: true },
        style: {
          // 0.475 = sweet spot to make label align nicely without overlapping the chips in Autocomplete
          // 0.375 = 50% * 0.75 scale factor
          transform: `translate(14px, clamp(-0.475lh, (${touchTarget} - 32.5px) * 999, -0.375lh)) scale(0.75)`,
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiFormGroup', 'root', {
    columnGap: spacing('medium'),
  });
  addStyleOverride(enhanced.components, 'MuiFormLabel', 'root', {
    lineHeight: enhanced.typography?.body1?.lineHeight,
  });
  addStyleOverride(enhanced.components, 'MuiFormHelperText', 'root', {
    marginTop: spacing('xSmall'),
    variants: [
      {
        props: { contained: true },
        style: { marginInline: spacing('xSmall') },
      },
      {
        props: { size: 'small' },
        style: { marginTop: spacing('xxSmall') },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiInputAdornment', 'root', {
    variants: [
      { props: { position: 'start' }, style: { margin: 0 } },
      { props: { position: 'end' }, style: { margin: 0 } },
      {
        props: { variant: 'filled' },
        style: {
          [`&.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop:
                'calc(var(--_filledInputPadTop, 18px) - var(--_filledInputPadBottom, 2px))',
            },
          [`.${inputBaseClasses.multiline} &.${inputAdornmentClasses.positionStart}&:not(.${inputAdornmentClasses.hiddenLabel})`]:
            {
              marginTop: 0,
            },
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiFormControlLabel', 'root', {
    marginLeft: 'var(--_labelMarginLeft, 0px)',
    marginRight: 'var(--_labelMarginRight, 0px)',
  });
  addStyleOverride(enhanced.components, 'MuiCheckbox', 'root', sharedCheckboxRadio);
  addStyleOverride(enhanced.components, 'MuiRadio', 'root', sharedCheckboxRadio);
  // The floor sits on the `ol` (the centering flex row), not the nav root.
  addStyleOverride(enhanced.components, 'MuiBreadcrumbs', 'ol', {
    gap: spacing('xSmall'),
    '*:where(&) :where(a)': {
      display: 'inline-flex',
      paddingInline: spacing('xSmall'),
    },
    [`& li:not(.${breadcrumbsClasses.li})>.${buttonBaseClasses.root}`]: {
      // BreadcrumbCollapsed
      paddingInline: spacing('xSmall'),
      height: touchTarget,
      margin: 0,
      '& svg': { width: '1em', height: '1em' },
    },
  });
  addStyleOverride(enhanced.components, 'MuiBreadcrumbs', 'li', {
    '&:has(a)': { lineHeight: touchTarget },
    '&:not(:has(a))': {
      paddingInline: spacing('xSmall'),
    },
  });
  addStyleOverride(enhanced.components, 'MuiBreadcrumbs', 'separator', { marginInline: 0 }); // use gap on `ol` instead
  addStyleOverride(enhanced.components, 'MuiToggleButton', 'root', {
    ...enhanced.typography?.button,
    '--_size': touchTarget,
    paddingBlock: 0,
    minHeight: 'var(--_size)',
    minWidth: 'var(--_size)',
    paddingInline: `calc((var(--_size) - ${iconSize} - 2px) / 2)`, // 2px is the border
    variants: [
      {
        props: { size: 'small' },
        style: {
          '--_size': smallBox,
          [`&:not(.${toggleButtonGroupClasses.grouped})`]: {
            margin: `max(0px, (${wcagTargetSize} - ${smallBox}) / 2)`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `max(100%, ${wcagTargetSize})`,
              height: `max(100%, ${wcagTargetSize})`,
              transform: 'translate(-50%, -50%)',
            },
          },
          [`&.${toggleButtonGroupClasses.grouped}`]: {
            '--_size': `max(${wcagTargetSize}, ${smallBox})`,
          },
        },
      },
      {
        props: { size: 'large' },
        style: { '--_size': largeBox },
      },
    ],
  });
  const switchThumbPadding =
    'calc((var(--_touchSize) - var(--_thumbHeight)) / 2) calc((var(--_touchSize) - var(--_thumbWidth)) / 2)';
  const switchCheckedTransform = `translateX(calc(${dirSign} * (var(--_trackWidth) - var(--_trackHeight) - (var(--_thumbWidth) - var(--_thumbHeight)))))`;
  addStyleOverride(enhanced.components, 'MuiSwitch', 'root', {
    '--_touchSize': touchTarget,
    '--_thumbWidth': spacing('medium'),
    '--_thumbHeight': spacing('medium'),
    '--_trackWidth': 'calc(var(--_thumbHeight) * 1.7)',
    '--_trackHeight': 'calc(var(--_thumbHeight) * 0.7)',
    // this variable is not meant to be overridden directly
    '--_offset': 'calc((max(var(--_thumbWidth), var(--_trackHeight)) - var(--_touchSize)) / 2)',
    width: 'calc(var(--_trackWidth) + var(--_touchSize) - var(--_trackHeight))',
    height: 'var(--_touchSize)',
    padding: 'calc((var(--_touchSize) - var(--_trackHeight)) / 2)',
    // The label pull-in is written as a variable and read here, so the
    // descendant rule never competes with a user margin on the Switch.
    marginLeft: 'var(--_switchMarginLeft, 0px)',
    marginRight: 'var(--_switchMarginRight, 0px)',
    [`.${formControlLabelClasses.labelPlacementEnd} &`]: {
      '--_switchMarginLeft': 'var(--_offset)',
    },
    [`.${formControlLabelClasses.labelPlacementStart} &`]: {
      '--_switchMarginRight': 'var(--_offset)',
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          '--_touchSize': `max(${wcagTargetSize}, ${smallBox})`,
          '--_thumbWidth': `calc(${spacing('medium')} - 4px)`,
          '--_thumbHeight': `calc(${spacing('medium')} - 4px)`,
          // Master's small rules sit nested under the root variant at higher
          // specificity — re-assert the derivations there or they lose for small.
          [`& .${switchClasses.thumb}`]: {
            width: 'var(--_thumbWidth)',
            height: 'var(--_thumbHeight)',
          },
          [`& .${switchClasses.switchBase}`]: {
            padding: switchThumbPadding,
            [`&.${switchClasses.checked}`]: { transform: switchCheckedTransform },
          },
        },
      },
      { props: { edge: 'start' }, style: { marginLeft: 'var(--_offset)' } },
      { props: { edge: 'end' }, style: { marginRight: 'var(--_offset)' } },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiSwitch', 'switchBase', {
    padding: switchThumbPadding,
    [`&.${switchClasses.checked}`]: { transform: switchCheckedTransform },
  });
  addStyleOverride(enhanced.components, 'MuiSwitch', 'thumb', {
    width: 'var(--_thumbWidth)',
    height: 'var(--_thumbHeight)',
    borderRadius: 'var(--_touchSize)',
  });
  addStyleOverride(enhanced.components, 'MuiSwitch', 'track', {
    borderRadius: 'var(--_trackHeight)',
  });
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'root', {
    [`& .${outlinedInputClasses.root} .${autocompleteClasses.input}`]: { paddingLeft: '6px' },
    [`& .${autocompleteClasses.inputRoot} .${autocompleteClasses.input}.${inputBaseClasses.input}`]:
      {
        paddingBlock: 0,
        height: 'var(--_tagHeight)',
      },
    [`& .${filledInputClasses.root}.${inputBaseClasses.hiddenLabel}.${inputBaseClasses.sizeSmall} .${autocompleteClasses.input}`]:
      { paddingBlock: 0 },
    [`&.${autocompleteClasses.hasPopupIcon} .${autocompleteClasses.inputRoot}, &.${autocompleteClasses.hasClearIcon} .${autocompleteClasses.inputRoot}`]:
      { paddingRight: `calc(${smallBox} + 2px + var(--_endOffset, 0px))` },
    [`&.${autocompleteClasses.hasPopupIcon}.${autocompleteClasses.hasClearIcon} .${autocompleteClasses.inputRoot}`]:
      { paddingRight: `calc(2 * ${smallBox} + var(--_endOffset, 0px))` },
    [`& .${outlinedInputClasses.root}, & .${filledInputClasses.root}`]: { '--_endOffset': '9px' },
  });
  const rowPad = (pad: string) => `calc(${pad} + (1lh - var(--_tagHeight)) / 2)`;
  const filledLabelled = `:where(.${filledInputClasses.root}:not(.${inputBaseClasses.hiddenLabel}))`;
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'inputRoot', {
    gap: '2px',
    '--_tagHeight': miniBox,
    paddingTop: rowPad('var(--_fieldPadTop)'),
    paddingBottom: rowPad('var(--_fieldPadBottom)'),
    paddingLeft: 'var(--_fieldPadLeft)',
    [`&:where(.${outlinedInputClasses.root})`]: {
      '--_fieldPadTop': 'var(--_outlinedInputPadBlock)',
      '--_fieldPadBottom': 'var(--_outlinedInputPadBlock)',
      '--_fieldPadLeft': '8px',
    },
    [`&${filledLabelled}`]: {
      '--_fieldPadTop': 'var(--_filledInputPadTop)',
      '--_fieldPadBottom': 'var(--_filledInputPadBottom)',
    },
    [`&:where(.${filledInputClasses.root})`]: {
      '--_fieldPadLeft': `calc(${spacing('small')} - 4px)`,
    },
    [`&:where(.${filledInputClasses.root}.${inputBaseClasses.hiddenLabel})`]: {
      '--_fieldPadTop': inputMediumPadBlock,
      '--_fieldPadBottom': inputMediumPadBlock,
    },
    [`&:where(.${inputClasses.root})`]: {
      '--_fieldPadTop': 'var(--_inputPadBlock)',
      '--_fieldPadBottom': 'var(--_inputPadBlock)',
      '--_fieldPadLeft': '0px',
    },
    [`&.${inputBaseClasses.sizeSmall}`]: {
      '--_tagHeight': tinyBox,
      [`&:where(.${filledInputClasses.root}.${inputBaseClasses.hiddenLabel})`]: {
        '--_fieldPadTop': inputSmallPadBlock,
        '--_fieldPadBottom': inputSmallPadBlock,
      },
      ...(!enhanced.modularCssLayers && {
        [`&:where(.${outlinedInputClasses.root})`]: {
          paddingTop: rowPad('var(--_fieldPadTop)'),
          paddingBottom: rowPad('var(--_fieldPadBottom)'),
        },
        [`&${filledLabelled}`]: { paddingBottom: rowPad('var(--_fieldPadBottom)') },
      }),
    },
    ...(!enhanced.modularCssLayers && {
      [`&.${inputBaseClasses.hiddenLabel}:where(.${filledInputClasses.root})`]: {
        paddingTop: rowPad('var(--_fieldPadTop)'),
        paddingBottom: rowPad('var(--_fieldPadBottom)'),
      },
    }),
  });
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'clearIndicator', {
    minWidth: smallBox,
    minHeight: smallBox,
  });
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'popupIndicator', {
    minWidth: smallBox,
    minHeight: smallBox,
  });
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'listbox', {
    // The option list renders in a Popper — emit on the listbox slot.
    '--_subheaderInline': spacing('xSmall'),
    [`& .${autocompleteClasses.option}`]: {
      minHeight: touchTarget,
      paddingBlock: spacing('xxSmall'),
      paddingInline: spacing('xSmall'),
    },
  });
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'groupUl', {
    [`& .${autocompleteClasses.option}`]: { paddingLeft: spacing('small') },
  });
  addStyleOverride(enhanced.components, 'MuiAutocomplete', 'tag', {
    margin: 0,
    '--_height': miniBox,
    [`&.${autocompleteClasses.tagSizeSmall}`]: {
      '--_height': tinyBox,
    },
  });
  // hasConnector:false = the first step; end nodes sit flush with the edge.
  addStyleOverride(enhanced.components, 'MuiStep', 'root', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: false, hasConnector: false },
        style: { paddingLeft: '0px' },
      },
      {
        props: { orientation: 'horizontal', alternativeLabel: false, last: true },
        style: { paddingRight: '0px' },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiStepLabel', 'root', {
    variants: [{ props: { orientation: 'vertical' }, style: { paddingBlock: '0px' } }],
  });
  // Master sets the alternativeLabel gap at 2-class specificity — the nested
  // selector must be re-emitted to win. Horizontal-only: master already zeroes
  // vertical, an unscoped emission would stomp that reset.
  addStyleOverride(enhanced.components, 'MuiStepLabel', 'label', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: true },
        style: { [`&.${stepLabelClasses.alternativeLabel}`]: { marginTop: '0px' } },
      },
    ],
  });
  // Icon→label spacing falls out of centering the circle in the touch box.
  addStyleOverride(enhanced.components, 'MuiStepLabel', 'iconContainer', {
    padding: '0px',
    justifyContent: 'center',
    minWidth: touchTarget,
    minHeight: touchTarget,
    alignItems: 'center',
  });
  // Circle must land on MuiStepIcon root: an SvgIcon sizes off its OWN
  // fontSize (w/h = 1em) — a parent iconContainer fontSize can't reach it.
  addStyleOverride(enhanced.components, 'MuiStepIcon', 'root', {
    fontSize: `calc(${touchTarget} - ${spacing('small')} + 2px)`,
  });
  addStyleOverride(enhanced.components, 'MuiStepIcon', 'text', { fontSize: 14 });
  // Vertical-alt keeps master's marginLeft:auto — only marginRight moves.
  addStyleOverride(enhanced.components, 'MuiStepConnector', 'root', {
    variants: [
      {
        props: { orientation: 'horizontal', alternativeLabel: true },
        style: { top: `calc(${touchTarget} / 2)` },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: false },
        style: { marginLeft: `calc(${touchTarget} / 2)` },
      },
      {
        props: { orientation: 'vertical', alternativeLabel: true },
        style: { marginRight: `calc(${touchTarget} / 2)` },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiStepConnector', 'line', {
    variants: [{ props: { orientation: 'vertical' }, style: { minHeight: spacing('medium') } }],
  });
  // margin = half box lands the border on the icon center; margin + padding
  // = the full box aligns content text with the label.
  addStyleOverride(enhanced.components, 'MuiStepContent', 'root', {
    variants: [
      {
        props: { alternativeLabel: false },
        style: {
          marginLeft: `calc(${touchTarget} / 2)`,
          paddingLeft: `calc(${touchTarget} / 2 - 1px)`, // 1px account for the border
        },
      },
      {
        props: { alternativeLabel: true },
        style: {
          marginRight: `calc(${touchTarget} / 2)`,
          paddingRight: `calc(${touchTarget} / 2 - 1px)`, // 1px account for the border
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiSnackbarContent', 'root', {
    padding: `8px ${spacing('medium')}`,
    gap: spacing('small'),
  });
  addStyleOverride(enhanced.components, 'MuiSnackbarContent', 'message', {
    paddingBlock: spacing('xSmall'),
  });
  addStyleOverride(enhanced.components, 'MuiSnackbarContent', 'action', {
    paddingLeft: 0,
    marginRight: spacing('-xSmall'),
  });
  addStyleOverride(enhanced.components, 'MuiDialogTitle', 'root', {
    padding: `${spacing('small')} ${spacing('small')} ${spacing('small')} ${spacing('medium')}`,
  });
  // Two variants = one knob per dividers state (true overrides master's 16 24).
  addStyleOverride(enhanced.components, 'MuiDialogContent', 'root', {
    variants: [
      {
        props: { dividers: false },
        style: {
          padding: spacing('medium'),
          [`.${dialogTitleClasses.root} + &`]: { paddingTop: 0 },
        },
      },
      { props: { dividers: true }, style: { padding: spacing('medium') } },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiDialogActions', 'root', {
    padding: spacing('medium'),
    variants: [
      {
        props: { disableSpacing: false },
        style: { gap: spacing('small'), '& > :not(style) ~ :not(style)': { marginLeft: 0 } },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiDialog', 'paper', {
    '--_dialogMargin': spacing('large'),
  });
  addStyleOverride(enhanced.components, 'MuiList', 'root', {
    '&:where([role="menu"], [role="listbox"])': { '--_subheaderInline': spacing('xSmall') },
    variants: [
      // A subheader keeps master's `paddingTop: 0` — density only pads below.
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !ownerState.subheader,
        style: { paddingBlock: 8 },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.subheader,
        style: { paddingBottom: 8 },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiListSubheader', 'root', {
    fontSize: enhanced.typography?.body2?.fontSize,
    lineHeight: touchTarget,
  });
  addStyleOverride(enhanced.components, 'MuiListSubheader', 'gutters', {
    paddingInline: `var(--_subheaderInline, ${spacing('small')})`,
  });
  addStyleOverride(enhanced.components, 'MuiListSubheader', 'inset', {
    paddingLeft: `calc(${spacing('small')} + ${iconSize} + ${spacing('xSmall')})`,
  });
  // No sm-up re-assert: ListItemButton has no master minHeight media reset.
  addStyleOverride(enhanced.components, 'MuiListItemButton', 'root', {
    gap: spacing('xSmall'),
    paddingBlock: spacing('xxSmall'),
    variants: [
      {
        props: { dense: false },
        style: { minHeight: touchTarget },
      },
      { props: { dense: true }, style: { minHeight: `max(${wcagTargetSize}, ${smallBox})` } },
      {
        props: { dense: false, disableGutters: false },
        style: { paddingInline: spacing('small') },
      },
      {
        props: { dense: true, disableGutters: false },
        style: { paddingInline: spacing('xSmall') },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiListItemIcon', 'root', { minWidth: iconSize });
  addStyleOverride(enhanced.components, 'MuiListItemAvatar', 'root', {
    minWidth: 0,
    variants: [{ props: { alignItems: 'flex-start' }, style: { marginTop: spacing('xSmall') } }],
  });
  addStyleOverride(enhanced.components, 'MuiListItemText', 'root', {
    margin: 0,
    variants: [
      {
        props: { inset: true },
        style: { paddingLeft: `calc(${iconSize} + ${spacing('xSmall')})` },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiDivider', 'root', {
    variants: [
      {
        props: { variant: 'inset' },
        style: {
          marginLeft: `var(--_insetStart, calc(${spacing('small')} + ${touchTarget} + ${spacing('xSmall')}))`,
          [`*:not(:has(.${listItemAvatarClasses.root})) + &`]: {
            '--_insetStart': `calc(${spacing('small')} + ${iconSize} + ${spacing('xSmall')})`,
          },
        },
      },
    ],
  });
  // disablePadding:false scoping keeps rows owned by a ListItemButton unpadded.
  addStyleOverride(enhanced.components, 'MuiListItem', 'root', {
    gap: spacing('xSmall'),
    variants: [
      {
        props: { disablePadding: false },
        style: { paddingBlock: spacing('xSmall') },
      },
      {
        props: { dense: false, disableGutters: false, disablePadding: false },
        style: { paddingInline: spacing('small') },
      },
      {
        props: { dense: true, disableGutters: false, disablePadding: false },
        style: { paddingInline: spacing('xSmall') },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
        style: {
          paddingRight: `calc(${touchTarget} + ${spacing('xSmall')})`,
        },
      },
      {
        props: ({ ownerState }) => !!ownerState.secondaryAction,
        style: {
          [`& > .${listItemButtonClasses.root}`]: {
            paddingRight: `calc(${touchTarget} + ${spacing('xSmall')})`,
          },
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiListItemSecondaryAction', 'root', {
    // Gutters only — master zeroes `right` under `disableGutters`.
    variants: [{ props: { disableGutters: false }, style: { right: spacing('small') } }],
  });
  addStyleOverride(enhanced.components, 'MuiCardContent', 'root', {
    padding: spacing('medium'),
    '&:last-child': { paddingBottom: spacing('medium') },
  });
  addStyleOverride(enhanced.components, 'MuiCardActions', 'root', {
    padding: spacing('medium'),
    paddingTop: `var(--_padTop, ${spacing('medium')})`,
    [`.${cardContentClasses.root} + &`]: { '--_padTop': 0 }, // use private variable so `sx` overrides still work
    variants: [
      {
        props: { disableSpacing: false },
        style: { gap: spacing('xSmall'), '& > :not(style) ~ :not(style)': { marginLeft: 0 } },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiCardHeader', 'root', {
    padding: spacing('medium'),
    gap: spacing('small'),
  });
  addStyleOverride(enhanced.components, 'MuiCardHeader', 'avatar', { marginRight: 0 });
  addStyleOverride(enhanced.components, 'MuiCardHeader', 'action', {
    marginBlock: spacing('-xxSmall'),
    marginRight: spacing('-xSmall'),
  });
  addStyleOverride(enhanced.components, 'MuiSelect', 'select', {
    minHeight: 'auto',
    // master writes per-variant --_caret/--_endAdornment on these same :has hooks
    [`.${inputBaseClasses.root}:has(> &)`]: {
      '--_caret': `calc(${iconSize} + ${spacing('small')})`,
    },
    [`.${inputBaseClasses.root}:has(> & ~ .${inputAdornmentClasses.root})`]: {
      '--_endAdornment': iconSize,
    },
    '&&': { paddingRight: 'calc(var(--_caret) + var(--_endAdornment, 0px))' },
  });
  addStyleOverride(enhanced.components, 'MuiSelect', 'icon', { right: spacing('xSmall') });
  addStyleOverride(enhanced.components, 'MuiAlert', 'root', {
    paddingBlock: spacing('xSmall'),
    paddingInline: spacing('small'),
    gap: spacing('xSmall'),
  });
  addStyleOverride(enhanced.components, 'MuiAlert', 'icon', {
    marginRight: 0,
    paddingBlock: `max(0px, calc((${touchTarget} - 1em) / 2))`,
    fontSize: '1.1lh',
  });
  addStyleOverride(enhanced.components, 'MuiAlert', 'action', {
    padding: 0,
    marginRight: 0,
  });
  addDefaultProps(enhanced.components, 'MuiAlert', {
    slotProps: { closeButton: { size: 'medium' } },
  });
  addStyleOverride(enhanced.components, 'MuiAlert', 'message', {
    paddingBlock: `max(0px, calc((${touchTarget} - 1lh) / 2))`,
  });
  addStyleOverride(enhanced.components, 'MuiTab', 'root', {
    minHeight: touchTarget,
    lineHeight: enhanced.typography?.button?.lineHeight,
    paddingBlock: 0,
    paddingInline: spacing('small'),
    gap: spacing('xxSmall'),
    [`& > .${tabClasses.icon}`]: { margin: 0 },
    variants: [
      {
        props: ({ ownerState }) =>
          !!ownerState.icon &&
          !!ownerState.label &&
          (ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom'),
        style: {
          minHeight: hugeBox,
          paddingBlock: spacing('xxSmall'),
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiTabs', 'root', { minHeight: touchTarget });
  addStyleOverride(enhanced.components, 'MuiTabScrollButton', 'root', {
    variants: [
      { props: { orientation: 'horizontal' }, style: { width: touchTarget } },
      { props: { orientation: 'vertical' }, style: { height: touchTarget } },
    ],
  });
  // AvatarGroup overlap is untouchable: an inline --AvatarGroup-spacing style
  // from the spacing prop (px numbers only) outranks any styleOverride.
  addStyleOverride(enhanced.components, 'MuiAvatar', 'root', {
    '--_size': touchTarget,
    width: 'var(--_size)',
    height: 'var(--_size)',
    fontSize: 'calc(var(--_size) / 2)',
  });
  addStyleOverride(enhanced.components, 'MuiLinearProgress', 'root', { height: 4 });
  addDefaultProps(enhanced.components, 'MuiCircularProgress', { size: touchTarget });
  // Root box = the touch target. Master sizes rail/track via height:inherit
  // off the root, so their thickness is re-emitted explicitly from
  // --_trackSize. markLabel offsets stay master.
  addStyleOverride(enhanced.components, 'MuiSlider', 'root', {
    padding: 0,
    // Master pads the root to 44px under a coarse pointer; the box already is
    // the touch target, and the media block would otherwise land after this.
    '@media (pointer: coarse)': { padding: 0 },
    '--_trackSize': `calc(${spacing('small')} / 4)`,
    variants: [
      { props: { orientation: 'horizontal' }, style: { height: touchTarget } },
      { props: { orientation: 'vertical' }, style: { width: touchTarget } },
      { props: { size: 'small' }, style: { '--_trackSize': `calc(${spacing('xSmall')} / 4)` } },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiSlider', 'valueLabel', {
    padding: `${spacing('xxSmall')} ${spacing('xSmall')}`,
  });
  addStyleOverride(enhanced.components, 'MuiSlider', 'markLabel', {
    // Vertical labels position off an inline `bottom`, so they take `left`;
    // an unconditional `top` would over-constrain them.
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: { top: touchTarget, '@media (pointer: coarse)': { top: touchTarget } },
      },
      {
        props: { orientation: 'vertical' },
        style: { left: touchTarget, '@media (pointer: coarse)': { left: touchTarget } },
      },
    ],
  });
  for (const slot of ['rail', 'track'] as const) {
    addStyleOverride(enhanced.components, 'MuiSlider', slot, {
      variants: [
        { props: { orientation: 'horizontal' }, style: { height: 'var(--_trackSize)' } },
        { props: { orientation: 'vertical' }, style: { width: 'var(--_trackSize)' } },
      ],
    });
  }
  addStyleOverride(enhanced.components, 'MuiSlider', 'thumb', {
    width: spacing('medium'),
    height: spacing('medium'),
    variants: [
      { props: { size: 'small' }, style: { width: spacing('small'), height: spacing('small') } },
    ],
    '&::after': {
      width: touchTarget,
      height: touchTarget,
    },
  });

  addStyleOverride(enhanced.components, 'MuiTableCell', 'root', {
    boxSizing: 'border-box',
    paddingBlock: spacing('xxSmall'), // smallest gutter for multiple lines of content
    variants: [
      {
        props: { size: 'medium' },
        style: {
          height: tableRowHeight,
          paddingInline: spacing('small'),
        },
      },
      {
        props: { size: 'small' },
        style: {
          height: tableRowHeightDense,
          paddingInline: spacing('xSmall'),
          [`&.${tableCellClasses.paddingCheckbox}`]: {
            width: tableRowHeightDense,
            padding: '0 0 0 4px',
          },
        },
      },
      {
        props: {
          padding: 'checkbox',
        },
        style: {
          width: tableRowHeight,
          padding: '0 0 0 4px',
        },
      },
      { props: { variant: 'footer' }, style: { ...enhanced.typography?.subtitle2 } },
      { props: { padding: 'none' }, style: { padding: 0 } },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiTableSortLabel', 'icon', {
    // One marginInline leaf: the arrow flips sides in right-aligned columns.
    fontSize: `calc(${iconSize} + 2px)`,
    marginInline: spacing('xxSmall'),
  });
  addStyleOverride(enhanced.components, 'MuiTablePagination', 'root', {
    '&:last-child': { padding: 0 },
    [`& .${tablePaginationClasses.select}`]: enhanced.typography?.body2 ?? {},
  });
  addStyleOverride(enhanced.components, 'MuiTablePagination', 'toolbar', {
    minHeight: hugeBox,
    paddingRight: 2,
    [`${enhanced.breakpoints.up('xs' as Breakpoint)} and (orientation: landscape)`]: {
      minHeight: hugeBox,
    },
    [smUp]: { minHeight: hugeBox, paddingRight: 2 },
  });
  const toolbarHeight = `calc(${touchTarget} + 2*${spacing('xSmall')})`;
  const toolbarDenseHeight = `calc(${touchTarget} + 2*${spacing('xxSmall')})`;
  const toolbarRegular = {
    minHeight: toolbarHeight,
    [enhanced.breakpoints.up('xs' as Breakpoint)]: {
      '@media (orientation: landscape)': { minHeight: toolbarDenseHeight },
    },
    [smUp]: { minHeight: toolbarHeight },
  };
  enhanced.mixins = {
    ...enhanced.mixins,
    toolbar: { ...enhanced.mixins.toolbar, ...toolbarRegular },
  };
  addStyleOverride(enhanced.components, 'MuiToolbar', 'root', {
    variants: [
      {
        props: { disableGutters: false },
        style: {
          paddingInline: spacing('medium'),
          [smUp]: { paddingInline: spacing('medium') },
        },
      },
      { props: { variant: 'dense' }, style: { minHeight: toolbarDenseHeight } },
      { props: { variant: 'regular' }, style: toolbarRegular },
    ],
  });
  // Circular-scoped: the extended variant stays frozen at master.
  addStyleOverride(enhanced.components, 'MuiFab', 'root', {
    minHeight: 0,
    variants: [
      {
        props: { variant: 'circular', size: 'small' },
        style: {
          width: `calc(${touchTarget} + ${spacing('xxSmall')})`,
          height: `calc(${touchTarget} + ${spacing('xxSmall')})`,
        },
      },
      {
        props: { variant: 'circular', size: 'medium' },
        style: {
          width: `calc(${touchTarget} + ${spacing('xSmall')})`,
          height: `calc(${touchTarget} + ${spacing('xSmall')})`,
        },
      },
      {
        props: { variant: 'circular', size: 'large' },
        style: {
          width: `calc(${touchTarget} + ${spacing('medium')})`,
          height: `calc(${touchTarget} + ${spacing('medium')})`,
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiPagination', 'ul', { gap: spacing('xSmall') });
  addStyleOverride(enhanced.components, 'MuiPaginationItem', 'icon', {
    fontSize: pxToRem(20),
    variants: [
      { props: { size: 'small' }, style: { fontSize: pxToRem(18) } },
      { props: { size: 'large' }, style: { fontSize: pxToRem(22) } },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiPaginationItem', 'root', {
    margin: 0,
    padding: 0,
    variants: [
      // Circular only — an unconditional 50% would override `shape="rounded"`.
      { props: { shape: 'circular' }, style: { borderRadius: '50%' } },
      {
        props: { size: 'small' },
        style: {
          height: smallBox,
          minWidth: smallBox,
          margin: `max(0px, (${wcagTargetSize} - ${smallBox}) / 2)`,
          [`&:not(.${paginationItemClasses.ellipsis})::before`]: {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `max(100%, ${wcagTargetSize})`,
            height: `max(100%, ${wcagTargetSize})`,
            transform: 'translate(-50%, -50%)',
          },
        },
      },
      {
        props: { size: 'medium' },
        style: { height: touchTarget, minWidth: touchTarget },
      },
      {
        props: { size: 'large' },
        style: { height: largeBox, minWidth: largeBox },
      },
      {
        props: ({ ownerState }) =>
          ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis',
        style: { height: 'auto' },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiBottomNavigation', 'root', {
    height: spacing('xxLarge'),
  });
  addStyleOverride(enhanced.components, 'MuiBottomNavigationAction', 'root', {
    gap: spacing('xxSmall'),
    paddingInline: spacing('small'),
    variants: [
      {
        props: ({ ownerState }) =>
          !ownerState.showLabel && !ownerState.selected && Boolean(ownerState.label),
        style: { paddingTop: spacing('medium') },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiBadge', 'badge', {
    borderRadius: 99,
    variants: [
      {
        props: { variant: 'standard' },
        style: {
          height: 'auto',
          lineHeight: 4 / 3, // text block 16px
          minWidth: `calc(1lh + 2*${spacing('xxSmall')})`,
          paddingBlock: spacing('xxSmall'),
          paddingInline: spacing('xSmall'),
        },
      },
      {
        props: { variant: 'dot' },
        style: {
          height: spacing('small'),
          minWidth: spacing('small'),
        },
      },
    ],
  });
  // Child-margin clears sit at slot level: slot rules render after master's
  // size re-asserts and win by order at equal specificity.
  addStyleOverride(enhanced.components, 'MuiChip', 'root', {
    '--_childSize': `calc(var(--_height) - ${spacing('xSmall')})`,
    '--_offset': `calc(var(--_height)/2 - var(--_childSize)/2 - var(--_paddingInline))`,
    height: 'var(--_height)', // use private variable to be controlled by Autocomplete
    paddingInline: 'var(--_paddingInline)',
    borderRadius: 'var(--_height)', // pill shape
    ...enhanced.typography?.body1,
    '--_height': touchTarget,
    '--_paddingInline': spacing('small'),
    gap: spacing('xSmall'),
    variants: [
      {
        props: { size: 'small' },
        style: {
          '--_height': smallBox,
          '--_paddingInline': spacing('xSmall'),
          gap: spacing('xxSmall'),
          ...enhanced.typography?.body2,
        },
      },
      {
        props: { size: 'small', clickable: true },
        style: {
          marginBlock: `max(0px, (${wcagTargetSize} - var(--_height)) / 2)`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            insetInline: 0,
            height: `max(100%, ${wcagTargetSize})`,
            transform: 'translateY(-50%)',
          },
        },
      },
    ],
  });
  addStyleOverride(enhanced.components, 'MuiChip', 'label', { paddingInline: 0 });
  addStyleOverride(enhanced.components, 'MuiChip', 'avatar', {
    margin: 0,
    width: 'var(--_childSize)',
    height: 'var(--_childSize)',
    marginLeft: 'var(--_offset)',
    fontSize: pxToRem(12),
    variants: [{ props: { size: 'small' }, style: { fontSize: pxToRem(10) } }],
  });
  addStyleOverride(enhanced.components, 'MuiChip', 'icon', {
    margin: 0,
    fontSize: iconSize,
    variants: [{ props: { size: 'small' }, style: { fontSize: iconSmall } }],
  });
}
