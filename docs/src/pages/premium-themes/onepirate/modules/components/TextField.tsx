import clsx from 'clsx';
import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type {
  FilledTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material/TextField';
import MuiTextField from '@mui/material/TextField';
import { selectClasses } from '@mui/material/Select';
import { inputLabelClasses } from '@mui/material/InputLabel';
import type { FilledInputProps } from '@mui/material/FilledInput';
import type { InputProps as StandardInputProps } from '@mui/material/Input';

const inputStyleMappingClasses = {
  small: 'OnePirateTextField-inputSizeSmall',
  medium: 'OnePirateTextField-inputSizeMedium',
  large: 'OnePirateTextField-inputSizeLarge',
  xlarge: 'OnePirateTextField-inputSizeXLarge',
};

const classes = {
  root: 'OnePirateTextField-root',
  input: 'OnePirateTextField-input',
  inputBorder: 'OnePirateTextField-inputBorder',
};

const styles = ({ theme }: { theme: Theme }) => ({
  [`& .${classes.root}`]: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  [`& .${classes.input}`]: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    '&.Mui-disabled': {
      backgroundColor: theme.palette.divider,
    },
  },
  [`& .${classes.inputBorder}`]: {
    border: '1px solid #e9ddd0',
    '&:focus': {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${inputStyleMappingClasses.small}`]: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)})`,
  },
  [`& .${inputStyleMappingClasses.medium}`]: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)})`,
  },
  [`& .${inputStyleMappingClasses.large}`]: {
    fontSize: 18,
    padding: 20,
    width: `calc(100% - ${20 * 2}px)`,
  },
  [`& .${inputStyleMappingClasses.xlarge}`]: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`,
  },
  [`& .${inputLabelClasses.root}`]: {
    fontSize: 18,
  },
  [`& .${selectClasses.select}`]: {
    height: 'auto',
    borderRadius: 0,
  },
  [`& .${selectClasses.icon}`]: {
    top: '50%',
    marginTop: -12,
  },
});

export interface OnePirateTextFieldProps extends Omit<
  FilledTextFieldProps | StandardTextFieldProps,
  'size' | 'slotProps'
> {
  noBorder?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  slotProps?: OnePirateTextFieldSlotProps;
}

interface OnePirateTextFieldSlotProps {
  formHelperText?: object;
  htmlInput?: object;
  input?: FilledInputProps | StandardInputProps;
  inputLabel?: object;
  root?: object;
  select?: object;
}

function TextField(props: OnePirateTextFieldProps) {
  const { slotProps = {}, noBorder, size = 'medium', ...other } = props;

  const {
    classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {},
    ...InputPropsOther
  } = (slotProps.input ?? {}) as FilledInputProps | StandardInputProps;

  return (
    <MuiTextField
      slotProps={{
        ...slotProps,
        input: {
          classes: {
            root: classes.root,
            input: clsx(
              classes.input,
              inputStyleMappingClasses[size],
              {
                [classes.inputBorder]: !noBorder,
              },
              InputPropsClassesInput,
            ),
            ...InputPropsClassesOther,
          },
          disableUnderline: true,
          ...InputPropsOther,
        },
        inputLabel: {
          ...slotProps.inputLabel,
          shrink: true,
        },
      }}
      {...other}
    />
  );
}

export default styled(TextField)(styles);
