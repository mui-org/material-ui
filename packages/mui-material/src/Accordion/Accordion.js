'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Collapse from '../Collapse';
import Paper from '../Paper';
import AccordionContext from './AccordionContext';
import useControlled from '../utils/useControlled';
import useId from '../utils/useId';
import useSlot from '../utils/useSlot';
import accordionClasses, { getAccordionUtilityClass } from './accordionClasses';
import { getTransitionStyles } from '../transitions/utils';

const EMPTY = {};

const useUtilityClasses = (ownerState) => {
  const { classes, square, expanded, disabled, disableGutters } = ownerState;

  const slots = {
    root: [
      'root',
      !square && 'rounded',
      expanded && 'expanded',
      disabled && 'disabled',
      !disableGutters && 'gutters',
    ],
    heading: ['heading'],
    region: ['region'],
  };

  return composeClasses(slots, getAccordionUtilityClass, classes);
};

const AccordionRoot = styled(Paper, {
  name: 'MuiAccordion',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${accordionClasses.region}`]: styles.region },
      styles.root,
      !ownerState.square && styles.rounded,
      !ownerState.disableGutters && styles.gutters,
    ];
  },
})(
  memoTheme(({ theme }) => {
    const transition = {
      duration: theme.transitions.duration.shortest,
    };

    return {
      position: 'relative',
      ...getTransitionStyles(theme, ['margin'], transition),
      overflowAnchor: 'none', // Keep the same scrolling position
      '&::before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: (theme.vars || theme).palette.divider,
        ...getTransitionStyles(theme, ['opacity', 'background-color'], transition),
      },
      '&:first-of-type': {
        '&::before': {
          display: 'none',
        },
      },
      [`&.${accordionClasses.expanded}`]: {
        '&::before': {
          opacity: 0,
        },
        '&:first-of-type': {
          marginTop: 0,
        },
        '&:last-of-type': {
          marginBottom: 0,
        },
        '& + &': {
          '&::before': {
            display: 'none',
          },
        },
      },
      [`&.${accordionClasses.disabled}`]: {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
      },
    };
  }),
  memoTheme(({ theme }) => ({
    variants: [
      {
        props: (props) => !props.square,
        style: {
          borderRadius: 0,
          '&:first-of-type': {
            borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
            borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
          },
          '&:last-of-type': {
            borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
            borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
            // Fix a rendering issue on Edge
            '@supports (-ms-ime-align: auto)': {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
        },
      },
      {
        props: (props) => !props.disableGutters,
        style: {
          [`&.${accordionClasses.expanded}`]: {
            margin: '16px 0',
          },
        },
      },
    ],
  })),
);

const AccordionHeading = styled('h3', {
  name: 'MuiAccordion',
  slot: 'Heading',
})({
  all: 'unset',
});

const AccordionRegion = styled('div', {
  name: 'MuiAccordion',
  slot: 'Region',
})({});

const Accordion = React.forwardRef(function Accordion(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAccordion' });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    slots = EMPTY,
    slotProps = EMPTY,
    ...other
  } = props;

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'Accordion',
    state: 'expanded',
  });

  const handleChange = React.useCallback(
    (event) => {
      setExpandedState(!expanded);

      if (onChange) {
        onChange(event, !expanded);
      }
    },
    [expanded, onChange, setExpandedState],
  );

  const [summary, ...regionChildren] = React.Children.toArray(childrenProp);
  const summaryProps = React.isValidElement(summary) ? summary.props : EMPTY;

  const ownerState = {
    ...props,
    disabled,
    disableGutters,
    expanded,
  };

  // Ids the consumer supplied always win, so that ids used elsewhere in their code keep working.
  // They can come from the summary's own props, from either side's `slotProps`, or from a wrapper
  // around the summary, which only AccordionSummary itself can resolve and reports back below.
  const [registeredSummaryProps, setRegisteredSummaryProps] = React.useState(EMPTY);
  const summaryRootSlotProps = resolveComponentProps(summaryProps.slotProps?.root, {
    ...summaryProps,
    disabled,
    disableGutters,
    expanded,
  });
  // Resolved once and forwarded as an object so a callback `slotProps.region` is not called twice.
  const resolvedRegionSlotProps = resolveComponentProps(slotProps.region, ownerState);
  const summaryIdProp = registeredSummaryProps.id ?? summaryRootSlotProps?.id ?? summaryProps.id;
  const regionIdProp =
    resolvedRegionSlotProps?.id ??
    registeredSummaryProps.ariaControls ??
    summaryRootSlotProps?.['aria-controls'] ??
    summaryProps['aria-controls'];
  // `useId` returns the supplied id unchanged, so everything below stays in sync with it.
  const summaryId = useId(summaryIdProp);
  const regionId = useId(regionIdProp);
  const hasRegionIdProp = regionIdProp != null;
  const [isRegionMounted, setIsRegionMounted] = React.useState(false);

  // A wrapper can supply summary props that are not visible on the first child.
  const registerSummary = React.useCallback((id, ariaControls) => {
    setRegisteredSummaryProps((previous) =>
      previous.id === id && previous.ariaControls === ariaControls
        ? previous
        : { id, ariaControls },
    );
  }, []);

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: AccordionRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    ownerState,
    ref,
  });

  const [HeadingSlot, headingProps] = useSlot('heading', {
    elementType: AccordionHeading,
    externalForwardedProps,
    className: classes.heading,
    ownerState,
  });

  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Collapse,
    externalForwardedProps,
    ownerState,
  });

  const resolvedCollapseProps = useDefaultProps({
    props: transitionProps,
    // eslint-disable-next-line mui/material-ui-name-matches-component-name
    name: 'MuiCollapse',
  });

  // The default Collapse keeps its child mounted unless mounting is explicitly deferred.
  const isDefaultTransition = TransitionSlot === Collapse;
  // Mount tracking is only needed when generated aria-controls could point at an unmounted region.
  // Custom transitions are opaque, so they are treated as unknown until the region ref is set.
  const usesGeneratedRegionId = !hasRegionIdProp;
  const isRegionAlwaysMounted =
    isDefaultTransition &&
    !resolvedCollapseProps.unmountOnExit &&
    !resolvedCollapseProps.mountOnEnter;
  const shouldTrackRegionMount = usesGeneratedRegionId && !isRegionAlwaysMounted;

  const handleRegionMountRef = React.useCallback((node) => {
    setIsRegionMounted(node != null);
  }, []);

  const shouldUseGeneratedAriaControls =
    usesGeneratedRegionId &&
    (isRegionAlwaysMounted || (isDefaultTransition && expanded) || isRegionMounted);

  const [RegionSlot, regionProps] = useSlot('region', {
    elementType: AccordionRegion,
    externalForwardedProps: {
      ...externalForwardedProps,
      slotProps: {
        ...slotProps,
        region: resolvedRegionSlotProps,
      },
    },
    ownerState,
    className: classes.region,
    ref: shouldTrackRegionMount ? handleRegionMountRef : undefined,
    // Defaults, so anything set through `slotProps.region` takes precedence.
    additionalProps: {
      id: regionId,
      'aria-labelledby': summaryId,
      role: 'region',
    },
  });

  const ariaControls = hasRegionIdProp || shouldUseGeneratedAriaControls ? regionId : undefined;

  const contextValue = React.useMemo(
    () => ({
      expanded,
      disabled,
      disableGutters,
      toggle: handleChange,
      summaryId,
      ariaControls,
      registerSummary,
    }),
    [expanded, disabled, disableGutters, handleChange, summaryId, ariaControls, registerSummary],
  );

  return (
    <RootSlot {...rootProps}>
      <HeadingSlot {...headingProps}>
        <AccordionContext.Provider value={contextValue}>{summary}</AccordionContext.Provider>
      </HeadingSlot>
      <TransitionSlot in={expanded} timeout="auto" {...transitionProps}>
        <RegionSlot {...regionProps}>{regionChildren}</RegionSlot>
      </TransitionSlot>
    </RootSlot>
  );
});

Accordion.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node.isRequired, (props) => {
    const summary = React.Children.toArray(props.children)[0];
    if (isFragment(summary)) {
      return new Error(
        "MUI: The Accordion doesn't accept a Fragment as a child. " +
          'Consider providing an array instead.',
      );
    }

    if (!React.isValidElement(summary)) {
      return new Error('MUI: Expected the first child of Accordion to be a valid element.');
    }

    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, it removes the margin between two expanded accordion items and prevents the increased height when expanded.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, expands the accordion, otherwise collapses it.
   * Setting this prop enables control over the accordion.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    heading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    region: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    heading: PropTypes.elementType,
    region: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Accordion;
