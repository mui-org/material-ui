import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { spy } from 'sinon';
import { expect } from 'chai';
import { describeConformance, fireEvent, fireTouchChangedEvent } from 'test/utils';
import MobileTimePicker from '@material-ui/lab/MobileTimePicker';
import {
  wrapPickerMount,
  createPickerRender,
  adapterToUse,
  getByMuiTest,
} from '../internal/pickers/test-utils';

function createMouseEventWithOffsets(
  type: 'mousedown' | 'mousemove' | 'mouseup',
  { offsetX, offsetY, ...eventOptions }: { offsetX: number; offsetY: number } & MouseEventInit,
) {
  const event = new window.MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    ...eventOptions,
  });

  Object.defineProperty(event, 'offsetX', { get: () => offsetX });
  Object.defineProperty(event, 'offsetY', { get: () => offsetY });

  return event;
}

describe('<MobileTimePicker />', () => {
  const render = createPickerRender();

  describeConformance(
    <MobileTimePicker
      onChange={() => {}}
      renderInput={(props) => <TextField {...props} />}
      value={null}
    />,
    () => ({
      classes: {},
      wrapMount: wrapPickerMount,
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'mergeClassName', 'propsSpread', 'rootClass', 'reactTestRenderer'],
    }),
  );

  it('accepts time on clock mouse move', () => {
    const onChangeMock = spy();
    render(
      <MobileTimePicker
        ampm
        open
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />,
    );

    const fakeEventOptions = {
      buttons: 1,
      offsetX: 20,
      offsetY: 15,
    };

    fireEvent(getByMuiTest('clock'), createMouseEventWithOffsets('mousemove', fakeEventOptions));
    fireEvent(getByMuiTest('clock'), createMouseEventWithOffsets('mouseup', fakeEventOptions));

    expect(getByMuiTest('hours')).to.have.text('11');
    expect(onChangeMock.callCount).to.equal(1);
  });

  it('accepts time on clock touch move', function test() {
    if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
      this.skip();
    }

    const onChangeMock = spy();
    render(
      <MobileTimePicker
        ampm
        open
        openTo="minutes"
        value={adapterToUse.date('2018-01-01T00:00:00.000')}
        onChange={onChangeMock}
        renderInput={(params) => <TextField {...params} />}
      />,
    );

    fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', {
      changedTouches: [{ clientX: 20, clientY: 15 }],
    });
    expect(getByMuiTest('minutes')).to.have.text('53');
  });

  it('allows to select full date from empty', function test() {
    if (typeof window.Touch === 'undefined' || typeof window.TouchEvent === 'undefined') {
      this.skip();
    }

    function TimePickerWithState() {
      const [time, setTime] = React.useState(null);

      return (
        <MobileTimePicker
          open
          value={time}
          onChange={(newTime) => setTime(newTime)}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    }

    render(<TimePickerWithState />);

    expect(getByMuiTest('hours')).to.have.text('--');
    expect(getByMuiTest('minutes')).to.have.text('--');

    fireTouchChangedEvent(getByMuiTest('clock'), 'touchmove', {
      changedTouches: [
        {
          clientX: 20,
          clientY: 15,
        },
      ],
    });

    expect(getByMuiTest('hours')).not.to.have.text('--');
    expect(getByMuiTest('minutes')).not.to.have.text('--');
  });
});
