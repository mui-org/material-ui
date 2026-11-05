import type { FieldRenderProps } from 'react-final-form';
import type { OnePirateTextFieldProps } from '../components/TextField';
import TextField from '../components/TextField';

function RFTextField(
  props: OnePirateTextFieldProps & FieldRenderProps<string, HTMLElement>,
) {
  const {
    autoComplete,
    input,
    slotProps,
    meta: { touched, error, submitError },
    ...other
  } = props;

  return (
    <TextField
      error={Boolean(!!touched && (error || submitError))}
      {...input}
      {...other}
      slotProps={{
        ...slotProps,
        htmlInput: {
          autoComplete,
          ...slotProps?.htmlInput,
        },
      }}
      helperText={touched ? error || submitError : ''}
      variant="standard"
    />
  );
}

export default RFTextField;
