import * as React from 'react';
import PropTypes from 'prop-types';

/**
 * A basic error boundary that can be used to assert thrown errors in render.
 * @example <ErrorBoundary ref={errorRef}><MyComponent /></ErrorBoundary>;
 *          expect(errorRef.current.errors).to.have.lenght(0);
 */
export class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,
  };

  /**
   * @public
   */
  errors = [];

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    this.errors.push(error);
  }

  render() {
    if (this.state.error) {
      return null;
    }
    return this.props.children;
  }
}

/**
 * Allows counting how many times the owner of `RenderCounter` rendered.
 * @example <RenderCounter ref={getRenderCountRef}>...</RenderCounter>
 *          getRenderCountRef.current() === 2
 * @type {import('react').JSXElementConstructor<{children: import('react').ReactNode} & import('react').RefAttributes<() => number>>}
 */
export const RenderCounter = React.forwardRef(function RenderCounter({ children }, ref) {
  const getRenderCountRef = React.useRef(0);
  React.useImperativeHandle(ref, () => () => getRenderCountRef.current);

  return (
    <React.Profiler
      id="render-counter"
      onRender={() => {
        getRenderCountRef.current += 1;
      }}
    >
      {children}
    </React.Profiler>
  );
});

RenderCounter.propTypes = {
  children: PropTypes.node,
};
