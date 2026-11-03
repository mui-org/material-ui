import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationSize() {
  return (
    <Stack spacing={2}>
      {/* @focus-start */}
      <Pagination count={10} size="small" />
      <Pagination count={10} />
      <Pagination count={10} size="large" />
      {/* @focus-end */}
    </Stack>
  );
}
