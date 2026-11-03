import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ListItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the component element if dense. */
  dense: string;
  /** Styles applied to the component element if `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
  /** Styles applied to the inner `component` element if `divider={true}`. */
  divider: string;
  /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the root element unless `disablePadding={true}`. */
  padding: string;
  /** Styles applied to the secondary action element. */
  secondaryAction: string;
}

export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('MuiListItem', [
  'root',
  'dense',
  'alignItemsFlexStart',
  'divider',
  'gutters',
  'padding',
  'secondaryAction',
]);

export default listItemClasses;
