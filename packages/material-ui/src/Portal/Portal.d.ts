import * as React from 'react';
import { PortalProps } from '../Portal';

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children: React.ReactElement;
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: React.ReactInstance | (() => React.ReactInstance) | null;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered?: () => void;
}

export default function Portal(props: PortalProps): JSX.Element;
