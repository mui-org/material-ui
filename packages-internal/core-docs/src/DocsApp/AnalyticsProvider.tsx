import * as React from 'react';
import Router from 'next/router';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useLocalStorageState from '@mui/utils/useLocalStorageState';
import { alpha } from '@mui/system';
import Portal from '@mui/material/Portal';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import { BrandingCssThemeProvider } from '../branding/BrandingCssVarsProvider';

const COOKIE_CONSENT_KEY = 'docs-cookie-consent';
const COOKIE_PREFERENCES_HASH = '#cookie-preferences';

type ConsentStatus = 'analytics' | 'essential' | null;

function getDoNotTrack(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  // Check for Do Not Track (DNT)
  return navigator.doNotTrack === '1' || (window as { doNotTrack?: string }).doNotTrack === '1';
}

// DNT doesn't change during a session, so we can use a simple external store
const subscribeToNothing = () => () => {};
const getDoNotTrackSnapshot = () => getDoNotTrack();
const getDoNotTrackServerSnapshot = () => true; // Assume DNT until we know the actual value

function useDoNotTrack(): boolean {
  return React.useSyncExternalStore(
    subscribeToNothing,
    getDoNotTrackSnapshot,
    getDoNotTrackServerSnapshot,
  );
}

interface AnalyticsContextValue {
  consentStatus: ConsentStatus;
  hasAnalyticsConsent: boolean;
  needsConsent: boolean;
  setAnalyticsConsent: () => void;
  setEssentialOnly: () => void;
}

const AnalyticsContext = React.createContext<AnalyticsContextValue>({
  consentStatus: null,
  hasAnalyticsConsent: false,
  needsConsent: false,
  setAnalyticsConsent: () => {},
  setEssentialOnly: () => {},
});

export function useAnalyticsConsent() {
  return React.useContext(AnalyticsContext);
}

export function CookieConsentDialog() {
  const { consentStatus, needsConsent, setAnalyticsConsent, setEssentialOnly } =
    useAnalyticsConsent();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (needsConsent) {
      // Double rAF to ensure the initial opacity: 0 state is painted before transitioning.
      // The first callback replaces the handle, so the cleanup cancels whichever frame is pending.
      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          setShow(true);
        });
      });
      return () => cancelAnimationFrame(frame);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShow(false);
    return undefined;
  }, [needsConsent]);

  return (
    <Portal>
      <TrapFocus open={needsConsent} disableAutoFocus disableEnforceFocus>
        <Fade in={show} unmountOnExit>
          <Paper
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-consent-dialog-title"
            aria-describedby="cookie-consent-dialog-description"
            variant="outlined"
            tabIndex={-1}
            sx={(theme) => ({
              position: 'fixed',
              bottom: 0,
              right: 0,
              p: 2,
              m: 2,
              maxWidth: 340,
              pointerEvents: 'auto',
              boxShadow: theme.shadows[2],
              zIndex: theme.zIndex.snackbar,
              ...(theme.applyDarkStyles
                ? theme.applyDarkStyles({
                    bgcolor: 'primaryDark.900',
                  })
                : {
                    [theme.getColorSchemeSelector?.('dark') || '&.mode-dark']: {
                      bgcolor: 'primaryDark.900',
                    },
                  }),
            })}
          >
            <Stack direction="column" spacing={3} sx={{ justifyContent: 'flex-start' }}>
              <Stack
                spacing={1}
                sx={{ flexShrink: 1, alignSelf: { xs: 'flex-start', sm: 'center' } }}
              >
                <Box
                  sx={(theme) => ({
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    p: 1,
                    display: 'inline-block',
                    width: 40,
                    height: 40,
                    mb: -1,
                    alignSelf: { xs: 'center', sm: 'flex-start' },
                  })}
                >
                  <CookieOutlinedIcon color="primary" strokeWidth={1.5} />
                </Box>
                <Stack spacing={0.5}>
                  <Typography
                    variant="subtitle2"
                    component="h2"
                    id="cookie-consent-dialog-title"
                    sx={{ textAlign: { xs: 'center', sm: 'start' } }}
                  >
                    Cookie preferences
                  </Typography>
                  <Typography
                    id="cookie-consent-dialog-description"
                    variant="body2"
                    sx={{ textAlign: { xs: 'center', sm: 'start' } }}
                  >
                    We use cookies to understand site usage and improve our content. This includes
                    third-party analytics.{' '}
                    {consentStatus !== null && (
                      <Box component="span" sx={{ display: 'block', mt: 1 }}>
                        Current preference:{' '}
                        {consentStatus === 'analytics' ? 'Analytics allowed' : 'Essential only'}
                      </Box>
                    )}
                  </Typography>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-start' }}>
                <Button onClick={setAnalyticsConsent} variant="contained" size="small">
                  Allow analytics
                </Button>
                <Button onClick={setEssentialOnly} size="small">
                  Essential only
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Fade>
      </TrapFocus>
    </Portal>
  );
}

function updateGoogleConsent(hasAnalytics: boolean) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: hasAnalytics ? 'granted' : 'denied',
    });

    // Initialize Apollo when analytics consent is granted
    const win = window as typeof window & { initApollo?: () => void };
    if (hasAnalytics && typeof win.initApollo === 'function') {
      win.initApollo();
    }
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [consentStatus, setConsentStatus] = useLocalStorageState(COOKIE_CONSENT_KEY, null);
  const doNotTrack = useDoNotTrack();
  const [preferencesRequested, setPreferencesRequested] = React.useState(false);

  React.useEffect(() => {
    const handleHashChange = () => {
      setPreferencesRequested(window.location.hash === COOKIE_PREFERENCES_HASH);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    Router.events.on('hashChangeComplete', handleHashChange);
    Router.events.on('routeChangeComplete', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      Router.events.off('hashChangeComplete', handleHashChange);
      Router.events.off('routeChangeComplete', handleHashChange);
    };
  }, []);

  const closePreferences = React.useCallback(() => {
    setPreferencesRequested(false);
    if (window.location.hash === COOKIE_PREFERENCES_HASH) {
      window.history.replaceState(
        window.history.state,
        '',
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  // Respect Do Not Track - don't show dialog and treat as essential only
  const needsConsent = (consentStatus === null || preferencesRequested) && !doNotTrack;

  // Update Google consent when status changes or on mount if already set
  React.useEffect(() => {
    if (doNotTrack) {
      // DNT is enabled - always deny analytics
      updateGoogleConsent(false);
    } else if (consentStatus !== null) {
      updateGoogleConsent(consentStatus === 'analytics');
    }
  }, [consentStatus, doNotTrack]);

  const setAnalyticsConsent = React.useCallback(() => {
    setConsentStatus('analytics');
    closePreferences();
  }, [setConsentStatus, closePreferences]);

  const setEssentialOnly = React.useCallback(() => {
    setConsentStatus('essential');
    closePreferences();
  }, [setConsentStatus, closePreferences]);

  const contextValue = React.useMemo<AnalyticsContextValue>(
    () => ({
      consentStatus: doNotTrack ? 'essential' : (consentStatus as ConsentStatus),
      hasAnalyticsConsent: !doNotTrack && consentStatus === 'analytics',
      needsConsent,
      setAnalyticsConsent,
      setEssentialOnly,
    }),
    [consentStatus, doNotTrack, needsConsent, setAnalyticsConsent, setEssentialOnly],
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
      <BrandingCssThemeProvider>
        <CookieConsentDialog />
      </BrandingCssThemeProvider>
    </AnalyticsContext.Provider>
  );
}
