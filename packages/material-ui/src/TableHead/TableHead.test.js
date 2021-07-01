import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import TableHead, { tableHeadClasses as classes } from '@material-ui/core/TableHead';
import Tablelvl2Context from '../Table/Tablelvl2Context';

describe('<TableHead />', () => {
  const render = createClientRender();
  function renderInTable(node) {
    return render(<table>{node}</table>);
  }

  describeConformanceV5(<TableHead />, () => ({
    classes,
    inheritComponent: 'thead',
    wrapMount: (mount) => (node) => {
      const wrapper = mount(<table>{node}</table>);
      return wrapper.find('table').childAt(0);
    },
    render: (node) => {
      const { container, ...other } = render(<table>{node}</table>);
      return { container: container.firstChild, ...other };
    },
    muiName: 'MuiTableHead',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableSectionElement,
    testComponentPropWith: 'tbody',
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const children = <tr data-testid="test" />;
    const { getByTestId } = renderInTable(<TableHead>{children}</TableHead>);
    getByTestId('test');
  });

  it('should define table.head in the child context', () => {
    let context;
    // TODO: test integration with TableCell
    renderInTable(
      <TableHead>
        <Tablelvl2Context.Consumer>
          {(value) => {
            context = value;
          }}
        </Tablelvl2Context.Consumer>
      </TableHead>,
    );
    expect(context.variant).to.equal('head');
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
