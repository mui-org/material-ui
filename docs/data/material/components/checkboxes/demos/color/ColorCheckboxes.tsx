import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function ColorCheckboxes() {
  return (
    <div>
      {/* @focus-start */}
      <Checkbox {...label} defaultChecked />
      <Checkbox {...label} defaultChecked color="secondary" />
      <Checkbox {...label} defaultChecked color="success" />
      <Checkbox {...label} defaultChecked color="default" />
      <Checkbox
        {...label}
        defaultChecked
        sx={{
          color: pink[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}
      />
      {/* @focus-end */}
    </div>
  );
}
