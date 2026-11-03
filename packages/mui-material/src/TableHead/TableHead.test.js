import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableHead, { tableHeadClasses as classes } from '@mui/material/TableHead';
import describeConformance from '../../test/describeConformance';

describe('<TableHead />', () => {
  const { render } = createRenderer();
  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformance(<TableHead />, () => ({
    classes,
    inheritComponent: 'thead',
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    muiName: 'MuiTableHead',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'tbody',
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    renderInTable(<TableHead>{children}</TableHead>);
    screen.getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableHead component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableHead component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
