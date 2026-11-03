import { camelCase, upperFirst } from 'es-toolkit/string';
import type { Translate } from '../i18n';

export function pascalCase(str: string) {
  return upperFirst(camelCase(str));
}

function titleize(hyphenedString: string): string {
  return upperFirst(hyphenedString.split('-').join(' '));
}

export interface Page {
  pathname: string;
  query?: object;
  subheader?: string;
  title?: string | false;
}

export function pageToTitle(page: Page): string | null {
  if (page.title === false) {
    return null;
  }

  if (page.title) {
    return page.title;
  }

  const path = page.subheader || page.pathname;
  const name = path.replace(/.*\//, '').replace('react-', '').replace(/\..*/, '');

  // TODO remove post migration
  if (path.includes('/api-docs/')) {
    return pascalCase(name);
  }

  // TODO support more than React component API (PascalCase)
  if (path.includes('/api/')) {
    return name.startsWith('use') ? camelCase(name) : pascalCase(name);
  }

  return titleize(name);
}

export function pageToTitleI18n(page: Page, t: Translate): string | null {
  const path = page.subheader || page.pathname;
  return page.query
    ? pageToTitle(page)
    : t(`pages.${path}`, { ignoreWarning: true }) || pageToTitle(page);
}

/**
 * Get the value of a cookie
 * Source: https://vanillajstoolkit.com/helpers/getcookie/
 * @param name - The name of the cookie
 * @return The cookie value
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    throw new Error(
      'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.',
    );
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts[1].split(';').shift();
  }

  return undefined;
}

/**
 * as is a reference to Next.js's as, the path in the URL
 * pathname is a reference to Next.js's pathname, the name of page in the filesystem
 * https://nextjs.org/docs/api-reference/next/router
 *
 * @param pathname - The URL pathname
 * @param languages - List of supported language codes. Defaults to `['en']`.
 */
export function pathnameToLanguage(
  pathname: string,
  languages: string[] = ['en'],
): {
  userLanguage: string;
  canonicalAs: string;
  canonicalAsServer: string;
  canonicalPathname: string;
} {
  let userLanguage;
  const userLanguageCandidate = pathname.substring(1, 3);

  if (
    [...languages, 'zh'].includes(userLanguageCandidate) &&
    pathname.startsWith(`/${userLanguageCandidate}/`)
  ) {
    userLanguage = userLanguageCandidate;
  } else {
    userLanguage = 'en';
  }

  const canonicalAs = userLanguage === 'en' ? pathname : pathname.substring(3);
  // Remove hash as it's never sent to the server
  // https://github.com/vercel/next.js/issues/25202
  const canonicalAsServer = canonicalAs.replace(/#(.*)$/, '');

  let canonicalPathname = canonicalAsServer.replace(/^\/api/, '/api-docs');

  // Remove trailing slash as Next.js doesn't expect it here
  // https://nextjs.org/docs/pages/api-reference/functions/use-router#router-object
  if (canonicalPathname !== '/') {
    canonicalPathname = canonicalPathname.replace(/\/$/, '');
  }

  return {
    userLanguage,
    canonicalAs,
    canonicalAsServer,
    canonicalPathname,
  };
}
