import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Collapse from '../Collapse';
import Paper from '../Paper';
import AccordionContext from './AccordionContext';
import useControlled from '../utils/useControlled';
import accordionClasses, { getAccordionUtilityClass } from './accordionClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, square, expanded, disabled, disableGutters } = styleProps;

  const slots = {
    root: [
      'root',
      !square && 'rounded',
      expanded && 'expanded',
      disabled && 'disabled',
      !disableGutters && 'gutters',
    ],
    region: ['region'],
  };

  return composeClasses(slots, getAccordionUtilityClass, classes);
};

const AccordionRoot = styled(Paper, {
  name: 'MuiAccordion',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      { [`& .${accordionClasses.region}`]: styles.region },
      styles.root,
      !styleProps.square && styles.rounded,
      !styleProps.disableGutters && styles.gutters,
    ];
  },
})(
  ({ theme }) => {
    const transition = {
      duration: theme.transitions.duration.shortest,
    };

    return {
      /* Styles applied to the root element. */
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      overflowAnchor: 'none', // Keep the same scrolling position
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition),
      },
      '&:first-of-type': {
        '&:before': {
          display: 'none',
        },
      },
      /* Styles applied to the root element if `expanded={true}`. */
      [`&.${accordionClasses.expanded}`]: {
        '&:before': {
          opacity: 0,
        },
        '&:first-of-type': {
          marginTop: 0,
        },
        '&:last-of-type': {
          marginBottom: 0,
        },
        '& + &': {
          '&:before': {
            display: 'none',
          },
        },
      },
      /* Styles applied to the root element if `disabled={true}`. */
      [`&.${accordionClasses.disabled}`]: {
        backgroundColor: theme.palette.action.disabledBackground,
      },
    };
  },
  ({ theme, styleProps }) => ({
    /* Styles applied to the root element unless `square={true}`. */
    ...(!styleProps.square && {
      borderRadius: 0,
      '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
      },
      '&:last-of-type': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        // Fix a rendering issue on Edge
        '@supports (-ms-ime-align: auto)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    }),
    /* Styles applied to the root element unless `disableGutters={true}`. */
    ...(!styleProps.disableGutters && {
      [`&.${accordionClasses.expanded}`]: {
        margin: '16px 0',
      },
    }),
  }),
);

const Accordion = React.forwardRef(function Accordion(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAccordion' });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    square = false,
    TransitionComponent = Collapse,
    TransitionProps,
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

  const [summary, ...children] = React.Children.toArray(childrenProp);
  const contextValue = React.useMemo(
    () => ({ expanded, disabled, disableGutters, toggle: handleChange }),
    [expanded, disabled, disableGutters, handleChange],
  );

  const styleProps = {
    ...props,
    square,
    disabled,
    disableGutters,
    expanded,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <AccordionRoot
      className={clsx(classes.root, className)}
      ref={ref}
      styleProps={styleProps}
      square={square}
      {...other}
    >
      <AccordionContext.Provider value={contextValue}>{summary}</AccordionContext.Provider>
      <TransitionComponent in={expanded} timeout="auto" {...TransitionProps}>
        <div
          aria-labelledby={summary.props.id}
          id={summary.props['aria-controls']}
          role="region"
          className={classes.region}
        >
          {children}
        </div>
      </TransitionComponent>
    </AccordionRoot>
  );
});

Accordion.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node.isRequired, (props) => {
    const summary = React.Children.toArray(props.children)[0];
    if (isFragment(summary)) {
      return new Error(
        "Material-UI: The Accordion doesn't accept a Fragment as a child. " +
          'Consider providing an array instead.',
      );
    }

    if (!React.isValidElement(summary)) {
      return new Error('Material-UI: Expected the first child of Accordion to be a valid element.');
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
   * If `true`, it removes the margin between two expanded accordion items and the increase of height.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded: PropTypes.bool,
  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: PropTypes.func,
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object,
};

export default Accordion;
