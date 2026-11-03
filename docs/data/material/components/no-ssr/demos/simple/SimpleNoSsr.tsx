import NoSsr from '@mui/material/NoSsr';
import Box from '@mui/material/Box';

export default function SimpleNoSsr() {
  return (
    <div>
      {/* @focus-start */}
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        Server and Client
      </Box>
      <NoSsr>
        <Box
          sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
        >
          Client only
        </Box>
      </NoSsr>
      {/* @focus-end */}
    </div>
  );
}
