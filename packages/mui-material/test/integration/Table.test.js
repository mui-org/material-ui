import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

describe('Table integration', () => {
  const { render } = createRenderer();

  it('should apply Table section and layout context to TableCell', () => {
    render(
      <Table padding="none" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell data-testid="head">Head</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell data-testid="cell">Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell data-testid="footer">Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    expect(screen.getByTestId('head')).to.have.class(tableCellClasses.stickyHeader);
    expect(screen.getByTestId('head')).to.have.class(tableCellClasses.paddingNone);
    expect(screen.getByTestId('head')).to.have.class(tableCellClasses.sizeSmall);

    expect(screen.getByTestId('cell')).to.have.class(tableCellClasses.paddingNone);
    expect(screen.getByTestId('cell')).to.have.class(tableCellClasses.sizeSmall);
    expect(screen.getByTestId('cell')).not.to.have.class(tableCellClasses.stickyHeader);

    expect(screen.getByTestId('footer')).to.have.class(tableCellClasses.footer);
    expect(screen.getByTestId('footer')).not.to.have.class(tableCellClasses.head);
    expect(screen.getByTestId('footer')).not.to.have.class(tableCellClasses.body);
  });
});
