import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Table, { tableClasses as classes } from '@mui/material/Table';
import describeConformance from '../../test/describeConformance';

describe('<Table />', () => {
  const { render } = createRenderer();

  describeConformance(
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
    render(
      <Table>
        <tbody data-testid="children" />
      </Table>,
    );

    expect(screen.getByTestId('children')).not.to.equal(null);
  });
});
