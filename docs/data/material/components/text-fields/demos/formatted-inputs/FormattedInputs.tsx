import * as React from 'react';
import { IMaskInput } from 'react-imask';
import { NumericFormat } from 'react-number-format';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export default function FormattedInputs() {
  // @focus-start @padding 1
  const id = React.useId();
  const [values, setValues] = React.useState({
    textmask: '(100) 000-0000',
    numberformat: '1320',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      <FormControl variant="standard">
        <InputLabel htmlFor={`${id}-input`}>react-imask</InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id={`${id}-input`}
          inputComponent={TextMaskCustom as any}
        />
      </FormControl>
      <NumericFormat
        value={values.numberformat}
        onChange={handleChange}
        customInput={TextField}
        thousandSeparator
        valueIsNumericString
        prefix="$"
        variant="standard"
        label="react-number-format"
      />
    </Stack>
  );
  // @focus-end
}
