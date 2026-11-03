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

export default function ResponsiveStack() {
  return (
    <div>
      {/* @focus-start */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
      {/* @focus-end */}
    </div>
  );
}
