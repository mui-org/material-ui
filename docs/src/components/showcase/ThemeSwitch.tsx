import Box from '@mui/material/Box';
import Switch, { switchClasses } from '@mui/material/Switch';

export default function ThemeSwitch() {
  const label = { slotProps: { input: { 'aria-label': 'Themed Switch' } } };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexGrow: 1,
        [`& .${switchClasses.root}`]: {
          width: 32,
          height: 20,
          padding: 0,
          [`& .${switchClasses.switchBase}`]: {
            padding: '3px',
            color: '#fff',
            [`&.${switchClasses.checked}`]: {
              transform: 'translateX(12px)',
            },
          },
          [`& .${switchClasses.thumb}`]: {
            padding: 0,
            height: 14,
            width: 14,
            boxShadow: 'none',
          },
        },
      }}
    >
      <Switch defaultChecked {...label} />
      <Switch {...label} />
    </Box>
  );
}
