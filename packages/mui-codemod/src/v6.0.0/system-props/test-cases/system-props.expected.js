import { Box as Boxxx, Grid as Griddd, Grid2 as Griddd2 } from '@mui/material';
import Typography from '@mui/material/Typography';
import Typographyyy from '@mui/material/Typography';
import Stackkk from '@mui/material/Stack';

<Boxxx sx={{
  typography: "body1"
}} />;
<Boxxx
  sx={{
    color: "palette.main",
    display: 'block'
  }} />;

<Griddd container sx={{
  flexDirection: `column`
}} />;
<Griddd2 container sx={{
  flexDirection: `column`
}} />;

const sx = { display: 'flex' };
const ml = 2;
<Typography
  sx={{
    color: "#fff",
    mb: 5
  }} />;
<Typography
  sx={{
    color: "hsl(200 30% 30%)",
    mb: 5
  }} />;
<Typographyyy
  variant="body1"
  sx={[{
    color: "primary.main",
    ml: ml
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;
<Typographyyy
  variant="body1"
  sx={[{
    color: "divider",
    ml: ml
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;
<Typographyyy
  variant="body1"
  color="inherit"
  sx={[{
    ml: ml
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;
<Typographyyy
  startDecorator={
    <Typographyyy textColor="text.secondary" sx={{
      fontSize: "lg"
    }}>
      $
    </Typographyyy>
  }
  sx={{
    fontSize: "xl4",
    lineHeight: 1,
    alignItems: 'flex-start'
  }}>
  25
</Typographyyy>;
function Copyright(props) {
  return (
    <Typographyyy
      variant="body2"
      align="center"
      {...props}
      sx={[{
        color: "text.secondary"
      }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typographyyy>
  );
}

<Stackkk
  sx={[{
    flex: "1"
  }, ...(Array.isArray(sx) ? sx : [sx])]} />;

<Boxxx
  sx={[{
    typography: "body1"
  }, foo.bar ? { opacity: 0 } : sx]} />;
