import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, act, createClientRender, fireEvent } from 'test/utils';
import { useFakeTimers } from 'sinon';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { fabClasses } from '@material-ui/core/Fab';
import SpeedDialAction, {
  speedDialActionClasses as classes,
} from '@material-ui/core/SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const render = createClientRender();

  describeConformanceV5(
    <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    () => ({
      classes,
      inheritComponent: Tooltip,
      render,
      refInstanceof: window.HTMLButtonElement,
      muiName: 'MuiSpeedDialAction',
      testRootOverrides: { slotName: 'fab' },
      testVariantProps: { tooltipPlacement: 'right' },
      skip: ['componentProp', 'reactTestRenderer', 'componentsProp'],
    }),
  );

  it('should be able to change the Tooltip classes', () => {
    const { getByText, container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        open
        tooltipTitle="placeholder"
        TooltipClasses={{ tooltip: 'bar' }}
      />,
    );

    fireEvent.mouseOver(container.querySelector('button'));
    act(() => {
      clock.tick(100);
    });

    expect(getByText('placeholder')).to.have.class('bar');
  });

  it('should render a Fab', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(fabClasses.root);
  });

  it('should have accessible name if tooltipOpen={true}', () => {
    const { getByRole } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" tooltipOpen />,
    );
    const target = getByRole('menuitem');
    expect(target).toHaveAccessibleName('placeholder');
  });

  it('should have accessible name if tooltipOpen={false}', () => {
    const { getByRole } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    const target = getByRole('menuitem');
    expect(target).toHaveAccessibleName('placeholder');
  });

  it('should render the button with the fab class', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" open />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
    expect(container.querySelector('button')).to.have.class(classes.fabClosed);
  });
});
