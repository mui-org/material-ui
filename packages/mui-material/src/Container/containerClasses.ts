import type { ContainerClasses } from '@mui/system';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export type { ContainerClassKey } from '@mui/system';
export type { ContainerClasses };

export function getContainerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiContainer', slot);
}

const containerClasses: ContainerClasses = generateUtilityClasses('MuiContainer', [
  'root',
  'disableGutters',
  'fixed',
  'maxWidthXs',
  'maxWidthSm',
  'maxWidthMd',
  'maxWidthLg',
  'maxWidthXl',
]);

export default containerClasses;
