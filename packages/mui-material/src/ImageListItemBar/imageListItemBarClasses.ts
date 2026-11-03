import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface ImageListItemBarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `position="bottom"`. */
  positionBottom: string;
  /** Styles applied to the root element if `position="top"`. */
  positionTop: string;
  /** Styles applied to the root element if `position="below"`. */
  positionBelow: string;
  /** Styles applied to the action container element if `actionPosition="left"`. */
  actionPositionLeft: string;
  /** Styles applied to the action container element if `actionPosition="right"`. */
  actionPositionRight: string;
  /** Styles applied to the title and subtitle container element. */
  titleWrap: string;
  /** Styles applied to the title container element. */
  title: string;
  /** Styles applied to the subtitle container element. */
  subtitle: string;
  /** Styles applied to the actionIcon if supplied. */
  actionIcon: string;
}

export type ImageListItemBarClassKey = keyof ImageListItemBarClasses;

export function getImageListItemBarUtilityClass(slot: string): string {
  return generateUtilityClass('MuiImageListItemBar', slot);
}

const imageListItemBarClasses: ImageListItemBarClasses = generateUtilityClasses(
  'MuiImageListItemBar',
  [
    'root',
    'positionBottom',
    'positionTop',
    'positionBelow',
    'actionPositionLeft',
    'actionPositionRight',
    'titleWrap',
    'title',
    'subtitle',
    'actionIcon',
  ],
);

export default imageListItemBarClasses;
