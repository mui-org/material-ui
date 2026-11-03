import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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

export default function OffsetGrid() {
  return (
    // @focus-start @padding 2
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      <Grid size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
        <Item>1</Item>
      </Grid>
      <Grid size={{ xs: 4, md: 2 }} offset={{ md: 'auto' }}>
        <Item>2</Item>
      </Grid>
      <Grid size={{ xs: 4, md: 2 }} offset={{ xs: 4, md: 0 }}>
        <Item>3</Item>
      </Grid>
      <Grid size={{ xs: 'grow', md: 6 }} offset={{ md: 2 }}>
        <Item>4</Item>
      </Grid>
    </Grid>
    // @focus-end
  );
}
