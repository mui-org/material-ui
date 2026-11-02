import Box from '@mui/system/Box';
import Grid from '@mui/system/Grid';
import styled from '@mui/system/styled';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Item = styled('div')(({ theme }) => ({
  border: '1px solid',
  borderColor: '#ced7e0',
  borderRadius: 4,
  ...theme.applyStyles('dark', {
    borderColor: '#444d58',
  }),
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function AutoGridNoWrap() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, maxWidth: 400 }}>
      {/* @focus-start */}
      <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid>
            <Avatar>W</Avatar>
          </Grid>
          <Grid size="grow">
            <Typography noWrap>{message}</Typography>
          </Grid>
        </Grid>
      </Item>
      <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid>
            <Avatar>W</Avatar>
          </Grid>
          <Grid size="grow">
            <Typography
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {message}
            </Typography>
          </Grid>
        </Grid>
      </Item>
      {/* @focus-end */}
    </Box>
  );
}
