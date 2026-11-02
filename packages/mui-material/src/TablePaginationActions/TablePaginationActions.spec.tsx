import * as React from 'react';
import TablePaginationActions from '@mui/material/TablePaginationActions';

<TablePaginationActions
  count={100}
  getItemAriaLabel={(type) => `Go to ${type} page`}
  onPageChange={() => {}}
  page={1}
  rowsPerPage={10}
  showFirstButton
  showLastButton
  classes={{
    root: 'custom-root',
    // @ts-expect-error — unknown class keys should be rejected
    notAClass: 'x',
  }}
  className="custom-actions"
  ref={React.createRef<HTMLDivElement>()}
  sx={(theme) => ({ color: theme.palette.primary.main })}
/>;
