import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

// Helper text in each TextField variant, where TextField connects it with
// aria-describedby, in the resting and error states. The red label of the
// filled error field is a known TextField 1.4.3 failure that this fixture shows.
// A disabled field is left out: its helper text is part of an inactive user
// interface component, which axe cannot see.
export default function FormHelperTextA11yVariants() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <TextField label="Username" helperText="Use 3 to 20 letters or numbers." />
      <TextField label="Phone number" variant="filled" helperText="Include the country code." />
      <TextField
        label="City"
        variant="standard"
        helperText="Use the city of your billing address."
      />
      <TextField
        label="Email address"
        error
        defaultValue="name@"
        helperText="Enter a valid email address."
      />
      <TextField
        label="Postcode"
        variant="filled"
        error
        defaultValue="1"
        helperText="Enter five digits."
      />
      <TextField
        label="Country"
        variant="standard"
        error
        defaultValue="X"
        helperText="Enter a country name."
      />
    </Stack>
  );
}
