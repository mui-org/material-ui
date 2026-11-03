import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function ColumnLayoutInsideGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* @focus-start */}
      <Grid container spacing={2}>
        <Grid size={4}>
          <Stack spacing={2}>
            <Item>Column 1 - Row 1</Item>
            <Item>Column 1 - Row 2</Item>
            <Item>Column 1 - Row 3</Item>
          </Stack>
        </Grid>
        <Grid size={8}>
          <Item sx={{ height: '100%', boxSizing: 'border-box' }}>Column 2</Item>
        </Grid>
      </Grid>
      {/* @focus-end */}
    </Box>
  );
}
