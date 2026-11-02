import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import type { IconProps } from '@mui/material/Icon';

function WrappedIcon(props: IconProps) {
  return <Icon {...props} />;
}
WrappedIcon.muiName = 'Icon';

export default function Composition() {
  return (
    <div>
      {/* @focus-start */}
      <IconButton>
        <Icon>alarm</Icon>
      </IconButton>
      <IconButton>
        <WrappedIcon>alarm</WrappedIcon>
      </IconButton>
      {/* @focus-end */}
    </div>
  );
}
