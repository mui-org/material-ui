import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme, rgbToHex, styled } from '@mui/material/styles';

const Group = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const Color = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& div:first-of-type': {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, .06)',
  },
}));

export default function Intentions() {
  const theme = useTheme();

  const item = (color, name) => (
    <Color size={{ xs: 12, sm: 6, md: 4 }}>
      <div style={{ backgroundColor: color }} />
      <div>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {rgbToHex(color)}
        </Typography>
      </div>
    </Color>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Group gutterBottom>Primary</Group>
      <Grid container spacing={2}>
        {item(theme.palette.primary.light, 'palette.primary.light')}
        {item(theme.palette.primary.main, 'palette.primary.main')}
        {item(theme.palette.primary.dark, 'palette.primary.dark')}
      </Grid>
      <Group gutterBottom>Secondary</Group>
      <Grid container spacing={2}>
        {item(theme.palette.secondary.light, 'palette.secondary.light')}
        {item(theme.palette.secondary.main, 'palette.secondary.main')}
        {item(theme.palette.secondary.dark, 'palette.secondary.dark')}
      </Grid>
      <Group gutterBottom>Error</Group>
      <Grid container spacing={2}>
        {item(theme.palette.error.light, 'palette.error.light')}
        {item(theme.palette.error.main, 'palette.error.main')}
        {item(theme.palette.error.dark, 'palette.error.dark')}
      </Grid>
      <Group gutterBottom>Warning</Group>
      <Grid container spacing={2}>
        {item(theme.palette.warning.light, 'palette.warning.light')}
        {item(theme.palette.warning.main, 'palette.warning.main')}
        {item(theme.palette.warning.dark, 'palette.warning.dark')}
      </Grid>
      <Group gutterBottom>Info</Group>
      <Grid container spacing={2}>
        {item(theme.palette.info.light, 'palette.info.light')}
        {item(theme.palette.info.main, 'palette.info.main')}
        {item(theme.palette.info.dark, 'palette.info.dark')}
      </Grid>
      <Group gutterBottom>Success</Group>
      <Grid container spacing={2}>
        {item(theme.palette.success.light, 'palette.success.light')}
        {item(theme.palette.success.main, 'palette.success.main')}
        {item(theme.palette.success.dark, 'palette.success.dark')}
      </Grid>
    </Box>
  );
}
