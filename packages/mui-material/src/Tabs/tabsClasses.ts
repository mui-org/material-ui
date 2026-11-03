import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface TabsClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** Styles applied to the list element. */
  list: string;
  /** Styles applied to the flex container element if `centered={true}` & `!variant="scrollable"`. */
  centered: string;
  /** Styles applied to the tablist element. */
  scroller: string;
  /** Styles applied to the tablist element if `!variant="scrollable"`. */
  fixed: string;
  /** Styles applied to the tablist element if `variant="scrollable"` and `orientation="horizontal"`. */
  scrollableX: string;
  /** Styles applied to the tablist element if `variant="scrollable"` and `orientation="vertical"`. */
  scrollableY: string;
  /** Styles applied to the tablist element if `variant="scrollable"` and `visibleScrollbar={false}`. */
  hideScrollbar: string;
  /** Styles applied to the ScrollButtonComponent component. */
  scrollButtons: string;
  /** Styles applied to the ScrollButtonComponent component if `allowScrollButtonsMobile={true}`. */
  scrollButtonsHideMobile: string;
  /** Styles applied to the TabIndicator component. */
  indicator: string;
}

export type TabsClassKey = keyof TabsClasses;

export function getTabsUtilityClass(slot: string): string {
  return generateUtilityClass('MuiTabs', slot);
}

const tabsClasses: TabsClasses = generateUtilityClasses('MuiTabs', [
  'root',
  'vertical',
  'list',
  'centered',
  'scroller',
  'fixed',
  'scrollableX',
  'scrollableY',
  'hideScrollbar',
  'scrollButtons',
  'scrollButtonsHideMobile',
  'indicator',
]);

export default tabsClasses;
