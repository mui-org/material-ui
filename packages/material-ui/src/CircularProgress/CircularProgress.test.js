import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import CircularProgress, {
  circularProgressClasses as classes,
} from '@material-ui/core/CircularProgress';

describe('<CircularProgress />', () => {
  const render = createClientRender();

  describeConformanceV5(<CircularProgress />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiCircularProgress',
    testDeepOverrides: { slotName: 'circle', slotClassName: classes.circle },
    testVariantProps: { variant: 'determinate' },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render with the primary color by default', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the primary color', () => {
    const { container } = render(<CircularProgress color="primary" />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorPrimary);
  });

  it('should render with the secondary color', () => {
    const { container } = render(<CircularProgress color="secondary" />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.colorSecondary);
  });

  it('should contain an SVG with the svg class, and a circle with the circle class', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    const svg = circularProgress.firstChild;
    expect(svg).to.have.tagName('svg');
    expect(circularProgress).to.have.class(classes.indeterminate);
    expect(svg.firstChild).to.have.tagName('circle');
    expect(svg.firstChild).to.have.class(classes.circle, 'should have the circle class');
  });

  it('should render indeterminate variant by default', () => {
    const { container } = render(<CircularProgress />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.root);
    const svg = circularProgress.firstChild;
    expect(svg.firstChild).to.have.class(
      classes.circleIndeterminate,
      'should have the circleIndeterminate class',
    );
  });

  it('should render with a different size', () => {
    const { container } = render(<CircularProgress size={60} />);
    const circularProgress = container.firstChild;
    expect(circularProgress).to.have.class(classes.root);
    expect(circularProgress.style.width).to.equal('60px', 'should have width correctly set');
    expect(circularProgress.style.height).to.equal('60px', 'should have height correctly set');
    const svg = circularProgress.firstChild;
    expect(svg).to.have.tagName('svg');
    const circle = svg.firstChild;
    expect(circle).to.have.tagName('circle');
    expect(circle).to.have.attribute('cx', '44');
    expect(circle).to.have.attribute('cy', '44');
  });

  describe('prop: variant="determinate"', () => {
    it('should render with determinate classes', () => {
      const { container } = render(<CircularProgress variant="determinate" />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      expect(svg).to.have.tagName('svg');
      expect(svg).not.to.have.class(
        classes.svgIndeterminate,
        'should not have the svgIndeterminate class',
      );
    });

    it('should set strokeDasharray of circle', () => {
      const { container } = render(<CircularProgress variant="determinate" value={70} />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle.style.strokeDasharray).to.match(
        /126\.920?(px)?/gm,
        'should have strokeDasharray set',
      );
      expect(circle.style.strokeDashoffset).to.equal(
        '38.076px',
        'should have strokeDashoffset set',
      );
      expect(circularProgress).to.have.attribute('aria-valuenow', '70');
    });
  });

  describe('prop: disableShrink ', () => {
    it('should default to false', () => {
      const { container } = render(<CircularProgress variant="indeterminate" />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle).to.have.tagName('circle');
      expect(circle).not.to.have.class(classes.circleDisableShrink);
    });

    it('should render without disableShrink class when set to false', () => {
      const { container } = render(
        <CircularProgress variant="indeterminate" disableShrink={false} />,
      );
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle).to.have.tagName('circle');
      expect(circle).not.to.have.class(classes.circleDisableShrink);
    });

    it('should render with disableShrink class when set to true', () => {
      const { container } = render(<CircularProgress variant="indeterminate" disableShrink />);
      const circularProgress = container.firstChild;
      expect(circularProgress).to.have.class(classes.root);
      const svg = circularProgress.firstChild;
      const circle = svg.firstChild;
      expect(circle).to.have.tagName('circle');
      expect(circle).to.have.class(classes.circleDisableShrink);
    });
  });
});
