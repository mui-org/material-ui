import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import FourKIcon from '@mui/icons-material/FourK';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

export default function SvgMaterialIcons() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* @focus-start */}
      <Grid container sx={{ color: 'text.primary' }}>
        <Grid size={4}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteIcon />
          <DeleteForeverIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Outlined</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteOutlinedIcon />
          <DeleteForeverOutlinedIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Rounded</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteRoundedIcon />
          <DeleteForeverRoundedIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Two Tone</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteTwoToneIcon />
          <DeleteForeverTwoToneIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Sharp</Typography>
        </Grid>
        <Grid size={8}>
          <DeleteSharpIcon />
          <DeleteForeverSharpIcon />
        </Grid>
        <Grid size={4}>
          <Typography>Edge-cases</Typography>
        </Grid>
        <Grid size={8}>
          <ThreeDRotationIcon />
          <FourKIcon />
          <ThreeSixtyIcon />
        </Grid>
      </Grid>
      {/* @focus-end */}
    </Box>
  );
}
