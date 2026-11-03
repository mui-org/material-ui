import { describe, it, expect } from 'vitest';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses as classes } from '@mui/material/Divider';
import describeConformance from '../../test/describeConformance';

describe('<Divider />', () => {
  const { render } = createRenderer();

  describeConformance(<Divider />, () => ({
    classes,
    inheritComponent: 'hr',
    render,
    muiName: 'MuiDivider',
    refInstanceof: window.HTMLHRElement,
    testComponentPropWith: 'div',
    testVariantProps: { orientation: 'vertical', flexItem: true, textAlign: 'left' },
  }));

  it('should set the absolute class', () => {
    const { container } = render(<Divider absolute />);
    expect(container.firstChild).to.have.class(classes.absolute);
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
        expect(container.querySelectorAll(`.${classes.withChildren}`).length).to.equal(1);
        expect(container.querySelectorAll(`.${classes.vertical}`).length).to.equal(1);
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

    describe.skipIf(isJsdom())('custom border style', function test() {
      const StyledDivider = styled(Divider)(() => ({
        borderStyle: 'dashed',
      }));

      it('should set the dashed border-left-style in before and after pseudo-elements when orientation is vertical', () => {
        const { container } = render(<StyledDivider orientation="vertical">content</StyledDivider>);
        expect(
          getComputedStyle(container.firstChild, '::before').getPropertyValue('border-left-style'),
        ).to.equal('dashed');
        expect(
          getComputedStyle(container.firstChild, '::after').getPropertyValue('border-left-style'),
        ).to.equal('dashed');
      });

      it('should set the dashed border-top-style in before and after pseudo-elements when orientation is horizontal', () => {
        const { container } = render(
          <StyledDivider orientation="horizontal">content</StyledDivider>,
        );
        expect(
          getComputedStyle(container.firstChild, '::before').getPropertyValue('border-top-style'),
        ).to.equal('dashed');
        expect(
          getComputedStyle(container.firstChild, '::after').getPropertyValue('border-top-style'),
        ).to.equal('dashed');
      });
    });
  });

  describe('prop: variant', () => {
    it('should default to variant="fullWidth"', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).not.to.have.class(classes.inset);
      expect(container.firstChild).not.to.have.class(classes.middle);
    });

    describe('prop: variant="fullWidth"', () => {
      it('should render with the root and default class', () => {
        const { container } = render(<Divider />);
        expect(container.firstChild).to.have.class(classes.root);
      });
    });

    describe('prop: variant="inset"', () => {
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
      render(<Divider />);
      expect(screen.getByRole('separator')).not.to.have.attribute('role');
      expect(screen.getByRole('separator')).not.to.have.attribute('aria-orientation');
    });

    it('adds a proper role if none is specified', () => {
      render(<Divider component="div" />);
      expect(screen.getByRole('separator')).not.to.equal(null);
      expect(screen.getByRole('separator')).to.have.attribute('aria-orientation');
    });

    it('adds a proper role with vertical orientation', () => {
      render(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator')).not.to.equal(null);
      expect(screen.getByRole('separator')).to.have.attribute('aria-orientation');
    });

    it('overrides the computed role with the provided one', () => {
      // presentation is the only valid aria role
      render(<Divider role="presentation" data-testid="divider" />);
      expect(screen.queryByRole('separator')).to.equal(null);
      expect(screen.getByTestId('divider')).to.have.attribute('role', 'presentation');
      expect(screen.getByTestId('divider')).not.to.have.attribute('aria-orientation');
    });
  });
});
