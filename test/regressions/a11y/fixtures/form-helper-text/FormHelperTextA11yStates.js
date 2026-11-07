import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

// Standalone FormHelperText that the author connects with aria-describedby, in
// the resting and error states. The last message is long, so it wraps in the
// 320px layout suite.
export default function FormHelperTextA11yStates() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <FormControl>
        <InputLabel htmlFor="form-helper-text-a11y-user">Username</InputLabel>
        <Input id="form-helper-text-a11y-user" aria-describedby="form-helper-text-a11y-user-help" />
        <FormHelperText id="form-helper-text-a11y-user-help">
          Use 3 to 20 letters or numbers.
        </FormHelperText>
      </FormControl>
      <FormControl error>
        <InputLabel htmlFor="form-helper-text-a11y-email">Email address</InputLabel>
        <Input
          id="form-helper-text-a11y-email"
          defaultValue="name@"
          aria-describedby="form-helper-text-a11y-email-error"
        />
        <FormHelperText id="form-helper-text-a11y-email-error">
          Enter a valid email address, for example name@example.com.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="form-helper-text-a11y-code">Promo code</InputLabel>
        <Input id="form-helper-text-a11y-code" aria-describedby="form-helper-text-a11y-code-help" />
        <FormHelperText id="form-helper-text-a11y-code-help">
          Promo codes are not case sensitive and expire at the end of the month, so enter the code
          before you check out.
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}
