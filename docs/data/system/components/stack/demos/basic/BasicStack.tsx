import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  ...theme.applyStyles('dark', {
    backgroundColor: '#262B32',
  }),
}));

export default function BasicStack() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
      {/* @focus-end */}
    </Box>
  );
}
