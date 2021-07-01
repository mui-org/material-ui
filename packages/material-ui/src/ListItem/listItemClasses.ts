import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface ListItemClasses {
  /** Styles applied to the (normally root) `component` element. May be wrapped by a `container`. */
  root: string;
  /** Styles applied to the container element if `children` includes `ListItemSecondaryAction`. */
  container: string;
  /** Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`. */
  focusVisible: string;
  /** Styles applied to the component element if dense. */
  dense: string;
  /** Styles applied to the component element if `alignItems="flex-start"`. */
  alignItemsFlexStart: string;
  /** Pseudo-class applied to the inner `component` element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the inner `component` element if `divider={true}`. */
  divider: string;
  /** Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the root element unless `disablePadding={true}`. */
  padding: string;
  /** Styles applied to the inner `component` element if `button={true}`. */
  button: string;
  /** Styles applied to the component element if `children` includes `ListItemSecondaryAction`. */
  secondaryAction: string;
  /** Pseudo-class applied to the root element if `selected={true}`. */
  selected: string;
}

export type ListItemClassKey = keyof ListItemClasses;

export function getListItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiListItem', slot);
}

const listItemClasses: ListItemClasses = generateUtilityClasses('MuiListItem', [
  'root',
  'container',
  'focusVisible',
  'dense',
  'alignItemsFlexStart',
  'disabled',
  'divider',
  'gutters',
  'padding',
  'button',
  'secondaryAction',
  'selected',
]);

export default listItemClasses;
