/* eslint-disable react/no-danger */
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { throttle } from 'es-toolkit/function';

import { DiamondSponsors } from '../AppLayout/navigation/DiamondSponsors';
import { SideNavigationBanner } from '../AppLayout/navigation/SideNavigationBanner';
import { useTranslate } from '../i18n';
import { samePageLinkNavigation } from '../Link';
import { MiniTableOfContents } from './MiniTableOfContents';
import { NavItem, TableOfContents, TOC_WIDTH } from './TableOfContents';
import type { TocItem } from './TableOfContents';

const Nav = styled('nav', {
  shouldForwardProp: (prop) => prop !== 'wideLayout',
})<{ wideLayout?: boolean }>(({ theme }) => ({
  top: 'var(--MuiDocs-header-height)',
  marginTop: 'var(--MuiDocs-header-height)',
  paddingLeft: 6, // Fix truncated focus outline style
  position: 'sticky',
  height: 'calc(100vh - var(--MuiDocs-header-height))',
  overflowY: 'auto',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(7),
  paddingRight: theme.spacing(4), // We can't use `padding` as @mui/stylis-plugin-rtl doesn't swap it
  display: 'none',
  scrollbarWidth: 'thin',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
  variants: [
    {
      props: { wideLayout: true },
      style: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
        [`@media (min-width:${theme.breakpoints.values.xl + TOC_WIDTH}px)`]: {
          display: 'block',
        },
      },
    },
  ],
}));

function useThrottledOnScroll(callback: (() => void) | null, delay: number) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : null),
    [callback, delay],
  );

  React.useEffect(() => {
    if (throttledCallback === null) {
      return undefined;
    }

    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

function flatten(headings: TocItem[]): TocItem[] {
  const itemsWithNode: TocItem[] = [];

  headings.forEach((item) => {
    itemsWithNode.push(item);

    if (item.children.length > 0) {
      item.children.forEach((subitem) => {
        itemsWithNode.push(subitem);
      });
    }
  });
  return itemsWithNode;
}

export interface AppTableOfContentsProps {
  toc: TocItem[];
  wideLayout?: boolean;
}

export function AppTableOfContents(props: AppTableOfContentsProps) {
  const { toc, wideLayout } = props;
  const t = useTranslate();

  const items = React.useMemo(() => flatten(toc), [toc]);
  const [activeState, setActiveState] = React.useState<string | null>(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const findActiveIndex = React.useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active: TocItem | { hash: null } | undefined;

    // No hash if we're near the top of the page
    if (document.documentElement.scrollTop < 200) {
      active = { hash: null };
    }
    // If scrolled to bottom, activate the last item
    else if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight - 50
    ) {
      active = items[items.length - 1];
    } else {
      for (let i = items.length - 1; i >= 0; i -= 1) {
        const item = items[i];
        const node = document.getElementById(item.hash);

        if (process.env.NODE_ENV !== 'production') {
          if (!node) {
            console.error(`Missing node on the item ${JSON.stringify(item, null, 2)}`);
          }
        }

        if (
          node &&
          node.offsetTop <
            document.documentElement.scrollTop + document.documentElement.clientHeight / 8
        ) {
          active = item;
          break;
        }
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, items]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(items.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash: string) => (event: React.MouseEvent) => {
    // Ignore click events meant for native link handling, for example open in new tab
    if (samePageLinkNavigation(event.nativeEvent)) {
      return;
    }

    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  React.useEffect(
    () => () => {
      if (unsetClickedRef.current) {
        clearTimeout(unsetClickedRef.current);
      }
    },
    [],
  );

  const itemLink = (item: TocItem, level: number, onLinkClick?: () => void) => (
    <NavItem
      href={`#${item.hash}`}
      underline="none"
      onClick={(event: React.MouseEvent) => {
        handleClick(item.hash)(event);
        if (onLinkClick) {
          onLinkClick();
        }
      }}
      active={activeState === item.hash}
      level={level}
    >
      <span dangerouslySetInnerHTML={{ __html: item.text }} />
    </NavItem>
  );

  return (
    <React.Fragment>
      <Nav aria-label={t('pageTOC')} wideLayout={wideLayout}>
        <TableOfContents toc={toc} itemLink={itemLink} />
        <Stack spacing={1} sx={{ mt: 2 }}>
          <DiamondSponsors />
          <SideNavigationBanner />
        </Stack>
      </Nav>
      <MiniTableOfContents
        toc={toc}
        activeState={activeState}
        itemLink={itemLink}
        onItemClick={handleClick}
        wideLayout={wideLayout}
      />
    </React.Fragment>
  );
}
