import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, createClientRender } from 'test/utils';
import Divider, { dividerClasses as classes } from '@material-ui/core/Divider';

describe('<Divider />', () => {
  const render = createClientRender();

  describeConformanceV5(<Divider />, () => ({
    classes,
    inheritComponent: 'hr',
    render,
    muiName: 'MuiDivider',
    refInstanceof: window.HTMLHRElement,
    testComponentPropWith: 'div',
    testVariantProps: { orientation: 'vertical', flexItem: true, textAlign: 'left' },
    skip: ['componentsProp'],
  }));

  it('should set the absolute class', () => {
    const { container } = render(<Divider absolute />);
    expect(container.firstChild).to.have.class(classes.absolute);
  });

  it('should set the light class', () => {
    const { container } = render(<Divider light />);
    expect(container.firstChild).to.have.class(classes.light);
  });

  it('should set the flexItem class', () => {
    const { container } = render(<Divider flexItem />);
    expect(container.firstChild).to.have.class(classes.flexItem);
  });

  describe('prop: children', () => {
    it('should render with the children', () => {
      const text = 'test content';
      const { container } = render(<Divider>{text}</Divider>);
      expect(container.querySelectorAll('span').length).to.equal(1);
      expect(container.querySelectorAll('span')[0].textContent).to.equal(text);
    });

    it('should set the default text class', () => {
      const { container } = render(<Divider>content</Divider>);
      expect(container.firstChild).to.have.class(classes.withChildren);
    });

    describe('prop: orientation', () => {
      it('should set the textVertical class', () => {
        const { container } = render(<Divider orientation="vertical">content</Divider>);
        expect(container.querySelectorAll(`.${classes.withChildrenVertical}`).length).to.equal(1);
        expect(container.querySelectorAll(`.${classes.wrapperVertical}`).length).to.equal(1);
      });
    });

    describe('prop: textAlign', () => {
      it('should set the textAlignRight class', () => {
        const { container } = render(<Divider textAlign="right">content</Divider>);
        expect(container.querySelectorAll(`.${classes.textAlignRight}`).length).to.equal(1);
      });

      it('should set the textAlignLeft class', () => {
        const { container } = render(<Divider textAlign="left">content</Divider>);
        expect(container.querySelectorAll(`.${classes.textAlignLeft}`).length).to.equal(1);
      });

      it('should not set the textAlignRight class if orientation="vertical"', () => {
        const { container } = render(
          <Divider textAlign="right" orientation="vertical">
            content
          </Divider>,
        );
        expect(container.querySelectorAll(`.${classes.textAlignRight}`).length).to.equal(0);
      });

      it('should not set the textAlignLeft class if orientation="vertical"', () => {
        const { container } = render(
          <Divider textAlign="left" orientation="vertical">
            content
          </Divider>,
        );
        expect(container.querySelectorAll(`.${classes.textAlignLeft}`).length).to.equal(0);
      });
    });
  });

  describe('prop: variant', () => {
    it('should default to variant="fullWidth"', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).not.to.have.class(classes.inset);
      expect(container.firstChild).not.to.have.class(classes.middle);
    });

    describe('prop: variant="fullWidth" ', () => {
      it('should render with the root and default class', () => {
        const { container } = render(<Divider />);
        expect(container.firstChild).to.have.class(classes.root);
      });
    });

    describe('prop: variant="inset" ', () => {
      it('should set the inset class', () => {
        const { container } = render(<Divider variant="inset" />);
        expect(container.firstChild).to.have.class(classes.inset);
      });
    });

    describe('prop: variant="middle" with default orientation (horizontal)', () => {
      it('should set the middle class', () => {
        const { container } = render(<Divider variant="middle" />);
        expect(container.firstChild).to.have.class(classes.middle);
        expect(container.firstChild).toHaveComputedStyle({
          marginLeft: '16px',
          marginRight: '16px',
        });
      });
    });

    describe('prop: variant="middle" with orientation="vertical"', () => {
      it('should set the middle class with marginTop & marginBottom styles', () => {
        const { container } = render(<Divider variant="middle" orientation="vertical" />);
        expect(container.firstChild).toHaveComputedStyle({
          marginTop: '8px',
          marginBottom: '8px',
        });
      });
    });
  });

  describe('role', () => {
    it('avoids adding implicit aria semantics', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).not.to.have.attribute('role');
    });

    it('adds a proper role if none is specified', () => {
      const { container } = render(<Divider component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'separator');
    });

    it('overrides the computed role with the provided one', () => {
      // presentation is the only valid aria role
      const { container } = render(<Divider role="presentation" />);
      expect(container.firstChild).to.have.attribute('role', 'presentation');
    });
  });
});
