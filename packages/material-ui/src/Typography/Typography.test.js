// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Typography, { typographyClasses as classes } from '@material-ui/core/Typography';

describe('<Typography />', () => {
  const render = createClientRender();

  describeConformanceV5(<Typography />, () => ({
    classes,
    inheritComponent: 'p',
    render,
    refInstanceof: window.HTMLParagraphElement,
    muiName: 'MuiTypography',
    testVariantProps: { variant: 'dot' },
    testStateOverrides: { prop: 'variant', value: 'h2', styleKey: 'h2' },
    skip: ['componentsProp'],
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
      // @ts-ignore literal/tuple type widening
      const { container } = render(<Typography variant={variant}>Hello</Typography>);

      expect(classes).to.have.property(variant);

      // @ts-ignore
      expect(container.firstChild).to.have.class(classes[variant]);
    });
  });

  describe('headline', () => {
    it('should render a span by default', () => {
      const { getByText } = render(<Typography variant="button">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('SPAN');
    });

    it('should render a p with a paragraph', () => {
      const { getByText } = render(<Typography paragraph>Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('P');
    });

    it('should render the mapped headline', () => {
      const { getByText } = render(<Typography variant="h6">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('H6');
    });

    it('should render a h1', () => {
      const { getByText } = render(<Typography component="h1">Hello</Typography>);

      expect(getByText(/hello/i).tagName).to.equal('H1');
    });
  });

  describe('prop: variantMapping', () => {
    it('should work with a single value', () => {
      const { getByText } = render(
        <Typography variant="h6" variantMapping={{ h6: 'aside' }}>
          Hello
        </Typography>,
      );

      expect(getByText(/hello/i).tagName).to.equal('ASIDE');
    });

    it('should work event without the full mapping', () => {
      const { getByText } = render(
        <Typography variant="h6" variantMapping={{}}>
          Hello
        </Typography>,
      );

      expect(getByText(/hello/i).tagName).to.equal('H6');
    });
  });

  it('combines system properties with the sx prop', () => {
    const { container } = render(<Typography mt={2} mr={1} sx={{ marginRight: 5, mb: 2 }} />);

    // @ts-ignore issue with typings on `toHaveComputedStyle`
    expect(container.firstChild).toHaveComputedStyle({
      marginTop: '16px',
      marginRight: '40px',
      marginBottom: '16px',
    });
  });
});
