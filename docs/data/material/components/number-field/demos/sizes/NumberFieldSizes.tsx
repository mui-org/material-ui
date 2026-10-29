import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldSizes() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* @focus-start */}
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <Box
          key={variant}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}
        >
          <NumberField
            label="Small"
            variant={variant}
            size="small"
            defaultValue={5}
          />
          <NumberField label="Medium" variant={variant} defaultValue={5} />
        </Box>
      ))}
      {/* @focus-end */}
    </Box>
  );
}
