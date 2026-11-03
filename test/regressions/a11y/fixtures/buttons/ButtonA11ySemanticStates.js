import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ButtonA11ySemanticStates() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button>Native action</Button>
        <Button href="#button-a11y-link">Link action</Button>
        <Button disabled>Disabled action</Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<DeleteIcon />}>
          Delete file
        </Button>
        <Button variant="contained" endIcon={<SendIcon />}>
          Send message
        </Button>
        <Button loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined">
          Save changes
        </Button>
      </Stack>
      <Button
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{ alignSelf: 'flex-start' }}
      >
        Upload receipt
        <VisuallyHiddenInput type="file" multiple />
      </Button>
    </Stack>
  );
}
