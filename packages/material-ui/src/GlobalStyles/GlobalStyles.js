import * as React from 'react';
import PropTypes from 'prop-types';
import { GlobalStyles as SystemGlobalStyles } from '@material-ui/system';
import defaultTheme from '../styles/defaultTheme';

function GlobalStyles(props) {
  return <SystemGlobalStyles {...props} defaultTheme={defaultTheme} />;
}

GlobalStyles.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The styles you want to apply globally.
   */
  styles: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.shape({
      __emotion_styles: PropTypes.any.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default GlobalStyles;
