import * as React from 'react';
import Script from 'next/script';
import { Html, Head, Main, NextScript } from 'next/document';
import GlobalStyles from '@mui/material/GlobalStyles';
import MuiInitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { getMetaThemeColor } from '../branding';
import { fontClasses } from '../nextFonts';

export type DocumentProps = {
  canonicalAsServer: string;
  analytics: {
    google: string;
    apollo: string;
  };
  userLanguage: string;
  children?: React.ReactNode;
};

export function Document({ canonicalAsServer, userLanguage, analytics, children }: DocumentProps) {
  return (
    <Html lang={userLanguage} data-mui-color-scheme="light">
      <Head>
        {/*
            manifest.json provides metadata used when your web app is added to the
            homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
          */}
        <link rel="manifest" href="/static/manifest.json" />
        {/* PWA primary color */}
        <meta
          name="theme-color"
          content={getMetaThemeColor('light')}
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content={getMetaThemeColor('dark')}
          media="(prefers-color-scheme: dark)"
        />
        {/* Based on https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs */}
        <link rel="icon" href="/static/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        {/* SEO */}
        <link
          rel="canonical"
          href={`https://mui.com${
            userLanguage === 'en' ? '' : `/${userLanguage}`
          }${canonicalAsServer}`}
        />
        <link rel="alternate" href={`https://mui.com${canonicalAsServer}`} hrefLang="x-default" />
        <GlobalStyles
          styles={{
            // First SSR paint
            '.only-light-mode': {
              display: 'block',
            },
            '.only-dark-mode': {
              display: 'none',
            },
            // Post SSR Hydration
            '.mode-dark .only-light-mode': {
              display: 'none',
            },
            '.mode-dark .only-dark-mode': {
              display: 'block',
            },
            // TODO migrate to .only-dark-mode to .only-dark-mode-v2
            '[data-mui-color-scheme="light"] .only-dark-mode-v2': {
              display: 'none',
            },
            '[data-mui-color-scheme="dark"] .only-light-mode-v2': {
              display: 'none',
            },
            '.plan-pro, .plan-premium': {
              display: 'inline-block',
              height: '0.9em',
              width: '1em',
              verticalAlign: 'middle',
              marginLeft: '0.3em',
              marginBottom: '0.08em',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              flexShrink: 0,
            },
            '.plan-pro': {
              backgroundImage: 'url(/static/x/pro.svg)',
            },
            '.plan-premium': {
              backgroundImage: 'url(/static/x/premium.svg)',
            },
          }}
        />
      </Head>
      <body className={fontClasses}>
        <MuiInitColorSchemeScript defaultMode="system" />
        {children}
        <Main />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;

${/* Set default consent to denied (Google Consent Mode v2) */ ''}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);

gtag('js', new Date());
gtag('config', '${analytics.google}', {
  send_page_view: false,
});

${/* Apollo initialization - called by AnalyticsProvider when consent is granted */ ''}
window.initApollo = function() {
  if (window.apolloInitialized) return;
  window.apolloInitialized = true;
  var n = Math.random().toString(36).substring(7),
    o = document.createElement('script');
  o.src = 'https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=' + n;
  o.async = true;
  o.defer = true;
  o.onload = function () {
    window.trackingFunctions.onLoad({ appId: '${analytics.apollo}' });
  };
  document.head.appendChild(o);
};

${/* Check localStorage for existing consent and initialize if already granted */ ''}
(function() {
  try {
    var consent = localStorage.getItem('docs-cookie-consent');
    if (consent === 'analytics') {
      window.initApollo();
    }
  } catch (e) {}
})();
`,
          }}
        />
        {/**
         * A better alternative to <script async>, to delay its execution
         * https://developer.chrome.com/blog/script-component/
         */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${analytics.google}`}
        />
        <NextScript />
      </body>
    </Html>
  );
}
