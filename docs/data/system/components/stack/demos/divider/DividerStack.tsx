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

export default function DividerStack() {
  return (
    <div>
      {/* @focus-start */}
      <Stack
        direction="row"
        divider={
          <Box
            component="hr"
            sx={(theme) => ({
              border: `1px solid ${'#fff'}`,
              ...theme.applyStyles('dark', {
                border: `1px solid ${'#262B32'}`,
              }),
            })}
          />
        }
        spacing={2}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
      {/* @focus-end */}
    </div>
  );
}
