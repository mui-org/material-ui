import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function FlexDivider() {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        color: 'text.secondary',
        '& svg': {
          m: 1,
        },
      }}
    >
      {/* @focus-start */}
      <FormatBoldIcon />
      <Divider orientation="vertical" variant="middle" flexItem />
      <FormatItalicIcon />
      {/* @focus-end */}
    </Box>
  );
}
