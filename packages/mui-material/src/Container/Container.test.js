import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Container, { containerClasses as classes } from '@mui/material/Container';
import describeConformance from '../../test/describeConformance';

describe('<Container />', () => {
  const { render } = createRenderer();

  const defaultProps = {
    children: <div />,
  };

  describeConformance(<Container {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLElement,
    muiName: 'MuiContainer',
    testVariantProps: { fixed: true },
  }));

  describe('prop: maxWidth', () => {
    it('should support different maxWidth values', () => {
      const { container: firstContainer } = render(<Container {...defaultProps} />);
      expect(firstContainer.firstChild).to.have.class(classes.maxWidthLg);
      const { container: secondsContainer } = render(
        <Container {...defaultProps} maxWidth={false} />,
      );
      expect(secondsContainer.firstChild).not.to.have.class(classes.maxWidthLg);
    });
  });
});
