import TablePagination from '@org/ui/material/TablePagination';
import { TablePagination as MyTablePagination } from '@org/ui/material';

<TablePagination ActionsComponent="div" slotProps={{
  select: { native: true }
}} />;
<TablePagination
  ActionsComponent="div"
  slots={{
    actions: 'div',
    select: 'div',
  }}
  slotProps={{
    select: { native: true }
  }}
/>;
<TablePagination
  ActionsComponent="div"
  slots={{
    root: 'div',
  }}
  slotProps={{
    root: { 'aria-label': '' },
    select: { native: true }
  }} />;
<TablePagination
  ActionsComponent="div"
  slots={{ actions: () => null }}
  slotProps={{ select: {
    ...{ native: true },
    ...{ native: false }
  } }} />;

<MyTablePagination ActionsComponent="div" slotProps={{
  select: { native: true }
}} />;

<CustomTablePagination ActionsComponent="div" SelectProps={{ native: true }} />;
