import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

// FormLabel as a group name (legend), and as the label of a field in the
// required, error, and disabled states that FormControl passes down. The
// required radio group shows the asterisk, but its radios do not get `required`.
export default function FormLabelA11yStates() {
  return (
    <Stack spacing={3} sx={{ maxWidth: 360 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Notification method</FormLabel>
        <RadioGroup defaultValue="email" name="form-label-a11y-method">
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel value="sms" control={<Radio />} label="Text message" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" required>
        <FormLabel component="legend">Shipping speed</FormLabel>
        <RadioGroup name="form-label-a11y-speed">
          <FormControlLabel value="standard" control={<Radio />} label="Standard" />
          <FormControlLabel value="express" control={<Radio />} label="Express" />
        </RadioGroup>
      </FormControl>
      <FormControl required>
        <FormLabel htmlFor="form-label-a11y-name">Full name</FormLabel>
        <Input id="form-label-a11y-name" />
      </FormControl>
      <FormControl error>
        <FormLabel htmlFor="form-label-a11y-email">Email address</FormLabel>
        <Input id="form-label-a11y-email" aria-describedby="form-label-a11y-email-error" />
        <FormHelperText id="form-label-a11y-email-error">
          Enter a valid email address
        </FormHelperText>
      </FormControl>
      <FormControl disabled>
        <FormLabel htmlFor="form-label-a11y-company">Company</FormLabel>
        <Input id="form-label-a11y-company" />
      </FormControl>
    </Stack>
  );
}
