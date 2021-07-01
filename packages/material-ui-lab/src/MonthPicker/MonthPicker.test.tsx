import * as React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { fireEvent, screen, describeConformanceV5 } from 'test/utils';
import MonthPicker, { monthPickerClasses as classes } from '@material-ui/lab/MonthPicker';
import { adapterToUse, wrapPickerMount, createPickerRender } from '../internal/pickers/test-utils';

describe('<MonthPicker />', () => {
  const render = createPickerRender();

  describeConformanceV5(
    <MonthPicker
      minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
      maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
      date={adapterToUse.date()}
      onChange={() => {}}
    />,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      wrapMount: wrapPickerMount,
      muiName: 'MuiMonthPicker',
      refInstanceof: window.HTMLDivElement,
      // cannot test reactTestRenderer because of required context
      skip: [
        'componentProp',
        'componentsProp',
        'propsSpread',
        'reactTestRenderer',
        'themeVariants',
      ],
    }),
  );

  it('allows to pick year standalone', () => {
    const onChangeMock = spy();
    render(
      <MonthPicker
        minDate={adapterToUse.date('2019-01-01T00:00:00.000')}
        maxDate={adapterToUse.date('2029-01-01T00:00:00.000')}
        date={adapterToUse.date('2019-02-02T00:00:00.000')}
        onChange={onChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('May', { selector: 'button' }));
    expect((onChangeMock.args[0][0] as Date).getMonth()).to.equal(4); // month index starting from 0
  });

  it('does not allow to pick months out of range', () => {
    const onChangeMock = spy();
    render(
      <MonthPicker
        minDate={adapterToUse.date('2020-04-01T00:00:00.000')}
        maxDate={adapterToUse.date('2020-06-01T00:00:00.000')}
        date={adapterToUse.date('2020-04-02T00:00:00.000')}
        onChange={onChangeMock}
      />,
    );

    fireEvent.click(screen.getByText('Mar', { selector: 'button' }));
    expect(onChangeMock.callCount).to.equal(0);

    fireEvent.click(screen.getByText('Apr', { selector: 'button' }));
    expect(onChangeMock.callCount).to.equal(1);
    expect((onChangeMock.args[0][0] as Date).getMonth()).to.equal(3); // month index starting from 0

    fireEvent.click(screen.getByText('Jul', { selector: 'button' }));
    expect(onChangeMock.callCount).to.equal(1);
  });
});
