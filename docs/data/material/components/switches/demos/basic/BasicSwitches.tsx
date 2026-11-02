import Switch from '@mui/material/Switch';

const label = { slotProps: { input: { 'aria-label': 'Switch demo' } } };

export default function BasicSwitches() {
  return (
    <div>
      {/* @focus-start */}
      <Switch {...label} defaultChecked />
      <Switch {...label} />
      <Switch {...label} disabled defaultChecked />
      <Switch {...label} disabled />
      {/* @focus-end */}
    </div>
  );
}
