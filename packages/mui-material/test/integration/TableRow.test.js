import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen } from '@mui/internal-test-utils';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses as classes } from '@mui/material/TableRow';

describe('<TableRow> integration', () => {
  const { render } = createRenderer();

  it('should render with the head class when in the context of a table head', () => {
    render(
      <table>
        <TableHead>
          <TableRow />
        </TableHead>
      </table>,
    );

    expect(screen.getByRole('row')).to.have.class(classes.root);
    expect(screen.getByRole('row')).to.have.class(classes.head);
  });

  it('should render with the footer class when in the context of a table footer', () => {
    render(
      <table>
        <TableFooter>
          <TableRow />
        </TableFooter>
      </table>,
    );

    expect(screen.getByRole('row')).to.have.class(classes.root);
    expect(screen.getByRole('row')).to.have.class(classes.footer);
  });
});
