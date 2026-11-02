import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
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

export default function NestedGridColumns() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* @focus-start */}
      <Grid container spacing={2} columns={24}>
        <Grid size={8}>
          <Item>size=8/24</Item>
        </Grid>
        <Grid container size={16}>
          <Grid size={12}>
            <Item>nested size=12/24</Item>
          </Grid>
          <Grid size={12}>
            <Item>nested size=12/24</Item>
          </Grid>
        </Grid>
        <Grid size={8}>
          <Item>size=8/24</Item>
        </Grid>
        <Grid container columns={12} size={16}>
          <Grid size={6}>
            <Item>nested size=6/12</Item>
          </Grid>
          <Grid size={6}>
            <Item>nested size=6/12</Item>
          </Grid>
        </Grid>
      </Grid>
      {/* @focus-end */}
    </Box>
  );
}
