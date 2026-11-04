import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { LinkProps as NextLinkProps } from 'next/link';
import NextLink from 'next/link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import MuiLink from '@mui/material/Link';

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

    return <NextLink href={to} as={linkAs} ref={ref} {...other} />;
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

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const linkAs = linkAsProp || as || (href as string);
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
