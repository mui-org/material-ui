import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// TODO: Ideally this should be generated from the HighContrastTokens TS interface
// rather than maintained manually, but auto-extraction would lose descriptions and
// default values. A solution that exports token metadata from the interface is needed.
const tokens = [
  {
    token: 'disabled',
    color: 'GrayText',
    description: 'Color for disabled elements',
  },
  { token: 'error', color: 'ActiveText', description: 'Color for error states' },
  {
    token: 'selectedBackground',
    color: 'SelectedItem',
    description: 'Background color for selected items',
  },
  {
    token: 'selectedText',
    color: 'SelectedItemText',
    description: 'Text color on selected items',
  },
  {
    token: 'activeBackground',
    color: 'Highlight',
    description: 'Background color for active or toggled controls',
  },
  {
    token: 'activeText',
    color: 'HighlightText',
    description: 'Text color on active or toggled controls',
  },
  {
    token: 'buttonBorder',
    color: 'ButtonBorder',
    description: 'Border color for interactive controls',
  },
  {
    token: 'buttonText',
    color: 'ButtonText',
    description: 'Text and icon color on buttons',
  },
  {
    token: 'canvas',
    color: 'Canvas',
    description: 'Background color for the page or canvas',
  },
];

const Table = styled('table')(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  ...theme.typography.body2,
}));

const Th = styled('th')(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(1, 2),
  borderBottom: `2px solid ${theme.palette.divider}`,
  whiteSpace: 'nowrap',
}));

const Td = styled('td')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  verticalAlign: 'middle',
}));

const ColorSwatch = styled('div')(({ theme }) => ({
  display: 'inline-block',
  width: theme.spacing(3),
  height: theme.spacing(3),
  marginRight: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  outline: '1px solid ButtonBorder',
  verticalAlign: 'middle',
}));

export default function HighContrastTokens() {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <thead>
          <tr>
            <Th>Token</Th>
            <Th>Default</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(({ token, color, description }) => (
            <tr key={token}>
              <Td>
                <code>{token}</code>
              </Td>
              <Td>
                <ColorSwatch style={{ backgroundColor: color }} />
                <Typography component="code" variant="body2">
                  {color}
                </Typography>
              </Td>
              <Td sx={{ color: 'text.secondary' }}>{description}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
