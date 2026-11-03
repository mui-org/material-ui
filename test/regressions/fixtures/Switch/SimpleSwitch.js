import Switch from '@mui/material/Switch';

const label = { slotProps: { input: { 'aria-label': 'Switch demo' } } };

export default function BasicSwitches() {
  return (
    <div>
      <Switch {...label} />
      <Switch {...label} defaultChecked />
    </div>
  );
}
