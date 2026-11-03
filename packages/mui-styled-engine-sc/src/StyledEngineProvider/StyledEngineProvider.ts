import type * as React from 'react';
import PropTypes from 'prop-types';

export interface StyledEngineProviderProps {
  children?: React.ReactNode;
  injectFirst?: boolean | undefined;
}

export default function StyledEngineProvider(props: StyledEngineProviderProps): React.JSX.Element {
  const { injectFirst, children } = props;

  if (injectFirst && typeof window !== 'undefined') {
    const head = document.head;
    if (!head.querySelector('[data-styled="active"]')) {
      const injectFirstNode = document.createElement('style');
      injectFirstNode.setAttribute('data-styled', 'active');
      head.insertBefore(injectFirstNode, head.firstChild);
    }
  }

  return children as React.JSX.Element;
}

(StyledEngineProvider as any).propTypes /* remove-proptypes */ = {
  /**
   * Your component tree.
   */
  children: PropTypes.node,
  /**
   * By default, the styles are injected last in the <head> element of the page.
   * As a result, they gain more specificity than any other style sheet.
   * If you want to override MUI's styles, set this prop.
   */
  injectFirst: PropTypes.bool,
};
