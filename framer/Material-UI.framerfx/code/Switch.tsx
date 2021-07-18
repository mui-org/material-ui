import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiSwitch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface Props {
  checked: boolean;
  defaultChecked?: boolean;
  disabled: boolean;
  disableFocusRipple: boolean;
  disableTouchRipple: boolean;
  focusVisibleClassName?: string;
  label: string;
  width: number | string;
  height: number;
}

export function Switch(props: Props) {
  const {
    checked: checkedProp,
    label,
    // @ts-ignore -- untyped
    onChange,
    // @ts-ignore -- untyped
    size,
    ...other
  } = props;
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
    setChecked((event.target as HTMLInputElement).checked);
  };

  React.useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const control = <MuiSwitch checked={checked} onChange={handleChange} size={size} />;

  return <FormControlLabel control={control} label={label} {...other} />;
}

Switch.defaultProps = {
  checked: false,
  disabled: false,
  disableFocusRipple: false,
  disableTouchRipple: false,
  label: 'Switch',
  width: 100,
  height: 38,
};

addPropertyControls(Switch, {
  checked: {
    type: ControlType.Boolean,
    title: 'Checked',
  },
  defaultChecked: {
    type: ControlType.Boolean,
    title: 'Default checked',
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  disableFocusRipple: {
    type: ControlType.Boolean,
    title: 'Disable focus ripple',
  },
  disableTouchRipple: {
    type: ControlType.Boolean,
    title: 'Disable touch ripple',
  },
  focusVisibleClassName: {
    type: ControlType.String,
    title: 'Focus visible class name',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
