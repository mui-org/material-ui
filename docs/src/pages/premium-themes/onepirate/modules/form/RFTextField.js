import TextField from '../components/TextField';
import PropTypes from 'prop-types';

function RFTextField(props) {
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

RFTextField.propTypes = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  input: PropTypes.shape({
    checked: PropTypes.bool,
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    data: PropTypes.object,
    dirty: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    error: PropTypes.any,
    initial: PropTypes.any,
    invalid: PropTypes.bool,
    length: PropTypes.number,
    modified: PropTypes.bool,
    modifiedSinceLastSubmit: PropTypes.bool,
    pristine: PropTypes.bool,
    submitError: PropTypes.any,
    submitFailed: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitting: PropTypes.bool,
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    validating: PropTypes.bool,
    visited: PropTypes.bool,
  }).isRequired,
  slotProps: PropTypes.shape({
    formHelperText: PropTypes.object,
    htmlInput: PropTypes.object,
    input: PropTypes.object,
    inputLabel: PropTypes.object,
    root: PropTypes.object,
    select: PropTypes.object,
  }),
};

export default RFTextField;
