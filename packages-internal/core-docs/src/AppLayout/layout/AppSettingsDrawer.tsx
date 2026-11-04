import * as React from 'react';
import { styled, useTheme, useColorScheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import type { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import FormatTextdirectionRToLIcon from '@mui/icons-material/FormatTextdirectionRToL';
import { useColorSchemeShim, useChangeTheme } from '../../ThemeContext';
import { useTranslate } from '../../i18n';

const Heading = styled(Typography)(({ theme }) => ({
  margin: '16px 0 8px',
  fontWeight: theme.typography.fontWeightSemiBold,
  fontSize: theme.typography.pxToRem(11),
  textTransform: 'uppercase',
  letterSpacing: '.1rem',
  color: (theme.vars || theme).palette.text.tertiary,
}));

const IconToggleButton = styled(ToggleButton)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  '& > *': {
    marginRight: '8px',
  },
});

type PaletteMode = 'light' | 'system' | 'dark';

interface ToggleThemeProps {
  value: PaletteMode | undefined;
  onChange: (event: React.MouseEvent<HTMLElement>, value: PaletteMode | null) => void;
}

function ToggleTheme(props: ToggleThemeProps) {
  const { value, onChange } = props;
  const t = useTranslate();
  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      color="primary"
      onChange={onChange}
      aria-labelledby="settings-mode"
      fullWidth
    >
      <IconToggleButton
        value="light"
        aria-label={t('settings.light')}
        data-ga-event-category="settings"
        data-ga-event-action="light"
      >
        <LightModeIcon fontSize="small" />
        {t('settings.light')}
      </IconToggleButton>
      <IconToggleButton
        value="system"
        aria-label={t('settings.system')}
        data-ga-event-category="settings"
        data-ga-event-action="system"
      >
        <SettingsBrightnessIcon fontSize="small" />
        {t('settings.system')}
      </IconToggleButton>
      <IconToggleButton
        value="dark"
        aria-label={t('settings.dark')}
        data-ga-event-category="settings"
        data-ga-event-action="dark"
      >
        <DarkModeOutlinedIcon fontSize="small" />
        {t('settings.dark')}
      </IconToggleButton>
    </ToggleButtonGroup>
  );
}

function ToggleVarTheme(props: ToggleThemeProps) {
  const { setMode } = useColorScheme();

  const handleChangeThemeMode = (
    event: React.MouseEvent<HTMLElement>,
    paletteMode: PaletteMode | null,
  ) => {
    if (paletteMode === null) {
      return;
    }
    props.onChange(event, paletteMode);
    setMode(paletteMode);
  };
  return <ToggleTheme value={props.value} onChange={handleChangeThemeMode} />;
}

export interface AppSettingsDrawerProps extends Omit<DrawerProps, 'onClose'> {
  onClose: () => void;
  open?: boolean;
}

export function AppSettingsDrawer(props: AppSettingsDrawerProps) {
  const { onClose, open = false, ...other } = props;
  const t = useTranslate();
  const upperTheme = useTheme();
  const changeTheme = useChangeTheme();

  // TODO replace with useColorScheme once all pages support css vars
  const { mode, setMode } = useColorSchemeShim();

  const handleChangeThemeMode = (
    _event: React.MouseEvent<HTMLElement>,
    paletteMode: PaletteMode | null,
  ) => {
    if (paletteMode === null) {
      return;
    }
    setMode(paletteMode);
  };

  const handleChangeDirection = (
    _event: React.MouseEvent<HTMLElement>,
    direction: 'ltr' | 'rtl' | null,
  ) => {
    if (direction === null) {
      direction = upperTheme.direction;
    }
    changeTheme({ direction });
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            width: { xs: 310, sm: 360 },
            borderRadius: '10px 0px 0px 10px',
            border: '1px solid',
            borderColor: 'divider',
          },
        },
      }}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          {t('settings.settings')}
        </Typography>
        <IconButton color="inherit" onClick={onClose} edge="end" aria-label={t('close')}>
          <CloseIcon color="primary" fontSize="small" />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ pl: 2, pr: 2 }}>
        <Heading gutterBottom id="settings-mode">
          {t('settings.mode')}
        </Heading>
        {upperTheme.vars ? (
          <ToggleVarTheme value={mode as PaletteMode} onChange={handleChangeThemeMode} />
        ) : (
          <ToggleTheme value={mode as PaletteMode} onChange={handleChangeThemeMode} />
        )}
        <Heading gutterBottom id="settings-direction">
          {t('settings.direction')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={upperTheme.direction}
          onChange={handleChangeDirection}
          aria-labelledby="settings-direction"
          color="primary"
          fullWidth
        >
          <IconToggleButton
            value="ltr"
            aria-label={t('settings.ltr')}
            data-ga-event-category="settings"
            data-ga-event-action="ltr"
          >
            <FormatTextdirectionLToRIcon fontSize="small" />
            {t('settings.ltr')}
          </IconToggleButton>
          <IconToggleButton
            value="rtl"
            aria-label={t('settings.rtl')}
            data-ga-event-category="settings"
            data-ga-event-action="rtl"
          >
            <FormatTextdirectionRToLIcon fontSize="small" />
            {t('settings.rtl')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom>{t('settings.color')}</Heading>
        <Button
          component="a"
          href="/material-ui/customization/color/#playground"
          data-ga-event-category="settings"
          data-ga-event-action="colors"
          variant="outlined"
          size="small"
          fullWidth
        >
          {t('settings.editDocsColors')}
        </Button>
      </Box>
    </Drawer>
  );
}
