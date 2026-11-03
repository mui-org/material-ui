'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import AccordionContext from '../Accordion/AccordionContext';
import { getTransitionStyles } from '../transitions/utils';
import accordionSummaryClasses, {
  getAccordionSummaryUtilityClass,
} from './accordionSummaryClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, expanded, disabled, disableGutters } = ownerState;

  const slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded'],
  };

  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};

const AccordionSummaryRoot = styled(ButtonBase, {
  name: 'MuiAccordionSummary',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    width: '100%',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    font: 'inherit',
    ...getTransitionStyles(theme, ['min-height', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    ...(!theme.focusVisible && {
      [`&.${accordionSummaryClasses.focusVisible}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
    [`&.${accordionSummaryClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    [`&:hover:not(.${accordionSummaryClasses.disabled})`]: {
      cursor: 'pointer',
    },
    variants: [
      {
        props: (props) => !props.disableGutters,
        style: {
          [`&.${accordionSummaryClasses.expanded}`]: {
            minHeight: 64,
          },
        },
      },
    ],
  })),
);

const AccordionSummaryContent = styled('span', {
  name: 'MuiAccordionSummary',
  slot: 'Content',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    textAlign: 'start',
    flexGrow: 1,
    margin: '12px 0',
    variants: [
      {
        props: (props) => !props.disableGutters,
        style: {
          ...getTransitionStyles(theme, ['margin'], {
            duration: theme.transitions.duration.shortest,
          }),
          [`&.${accordionSummaryClasses.expanded}`]: {
            margin: '20px 0',
          },
        },
      },
    ],
  })),
);

const AccordionSummaryExpandIconWrapper = styled('span', {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper',
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    color: (theme.vars || theme).palette.action.active,
    transform: 'rotate(0deg)',
    ...getTransitionStyles(theme, 'transform', {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${accordionSummaryClasses.expanded}`]: {
      transform: 'rotate(180deg)',
    },
  })),
);

const AccordionSummary = React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAccordionSummary' });
  const {
    children,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick,
    slots,
    slotProps,
    ...other
  } = props;

  const { disabled = false, disableGutters, expanded, toggle } = React.useContext(AccordionContext);
  const handleChange = (event) => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  const ownerState = {
    ...props,
    expanded,
    disabled,
    disableGutters,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    shouldForwardComponentProp: true,
    className: clsx(classes.root, className),
    elementType: AccordionSummaryRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    additionalProps: {
      focusRipple: false,
      disableRipple: true,
      internalNativeButton: true,
      disabled,
      'aria-expanded': expanded,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onClick: (event) => {
        handlers.onClick?.(event);
        handleChange(event);
      },
    }),
  });

  const [ContentSlot, contentSlotProps] = useSlot('content', {
    className: classes.content,
    elementType: AccordionSummaryContent,
    externalForwardedProps,
    ownerState,
  });

  const [ExpandIconWrapperSlot, expandIconWrapperSlotProps] = useSlot('expandIconWrapper', {
    className: classes.expandIconWrapper,
    elementType: AccordionSummaryExpandIconWrapper,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      <ContentSlot {...contentSlotProps}>{children}</ContentSlot>
      {expandIcon && (
        <ExpandIconWrapperSlot {...expandIconWrapperSlotProps}>{expandIcon}</ExpandIconWrapperSlot>
      )}
    </RootSlot>
  );
});

AccordionSummary.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    expandIconWrapper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    content: PropTypes.elementType,
    expandIconWrapper: PropTypes.elementType,
    root: PropTypes.elementType,
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

export default AccordionSummary;
