import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableFooter, { tableFooterClasses as classes } from '@mui/material/TableFooter';
import describeConformance from '../../test/describeConformance';

describe('<TableFooter />', () => {
  const { render } = createRenderer();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformance(<TableFooter />, () => ({
    classes,
    inheritComponent: 'tfoot',
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    muiName: 'MuiTableFooter',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'thead',
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    renderInTable(<TableFooter>{children}</TableFooter>);
    screen.getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableFooter component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableFooter component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
