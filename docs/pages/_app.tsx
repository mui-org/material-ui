import 'docs/src/modules/components/bootstrap';
// --- Post bootstrap -----
import * as React from 'react';
import type { AdConfig } from '@mui/internal-core-docs/Ad';
import type { SandboxConfig } from '@mui/internal-core-docs/DemoContext';
import {
  DocsApp,
  printConsoleBanner,
  reportWebVitals as _reportWebVitals,
} from '@mui/internal-core-docs/DocsApp';
import type { DocsConfig, VersionEntry } from '@mui/internal-core-docs/DocsProvider';
import { DEFAULT_DOCS_CONFIG } from '@mui/internal-core-docs/DocsProvider';
import type { NotificationMessage } from '@mui/internal-core-docs/AppLayout';
import findActivePage from '@mui/internal-core-docs/findActivePage';
import { getProductInfoFromUrl } from '@mui/internal-core-docs/utils';
import type { Translations } from '@mui/internal-core-docs/i18n';
import type { MuiPage } from '@mui/internal-core-docs/MuiPage';
import type { ProductVersion } from '@mui/internal-core-docs/PageContext';
import materialPkgJson from '@mui/material/package.json';
import systemPkgJson from '@mui/system/package.json';
import { LicenseInfo } from '@mui/x-license';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import docsInfraPages from 'docs/data/docs-infra/pages';
import generalDocsPages from 'docs/data/docs/pages';
import materialPages from 'docs/data/material/pages';
import systemPages from 'docs/data/system/pages';
import {
  MuiLogomarkIcon,
  muiSvgLogomarkString,
  muiSvgLogotypeString,
} from '@mui/internal-core-docs/svgIcons';

import { fontClasses as _fontClasses } from '@mui/internal-core-docs/nextFonts';
import versionsJson from '../versions.json';
import translationsJson from '../translations/translations.json';
import '../public/static/components-gallery/base-theme.css';
import './global.css';

// Workaround: turbopack's pages-router Custom App detection misfires when
// `_app.tsx` contains a re-export of an imported binding (either
// `export ... from`, or `import { x } from ...; export { x }`), causing
// the global CSS imports above to be rejected. Re-export as a fresh local
// binding to keep the file recognized as the Custom App.
// Related issue - https://github.com/vercel/next.js/issues/93162
export const fontClasses = _fontClasses;

// Remove the license warning from demonstration purposes
LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_LICENSE!);

printConsoleBanner();

// Translations and versions are static, so resolve them once at module scope and
// pass them straight to the page props. Doing this in `_app.getInitialProps`
// would opt every page out of Next.js Automatic Static Optimization.
const translations: Translations = { en: translationsJson };
const allVersions = versionsJson.versions;

const docsConfig: DocsConfig = {
  ...DEFAULT_DOCS_CONFIG,
  /**
   * The shape of these JSON files needs to be backward compatible.
   * They are used in past versions of the docs, and we don't want to break them by changing the structure.
   * If any change is needed, it should be made in a way that doesn't break the existing structure, or we should
   * update older domains to be compatible with the new structure.
   */
  ...(process.env.NODE_ENV !== 'production' && {
    fetchNotifications: (): Promise<NotificationMessage[]> =>
      import('../notifications.json').then((mod) => mod.default),
  }),
  ...(process.env.NODE_ENV !== 'production' && {
    fetchVersions: (): Promise<VersionEntry[]> =>
      import('../versions.json').then((mod) => mod.default.versions),
  }),
  hostUrl: process.env.PULL_REQUEST_ID
    ? `https://deploy-preview-${process.env.PULL_REQUEST_ID}--${process.env.NETLIFY_SITE_NAME}.netlify.app`
    : 'https://mui.com',
};

function useVersions(initialVersions: VersionEntry[]): VersionEntry[] {
  const [versions, setVersions] = React.useState<VersionEntry[]>(initialVersions);
  React.useEffect(() => {
    docsConfig.fetchVersions?.().then(setVersions);
  }, []);
  return versions;
}

function getVersionedProductPath(version: string, productId: string): string {
  const versionNumber = parseInt(version.replace('v', ''), 10);
  if (productId === 'material-ui') {
    if (versionNumber >= 6) {
      return '/material-ui/getting-started/';
    }
    if (versionNumber >= 4) {
      return '/getting-started/installation/';
    }
  }
  if (productId === 'system') {
    if (versionNumber >= 5) {
      return '/system/getting-started/';
    }
    if (versionNumber === 4) {
      return '/system/basics/';
    }
  }
  return '/';
}

function buildProductVersions(
  fetchedVersions: VersionEntry[],
  productId: string,
  currentVersion: string,
): ProductVersion[] {
  // Before the fetch resolves, show just the current version with no dropdown.
  if (fetchedVersions.length === 0) {
    return [{ text: currentVersion, current: true }];
  }

  const MIN_VERSION = 4;
  const versions: ProductVersion[] = fetchedVersions
    .filter((v) => {
      const vNum = parseInt(v.version.replace('v', ''), 10);
      return vNum >= MIN_VERSION;
    })
    .map((v) => {
      if (v.url === 'https://next.mui.com') {
        return { text: currentVersion, current: true };
      }
      const productPath = getVersionedProductPath(v.version, productId);
      return { text: v.version, href: `${v.url}${productPath}` };
    });

  versions.push({
    text: 'View all versions',
    href: `/material-ui/getting-started/versions/`,
  });

  return versions;
}

/**
 * Generates root index template for Material UI demos.
 */
function getMaterialRootIndex(codeVariant: string) {
  const type = codeVariant === 'TS' ? '!' : '';
  return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`;
}

function useProductData(pageProps: { versions: VersionEntry[] }) {
  const router = useRouter();
  // TODO move productId & productCategoryId resolution to page layout.
  // We should use the productId field from the markdown and fallback to getProductInfoFromUrl()
  // if not present
  const { productId, productCategoryId } = getProductInfoFromUrl(router.asPath);
  const fetchedVersions = useVersions(pageProps.versions);

  const productIdentifier = React.useMemo(() => {
    if (productId === 'material-ui') {
      return {
        metadata: '',
        name: 'Material UI',
        logo: MuiLogomarkIcon,
        logoSvg: muiSvgLogomarkString,
        wordmarkSvg: muiSvgLogotypeString,
        versions: buildProductVersions(
          fetchedVersions,
          'material-ui',
          `v${materialPkgJson.version}`,
        ),
      };
    }

    if (productId === 'system') {
      return {
        metadata: '',
        name: 'MUI System',
        logo: MuiLogomarkIcon,
        logoSvg: muiSvgLogomarkString,
        wordmarkSvg: muiSvgLogotypeString,
        versions: buildProductVersions(fetchedVersions, 'system', `v${systemPkgJson.version}`),
      };
    }

    // TODO: 'core' is a productCategoryId, not a productId — this branch may be dead code.
    if ((productId as string) === 'core') {
      return {
        metadata: '',
        name: 'MUI Core',
        logo: MuiLogomarkIcon,
        logoSvg: muiSvgLogomarkString,
        wordmarkSvg: muiSvgLogotypeString,
        versions: buildProductVersions(
          fetchedVersions,
          'material-ui',
          `v${materialPkgJson.version}`,
        ),
      };
    }

    if (productId === 'docs-infra') {
      return {
        metadata: '',
        name: 'Docs-infra',
        logo: MuiLogomarkIcon,
        logoSvg: muiSvgLogomarkString,
        wordmarkSvg: muiSvgLogotypeString,
        versions: [
          {
            text: 'v0.0.0',
            href: `https://mui.com/versions/`,
          },
        ],
      };
    }

    if (productId === 'docs') {
      return {
        metadata: '',
        name: 'Home docs',
        logo: MuiLogomarkIcon,
        logoSvg: muiSvgLogomarkString,
        wordmarkSvg: muiSvgLogotypeString,
        versions: [
          {
            text: 'v0.0.0',
            href: `https://mui.com/versions/`,
          },
        ],
      };
    }

    return null;
  }, [productId, fetchedVersions]);

  return React.useMemo(() => {
    let pages: MuiPage[] = generalDocsPages as MuiPage[];
    if (productId === 'material-ui') {
      pages = materialPages as MuiPage[];
    } else if (productId === 'system') {
      pages = systemPages as MuiPage[];
    } else if (productId === 'docs-infra') {
      pages = docsInfraPages as MuiPage[];
    }

    const { activePage, activePageParents } = findActivePage(pages, router.pathname);

    return {
      activePage,
      activePageParents,
      pages,
      productIdentifier: productIdentifier!,
      productId,
      productCategoryId,
    };
  }, [productId, productCategoryId, productIdentifier, router.pathname]);
}

const CSB_CONFIG: SandboxConfig = {
  primaryPackage: '@mui/material',
  fallbackDependency: { name: '@mui/material', version: 'latest' },
  getRootIndex: getMaterialRootIndex,
};

const GA_AD_CONFIG: AdConfig = { GADisplayRatio: 0.1 };

function useDemoDisplayName() {
  const router = useRouter();
  const { productId } = React.useMemo(() => getProductInfoFromUrl(router.asPath), [router.asPath]);
  return React.useMemo(() => {
    if (productId === 'system') {
      return 'MUI System';
    }
    if (productId?.startsWith('x-')) {
      return 'MUI X';
    }
    return 'Material UI';
  }, [productId]);
}

export default function MyApp(props: AppProps) {
  const { Component } = props;
  const pageProps = React.useMemo(
    () => ({
      userLanguage: 'en',
      translations,
      versions: allVersions,
      ...props.pageProps,
    }),
    [props.pageProps],
  );
  const {
    activePage,
    activePageParents,
    pages: pageList,
    productIdentifier,
    productId,
    productCategoryId,
  } = useProductData(pageProps);
  const demoDisplayName = useDemoDisplayName();

  return (
    <DocsApp
      {...props}
      Component={Component}
      pageProps={pageProps}
      adConfig={GA_AD_CONFIG}
      activePage={activePage}
      activePageParents={activePageParents}
      pageList={pageList}
      productIdentifier={productIdentifier}
      productId={productId}
      productCategoryId={productCategoryId}
      demoDisplayName={demoDisplayName}
      csbConfig={CSB_CONFIG}
      docsConfig={docsConfig}
    />
  );
}

// See note above about turbopack re-export detection — wrap rather than
// `export { reportWebVitals }` so _app.tsx stays the Custom App.
export const reportWebVitals: typeof _reportWebVitals = (...args) => _reportWebVitals(...args);
