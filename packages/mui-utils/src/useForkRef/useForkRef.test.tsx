import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import type { MuiRenderResult } from '@mui/internal-test-utils';
import { createRenderer, reactMajor, screen } from '@mui/internal-test-utils';
import useForkRef from './useForkRef';
import getReactElementRef from '../getReactElementRef';

describe('useForkRef', () => {
  const { render } = createRenderer();

  it('returns a single ref-setter function that forks the ref to its inputs', () => {
    interface ComponentProps {
      innerRef: React.RefObject<HTMLDivElement | null>;
    }

    function Component(props: ComponentProps) {
      const { innerRef } = props;
      const [ownRefCurrent, ownRef] = React.useState<HTMLDivElement | null>(null);

      const handleRef = useForkRef(innerRef, ownRef);

      return <div ref={handleRef}>{ownRefCurrent ? 'has a ref' : 'has no ref'}</div>;
    }

    const outerRef = React.createRef<HTMLDivElement>();

    expect(() => {
      render(<Component innerRef={outerRef} />);
    }).not.toErrorDev();
    expect(outerRef.current!.textContent).to.equal('has a ref');
  });

  it('forks if only one of the branches requires a ref', () => {
    const Component = React.forwardRef(function Component(
      props: {},
      ref: React.ForwardedRef<HTMLDivElement>,
    ) {
      const [hasRef, setHasRef] = React.useState(false);
      const handleOwnRef = React.useCallback(() => setHasRef(true), []);
      const handleRef = useForkRef(handleOwnRef, ref);

      return (
        <div ref={handleRef} data-testid="hasRef">
          {String(hasRef)}
        </div>
      );
    });

    expect(() => {
      render(<Component />);
      expect(screen.getByTestId('hasRef')).to.have.text('true');
    }).not.toErrorDev();
  });

  it('does nothing if none of the forked branches requires a ref', () => {
    interface OuterProps {
      children: React.ReactElement<{ ref?: React.Ref<HTMLDivElement> }>;
    }
    const Outer = React.forwardRef(function Outer(props: OuterProps, ref) {
      const { children } = props;
      const handleRef = useForkRef(getReactElementRef(children), ref);

      return React.cloneElement(children, { ref: handleRef });
    });

    function Inner() {
      return <div />;
    }

    expect(() => {
      render(
        <Outer>
          <Inner />
        </Outer>,
      );
    }).not.toErrorDev();
  });

  describe('changing refs', () => {
    interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
      leftRef?: React.Ref<HTMLDivElement>;
      rightRef?: React.Ref<HTMLDivElement>;
    }

    function Div(props: DivProps) {
      const { leftRef, rightRef, ...other } = props;
      const handleRef = useForkRef(leftRef, rightRef);

      return <div {...other} ref={handleRef} />;
    }

    it('handles changing from no ref to some ref', () => {
      let view: MuiRenderResult;

      expect(() => {
        view = render(<Div id="test" />);
      }).not.toErrorDev();

      const ref = React.createRef<HTMLDivElement>();
      expect(() => {
        view.setProps({ leftRef: ref });
      }).not.toErrorDev();
      expect(ref.current!.id).to.equal('test');
    });

    it('cleans up detached refs', () => {
      const firstLeftRef = React.createRef<HTMLDivElement>();
      const firstRightRef = React.createRef<HTMLDivElement>();
      const secondRightRef = React.createRef<HTMLDivElement>();
      let view: MuiRenderResult;

      expect(() => {
        view = render(<Div leftRef={firstLeftRef} rightRef={firstRightRef} id="test" />);
      }).not.toErrorDev();
      expect(firstLeftRef.current!.id).to.equal('test');
      expect(firstRightRef.current!.id).to.equal('test');
      expect(secondRightRef.current).to.equal(null);

      view!.setProps({ rightRef: secondRightRef });

      expect(firstLeftRef.current!.id).to.equal('test');
      expect(firstRightRef.current).to.equal(null);
      expect(secondRightRef.current!.id).to.equal('test');
    });
  });

  it('calls clean up function if it exists', () => {
    const cleanUp = spy();
    const setup = spy();
    const setup2 = spy();
    const nullHandler = spy();

    function onRefChangeWithCleanup(ref: HTMLDivElement | null) {
      if (ref) {
        setup(ref.id);
      } else {
        nullHandler();
      }
      return cleanUp;
    }

    function onRefChangeWithoutCleanup(ref: HTMLDivElement | null) {
      if (ref) {
        setup2(ref.id);
      } else {
        nullHandler();
      }
    }

    function App() {
      const ref = useForkRef(onRefChangeWithCleanup, onRefChangeWithoutCleanup);
      return <div id="test" ref={ref} />;
    }

    const { unmount } = render(<App />);

    expect(setup.args[0][0]).to.equal('test');
    expect(setup.callCount).to.equal(reactMajor >= 19 ? 2 : 1);
    expect(cleanUp.callCount).to.equal(reactMajor >= 19 ? 1 : 0);

    expect(setup2.args[0][0]).to.equal('test');
    expect(setup2.callCount).to.equal(reactMajor >= 19 ? 2 : 1);

    unmount();

    expect(setup.callCount).to.equal(reactMajor >= 19 ? 2 : 1);
    expect(cleanUp.callCount).to.equal(reactMajor >= 19 ? 2 : 1);

    // Setup was not called again
    expect(setup2.callCount).to.equal(reactMajor >= 19 ? 2 : 1);
    // Null handler hit because no cleanup is returned
    expect(nullHandler.callCount).to.equal(reactMajor >= 19 ? 2 : 1);
  });
});
