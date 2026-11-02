import * as React from 'react';
import * as ReactDOM from 'react-dom';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import type { InternalDocSearchHit, StoredDocSearchHit } from '@docsearch/react';
import Chip from '@mui/material/Chip';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import GlobalStyles from '@mui/material/GlobalStyles';
import { alpha } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import { pathnameToLanguage } from '../../helpers';
import { Link } from '../../Link';
import { useTranslate, useUserLanguage } from '../../i18n';
import useLazyCSS from '../../useLazyCSS';
import PageContext from '../../PageContext';
import { useDocsConfig } from '../../DocsProvider';
import { SearchButton } from './SearchButton';
import { convertProductIdToName } from '../../utils/convertProductIdToName';

interface StartScreenItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface StartScreenCategory {
  category: { name: string };
  items: StartScreenItem[];
}

function NewStartScreen() {
  const startScreenOptions: StartScreenCategory[] = [
    {
      category: {
        name: 'Material UI',
      },
      items: [
        {
          name: 'Installation',
          href: '/material-ui/getting-started/installation/',
          icon: <DownloadRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Components',
          href: '/material-ui/getting-started/supported-components/',
          icon: <SmartButtonRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Example projects',
          href: '/material-ui/getting-started/example-projects/',
          icon: <LibraryBooksRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Templates',
          href: '/material-ui/getting-started/templates/',
          icon: <CollectionsBookmarkRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'MUI X',
      },
      items: [
        {
          name: 'Overview',
          href: '/x/introduction/',
          icon: <StickyNote2RoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Licensing',
          href: '/x/introduction/licensing/',
          icon: <CopyrightRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'What is new in MUI X',
          href: '/x/whats-new/',
          icon: <NewspaperRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'Toolpad',
      },
      items: [
        {
          name: 'Overview',
          href: '/toolpad/studio/getting-started/',
          icon: <StickyNote2RoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Why Toolpad?',
          href: '/toolpad/studio/getting-started/why-toolpad/',
          icon: <ChecklistRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Example applications',
          href: '/toolpad/studio/examples/',
          icon: <LibraryBooksRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
    {
      category: {
        name: 'MUI System',
      },
      items: [
        {
          name: 'Overview',
          href: '/system/getting-started/',
          icon: <StickyNote2RoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
        {
          name: 'Usage',
          href: '/system/getting-started/usage/',
          icon: (
            <IntegrationInstructionsRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />
          ),
        },
        {
          name: 'The sx prop',
          href: '/system/getting-started/the-sx-prop/',
          icon: <SettingsRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
        },
      ],
    },
  ];
  return (
    <div className="DocSearch-NewStartScreen">
      {startScreenOptions.map(({ category, items }) => (
        <div key={category.name} className="DocSearch-NewStartScreenCategory">
          <div className="DocSearch-NewStartScreenTitle">{category.name}</div>
          {items.map(({ name, icon, href }) => (
            <NextLink key={name} href={href} className="DocSearch-NewStartScreenItem">
              {icon}
              {name}
            </NextLink>
          ))}
        </div>
      ))}
    </div>
  );
}

interface CustomDocSearchHit {
  pathname?: string;
  as?: string;
  userLanguage?: string;
  productId?: string;
  productCategoryId?: string;
  url: string;
}

function getDisplayTag(hit: CustomDocSearchHit) {
  if (hit.productId === undefined || hit.productCategoryId === undefined) {
    return null;
  }

  const productName = convertProductIdToName({
    productId: hit.productId!,
    productCategoryId: hit.productCategoryId!,
  });

  if (!productName) {
    console.error(
      `getDisplayTag missing mapping for productId: ${hit.productId}, pathname: ${hit.pathname}.`,
    );
  }

  return <Chip label={productName} size="small" variant="outlined" sx={{ mr: 1 }} />;
}

interface DocSearchHitComponentProps {
  children: React.ReactNode;
  hit: (InternalDocSearchHit | StoredDocSearchHit) & CustomDocSearchHit;
}

function DocSearchHit(props: DocSearchHitComponentProps) {
  const { children, hit } = props;

  if (hit.pathname) {
    return (
      <Link
        href={hit.pathname}
        as={hit.as}
        sx={{ display: 'flex !important', '& .DocSearch-Hit-Container': { flex: 1, minWidth: 0 } }}
      >
        {children}
        {getDisplayTag(hit)}
      </Link>
    );
  }

  // DocSearch stores the old results in its cache
  // hit.pathname won't be defined for them.
  return <Link href={hit.url}>{children}</Link>;
}

// Stable no-op so callbacks passed to DocSearch keep the same identity across renders.
const noop = () => {};

const standaloneProducts = ['base-ui'];

export interface AppSearchProps {
  sx?: SxProps;
}

export function AppSearch(props: AppSearchProps) {
  useLazyCSS(
    'https://cdn.jsdelivr.net/npm/@docsearch/css@4.7.1/dist/style.min.css',
    '#app-search',
    { layer: 'docsearch' },
  );
  const FADE_DURATION = 120; // ms
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const { LANGUAGES_SSR } = useDocsConfig();
  const searchButtonRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState<string | undefined>(undefined);
  const [startScreenHost, setStartScreenHost] = React.useState<HTMLElement | null>(null);
  const facetFilterLanguage = LANGUAGES_SSR.includes(userLanguage)
    ? `language:${userLanguage}`
    : `language:en`;
  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const router = useRouter();
  const pageContext = React.useContext(PageContext);

  const keyboardNavigator = {
    navigate({ item }: { item: CustomDocSearchHit }) {
      const as = item.userLanguage !== 'en' ? `/${item.userLanguage}${item.as}` : item.as;
      router.push(item.pathname!, as);
    },
  };

  const onClose = React.useCallback(() => {
    const modal = document.querySelector<HTMLElement>('.DocSearch-Container');
    if (modal) {
      // fade out transition
      modal.style.opacity = '0';
    }
    setIsOpen(false); // DO NOT call setIsOpen inside a timeout (it causes scroll issue).
    // Reset the type-ahead seed so reopening (e.g. Cmd+K) starts from an empty query.
    setInitialQuery(undefined);
  }, [setIsOpen, setInitialQuery]);

  // v4's useDocSearchKeyboardEvents no longer opens the modal when the user types on the
  // focused search button (onInput/searchButtonRef are deprecated no-ops), so restore it here.
  const handleSearchButtonKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (/^[a-zA-Z0-9]$/.test(event.key) && !event.metaKey && !event.ctrlKey && !event.altKey) {
        // preventDefault stops the pressed key from also being typed into the modal
        // input once it mounts, which would duplicate the first character.
        event.preventDefault();
        setInitialQuery(event.key);
        setIsOpen(true);
      }
    },
    [setInitialQuery, setIsOpen],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    // MUI docs don't use the Ask AI feature, so it is always inactive.
    isAskAiActive: false,
    onAskAiToggle: noop,
  });

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const modal = document.querySelector<HTMLElement>('.DocSearch-Container');
    if (modal) {
      modal.style.opacity = '1';
    }

    // IMPORTANT: never call setState while the search input is being typed into. Re-rendering
    // DocSearchModal mid-keystroke makes React revert its controlled input, which breaks typing.
    // The start screen renders into this stable node, so reparenting it below is a plain DOM
    // move that React never re-renders through.
    const host = document.createElement('div');
    host.className = 'DocSearch-NewStartScreenHost';

    const updateStartScreenVisibility = () => {
      const input = document.querySelector<HTMLInputElement>('.DocSearch-Input');
      host.style.display = input && input.value !== '' ? 'none' : '';
    };

    // Host the start screen inside the dropdown so recent searches and the product links share
    // one fixed-height scroll container (as in v3) instead of stacking and growing the modal.
    // v4 only renders the dropdown when it has content, so fall back to the modal.
    const setup = () => {
      const parent =
        document.querySelector<HTMLElement>('.DocSearch-Dropdown') ??
        document.querySelector<HTMLElement>('.DocSearch-Modal');
      // Keep it last so the product links stay below the recent searches, which DocSearch
      // renders into the dropdown after we host ourselves there.
      if (parent && (host.parentElement !== parent || host.nextSibling !== null)) {
        parent.appendChild(host);
        // Same node every time, so React bails out instead of re-rendering on later moves.
        setStartScreenHost(host);
      }
      updateStartScreenVisibility();
    };
    setup();
    const observer = new MutationObserver(setup);
    observer.observe(document.body, { childList: true, subtree: true });

    // Capture-phase, so it runs before React handles the change but only reads/sets a style.
    document.addEventListener('input', updateStartScreenVisibility, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('input', updateStartScreenVisibility, true);
      host.remove();
      setStartScreenHost(null);
    };
  }, [isOpen]);

  const optionalFilters: string[] = [];
  if (pageContext.productId !== 'null') {
    optionalFilters.push(`productId:${pageContext.productId}`);
  } else if (pageContext.productCategoryId !== 'null') {
    optionalFilters.push(`productCategoryId:${pageContext.productCategoryId}`);
  }

  // Filter out stand-alone products unless we're on their subsections
  let filters: string | undefined;
  if (standaloneProducts.length > 0) {
    const filtersPredicates: string[] = [];
    for (let i = 0; i < standaloneProducts.length; i += 1) {
      if (pageContext.productId !== standaloneProducts[i]) {
        filtersPredicates.push(`NOT productId:${standaloneProducts[i]}`);
      }
    }
    filters = filtersPredicates.join(' AND ');
  }

  return (
    <React.Fragment>
      <SearchButton
        onRef={searchButtonRef}
        onClick={onOpen}
        onKeyDown={handleSearchButtonKeyDown}
        {...props}
      />
      {isOpen &&
        ReactDOM.createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            appId="TZGZ85B9TB"
            apiKey="8177dfb3e2be72b241ffb8c5abafa899"
            indexName={process.env.SEARCH_INDEX!}
            searchParameters={{
              facetFilters: ['version:master', facetFilterLanguage],
              filters,
              optionalFilters,
              attributesToRetrieve: [
                // Copied from https://github.com/algolia/docsearch/blob/ce0c865cd8767e961ce3088b3155fc982d4c2e2e/packages/docsearch-react/src/DocSearchModal.tsx#L231
                'hierarchy.lvl0',
                'hierarchy.lvl1',
                'hierarchy.lvl2',
                'hierarchy.lvl3',
                'hierarchy.lvl4',
                'hierarchy.lvl5',
                'content',
                'type',
                'url',
                // Extra
                'productId',
                'productCategoryId',
              ],
              analyticsTags: [facetFilterLanguage, `product:${pageContext.productId}`],
              hitsPerPage: 40,
            }}
            placeholder={`${t('algoliaSearch')}`}
            transformItems={(items) => {
              return items.map((item) => {
                // `url` contains the domain
                // but we want to link to the current domain e.g. deploy-preview-1--material-ui.netlify.app
                const parseUrl = document.createElement('a');
                parseUrl.href = item.url;

                const { canonicalAs, canonicalPathname } = pathnameToLanguage(
                  `${parseUrl.pathname}${parseUrl.hash}`,
                );

                return {
                  ...item,
                  pathname: canonicalPathname,
                  as: canonicalAs,
                  userLanguage,
                };
              });
            }}
            hitComponent={DocSearchHit}
            initialScrollY={typeof window !== 'undefined' ? window.scrollY : 0}
            onClose={onClose}
            // MUI docs don't use the Ask AI feature.
            onAskAiToggle={noop}
            navigator={keyboardNavigator}
          />,
          document.body,
        )}
      {isOpen &&
        startScreenHost?.isConnected &&
        ReactDOM.createPortal(<NewStartScreen />, startScreenHost)}
      <GlobalStyles
        styles={(theme) => ({
          html: {
            ':root': {
              '--docsearch-highlight-color': (theme.vars || theme).palette.primary[600],
              '--docsearch-text-color': (theme.vars || theme).palette.text.primary,
              '--docsearch-muted-color': (theme.vars || theme).palette.grey[600],
              // Keep the v4 muted icons/text (hit icon, no-results text, idle magnifier, screen
              // icons) on MUI's muted grey instead of Algolia's default purple-grey.
              '--docsearch-secondary-text-color': 'var(--docsearch-muted-color)',
              '--docsearch-icon-color': 'var(--docsearch-muted-color)',
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': theme.spacing(1.5),
              '--docsearch-hit-active-color': (theme.vars || theme).palette.primary[600],
              '--docsearch-logo-color': (theme.vars || theme).palette.grey[600],
              '--docsearch-searchbox-focus-background': 'unset',
              '--docsearch-footer-background': 'unset',
              '--docsearch-modal-background': (theme.vars || theme).palette.background.paper,
              '--docsearch-hit-height': '52px',
              // Height left for the scrollable area between the search bar and the footer. v4
              // dropped the search box from its own budget, which makes the modal overshoot
              // --docsearch-modal-height; subtract it again so the modal stays 600px.
              '--muidocs-docsearch-content-max-height':
                'calc(var(--docsearch-modal-height) - var(--docsearch-searchbox-height) - var(--docsearch-spacing) - var(--docsearch-footer-height))',
            },
          },
          body: {
            '.DocSearch-Container': {
              transition: `opacity ${FADE_DURATION}ms`,
              opacity: 0,
              zIndex: theme.zIndex.tooltip + 100,
              backgroundColor: alpha(theme.palette.grey[700], 0.5),
              backdropFilter: 'blur(2px)',
            },
            '& .DocSearch-StartScreen': {
              display: 'none',
            },
            '& .DocSearch-NewStartScreen': {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: theme.spacing(2),
              paddingBottom: theme.spacing(2),
            },
            // Only when there is no dropdown to host it: sit between the search bar and the
            // footer (see also DocSearch-Footer order) and take over the dropdown's padding,
            // height cap and scrolling.
            '& .DocSearch-Modal > .DocSearch-NewStartScreenHost': {
              order: 1,
              padding: theme.spacing(0, 1.5),
              maxHeight: 'var(--muidocs-docsearch-content-max-height)',
              overflowY: 'auto',
            },
            '& .DocSearch-NewStartScreenCategory': {
              display: 'flex',
              flexDirection: 'column',
            },
            '& .DocSearch-NewStartScreenTitle': {
              display: 'flex',
              alignItems: 'center',
              padding: theme.spacing(2, 3, 1.5, 2),
              fontSize: theme.typography.pxToRem(11),
              fontWeight: theme.typography.fontWeightBold,
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '& .DocSearch-NewStartScreenTitleIcon': {
              fontSize: theme.typography.pxToRem(18),
              color: (theme.vars || theme).palette.primary[500],
              marginRight: theme.spacing(1.5),
              opacity: 0.6,
              // Redefine SvgIcon-root style as ReactDOMServer.renderToStaticMarkup doesn't
              // Generate the CSS.
              // TODO v6: This hack should no longer be needed with static CSS rendering.
              userSelect: 'none',
              width: '1em',
              height: '1em',
              display: 'inline-block',
              flexShrink: 0,
              fill: 'currentColor',
            },
            '& .DocSearch-NewStartScreenItem': {
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              height: '42px',
              color: (theme.vars || theme).palette.primary[600],
              fontSize: theme.typography.pxToRem(14),
              fontWeight: theme.typography.fontWeightMedium,
              padding: theme.spacing(0.25, 0),
              paddingLeft: theme.spacing(2),
              border: '1px solid transparent',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.grey[50], 0.4),
              borderColor: alpha(theme.palette.grey[100], 0.5),
              marginBottom: theme.spacing(1),
              '&:hover, &:focus': {
                backgroundColor: (theme.vars || theme).palette.primary[50],
                borderColor: (theme.vars || theme).palette.primary[300],
              },
              '&:focus-visible': {
                outline: '3px solid',
                outlineColor: (theme.vars || theme).palette.primary[200],
                outlineOffset: 0,
              },
            },
            '& .DocSearch-Modal': {
              // docsearch.css: <= 750px will be full screen modal
              maxWidth: '640px',
              boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.2)}`,
              borderRadius: theme.shape.borderRadius,
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[300],
            },
            '& .DocSearch-SearchBar': {
              borderBottom: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              padding: theme.spacing(0.5, 1),
            },
            '& .DocSearch-Form': {
              // v4 form defaults to 12px 16px; drop the right padding so the "esc" chip sits
              // near the edge (v3 rendered the close button outside the form).
              padding: theme.spacing(1.5, 0, 1.5, 1.5),
              // v4 adds a form border-bottom; remove it as the divider lives on the search bar.
              borderBottom: 'none',
              '& .DocSearch-Clear': {
                display: 'none',
              },
              '& .DocSearch-Input': {
                paddingLeft: theme.spacing(2),
                fontSize: theme.typography.pxToRem(16),
                fontWeight: theme.typography.fontWeightMedium,
              },
              '& .DocSearch-Search-Icon': {
                width: '18px',
                height: '18px',
              },
              '& .DocSearch-VisuallyHiddenForAccessibility': {
                width: 0,
                visibility: 'hidden',
              },
            },
            // v4 adds a vertical divider before the close button; match the search bar borders.
            '& .DocSearch-Divider': {
              borderColor: (theme.vars || theme).palette.grey[200],
            },
            '& .DocSearch-Close': {
              display: 'block',
              alignSelf: 'center',
              cursor: 'pointer',
              height: '1.5rem',
              marginRight: theme.spacing(1),
              padding: theme.spacing(0.3, 0.8, 0.6, 0.8),
              fontSize: 0,
              borderRadius: 6,
              backgroundColor: (theme.vars || theme).palette.grey[50],
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              // v4's close button renders an X icon; hide it so only the "esc" chip shows.
              '& svg': {
                display: 'none',
              },
              '&::before': {
                content: '"esc"',
                fontFamily: theme.typography.fontFamilyCode,
                fontSize: theme.typography.pxToRem(12),
                fontWeight: theme.typography.fontWeightBold,
                color: (theme.vars || theme).palette.text.secondary,
              },
            },
            '& .DocSearch-Dropdown': {
              // v4 fixes the dropdown to 60dvh; make it fit its content instead so recent
              // searches stay compact and don't leave a gap above the product links.
              height: 'auto',
              maxHeight: 'var(--muidocs-docsearch-content-max-height)',
              '&::-webkit-scrollbar-thumb': {
                borderColor: (theme.vars || theme).palette.background.paper,
                backgroundColor: (theme.vars || theme).palette.grey[500],
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: (theme.vars || theme).palette.background.paper,
              },
              '* ul': {
                marginTop: theme.spacing(1),
              },
            },
            // The v4 screen icon (no-results / empty state) hardcodes an inline stroke="#5a5e9a"
            // that no variable can reach; recolor it to the MUI muted grey.
            '& .DocSearch-Screen-Icon svg': {
              stroke: 'var(--docsearch-muted-color)',
            },
            '& .DocSearch-Dropdown-Container': {
              '& .DocSearch-Hits:first-of-type': {
                '& .DocSearch-Hit-source': {
                  paddingTop: theme.spacing(2.5),
                  paddingBottom: theme.spacing(0.5),
                },
              },
            },
            '& .DocSearch-Hit-source': {
              top: 'initial',
              padding: theme.spacing(1.5, 3, 1.5, 3),
              background: 'transparent',
              fontSize: theme.typography.pxToRem(11),
              fontWeight: theme.typography.fontWeightBold,
              textTransform: 'uppercase',
              lineHeight: 1,
              letterSpacing: '.1rem',
              color: (theme.vars || theme).palette.text.tertiary,
            },
            '& .DocSearch-Hit': {
              paddingBottom: 8,
              '&:not(:first-of-type)': {
                marginTop: -1,
              },
            },
            '& .DocSearch-Hit a': {
              padding: theme.spacing(0.25, 0),
              paddingLeft: theme.spacing(2),
              border: '1px solid transparent',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.grey[50], 0.4),
              borderColor: alpha(theme.palette.grey[100], 0.5),
              '&:focus-visible': {
                outline: '3px solid',
                outlineColor: (theme.vars || theme).palette.primary[200],
                outlineOffset: 0,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                borderColor: (theme.vars || theme).palette.primary[300],
              },
            },
            '& .DocSearch-Hit-content-wrapper': {
              paddingLeft: theme.spacing(1),
            },
            '& .DocSearch-Hit-title': {
              fontSize: theme.typography.pxToRem(14),
              fontWeight: theme.typography.fontWeightMedium,
              color: (theme.vars || theme).palette.text.primary,
              // Algolia sets text-overflow on the flex container, where it can never apply, so long
              // snippets get clipped mid-word. Truncate on the items instead.
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            '& .DocSearch-Hit-path': {
              fontSize: theme.typography.pxToRem(12),
              color: (theme.vars || theme).palette.text.secondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            '& .DocSearch-Hit-icon': {
              '> svg': {
                height: '16px',
                width: '16px',
                margin: 0,
              },
            },
            '& .DocSearch-Hit-Select-Icon': {
              height: '14px',
              width: '14px',
            },
            '& .DocSearch-Hit[aria-selected="true"] a': {
              backgroundColor: (theme.vars || theme).palette.primary[50],
              borderColor: (theme.vars || theme).palette.primary[300],
            },
            // v4 tints the selected icon/action/mark with the muted --docsearch-highlight-color;
            // restore the brighter active color, and extend it to the tree connector so it matches
            // the icon instead of staying grey.
            '& .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-icon, & .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-action, & .DocSearch-Hit[aria-selected="true"] .DocSearch-Hit-Tree, & .DocSearch-Hit[aria-selected="true"] mark':
              {
                color: 'var(--docsearch-hit-active-color)',
              },
            '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
              // Match the selected-hit accent so all highlighted text is one blue, not two shades.
              color: 'var(--docsearch-hit-active-color)',
              '& .DocSearch-Hit-action-button': {
                display: 'flex',
                width: '24px',
                borderRadius: '6px',
                border: '1px solid transparent',
                '> svg': {
                  margin: 0,
                },
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                  borderColor: (theme.vars || theme).palette.primary[300],
                },
              },
            },
            '& .DocSearch-Footer': {
              // Keep the footer below the custom start screen (which uses order: 1).
              order: 2,
              borderTop: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[200],
              '& .DocSearch-Commands': {
                display: 'none',
              },
            },
          },
        })}
      />
      <GlobalStyles
        styles={(theme) => [
          {
            [theme.vars ? '[data-mui-color-scheme="dark"]:root' : '.mode-dark']: {
              // Use the brand blue (primary) not the dark-surface palette (primaryDark) so the search
              // icon matches the other dark-mode accents instead of rendering grey-blue.
              '--docsearch-highlight-color': (theme.vars || theme).palette.primary[300],
              '--docsearch-hit-active-color': (theme.vars || theme).palette.primary[300],
            },
          },
          {
            [theme.vars ? '[data-mui-color-scheme="dark"] body' : '.mode-dark']: {
              '.DocSearch-Container': {
                backgroundColor: alpha(theme.palette.grey[900], 0.6),
              },
              '& .DocSearch-NewStartScreenTitleIcon': {
                color: (theme.vars || theme).palette.primary[300],
              },
              '& .DocSearch-NewStartScreenItem': {
                color: (theme.vars || theme).palette.primary[300],
                backgroundColor: alpha(theme.palette.primaryDark[800], 0.5),
                borderColor: alpha(theme.palette.primaryDark[700], 0.8),
                '&:hover, &:focus': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                  borderColor: alpha(theme.palette.primary[700], 0.6),
                },
                '&:focus-visible': {
                  outlineColor: (theme.vars || theme).palette.primary[700],
                },
              },
              '& .DocSearch-Modal': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[900],
                boxShadow: `0px 4px 16px ${alpha(theme.palette.common.black, 0.8)}`,
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.primaryDark[700],
              },
              '& .DocSearch-SearchBar': {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
              },
              '& .DocSearch-Divider': {
                borderColor: (theme.vars || theme).palette.primaryDark[600],
              },
              '& .DocSearch-Close': {
                backgroundColor: (theme.vars || theme).palette.primaryDark[800],
                borderColor: (theme.vars || theme).palette.primaryDark[600],
              },
              '& .DocSearch-Dropdown': {
                '&::-webkit-scrollbar-thumb': {
                  borderColor: (theme.vars || theme).palette.primaryDark[900],
                  backgroundColor: (theme.vars || theme).palette.primaryDark[100],
                },
              },
              '& .DocSearch-Hit a': {
                backgroundColor: alpha(theme.palette.primaryDark[800], 0.5),
                borderColor: alpha(theme.palette.primaryDark[700], 0.8),
                '&:focus-visible': {
                  outlineColor: alpha(theme.palette.primary[400], 0.5),
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                  borderColor: alpha(theme.palette.primary[700], 0.6),
                },
              },
              '& .DocSearch-Hit[aria-selected="true"] a': {
                color: (theme.vars || theme).palette.primary[300],
                backgroundColor: alpha(theme.palette.primary[900], 0.4),
                borderColor: alpha(theme.palette.primary[700], 0.6),
              },
              '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
                // color comes from --docsearch-hit-active-color (primary[300] in dark).
                '& .DocSearch-Hit-action-button': {
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.8),
                    borderColor: alpha(theme.palette.primary[700], 0.8),
                  },
                },
              },
              '& .DocSearch-Footer': {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
              },
            },
          },
        ]}
      />
    </React.Fragment>
  );
}
