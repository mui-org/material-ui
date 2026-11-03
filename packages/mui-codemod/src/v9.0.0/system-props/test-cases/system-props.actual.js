import { Box as Boxxx, Grid as Griddd, Grid2 as Griddd2 } from '@mui/material';
import Typography from '@mui/material/Typography';
import Typographyyy from '@mui/material/Typography';
import Stackkk from '@mui/material/Stack';
import Link from '@mui/material/Link';
import DialogContentText from '@mui/material/DialogContentText';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

<Boxxx typography="body1" />;
<Boxxx color="palette.main" sx={{ display: 'block' }} />;

<Griddd container flexDirection={`column`} />;
<Griddd2 container flexDirection={`column`} />;

const sx = { display: 'flex' };
const ml = 2;
<Typography color="#fff" mb={5} />;
<Typography color="hsl(200 30% 30%)" mb={5} />;
<Typographyyy variant="body1" color="primary.main" ml={ml} sx={sx} />;
<Typographyyy variant="body1" color="divider" ml={ml} sx={sx} />;
<Typographyyy variant="body1" color="inherit" ml={ml} sx={sx} />;
<Typographyyy
  fontSize="xl4"
  lineHeight={1}
  startDecorator={
    <Typographyyy fontSize="lg" textColor="text.secondary">
      $
    </Typographyyy>
  }
  sx={{ alignItems: 'flex-start' }}
>
  25
</Typographyyy>;
function Copyright(props) {
  return (
    <Typographyyy variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typographyyy>
  );
}

<Stackkk flex="1" sx={[...(Array.isArray(sx) ? sx : [sx])]} />;

<Boxxx typography="body1" sx={foo.bar ? { opacity: 0 } : sx} />;

<Link color="inherit" href="https://mui.com/">Sitemark</Link>;
<Link color="text.secondary" variant="body2" href="#">Features</Link>;
<Link color="primary" href="#">Primary Link</Link>;

<DialogContentText color="text.secondary">Some content</DialogContentText>;
<DialogContentText color="inherit" mt={2}>Inherited</DialogContentText>;
<DialogContentText color="primary">Primary</DialogContentText>;

<TimelineOppositeContent color="text.secondary">09:30 am</TimelineOppositeContent>;
<TimelineContent color="inherit">Eat</TimelineContent>;

// Dynamic color values (expression, not string literal)
<Typography color={dynamicColor} mb={2}>Dynamic</Typography>;
<Link color={linkColor} href="#">Dynamic Link</Link>;
