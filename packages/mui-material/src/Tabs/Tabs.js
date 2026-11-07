'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import useSlotProps from '@mui/utils/useSlotProps';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import debounce from '../utils/debounce';
import animate from '../internal/animate';
import useReducedMotion from '../transitions/useReducedMotion';
import ScrollbarSize from './ScrollbarSize';
import TabScrollButton from '../TabScrollButton';
import useEventCallback from '../utils/useEventCallback';
import tabsClasses, { getTabsUtilityClass } from './tabsClasses';
import ownerWindow from '../utils/ownerWindow';
import isLayoutSupported from '../utils/isLayoutSupported';
import useSlot from '../utils/useSlot';
import contains from '../utils/contains';
import getActiveElement from '../utils/getActiveElement';
import ownerDocument from '../utils/ownerDocument';
import useForkRef from '../utils/useForkRef';
import { RovingTabIndexContext, useRovingTabIndexRoot } from '../utils/useRovingTabIndex';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const {
    vertical,
    fixed,
    hideScrollbar,
    scrollableX,
    scrollableY,
    centered,
    scrollButtonsHideMobile,
    classes,
  } = ownerState;

  const slots = {
    root: ['root', vertical && 'vertical'],
    scroller: [
      'scroller',
      fixed && 'fixed',
      hideScrollbar && 'hideScrollbar',
      scrollableX && 'scrollableX',
      scrollableY && 'scrollableY',
    ],
    list: ['list', vertical && 'vertical', centered && 'centered'],
    indicator: ['indicator'],
    scrollButtons: ['scrollButtons', scrollButtonsHideMobile && 'scrollButtonsHideMobile'],
    scrollableX: [scrollableX && 'scrollableX'],
    hideScrollbar: [hideScrollbar && 'hideScrollbar'],
  };

  return composeClasses(slots, getTabsUtilityClass, classes);
};

const TabsRoot = styled('div', {
  name: 'MuiTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${tabsClasses.scrollButtons}`]: styles.scrollButtons },
      {
        [`& .${tabsClasses.scrollButtons}`]:
          ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile,
      },
      styles.root,
      ownerState.vertical && styles.vertical,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    overflow: 'hidden',
    minHeight: 48,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    variants: [
      {
        props: ({ ownerState }) => ownerState.vertical,
        style: {
          flexDirection: 'column',
        },
      },
      {
        props: ({ ownerState }) => ownerState.scrollButtonsHideMobile,
        style: {
          [`& .${tabsClasses.scrollButtons}`]: {
            [theme.breakpoints.down('sm')]: {
              display: 'none',
            },
          },
        },
      },
    ],
  })),
);

const TabsScroller = styled('div', {
  name: 'MuiTabs',
  slot: 'Scroller',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.scroller,
      ownerState.fixed && styles.fixed,
      ownerState.hideScrollbar && styles.hideScrollbar,
      ownerState.scrollableX && styles.scrollableX,
      ownerState.scrollableY && styles.scrollableY,
    ];
  },
})({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  variants: [
    {
      props: ({ ownerState }) => ownerState.fixed,
      style: {
        overflowX: 'hidden',
        width: '100%',
      },
    },
    {
      props: ({ ownerState }) => ownerState.hideScrollbar,
      style: {
        // Hide dimensionless scrollbar on macOS
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Safari + Chrome
        },
      },
    },
    {
      props: ({ ownerState }) => ownerState.scrollableX,
      style: {
        overflowX: 'auto',
        overflowY: 'hidden',
      },
    },
    {
      props: ({ ownerState }) => ownerState.scrollableY,
      style: {
        overflowY: 'auto',
        overflowX: 'hidden',
      },
    },
  ],
});

const List = styled('div', {
  name: 'MuiTabs',
  slot: 'List',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.list, ownerState.centered && styles.centered];
  },
})({
  display: 'flex',
  variants: [
    {
      props: ({ ownerState }) => ownerState.vertical,
      style: {
        flexDirection: 'column',
      },
    },
    {
      props: ({ ownerState }) => ownerState.centered,
      style: {
        justifyContent: 'center',
      },
    },
  ],
});

const TabsIndicator = styled('span', {
  name: 'MuiTabs',
  slot: 'Indicator',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    ...getTransitionStyles(theme),
    variants: [
      {
        props: {
          indicatorColor: 'primary',
        },
        style: {
          backgroundColor: (theme.vars || theme).palette.primary.main,
        },
      },
      {
        props: {
          indicatorColor: 'secondary',
        },
        style: {
          backgroundColor: (theme.vars || theme).palette.secondary.main,
        },
      },
      {
        props: ({ ownerState }) => ownerState.vertical,
        style: {
          height: '100%',
          width: 2,
          right: 0,
        },
      },
    ],
  })),
);

const TabsScrollbarSize = styled(ScrollbarSize)({
  overflowX: 'auto',
  overflowY: 'hidden',
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // Safari + Chrome
  },
});

const defaultIndicatorStyle = {};

// scroll-padding computes to 'auto', a <length>, or a <percentage> of the scrollport
function resolveScrollPadding(value, scrollportSize) {
  const number = parseFloat(value);
  if (Number.isNaN(number)) {
    return 0;
  }
  return value.endsWith('%') ? (number / 100) * scrollportSize : number;
}

function getScrollerScale(renderedSize, layoutSize) {
  if (!renderedSize || Math.abs(renderedSize - layoutSize) < 1) {
    return 1;
  }
  return renderedSize / layoutSize;
}

// Dev-only: tracks per-`Tabs` instance (keyed by its ref) whether the invalid-value warning was
// already logged, so it isn't repeated across the several effects that call `getTabsMeta`.
// Only referenced from `process.env.NODE_ENV !== 'production'` blocks; the `@__PURE__` annotation
// lets minifiers drop it (and the `WeakMap` allocation) entirely from production builds.
const warnedTabValueInvalid = /* @__PURE__ */ new WeakMap();
let warnedOnceTabPresent = false;

const Tabs = React.forwardRef(function Tabs(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTabs' });
  const theme = useTheme();
  const isRtl = useRtl();
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    action,
    centered = false,
    children: childrenProp,
    className,
    component = 'div',
    allowScrollButtonsMobile = false,
    indicatorColor = 'primary',
    onChange,
    orientation = 'horizontal',
    scrollButtons = 'auto',
    selectionFollowsFocus,
    slots = {},
    slotProps = {},
    textColor = 'primary',
    value,
    variant = 'standard',
    visibleScrollbar = false,
    ...other
  } = props;
  const scrollable = variant === 'scrollable';
  const vertical = orientation === 'vertical';

  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const offsetSize = vertical ? 'offsetHeight' : 'offsetWidth';
  const size = vertical ? 'height' : 'width';

  const ownerState = {
    ...props,
    component,
    allowScrollButtonsMobile,
    indicatorColor,
    orientation,
    vertical,
    scrollButtons,
    textColor,
    variant,
    visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile,
  };

  const classes = useUtilityClasses(ownerState);

  const startScrollButtonIconProps = useSlotProps({
    elementType: slots.startScrollButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    ownerState,
  });

  const endScrollButtonIconProps = useSlotProps({
    elementType: slots.endScrollButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    ownerState,
  });

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error(
        'MUI: You can not use the `centered={true}` and `variant="scrollable"` properties ' +
          'at the same time on a `Tabs` component.',
      );
    }
  }

  const [indicatorStyle, setIndicatorStyle] = React.useState(defaultIndicatorStyle);
  const [displayStartScroll, setDisplayStartScroll] = React.useState(false);
  const [displayEndScroll, setDisplayEndScroll] = React.useState(false);
  const [updateScrollObserver, setUpdateScrollObserver] = React.useState(false);
  const selectedValue = value === false ? null : value;
  // Tracks whether DOM focus is currently inside the tab list. When it is, roving focus
  // should follow in-list keyboard movement instead of snapping back to `selectedValue`.
  const [isFocusWithinList, setIsFocusWithinList] = React.useState(false);

  const [scrollerStyle, setScrollerStyle] = React.useState({
    overflow: 'hidden',
    scrollbarWidth: 0,
  });

  const valueToIndex = new Map();
  const tabsRef = React.useRef(null);
  const tabListRef = React.useRef(null);

  const mounted = indicatorStyle !== defaultIndicatorStyle;

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        clientHeight: tabsNode.clientHeight,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        scale: getScrollerScale(rect[size], tabsNode[offsetSize]),
      };
    }

    let tabMeta;
    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;

      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        if (process.env.NODE_ENV !== 'production') {
          // `getTabsMeta` runs from several effects, so guard against logging the warning repeatedly.
          if (!tab && !warnedTabValueInvalid.has(tabsRef)) {
            warnedTabValueInvalid.set(tabsRef, true);
            console.error(
              [
                `MUI: The \`value\` provided to the Tabs component is invalid.`,
                `None of the Tabs' children match with "${value}".`,
                valueToIndex.keys
                  ? `You can provide one of the following values: ${Array.from(
                      valueToIndex.keys(),
                    ).join(', ')}.`
                  : null,
              ].join('\n'),
            );
          }
        }
        tabMeta = tab ? tab.getBoundingClientRect() : null;

        if (process.env.NODE_ENV !== 'production') {
          if (
            isLayoutSupported() &&
            !warnedOnceTabPresent &&
            tabMeta &&
            tabMeta.width === 0 &&
            tabMeta.height === 0 &&
            // if the whole Tabs component is hidden, don't warn
            tabsMeta.clientWidth !== 0
          ) {
            tabsMeta = null;
            console.error(
              [
                'MUI: The `value` provided to the Tabs component is invalid.',
                `The Tab with this \`value\` ("${value}") is not part of the document layout.`,
                "Make sure the tab item is present in the document or that it's not `display: none`.",
              ].join('\n'),
            );

            warnedOnceTabPresent = true;
          }
        }
      }
    }
    return { tabsMeta, tabMeta };
  };

  const updateIndicatorState = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    let startValue = 0;
    let startIndicator;
    const scale = tabsMeta?.scale ?? 1;

    if (vertical) {
      startIndicator = 'top';
      if (tabMeta && tabsMeta) {
        startValue = (tabMeta.top - tabsMeta.top) / scale + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? 'right' : 'left';
      if (tabMeta && tabsMeta) {
        startValue =
          (isRtl ? -1 : 1) *
          ((tabMeta[startIndicator] - tabsMeta[startIndicator]) / scale + tabsMeta.scrollLeft);
      }
    }

    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] / scale : 0,
    };

    if (
      typeof indicatorStyle[startIndicator] !== 'number' ||
      typeof indicatorStyle[size] !== 'number'
    ) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  const scroll = (scrollValue, { animation = true } = {}) => {
    if (animation && !reducedMotion.shouldReduceMotion) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard,
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };

  const moveTabsScroll = (delta) => {
    let scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
    }

    scroll(scrollValue);
  };

  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);

    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        // If the first item is longer than the container size, then only scroll
        // by the container size.
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }
      totalSize += tab[clientSize];
    }

    return totalSize;
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  const [ScrollbarSlot, { onChange: scrollbarOnChange, ...scrollbarSlotProps }] = useSlot(
    'scrollbar',
    {
      className: clsx(classes.scrollableX, classes.hideScrollbar),
      elementType: TabsScrollbarSize,
      shouldForwardComponentProp: true,
      externalForwardedProps,
      ownerState,
    },
  );

  // TODO Remove <ScrollbarSize /> as browser support for hiding the scrollbar
  // with CSS improves.
  const handleScrollbarSizeChange = React.useCallback(
    (scrollbarWidth) => {
      scrollbarOnChange?.(scrollbarWidth);
      setScrollerStyle({
        overflow: null,
        scrollbarWidth,
      });
    },
    [scrollbarOnChange],
  );

  const [ScrollButtonsSlot, scrollButtonSlotProps] = useSlot('scrollButtons', {
    className: classes.scrollButtons,
    elementType: TabScrollButton,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      orientation,
      slots: {
        StartScrollButtonIcon: slots.startScrollButtonIcon,
        EndScrollButtonIcon: slots.endScrollButtonIcon,
      },
      slotProps: {
        startScrollButtonIcon: startScrollButtonIconProps,
        endScrollButtonIcon: endScrollButtonIconProps,
      },
    },
  });

  const getConditionalElements = () => {
    const conditionalElements = {};

    conditionalElements.scrollbarSizeListener = scrollable ? (
      <ScrollbarSlot {...scrollbarSlotProps} onChange={handleScrollbarSizeChange} />
    ) : null;

    const scrollButtonsActive = displayStartScroll || displayEndScroll;
    const showScrollButtons =
      scrollable && ((scrollButtons === 'auto' && scrollButtonsActive) || scrollButtons === true);

    conditionalElements.scrollButtonStart = showScrollButtons ? (
      <ScrollButtonsSlot
        direction={isRtl ? 'right' : 'left'}
        onClick={handleStartScrollClick}
        disabled={!displayStartScroll}
        {...scrollButtonSlotProps}
      />
    ) : null;

    conditionalElements.scrollButtonEnd = showScrollButtons ? (
      <ScrollButtonsSlot
        direction={isRtl ? 'left' : 'right'}
        onClick={handleEndScrollClick}
        disabled={!displayEndScroll}
        {...scrollButtonSlotProps}
      />
    ) : null;

    return conditionalElements;
  };

  const scrollSelectedIntoView = useEventCallback((animation) => {
    const { tabsMeta, tabMeta } = getTabsMeta();

    if (!tabMeta || !tabsMeta) {
      return;
    }

    const scrollerComputedStyle = ownerWindow(tabsRef.current).getComputedStyle(tabsRef.current);
    const scrollportSize = vertical ? tabsMeta.clientHeight : tabsMeta.clientWidth;
    const scrollPaddingStart = resolveScrollPadding(
      scrollerComputedStyle[vertical ? 'scrollPaddingTop' : 'scrollPaddingLeft'],
      scrollportSize,
    );
    const scrollPaddingEnd = resolveScrollPadding(
      scrollerComputedStyle[vertical ? 'scrollPaddingBottom' : 'scrollPaddingRight'],
      scrollportSize,
    );

    // The edges the tab has to sit between: the scrollport shrunk by its scroll-padding.
    const { scale } = tabsMeta;
    const scrollportStart = tabsMeta[start] + scrollPaddingStart * scale;
    const scrollportEnd = tabsMeta[end] - scrollPaddingEnd * scale;
    const startAlignedScroll = tabsMeta[scrollStart] + (tabMeta[start] - scrollportStart) / scale;

    if (tabMeta[start] < scrollportStart) {
      // start edge is out of view, or covered by the scroll-padding
      scroll(startAlignedScroll, { animation });
    } else if (tabMeta[end] > scrollportEnd) {
      if (tabMeta[end] - tabMeta[start] > scrollportEnd - scrollportStart) {
        // The tab doesn't fit between the scroll-padding edges, so both can't be satisfied.
        // Align the start edge, like `scrollIntoView({ block: 'nearest' })` does for a target
        // larger than the scrollport; otherwise the two branches take turns on every call and
        // the scroller oscillates between them.
        scroll(startAlignedScroll, { animation });
      } else {
        // end edge is out of view, or covered by the scroll-padding
        scroll(tabsMeta[scrollStart] + (tabMeta[end] - scrollportEnd) / scale, { animation });
      }
    }
  });

  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== false) {
      setUpdateScrollObserver(!updateScrollObserver);
    }
  });

  React.useEffect(() => {
    const handleResize = debounce(() => {
      // If the Tabs component is replaced by Suspense with a fallback, the last
      // ResizeObserver's handler that runs because of the change in the layout is trying to
      // access a dom node that is no longer there (as the fallback component is being shown instead).
      // See https://github.com/mui/material-ui/issues/33276
      // TODO: Add tests that will ensure the component is not failing when
      // replaced by Suspense with a fallback, once React is updated to version 18
      if (tabsRef.current) {
        updateIndicatorState();
      }
    });

    let resizeObserver;

    /**
     * @type {MutationCallback}
     */
    const handleMutation = (records) => {
      records.forEach((record) => {
        record.removedNodes.forEach((item) => {
          resizeObserver?.unobserve(item);
        });
        record.addedNodes.forEach((item) => {
          resizeObserver?.observe(item);
        });
      });
      handleResize();
      updateScrollButtonState();
    };

    const win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);

    let mutationObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach((child) => {
        resizeObserver.observe(child);
      });
    }

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabListRef.current, {
        childList: true,
      });
    }

    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  /**
   * Toggle visibility of start and end scroll buttons
   * Using IntersectionObserver on first and last Tabs.
   */
  React.useEffect(() => {
    const tabListChildren = Array.from(tabListRef.current.children);
    const length = tabListChildren.length;

    if (
      typeof IntersectionObserver !== 'undefined' &&
      length > 0 &&
      scrollable &&
      scrollButtons !== false
    ) {
      const firstTab = tabListChildren[0];
      const lastTab = tabListChildren[length - 1];
      const observerOptions = {
        root: tabsRef.current,
        threshold: 0.99,
      };

      const handleScrollButtonStart = (entries) => {
        setDisplayStartScroll(!entries[0].isIntersecting);
      };
      const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
      firstObserver.observe(firstTab);

      const handleScrollButtonEnd = (entries) => {
        setDisplayEndScroll(!entries[0].isIntersecting);
      };
      const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
      lastObserver.observe(lastTab);

      return () => {
        firstObserver.disconnect();
        lastObserver.disconnect();
      };
    }

    return undefined;
  }, [scrollable, scrollButtons, updateScrollObserver, childrenProp?.length]);

  React.useEffect(() => {
    updateIndicatorState();
  });

  React.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);

  React.useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !scrollable || scrollButtons !== 'auto') {
      return undefined;
    }

    // Mounting the scroll buttons shrinks the scroller after `scrollSelectedIntoView` has run,
    // which can push the selected tab out of view without changing `indicatorStyle`.
    const scrollerResizeObserver = new ResizeObserver(() => {
      scrollSelectedIntoView(false);
    });
    scrollerResizeObserver.observe(tabsRef.current);

    return () => {
      scrollerResizeObserver.disconnect();
    };
  }, [scrollable, scrollButtons, scrollSelectedIntoView]);

  React.useImperativeHandle(
    action,
    () => ({
      updateIndicator: updateIndicatorState,
      updateScrollButtons: updateScrollButtonState,
    }),
    [updateIndicatorState, updateScrollButtonState],
  );

  const [IndicatorSlot, indicatorSlotProps] = useSlot('indicator', {
    className: classes.indicator,
    elementType: TabsIndicator,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: indicatorStyle,
    },
  });

  const indicator = <IndicatorSlot {...indicatorSlotProps} />;
  const rovingContainer = useRovingTabIndexRoot({
    activeItemId: isFocusWithinList ? undefined : selectedValue,
    orientation,
    isRtl,
  });
  const rovingContainerProps = rovingContainer.getContainerProps();

  const validChildren = React.Children.toArray(childrenProp)
    .filter(React.isValidElement)
    .map((child, index) => {
      const childValue = child.props.value === undefined ? index : child.props.value;

      if (process.env.NODE_ENV !== 'production') {
        if (isFragment(child)) {
          console.error(
            [
              "MUI: The Tabs component doesn't accept a Fragment as a child.",
              'Consider providing an array instead.',
            ].join('\n'),
          );
        }
      }

      valueToIndex.set(childValue, index);

      return { child, index, childValue };
    });

  const children = validChildren.map(({ child, childValue }) => {
    const selected = childValue === value;

    return React.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue,
    });
  });

  const conditionalElements = getConditionalElements();

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: TabsRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component,
    },
    ownerState,
  });

  const [ScrollerSlot, scrollerSlotProps] = useSlot('scroller', {
    ref: tabsRef,
    className: classes.scroller,
    elementType: TabsScroller,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar
          ? undefined
          : -scrollerStyle.scrollbarWidth,
      },
    },
  });

  const mergedRef = useForkRef(rovingContainerProps.ref, tabListRef);

  const handleKeyDown = (event) => {
    const list = tabListRef.current;
    const currentFocus = getActiveElement(ownerDocument(list));
    // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation
    const role = currentFocus?.getAttribute('role');
    if (role !== 'tab') {
      return;
    }

    rovingContainerProps.onKeyDown(event);
  };

  const [ListSlot, listSlotProps] = useSlot('list', {
    ref: mergedRef,
    className: classes.list,
    elementType: List,
    externalForwardedProps,
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onBlur: (event) => {
        if (!contains(event.currentTarget, event.relatedTarget)) {
          setIsFocusWithinList(false);
        }

        handlers.onBlur?.(event);
      },
      onKeyDown: (event) => {
        handleKeyDown(event);
        handlers.onKeyDown?.(event);
      },
      onFocus: (event) => {
        setIsFocusWithinList(true);
        rovingContainerProps.onFocus(event);
        handlers.onFocus?.(event);
      },
    }),
  });

  return (
    <RootSlot {...rootSlotProps}>
      {conditionalElements.scrollButtonStart}
      {conditionalElements.scrollbarSizeListener}
      <ScrollerSlot {...scrollerSlotProps}>
        {/* The tablist isn't interactive but the tabs are */}
        <ListSlot
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-orientation={orientation === 'vertical' ? 'vertical' : null}
          role="tablist"
          {...listSlotProps}
        >
          <RovingTabIndexContext.Provider value={rovingContainer}>
            {children}
          </RovingTabIndexContext.Provider>
        </ListSlot>
        {mounted && indicator}
      </ScrollerSlot>
      {conditionalElements.scrollButtonEnd}
    </RootSlot>
  );
});

Tabs.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: refType,
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: PropTypes.bool,
  /**
   * The label for the Tabs as a string.
   */
  'aria-label': PropTypes.string,
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: PropTypes /* @typescript-to-proptypes-ignore */.oneOf(['auto', false, true]),
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    endScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    list: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrollbar: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scrollButtons: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    scroller: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startScrollButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    endScrollButtonIcon: PropTypes.elementType,
    indicator: PropTypes.elementType,
    list: PropTypes.elementType,
    root: PropTypes.elementType,
    scrollbar: PropTypes.elementType,
    scrollButtons: PropTypes.elementType,
    scroller: PropTypes.elementType,
    startScrollButtonIcon: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.any,
  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: PropTypes.bool,
};

export default Tabs;
