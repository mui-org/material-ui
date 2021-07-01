import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import Table, { tableClasses as classes } from '@material-ui/core/Table';
import TableContext from './TableContext';

describe('<Table />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <Table>
      <tbody />
    </Table>,
    () => ({
      classes,
      inheritComponent: 'table',
      render,
      muiName: 'MuiTable',
      testVariantProps: { variant: 'foo' },
      refInstanceof: window.HTMLTableElement,
      // can't test another component with tbody as a child
      testComponentPropWith: 'table',
      skip: ['componentsProp'],
    }),
  );

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="table"', () => {
      const { container } = render(<Table component="div">foo</Table>);
      expect(container.firstChild).to.have.attribute('role', 'table');
    });
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Table>
        <tbody data-testid="children" />
      </Table>,
    );

    expect(getByTestId('children')).not.to.equal(null);
  });

  it('should define table in the child context', () => {
    let context;

    // TODO test integration with TableCell
    render(
      <Table>
        <TableContext.Consumer>
          {(value) => {
            context = value;
            return <tbody />;
          }}
        </TableContext.Consumer>
      </Table>,
    );

    expect(context).to.deep.equal({
      size: 'medium',
      padding: 'normal',
      stickyHeader: false,
    });
  });
});
