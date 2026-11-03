import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableBody, { tableBodyClasses as classes } from '@mui/material/TableBody';
import describeConformance from '../../test/describeConformance';

describe('<TableBody />', () => {
  const { render } = createRenderer();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformance(<TableBody />, () => ({
    classes,
    inheritComponent: 'tbody',
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    muiName: 'MuiTableBody',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    // can't test with custom `component` with `renderInTable`
    testComponentPropWith: 'tbody',
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    renderInTable(<TableBody>{children}</TableBody>);
    screen.getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableBody component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableBody component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'rowgroup');
    });
  });
});
