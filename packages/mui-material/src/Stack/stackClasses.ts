import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import type { StackClasses } from '@mui/system';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export type { StackClassKey } from '@mui/system';
export type { StackClasses };

export function getStackUtilityClass(slot: string): string {
  return generateUtilityClass('MuiStack', slot);
}

const stackClasses: StackClasses = generateUtilityClasses('MuiStack', ['root']);

export default stackClasses;
