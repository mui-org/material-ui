import * as React from 'react';
import { expect } from 'chai';
import { BadgeUnstyled } from '@material-ui/unstyled';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Badge, { badgeClasses as classes } from '@material-ui/core/Badge';

function findBadge(container) {
  return container.firstChild.querySelector('span');
}

describe('<Badge />', () => {
  const render = createClientRender();

  const defaultProps = {
    children: (
      <div className="unique" data-testid="children">
        Hello World
      </div>
    ),
    badgeContent: 10,
  };

  describeConformanceV5(
    <Badge>
      <div />
    </Badge>,
    () => ({
      classes,
      inheritComponent: BadgeUnstyled,
      render,
      refInstanceof: window.HTMLSpanElement,
      muiName: 'MuiBadge',
      testVariantProps: { color: 'secondary', variant: 'dot' },
    }),
  );

  it('renders children and badgeContent', () => {
    const children = <div id="child" data-testid="child" />;
    const badge = <div id="badge" data-testid="badge" />;
    const { container, getByTestId } = render(<Badge badgeContent={badge}>{children}</Badge>);
    expect(container.firstChild).to.contain(getByTestId('child'));
    expect(container.firstChild).to.contain(getByTestId('badge'));
  });

  it('renders children and overwrite badge class', () => {
    const badgeClassName = 'testBadgeClassName';
    const { container } = render(<Badge {...defaultProps} classes={{ badge: badgeClassName }} />);
    expect(findBadge(container)).to.have.class(badgeClassName);
  });

  it('renders children', () => {
    const { container, getByTestId } = render(
      <Badge className="testClassName" {...defaultProps} />,
    );
    expect(container.firstChild).to.contain(getByTestId('children'));
  });

  describe('prop: color', () => {
    it('should have the colorPrimary class when color="primary"', () => {
      const { container } = render(<Badge {...defaultProps} color="primary" />);
      expect(findBadge(container)).to.have.class(classes.colorPrimary);
    });

    it('should have the colorSecondary class when color="secondary"', () => {
      const { container } = render(<Badge {...defaultProps} color="secondary" />);
      expect(findBadge(container)).to.have.class(classes.colorSecondary);
    });

    it('should have the colorError class when color="error"', () => {
      const { container } = render(<Badge {...defaultProps} color="error" />);
      expect(findBadge(container)).to.have.class(classes.colorError);
    });
  });

  describe('prop: invisible', () => {
    it('should default to false', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render without the invisible class when set to false', () => {
      const { container } = render(<Badge {...defaultProps} invisible={false} />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render with the invisible class when set to true', () => {
      const { container } = render(<Badge {...defaultProps} invisible />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });

    it('should render with the invisible class when empty and not dot', () => {
      let container;
      container = render(<Badge {...defaultProps} badgeContent={null} />).container;
      expect(findBadge(container)).to.have.class(classes.invisible);
      container = render(<Badge {...defaultProps} badgeContent={undefined} />).container;
      expect(findBadge(container)).to.have.class(classes.invisible);
      container = render(
        <Badge {...defaultProps} badgeContent={undefined} variant="dot" />,
      ).container;
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });
  });

  describe('prop: showZero', () => {
    it('should default to false', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });

    it('should render without the invisible class when false and badgeContent is not 0', () => {
      const { container } = render(<Badge {...defaultProps} showZero />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render without the invisible class when true and badgeContent is 0', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} showZero />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
    });

    it('should render with the invisible class when false and badgeContent is 0', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={0} showZero={false} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
    });
  });

  describe('prop: variant', () => {
    it('should default to standard', () => {
      const { container } = render(<Badge {...defaultProps} />);
      expect(findBadge(container)).to.have.class(classes.badge);
      expect(findBadge(container)).not.to.have.class(classes.dot);
    });

    it('should render with the standard class when variant="standard"', () => {
      const { container } = render(<Badge {...defaultProps} variant="standard" />);
      expect(findBadge(container)).to.have.class(classes.badge);
      expect(findBadge(container)).not.to.have.class(classes.dot);
    });

    it('should not render badgeContent when variant="dot"', () => {
      const { container } = render(<Badge {...defaultProps} variant="dot" />);
      expect(findBadge(container)).to.have.class(classes.badge);
      expect(findBadge(container)).to.have.class(classes.dot);
      expect(findBadge(container)).to.have.text('');
    });
  });

  describe('prop: max', () => {
    it('should default to 99', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={100} />);
      expect(findBadge(container)).to.have.text('99+');
    });

    it('should cap badgeContent', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={1000} max={999} />);
      expect(findBadge(container)).to.have.text('999+');
    });

    it('should not cap if badgeContent and max are equal', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={1000} max={1000} />);
      expect(findBadge(container)).to.have.text('1000');
    });

    it('should not cap if badgeContent is lower than max', () => {
      const { container } = render(<Badge {...defaultProps} badgeContent={50} max={1000} />);
      expect(findBadge(container)).to.have.text('50');
    });
  });

  it('retains anchorOrigin, content, color, max, overlap and variant when invisible is true for consistent disappearing transition', () => {
    const { container, setProps } = render(
      <Badge {...defaultProps} color="secondary" variant="dot" />,
    );

    setProps({
      badgeContent: 0,
      color: 'primary',
      variant: 'standard',
      overlap: 'circular',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });

    expect(findBadge(container)).to.have.text('');
    expect(findBadge(container)).to.have.class(classes.colorSecondary);
    expect(findBadge(container)).to.have.class(classes.dot);
    expect(findBadge(container)).to.have.class(classes.anchorOriginTopRightRectangular);
  });
});
