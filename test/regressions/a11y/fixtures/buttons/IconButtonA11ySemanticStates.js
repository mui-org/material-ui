import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';

const colors = [
  'default',
  'inherit',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
];

export default function IconButtonA11ySemanticStates() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <IconButton aria-label="Delete file">
          <DeleteIcon />
        </IconButton>
        <IconButton href="#icon-button-a11y-link" aria-label="Open settings">
          <SettingsIcon />
        </IconButton>
        <IconButton aria-label="Delete file" disabled>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="Save changes" loading>
          <SaveIcon />
        </IconButton>
        <IconButton aria-label="Add to favorites" aria-pressed="true" color="error">
          <FavoriteIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={1}>
        {colors.map((color) => (
          <IconButton key={color} aria-label={`Delete ${color}`} color={color}>
            <DeleteIcon />
          </IconButton>
        ))}
      </Stack>
      {/* Small buttons with no gap: the 24 by 24 px minimum must hold from size alone. */}
      <Stack direction="row" spacing={0}>
        <IconButton aria-label="Bold" size="small">
          <FormatBoldIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="Italic" size="small">
          <FormatItalicIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="Underline" size="small">
          <FormatUnderlinedIcon fontSize="inherit" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
