import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, createClientRender } from 'test/utils';
import Container, { containerClasses as classes } from '@material-ui/core/Container';

describe('<Container />', () => {
  const render = createClientRender();

  const defaultProps = {
    children: <div />,
  };

  describeConformanceV5(<Container {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiContainer',
    skip: ['componentsProp'],
    testVariantProps: { fixed: true },
  }));

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      const { container: firstContainer } = render(<Container {...defaultProps} />);
      expect(firstContainer.firstChild).to.have.class(classes.maxWidthLg);
      const { container: secondsContainre } = render(
        <Container {...defaultProps} maxWidth={false} />,
      );
      expect(secondsContainre.firstChild).not.to.have.class(classes.maxWidthLg);
    });
  });
});
