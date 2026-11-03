import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/internal-core-docs/Link';

function LatestVersions() {
  return (
    <Box sx={{ width: '100%' }}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body2">master branch</Typography>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                rel="nofollow"
                href="https://material-ui.netlify.app/"
              >
                Documentation
              </Link>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                href="https://github.com/mui/material-ui/tree/master"
              >
                Source code
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">next branch</Typography>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                rel="nofollow"
                href="https://next--material-ui.netlify.app/"
              >
                Documentation
              </Link>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                href="https://github.com/mui/material-ui/tree/next"
              >
                Source code
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

export default LatestVersions;
