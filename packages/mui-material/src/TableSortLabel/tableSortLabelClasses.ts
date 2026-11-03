import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TableSortLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `direction="desc"`. */
  directionDesc: string;
  /** Styles applied to the root element if `direction="asc"`. */
  directionAsc: string;
  /** State class applied to the root element if `active={true}`. */
  active: string;
  /** Styles applied to the icon component. */
  icon: string;
}

export type TableSortLabelClassKey = keyof TableSortLabelClasses;

export function getTableSortLabelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTableSortLabel', slot);
}

const tableSortLabelClasses: TableSortLabelClasses = generateUtilityClasses('MuiTableSortLabel', [
  'root',
  'active',
  'icon',
  'directionDesc',
  'directionAsc',
]);

export default tableSortLabelClasses;
