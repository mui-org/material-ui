import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TableFooter, { tableFooterClasses as classes } from '@material-ui/core/TableFooter';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableFooter />', () => {
  const render = createClientRender();

  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformanceV5(<TableFooter />, () => ({
    classes,
    inheritComponent: 'tfoot',
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    wrapMount: (mount) => (node) => {
      const wrapper = mount(<table>{node}</table>);
      return wrapper.find('table').childAt(0);
    },
    muiName: 'MuiTableFooter',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'thead',
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    const { getByTestId } = renderInTable(<TableFooter>{children}</TableFooter>);
    getByTestId('test');
  });

  it('should define table.footer in the child context', () => {
    let context;
    // TODO test integration with TableCell
    renderInTable(
      <TableFooter>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableFooter>,
    );
    expect(context.variant).to.equal('footer');
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
