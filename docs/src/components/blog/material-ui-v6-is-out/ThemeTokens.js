import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

const defaultTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

const traverseObject = (palette) => {
  const result = {};
  const traverse = (object, parts = []) => {
    if (object && typeof object === 'object') {
      for (const key of Object.keys(object)) {
        traverse(object[key], [...parts, key]);
      }
    } else if (typeof object !== 'function') {
      result[parts.join('.')] = object;
    }
  };
  traverse(palette);
  return result;
};

const Table = styled('table')(({ theme }) => ({
  width: 'max-content', // to keep the content in 1 line
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  height: 'clamp(30vmax, 40vmax, 40vmin)',
  maxHeight: '40vmin',
  overflowY: 'scroll',
  '& th': {
    textAlign: 'left',
    padding: 10,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.grey[50],
    ...theme.applyStyles('dark', {
      borderColor: 'var(--muidocs-palette-primaryDark-700)',
      backgroundColor: 'hsl(210, 25%, 9%)',
    }),
  },
  '& td': {
    verticalAlign: 'top',
    padding: '4px 10px',
    fontSize: '0.75rem',
    fontFamily: 'Menlo,Consolas,"Droid Sans Mono",monospace',
    backgroundColor: theme.palette.common.white,
    ...theme.applyStyles('dark', {
      backgroundColor: 'var(--muidocs-palette-primaryDark-900)',
    }),
  },
}));

const ColorSwatch = styled('span')(({ theme }) => ({
  display: 'inline-block',
  marginRight: '3px',
  marginBottom: '1px',
  verticalAlign: 'middle',
  width: '0.75em',
  height: '0.75em',
  borderRadius: '2px',
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  backgroundColor: 'currentcolor',
}));

export default function TemplateCarousel() {
  const colors = traverseObject(defaultTheme.vars.palette);
  const fonts = Object.keys(defaultTheme.vars.font).map(
    (key) => `--mui-font-${key.replace('.', '-')}`,
  );
  const shadow = Object.keys(defaultTheme.vars.shadows).map((key) => `--mui-shadows-${key}`);
  const overlay = Object.keys(defaultTheme.vars.overlays).map((key) => `--mui-overlays-${key}`);
  const spacing = ['--mui-spacing'];
  const shape = ['--mui-shape-borderRadius'];
  const zIndex = Object.keys(defaultTheme.vars.zIndex).map((key) => `--mui-zIndex-${key}`);
  return (
    <ThemeProvider
      theme={
        // Use a function to ensure that the theme context does not inherit the upper branding theme.
        // It's required because this demo needs to show default tokens of Material UI theme.
        () => defaultTheme
      }
    >
      <Box
        sx={(theme) => ({
          mb: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '10px',
          position: 'relative',
          overflow: 'hidden',
          ...theme.applyStyles('dark', {
            borderColor: 'var(--muidocs-palette-primaryDark-700)',
          }),
          mx: 'clamp(-147px, (1000px - 100vw) * 9999, 0px)',
        })}
      >
        <Box
          sx={(theme) => ({
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 56,
            pointerEvents: 'none',
            opacity: 0.4,
            background:
              'linear-gradient(180deg, hsla(0, 0%, 100%, 0) 80%, hsla(215, 15%, 80%, 0.7) 100%)',
            ...theme.applyStyles('dark', {
              opacity: 0.5,
              background:
                'linear-gradient(180deg, hsla(0, 0%, 0%, 0) 80%, hsla(215, 15%, 0%, 0.8) 100%)',
            }),
          })}
        />
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            width: 56,
            pointerEvents: 'none',
            opacity: 0.4,
            background:
              'linear-gradient(90deg, hsla(0, 0%, 100%, 0) 80%, hsla(215, 15%, 80%, 0.7) 100%)',
            ...theme.applyStyles('dark', {
              opacity: 0.5,
              background:
                'linear-gradient(90deg, hsla(0, 0%, 0%, 0) 80%, hsla(215, 15%, 0%, 0.8) 100%)',
            }),
          })}
        />
        <Box sx={{ overflow: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <th>Light colors</th>
                <th>Dark colors</th>
                <th>Font</th>
                <th>Overlay</th>
                <th>Shadow</th>
                <th>Spacing</th>
                <th>Shape</th>
                <th>z Index</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(colors).map((color, index) => (
                <tr key={index}>
                  <td>
                    <ColorSwatch data-mui-color-scheme="light" style={{ color: color[1] }} />
                    --mui-{color[0].replace('.', '-')}
                  </td>
                  <td>
                    <ColorSwatch data-mui-color-scheme="dark" style={{ color: color[1] }} />
                    --mui-{color[0].replace('.', '-')}
                  </td>
                  <td>{fonts[index]}</td>
                  <td>{overlay[index]}</td>
                  <td>{shadow[index]}</td>
                  <td>{spacing[index]}</td>
                  <td>{shape[index]}</td>
                  <td>{zIndex[index]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
