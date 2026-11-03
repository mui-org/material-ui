'use client';
import composeClasses from '@mui/utils/composeClasses';
import * as ReactDOM from 'react-dom';
import { styled, useThemeProps } from '@mui/material/styles';
import {
  handleBreakpoints,
  unstable_resolveBreakpointValues as resolveBreakpointValues,
} from '@mui/system';
import useForkRef from '@mui/utils/useForkRef';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import deepmerge from '@mui/utils/deepmerge';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import type { ResponsiveStyleValue, SxProps } from '@mui/system';
import type { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import type { Theme } from '@mui/material/styles';
import { getMasonryUtilityClass } from './masonryClasses';
import type { MasonryClasses } from './masonryClasses';

export interface MasonryOwnProps {
  /**
   * The content of the component.
   */
  children: NonNullable<React.ReactNode>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MasonryClasses> | undefined;
  /**
   * Number of columns.
   * @default 4
   */
  columns?: ResponsiveStyleValue<number | string> | undefined;
  /**
   * The default number of columns of the component. This is provided for server-side rendering.
   */
  defaultColumns?: number | undefined;
  /**
   * The default height of the component in px. This is provided for server-side rendering.
   */
  defaultHeight?: number | undefined;
  /**
   * The default spacing of the component. Like `spacing`, it is a factor of the theme's spacing. This is provided for server-side rendering.
   */
  defaultSpacing?: number | undefined;
  /**
   * Defines the space between children. It is a factor of the theme's spacing.
   * @default 1
   */
  spacing?: ResponsiveStyleValue<number | string> | undefined;
  /**
   * Allows using sequential order rather than adding to shortest column
   * @default false
   */
  sequential?: boolean | undefined;
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface MasonryTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & MasonryOwnProps;
  defaultComponent: RootComponent;
}

type OwnerState = MasonryOwnProps & Record<string, any>;

/** @internal */
export const parseToNumber = (val: string) => {
  return Number(val.replace('px', ''));
};

const lineBreakStyle = {
  flexBasis: '100%',
  width: 0,
  margin: 0,
  padding: 0,
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

/** @internal */
export const getStyle = ({ ownerState, theme }: any) => {
  let styles: any = {
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'flex-start',
    boxSizing: 'border-box',
    '& > *': {
      boxSizing: 'border-box',
    },
  };

  const stylesSSR: any = {};
  // Only applicable for Server-Side Rendering
  if (ownerState.isSSR) {
    const orderStyleSSR: any = {};
    const { defaultSpacing: defaultSpacingProp } = ownerState;
    // Treat a numeric string as a spacing factor, like the client-side styles.
    const defaultSpacing = theme.spacing(
      typeof defaultSpacingProp === 'string' && !Number.isNaN(Number(defaultSpacingProp))
        ? Number(defaultSpacingProp)
        : defaultSpacingProp,
    );
    for (let i = 1; i <= ownerState.defaultColumns; i += 1) {
      orderStyleSSR[
        `&:nth-of-type(${ownerState.defaultColumns}n+${i % ownerState.defaultColumns})`
      ] = {
        order: i,
      };
    }
    stylesSSR.height = ownerState.defaultHeight;
    stylesSSR.margin = `calc(0px - (${defaultSpacing} / 2))`;
    stylesSSR['& > *'] = {
      ...styles['& > *'],
      ...orderStyleSSR,
      margin: `calc(${defaultSpacing} / 2)`,
      width: `calc(${(100 / ownerState.defaultColumns).toFixed(2)}% - ${defaultSpacing})`,
    };

    return {
      ...styles,
      ...stylesSSR,
    };
  }

  const spacingValues = resolveBreakpointValues({
    values: ownerState.spacing,
    breakpoints: theme.breakpoints.values,
  });

  const spacingStyleFromPropValue = (propValue: any) => {
    let spacing: any;
    // in case of string/number value
    if (
      (typeof propValue === 'string' && !Number.isNaN(Number(propValue))) ||
      typeof propValue === 'number'
    ) {
      const themeSpacingValue = Number(propValue);
      spacing = theme.spacing(themeSpacingValue);
    } else {
      spacing = propValue;
    }

    return {
      margin: `calc(0px - (${spacing} / 2))`,
      '& > *': {
        margin: `calc(${spacing} / 2)`,
      },
      ...(ownerState.maxColumnHeight && {
        height: `calc(${ownerState.maxColumnHeight}px + ${spacing})`,
      }),
    };
  };

  styles = deepmerge(
    styles,
    handleBreakpoints({ theme }, spacingValues, spacingStyleFromPropValue),
  );

  const columnValues = resolveBreakpointValues({
    values: ownerState.columns,
    breakpoints: theme.breakpoints.values,
  });

  const columnStyleFromPropValue = (propValue: any) => {
    const columnValue = Number(propValue);
    const width = `${(100 / columnValue).toFixed(2)}%`;
    const spacing =
      (typeof spacingValues === 'string' && !Number.isNaN(Number(spacingValues))) ||
      typeof spacingValues === 'number'
        ? theme.spacing(Number(spacingValues))
        : '0px';
    return {
      '& > *': { width: `calc(${width} - ${spacing})` },
    };
  };

  styles = deepmerge(styles, handleBreakpoints({ theme }, columnValues, columnStyleFromPropValue));

  // configure width for responsive spacing values
  if (typeof spacingValues === 'object') {
    styles = deepmerge(
      styles,
      handleBreakpoints({ theme }, spacingValues, (propValue: any, breakpoint: any) => {
        if (breakpoint) {
          const lastBreakpoint = Object.keys(columnValues).pop();
          const spacing =
            (typeof propValue === 'string' && !Number.isNaN(Number(propValue))) ||
            typeof propValue === 'number'
              ? theme.spacing(Number(propValue))
              : propValue;
          const column =
            typeof columnValues === 'object'
              ? columnValues[breakpoint] || columnValues[lastBreakpoint as string]
              : columnValues;
          const width = `${(100 / column).toFixed(2)}%`;
          return {
            '& > *': { width: `calc(${width} - ${spacing})` },
          };
        }
        return null;
      }),
    );
  }

  return styles;
};

const MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
})<{ ownerState: OwnerState }>(getStyle);
/**
 *
 * Demos:
 *
 * - [Masonry](https://next.mui.com/material-ui/react-masonry/)
 *
 * API:
 *
 * - [Masonry API](https://next.mui.com/material-ui/api/masonry/)
 */
const Masonry = React.forwardRef(function Masonry(
  inProps: MasonryOwnProps & {
    component?: React.ElementType | undefined;
    className?: string | undefined;
  },
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const {
    children,
    className,
    component = 'div',
    columns = 4,
    spacing = 1,
    sequential = false,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    ...other
  } = props;

  const masonryRef = React.useRef<any>(undefined);
  const [maxColumnHeight, setMaxColumnHeight] = React.useState<number | undefined>();
  const isSSR =
    !maxColumnHeight &&
    defaultHeight &&
    defaultColumns !== undefined &&
    defaultSpacing !== undefined;
  const [numberOfLineBreaks, setNumberOfLineBreaks] = React.useState(
    isSSR ? defaultColumns - 1 : 0,
  );

  const ownerState = {
    ...props,
    spacing,
    columns,
    maxColumnHeight,
    defaultColumns,
    defaultHeight,
    defaultSpacing,
    isSSR,
  };

  const classes = useUtilityClasses(ownerState);

  const handleResize = React.useCallback(() => {
    if (!masonryRef.current) {
      return;
    }

    const masonry = masonryRef.current;
    const firstVisibleChild = Array.from<any>(masonry.childNodes).find(
      (child) =>
        child.nodeType === Node.ELEMENT_NODE &&
        child.dataset.class !== 'line-break' &&
        window.getComputedStyle(child).display !== 'none',
    );

    if (!firstVisibleChild) {
      return;
    }

    const parentWidth = masonry.clientWidth;
    const firstChildWidth = firstVisibleChild.clientWidth;

    if (parentWidth === 0 || firstChildWidth === 0) {
      return;
    }

    const firstChildComputedStyle = window.getComputedStyle(firstVisibleChild);
    const firstChildMarginLeft = parseToNumber(firstChildComputedStyle.marginLeft);
    const firstChildMarginRight = parseToNumber(firstChildComputedStyle.marginRight);

    const currentNumberOfColumns = Math.round(
      parentWidth / (firstChildWidth + firstChildMarginLeft + firstChildMarginRight),
    );

    const columnHeights = new Array(currentNumberOfColumns).fill(0);
    let skip = false;
    let nextOrder = 1;
    masonry.childNodes.forEach((child: any) => {
      if (child.nodeType !== Node.ELEMENT_NODE || child.dataset.class === 'line-break' || skip) {
        return;
      }
      const childComputedStyle = window.getComputedStyle(child);
      if (childComputedStyle.display === 'none') {
        return;
      }
      const childMarginTop = parseToNumber(childComputedStyle.marginTop);
      const childMarginBottom = parseToNumber(childComputedStyle.marginBottom);
      const childHeight = parseToNumber(childComputedStyle.height)
        ? Math.ceil(parseToNumber(childComputedStyle.height)) + childMarginTop + childMarginBottom
        : 0;
      if (childHeight === 0) {
        skip = true;
        return;
      }
      for (let i = 0; i < child.childNodes.length; i += 1) {
        const nestedChild = child.childNodes[i];
        if (nestedChild.tagName === 'IMG' && nestedChild.clientHeight === 0) {
          skip = true;
          break;
        }
      }
      if (!skip) {
        if (sequential) {
          columnHeights[nextOrder - 1] += childHeight;
          child.style.order = nextOrder;
          nextOrder += 1;
          if (nextOrder > currentNumberOfColumns) {
            nextOrder = 1;
          }
        } else {
          const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
          columnHeights[currentMinColumnIndex] += childHeight;
          const order = currentMinColumnIndex + 1;
          child.style.order = order;
        }
      }
    });
    if (!skip) {
      queueMicrotask(() => {
        if (masonryRef.current) {
          ReactDOM.flushSync(() => {
            setMaxColumnHeight(Math.max(...columnHeights));
            setNumberOfLineBreaks(currentNumberOfColumns > 0 ? currentNumberOfColumns - 1 : 0);
          });
        }
      });
    }
  }, [sequential]);

  useEnhancedEffect(() => {
    if (typeof ResizeObserver === 'undefined' || typeof MutationObserver === 'undefined') {
      return undefined;
    }

    const masonry = masonryRef.current;
    if (!masonry) {
      return undefined;
    }

    let resizeTimeout: any;
    const debouncedHandleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 16); // ~60fps
    };

    const resizeObserver = new ResizeObserver(debouncedHandleResize);
    // Observes for child additions or removals to update the layout.
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.dataset.class !== 'line-break') {
            resizeObserver.observe(node);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement && node.dataset.class !== 'line-break') {
            resizeObserver.unobserve(node);
          }
        });
      });
      handleResize();
    });

    Array.from(masonry.childNodes).forEach((childNode) => {
      if (childNode instanceof HTMLElement && childNode.dataset.class !== 'line-break') {
        resizeObserver.observe(childNode);
      }
    });

    mutationObserver.observe(masonry, {
      childList: true,
    });

    handleResize();

    return () => {
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [handleResize, columns, spacing, children]);

  const handleRef = useForkRef(ref, masonryRef);

  // A line break is added to the end of each column to prevent columns from merging.
  const lineBreaks = new Array(numberOfLineBreaks)
    .fill('')
    .map((_, index) => (
      <span key={index} data-class="line-break" style={{ ...lineBreakStyle, order: index + 1 }} />
    ));

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={handleRef}
      ownerState={ownerState}
      {...other}
    >
      {children}
      {lineBreaks}
    </MasonryRoot>
  );
}) as OverridableComponent<MasonryTypeMap>;

Masonry.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   * @default 4
   */
  columns: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The default number of columns of the component. This is provided for server-side rendering.
   */
  defaultColumns: PropTypes.number,
  /**
   * The default height of the component in px. This is provided for server-side rendering.
   */
  defaultHeight: PropTypes.number,
  /**
   * The default spacing of the component. Like `spacing`, it is a factor of the theme's spacing. This is provided for server-side rendering.
   */
  defaultSpacing: PropTypes.number,
  /**
   * Allows using sequential order rather than adding to shortest column
   * @default false
   */
  sequential: PropTypes.bool,
  /**
   * Defines the space between children. It is a factor of the theme's spacing.
   * @default 1
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export type MasonryProps<
  RootComponent extends React.ElementType = MasonryTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<MasonryTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default Masonry;
