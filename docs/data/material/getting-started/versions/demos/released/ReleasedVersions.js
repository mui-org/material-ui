import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/internal-core-docs/Link';
import { VersionsContext } from '@mui/internal-core-docs/DocsApp';

const GITHUB_RELEASE_BASE_URL = 'https://github.com/mui/material-ui/releases/tag/';

function ReleasedVersions() {
  const versions = React.useContext(VersionsContext) ?? [];

  return (
    <Box sx={{ minHeight: 33 * 11, overflow: 'auto', width: '100%' }}>
      <Table>
        <TableBody>
          {versions.map((doc) => (
            <TableRow key={doc.version}>
              <TableCell>
                <Typography variant="body2">
                  {doc.version}
                  {doc.version.startsWith(
                    `v${process.env.LIB_VERSION.split('.')[0]}`,
                  )
                    ? ' ✓'
                    : ''}
                </Typography>
              </TableCell>
              <TableCell>
                <Link variant="body2" rel="nofollow" href={doc.url}>
                  Documentation
                </Link>
              </TableCell>
              <TableCell>
                {!doc.noReleaseNotes ? (
                  <Link
                    variant="body2"
                    rel="nofollow"
                    href={`${GITHUB_RELEASE_BASE_URL}${doc.version}.0.0`}
                  >
                    Release notes
                  </Link>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default ReleasedVersions;
