import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationButtons() {
  return (
    <Stack spacing={2}>
      {/* @focus-start */}
      <Pagination count={10} showFirstButton showLastButton />
      <Pagination count={10} hidePrevButton hideNextButton />
      {/* @focus-end */}
    </Stack>
  );
}
