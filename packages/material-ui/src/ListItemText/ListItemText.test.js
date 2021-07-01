import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Typography, { typographyClasses } from '@material-ui/core/Typography';
import ListItemText, { listItemTextClasses as classes } from '@material-ui/core/ListItemText';

describe('<ListItemText />', () => {
  const render = createClientRender();

  describeConformanceV5(<ListItemText>Conformance?</ListItemText>, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiListItemText',
    testVariantProps: { inset: true },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render with inset class', () => {
    const { container } = render(<ListItemText inset />);
    expect(container.querySelector('div')).to.have.class(classes.inset);
    expect(container.querySelector('div')).to.have.class(classes.root);
  });

  it('should render with no children', () => {
    const { container } = render(<ListItemText />);
    expect(container.querySelector('div').querySelectorAll('*')).to.have.length(0);
  });

  describe('prop: primary', () => {
    it('should render primary text', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const { container } = render(<ListItemText primary="This is the primary text" ref={ref} />);
      expect(container.querySelectorAll('span.MuiTypography-root')).to.have.length(1);
      expect(container.querySelector('span.MuiTypography-root')).to.have.class(
        typographyClasses.body1,
      );
      expect(text()).to.equal('This is the primary text');
    });

    it('should use the primary node', () => {
      const primaryRef = React.createRef();
      const primary = <span ref={primaryRef} />;
      const { container } = render(<ListItemText primary={primary} />);
      expect(container.querySelector('div')).to.contain(primaryRef.current);
    });

    it('should use the children prop as primary node', () => {
      const primaryRef = React.createRef();
      const primary = <span ref={primaryRef} />;
      const { container } = render(<ListItemText>{primary}</ListItemText>);
      expect(container.querySelector('div')).to.contain(primaryRef.current);
    });

    it('should read 0 as primary', () => {
      const { container } = render(<ListItemText primary={0} />);
      expect(container.querySelector('span.MuiTypography-root')).to.have.text('0');
    });
  });

  describe('prop: secondary', () => {
    it('should render secondary text', () => {
      const ref = React.createRef();
      const text = () => ref.current.textContent;
      const { container } = render(
        <ListItemText secondary="This is the secondary text" ref={ref} />,
      );
      expect(container.querySelectorAll('p.MuiTypography-root')).to.have.length(1);
      expect(container.querySelector('p.MuiTypography-root')).to.have.class(
        typographyClasses.body2,
      );
      expect(text()).to.equal('This is the secondary text');
    });

    it('should use the secondary node', () => {
      const secondaryRef = React.createRef();
      const secondary = <span ref={secondaryRef} />;
      const { container } = render(<ListItemText secondary={secondary} />);
      expect(container.querySelector('div')).to.contain(secondaryRef.current);
    });

    it('should read 0 as secondary', () => {
      const { container } = render(<ListItemText secondary={0} />);
      expect(container.querySelector('p.MuiTypography-root')).to.have.text('0');
    });
  });

  describe('prop: disableTypography', () => {
    it('should wrap children in `<Typography/>` by default', () => {
      const { container } = render(
        <ListItemText primary="This is the primary text" secondary="This is the secondary text" />,
      );

      const texts = container.querySelectorAll('.MuiTypography-root');
      expect(texts).to.have.length(2);

      const primaryText = texts[0];
      expect(primaryText).to.have.class(typographyClasses.body1);
      expect(primaryText).to.have.text('This is the primary text');

      const secondaryText = texts[1];
      expect(secondaryText).to.have.class(typographyClasses.body2);
      expect(secondaryText).to.have.text('This is the secondary text');
    });

    it('should render JSX children', () => {
      const primaryRef = React.createRef();
      const primaryChild = (
        <p className="test" ref={primaryRef}>
          This is the primary text
        </p>
      );
      const secondaryRef = React.createRef();
      const secondaryChild = (
        <p className="test" ref={secondaryRef}>
          This is the secondary text
        </p>
      );
      const { container } = render(
        <ListItemText primary={primaryChild} secondary={secondaryChild} disableTypography />,
      );
      const texts = container.querySelectorAll('div > p:not(.MuiTypography-root)');
      expect(texts[0]).to.equal(primaryRef.current);
      expect(texts[1]).to.equal(secondaryRef.current);
    });
  });

  it('should render primary and secondary text with customisable classes', () => {
    const textClasses = {
      primary: 'GeneralText',
      secondary: 'SecondaryText',
    };
    const { container } = render(
      <ListItemText
        primary="This is the primary text"
        secondary="This is the secondary text"
        classes={textClasses}
      />,
    );
    const texts = container.querySelector('div').querySelectorAll('*');

    expect(texts[0]).to.have.class('GeneralText');
    expect(texts[1]).to.have.class('SecondaryText');
  });

  it('should not re-wrap the <Typography> element', () => {
    const primary = <Typography>This is the primary text</Typography>;
    const secondary = <Typography>This is the secondary text</Typography>;
    const { container } = render(<ListItemText primary={primary} secondary={secondary} />);
    const texts = container.querySelectorAll('.MuiTypography-root');
    expect(texts).to.have.length(2);
    expect(texts[0]).to.have.text('This is the primary text');
    expect(texts[1]).have.text('This is the secondary text');
  });

  it('should pass primaryTypographyProps to primary Typography component', () => {
    const { container } = render(
      <ListItemText
        primary="This is the primary text"
        primaryTypographyProps={{ 'data-test': 'foo' }}
      />,
    );
    expect(container.querySelector('span')).to.have.attribute('data-test');
  });

  it('should pass secondaryTypographyProps to secondary Typography component', () => {
    const { container } = render(
      <ListItemText
        primary="This is the primary text"
        secondary="This is the secondary text"
        secondaryTypographyProps={{ 'data-test': 'foo' }}
      />,
    );
    expect(container.querySelector('p')).to.have.attribute('data-test');
  });
});
