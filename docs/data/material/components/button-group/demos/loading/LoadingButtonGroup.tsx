import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export default function LoadingButtonGroup() {
  return (
    // @focus-start @padding 2
    <ButtonGroup variant="outlined" aria-label="Loading button group">
      <Button>Submit</Button>
      <Button>Fetch data</Button>
      <Button loading loadingPosition="start" startIcon={<SaveIcon />}>
        Save
      </Button>
    </ButtonGroup>
    // @focus-end
  );
}
