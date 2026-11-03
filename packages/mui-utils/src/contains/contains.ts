/**
 * Copied from @base-ui/utils
 *
 * Shadow DOM-aware containment check.
 *
 * Native `parent.contains(child)` returns `false` when the child is inside a
 * shadow root that is a descendant of the parent. This function handles that
 * case by traversing up through shadow root hosts.
 *
 * @param parent - The potential ancestor element.
 * @param child - The potential descendant element.
 * @returns Whether `parent` contains `child`, even across shadow root boundaries.
 */
export default function contains(
  parent: Element | null | undefined,
  child: Element | null | undefined,
): boolean {
  if (!parent || !child) {
    return false;
  }

  // First, attempt with the faster native method.
  if (parent.contains(child)) {
    return true;
  }

  // Then fall back to traversing out of shadow roots when needed.
  const rootNode = child.getRootNode?.();
  if (rootNode && rootNode instanceof ShadowRoot) {
    let next: Node | null = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode ?? (next as ShadowRoot).host ?? null;
    }
  }

  return false;
}
