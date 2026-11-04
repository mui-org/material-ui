'use client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useForkRef from '@mui/utils/useForkRef';
import setRef from '@mui/utils/setRef';
import getReactElementRef from '@mui/utils/getReactElementRef';
import exactProp from '@mui/utils/exactProp';
import HTMLElementType from '@mui/utils/HTMLElementType';
import type { PortalProps } from './Portal.types';

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * Demos:
 *
 * - [Portal](https://next.mui.com/material-ui/react-portal/)
 *
 * API:
 *
 * - [Portal API](https://next.mui.com/material-ui/api/portal/)
 */
const Portal = React.forwardRef(function Portal(
  props: PortalProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { children, container, disablePortal = false } = props;
  const [mountNode, setMountNode] = React.useState<ReturnType<typeof getContainer>>(null);

  const handleRef = useForkRef(
    React.isValidElement(children) ? getReactElementRef(children) : null,
    forwardedRef,
  );

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(forwardedRef, mountNode);
      return () => {
        setRef(forwardedRef, null);
      };
    }

    return undefined;
  }, [forwardedRef, mountNode, disablePortal]);

  if (disablePortal) {
    if (React.isValidElement(children)) {
      const newProps = {
        ref: handleRef,
      };
      return React.cloneElement(children, newProps);
    }
    return children;
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
}) as React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<Element>>;

Portal.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
} as any;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  (Portal as any)['propTypes' + ''] = exactProp((Portal as any).propTypes);
}

export default Portal;
