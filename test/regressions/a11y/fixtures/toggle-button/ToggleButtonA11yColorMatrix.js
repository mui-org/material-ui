import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';

const colors = ['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning'];

export default function ToggleButtonA11yColorMatrix() {
  return (
    <Box
      sx={{
        color: 'text.primary',
        display: 'grid',
        gap: 1,
        '& > div': {
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        },
      }}
    >
      {[false, true].map((selected) => (
        <div key={String(selected)}>
          {colors.map((color) => (
            <ToggleButton
              key={`${color}-${selected}`}
              value={`${color}-${selected}`}
              color={color}
              selected={selected}
            >
              {color}
            </ToggleButton>
          ))}
        </div>
      ))}
    </Box>
  );
}
