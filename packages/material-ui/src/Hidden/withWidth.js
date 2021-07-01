import * as React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from '@material-ui/utils';
import { getThemeProps } from '@material-ui/system';
import hoistNonReactStatics from 'hoist-non-react-statics';
import useTheme from '../styles/useTheme';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useMediaQuery from '../useMediaQuery';

const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

// By default, returns true if screen width is the same or greater than the given breakpoint.
export const isWidthUp = (breakpoint, width, inclusive = true) => {
  if (inclusive) {
    return breakpointKeys.indexOf(breakpoint) <= breakpointKeys.indexOf(width);
  }
  return breakpointKeys.indexOf(breakpoint) < breakpointKeys.indexOf(width);
};

// By default, returns true if screen width is the same or less than the given breakpoint.
export const isWidthDown = (breakpoint, width, inclusive = false) => {
  if (inclusive) {
    return breakpointKeys.indexOf(width) <= breakpointKeys.indexOf(breakpoint);
  }
  return breakpointKeys.indexOf(width) < breakpointKeys.indexOf(breakpoint);
};

const withWidth =
  (options = {}) =>
  (Component) => {
    const {
      withTheme: withThemeOption = false,
      noSSR = false,
      initialWidth: initialWidthOption,
    } = options;

    function WithWidth(props) {
      const contextTheme = useTheme();
      const theme = props.theme || contextTheme;
      const { initialWidth, width, ...other } = getThemeProps({
        theme,
        name: 'MuiWithWidth',
        props,
      });

      const [mountedState, setMountedState] = React.useState(false);
      useEnhancedEffect(() => {
        setMountedState(true);
      }, []);

      /**
       * innerWidth |xs      sm      md      lg      xl
       *            |-------|-------|-------|-------|------>
       * width      |  xs   |  sm   |  md   |  lg   |  xl
       */
      const keys = theme.breakpoints.keys.slice().reverse();
      const widthComputed = keys.reduce((output, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matches = useMediaQuery(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      }, null);

      const more = {
        width:
          width ||
          (mountedState || noSSR ? widthComputed : undefined) ||
          initialWidth ||
          initialWidthOption,
        ...(withThemeOption ? { theme } : {}),
        ...other,
      };

      // When rendering the component on the server,
      // we have no idea about the client browser screen width.
      // In order to prevent blinks and help the reconciliation of the React tree
      // we are not rendering the child component.
      //
      // An alternative is to use the `initialWidth` property.
      if (more.width === undefined) {
        return null;
      }

      return <Component {...more} />;
    }

    WithWidth.propTypes = {
      /**
       * As `window.innerWidth` is unavailable on the server,
       * we default to rendering an empty component during the first mount.
       * You might want to use a heuristic to approximate
       * the screen width of the client browser screen width.
       *
       * For instance, you could be using the user-agent or the client-hints.
       * https://caniuse.com/#search=client%20hint
       */
      initialWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
      /**
       * @ignore
       */
      theme: PropTypes.object,
      /**
       * Bypass the width calculation logic.
       */
      width: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    };

    if (process.env.NODE_ENV !== 'production') {
      WithWidth.displayName = `WithWidth(${getDisplayName(Component)})`;
    }

    hoistNonReactStatics(WithWidth, Component);

    return WithWidth;
  };

export default withWidth;
