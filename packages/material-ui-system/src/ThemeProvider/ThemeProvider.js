import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/private-theming';
import { exactProp } from '@material-ui/utils';
import { ThemeContext as StyledEngineThemeContext } from '@material-ui/styled-engine';
import useTheme from '../useTheme';

function InnerThemeProvider(props) {
  const theme = useTheme();
  return (
    <StyledEngineThemeContext.Provider value={typeof theme === 'object' ? theme : {}}>
      {props.children}
    </StyledEngineThemeContext.Provider>
  );
}

InnerThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
};

/**
 * This component makes the `theme` available down the React tree.
 * It should preferably be used at **the root of your component tree**.
 */
function ThemeProvider(props) {
  const { children, theme: localTheme } = props;

  return (
    <MuiThemeProvider theme={localTheme}>
      <InnerThemeProvider>{children}</InnerThemeProvider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.propTypes = exactProp(ThemeProvider.propTypes);
}

export default ThemeProvider;
