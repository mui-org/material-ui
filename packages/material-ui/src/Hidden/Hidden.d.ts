import * as React from 'react';
import { Breakpoint } from '@material-ui/system';

export interface HiddenProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Specify which implementation to use.  'js' is the default, 'css' works better for
   * server-side rendering.
   * @default 'js'
   */
  implementation?: 'js' | 'css';
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
  initialWidth?: Breakpoint;
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  lgDown?: boolean;
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  lgUp?: boolean;
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  mdDown?: boolean;
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  mdUp?: boolean;
  /**
   * Hide the given breakpoint(s).
   */
  only?: Breakpoint | Breakpoint[];
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  smDown?: boolean;
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  smUp?: boolean;
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  xlDown?: boolean;
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  xlUp?: boolean;
  /**
   * If `true`, screens this size and down are hidden.
   * @default false
   */
  xsDown?: boolean;
  /**
   * If `true`, screens this size and up are hidden.
   * @default false
   */
  xsUp?: boolean;
}

/**
 * Responsively hides children based on the selected implementation.
 *
 * Demos:
 *
 * - [Hidden](https://material-ui.com/components/hidden/)
 *
 * API:
 *
 * - [Hidden API](https://material-ui.com/api/hidden/)
 */
declare const Hidden: React.JSXElementConstructor<HiddenProps>;

export default Hidden;
