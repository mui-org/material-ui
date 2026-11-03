import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid',
  borderColor: '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
    borderColor: '#444d58',
  }),
}));

export default function VariableWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* @focus-start */}
      <Grid container spacing={3}>
        <Grid size="auto">
          <Item>size=auto</Item>
        </Grid>
        <Grid size={6}>
          <Item>size=6</Item>
        </Grid>
        <Grid size="grow">
          <Item>size=grow</Item>
        </Grid>
      </Grid>
      {/* @focus-end */}
    </Box>
  );
}
