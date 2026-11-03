import Checkbox from '@mui/material/Checkbox';

const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

export default function SizeCheckboxes() {
  return (
    <div>
      {/* @focus-start */}
      <Checkbox {...label} defaultChecked size="small" />
      <Checkbox {...label} defaultChecked />
      <Checkbox
        {...label}
        defaultChecked
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
      {/* @focus-end */}
    </div>
  );
}
