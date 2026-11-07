import ownerWindow from '@mui/utils/ownerWindow';
import ownerDocument from '@mui/utils/ownerDocument';
import getScrollbarSize from '@mui/utils/getScrollbarSize';

export interface ManagedModalProps {
  disableScrollLock?: boolean | undefined;
}

// Overflow set on <html> is propagated to the viewport, and set on <body> when <html> is
// `visible`. The element it comes from is left with a used value of `visible`.
// https://drafts.csswg.org/css-overflow-3/#overflow-propagation
function isDocumentScroller(element: Element, doc: Document): boolean {
  return element === doc.body || element === doc.documentElement;
}

// Is a vertical scrollbar displayed?
function isOverflowing(container: Element): boolean {
  const doc = ownerDocument(container);

  if (isDocumentScroller(container, doc)) {
    // The viewport scrollbar is visible exactly when it takes up width.
    return getScrollbarSize(ownerWindow(container)) > 0;
  }

  return container.scrollHeight > container.clientHeight;
}

export function ariaHidden(element: Element, hide: boolean): void {
  if (hide) {
    element.setAttribute('aria-hidden', 'true');
  } else {
    element.removeAttribute('aria-hidden');
  }
}

function getPaddingRight(element: Element): number {
  return parseFloat(ownerWindow(element).getComputedStyle(element).paddingRight) || 0;
}

function isAriaHiddenForbiddenOnElement(element: Element): boolean {
  // The forbidden HTML tags are the ones from ARIA specification that
  // can be children of body and can't have aria-hidden attribute.
  // cf. https://www.w3.org/TR/html-aria/#docconformance
  const forbiddenTagNames = [
    'TEMPLATE',
    'SCRIPT',
    'STYLE',
    'LINK',
    'MAP',
    'META',
    'NOSCRIPT',
    'PICTURE',
    'COL',
    'COLGROUP',
    'PARAM',
    'SLOT',
    'SOURCE',
    'TRACK',
  ];
  const isForbiddenTagName = forbiddenTagNames.includes(element.tagName);
  const isInputHidden = element.tagName === 'INPUT' && element.getAttribute('type') === 'hidden';
  return isForbiddenTagName || isInputHidden;
}

// The chain of elements from `node` up to (but not including) `container`
// that should not be aria-hidden.
function getKeepChain(node: Element, container: Element): Set<Element> {
  const chain = new Set<Element>();
  let current: Element | null = node;

  while (current && current !== container) {
    chain.add(current);
    current = current.parentElement;
  }

  return current === container ? chain : new Set<Element>();
}

// Walk down from `parent` collecting everything that should be aria-hidden.
// An element on the keep chain is stepped through rather than hidden, so the
// modal's own ancestors stay readable while their other children get hidden.
function collectHiddenTargets(
  parent: Element,
  keep: Element,
  keepChain: Set<Element>,
  out: Set<Element>,
): void {
  [].forEach.call(parent.children, (element: Element) => {
    if (element === keep || isAriaHiddenForbiddenOnElement(element)) {
      return;
    }

    if (keepChain.has(element)) {
      collectHiddenTargets(element, keep, keepChain, out);
      return;
    }

    out.add(element);
  });
}

/**
 * Hides every element of the container from assistive technology except the
 * topmost modal and the ancestors it sits inside, and unhides what no longer
 * needs hiding. Elements that were already `aria-hidden` before the manager
 * touched them are left untouched.
 */
function syncAriaHidden(containerInfo: Container): void {
  const { container, modals } = containerInfo;
  const top = modals[modals.length - 1];
  const keep = top.modalRef;

  const next = new Set<Element>();
  collectHiddenTargets(container, keep, getKeepChain(keep, container), next);

  next.forEach((element) => {
    if (!containerInfo.hiddenSet.has(element) && element.getAttribute('aria-hidden') === 'true') {
      next.delete(element);
    }
  });

  // Hands the accessibility tree back to a parent dialog when a nested one closes.
  containerInfo.hiddenSet.forEach((element) => {
    if (!next.has(element)) {
      ariaHidden(element, false);
    }
  });
  next.forEach((element) => ariaHidden(element, true));

  if (keep) {
    ariaHidden(keep, false);
  }

  containerInfo.hiddenSet = next;
}

// The viewport takes its gutter from the root element. Any other scroll container uses its own.
// Unlike overflow, scrollbar-gutter is never propagated from <body>.
// https://drafts.csswg.org/css-overflow-3/#scrollbar-gutter-property
function getGutterElement(scrollContainer: HTMLElement, doc: Document): HTMLElement {
  return isDocumentScroller(scrollContainer, doc) ? doc.documentElement : scrollContainer;
}

// A stable gutter keeps the scrollbar space reserved while the scroll is locked, so there is
// no layout shift to compensate for.
// Reading the computed value doubles as a feature detection: browsers that don't support
// scrollbar-gutter resolve it to an empty string.
function hasStableScrollbarGutter(element: HTMLElement, win: Window): boolean {
  return win.getComputedStyle(element).getPropertyValue('scrollbar-gutter').includes('stable');
}

// A gutter is only reserved on a scroll container, so it is inert while the overflow is
// `visible` or `clip`.
function isScrollContainer(element: HTMLElement, win: Window): boolean {
  const { overflowY } = win.getComputedStyle(element);
  return overflowY !== 'visible' && overflowY !== 'clip';
}

function handleContainer(containerInfo: Container, props: ManagedModalProps) {
  const restoreStyle: Array<{
    /**
     * CSS property name (HYPHEN CASE) to be modified.
     */
    property: string;
    el: HTMLElement | SVGElement;
    value: string;
  }> = [];
  const container = containerInfo.container;

  if (!props.disableScrollLock) {
    let scrollContainer: HTMLElement;

    if (container.parentNode instanceof DocumentFragment) {
      scrollContainer = ownerDocument(container).body;
    } else {
      // Support html overflow-y: scroll for scroll stability between pages
      // https://css-tricks.com/snippets/css/force-vertical-scrollbar/
      const parent = container.parentElement;
      const containerWindow = ownerWindow(container);
      scrollContainer =
        parent?.nodeName === 'HTML' &&
        containerWindow.getComputedStyle(parent).overflowY === 'scroll'
          ? parent
          : container;
    }

    const scrollWindow = ownerWindow(scrollContainer);
    const gutterElement = getGutterElement(scrollContainer, ownerDocument(scrollContainer));
    const gutterIsStable = hasStableScrollbarGutter(gutterElement, scrollWindow);

    // Blocking the scroll below makes the container a scroll container, which would start
    // reserving a gutter that is inert right now. Hold it at `auto` for the duration.
    if (
      gutterIsStable &&
      gutterElement === scrollContainer &&
      !isScrollContainer(scrollContainer, scrollWindow)
    ) {
      restoreStyle.push({
        value: scrollContainer.style.scrollbarGutter,
        property: 'scrollbar-gutter',
        el: scrollContainer,
      });
      scrollContainer.style.setProperty('scrollbar-gutter', 'auto');
    }

    // Read the size while the scrollbar is still there, so applying overflow hidden below
    // can't jump the scroll position.
    const scrollbarSize = getScrollbarSize(scrollWindow);

    // Overlay scrollbars (e.g. macOS, Windows 11) have zero width. There is nothing to
    // compensate for, and writing the inline styles anyway would freeze the current padding,
    // overriding later theme/CSS changes.
    if (scrollbarSize > 0 && isOverflowing(scrollContainer) && !gutterIsStable) {
      restoreStyle.push({
        value: scrollContainer.style.paddingRight,
        property: 'padding-right',
        el: scrollContainer,
      });
      // Use computed style, here to get the real padding to add our scrollbar width.
      scrollContainer.style.paddingRight = `${getPaddingRight(scrollContainer) + scrollbarSize}px`;

      // .mui-fixed is a global helper.
      const fixedElements = ownerDocument(container).querySelectorAll('.mui-fixed');
      [].forEach.call(fixedElements, (element: HTMLElement | SVGElement) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: 'padding-right',
          el: element,
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }

    // Block the scroll even if no scrollbar is visible to account for mobile keyboard
    // screensize shrink.
    restoreStyle.push(
      {
        value: scrollContainer.style.overflow,
        property: 'overflow',
        el: scrollContainer,
      },
      {
        value: scrollContainer.style.overflowX,
        property: 'overflow-x',
        el: scrollContainer,
      },
      {
        value: scrollContainer.style.overflowY,
        property: 'overflow-y',
        el: scrollContainer,
      },
    );

    scrollContainer.style.overflow = 'hidden';
  }

  const restore = () => {
    restoreStyle.forEach(({ value, el, property }) => {
      if (value) {
        el.style.setProperty(property, value);
      } else {
        el.style.removeProperty(property);
      }
    });
  };

  return restore;
}

interface Modal {
  mount: Element;
  modalRef: Element;
}

interface Container {
  container: HTMLElement;
  hiddenSet: Set<Element>;
  modals: Modal[];
  restore: null | (() => void);
}

/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export class ModalManager {
  private containers: Container[] = [];

  private modals: Modal[] = [];

  add(modal: Modal, container: HTMLElement): number {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }

    modalIndex = this.modals.length;
    this.modals.push(modal);

    // If the modal we are adding is already in the DOM.
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }

    const containerIndex = this.containers.findIndex((item) => item.container === container);

    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      syncAriaHidden(this.containers[containerIndex]);
      return modalIndex;
    }

    const containerInfo: Container = {
      modals: [modal],
      container,
      restore: null,
      hiddenSet: new Set(),
    };
    this.containers.push(containerInfo);
    syncAriaHidden(containerInfo);

    return modalIndex;
  }

  mount(modal: Modal, props: ManagedModalProps): void {
    const containerIndex = this.containers.findIndex((item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];

    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }

  remove(modal: Modal, ariaHiddenState = true): number {
    const modalIndex = this.modals.indexOf(modal);

    if (modalIndex === -1) {
      return modalIndex;
    }

    const containerIndex = this.containers.findIndex((item) => item.modals.includes(modal));
    const containerInfo = this.containers[containerIndex];

    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);

    // If that was the last modal in a container, clean up the container.
    if (containerInfo.modals.length === 0) {
      // The modal might be closed before it had the chance to be mounted in the DOM.
      if (containerInfo.restore) {
        containerInfo.restore();
      }

      if (modal.modalRef) {
        // In case the modal wasn't in the DOM yet.
        ariaHidden(modal.modalRef, ariaHiddenState);
      }

      containerInfo.hiddenSet.forEach((element) => ariaHidden(element, false));
      containerInfo.hiddenSet.clear();
      this.containers.splice(containerIndex, 1);
    } else {
      syncAriaHidden(containerInfo);

      if (modal.modalRef) {
        ariaHidden(modal.modalRef, ariaHiddenState);
      }
    }

    return modalIndex;
  }

  isTopModal(modal: Modal): boolean {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
}
