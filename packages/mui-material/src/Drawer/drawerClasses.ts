import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface DrawerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="permanent or persistent"`. */
  docked: string;
  /** Styles applied to the Paper component. */
  paper: string;
  /** Styles applied to the root element if `anchor="left"`. */
  anchorLeft: string;
  /** Styles applied to the root element if `anchor="right"`. */
  anchorRight: string;
  /** Styles applied to the root element if `anchor="top"`. */
  anchorTop: string;
  /** Styles applied to the root element if `anchor="bottom"`. */
  anchorBottom: string;
  /** Styles applied to the Modal component. */
  modal: string;
}

export type DrawerClassKey = keyof DrawerClasses;

export function getDrawerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiDrawer', slot);
}

const drawerClasses: DrawerClasses = generateUtilityClasses('MuiDrawer', [
  'root',
  'docked',
  'paper',
  'anchorLeft',
  'anchorRight',
  'anchorTop',
  'anchorBottom',
  'modal',
]);

export default drawerClasses;
