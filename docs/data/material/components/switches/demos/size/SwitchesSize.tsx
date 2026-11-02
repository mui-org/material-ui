import Switch from '@mui/material/Switch';

const label = { slotProps: { input: { 'aria-label': 'Size switch demo' } } };

export default function SwitchesSize() {
  return (
    <div>
      {/* @focus-start */}
      <Switch {...label} defaultChecked size="small" />
      <Switch {...label} defaultChecked />
      {/* @focus-end */}
    </div>
  );
}
