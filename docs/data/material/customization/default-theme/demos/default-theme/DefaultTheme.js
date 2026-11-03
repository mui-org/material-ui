import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { createTheme, styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTranslate } from '@mui/internal-core-docs/i18n';
import ThemeViewer, {
  useItemIdsLazy,
} from 'docs/src/modules/components/ThemeViewer';
import { blue, grey } from '@mui/internal-core-docs/branding';

const StyledSwitch = styled(Switch)(({ theme }) => [
  {
    display: 'flex',
    padding: 0,
    width: 32,
    height: 20,
    borderRadius: 99,
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 16,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#FFF',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: blue[500],
        },
      },
    },
    '& .MuiSwitch-thumb': {
      width: 16,
      height: 16,
      borderRadius: 99,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: grey[400],
      boxSizing: 'border-box',
    },
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
          '& + .MuiSwitch-track': {
            backgroundColor: blue[500],
          },
        },
      },
      '& .MuiSwitch-track': {
        backgroundColor: grey[700],
      },
    },
  },
]);

function DefaultTheme() {
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState(null);
  const t = useTranslate();
  const [darkTheme, setDarkTheme] = React.useState(false);

  React.useEffect(() => {
    let expandPath;
    decodeURI(document.location.search.slice(1))
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name === 'expand-path') {
          expandPath = value;
        }
      });

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath
        .replace('$.', '')
        .split('.')
        .reduce((acc, path) => {
          const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
          acc.push(last + path);
          return acc;
        }, []),
    );
  }, []);

  const data = React.useMemo(() => {
    const themeData = createTheme({
      palette: { mode: darkTheme ? 'dark' : 'light' },
    });

    const {
      unstable_sxConfig: unstableSxConfig,
      unstable_sx: unstableSx,
      ...rest
    } = themeData;

    return rest;
  }, [darkTheme]);

  const allNodeIds = useItemIdsLazy(data);
  React.useDebugValue(allNodeIds);

  const currentExpandPaths = React.useMemo(() => {
    if (expandPaths !== null) {
      return expandPaths;
    }
    return checked ? allNodeIds : [];
  }, [checked, allNodeIds, expandPaths]);

  const collapsedThemeViewer = React.useMemo(
    () => <ThemeViewer data={data} expandPaths={[]} />,
    [data],
  );

  const expandedThemeViewer = React.useMemo(
    () => <ThemeViewer data={data} expandPaths={allNodeIds} />,
    [data, allNodeIds],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControlLabel
          label={t('expandAll')}
          sx={{
            m: 0,
            flexDirection: 'row-reverse',
            gap: 1,
            '& .MuiFormControlLabel-label': {
              fontFamily: 'IBM Plex Sans',
              color: 'text.secondary',
            },
          }}
          control={
            <StyledSwitch
              size="small"
              checked={checked}
              onChange={(event) => {
                setChecked(event.target.checked);
              }}
            />
          }
        />
        <Divider orientation="vertical" flexItem />
        <FormControlLabel
          label={t('useDarkTheme')}
          sx={{
            m: 0,
            flexDirection: 'row-reverse',
            gap: 1,
            '& .MuiFormControlLabel-label': {
              fontFamily: 'IBM Plex Sans',
              color: 'text.secondary',
            },
          }}
          control={
            <StyledSwitch
              size="small"
              checked={darkTheme}
              onChange={(event) => {
                setDarkTheme(event.target.checked);
              }}
            />
          }
        />
      </Box>
      {expandPaths !== null ? (
        <ThemeViewer data={data} expandPaths={currentExpandPaths} />
      ) : (
        <React.Fragment>
          <Box sx={{ display: checked ? 'none' : 'block' }}>
            {collapsedThemeViewer}
          </Box>
          <Box sx={{ display: checked ? 'block' : 'none' }}>
            {expandedThemeViewer}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default DefaultTheme;
