import { ThemeProvider, createTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Check from '@mui/icons-material/Check';

const finalTheme = createTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            // https://mui.com/system/getting-started/the-sx-prop/#spacing
            px: 1,
            py: 0.25,
            // https://mui.com/system/borders/#border-radius
            borderRadius: 1, // 4px as default.
          }),
        label: {
          padding: 'initial',
        },
        icon: ({ theme }) =>
          theme.unstable_sx({
            mr: 0.5,
            ml: '-2px',
          }),
      },
    },
  },
});

export default function GlobalThemeOverrideSx() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={finalTheme}>
      <Chip
        color="success"
        label={
          <span>
            <b>Status:</b> Completed
          </span>
        }
        icon={<Check fontSize="small" />}
      />
    </ThemeProvider>
    // @focus-end
  );
}
