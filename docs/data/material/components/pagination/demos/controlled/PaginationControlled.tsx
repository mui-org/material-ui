import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      {/* @focus-start */}
      <Typography>Page: {page}</Typography>
      <Pagination count={10} page={page} onChange={handleChange} />
      {/* @focus-end */}
    </Stack>
  );
}
