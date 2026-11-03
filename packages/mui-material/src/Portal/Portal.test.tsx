import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, reactMajor, isJsdom } from '@mui/internal-test-utils';
import type { PortalProps } from '@mui/material/Portal';
import Portal from '@mui/material/Portal';

describe('<Portal />', () => {
  const { render, renderToString } = createRenderer();

  describe.skipIf(!isJsdom())('server-side', () => {
    it('render nothing on the server', () => {
      const { container } = renderToString(
        <Portal>
          <div>Bar</div>
        </Portal>,
      );
      expect(container.firstChild).to.equal(null);
    });
  });

  describe('ref', () => {
    it('should have access to the mountNode when disabledPortal={false}', () => {
      const refSpy = spy();
      const { unmount } = render(
        <Portal ref={refSpy}>
          <h1>Foo</h1>
        </Portal>,
      );
      expect(refSpy.args).to.deep.equal([[document.body]]);
      unmount();
      expect(refSpy.args).to.deep.equal([[document.body], [null]]);
    });

    it('should have access to the mountNode when disabledPortal={true}', () => {
      const refSpy = spy();
      const { unmount } = render(
        <Portal disablePortal ref={refSpy}>
          <h1 className="woofPortal">Foo</h1>
        </Portal>,
        { strict: reactMajor <= 18 },
      );
      const mountNode = document.querySelector('.woofPortal');
      expect(refSpy.args).to.deep.equal([[mountNode]]);
      unmount();
      expect(refSpy.args).to.deep.equal([[mountNode], [null]]);
    });

    it('should have access to the mountNode when switching disabledPortal', () => {
      const refSpy = spy();
      const { setProps, unmount } = render(
        <Portal disablePortal ref={refSpy}>
          <h1 className="woofPortal">Foo</h1>
        </Portal>,
        { strict: reactMajor <= 18 },
      );
      const mountNode = document.querySelector('.woofPortal');
      expect(refSpy.args).to.deep.equal([[mountNode]]);
      setProps({
        disablePortal: false,
        ref: refSpy,
      });
      expect(refSpy.args).to.deep.equal([[mountNode], [null], [document.body]]);
      unmount();
      expect(refSpy.args).to.deep.equal([[mountNode], [null], [document.body], [null]]);
    });
  });

  it('should render in a different node', () => {
    render(
      <div id="test1">
        <h1 className="woofPortal1">Foo</h1>
        <Portal>
          <h1 className="woofPortal2">Foo</h1>
        </Portal>
      </div>,
    );
    const rootElement = document.querySelector<HTMLDivElement>('#test1')!;
    expect(rootElement.contains(document.querySelector('.woofPortal1'))).to.equal(true);
    expect(rootElement.contains(document.querySelector('.woofPortal2'))).to.equal(false);
  });

  it('should unmount when parent unmounts', () => {
    function Child() {
      const containerRef = React.useRef<HTMLDivElement>(null);
      return (
        <div>
          <div ref={containerRef} />
          <Portal container={() => containerRef.current}>
            <div id="test1" />
          </Portal>
        </div>
      );
    }

    function Parent(props: { show?: boolean }) {
      const { show = true } = props;
      return <div>{show ? <Child /> : null}</div>;
    }

    const { setProps } = render(<Parent />);
    expect(document.querySelectorAll('#test1').length).to.equal(1);
    setProps({ show: false });
    expect(document.querySelectorAll('#test1').length).to.equal(0);
  });

  it('should render overlay into container (document)', () => {
    render(
      <Portal>
        <div className="test2" />
        <div className="test2" />
      </Portal>,
    );
    expect(document.querySelectorAll('.test2').length).to.equal(2);
  });

  it('should render overlay into container (DOMNode)', () => {
    const container = document.createElement('div');
    render(
      <Portal container={container}>
        <div id="test2" />
      </Portal>,
    );
    expect(container.querySelectorAll('#test2').length).to.equal(1);
  });

  it('should change container on prop change', () => {
    type ContainerProps = {
      disablePortal?: boolean;
      containerElement?: boolean;
    };
    function ContainerTest(props: ContainerProps) {
      const { containerElement = false, disablePortal = true } = props;
      const containerRef = React.useRef<HTMLElement>(null);
      const container = React.useCallback(
        () => (containerElement ? containerRef.current : null),
        [containerElement],
      );

      return (
        <span>
          <strong ref={containerRef} />
          <Portal disablePortal={disablePortal} container={container}>
            <div id="test3" />
          </Portal>
        </span>
      );
    }

    const { setProps } = render(<ContainerTest />);

    expect(document.querySelector('#test3')?.parentElement?.nodeName).to.equal('SPAN');
    setProps({
      containerElement: true,
      disablePortal: true,
    });
    expect(document.querySelector('#test3')?.parentElement?.nodeName).to.equal('SPAN');
    setProps({
      containerElement: true,
      disablePortal: false,
    });
    expect(document.querySelector('#test3')?.parentElement?.nodeName).to.equal('STRONG');
    setProps({
      containerElement: false,
      disablePortal: false,
    });
    expect(document.querySelector('#test3')?.parentElement?.nodeName).to.equal('BODY');
  });

  it('should call ref after child effect', () => {
    const callOrder: Array<string> = [];
    const handleRef = (node: Element | null) => {
      if (node) {
        callOrder.push('ref');
      }
    };
    const updateFunction = () => {
      callOrder.push('effect');
    };

    function Test(props: PortalProps) {
      const { container } = props;
      const containerRef = React.useRef<PortalProps['container']>(null);

      React.useEffect(() => {
        if (containerRef.current !== container) {
          updateFunction();
        }
        containerRef.current = container;
      }, [container]);

      return (
        <Portal ref={handleRef} container={container}>
          <div />
        </Portal>
      );
    }

    const { setProps } = render(<Test container={document.createElement('div')} />);

    setProps({ container: null });
    setProps({ container: document.createElement('div') });
    setProps({ container: null });

    expect(callOrder).to.deep.equal([
      'effect',
      'ref',
      'effect',
      'ref',
      'effect',
      'ref',
      'effect',
      'ref',
    ]);
  });
});
