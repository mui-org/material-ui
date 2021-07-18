import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';

export interface MasonryItemClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type MasonryItemClassKey = keyof MasonryItemClasses;

export function getMasonryItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMasonryItem', slot);
}

const masonryItemClasses: MasonryItemClasses = generateUtilityClasses('MuiMasonryItem', ['root']);

export default masonryItemClasses;
