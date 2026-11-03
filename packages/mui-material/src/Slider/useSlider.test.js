import { describe, beforeEach, it, expect } from 'vitest';
import * as React from 'react';
import { spy, stub } from 'sinon';
import { createRenderer, screen, fireEvent, isJsdom } from '@mui/internal-test-utils';
import { useSlider } from './useSlider';

describe('useSlider', () => {
  const { render } = createRenderer();

  beforeEach(() => {
    // jsdom doesn't implement Pointer Capture API
    if (!Element.prototype.setPointerCapture) {
      Element.prototype.setPointerCapture = stub();
    }
    if (!Element.prototype.releasePointerCapture) {
      Element.prototype.releasePointerCapture = stub();
    }
    if (!Element.prototype.hasPointerCapture) {
      Element.prototype.hasPointerCapture = stub().returns(false);
    }
  });

  describe('getRootProps', () => {
    it('forwards external props including event handlers', () => {
      const rootRef = React.createRef();

      const handleClick = spy();

      function Test() {
        const { getRootProps } = useSlider({
          rootRef,
          marks: [
            {
              label: 'One',
              value: 1,
            },
          ],
        });

        return (
          <div {...getRootProps({ 'data-testid': 'test-slider-root', onClick: handleClick })} />
        );
      }

      render(<Test />);

      const slider = screen.getByTestId('test-slider-root');
      expect(slider).not.to.equal(null);
      expect(rootRef.current).to.deep.equal(slider);

      fireEvent.click(slider);
      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('getThumbStyle', () => {
    function RangeSliderTest({ onSliderState }) {
      const result = useSlider({
        defaultValue: [20, 80],
      });
      onSliderState(result);
      return (
        <div {...result.getRootProps({ 'data-testid': 'slider-root' })}>
          {result.values.map((value, index) => (
            <div key={index} {...result.getThumbProps()} style={result.getThumbStyle(index)}>
              <input value={value} data-index={index} {...result.getHiddenInputProps()} />
            </div>
          ))}
        </div>
      );
    }

    function SingleSliderTest({ onSliderState }) {
      const result = useSlider({
        defaultValue: 50,
      });
      onSliderState(result);
      return (
        <div {...result.getRootProps({ 'data-testid': 'slider-root' })}>
          <div {...result.getThumbProps()} style={result.getThumbStyle(0)}>
            <input value={50} data-index={0} {...result.getHiddenInputProps()} />
          </div>
        </div>
      );
    }

    it.skipIf(isJsdom())('range slider: active thumb should have zIndex 2', () => {
      let sliderState;
      const { container } = render(
        <RangeSliderTest
          onSliderState={(state) => {
            sliderState = state;
          }}
        />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      // Activate thumb 0 by pointer down near value 20
      fireEvent.pointerDown(container.firstChild, { clientX: 20, pointerId: 1 });
      expect(sliderState.getThumbStyle(0).zIndex).to.equal(2);
    });

    it.skipIf(isJsdom())('range slider: inactive thumb should have no zIndex during drag', () => {
      let sliderState;
      const { container } = render(
        <RangeSliderTest
          onSliderState={(state) => {
            sliderState = state;
          }}
        />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      // Activate thumb 0
      fireEvent.pointerDown(container.firstChild, { clientX: 20, pointerId: 1 });
      expect(sliderState.getThumbStyle(1).zIndex).to.equal(undefined);
    });

    it.skipIf(isJsdom())('range slider: last-used thumb should have zIndex 1 after release', () => {
      let sliderState;
      const { container } = render(
        <RangeSliderTest
          onSliderState={(state) => {
            sliderState = state;
          }}
        />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      // Activate then release thumb 0
      fireEvent.pointerDown(container.firstChild, { clientX: 20, pointerId: 1 });
      fireEvent.pointerUp(document, { pointerId: 1 });
      expect(sliderState.getThumbStyle(0).zIndex).to.equal(1);
    });

    it.skipIf(isJsdom())(
      'range slider: overlapping thumbs should reactivate the last-used thumb',
      () => {
        let sliderState;
        const { container } = render(
          <RangeSliderTest
            onSliderState={(state) => {
              sliderState = state;
            }}
          />,
        );
        stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
          width: 100,
          height: 10,
          bottom: 10,
          left: 0,
        }));

        fireEvent.pointerDown(container.firstChild, { clientX: 20, pointerId: 1 });
        fireEvent.pointerMove(document, { clientX: 80, pointerId: 1, buttons: 1 });
        fireEvent.pointerUp(document, { pointerId: 1 });

        expect(sliderState.values).to.deep.equal([80, 80]);
        expect(sliderState.getThumbStyle(0).zIndex).to.equal(1);

        fireEvent.pointerDown(container.firstChild, { clientX: 80, pointerId: 2 });
        expect(sliderState.active).to.equal(0);
      },
    );

    it.skipIf(isJsdom())('single slider: active thumb should have zIndex 1', () => {
      let sliderState;
      const { container } = render(
        <SingleSliderTest
          onSliderState={(state) => {
            sliderState = state;
          }}
        />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.pointerDown(container.firstChild, { clientX: 50, pointerId: 1 });
      expect(sliderState.getThumbStyle(0).zIndex).to.equal(1);
    });
  });

  describe('getHiddenInputProps', () => {
    function Test(
      props = {
        slotProps: {
          input: {},
        },
      },
    ) {
      const { getRootProps, getThumbProps, getHiddenInputProps } = useSlider({
        marks: [
          {
            label: 'One',
            value: 1,
          },
        ],
      });

      return (
        <div {...getRootProps()}>
          <div {...getThumbProps()}>
            <input
              value={1}
              {...getHiddenInputProps({ 'data-testid': 'test-input', ...props.slotProps.input })}
            />
          </div>
        </div>
      );
    }

    it('forwards external props including event handlers', () => {
      const handleClick = spy();
      render(
        <Test
          slotProps={{
            input: {
              onClick: handleClick,
            },
          }}
        />,
      );

      const input = screen.getByTestId('test-input');
      expect(input).not.to.equal(null);

      fireEvent.click(input);
      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('hidden input step attribute', () => {
    function StepTest(props) {
      const { getRootProps, getThumbProps, getHiddenInputProps } = useSlider(props);
      return (
        <div {...getRootProps()}>
          <div {...getThumbProps()}>
            <input {...getHiddenInputProps({ 'data-testid': 'step-input' })} />
          </div>
        </div>
      );
    }

    it('should set step="any" when step is null and marks are provided', () => {
      render(
        <StepTest
          step={null}
          marks={[{ value: 0 }, { value: 50 }, { value: 100 }]}
          defaultValue={50}
        />,
      );
      expect(screen.getByTestId('step-input')).to.have.attribute('step', 'any');
    });

    it('should not set step="any" when step is omitted', () => {
      render(<StepTest marks={[{ value: 0 }, { value: 50 }, { value: 100 }]} defaultValue={50} />);
      // step is omitted (undefined), not null — should NOT become "any"
      expect(screen.getByTestId('step-input')).not.to.have.attribute('step', 'any');
    });
  });
});
