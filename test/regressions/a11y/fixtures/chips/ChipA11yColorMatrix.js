import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const variants = ['filled', 'outlined'];
const colors = ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'];

export default function ChipA11yColorMatrix() {
  return (
    <Box sx={{ display: 'grid', gap: 1, '& > div': { display: 'flex', flexWrap: 'wrap', gap: 1 } }}>
      {variants.map((variant) => (
        <div key={variant}>
          {colors.map((color) => (
            <Chip key={color} variant={variant} color={color} label={`${color} ${variant}`} />
          ))}
        </div>
      ))}
    </Box>
  );
}
