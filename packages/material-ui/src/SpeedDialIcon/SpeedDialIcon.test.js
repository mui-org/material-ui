import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Icon from '@material-ui/core/Icon';
import SpeedDialIcon, { speedDialIconClasses as classes } from '@material-ui/core/SpeedDialIcon';

describe('<SpeedDialIcon />', () => {
  const render = createClientRender();
  const icon = <Icon>font_icon</Icon>;

  describeConformanceV5(<SpeedDialIcon />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    refInstanceof: window.HTMLSpanElement,
    muiName: 'MuiSpeedDialIcon',
    testVariantProps: { icon },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render the Add icon by default', () => {
    const { getAllByTestId } = render(<SpeedDialIcon />);
    expect(getAllByTestId('AddIcon').length).to.equal(1);
  });

  it('should render an Icon', () => {
    const { container } = render(<SpeedDialIcon icon={icon} />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.icon);
  });

  it('should render an openIcon', () => {
    const { container } = render(<SpeedDialIcon openIcon={icon} />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIcon);
  });

  it('should render the icon with the icon class', () => {
    const { container } = render(<SpeedDialIcon />);
    expect(container.querySelector('svg')).to.have.class(classes.icon);
    expect(container.querySelector('svg')).not.to.have.class(classes.iconOpen);
    expect(container.querySelector('svg')).not.to.have.class(classes.iconWithOpenIconOpen);
  });

  it('should render the icon with the icon and iconOpen classes', () => {
    const { container } = render(<SpeedDialIcon open />);
    expect(container.querySelector('svg')).to.have.class(classes.icon);
    expect(container.querySelector('svg')).to.have.class(classes.iconOpen);
    expect(container.querySelector('svg')).not.to.have.class(classes.iconWithOpenIconOpen);
  });

  it('should render the icon with the icon, iconOpen iconWithOpenIconOpen classes', () => {
    const { container } = render(<SpeedDialIcon open openIcon={icon} />);
    expect(container.querySelector('svg')).to.have.class(classes.icon);
    expect(container.querySelector('svg')).to.have.class(classes.iconOpen);
    expect(container.querySelector('svg')).to.have.class(classes.iconWithOpenIconOpen);
  });

  it('should render the openIcon with the openIcon class', () => {
    const { container } = render(<SpeedDialIcon openIcon={icon} />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIcon);
    expect(container.firstChild.querySelector('span')).not.to.have.class(classes.openIconOpen);
  });

  it('should render the openIcon with the openIcon, openIconOpen classes', () => {
    const { container } = render(<SpeedDialIcon openIcon={icon} open />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIcon);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIconOpen);
  });
});
