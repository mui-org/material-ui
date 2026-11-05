import * as React from 'react';
import type { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Folder from '@mui/icons-material/Folder';

const data = [
  { name: 'Typography', size: 125600 },
  { name: 'Pictures & videos', size: 134000000 },
  { name: 'Source files', size: 200000000 },
  { name: 'Dependencies', size: 44000000 },
  { name: 'Assets & illustrations', size: 21000000 },
  { name: 'Components', size: 11000 },
];

type Data = typeof data extends Array<infer T> ? T : never;

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function formatSize(size: number) {
  const kb = size / 1000;
  if (kb < 1000) {
    return `${kb.toFixed(1)} kB`;
  }
  return `${(kb / 1000).toFixed(0)} MB`;
}

export default function BasicTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };
  const headCells = [
    { id: 'name', label: 'Name', TableCellProps: {} },
    { id: 'size', label: 'Size', TableCellProps: { align: 'right' } },
  ] as const;
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={[
        {
          maxWidth: 260,
          borderColor: 'grey.200',
          boxShadow: (theme) => `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
          [`& .${tableCellClasses.root}`]: {
            borderColor: 'grey.200',
          },
          [`& .${tableCellClasses.sizeSmall}`]: {
            padding: '0.625rem 1rem',
          },
        },
        (theme) =>
          theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.700',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            [`& .${tableCellClasses.root}`]: {
              borderColor: 'primaryDark.700',
            },
          }),
      ]}
    >
      <Table aria-label="folder table" size="small">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                {...headCell.TableCellProps}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  sx={{ fontSize: '0.75rem', color: 'text.secondary' }}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {[...data].sort(getComparator(order, orderBy)).map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Folder fontSize="small" sx={{ color: 'primary.400' }} />
                  <Typography sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}>
                    {row.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography
                  sx={[
                    {
                      fontSize: 13,
                      fontWeight: 'bold',
                    },
                    (theme: Theme) => ({
                      mr: 1,
                      color: 'success.800',
                      ...theme.applyDarkStyles({
                        color: 'success.500',
                      }),
                    }),
                  ]}
                >
                  {formatSize(row.size)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
