import * as React from 'react';
import PropTypes from 'prop-types';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

/**
 * Responsively hides children based on the selected implementation.
 */
function Hidden(props) {
  const {
    implementation = 'js',
    lgDown = false,
    lgUp = false,
    mdDown = false,
    mdUp = false,
    smDown = false,
    smUp = false,
    xlDown = false,
    xlUp = false,
    xsDown = false,
    xsUp = false,
    ...other
  } = props;

  if (implementation === 'js') {
    return (
      <HiddenJs
        lgDown={lgDown}
        lgUp={lgUp}
        mdDown={mdDown}
        mdUp={mdUp}
        smDown={smDown}
        smUp={smUp}
        xlDown={xlDown}
        xlUp={xlUp}
        xsDown={xsDown}
        xsUp={xsUp}
        {...other}
      />
    );
  }

  return (
    <HiddenCss
      lgDown={lgDown}
      lgUp={lgUp}
      mdDown={mdDown}
      mdUp={mdUp}
      smDown={smDown}
      smUp={smUp}
      xlDown={xlDown}
      xlUp={xlUp}
      xsDown={xsDown}
      xsUp={xsUp}
      {...other}
    />
  );
}

Hidden.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   * @default 'js'
   */
  implementation: PropTypes.oneOf(['css', 'js']),
  /**
   * You can use this prop when choosing the `js` implementation with server-side rendering.
   *
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
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  lgDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  lgUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  mdDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  mdUp: PropTypes.bool,
  /**
   * Hide the given breakpoint(s).
   */
  only: PropTypes.oneOfType([
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    PropTypes.arrayOf(PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired),
  ]),
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  smDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  smUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  xlDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  xlUp: PropTypes.bool,
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  xsDown: PropTypes.bool,
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  xsUp: PropTypes.bool,
};

export default Hidden;
