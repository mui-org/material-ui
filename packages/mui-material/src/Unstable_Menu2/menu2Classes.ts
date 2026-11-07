import generateUtilityClass from '@mui/utils/generateUtilityClass';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';

export interface Menu2TriggerClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if the menu is open. */
  open: string;
}

export type Menu2TriggerClassKey = keyof Menu2TriggerClasses;

export function getMenu2TriggerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2Trigger', slot);
}

export const menu2TriggerClasses: Menu2TriggerClasses = generateUtilityClasses('MuiMenu2Trigger', [
  'root',
  'disabled',
  'open',
]);

export interface Menu2PopupClasses {
  /** Styles applied to the Paper element, the menu surface. */
  root: string;
  /** Styles applied to the portal element, which contains the menu and its backdrops. */
  portal: string;
  /** Styles applied to the element that positions the menu surface. */
  positioner: string;
  /** Styles applied to the backdrop element. */
  backdrop: string;
  /** Styles applied to the Material List element. */
  list: string;
}

export type Menu2PopupClassKey = keyof Menu2PopupClasses;

export function getMenu2PopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2Popup', slot);
}

export const menu2PopupClasses: Menu2PopupClasses = generateUtilityClasses('MuiMenu2Popup', [
  'root',
  'portal',
  'positioner',
  'backdrop',
  'list',
]);

export interface Menu2SubmenuPopupClasses {
  /** Styles applied to the Paper element, the menu surface. */
  root: string;
  /** Styles applied to the portal element, which contains the menu. */
  portal: string;
  /** Styles applied to the element that positions the menu surface. */
  positioner: string;
  /** Styles applied to the Material List element. */
  list: string;
}

export type Menu2SubmenuPopupClassKey = keyof Menu2SubmenuPopupClasses;

export function getMenu2SubmenuPopupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2SubmenuPopup', slot);
}

export const menu2SubmenuPopupClasses: Menu2SubmenuPopupClasses = generateUtilityClasses(
  'MuiMenu2SubmenuPopup',
  ['root', 'portal', 'positioner', 'list'],
);

export interface Menu2ItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if highlighted. */
  highlighted: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element if `dense={true}`. */
  dense: string;
  /** Styles applied to the root element if `divider={true}`. */
  divider: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
}

export type Menu2ItemClassKey = keyof Menu2ItemClasses;

export function getMenu2ItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2Item', slot);
}

export const menu2ItemClasses: Menu2ItemClasses = generateUtilityClasses('MuiMenu2Item', [
  'root',
  'highlighted',
  'disabled',
  'dense',
  'divider',
  'gutters',
]);

export interface Menu2LinkItemClasses extends Menu2ItemClasses {}

export type Menu2LinkItemClassKey = keyof Menu2LinkItemClasses;

export function getMenu2LinkItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2LinkItem', slot);
}

export const menu2LinkItemClasses: Menu2LinkItemClasses = generateUtilityClasses(
  'MuiMenu2LinkItem',
  ['root', 'highlighted', 'disabled', 'dense', 'divider', 'gutters'],
);

export interface Menu2CheckboxItemClasses extends Menu2ItemClasses {
  /** Styles applied to the indicator element. */
  indicator: string;
  /** Styles applied to the icon inside the indicator. */
  indicatorIcon: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
}

export type Menu2CheckboxItemClassKey = keyof Menu2CheckboxItemClasses;

export function getMenu2CheckboxItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2CheckboxItem', slot);
}

export const menu2CheckboxItemClasses: Menu2CheckboxItemClasses = generateUtilityClasses(
  'MuiMenu2CheckboxItem',
  [
    'root',
    'highlighted',
    'disabled',
    'dense',
    'divider',
    'gutters',
    'checked',
    'indicator',
    'indicatorIcon',
  ],
);

export interface Menu2CheckboxItemIndicatorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if highlighted. */
  highlighted: string;
}

export type Menu2CheckboxItemIndicatorClassKey = keyof Menu2CheckboxItemIndicatorClasses;

export function getMenu2CheckboxItemIndicatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2CheckboxItemIndicator', slot);
}

export const menu2CheckboxItemIndicatorClasses: Menu2CheckboxItemIndicatorClasses =
  generateUtilityClasses('MuiMenu2CheckboxItemIndicator', [
    'root',
    'checked',
    'disabled',
    'highlighted',
  ]);

export interface Menu2RadioGroupClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
}

export type Menu2RadioGroupClassKey = keyof Menu2RadioGroupClasses;

export function getMenu2RadioGroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2RadioGroup', slot);
}

export const menu2RadioGroupClasses: Menu2RadioGroupClasses = generateUtilityClasses(
  'MuiMenu2RadioGroup',
  ['root', 'disabled'],
);

export interface Menu2RadioItemClasses extends Menu2ItemClasses {
  /** Styles applied to the indicator element. */
  indicator: string;
  /** Styles applied to the icon inside the indicator. */
  indicatorIcon: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
}

export type Menu2RadioItemClassKey = keyof Menu2RadioItemClasses;

export function getMenu2RadioItemUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2RadioItem', slot);
}

export const menu2RadioItemClasses: Menu2RadioItemClasses = generateUtilityClasses(
  'MuiMenu2RadioItem',
  [
    'root',
    'highlighted',
    'disabled',
    'dense',
    'divider',
    'gutters',
    'checked',
    'indicator',
    'indicatorIcon',
  ],
);

export interface Menu2RadioItemIndicatorClasses {
  /** Styles applied to the root element. */
  root: string;
  /** State class applied to the root element if `checked={true}`. */
  checked: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root element if highlighted. */
  highlighted: string;
}

export type Menu2RadioItemIndicatorClassKey = keyof Menu2RadioItemIndicatorClasses;

export function getMenu2RadioItemIndicatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2RadioItemIndicator', slot);
}

export const menu2RadioItemIndicatorClasses: Menu2RadioItemIndicatorClasses =
  generateUtilityClasses('MuiMenu2RadioItemIndicator', [
    'root',
    'checked',
    'disabled',
    'highlighted',
  ]);

export interface Menu2GroupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type Menu2GroupClassKey = keyof Menu2GroupClasses;

export function getMenu2GroupUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2Group', slot);
}

export const menu2GroupClasses: Menu2GroupClasses = generateUtilityClasses('MuiMenu2Group', [
  'root',
]);

export interface Menu2GroupLabelClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type Menu2GroupLabelClassKey = keyof Menu2GroupLabelClasses;

export function getMenu2GroupLabelUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2GroupLabel', slot);
}

export const menu2GroupLabelClasses: Menu2GroupLabelClasses = generateUtilityClasses(
  'MuiMenu2GroupLabel',
  ['root'],
);

export interface Menu2SeparatorClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type Menu2SeparatorClassKey = keyof Menu2SeparatorClasses;

export function getMenu2SeparatorUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2Separator', slot);
}

export const menu2SeparatorClasses: Menu2SeparatorClasses = generateUtilityClasses(
  'MuiMenu2Separator',
  ['root'],
);

export interface Menu2SubmenuTriggerClasses extends Menu2ItemClasses {
  /** Styles applied to the submenu indicator. */
  indicator: string;
  /** State class applied to the root element if the submenu is open. */
  open: string;
}

export type Menu2SubmenuTriggerClassKey = keyof Menu2SubmenuTriggerClasses;

export function getMenu2SubmenuTriggerUtilityClass(slot: string): string {
  return generateUtilityClass('MuiMenu2SubmenuTrigger', slot);
}

export const menu2SubmenuTriggerClasses: Menu2SubmenuTriggerClasses = generateUtilityClasses(
  'MuiMenu2SubmenuTrigger',
  ['root', 'highlighted', 'disabled', 'dense', 'divider', 'gutters', 'open', 'indicator'],
);
