import styled from '@mui/system/styled';
import Grid from '@mui/system/Grid';
import Box from '@mui/system/Box';

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

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Item>1</Item>
        </Grid>
        <Grid size={6}>
          <Item>2</Item>
        </Grid>
        <Grid size={6}>
          <Item>3</Item>
        </Grid>
        <Grid size={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
      {/* @focus-end */}
    </Box>
  );
}
