import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Typography, { typographyClasses as classes } from '@mui/material/Typography';
import describeConformance from '../../test/describeConformance';

describe('<Typography />', () => {
  const { render } = createRenderer();

  describeConformance(<Typography />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    refInstanceof: window.HTMLParagraphElement,
    muiName: 'MuiTypography',
    testVariantProps: { variant: 'dot' },
    testStateOverrides: { prop: 'variant', value: 'h2', styleKey: 'h2' },
  }));

  it('should render the text', () => {
    const { container } = render(<Typography>Hello</Typography>);
    expect(container.firstChild).to.have.text('Hello');
  });

  it('should render body1 root by default', () => {
    const { container } = render(<Typography>Hello</Typography>);

    expect(container.firstChild).to.have.class(classes.body1);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should center text', () => {
    const { container } = render(
      <Typography align="center" className="woofTypography">
        Hello
      </Typography>,
    );

    expect(container.firstChild).to.have.class(classes.alignCenter);
  });
  [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'body2',
    'body1',
    'caption',
    'button',
    'overline',
  ].forEach((variant) => {
    it(`should render ${variant} text`, () => {
      const { container } = render(<Typography variant={variant}>Hello</Typography>);

      expect(classes).to.have.property(variant);

      expect(container.firstChild).to.have.class(classes[variant]);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      render(<Typography variant="button">Hello</Typography>);

      expect(screen.getByText(/hello/i).tagName).to.equal('SPAN');
    });

    it('should render the mapped headline', () => {
      render(<Typography variant="h6">Hello</Typography>);

      expect(screen.getByText(/hello/i).tagName).to.equal('H6');
    });

    it('should render a h1', () => {
      render(<Typography component="h1">Hello</Typography>);

      expect(screen.getByText(/hello/i).tagName).to.equal('H1');
    });
  });

  describe('prop: variantMapping', () => {
    it('should work with a single value', () => {
      render(
        <Typography variant="h6" variantMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );

      expect(screen.getByText(/hello/i).tagName).to.equal('ASIDE');
    });

    it('should work event without the full mapping', () => {
      render(
        <Typography variant="h6" variantMapping={{}}>
          Hello
        </Typography>,
      );

      expect(screen.getByText(/hello/i).tagName).to.equal('H6');
    });
  });

  it('applies system properties via the sx prop', () => {
    const { container } = render(<Typography sx={{ mt: 2, marginRight: 5, mb: 2 }} />);

    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });
});
