import * as React from 'react';
import { expect } from 'chai';
import { spy, useFakeTimers } from 'sinon';
import { describeConformance, createClientRender } from 'test/utils';
import { Transition } from 'react-transition-group';
import Zoom from '@material-ui/core/Zoom';

describe('<Zoom />', () => {
  const render = createClientRender();

  describeConformance(
    <Zoom in>
      <div />
    </Zoom>,
    () => ({
      classes: {},
      inheritComponent: Transition,
      refInstanceof: window.HTMLDivElement,
      skip: [
        'componentProp',
        // react-transition-group issue
        'reactTestRenderer',
      ],
    }),
  );

  describe('transition lifecycle', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('tests', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();
      const { container, setProps } = render(
        <Zoom
          onEnter={handleEnter}
          onEntering={handleEntering}
          onEntered={handleEntered}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
        >
          <div id="test" />
        </Zoom>,
      );
      const child = container.querySelector('#test');

      setProps({ in: true });

      expect(handleEnter.callCount).to.equal(1);
      expect(handleEnter.args[0][0]).to.equal(child);

      expect(handleEnter.args[0][0].style.transition).to.match(
        /transform 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleEntering.callCount).to.equal(1);
      expect(handleEntering.args[0][0]).to.equal(child);

      clock.tick(1000);
      expect(handleEntered.callCount).to.equal(1);
      expect(handleEntered.args[0][0]).to.equal(child);

      setProps({ in: false });

      expect(handleExit.callCount).to.equal(1);
      expect(handleExit.args[0][0]).to.equal(child);

      expect(handleExit.args[0][0].style.transition).to.match(
        /transform 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
      );

      expect(handleExiting.callCount).to.equal(1);
      expect(handleExiting.args[0][0]).to.equal(child);

      clock.tick(1000);
      expect(handleExited.callCount).to.equal(1);
      expect(handleExited.args[0][0]).to.equal(child);
    });
  });

  describe('prop: appear', () => {
    it('should work when initially hidden: appear=true', () => {
      const { container } = render(
        <Zoom in={false} appear>
          <div>Foo</div>
        </Zoom>,
      );

      const element = container.querySelector('div');

      expect(element.style).to.have.property('transform', 'scale(0)');
      expect(element.style).to.have.property('visibility', 'hidden');
    });

    it('should work when initially hidden: appear=false', () => {
      const { container } = render(
        <Zoom in={false} appear={false}>
          <div>Foo</div>
        </Zoom>,
      );
      const element = container.querySelector('div');

      expect(element.style).to.have.property('transform', 'scale(0)');
      expect(element.style).to.have.property('visibility', 'hidden');
    });
  });
});
