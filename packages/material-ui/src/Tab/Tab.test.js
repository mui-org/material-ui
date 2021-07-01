import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformanceV5, act, createClientRender, fireEvent } from 'test/utils';
import Tab, { tabClasses as classes } from '@material-ui/core/Tab';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<Tab />', () => {
  const render = createClientRender();

  describeConformanceV5(<Tab textColor="inherit" />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiTab',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should have a ripple by default', () => {
    const { container } = render(<Tab TouchRippleProps={{ className: 'touch-ripple' }} />);

    expect(container.querySelector('.touch-ripple')).not.to.equal(null);
  });

  it('can disable the ripple', () => {
    const { container } = render(
      <Tab disableRipple TouchRippleProps={{ className: 'touch-ripple' }} />,
    );

    expect(container.querySelector('.touch-ripple')).to.equal(null);
  });

  it('should have a focusRipple by default', () => {
    const { container, getByRole } = render(
      <Tab TouchRippleProps={{ classes: { ripplePulsate: 'focus-ripple' } }} />,
    );
    // simulate pointer device
    fireEvent.pointerDown(document.body);

    act(() => {
      fireEvent.keyDown(document.body, { key: 'Tab' });
      // jsdom doesn't actually support tab focus, we need to do it manually
      getByRole('tab').focus();
    });

    expect(container.querySelector('.focus-ripple')).not.to.equal(null);
  });

  it('can disable the focusRipple', () => {
    const { container, getByRole } = render(
      <Tab disableFocusRipple TouchRippleProps={{ classes: { ripplePulsate: 'focus-ripple' } }} />,
    );
    // simulate pointer device
    fireEvent.pointerDown(document.body);

    act(() => {
      fireEvent.keyDown(document.body, { key: 'Tab' });
      // jsdom doesn't actually support tab focus, we need to do it manually
      getByRole('tab').focus();
    });

    expect(container.querySelector('.focus-ripple')).to.equal(null);
  });

  describe('prop: selected', () => {
    it('should render with the selected and root classes', () => {
      const { getByRole } = render(<Tab selected textColor="secondary" />);

      const tab = getByRole('tab');
      expect(tab).to.have.class(classes.root);
      expect(tab).to.have.class(classes.selected);
      expect(tab).to.have.class(classes.textColorSecondary);
      expect(tab).to.have.attribute('aria-selected', 'true');
    });
  });

  describe('prop: disabled', () => {
    it('should render with the disabled and root classes', () => {
      const { getByRole } = render(<Tab disabled textColor="secondary" />);

      const tab = getByRole('tab');
      expect(tab).to.have.class(classes.root);
      expect(tab).to.have.class(classes.disabled);
      expect(tab).to.have.class(classes.textColorSecondary);
    });
  });

  describe('prop: onClick', () => {
    it('should be called when a click is triggered', () => {
      const handleClick = spy();
      const { getByRole } = render(<Tab onClick={handleClick} />);

      getByRole('tab').click();

      expect(handleClick.callCount).to.equal(1);
    });
  });

  describe('prop: label', () => {
    it('should render label', () => {
      const { getByRole } = render(<Tab label="foo" />);

      expect(getByRole('tab')).to.have.text('foo');
    });
  });

  describe('prop: wrapped', () => {
    it('should add the wrapped class', () => {
      const { getByRole } = render(<Tab wrapped />);

      expect(getByRole('tab')).to.have.class(classes.wrapped);
    });
  });

  describe('prop: icon', () => {
    it('should render icon element', () => {
      const { getByTestId } = render(<Tab icon={<div data-testid="icon" />} />);

      expect(getByTestId('icon')).not.to.equal(null);
    });
  });

  describe('prop: textColor', () => {
    it('should support the inherit value', () => {
      const { getByRole } = render(<Tab selected textColor="inherit" />);

      const tab = getByRole('tab');
      expect(tab).to.have.class(classes.selected);
      expect(tab).to.have.class(classes.textColorInherit);
      expect(tab).to.have.class(classes.root);
    });
  });

  describe('prop: fullWidth', () => {
    it('should have the fullWidth class', () => {
      const { getByRole } = render(<Tab fullWidth />);

      expect(getByRole('tab')).to.have.class(classes.fullWidth);
    });
  });

  describe('prop: style', () => {
    it('should be able to override everything', () => {
      const { getByRole } = render(
        <Tab fullWidth style={{ width: '80%', color: 'red', alignText: 'center' }} />,
      );

      const { style } = getByRole('tab');
      expect(style).to.have.property('width', '80%');
      expect(style).to.have.property('color', 'red');
      expect(style).to.have.property('alignText', 'center');
    });
  });
});
