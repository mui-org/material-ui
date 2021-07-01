import * as React from 'react';
import PropTypes from 'prop-types';
import { spy, stub } from 'sinon';
import { expect } from 'chai';
import { describeConformanceV5, act, createClientRender, fireEvent, screen } from 'test/utils';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { SliderUnstyled } from '@material-ui/unstyled';
import Slider, { sliderClasses as classes } from '@material-ui/core/Slider';

function createTouches(touches) {
  return {
    changedTouches: touches.map(
      (touch) =>
        new Touch({
          target: document.body,
          ...touch,
        }),
    ),
  };
}

describe('<Slider />', () => {
  before(function beforeHook() {
    // only run in supported browsers
    if (typeof Touch === 'undefined') {
      this.skip();
    }
  });

  const render = createClientRender();

  describeConformanceV5(<Slider value={0} />, () => ({
    classes,
    inheritComponent: SliderUnstyled,
    render,
    refInstanceof: window.HTMLSpanElement,
    muiName: 'MuiSlider',
    testDeepOverrides: { slotName: 'thumb', slotClassName: classes.thumb },
    testVariantProps: { color: 'primary', orientation: 'vertical', size: 'small' },
    testStateOverrides: { prop: 'color', value: 'secondary', styleKey: 'colorSecondary' },
  }));

  it('should call handlers', () => {
    const handleChange = spy();
    const handleChangeCommitted = spy();

    const { container, getByRole } = render(
      <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
    );
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 100,
      left: 0,
    }));
    const slider = getByRole('slider');

    fireEvent.mouseDown(container.firstChild, {
      buttons: 1,
      clientX: 10,
    });
    fireEvent.mouseUp(container.firstChild, {
      buttons: 1,
      clientX: 10,
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(10);
    expect(handleChangeCommitted.callCount).to.equal(1);
    expect(handleChangeCommitted.args[0][1]).to.equal(10);

    slider.focus();
    fireEvent.change(slider, { target: { value: 23 } });
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(2);
  });

  it('should only listen to changes from the same touchpoint', () => {
    const handleChange = spy();
    const handleChangeCommitted = spy();
    const { container } = render(
      <Slider onChange={handleChange} onChangeCommitted={handleChangeCommitted} value={0} />,
    );

    fireEvent.touchStart(container.firstChild, createTouches([{ identifier: 1 }]));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchEnd(document.body, createTouches([{ identifier: 2 }]));
    expect(handleChange.callCount).to.equal(1);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchMove(document.body, createTouches([{ identifier: 1 }]));
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchMove(document.body, createTouches([{ identifier: 2 }]));
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(0);

    fireEvent.touchEnd(document.body, createTouches([{ identifier: 1 }]));
    expect(handleChange.callCount).to.equal(2);
    expect(handleChangeCommitted.callCount).to.equal(1);
  });

  it('should hedge against a dropped mouseup event', () => {
    const handleChange = spy();
    const { container } = render(<Slider onChange={handleChange} value={0} />);
    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 100,
      left: 0,
    }));

    fireEvent.mouseDown(container.firstChild, {
      buttons: 1,
      clientX: 1,
    });
    expect(handleChange.callCount).to.equal(1);
    expect(handleChange.args[0][1]).to.equal(1);

    fireEvent.mouseMove(document.body, {
      buttons: 1,
      clientX: 10,
    });
    expect(handleChange.callCount).to.equal(2);
    expect(handleChange.args[1][1]).to.equal(10);

    fireEvent.mouseMove(document.body, {
      buttons: 0,
      clientX: 11,
    });
    // The mouse's button was released, stop the dragging session.
    expect(handleChange.callCount).to.equal(2);
  });

  describe('prop: orientation', () => {
    it('should render with the vertical classes', () => {
      const { container, getByRole } = render(<Slider orientation="vertical" value={0} />);
      expect(container.firstChild).to.have.class(classes.vertical);
      expect(getByRole('slider')).to.have.attribute('aria-orientation', 'vertical');
    });

    it('should report the right position', () => {
      const handleChange = spy();
      const { container } = render(
        <Slider orientation="vertical" defaultValue={20} onChange={handleChange} />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 10,
        height: 100,
        bottom: 100,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 0, clientY: 20 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 0, clientY: 22 }]),
      );

      expect(handleChange.callCount).to.equal(2);
      expect(handleChange.args[0][1]).to.equal(80);
      expect(handleChange.args[1][1]).to.equal(78);
    });
  });

  describe('range', () => {
    it('should support keyboard', () => {
      const { getAllByRole } = render(<Slider defaultValue={[20, 30]} />);
      const [slider1, slider2] = getAllByRole('slider');

      act(() => {
        slider1.focus();
        fireEvent.change(slider1, { target: { value: '21' } });
      });

      expect(slider1.getAttribute('aria-valuenow')).to.equal('21');
      expect(slider2.getAttribute('aria-valuenow')).to.equal('30');

      act(() => {
        slider2.focus();
        fireEvent.change(slider2, { target: { value: '31' } });
      });

      expect(slider1.getAttribute('aria-valuenow')).to.equal('21');
      expect(slider2.getAttribute('aria-valuenow')).to.equal('31');

      act(() => {
        slider1.focus();
        fireEvent.change(slider1, { target: { value: '31' } });
      });

      expect(slider1.getAttribute('aria-valuenow')).to.equal('31');
      expect(slider2.getAttribute('aria-valuenow')).to.equal('31');
      expect(document.activeElement).to.have.attribute('data-index', '0');

      act(() => {
        slider1.focus();
        fireEvent.change(slider1, { target: { value: '32' } });
      });

      expect(slider1.getAttribute('aria-valuenow')).to.equal('31');
      expect(slider2.getAttribute('aria-valuenow')).to.equal('32');
      expect(document.activeElement).to.have.attribute('data-index', '1');
    });

    it('should focus the slider when dragging', () => {
      const { getByRole, getByTestId, container } = render(
        <Slider
          componentsProps={{ thumb: { 'data-testid': 'thumb' } }}
          defaultValue={30}
          step={10}
          marks
        />,
      );
      const slider = getByRole('slider');
      const thumb = getByTestId('thumb');

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        left: 0,
      }));

      fireEvent.mouseDown(thumb, {
        buttons: 1,
        clientX: 1,
      });

      expect(slider).toHaveFocus();
    });

    it('should support mouse events', () => {
      const handleChange = spy();
      const { container } = render(<Slider defaultValue={[20, 30]} onChange={handleChange} />);
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 22, clientY: 0 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 22, clientY: 0 }]),
      );

      expect(handleChange.callCount).to.equal(3);
      expect(handleChange.args[0][1]).to.deep.equal([21, 30]);
      expect(handleChange.args[1][1]).to.deep.equal([22, 30]);
      expect(handleChange.args[2][1]).to.equal(handleChange.args[1][1]);
    });

    it('should not react to right clicks', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <Slider onChange={handleChange} defaultValue={30} step={10} marks />,
      );
      const thumb = getByRole('slider');
      fireEvent.mouseDown(thumb, { button: 2 });
      expect(handleChange.callCount).to.equal(0);
    });
  });

  it('should not break when initial value is out of range', () => {
    const { container } = render(<Slider value={[19, 41]} min={20} max={40} />);

    stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
      width: 100,
      height: 10,
      bottom: 10,
      left: 0,
    }));

    fireEvent.touchStart(
      container.firstChild,
      createTouches([{ identifier: 1, clientX: 100, clientY: 0 }]),
    );

    fireEvent.touchMove(document.body, createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]));
  });

  it('focuses the thumb on when touching', () => {
    const { getByRole } = render(<Slider value={0} min={20} max={40} />);
    const thumb = getByRole('slider');

    fireEvent.touchStart(thumb, createTouches([{ identifier: 1, clientX: 0, clientY: 0 }]));

    expect(thumb).toHaveFocus();
  });

  describe('prop: step', () => {
    it('should handle a null step', () => {
      const { getByRole, container } = render(
        <Slider
          step={null}
          marks={[{ value: 0 }, { value: 20 }, { value: 30 }]}
          defaultValue={0}
        />,
      );
      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));
      const slider = getByRole('slider');

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]),
      );
      expect(slider).to.have.attribute('aria-valuenow', '20');

      fireEvent.change(slider, {
        target: {
          value: 21,
        },
      });
      expect(slider).to.have.attribute('aria-valuenow', '30');

      fireEvent.change(slider, {
        target: {
          value: 29,
        },
      });
      expect(slider).to.have.attribute('aria-valuenow', '20');
    });

    it('change events with non integer numbers should work', () => {
      const { getByRole } = render(
        <Slider defaultValue={0.2} min={-100} max={100} step={0.00000001} />,
      );
      const slider = getByRole('slider');
      act(() => {
        slider.focus();
      });

      fireEvent.change(slider, { target: { value: '51.1' } });
      expect(slider).to.have.attribute('aria-valuenow', '51.1');

      fireEvent.change(slider, { target: { value: '0.00000005' } });
      expect(slider).to.have.attribute('aria-valuenow', '5e-8');

      fireEvent.change(slider, { target: { value: '1e-7' } });
      expect(slider).to.have.attribute('aria-valuenow', '1e-7');
    });

    it('should round value to step precision', () => {
      const { getByRole, container } = render(
        <Slider defaultValue={0.2} min={0} max={1} step={0.1} />,
      );
      const slider = getByRole('slider');

      act(() => {
        slider.focus();
      });

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      act(() => {
        slider.focus();
      });

      expect(slider).to.have.attribute('aria-valuenow', '0.2');

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 80, clientY: 0 }]),
      );
      expect(slider).to.have.attribute('aria-valuenow', '0.8');

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 40, clientY: 0 }]),
      );
      expect(slider).to.have.attribute('aria-valuenow', '0.4');
    });

    it('should not fail to round value to step precision when step is very small', () => {
      const { getByRole, container } = render(
        <Slider defaultValue={0.00000002} min={0} max={0.0000001} step={0.00000001} />,
      );
      const slider = getByRole('slider');

      act(() => {
        slider.focus();
      });

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      act(() => {
        slider.focus();
      });

      expect(slider).to.have.attribute('aria-valuenow', '2e-8');

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 80, clientY: 0 }]),
      );
      expect(slider).to.have.attribute('aria-valuenow', '8e-8');
    });

    it('should not fail to round value to step precision when step is very small and negative', () => {
      const { getByRole, container } = render(
        <Slider defaultValue={-0.00000002} min={-0.0000001} max={0} step={0.00000001} />,
      );
      const slider = getByRole('slider');

      act(() => {
        slider.focus();
      });

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      act(() => {
        slider.focus();
      });

      expect(slider).to.have.attribute('aria-valuenow', '-2e-8');

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 80, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );
      expect(slider).to.have.attribute('aria-valuenow', '-8e-8');
    });
  });

  describe('prop: disabled', () => {
    it('should render the disabled classes', () => {
      const { container, getByRole } = render(<Slider disabled value={0} />);
      expect(container.firstChild).to.have.class(classes.disabled);
      expect(getByRole('slider')).not.to.have.attribute('tabIndex');
    });

    it('should not respond to drag events after becoming disabled', function test() {
      // TODO: Don't skip once a fix for https://github.com/jsdom/jsdom/issues/3029 is released.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByRole, setProps, container } = render(<Slider defaultValue={0} />);

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]),
      );

      const thumb = getByRole('slider');

      expect(thumb).to.have.attribute('aria-valuenow', '21');
      expect(thumb).toHaveFocus();

      setProps({ disabled: true });
      expect(thumb).not.toHaveFocus();
      expect(thumb).not.to.have.class(classes.active);

      fireEvent.touchMove(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 30, clientY: 0 }]),
      );

      expect(thumb).to.have.attribute('aria-valuenow', '21');
    });

    it('is not focused (visibly) after becoming disabled', function test() {
      // TODO: Don't skip once a fix for https://github.com/jsdom/jsdom/issues/3029 is released.
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByRole, setProps } = render(<Slider defaultValue={0} />);

      const thumb = getByRole('slider');
      act(() => {
        thumb.focus();
      });
      setProps({ disabled: true });
      expect(thumb).not.toHaveFocus();
      expect(thumb).not.to.have.class(classes.focusVisible);
    });

    it('should be customizable in the theme', () => {
      const theme = createTheme({
        components: {
          MuiSlider: {
            styleOverrides: {
              root: {
                [`&.${classes.disabled}`]: {
                  mixBlendMode: 'darken',
                },
              },
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Slider disabled value={0} />
        </ThemeProvider>,
      );
      expect(container.firstChild).to.toHaveComputedStyle({
        mixBlendMode: 'darken',
      });
    });
  });

  describe('prop: track', () => {
    it('should render the track classes for false', () => {
      const { container } = render(<Slider track={false} value={50} />);
      expect(container.firstChild).to.have.class(classes.trackFalse);
    });

    it('should render the track classes for inverted', () => {
      const { container } = render(<Slider track="inverted" value={50} />);
      expect(container.firstChild).to.have.class(classes.trackInverted);
    });
  });

  describe('aria-valuenow', () => {
    it('should update the aria-valuenow', () => {
      const { getByRole } = render(<Slider defaultValue={50} />);
      const slider = getByRole('slider');
      act(() => {
        slider.focus();
      });

      fireEvent.change(slider, { target: { value: 51 } });
      expect(slider).to.have.attribute('aria-valuenow', '51');

      fireEvent.change(slider, { target: { value: 52 } });
      expect(slider).to.have.attribute('aria-valuenow', '52');
    });
  });

  describe('prop: min', () => {
    it('should set the min and aria-valuemin on the input', () => {
      const min = 150;
      const { getByRole } = render(<Slider defaultValue={150} step={100} max={750} min={min} />);
      const slider = getByRole('slider');

      expect(slider).to.have.attribute('aria-valuemin', String(min));
      expect(slider).to.have.attribute('min', String(min));
    });

    it('should use min as the step origin', () => {
      const min = 150;
      const { getByRole } = render(<Slider defaultValue={150} step={100} max={750} min={min} />);
      const slider = getByRole('slider');
      act(() => {
        slider.focus();
      });

      expect(slider).to.have.attribute('aria-valuenow', String(min));
    });

    it('should not go less than the min', () => {
      const min = 150;
      const { getByRole } = render(<Slider defaultValue={150} step={100} max={750} min={min} />);
      const slider = getByRole('slider');
      act(() => {
        slider.focus();
      });

      fireEvent.change(slider, { target: { value: String(min - 100) } });
      expect(slider).to.have.attribute('aria-valuenow', String(min));
    });
  });
  describe('prop: max', () => {
    it('should set the max and aria-valuemax on the input', () => {
      const max = 750;
      const { getByRole } = render(<Slider defaultValue={150} step={100} max={max} min={150} />);
      const slider = getByRole('slider');

      expect(slider).to.have.attribute('aria-valuemax', String(max));
      expect(slider).to.have.attribute('max', String(max));
    });

    it('should not go more than the max', () => {
      const max = 750;
      const { getByRole } = render(<Slider defaultValue={150} step={100} max={max} min={150} />);
      const slider = getByRole('slider');
      act(() => {
        slider.focus();
      });

      fireEvent.change(slider, { target: { value: String(max + 100) } });
      expect(slider).to.have.attribute('aria-valuenow', String(max));
    });

    it('should reach right edge value', () => {
      const { getByRole, container } = render(
        <Slider defaultValue={90} min={6} max={108} step={10} />,
      );

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      const thumb = getByRole('slider');
      act(() => {
        thumb.focus();
      });

      expect(thumb).to.have.attribute('aria-valuenow', '90');

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 100, clientY: 0 }]),
      );
      expect(thumb).to.have.attribute('aria-valuenow', '106');

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 200, clientY: 0 }]),
      );
      expect(thumb).to.have.attribute('aria-valuenow', '108');

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 50, clientY: 0 }]),
      );
      expect(thumb).to.have.attribute('aria-valuenow', '56');

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: -100, clientY: 0 }]),
      );
      expect(thumb).to.have.attribute('aria-valuenow', '6');
    });
  });

  describe('prop: valueLabelDisplay', () => {
    it('should always display the value label according to on and off', () => {
      const { setProps } = render(
        <Slider
          valueLabelDisplay="on"
          value={50}
          componentsProps={{ thumb: { 'data-testid': 'thumb' } }}
        />,
      );
      expect(document.querySelector(`.${classes.valueLabelOpen}`)).not.to.equal(null);

      setProps({
        valueLabelDisplay: 'off',
      });

      expect(document.querySelector(`.${classes.valueLabelOpen}`)).to.equal(null);
    });

    it('should display the value label only on hover for auto', () => {
      const { getByTestId } = render(
        <Slider
          valueLabelDisplay="auto"
          value={50}
          componentsProps={{ thumb: { 'data-testid': 'thumb' } }}
        />,
      );
      const thumb = getByTestId('thumb');
      expect(document.querySelector(`.${classes.valueLabelOpen}`)).to.equal(null);

      fireEvent.mouseOver(thumb);

      expect(document.querySelector(`.${classes.valueLabelOpen}`)).not.to.equal(null);
    });

    it('should be respected when using custom value label', () => {
      function ValueLabelComponent(props) {
        const { value, open } = props;
        return (
          <span data-testid="value-label" className={open ? 'open' : ''}>
            {value}
          </span>
        );
      }
      ValueLabelComponent.propTypes = { value: PropTypes.number };

      const { setProps } = render(
        <Slider
          components={{ ValueLabel: ValueLabelComponent }}
          valueLabelDisplay="on"
          value={50}
        />,
      );

      expect(screen.queryByTestId('value-label')).to.have.class('open');

      setProps({
        valueLabelDisplay: 'off',
      });

      expect(screen.queryByTestId('value-label')).to.equal(null);
    });
  });

  describe('markActive state', () => {
    function getActives(container) {
      return Array.from(container.querySelectorAll(`.${classes.mark}`)).map((node) =>
        node.classList.contains(classes.markActive),
      );
    }

    it('sets the marks active that are `within` the value', () => {
      const marks = [{ value: 5 }, { value: 10 }, { value: 15 }];

      const { container: container1 } = render(
        <Slider min={0} max={20} value={12} marks={marks} />,
      );
      expect(getActives(container1)).to.deep.equal([true, true, false]);

      const { container: container2 } = render(
        <Slider min={0} max={20} value={[8, 12]} marks={marks} />,
      );
      expect(getActives(container2)).to.deep.equal([false, true, false]);
    });

    it('uses closed intervals for the within check', () => {
      const { container: container1 } = render(
        <Slider value={10} min={0} max={10} marks step={5} />,
      );
      expect(getActives(container1)).to.deep.equal([true, true, true]);

      const { container: container2 } = render(
        <Slider value={9.99999} min={0} max={10} marks step={5} />,
      );
      expect(getActives(container2)).to.deep.equal([true, true, false]);
    });

    it('should support inverted track', () => {
      const marks = [{ value: 5 }, { value: 10 }, { value: 15 }];

      const { container: container1 } = render(
        <Slider min={0} max={20} value={12} marks={marks} track="inverted" />,
      );
      expect(getActives(container1)).to.deep.equal([false, false, true]);

      const { container: container2 } = render(
        <Slider min={0} max={20} value={[8, 12]} marks={marks} track="inverted" />,
      );
      expect(getActives(container2)).to.deep.equal([true, false, true]);
    });
  });

  it('should forward mouseDown', () => {
    const handleMouseDown = spy();
    const { container } = render(<Slider disabled onMouseDown={handleMouseDown} value={0} />);
    fireEvent.mouseDown(container.firstChild);
    expect(handleMouseDown.callCount).to.equal(1);
  });

  describe('rtl', () => {
    it('should add direction css', () => {
      const { getByRole } = render(
        <ThemeProvider
          theme={createTheme({
            direction: 'rtl',
          })}
        >
          <Slider defaultValue={30} />
        </ThemeProvider>,
      );
      const thumb = getByRole('slider');
      act(() => {
        thumb.focus();
      });

      expect(thumb.style.direction).to.equal('rtl');
    });

    it('should handle RTL', () => {
      const handleChange = spy();
      const { container, getByTestId } = render(
        <ThemeProvider
          theme={createTheme({
            direction: 'rtl',
          })}
        >
          <Slider
            value={30}
            onChange={handleChange}
            componentsProps={{ thumb: { 'data-testid': 'thumb' } }}
          />
        </ThemeProvider>,
      );
      const thumb = getByTestId('thumb');
      expect(thumb.style.right).to.equal('30%');

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 22, clientY: 0 }]),
      );

      expect(handleChange.callCount).to.equal(2);
      expect(handleChange.args[0][1]).to.equal(80);
      expect(handleChange.args[1][1]).to.equal(78);
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should warn if aria-valuetext is provided', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Slider.propTypes,
          { classes: {}, value: [20, 50], 'aria-valuetext': 'hot' },
          'prop',
          'MockedSlider',
        );
      }).toErrorDev('Material-UI: You need to use the `getAriaValueText` prop instead of');
    });

    it('should warn if aria-label is provided', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Slider.propTypes,
          { classes: {}, value: [20, 50], 'aria-label': 'hot' },
          'prop',
          'MockedSlider',
        );
      }).toErrorDev('Material-UI: You need to use the `getAriaLabel` prop instead of');
    });

    it('should warn when switching from controlled to uncontrolled', () => {
      const { setProps } = render(<Slider value={[20, 50]} />);

      expect(() => {
        setProps({ value: undefined });
      }).toErrorDev(
        'Material-UI: A component is changing the controlled value state of Slider to be uncontrolled.',
      );
    });

    it('should warn when switching between uncontrolled to controlled', () => {
      const { setProps } = render(<Slider />);

      expect(() => {
        setProps({ value: [20, 50] });
      }).toErrorDev(
        'Material-UI: A component is changing the uncontrolled value state of Slider to be controlled.',
      );
    });
  });

  it('should support getAriaValueText', () => {
    const getAriaValueText = (value) => `${value}°C`;
    const { getAllByRole } = render(
      <Slider value={[20, 50]} getAriaValueText={getAriaValueText} />,
    );
    const sliders = getAllByRole('slider');

    expect(sliders[0]).to.have.attribute('aria-valuetext', '20°C');
    expect(sliders[1]).to.have.attribute('aria-valuetext', '50°C');
  });

  it('should support getAriaLabel', () => {
    const getAriaLabel = (index) => `Label ${index}`;
    const { getAllByRole } = render(<Slider value={[20, 50]} getAriaLabel={getAriaLabel} />);
    const sliders = getAllByRole('slider');

    expect(sliders[0]).to.have.attribute('aria-label', 'Label 0');
    expect(sliders[1]).to.have.attribute('aria-label', 'Label 1');
  });

  it('should allow customization of the marks', () => {
    const { container } = render(
      <Slider
        marks={[
          { value: 0, label: 0 },
          { value: 20, label: 20 },
          { value: 30, label: 30 },
        ]}
        defaultValue={0}
      />,
    );
    expect(container.querySelectorAll(`.${classes.markLabel}`).length).to.equal(3);
    expect(container.querySelectorAll(`.${classes.mark}`).length).to.equal(3);
    expect(container.querySelectorAll(`.${classes.markLabel}[data-index="2"]`).length).to.equal(1);
    expect(container.querySelectorAll(`.${classes.mark}[data-index="2"]`).length).to.equal(1);
  });

  it('should pass "name" and "value" as part of the event.target for onChange', () => {
    const handleChange = stub().callsFake((event) => event.target);
    const { getByRole } = render(
      <Slider onChange={handleChange} name="change-testing" value={3} />,
    );
    const slider = getByRole('slider');

    act(() => {
      slider.focus();
      fireEvent.change(slider, {
        target: {
          value: 4,
        },
      });
    });

    expect(handleChange.callCount).to.equal(1);
    const target = handleChange.firstCall.returnValue;
    expect(target).to.deep.equal({
      name: 'change-testing',
      value: 4,
    });
  });

  describe('prop: ValueLabelComponent', () => {
    it('receives the formatted value', () => {
      function ValueLabelComponent(props) {
        const { value } = props;
        return <span data-testid="value-label">{value}</span>;
      }
      ValueLabelComponent.propTypes = { value: PropTypes.string };

      const { getByTestId } = render(
        <Slider
          value={10}
          components={{ ValueLabel: ValueLabelComponent }}
          valueLabelDisplay="on"
          valueLabelFormat={(n) => n.toString(2)}
        />,
      );

      expect(getByTestId('value-label')).to.have.text('1010');
    });
  });

  it('should not override the event.target on touch events', () => {
    const handleChange = spy();
    const handleNativeEvent = spy();
    const handleEvent = spy();
    function Test() {
      React.useEffect(() => {
        document.addEventListener('touchstart', handleNativeEvent);
        return () => {
          document.removeEventListener('touchstart', handleNativeEvent);
        };
      });

      return (
        <div onTouchStart={handleEvent}>
          <Slider data-testid="slider" value={0} onChange={handleChange} />
        </div>
      );
    }
    render(<Test />);
    const slider = screen.getByTestId('slider');

    fireEvent.touchStart(slider, createTouches([{ identifier: 1 }]));

    expect(handleChange.callCount).to.equal(1);
    expect(handleNativeEvent.callCount).to.equal(1);
    expect(handleNativeEvent.firstCall.args[0]).to.have.property('target', slider);
    expect(handleEvent.callCount).to.equal(1);
    expect(handleEvent.firstCall.args[0]).to.have.property('target', slider);
  });

  it('should not override the event.target on mouse events', () => {
    const handleChange = spy();
    const handleNativeEvent = spy();
    const handleEvent = spy();
    function Test() {
      React.useEffect(() => {
        document.addEventListener('mousedown', handleNativeEvent);
        return () => {
          document.removeEventListener('mousedown', handleNativeEvent);
        };
      });

      return (
        <div onMouseDown={handleEvent}>
          <Slider data-testid="slider" value={0} onChange={handleChange} />
        </div>
      );
    }
    render(<Test />);
    const slider = screen.getByTestId('slider');

    fireEvent.mouseDown(slider);

    expect(handleChange.callCount).to.equal(1);
    expect(handleNativeEvent.callCount).to.equal(1);
    expect(handleNativeEvent.firstCall.args[0]).to.have.property('target', slider);
    expect(handleEvent.callCount).to.equal(1);
    expect(handleEvent.firstCall.args[0]).to.have.property('target', slider);
  });

  describe('dragging state', () => {
    it('should not apply class name for click modality', () => {
      const { container } = render(<Slider defaultValue={90} />);

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 21, clientY: 0 }]),
      );
      expect(container.firstChild).not.to.have.class(classes.dragging);
      fireEvent.touchEnd(document.body, createTouches([{ identifier: 1 }]));
    });

    it('should apply class name for dragging modality', () => {
      const { container } = render(<Slider defaultValue={90} />);

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 20, clientY: 0 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 200, clientY: 0 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 200, clientY: 0 }]),
      );

      expect(container.firstChild).not.to.have.class(classes.dragging);

      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 200, clientY: 0 }]),
      );

      expect(container.firstChild).to.have.class(classes.dragging);
      fireEvent.touchEnd(document.body, createTouches([{ identifier: 1 }]));
      expect(container.firstChild).not.to.have.class(classes.dragging);
    });
  });

  it('should remove the slider from the tab sequence', () => {
    render(<SliderUnstyled tabIndex={-1} value={30} />);
    expect(screen.getByRole('slider')).to.have.property('tabIndex', -1);
  });

  describe('prop: disableSwap', () => {
    it('should bound the value when using the keyboard', () => {
      const handleChange = spy();
      const { getAllByRole } = render(
        <Slider defaultValue={[20, 30]} disableSwap onChange={handleChange} />,
      );
      const [slider1, slider2] = getAllByRole('slider');

      act(() => {
        slider1.focus();
        fireEvent.change(slider2, { target: { value: '19' } });
      });
      expect(handleChange.args[0][1]).to.deep.equal([20, 20]);
      expect(document.activeElement).to.have.attribute('data-index', '1');
    });

    it('should bound the value when using the mouse', () => {
      const handleChange = spy();
      const { container } = render(
        <Slider defaultValue={[20, 30]} disableSwap onChange={handleChange} />,
      );

      stub(container.firstChild, 'getBoundingClientRect').callsFake(() => ({
        width: 100,
        height: 10,
        bottom: 10,
        left: 0,
      }));

      fireEvent.touchStart(
        container.firstChild,
        createTouches([{ identifier: 1, clientX: 35, clientY: 0 }]),
      );
      fireEvent.touchMove(
        document.body,
        createTouches([{ identifier: 1, clientX: 19, clientY: 0 }]),
      );
      expect(handleChange.args[0][1]).to.deep.equal([20, 35]);
      expect(handleChange.args[1][1]).to.deep.equal([20, 20]);
      expect(document.activeElement).to.have.attribute('data-index', '1');
    });
  });

  describe('prop: size', () => {
    it('should render default slider', () => {
      render(<Slider />);

      const root = document.querySelector(`.${classes.root}`);
      const thumb = document.querySelector(`.${classes.thumb}`);
      expect(root).not.to.have.class(classes.sizeSmall);
      expect(thumb).not.to.have.class(classes.thumbSizeSmall);
    });

    it('should render small slider', () => {
      render(<Slider size="small" />);

      const root = document.querySelector(`.${classes.root}`);
      const thumb = document.querySelector(`.${classes.thumb}`);
      expect(root).to.have.class(classes.sizeSmall);
      expect(thumb).to.have.class(classes.thumbSizeSmall);
    });
  });
});
