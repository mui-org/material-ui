import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Badge, { badgeClasses as classes } from '@mui/material/Badge';
import describeConformance from '../../test/describeConformance';

function findBadgeRoot(container) {
  return container.firstChild;
}

function findBadge(container) {
  return findBadgeRoot(container).querySelector('span');
}

describe('<Badge />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: (
      <div className="unique" data-testid="children">
        Hello World
      </div>
    ),
    badgeContent: 10,
  };

  describeConformance(
    <Badge>
      <div />
    </Badge>,
    () => ({
      classes,
      inheritComponent: 'span',
      render,
      refInstanceof: window.HTMLSpanElement,
      muiName: 'MuiBadge',
      testVariantProps: { color: 'secondary', variant: 'dot' },
      slots: {
        root: {
          expectedClassName: classes.root,
        },
        badge: {
          expectedClassName: classes.badge,
        },
      },
    }),
  );

  it('renders children and badgeContent', () => {
    const children = <div id="child" data-testid="child" />;
    const badge = <div id="badge" data-testid="badge" />;
    const { container } = render(<Badge badgeContent={badge}>{children}</Badge>);
    expect(container.firstChild).to.contain(screen.getByTestId('child'));
    expect(container.firstChild).to.contain(screen.getByTestId('badge'));
  });

  it('hides the visual badge from assistive technologies by default', () => {
    const { container } = render(<Badge {...defaultProps} />);

    expect(findBadge(container)).to.have.attribute('aria-hidden', 'true');
  });

  it('applies customized classes', () => {
    const customClasses = {
      root: 'test-root',
      anchorOriginTopRight: 'test-anchorOriginTopRight',
      anchorOriginTopRightCircular: 'test-anchorOriginTopRightCircular',
      badge: 'test-badge',
      colorSecondary: 'test-colorSecondary',
      dot: 'test-dot',
      invisible: 'test-invisible',
      overlapCircular: 'test-overlapCircular',
    };

    const { container } = render(
      <Badge
        {...defaultProps}
        variant="dot"
        overlap="circular"
        invisible
        color="secondary"
        classes={customClasses}
      />,
    );

    expect(findBadgeRoot(container)).to.have.class(customClasses.root);
    expect(findBadge(container)).to.have.class(customClasses.anchorOriginTopRight);
    expect(findBadge(container)).to.have.class(customClasses.anchorOriginTopRightCircular);
    expect(findBadge(container)).to.have.class(customClasses.badge);
    expect(findBadge(container)).to.have.class(customClasses.colorSecondary);
    expect(findBadge(container)).to.have.class(customClasses.dot);
    expect(findBadge(container)).to.have.class(customClasses.invisible);
    expect(findBadge(container)).to.have.class(customClasses.overlapCircular);
  });

  it('renders children', () => {
    const { container } = render(<Badge className="testClassName" {...defaultProps} />);
    expect(container.firstChild).to.contain(screen.getByTestId('children'));
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

    it('should render with invisible class when invisible and showZero are set to false and content is 0', () => {
      const { container } = render(<Badge badgeContent={0} showZero={false} invisible={false} />);
      expect(findBadge(container)).to.have.class(classes.invisible);
      expect(findBadge(container)).to.have.text('');
    });

    it('should not render with invisible class when invisible and showZero are set to false and content is not 0', () => {
      const { container } = render(<Badge badgeContent={1} showZero={false} invisible={false} />);
      expect(findBadge(container)).not.to.have.class(classes.invisible);
      expect(findBadge(container)).to.have.text('1');
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

  describe('prop: anchorOrigin', () => {
    it('should apply style for top left rectangular', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ horizontal: 'left', vertical: 'top' }} />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginTopLeftRectangular);
    });

    it('should apply style for top right rectangular', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ horizontal: 'right', vertical: 'top' }} />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginTopRightRectangular);
    });

    it('should apply style for bottom left rectangular', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginBottomLeftRectangular);
    });

    it('should apply style for bottom right rectangular', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginBottomRightRectangular);
    });

    it('should apply style for bottom right rectangular when only vertical is specified', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ vertical: 'bottom' }} />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginBottomRightRectangular);
    });

    it('should apply style for top left rectangular when only horizontal is specified', () => {
      const { container } = render(
        <Badge {...defaultProps} anchorOrigin={{ horizontal: 'left' }} />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginTopLeftRectangular);
    });

    it('should apply style for top left circular', () => {
      const { container } = render(
        <Badge
          {...defaultProps}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          overlap="circular"
        />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginTopLeftCircular);
    });

    it('should apply style for top right circular', () => {
      const { container } = render(
        <Badge
          {...defaultProps}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          overlap="circular"
        />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginTopRightCircular);
    });

    it('should apply style for bottom left circular', () => {
      const { container } = render(
        <Badge
          {...defaultProps}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          overlap="circular"
        />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginBottomLeftCircular);
    });

    it('should apply style for bottom right circular', () => {
      const { container } = render(
        <Badge
          {...defaultProps}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          overlap="circular"
        />,
      );
      expect(findBadge(container)).to.have.class(classes.anchorOriginBottomRightCircular);
    });
  });

  describe('prop: slots', () => {
    it('allows overriding the slots using the slots prop', () => {
      const CustomRoot = React.forwardRef((props, ref) => {
        const { ownerState, ...other } = props;
        return <span {...other} ref={ref} data-testid="custom-root" />;
      });

      const CustomBadge = React.forwardRef((props, ref) => {
        const { ownerState, ...other } = props;
        return <span {...other} ref={ref} data-testid="custom-badge" />;
      });

      render(
        <Badge
          {...defaultProps}
          badgeContent={1}
          slots={{ root: CustomRoot, badge: CustomBadge }}
        />,
      );

      screen.getByTestId('custom-root');
      screen.getByTestId('custom-badge');
    });
  });

  describe('prop: slotProps', () => {
    it('allows modifying slots props using the slotProps prop', () => {
      render(
        <Badge
          {...defaultProps}
          badgeContent={1}
          slotProps={{
            root: { 'data-testid': 'custom-root' },
            badge: { 'data-testid': 'custom-badge' },
          }}
        />,
      );

      screen.getByTestId('custom-root');
      screen.getByTestId('custom-badge');
    });

    it('allows overriding the badge accessibility props', () => {
      const { container } = render(
        <Badge
          {...defaultProps}
          slotProps={{ badge: { 'aria-hidden': false, 'aria-label': '10 notifications' } }}
        />,
      );

      expect(findBadge(container)).to.have.attribute('aria-hidden', 'false');
      expect(findBadge(container)).to.have.attribute('aria-label', '10 notifications');
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
