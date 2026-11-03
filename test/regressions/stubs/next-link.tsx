import * as React from 'react';

// Stub for `next/link`. Renders a plain anchor — visually equivalent to the
// Next.js Link for Argos purposes (link text + styling captured).
//
// `href` widens past the plain-anchor `string | undefined` to accept
// Next.js's `UrlObject` shape, so we omit it from the base interface and
// redeclare it here.
interface UrlObject {
  pathname?: string;
  query?: Record<string, string> | string;
  hash?: string;
}

interface NextLinkStubProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string | UrlObject;
  /** Next's `as` is the URL actually shown in the address bar — prefer it. */
  as?: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
}

// Serialize a Next.js `UrlObject` into an `href` string the way Next does, so
// call sites that pass `{ pathname, query, hash }` (e.g. AppNavDrawer) still
// produce a correct anchor.
function urlObjectToHref({ pathname = '', query, hash }: UrlObject): string {
  let search = '';
  if (typeof query === 'string') {
    search = query ? `?${query}` : '';
  } else if (query) {
    const params = new URLSearchParams(query).toString();
    search = params ? `?${params}` : '';
  }
  let fragment = '';
  if (hash) {
    fragment = hash.startsWith('#') ? hash : `#${hash}`;
  }
  return `${pathname}${search}${fragment}`;
}

const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkStubProps>(function NextLink(
  {
    href,
    as,
    prefetch: _prefetch,
    replace: _replace,
    scroll: _scroll,
    shallow: _shallow,
    passHref: _passHref,
    locale: _locale,
    legacyBehavior: _legacyBehavior,
    children,
    ...rest
  },
  ref,
) {
  // `as` (when present) is the URL Next actually renders; otherwise derive it
  // from `href`, serializing the object form.
  const url = as ?? (typeof href === 'string' ? href : urlObjectToHref(href));
  return (
    <a href={url} ref={ref} {...rest}>
      {children}
    </a>
  );
});

export default NextLink;
