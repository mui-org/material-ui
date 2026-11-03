import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const variants = ['text', 'outlined', 'contained'];
const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];

export default function ButtonA11yColorMatrix() {
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
      {variants.map((variant) => (
        <div key={variant}>
          {colors.map((color) => (
            <Button key={`${variant}-${color}`} variant={variant} color={color}>
              {color} {variant}
            </Button>
          ))}
        </div>
      ))}
    </Box>
  );
}
