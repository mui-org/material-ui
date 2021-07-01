import * as React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useUtils } from './hooks/useUtils';
import CalendarIcon from '../svg-icons/Calendar';
import { useMaskedInput } from './hooks/useMaskedInput';
import { DateInputProps } from './PureDateInput';
import { getTextFieldAriaText } from './text-field-helper';

export const KeyboardDateInput = React.forwardRef(function KeyboardDateInput(
  props: DateInputProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const {
    components = {},
    disableOpenPicker,
    getOpenDialogAriaText = getTextFieldAriaText,
    InputAdornmentProps,
    InputProps,
    inputRef,
    openPicker,
    OpenPickerButtonProps,
    renderInput,
    ...other
  } = props;
  const utils = useUtils();
  const textFieldProps = useMaskedInput(other);
  const adornmentPosition = InputAdornmentProps?.position || 'end';
  const OpenPickerIcon = components.OpenPickerIcon || CalendarIcon;

  return renderInput({
    ref,
    inputRef,
    ...textFieldProps,
    InputProps: {
      ...InputProps,
      [`${adornmentPosition}Adornment`]: disableOpenPicker ? undefined : (
        <InputAdornment position={adornmentPosition} {...InputAdornmentProps}>
          <IconButton
            edge={adornmentPosition}
            data-mui-test="open-picker-from-keyboard"
            disabled={other.disabled || other.readOnly}
            aria-label={getOpenDialogAriaText(other.rawValue, utils)}
            {...OpenPickerButtonProps}
            onClick={openPicker}
          >
            <OpenPickerIcon />
          </IconButton>
        </InputAdornment>
      ),
    },
  });
});

KeyboardDateInput.propTypes = {
  acceptRegex: PropTypes.instanceOf(RegExp),
  getOpenDialogAriaText: PropTypes.func,
  mask: PropTypes.string,
  OpenPickerButtonProps: PropTypes.object,
  renderInput: PropTypes.func.isRequired,
  rifmFormatter: PropTypes.func,
};

export default KeyboardDateInput;
