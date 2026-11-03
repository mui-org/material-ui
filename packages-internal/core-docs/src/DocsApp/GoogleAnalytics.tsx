import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { useNoSsrCodeVariant } from '../codeVariant';
import { useUserLanguage } from '../i18n';
import { pathnameToLanguage } from '../helpers';
import { ThemeOptionsContext } from '../ThemeContext';

// So we can write code like:
//
// <Button
//   data-ga-event-category="demo"
//   data-ga-event-action="expand"
// >
//   Foo
// </Button>
function handleClick(event: PointerEvent) {
  let el = event.target;

  while (el && el !== document) {
    const element = el as HTMLElement;
    const category = element.getAttribute('data-ga-event-category');

    // We reach a tracking element, no need to look higher in the dom tree.
    if (category) {
      const split = parseFloat(element.getAttribute('data-ga-event-split') || '');

      if (split && split < Math.random()) {
        return;
      }

      window.gtag('event', category, {
        eventAction: element.getAttribute('data-ga-event-action'),
        eventLabel: element.getAttribute('data-ga-event-label'),
      });
      break;
    }

    el = element.parentElement;
  }
}

let boundDataGaListener = false;

/**
 * basically just a `useAnalytics` hook.
 * However, it needs the redux store which is created
 * in the same component this "hook" is used.
 */
function GoogleAnalytics() {
  React.useEffect(() => {
    if (!boundDataGaListener) {
      boundDataGaListener = true;
      document.addEventListener('click', handleClick);
    }
  }, []);
  const router = useRouter();
  const timeout = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    // Wait for the title to be updated.
    // React fires useEffect twice in dev mode
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      const { canonicalAsServer } = pathnameToLanguage(window.location.pathname);

      // https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag
      const productIdMeta = document.querySelector(
        'meta[name="mui:productId"]',
      ) as HTMLMetaElement | null;
      const productCategoryIdMeta = document.querySelector(
        'meta[name="mui:productCategoryId"]',
      ) as HTMLMetaElement | null;
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: canonicalAsServer,
        productId: productIdMeta?.content,
        productCategoryId: productCategoryIdMeta?.content,
      });
    });
  }, [router.route]);

  const codeVariant = useNoSsrCodeVariant();
  React.useEffect(() => {
    window.gtag('set', 'user_properties', {
      codeVariant,
    });
  }, [codeVariant]);

  const userLanguage = useUserLanguage();
  React.useEffect(() => {
    window.gtag('set', 'user_properties', {
      userLanguage,
    });
  }, [userLanguage]);

  React.useEffect(() => {
    /**
     * Based on https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#Monitoring_screen_resolution_or_zoom_level_changes
     * Adjusted to track 3 or more different ratios
     */
    function trackDevicePixelRation() {
      const devicePixelRatio = Math.round(window.devicePixelRatio * 10) / 10;
      window.gtag('set', 'user_properties', {
        devicePixelRatio,
      });
    }

    trackDevicePixelRation();

    /**
     * @type {MediaQueryList}
     */
    const matchMedia = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
    // Intentionally use deprecated listener methods to support iOS & old browsers
    matchMedia.addListener(trackDevicePixelRation);
    return () => {
      matchMedia.removeListener(trackDevicePixelRation);
    };
  }, []);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const colorSchemeOS = prefersDarkMode ? 'dark' : 'light';

  const themeOptions = React.useContext(ThemeOptionsContext);
  const colorScheme = themeOptions.paletteMode;

  React.useEffect(() => {
    window.gtag('set', 'user_properties', {
      colorSchemeOS,
    });
  }, [colorSchemeOS]);

  React.useEffect(() => {
    window.gtag('set', 'user_properties', {
      colorScheme,
    });
  }, [colorScheme]);

  return null;
}

export default React.memo(GoogleAnalytics);
