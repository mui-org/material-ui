import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableCell, { tableCellClasses as classes } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';

describe('<TableRow> integration', () => {
  const { render } = createRenderer();
  function renderInTable(node, Variant) {
    return render(
      <Table>
        <Variant>
          <TableRow>{node}</TableRow>
        </Variant>
      </Table>,
    );
  }

  it('should render a th with the head class when in the context of a table head', () => {
    renderInTable(<TableCell data-testid="cell" />, TableHead);
    expect(screen.getByTestId('cell')).to.have.tagName('th');
    expect(screen.getByTestId('cell')).to.have.class(classes.root);
    expect(screen.getByTestId('cell')).to.have.class(classes.head);
    expect(screen.getByTestId('cell')).to.have.attribute('scope', 'col');
  });

  it('should render specified scope attribute even when in the context of a table head', () => {
    renderInTable(<TableCell scope="row" data-testid="cell" />, TableHead);
    expect(screen.getByTestId('cell')).to.have.attribute('scope', 'row');
  });

  it('should render a td with the footer class when in the context of a table footer', () => {
    renderInTable(<TableCell data-testid="cell" />, TableFooter);
    expect(screen.getByTestId('cell')).to.have.tagName('td');
    expect(screen.getByTestId('cell')).to.have.class(classes.root);
    expect(screen.getByTestId('cell')).to.have.class(classes.footer);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    renderInTable(<TableCell data-testid="cell" />, TableFooter);
    expect(screen.getByTestId('cell')).to.have.class(classes.root);
    expect(screen.getByTestId('cell')).to.have.class(classes.footer);
  });

  it('should render with the head class when variant is head, overriding context', () => {
    renderInTable(<TableCell variant="head" data-testid="cell" />, TableFooter);
    expect(screen.getByTestId('cell')).to.have.class(classes.head);
    expect(screen.getByTestId('cell')).not.to.have.attribute('scope');
  });

  it('should render without head class when variant is body, overriding context', () => {
    renderInTable(<TableCell variant="body" data-testid="cell" />, TableFooter);
    expect(screen.getByTestId('cell')).not.to.have.class(classes.head);
  });

  it('should render without footer class when variant is body, overriding context', () => {
    renderInTable(<TableCell variant="body" data-testid="cell" />, TableFooter);
    expect(screen.getByTestId('cell')).not.to.have.class(classes.footer);
  });

  it('should render with the footer class when variant is footer, overriding context', () => {
    renderInTable(<TableCell variant="footer" data-testid="cell" />, TableHead);

    expect(screen.getByTestId('cell')).to.have.class(classes.footer);
  });

  it('does not set `role` when `component` prop is set and used in the context of table head', () => {
    render(
      <TableHead component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableHead>,
    );

    expect(screen.getByTestId('cell')).not.to.have.attribute('role');
  });

  it('does not set `role` when `component` prop is set and used in the context of table body', () => {
    render(
      <TableBody component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableBody>,
    );

    expect(screen.getByTestId('cell')).not.to.have.attribute('role');
  });

  it('does not set `role` when `component` prop is set and used in the context of table footer', () => {
    render(
      <TableFooter component="div">
        <TableCell component="div" data-testid="cell" />,
      </TableFooter>,
    );

    expect(screen.getByTestId('cell')).not.to.have.attribute('role');
  });
});
