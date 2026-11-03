import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import MuiLink from '@mui/material/Link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { useUserLanguage } from '../i18n';
import { useDocsConfig } from '../DocsProvider';

/**
 * File to keep in sync with:
 *
 * - /packages/mui-docs/src/Link/Link.tsx
 * - /examples/material-ui-nextjs-pages-router/src/Link.js
 * - /examples/material-ui-nextjs-pages-router-ts/src/Link.tsx
 * - /examples/material-ui-nextjs-ts-v4-v5-migration/src/Link.tsx
 */

interface NextLinkComposedProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    const { to, linkAs, ...other } = props;

    return <NextLink href={to} as={linkAs} data-no-markdown-link="true" ref={ref} {...other} />;
  },
);

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = 'active',
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    noLinkStyle,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href?.pathname;
  const routerPathname = router.pathname.replace('/[docsTab]', '');

  const className = clsx(classNameProps, {
    [activeClassName]: routerPathname === pathname && activeClassName,
  });

  const userLanguage = useUserLanguage();

  const { LANGUAGES_IGNORE_PAGES } = useDocsConfig();

  let linkAs = linkAsProp || as || (href as string);
  if (
    userLanguage !== 'en' &&
    pathname &&
    pathname.startsWith('/') &&
    !LANGUAGES_IGNORE_PAGES(pathname) &&
    !pathname.startsWith(`/${userLanguage}/`)
  ) {
    linkAs = `/${userLanguage}${linkAs}`;
  }

  const nextjsProps = {
    to: href,
    linkAs,
  };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  );
});
