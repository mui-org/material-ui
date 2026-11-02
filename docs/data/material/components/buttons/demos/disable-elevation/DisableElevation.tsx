import Button from '@mui/material/Button';

export default function DisableElevation() {
  return (
    // @focus-start @padding 2
    <Button variant="contained" disableElevation>
      Disable elevation
    </Button>
    // @focus-end
  );
}
