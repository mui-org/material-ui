import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import ToggleButton from '@material-ui/core/ToggleButton';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import FormatTextdirectionLToRIcon from '@material-ui/icons/FormatTextdirectionLToR';
import FormatTextdirectionRToLIcon from '@material-ui/icons/FormatTextdirectionRToL';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import { useChangeTheme } from 'docs/src/modules/components/ThemeContext';
import { getCookie } from 'docs/src/modules/utils/helpers';

const DrawerPaper = styled(Paper)({
  width: 352,
});

const Heading = styled(Typography)({
  margin: '16px 0 8px',
});

const IconToggleButton = styled(ToggleButton)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  '& > *': {
    marginRight: '8px',
  },
});

function AppSettingsDrawer(props) {
  const { onClose, open = false, ...other } = props;
  const t = useTranslate();
  const theme = useTheme();
  const changeTheme = useChangeTheme();
  const [mode, setMode] = React.useState(getCookie('paletteMode') || 'system');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const handleChangeThemeMode = (event, paletteMode) => {
    if (paletteMode === null) {
      return;
    }

    setMode(paletteMode);

    if (paletteMode === 'system') {
      document.cookie = `paletteMode=;path=/;max-age=31536000`;
      changeTheme({ paletteMode: preferredMode });
    } else {
      document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
      changeTheme({ paletteMode });
    }
  };

  const handleChangeDirection = (event, direction) => {
    if (direction === null) {
      direction = theme.direction;
    }

    changeTheme({ direction });
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      PaperProps={{ component: DrawerPaper }}
      {...other}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h5">{t('settings.settings')}</Typography>
        <IconButton color="inherit" onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ pl: 2, pr: 2 }}>
        <Heading gutterBottom id="settings-mode">
          {t('settings.mode')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={mode}
          color="primary"
          onChange={handleChangeThemeMode}
          aria-labelledby="settings-mode"
          fullWidth
        >
          <IconToggleButton
            value="light"
            aria-label={t('settings.light')}
            data-ga-event-category="settings"
            data-ga-event-action="light"
          >
            <Brightness7Icon />
            {t('settings.light')}
          </IconToggleButton>
          <IconToggleButton
            value="system"
            aria-label={t('settings.system')}
            data-ga-event-category="settings"
            data-ga-event-action="system"
          >
            <SettingsBrightnessIcon />
            {t('settings.system')}
          </IconToggleButton>
          <IconToggleButton
            value="dark"
            aria-label={t('settings.dark')}
            data-ga-event-category="settings"
            data-ga-event-action="dark"
          >
            <Brightness4Icon />
            {t('settings.dark')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom id="settings-direction">
          {t('settings.direction')}
        </Heading>
        <ToggleButtonGroup
          exclusive
          value={theme.direction}
          onChange={handleChangeDirection}
          aria-labelledby="settings-direction"
          color="primary"
          fullWidth
        >
          <IconToggleButton
            value="ltr"
            aria-label={t('settings.light')}
            data-ga-event-category="settings"
            data-ga-event-action="ltr"
          >
            <FormatTextdirectionLToRIcon />
            {t('settings.ltr')}
          </IconToggleButton>
          <IconToggleButton
            value="rtl"
            aria-label={t('settings.system')}
            data-ga-event-category="settings"
            data-ga-event-action="rtl"
          >
            <FormatTextdirectionRToLIcon />
            {t('settings.rtl')}
          </IconToggleButton>
        </ToggleButtonGroup>
        <Heading gutterBottom>{t('settings.color')}</Heading>
        <Link
          href="/customization/color/#playground"
          data-ga-event-category="settings"
          data-ga-event-action="colors"
          variant="body1"
        >
          {t('settings.editWebsiteColors')}
        </Link>
      </Box>
    </Drawer>
  );
}

AppSettingsDrawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default AppSettingsDrawer;
