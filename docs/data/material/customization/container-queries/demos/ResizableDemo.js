import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Line = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: '100vh',
  top: 0,
  transform: 'translateY(-400px)',
  left: 0,
  borderLeft: '1px dashed',
  borderColor: (theme.vars || theme).palette.divider,
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: '0.75rem',
  fontFamily: 'Menlo, monospace',
  '& span': {
    position: 'absolute',
    top: 'calc(400px - 1em)',
    left: 4,
  },
}));

export default function ResizableDemo({ children }) {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBlock: 2,
        ml: 2,
        mr: 'auto',
        '*:has(> &)': {
          overflow: 'hidden',
        },
      }}
    >
      <Line>
        <span>0px</span>
      </Line>
      <Line sx={{ left: 350 }}>
        <span>350px</span>
      </Line>
      <Line sx={{ left: 500 }}>
        <span>500px</span>
      </Line>
      {children}
    </Box>
  );
}
