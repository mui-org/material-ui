import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface PreviewCardPopupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element when the popup is open. */
  open: string;
  /** Styles applied to the portal element. */
  portal: string;
  /** Styles applied to the positioner element. */
  positioner: string;
}

export type PreviewCardPopupClassKey = keyof PreviewCardPopupClasses;

export function getPreviewCardPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPreviewCardPopup', slot);
}

const previewCardPopupClasses: PreviewCardPopupClasses = generateUtilityClasses(
  'MuiPreviewCardPopup',
  ['root', 'open', 'portal', 'positioner'],
);

export default previewCardPopupClasses;
