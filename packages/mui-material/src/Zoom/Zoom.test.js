import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Zoom from '@mui/material/Zoom';
import Transition from '../internal/Transition';
import describeConformance from '../../test/describeConformance';
import describeTransitionConformance from '../../test/describeTransitionConformance';

describe('<Zoom />', () => {
  const { clock, render } = createRenderer();

  describeConformance(
    <Zoom in>
      <div />
    </Zoom>,
    () => ({
      render,
      classes: {},
      inheritComponent: Transition,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'themeDefaultProps', 'themeStyleOverrides', 'themeVariants'],
    }),
  );

  describeTransitionConformance('Zoom', () => ({
    Component: Zoom,
    render,
    clock,
    lifecycle: {
      addEndListener: true,
      assertEnter: (node) => {
        expect(node.style.transition).to.match(
          /transform 225ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
      assertExit: (node) => {
        expect(node.style.transition).to.match(
          /transform 195ms cubic-bezier\(0.4, 0, 0.2, 1\)( 0ms)?/,
        );
      },
    },
    themeDuration: {
      testPropTimeout: true,
      renderElement: (props) => (
        <Zoom in appear {...props}>
          <div data-testid="child">Foo</div>
        </Zoom>
      ),
    },
    reducedMotion: {
      assertReducedTiming: (node) => {
        if (isJsdom()) {
          expect(node.style.transition).to.include('0ms');
        } else {
          expect(node.style.transitionDuration).to.equal('0ms');
        }
      },
      testReflow: true,
      testOptOut: true,
      testNoDomPropLeak: true,
    },
  }));

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
