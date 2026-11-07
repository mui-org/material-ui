import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import NextHead from 'next/head';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { LicenseInfo } from '@mui/x-license';
import materialPkgJson from '@mui/material/package.json';
import joyPkgJson from '@mui/joy/package.json';
import systemPkgJson from '@mui/system/package.json';
import generalDocsPages from 'docs/data/docs/pages';
import docsInfraPages from 'docs/data/docs-infra/pages';
import materialPages from 'docs/data/material/pages';
import joyPages from 'docs/data/joy/pages';
import systemPages from 'docs/data/system/pages';
import PageContext from 'docs/src/modules/components/PageContext';
import GoogleAnalytics from 'docs/src/modules/components/GoogleAnalytics';
import { CodeCopyProvider } from '@mui/docs/CodeCopy';
import { ThemeProvider } from 'docs/src/modules/components/ThemeContext';
import { CodeVariantProvider } from 'docs/src/modules/utils/codeVariant';
import DocsStyledEngineProvider from 'docs/src/modules/utils/StyledEngineProvider';
import createEmotionCache from 'docs/src/createEmotionCache';
import findActivePage from 'docs/src/modules/utils/findActivePage';
import getProductInfoFromUrl from 'docs/src/modules/utils/getProductInfoFromUrl';
import { DocsProvider } from '@mui/docs/DocsProvider';
import { mapTranslations } from '@mui/docs/i18n';
import SvgMuiLogomark, {
  muiSvgLogoString,
  muiSvgWordmarkString,
} from 'docs/src/icons/SvgMuiLogomark';
import './global.css';
import '../public/static/components-gallery/base-theme.css';
import { Inter, Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import * as config from '../config';

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

const generalSans = localFont({
  declarations: [{ prop: 'font-family', value: 'General Sans' }],
  src: [
    { path: '../public/static/fonts/GeneralSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/static/fonts/GeneralSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/static/fonts/GeneralSans-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../public/static/fonts/GeneralSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

const ibmPlexSans = localFont({
  declarations: [{ prop: 'font-family', value: 'IBM Plex Sans' }],
  src: [
    { path: '../public/static/fonts/IBMPlexSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/static/fonts/IBMPlexSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/static/fonts/IBMPlexSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../public/static/fonts/IBMPlexSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fontClasses = `${inter.className} ${roboto.className} ${generalSans.className} ${ibmPlexSans.className}`;

// Remove the license warning from demonstration purposes
LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

let reloadInterval;

// Avoid infinite loop when "Upload on reload" is set in the Chrome sw dev tools.
function lazyReload() {
  clearInterval(reloadInterval);
  reloadInterval = setInterval(() => {
    if (document.hasFocus()) {
      window.location.reload();
    }
  }, 100);
}

// Inspired by
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
function forcePageReload(registration) {
  // console.log('already controlled?', Boolean(navigator.serviceWorker.controller));

  if (!navigator.serviceWorker.controller) {
    // The window client isn't currently controlled so it's a new service
    // worker that will activate immediately.
    return;
  }

  // console.log('registration waiting?', Boolean(registration.waiting));
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    registration.waiting.postMessage('skipWaiting');
    return;
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', (event) => {
      // console.log('statechange', event.target.state);
      if (event.target.state === 'installed' && registration.waiting) {
        // A new service worker is available, inform the user
        registration.waiting.postMessage('skipWaiting');
      } else if (event.target.state === 'activated') {
        // Force the control of the page by the activated service worker.
        lazyReload();
      }
    });
  }

  if (registration.installing) {
    listenInstalledStateChange();
    return;
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
}

async function registerServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    process.env.NODE_ENV === 'production' &&
    window.location.host.includes('mui.com')
  ) {
    // register() automatically attempts to refresh the sw.js.
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Force the page reload for users.
    forcePageReload(registration);
  }
}

let dependenciesLoaded = false;

function loadDependencies() {
  if (dependenciesLoaded) {
    return;
  }

  dependenciesLoaded = true;

  loadCSS(
    'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Two+Tone',
    document.querySelector('#material-icon-font'),
  );
}

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-console
  console.log(
    `%c

███╗   ███╗ ██╗   ██╗ ██████╗
████╗ ████║ ██║   ██║   ██╔═╝
██╔████╔██║ ██║   ██║   ██║
██║╚██╔╝██║ ██║   ██║   ██║
██║ ╚═╝ ██║ ╚██████╔╝ ██████╗
╚═╝     ╚═╝  ╚═════╝  ╚═════╝

Tip: you can access the documentation \`theme\` object directly in the console.
`,
    'font-family:monospace;color:#1976d2;font-size:12px;',
  );
}
function AppWrapper(props) {
  const { children, emotionCache, pageProps } = props;

  const router = useRouter();
  // TODO move productId & productCategoryId resolution to page layout.
  // We should use the productId field from the markdown and fallback to getProductInfoFromUrl()
  // if not present
  const { productId, productCategoryId } = getProductInfoFromUrl(router.asPath);

  React.useEffect(() => {
    loadDependencies();
    registerServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const productIdentifier = React.useMemo(() => {
    const languagePrefix = pageProps.userLanguage === 'en' ? '' : `/${pageProps.userLanguage}`;

    if (productId === 'material-ui') {
      return {
        metadata: '',
        name: 'Material UI',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${materialPkgJson.version}`, current: true },
          {
            text: 'v6',
            href: `https://v6.mui.com${languagePrefix}/material-ui/getting-started/`,
          },
          {
            text: 'v5',
            href: `https://v5.mui.com${languagePrefix}/getting-started/installation/`,
          },
          {
            text: 'v4',
            href: `https://v4.mui.com${languagePrefix}/getting-started/installation/`,
          },
          {
            text: 'View all versions',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'joy-ui') {
      return {
        metadata: '',
        name: 'Joy UI',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [{ text: `v${joyPkgJson.version}`, current: true }],
      };
    }

    if (productId === 'system') {
      return {
        metadata: '',
        name: 'MUI System',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${systemPkgJson.version}`, current: true },
          { text: 'v6', href: `https://v6.mui.com${languagePrefix}/system/getting-started/` },
          { text: 'v5', href: `https://v5.mui.com${languagePrefix}/system/getting-started/` },
          { text: 'v4', href: `https://v4.mui.com${languagePrefix}/system/basics/` },
          {
            text: 'View all versions',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'core') {
      return {
        metadata: '',
        name: 'MUI Core',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          { text: `v${materialPkgJson.version}`, current: true },
          {
            text: 'View all versions',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'docs-infra') {
      return {
        metadata: '',
        name: 'Docs-infra',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          {
            text: 'v0.0.0',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    if (productId === 'docs') {
      return {
        metadata: '',
        name: 'Home docs',
        logo: SvgMuiLogomark,
        logoSvg: muiSvgLogoString,
        wordmarkSvg: muiSvgWordmarkString,
        versions: [
          {
            text: 'v0.0.0',
            href: `https://mui.com${languagePrefix}/versions/`,
          },
        ],
      };
    }

    return null;
  }, [pageProps.userLanguage, productId]);

  const pageContextValue = React.useMemo(() => {
    let pages = generalDocsPages;
    if (productId === 'material-ui') {
      pages = materialPages;
    } else if (productId === 'joy-ui') {
      pages = joyPages;
    } else if (productId === 'system') {
      pages = systemPages;
    } else if (productId === 'docs-infra') {
      pages = docsInfraPages;
    }

    const { activePage, activePageParents } = findActivePage(pages, router.pathname);

    return {
      activePage,
      activePageParents,
      pages,
      productIdentifier,
      productId,
      productCategoryId,
    };
  }, [productId, productCategoryId, productIdentifier, router.pathname]);

  return (
    <React.Fragment>
      <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="mui:productId" content={productId} />
        <meta name="mui:productCategoryId" content={productCategoryId} />
      </NextHead>
      <DocsProvider
        config={config}
        adConfig={{ GADisplayRatio: 0.1 }}
        defaultUserLanguage={pageProps.userLanguage}
        translations={pageProps.translations}
      >
        <CodeCopyProvider>
          <CodeVariantProvider>
            <PageContext.Provider value={pageContextValue}>
              <ThemeProvider>
                <DocsStyledEngineProvider cacheLtr={emotionCache}>
                  {children}
                  <GoogleAnalytics />
                </DocsStyledEngineProvider>
              </ThemeProvider>
            </PageContext.Provider>
          </CodeVariantProvider>
        </CodeCopyProvider>
      </DocsProvider>
    </React.Fragment>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  emotionCache: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppWrapper emotionCache={emotionCache} pageProps={pageProps}>
      {getLayout(<Component {...pageProps} />)}
    </AppWrapper>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  let pageProps = {};

  const req = require.context('docs/translations', false, /\.\/translations.*\.json$/);
  const translations = mapTranslations(req);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps: {
      userLanguage: ctx.query.userLanguage || 'en',
      translations,
      ...pageProps,
    },
  };
};

// Track fraction of actual events to prevent exceeding event quota.
// Filter sessions instead of individual events so that we can track multiple metrics per device.
// See https://github.com/GoogleChromeLabs/web-vitals-report to use this data
const disableWebVitalsReporting = Math.random() > 0.0001;
export function reportWebVitals({ id, name, label, delta, value }) {
  if (disableWebVitalsReporting) {
    return;
  }

  window.gtag('event', name, {
    value: delta,
    metric_label: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    metric_value: value,
    metric_delta: delta,
    metric_id: id, // id unique to current page load
  });
}
