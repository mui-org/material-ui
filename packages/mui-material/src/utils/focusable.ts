export const FOCUSABLE_ATTRIBUTE = 'data-mui-focusable';

/**
 * Returns the element marked as the initial focus target inside a focus trap.
 * The root element takes precedence over marked descendants so components can
 * opt into focusing their own root surface directly.
 */
export function getFocusTarget(rootElement: HTMLElement | null | undefined): HTMLElement | null {
  if (!rootElement) {
    return null;
  }

  return rootElement.hasAttribute(FOCUSABLE_ATTRIBUTE)
    ? rootElement
    : rootElement.querySelector<HTMLElement>(`[${FOCUSABLE_ATTRIBUTE}]`);
}
