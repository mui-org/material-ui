import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <div {...other} />;
}

export default function OverridingInternalSlot() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: 320, minHeight: 220 }}
    >
      {/* @focus-start */}
      <Autocomplete
        open
        options={['🆘 Need help', '✨ Improvement', '🚀 New feature', '🐛 Bug fix']}
        renderInput={(params) => <TextField {...params} />}
        slots={{
          popper: PopperComponent,
        }}
      />
      {/* @focus-end */}
    </Box>
  );
}
