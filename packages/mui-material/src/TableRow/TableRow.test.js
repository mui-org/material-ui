import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableRow, { tableRowClasses as classes } from '@mui/material/TableRow';
import describeConformance from '../../test/describeConformance';

describe('<TableRow />', () => {
  const { render } = createRenderer();

  function renderInTable(node) {
    return render(
      <table>
        <tbody>{node}</tbody>
      </table>,
    );
  }

  describeConformance(<TableRow />, () => ({
    classes,
    inheritComponent: 'tr',
    render: (node) => {
      const { container, ...other } = render(
        <table>
          <tbody>{node}</tbody>
        </table>,
      );
      return { container: container.firstChild.firstChild, ...other };
    },
    muiName: 'MuiTableRow',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableRowElement,
    testComponentPropWith: 'tr',
  }));

  it('should render children', () => {
    const children = <td data-testid="test" />;
    renderInTable(<TableRow>{children}</TableRow>);
    screen.getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'row');
    });
  });
});
