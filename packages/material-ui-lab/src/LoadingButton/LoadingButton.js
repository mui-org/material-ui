import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@material-ui/utils';
import { capitalize } from '@material-ui/core/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import loadingButtonClasses, { getLoadingButtonUtilityClass } from './loadingButtonClasses';

const useUtilityClasses = (styleProps) => {
  const { loading, loadingPosition, classes } = styleProps;

  const slots = {
    root: ['root', loading && 'loading'],
    startIcon: [loading && `startIconLoading${capitalize(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${capitalize(loadingPosition)}`],
    loadingIndicator: [
      'loadingIndicator',
      loading && `loadingIndicator${capitalize(loadingPosition)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);

  return {
    ...classes, // forward the outlined, color, etc. classes to Button
    ...composedClasses,
  };
};

// TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core
const rootShouldForwardProp = (prop) =>
  prop !== 'styleProps' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
const LoadingButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [
      styles.root,
      styles.startIconLoadingStart && {
        [`& .${loadingButtonClasses.startIconLoadingStart}`]: styles.startIconLoadingStart,
      },
      styles.endIconLoadingEnd && {
        [`& .${loadingButtonClasses.endIconLoadingEnd}`]: styles.endIconLoadingEnd,
      },
    ];
  },
})(({ styleProps, theme }) => ({
  [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
    {
      transition: theme.transitions.create(['opacity'], {
        duration: theme.transitions.duration.short,
      }),
      opacity: 0,
    },
  ...(styleProps.loadingPosition === 'center' && {
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
    [`&.${loadingButtonClasses.loading}`]: {
      color: 'transparent',
    },
  }),
}));

const LoadingButtonLoadingIndicator = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;
    return [
      styles.loadingIndicator,
      styles[`loadingIndicator${capitalize(styleProps.loadingPosition)}`],
    ];
  },
})(({ theme, styleProps }) => ({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex',
  ...(styleProps.loadingPosition === 'start' && {
    left: 14,
  }),
  ...(styleProps.loadingPosition === 'center' && {
    left: '50%',
    transform: 'translate(-50%)',
    color: theme.palette.action.disabled,
  }),
  ...(styleProps.loadingPosition === 'end' && {
    right: 14,
  }),
}));

const LoadingIndicator = <CircularProgress color="inherit" size={16} />;

const LoadingButton = React.forwardRef(function LoadingButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiLoadingButton' });
  const {
    children,
    disabled = false,
    loading = false,
    loadingIndicator = LoadingIndicator,
    loadingPosition = 'center',
    ...other
  } = props;

  const styleProps = {
    ...props,
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <LoadingButtonRoot
      disabled={disabled || loading}
      ref={ref}
      {...other}
      classes={classes}
      styleProps={styleProps}
    >
      {loading && (
        <LoadingButtonLoadingIndicator className={classes.loadingIndicator} styleProps={styleProps}>
          {loadingIndicator}
        </LoadingButtonLoadingIndicator>
      )}

      {children}
    </LoadingButtonRoot>
  );
});

LoadingButton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), (props) => {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error(
        `Material-UI: The loadingPosition="start" should be used in combination with startIcon.`,
      );
    }
    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error(
        `Material-UI: The loadingPosition="end" should be used in combination with endIcon.`,
      );
    }
    return null;
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default LoadingButton;
