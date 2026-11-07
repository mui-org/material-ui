import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';

const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning'];

// The resting, error, and focused label colors. `focused` shows the palette
// color that the label takes while its field has focus.
export default function FormLabelA11yColorMatrix() {
  return (
    <Stack spacing={1}>
      <FormLabel>Resting label</FormLabel>
      <FormLabel error>Error label</FormLabel>
      {colors.map((color) => (
        <FormLabel key={color} color={color} focused>
          {`Focused ${color} label`}
        </FormLabel>
      ))}
    </Stack>
  );
}
