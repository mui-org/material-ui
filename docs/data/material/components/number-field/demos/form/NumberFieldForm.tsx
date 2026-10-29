import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NumberField from '@mui/material/NumberField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function NumberFieldForm() {
  // @focus-start @padding 1
  const [value, setValue] = React.useState<number | null>(5);
  const [submitted, setSubmitted] = React.useState<string | null>(null);

  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('price')));
      }}
      onReset={() => {
        setValue(5);
        setSubmitted(null);
      }}
      sx={{ width: 320, maxWidth: '100%' }}
    >
      <NumberField
        label="Price"
        name="price"
        value={value}
        onValueChange={setValue}
        required
        min={0}
        step={0.01}
        locale="en-US"
        format={{ style: 'currency', currency: 'USD' }}
        fullWidth
      />
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button type="reset" variant="outlined">
          Reset
        </Button>
      </Stack>
      {submitted !== null && (
        <Typography sx={{ mt: 2 }}>Submitted price: {submitted}</Typography>
      )}
    </Box>
  );
  // @focus-end
}
