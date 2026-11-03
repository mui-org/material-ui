'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import paginationItemClasses, { getPaginationItemUtilityClass } from './paginationItemClasses';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import FirstPageIcon from '../internal/svg-icons/FirstPage';
import LastPageIcon from '../internal/svg-icons/LastPage';
import NavigateBeforeIcon from '../internal/svg-icons/NavigateBefore';
import NavigateNextIcon from '../internal/svg-icons/NavigateNext';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTransitionStyles } from '../transitions/utils';

const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    styles[ownerState.variant],
    styles[`size${capitalize(ownerState.size)}`],
    ownerState.shape === 'rounded' && styles.rounded,
    ownerState.type === 'page' && styles.page,
    (ownerState.type === 'start-ellipsis' || ownerState.type === 'end-ellipsis') && styles.ellipsis,
    (ownerState.type === 'previous' || ownerState.type === 'next') && styles.previousNext,
    (ownerState.type === 'first' || ownerState.type === 'last') && styles.firstLast,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { classes, color, disabled, selected, size, shape, type, variant } = ownerState;

  const slots = {
    root: [
      'root',
      `size${capitalize(size)}`,
      variant,
      shape,
      color !== 'standard' && `color${capitalize(color)}`,
      disabled && 'disabled',
      selected && 'selected',
      {
        page: 'page',
        first: 'firstLast',
        last: 'firstLast',
        'start-ellipsis': 'ellipsis',
        'end-ellipsis': 'ellipsis',
        previous: 'previousNext',
        next: 'previousNext',
      }[type],
    ],
    icon: ['icon'],
  };

  return composeClasses(slots, getPaginationItemUtilityClass, classes);
};

const PaginationItemEllipsis = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: (theme.vars || theme).palette.text.primary,
    height: 'auto',
    [`&.${paginationItemClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          minWidth: 26,
          borderRadius: 26 / 2,
          margin: '0 1px',
          padding: '0 4px',
        },
      },
      {
        props: { size: 'large' },
        style: {
          minWidth: 40,
          borderRadius: 40 / 2,
          padding: '0 10px',
          fontSize: theme.typography.pxToRem(15),
        },
      },
    ],
  })),
);

const PaginationItemPage = styled(ButtonBase, {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    height: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: (theme.vars || theme).palette.text.primary,
    ...(!theme.focusVisible && {
      [`&.${paginationItemClasses.focusVisible}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
    [`&.${paginationItemClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    ...getTransitionStyles(theme, ['color', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: (theme.vars || theme).palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    [`&.${paginationItemClasses.selected}`]: {
      backgroundColor: (theme.vars || theme).palette.action.selected,
      '&:hover': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.action.selected,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: (theme.vars || theme).palette.action.selected,
        },
      },
      ...(!theme.focusVisible && {
        [`&.${paginationItemClasses.focusVisible}`]: {
          backgroundColor: theme.alpha(
            (theme.vars || theme).palette.action.selected,
            `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
          ),
        },
      }),
      [`&.${paginationItemClasses.disabled}`]: {
        opacity: 1,
        color: (theme.vars || theme).palette.action.disabled,
        backgroundColor: (theme.vars || theme).palette.action.selected,
      },
    },
    variants: [
      {
        props: { size: 'small' },
        style: {
          minWidth: 26,
          height: 26,
          borderRadius: 26 / 2,
          margin: '0 1px',
          padding: '0 4px',
        },
      },
      {
        props: { size: 'large' },
        style: {
          minWidth: 40,
          height: 40,
          borderRadius: 40 / 2,
          padding: '0 10px',
          fontSize: theme.typography.pxToRem(15),
        },
      },
      {
        props: { shape: 'rounded' },
        style: {
          borderRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
      {
        props: { variant: 'outlined' },
        style: {
          border: theme.vars
            ? `1px solid ${theme.alpha(theme.vars.palette.common.onBackground, 0.23)}`
            : `1px solid ${
                theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
              }`,
          [`&.${paginationItemClasses.selected}`]: {
            [`&.${paginationItemClasses.disabled}`]: {
              borderColor: (theme.vars || theme).palette.action.disabledBackground,
              color: (theme.vars || theme).palette.action.disabled,
            },
          },
        },
      },
      {
        props: { variant: 'text' },
        style: {
          [`&.${paginationItemClasses.selected}`]: {
            [`&.${paginationItemClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
            },
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['dark', 'contrastText']))
        .map(([color]) => ({
          props: { variant: 'text', color },
          style: {
            [`&.${paginationItemClasses.selected}`]: {
              color: (theme.vars || theme).palette[color].contrastText,
              backgroundColor: (theme.vars || theme).palette[color].main,
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette[color].dark,
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                  backgroundColor: (theme.vars || theme).palette[color].main,
                },
              },
              ...(!theme.focusVisible && {
                [`&.${paginationItemClasses.focusVisible}`]: {
                  backgroundColor: (theme.vars || theme).palette[color].dark,
                },
              }),
              [`&.${paginationItemClasses.disabled}`]: {
                color: (theme.vars || theme).palette.action.disabled,
              },
            },
          },
        })),
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['light']))
        .map(([color]) => ({
          props: { variant: 'outlined', color },
          style: {
            [`&.${paginationItemClasses.selected}`]: {
              color: (theme.vars || theme).palette[color].main,
              border: `1px solid ${theme.alpha((theme.vars || theme).palette[color].main, 0.5)}`,
              backgroundColor: theme.alpha(
                (theme.vars || theme).palette[color].main,
                (theme.vars || theme).palette.action.activatedOpacity,
              ),
              '&:hover': {
                backgroundColor: theme.alpha(
                  (theme.vars || theme).palette[color].main,
                  `${(theme.vars || theme).palette.action.activatedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                  backgroundColor: 'transparent',
                },
              },
              ...(!theme.focusVisible && {
                [`&.${paginationItemClasses.focusVisible}`]: {
                  backgroundColor: theme.alpha(
                    (theme.vars || theme).palette[color].main,
                    `${(theme.vars || theme).palette.action.activatedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
                  ),
                },
              }),
            },
          },
        })),
    ],
  })),
);

const PaginationItemPageIcon = styled('div', {
  name: 'MuiPaginationItem',
  slot: 'Icon',
})(
  memoTheme(({ theme }) => ({
    fontSize: theme.typography.pxToRem(20),
    margin: '0 -8px',
    variants: [
      {
        props: { size: 'small' },
        style: {
          fontSize: theme.typography.pxToRem(18),
        },
      },
      {
        props: { size: 'large' },
        style: {
          fontSize: theme.typography.pxToRem(22),
        },
      },
    ],
  })),
);

const PaginationItem = React.forwardRef(function PaginationItem(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPaginationItem' });
  const {
    className,
    color = 'standard',
    component,
    disabled = false,
    page,
    selected = false,
    shape = 'circular',
    size = 'medium',
    slots = {},
    slotProps = {},
    type = 'page',
    variant = 'text',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant,
  };

  const isRtl = useRtl();
  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [PreviousSlot, previousSlotProps] = useSlot('previous', {
    elementType: NavigateBeforeIcon,
    externalForwardedProps,
    ownerState,
  });

  const [NextSlot, nextSlotProps] = useSlot('next', {
    elementType: NavigateNextIcon,
    externalForwardedProps,
    ownerState,
  });

  const [FirstSlot, firstSlotProps] = useSlot('first', {
    elementType: FirstPageIcon,
    externalForwardedProps,
    ownerState,
  });

  const [LastSlot, lastSlotProps] = useSlot('last', {
    elementType: LastPageIcon,
    externalForwardedProps,
    ownerState,
  });

  const rtlAwareType = isRtl
    ? {
        previous: 'next',
        next: 'previous',
        first: 'last',
        last: 'first',
      }[type]
    : type;

  const IconSlot = {
    previous: PreviousSlot,
    next: NextSlot,
    first: FirstSlot,
    last: LastSlot,
  }[rtlAwareType];

  const iconSlotProps = {
    previous: previousSlotProps,
    next: nextSlotProps,
    first: firstSlotProps,
    last: lastSlotProps,
  }[rtlAwareType];

  return type === 'start-ellipsis' || type === 'end-ellipsis' ? (
    <PaginationItemEllipsis
      ref={ref}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      …
    </PaginationItemEllipsis>
  ) : (
    <PaginationItemPage
      ref={ref}
      ownerState={ownerState}
      component={component}
      internalNativeButton
      disabled={disabled}
      className={clsx(classes.root, className)}
      {...other}
    >
      {type === 'page' && page}
      {IconSlot ? (
        <PaginationItemPageIcon {...iconSlotProps} className={classes.icon} as={IconSlot} />
      ) : null}
    </PaginationItemPage>
  );
});

PaginationItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
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
   * The active color.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'standard']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Whether the custom component should render a native `<button>` element when
   * rendering a React component with the `component` or `slots` prop.
   */
  nativeButton: PropTypes.bool,
  /**
   * The current page number.
   */
  page: PropTypes.node,
  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: PropTypes.oneOf(['circular', 'rounded']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    first: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    last: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    next: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    previous: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    first: PropTypes.elementType,
    last: PropTypes.elementType,
    next: PropTypes.elementType,
    previous: PropTypes.elementType,
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
   * The type of pagination item.
   * @default 'page'
   */
  type: PropTypes.oneOf([
    'end-ellipsis',
    'first',
    'last',
    'next',
    'page',
    'previous',
    'start-ellipsis',
  ]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'text']),
    PropTypes.string,
  ]),
};

export default PaginationItem;
