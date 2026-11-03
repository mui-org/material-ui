import type { ComponentsProps } from './props';
import type { ComponentsOverrides } from './overrides';
import type { ComponentsVariants } from './variants';

export interface Components<Theme = unknown> {
  /**
   * Whether to merge the className and style coming from the component props with the default props.
   * @default false
   */
  mergeClassNameAndStyle?: boolean | undefined;
  MuiAlert?:
    | {
        defaultProps?: ComponentsProps['MuiAlert'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAlert'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAlert'] | undefined;
      }
    | undefined;
  MuiAlertTitle?:
    | {
        defaultProps?: ComponentsProps['MuiAlertTitle'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAlertTitle'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAlertTitle'] | undefined;
      }
    | undefined;
  MuiAppBar?:
    | {
        defaultProps?: ComponentsProps['MuiAppBar'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAppBar'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAppBar'] | undefined;
      }
    | undefined;
  MuiAutocomplete?:
    | {
        defaultProps?: ComponentsProps['MuiAutocomplete'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAutocomplete'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAutocomplete'] | undefined;
      }
    | undefined;
  MuiAvatar?:
    | {
        defaultProps?: ComponentsProps['MuiAvatar'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAvatar'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAvatar'] | undefined;
      }
    | undefined;
  MuiAvatarGroup?:
    | {
        defaultProps?: ComponentsProps['MuiAvatarGroup'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAvatarGroup'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAvatarGroup'] | undefined;
      }
    | undefined;
  MuiBackdrop?:
    | {
        defaultProps?: ComponentsProps['MuiBackdrop'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiBackdrop'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiBackdrop'] | undefined;
      }
    | undefined;
  MuiBadge?:
    | {
        defaultProps?: ComponentsProps['MuiBadge'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiBadge'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiBadge'] | undefined;
      }
    | undefined;
  MuiBottomNavigation?:
    | {
        defaultProps?: ComponentsProps['MuiBottomNavigation'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiBottomNavigation'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiBottomNavigation'] | undefined;
      }
    | undefined;
  MuiBottomNavigationAction?:
    | {
        defaultProps?: ComponentsProps['MuiBottomNavigationAction'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiBottomNavigationAction'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiBottomNavigationAction'] | undefined;
      }
    | undefined;
  MuiBreadcrumbs?:
    | {
        defaultProps?: ComponentsProps['MuiBreadcrumbs'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiBreadcrumbs'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiBreadcrumbs'] | undefined;
      }
    | undefined;
  MuiButton?:
    | {
        defaultProps?: ComponentsProps['MuiButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiButton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiButton'] | undefined;
      }
    | undefined;
  MuiButtonBase?:
    | {
        defaultProps?: ComponentsProps['MuiButtonBase'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiButtonBase'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiButtonBase'] | undefined;
      }
    | undefined;
  MuiButtonGroup?:
    | {
        defaultProps?: ComponentsProps['MuiButtonGroup'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiButtonGroup'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiButtonGroup'] | undefined;
      }
    | undefined;
  MuiCard?:
    | {
        defaultProps?: ComponentsProps['MuiCard'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCard'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCard'] | undefined;
      }
    | undefined;
  MuiCardActionArea?:
    | {
        defaultProps?: ComponentsProps['MuiCardActionArea'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCardActionArea'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCardActionArea'] | undefined;
      }
    | undefined;
  MuiCardActions?:
    | {
        defaultProps?: ComponentsProps['MuiCardActions'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCardActions'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCardActions'] | undefined;
      }
    | undefined;
  MuiCardContent?:
    | {
        defaultProps?: ComponentsProps['MuiCardContent'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCardContent'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCardContent'] | undefined;
      }
    | undefined;
  MuiCardHeader?:
    | {
        defaultProps?: ComponentsProps['MuiCardHeader'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCardHeader'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCardHeader'] | undefined;
      }
    | undefined;
  MuiCardMedia?:
    | {
        defaultProps?: ComponentsProps['MuiCardMedia'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCardMedia'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCardMedia'] | undefined;
      }
    | undefined;
  MuiCheckbox?:
    | {
        defaultProps?: ComponentsProps['MuiCheckbox'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCheckbox'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCheckbox'] | undefined;
      }
    | undefined;
  MuiChip?:
    | {
        defaultProps?: ComponentsProps['MuiChip'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiChip'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiChip'] | undefined;
      }
    | undefined;
  MuiCircularProgress?:
    | {
        defaultProps?: ComponentsProps['MuiCircularProgress'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCircularProgress'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCircularProgress'] | undefined;
      }
    | undefined;
  MuiCollapse?:
    | {
        defaultProps?: ComponentsProps['MuiCollapse'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCollapse'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCollapse'] | undefined;
      }
    | undefined;
  MuiContainer?:
    | {
        defaultProps?: ComponentsProps['MuiContainer'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiContainer'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiContainer'] | undefined;
      }
    | undefined;
  MuiCssBaseline?:
    | {
        defaultProps?: ComponentsProps['MuiCssBaseline'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiCssBaseline'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiCssBaseline'] | undefined;
      }
    | undefined;
  MuiDialog?:
    | {
        defaultProps?: ComponentsProps['MuiDialog'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDialog'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDialog'] | undefined;
      }
    | undefined;
  MuiDialogActions?:
    | {
        defaultProps?: ComponentsProps['MuiDialogActions'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDialogActions'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDialogActions'] | undefined;
      }
    | undefined;
  MuiDialogContent?:
    | {
        defaultProps?: ComponentsProps['MuiDialogContent'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDialogContent'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDialogContent'] | undefined;
      }
    | undefined;
  MuiDialogContentText?:
    | {
        defaultProps?: ComponentsProps['MuiDialogContentText'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDialogContentText'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDialogContentText'] | undefined;
      }
    | undefined;
  MuiDialogTitle?:
    | {
        defaultProps?: ComponentsProps['MuiDialogTitle'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDialogTitle'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDialogTitle'] | undefined;
      }
    | undefined;
  MuiDivider?:
    | {
        defaultProps?: ComponentsProps['MuiDivider'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDivider'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDivider'] | undefined;
      }
    | undefined;
  MuiDrawer?:
    | {
        defaultProps?: ComponentsProps['MuiDrawer'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiDrawer'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiDrawer'] | undefined;
      }
    | undefined;
  MuiAccordion?:
    | {
        defaultProps?: ComponentsProps['MuiAccordion'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAccordion'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAccordion'] | undefined;
      }
    | undefined;
  MuiAccordionActions?:
    | {
        defaultProps?: ComponentsProps['MuiAccordionActions'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionActions'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAccordionActions'] | undefined;
      }
    | undefined;
  MuiAccordionDetails?:
    | {
        defaultProps?: ComponentsProps['MuiAccordionDetails'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionDetails'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAccordionDetails'] | undefined;
      }
    | undefined;
  MuiAccordionSummary?:
    | {
        defaultProps?: ComponentsProps['MuiAccordionSummary'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiAccordionSummary'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiAccordionSummary'] | undefined;
      }
    | undefined;
  MuiFab?:
    | {
        defaultProps?: ComponentsProps['MuiFab'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFab'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFab'] | undefined;
      }
    | undefined;
  MuiFilledInput?:
    | {
        defaultProps?: ComponentsProps['MuiFilledInput'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFilledInput'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFilledInput'] | undefined;
      }
    | undefined;
  MuiFormControl?:
    | {
        defaultProps?: ComponentsProps['MuiFormControl'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFormControl'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFormControl'] | undefined;
      }
    | undefined;
  MuiFormControlLabel?:
    | {
        defaultProps?: ComponentsProps['MuiFormControlLabel'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFormControlLabel'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFormControlLabel'] | undefined;
      }
    | undefined;
  MuiFormGroup?:
    | {
        defaultProps?: ComponentsProps['MuiFormGroup'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFormGroup'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFormGroup'] | undefined;
      }
    | undefined;
  MuiFormHelperText?:
    | {
        defaultProps?: ComponentsProps['MuiFormHelperText'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFormHelperText'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFormHelperText'] | undefined;
      }
    | undefined;
  MuiFormLabel?:
    | {
        defaultProps?: ComponentsProps['MuiFormLabel'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiFormLabel'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiFormLabel'] | undefined;
      }
    | undefined;
  MuiGrid?:
    | {
        defaultProps?: ComponentsProps['MuiGrid'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiGrid'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiGrid'] | undefined;
      }
    | undefined;
  MuiImageList?:
    | {
        defaultProps?: ComponentsProps['MuiImageList'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiImageList'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiImageList'] | undefined;
      }
    | undefined;
  MuiImageListItem?:
    | {
        defaultProps?: ComponentsProps['MuiImageListItem'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiImageListItem'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiImageListItem'] | undefined;
      }
    | undefined;
  MuiImageListItemBar?:
    | {
        defaultProps?: ComponentsProps['MuiImageListItemBar'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiImageListItemBar'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiImageListItemBar'] | undefined;
      }
    | undefined;
  MuiIcon?:
    | {
        defaultProps?: ComponentsProps['MuiIcon'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiIcon'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiIcon'] | undefined;
      }
    | undefined;
  MuiIconButton?:
    | {
        defaultProps?: ComponentsProps['MuiIconButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiIconButton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiIconButton'] | undefined;
      }
    | undefined;
  MuiInput?:
    | {
        defaultProps?: ComponentsProps['MuiInput'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiInput'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiInput'] | undefined;
      }
    | undefined;
  MuiInputAdornment?:
    | {
        defaultProps?: ComponentsProps['MuiInputAdornment'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiInputAdornment'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiInputAdornment'] | undefined;
      }
    | undefined;
  MuiInputBase?:
    | {
        defaultProps?: ComponentsProps['MuiInputBase'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiInputBase'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiInputBase'] | undefined;
      }
    | undefined;
  MuiInputLabel?:
    | {
        defaultProps?: ComponentsProps['MuiInputLabel'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiInputLabel'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiInputLabel'] | undefined;
      }
    | undefined;
  MuiLinearProgress?:
    | {
        defaultProps?: ComponentsProps['MuiLinearProgress'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiLinearProgress'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiLinearProgress'] | undefined;
      }
    | undefined;
  MuiLink?:
    | {
        defaultProps?: ComponentsProps['MuiLink'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiLink'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiLink'] | undefined;
      }
    | undefined;
  MuiList?:
    | {
        defaultProps?: ComponentsProps['MuiList'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiList'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiList'] | undefined;
      }
    | undefined;
  MuiListItem?:
    | {
        defaultProps?: ComponentsProps['MuiListItem'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListItem'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListItem'] | undefined;
      }
    | undefined;
  MuiListItemButton?:
    | {
        defaultProps?: ComponentsProps['MuiListItemButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListItemButton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListItemButton'] | undefined;
      }
    | undefined;
  MuiListItemAvatar?:
    | {
        defaultProps?: ComponentsProps['MuiListItemAvatar'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListItemAvatar'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListItemAvatar'] | undefined;
      }
    | undefined;
  MuiListItemIcon?:
    | {
        defaultProps?: ComponentsProps['MuiListItemIcon'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListItemIcon'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListItemIcon'] | undefined;
      }
    | undefined;
  MuiListItemSecondaryAction?:
    | {
        defaultProps?: ComponentsProps['MuiListItemSecondaryAction'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListItemSecondaryAction'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListItemSecondaryAction'] | undefined;
      }
    | undefined;
  MuiListItemText?:
    | {
        defaultProps?: ComponentsProps['MuiListItemText'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListItemText'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListItemText'] | undefined;
      }
    | undefined;
  MuiListSubheader?:
    | {
        defaultProps?: ComponentsProps['MuiListSubheader'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiListSubheader'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiListSubheader'] | undefined;
      }
    | undefined;
  MuiMenu?:
    | {
        defaultProps?: ComponentsProps['MuiMenu'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiMenu'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiMenu'] | undefined;
      }
    | undefined;
  MuiMenuItem?:
    | {
        defaultProps?: ComponentsProps['MuiMenuItem'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiMenuItem'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiMenuItem'] | undefined;
      }
    | undefined;
  MuiMenuList?:
    | {
        defaultProps?: ComponentsProps['MuiMenuList'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiMenuList'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiMenuList'] | undefined;
      }
    | undefined;
  MuiMobileStepper?:
    | {
        defaultProps?: ComponentsProps['MuiMobileStepper'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiMobileStepper'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiMobileStepper'] | undefined;
      }
    | undefined;
  MuiModal?:
    | {
        defaultProps?: ComponentsProps['MuiModal'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiModal'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiModal'] | undefined;
      }
    | undefined;
  MuiNativeSelect?:
    | {
        defaultProps?: ComponentsProps['MuiNativeSelect'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiNativeSelect'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiNativeSelect'] | undefined;
      }
    | undefined;
  MuiOutlinedInput?:
    | {
        defaultProps?: ComponentsProps['MuiOutlinedInput'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiOutlinedInput'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiOutlinedInput'] | undefined;
      }
    | undefined;
  MuiPagination?:
    | {
        defaultProps?: ComponentsProps['MuiPagination'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiPagination'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiPagination'] | undefined;
      }
    | undefined;
  MuiPaginationItem?:
    | {
        defaultProps?: ComponentsProps['MuiPaginationItem'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiPaginationItem'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiPaginationItem'] | undefined;
      }
    | undefined;
  MuiPaper?:
    | {
        defaultProps?: ComponentsProps['MuiPaper'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiPaper'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiPaper'] | undefined;
      }
    | undefined;
  MuiPopper?:
    | {
        defaultProps?: ComponentsProps['MuiPopper'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiPopper'] | undefined;
      }
    | undefined;
  MuiPopover?:
    | {
        defaultProps?: ComponentsProps['MuiPopover'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiPopover'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiPopover'] | undefined;
      }
    | undefined;
  MuiRadio?:
    | {
        defaultProps?: ComponentsProps['MuiRadio'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiRadio'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiRadio'] | undefined;
      }
    | undefined;
  MuiRadioGroup?:
    | {
        defaultProps?: ComponentsProps['MuiRadioGroup'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiRadioGroup'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiRadioGroup'] | undefined;
      }
    | undefined;
  MuiRating?:
    | {
        defaultProps?: ComponentsProps['MuiRating'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiRating'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiRating'] | undefined;
      }
    | undefined;
  MuiScopedCssBaseline?:
    | {
        defaultProps?: ComponentsProps['MuiScopedCssBaseline'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiScopedCssBaseline'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiScopedCssBaseline'] | undefined;
      }
    | undefined;
  MuiSelect?:
    | {
        defaultProps?: ComponentsProps['MuiSelect'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSelect'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSelect'] | undefined;
      }
    | undefined;
  MuiSkeleton?:
    | {
        defaultProps?: ComponentsProps['MuiSkeleton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSkeleton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSkeleton'] | undefined;
      }
    | undefined;
  MuiSlider?:
    | {
        defaultProps?: ComponentsProps['MuiSlider'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSlider'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSlider'] | undefined;
      }
    | undefined;
  MuiSnackbar?:
    | {
        defaultProps?: ComponentsProps['MuiSnackbar'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSnackbar'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSnackbar'] | undefined;
      }
    | undefined;
  MuiSnackbarContent?:
    | {
        defaultProps?: ComponentsProps['MuiSnackbarContent'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSnackbarContent'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSnackbarContent'] | undefined;
      }
    | undefined;
  MuiSpeedDial?:
    | {
        defaultProps?: ComponentsProps['MuiSpeedDial'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDial'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSpeedDial'] | undefined;
      }
    | undefined;
  MuiSpeedDialAction?:
    | {
        defaultProps?: ComponentsProps['MuiSpeedDialAction'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDialAction'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSpeedDialAction'] | undefined;
      }
    | undefined;
  MuiSpeedDialIcon?:
    | {
        defaultProps?: ComponentsProps['MuiSpeedDialIcon'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSpeedDialIcon'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSpeedDialIcon'] | undefined;
      }
    | undefined;
  MuiStack?:
    | {
        defaultProps?: ComponentsProps['MuiStack'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStack'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStack'] | undefined;
      }
    | undefined;
  MuiStep?:
    | {
        defaultProps?: ComponentsProps['MuiStep'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStep'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStep'] | undefined;
      }
    | undefined;
  MuiStepButton?:
    | {
        defaultProps?: ComponentsProps['MuiStepButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStepButton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStepButton'] | undefined;
      }
    | undefined;
  MuiStepConnector?:
    | {
        defaultProps?: ComponentsProps['MuiStepConnector'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStepConnector'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStepConnector'] | undefined;
      }
    | undefined;
  MuiStepContent?:
    | {
        defaultProps?: ComponentsProps['MuiStepContent'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStepContent'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStepContent'] | undefined;
      }
    | undefined;
  MuiStepIcon?:
    | {
        defaultProps?: ComponentsProps['MuiStepIcon'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStepIcon'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStepIcon'] | undefined;
      }
    | undefined;
  MuiStepLabel?:
    | {
        defaultProps?: ComponentsProps['MuiStepLabel'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStepLabel'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStepLabel'] | undefined;
      }
    | undefined;
  MuiStepper?:
    | {
        defaultProps?: ComponentsProps['MuiStepper'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiStepper'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiStepper'] | undefined;
      }
    | undefined;
  MuiSvgIcon?:
    | {
        defaultProps?: ComponentsProps['MuiSvgIcon'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSvgIcon'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSvgIcon'] | undefined;
      }
    | undefined;
  MuiSwipeableDrawer?:
    | {
        defaultProps?: ComponentsProps['MuiSwipeableDrawer'] | undefined;
      }
    | undefined;
  MuiSwitch?:
    | {
        defaultProps?: ComponentsProps['MuiSwitch'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiSwitch'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiSwitch'] | undefined;
      }
    | undefined;
  MuiTab?:
    | {
        defaultProps?: ComponentsProps['MuiTab'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTab'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTab'] | undefined;
      }
    | undefined;
  MuiTable?:
    | {
        defaultProps?: ComponentsProps['MuiTable'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTable'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTable'] | undefined;
      }
    | undefined;
  MuiTableBody?:
    | {
        defaultProps?: ComponentsProps['MuiTableBody'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableBody'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableBody'] | undefined;
      }
    | undefined;
  MuiTableCell?:
    | {
        defaultProps?: ComponentsProps['MuiTableCell'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableCell'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableCell'] | undefined;
      }
    | undefined;
  MuiTableContainer?:
    | {
        defaultProps?: ComponentsProps['MuiTableContainer'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableContainer'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableContainer'] | undefined;
      }
    | undefined;
  MuiTableFooter?:
    | {
        defaultProps?: ComponentsProps['MuiTableFooter'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableFooter'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableFooter'] | undefined;
      }
    | undefined;
  MuiTableHead?:
    | {
        defaultProps?: ComponentsProps['MuiTableHead'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableHead'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableHead'] | undefined;
      }
    | undefined;
  MuiTablePagination?:
    | {
        defaultProps?: ComponentsProps['MuiTablePagination'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTablePagination'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTablePagination'] | undefined;
      }
    | undefined;
  MuiTablePaginationActions?:
    | {
        defaultProps?: ComponentsProps['MuiTablePaginationActions'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTablePaginationActions'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTablePaginationActions'] | undefined;
      }
    | undefined;
  MuiTableRow?:
    | {
        defaultProps?: ComponentsProps['MuiTableRow'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableRow'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableRow'] | undefined;
      }
    | undefined;
  MuiTableSortLabel?:
    | {
        defaultProps?: ComponentsProps['MuiTableSortLabel'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTableSortLabel'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTableSortLabel'] | undefined;
      }
    | undefined;
  MuiTabs?:
    | {
        defaultProps?: ComponentsProps['MuiTabs'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTabs'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTabs'] | undefined;
      }
    | undefined;
  MuiTabScrollButton?:
    | {
        defaultProps?: ComponentsProps['MuiTabScrollButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTabScrollButton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTabScrollButton'] | undefined;
      }
    | undefined;
  MuiTextField?:
    | {
        defaultProps?: ComponentsProps['MuiTextField'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTextField'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTextField'] | undefined;
      }
    | undefined;
  MuiToggleButton?:
    | {
        defaultProps?: ComponentsProps['MuiToggleButton'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiToggleButton'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiToggleButton'] | undefined;
      }
    | undefined;
  MuiToggleButtonGroup?:
    | {
        defaultProps?: ComponentsProps['MuiToggleButtonGroup'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiToggleButtonGroup'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiToggleButtonGroup'] | undefined;
      }
    | undefined;
  MuiToolbar?:
    | {
        defaultProps?: ComponentsProps['MuiToolbar'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiToolbar'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiToolbar'] | undefined;
      }
    | undefined;
  MuiTooltip?:
    | {
        defaultProps?: ComponentsProps['MuiTooltip'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTooltip'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTooltip'] | undefined;
      }
    | undefined;
  MuiTypography?:
    | {
        defaultProps?: ComponentsProps['MuiTypography'] | undefined;
        styleOverrides?: ComponentsOverrides<Theme>['MuiTypography'] | undefined;
        variants?: ComponentsVariants<Theme>['MuiTypography'] | undefined;
      }
    | undefined;
  MuiUseMediaQuery?:
    | {
        defaultProps?: ComponentsProps['MuiUseMediaQuery'] | undefined;
      }
    | undefined;
}
