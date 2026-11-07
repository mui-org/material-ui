import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

// FormGroup renders a div with no role. These groups get their name from a
// fieldset legend or from role="group" with aria-labelledby. The "Remember me"
// group has no name, which is the author's responsibility. The wide row wraps
// in the 320px layout suite.
export default function FormGroupA11yStates() {
  return (
    <Stack spacing={3}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Toppings</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Cheese" />
          <FormControlLabel control={<Checkbox />} label="Mushrooms" />
        </FormGroup>
        <FormHelperText>Pick any number.</FormHelperText>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Notifications</FormLabel>
        <FormGroup row>
          <FormControlLabel control={<Switch defaultChecked />} label="Email" />
          <FormControlLabel control={<Switch />} label="Push" />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" error>
        <FormLabel component="legend">Delivery days</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Monday" />
          <FormControlLabel control={<Checkbox />} label="Tuesday" />
        </FormGroup>
        <FormHelperText>Error: select at least one delivery day.</FormHelperText>
      </FormControl>
      <div>
        <Typography id="form-group-a11y-share">Share with</Typography>
        <FormGroup role="group" aria-labelledby="form-group-a11y-share">
          <FormControlLabel control={<Checkbox />} label="Team" />
          <FormControlLabel control={<Checkbox />} label="Company" />
        </FormGroup>
      </div>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Remember me" />
      </FormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">Interests</FormLabel>
        <FormGroup row>
          {[
            'Accessibility',
            'Design systems',
            'Performance',
            'Internationalization',
            'Testing',
          ].map((label) => (
            <FormControlLabel key={label} control={<Checkbox />} label={label} />
          ))}
        </FormGroup>
      </FormControl>
    </Stack>
  );
}
