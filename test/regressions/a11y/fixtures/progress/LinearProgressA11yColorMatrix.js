import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];

const variants = ['determinate', 'buffer', 'indeterminate', 'query'];

// Determinate and buffer take a value; indeterminate and query take none.
const valuePropsByVariant = {
  determinate: { value: 60 },
  buffer: { value: 60, valueBuffer: 80 },
  indeterminate: {},
  query: {},
};

export default function LinearProgressA11yColorMatrix() {
  return (
    <Box sx={{ color: 'text.primary', display: 'grid', gap: 2, width: 320 }}>
      {variants.map((variant) => (
        <Stack key={variant} spacing={1}>
          {colors.map((color) => (
            <LinearProgress
              key={`${variant}-${color}`}
              color={color}
              variant={variant}
              aria-label={`${color} ${variant}`}
              {...valuePropsByVariant[variant]}
            />
          ))}
        </Stack>
      ))}
    </Box>
  );
}
