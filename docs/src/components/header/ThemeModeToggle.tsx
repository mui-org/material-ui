import { useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import { useColorSchemeShim } from '@mui/internal-core-docs/ThemeContext';

function CssVarsModeToggle(props: { onChange: (newMode: string) => void }) {
  const { mode, systemMode, setMode } = useColorScheme();
  const calculatedMode = mode === 'system' ? systemMode : mode;

  return (
    <Tooltip title={calculatedMode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        size="small"
        disableTouchRipple
        disabled={!calculatedMode}
        onClick={() => {
          const newMode = calculatedMode === 'dark' ? 'light' : 'dark';
          props.onChange(newMode);
          setMode(newMode);
        }}
      >
        {!calculatedMode
          ? null
          : {
              light: <DarkModeOutlined fontSize="small" />,
              dark: <LightModeOutlined fontSize="small" />,
            }[calculatedMode]}
      </IconButton>
    </Tooltip>
  );
}

export default function ThemeModeToggle() {
  // TODO replace with useColorScheme once all pages support css vars
  const { mode, systemMode, setMode } = useColorSchemeShim();
  const calculatedMode = mode === 'system' ? systemMode : mode;

  const theme = useTheme();

  // Server-side hydration
  if (mode === null) {
    return <IconButton color="primary" size="small" disableTouchRipple />;
  }

  // TODO remove this code branch, all pages should be migrated to use CssVarsProvider
  if (!theme.vars) {
    return (
      <Tooltip title={calculatedMode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
        <IconButton
          color="primary"
          size="small"
          disableTouchRipple
          onClick={() => {
            setMode(calculatedMode === 'dark' ? 'light' : 'dark');
          }}
        >
          {calculatedMode === 'dark' ? (
            <LightModeOutlined fontSize="small" />
          ) : (
            <DarkModeOutlined fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    );
  }

  return <CssVarsModeToggle onChange={setMode} />;
}
