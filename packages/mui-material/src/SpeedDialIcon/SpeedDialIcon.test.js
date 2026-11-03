import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import Icon from '@mui/material/Icon';
import SpeedDialIcon, { speedDialIconClasses as classes } from '@mui/material/SpeedDialIcon';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

describe('<SpeedDialIcon />', () => {
  const { render } = createRenderer();
  const icon = <Icon>font_icon</Icon>;

  describeConformance(<SpeedDialIcon />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    refInstanceof: window.HTMLSpanElement,
    muiName: 'MuiSpeedDialIcon',
    testVariantProps: { icon },
    skip: ['componentProp'],
  }));

  it('should render the Add icon by default', () => {
    render(<SpeedDialIcon />);
    expect(screen.getAllByTestId('AddIcon').length).to.equal(1);
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

  it.skipIf(isJsdom())('disables CSS transitions when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <SpeedDialIcon open openIcon={icon} />
      </ThemeProvider>,
    );

    expect(container.querySelector(`.${classes.icon}`)).toHaveComputedStyle({
      transitionDuration: '0s',
    });
    expect(container.querySelector(`.${classes.openIcon}`)).toHaveComputedStyle({
      transitionDuration: '0s',
    });
  });
});
