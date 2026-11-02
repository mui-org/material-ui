import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, fireEvent, isJsdom, screen } from '@mui/internal-test-utils';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import { fabClasses } from '@mui/material/Fab';
import SpeedDialAction, { speedDialActionClasses as classes } from '@mui/material/SpeedDialAction';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

const CustomButton = React.forwardRef(({ ownerState, ...props }, ref) => (
  <button ref={ref} {...props} data-testid="custom" />
));

const CustomTooltip = React.forwardRef(({ onOpen, onClose, ownerState, ...props }, ref) => (
  <div ref={ref} {...props} data-testid="custom" />
));

describe('<SpeedDialAction />', () => {
  const { clock, render, renderToString } = createRenderer({ clock: 'fake' });

  describeConformance(
    <SpeedDialAction icon={<Icon>add</Icon>} slotProps={{ tooltip: { title: 'placeholder' } }} />,
    () => ({
      classes,
      inheritComponent: Tooltip,
      render,
      refInstanceof: window.HTMLButtonElement,
      muiName: 'MuiSpeedDialAction',
      testRootOverrides: { slotName: 'fab' },
      skip: ['componentProp', 'themeVariants'],
      slots: {
        fab: {
          expectedClassName: classes.fab,
          testWithElement: null,
          testWithComponent: CustomButton,
        },
        tooltip: {
          expectedClassName: classes.tooltip,
          testWithElement: null,
          testWithComponent: CustomTooltip,
        },
      },
    }),
  );

  it('should be able to change the slotProps.tooltip.classes', () => {
    const { container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        open
        slotProps={{
          tooltip: {
            classes: { tooltip: 'bar' },
            title: 'placeholder',
          },
        }}
      />,
    );

    fireEvent.mouseOver(container.querySelector('button'));
    clock.tick(100);

    expect(screen.getByText('placeholder')).to.have.class('bar');
  });

  it('should render a Fab', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} slotProps={{ tooltip: { title: 'placeholder' } }} />,
    );
    expect(container.querySelector('button')).to.have.class(fabClasses.root);
  });

  it.skipIf(isJsdom())('disables CSS transitions when reduced motion is always', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <SpeedDialAction
          delay={90}
          icon={<Icon>add</Icon>}
          open
          slotProps={{ tooltip: { open: true, title: 'placeholder' } }}
        />
      </ThemeProvider>,
    );

    expect(container.querySelector('button')).toHaveComputedStyle({
      transitionDelay: '0s',
      transitionDuration: '0s',
    });
    expect(container.querySelector(`.${classes.staticTooltipLabel}`)).toHaveComputedStyle({
      transitionDelay: '0s',
      transitionDuration: '0s',
    });
  });

  it('uses authored transition delay when reduced motion is never', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'never',
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <SpeedDialAction
          delay={90}
          icon={<Icon>add</Icon>}
          open
          slotProps={{ tooltip: { open: true, title: 'placeholder' } }}
        />
      </ThemeProvider>,
    );

    expect(container.querySelector('button')).toHaveInlineStyle({ transitionDelay: '90ms' });
    expect(container.querySelector(`.${classes.staticTooltipLabel}`)).toHaveInlineStyle({
      transitionDelay: '90ms',
    });
  });

  it('server-renders system mode with reduced transition delay before the media query resolves', () => {
    const theme = createTheme({
      motion: {
        reducedMotion: 'system',
      },
    });

    const { container } = renderToString(
      <ThemeProvider theme={theme}>
        <SpeedDialAction
          delay={90}
          icon={<Icon>add</Icon>}
          open
          slotProps={{ tooltip: { open: true, title: 'placeholder' } }}
        />
      </ThemeProvider>,
    );

    expect(container.querySelector('button')).toHaveInlineStyle({ transitionDelay: '0ms' });
    expect(container.querySelector(`.${classes.staticTooltipLabel}`)).toHaveInlineStyle({
      transitionDelay: '0ms',
    });
  });

  it('should have accessible name if slotProps.tooltip.open is true', () => {
    render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        slotProps={{ tooltip: { open: true, title: 'placeholder' } }}
      />,
    );

    const target = screen.getByRole('menuitem');
    expect(target).toHaveAccessibleName('placeholder');
  });

  it('should have accessible name if slotProps.tooltip.open is false', () => {
    render(
      <SpeedDialAction icon={<Icon>add</Icon>} slotProps={{ tooltip: { title: 'placeholder' } }} />,
    );

    const target = screen.getByRole('menuitem');
    expect(target).toHaveAccessibleName('placeholder');
  });

  it('should render the button with the fab class', () => {
    const { container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        slotProps={{ tooltip: { title: 'placeholder' } }}
        open
      />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} slotProps={{ tooltip: { title: 'placeholder' } }} />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
    expect(container.querySelector('button')).to.have.class(classes.fabClosed);
  });

  it('should have staticTooltip class if slotProps.tooltip.open is true', () => {
    const { container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        slotProps={{ tooltip: { open: true, title: 'placeholder' } }}
      />,
    );
    const [staticToolTip, staticToolTipLabel] = container.querySelectorAll('span');
    expect(staticToolTip).to.have.class(classes.staticTooltip);
    expect(staticToolTipLabel).to.have.class(classes.staticTooltipLabel);
  });

  [
    ['top-start', 'tooltipPlacementTop'],
    ['auto', 'tooltipPlacementLeft'],
  ].forEach(([placement, className]) => {
    it(`styles the static tooltip with ${className} when placement is ${placement}`, () => {
      const { container } = render(
        <SpeedDialAction
          icon={<Icon>add</Icon>}
          slotProps={{ tooltip: { open: true, placement, title: 'placeholder' } }}
        />,
      );

      expect(container.querySelector(`.${classes.staticTooltip}`)).to.have.class(
        classes[className],
      );
    });
  });

  it('should have staticToolTip and staticToolTipLabel classes if slotProps.tooltip.open is true and custom slots are provided', () => {
    const CustomStaticTooltip = React.forwardRef(({ ownerState, ...props }, ref) => (
      <div {...props} ref={ref}>
        {props.children}
      </div>
    ));
    const CustomStaticTooltipLabel = React.forwardRef(({ ownerState, ...props }, ref) => (
      <div {...props} ref={ref}>
        {props.children}
      </div>
    ));

    const { container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        slotProps={{ tooltip: { open: true, title: 'placeholder' } }}
        slots={{
          staticTooltip: CustomStaticTooltip,
          staticTooltipLabel: CustomStaticTooltipLabel,
        }}
      />,
    );

    const [staticToolTip, staticToolTipLabel] = container.querySelectorAll('div');

    expect(staticToolTip).to.have.class(classes.staticTooltip);

    expect(staticToolTip).to.have.class(classes.staticTooltip);
    expect(staticToolTipLabel).to.have.class(classes.staticTooltipLabel);
  });
});
