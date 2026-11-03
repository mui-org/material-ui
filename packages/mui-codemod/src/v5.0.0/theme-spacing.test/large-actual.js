import * as React from 'react';
import { createPortal } from 'react-dom';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import * as ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { DocSearchModal, useDocSearchKeyboardEvents } from '@docsearch/react';
import Chip from '@mui/material/Chip';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import SearchIcon from '@mui/icons-material/Search';
import GlobalStyles from '@mui/material/GlobalStyles';
import { alpha, styled } from '@mui/material/styles';
import { LANGUAGES_SSR } from 'docs/config';
import Link from 'docs/src/modules/components/Link';
import { useTranslate, useUserLanguage } from '@mui/internal-core-docs/i18n';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import getUrlProduct from 'docs/src/modules/utils/getUrlProduct';

const SearchButton = styled('button')(({ theme }) => {
  return {
    minHeight: 34,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: `${theme.spacing(1)}px`,
    [theme.breakpoints.only('xs')]: {
      backgroundColor: 'transparent',
      padding: 0,
      minWidth: 34,
      justifyContent: 'center',
      '& > *:not(.MuiSvgIcon-root)': {
        display: 'none',
      },
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[900] : theme.palette.grey[50],
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.grey[200]
    }`,
    borderRadius: 10,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    '&:hover': {
      background:
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.primaryDark[700], 0.4)
          : alpha(theme.palette.grey[100], 0.7),
      borderColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : theme.palette.grey[300],
    },
  };
});

const SearchLabel = styled('span')(({ theme }) => {
  return {
    marginLeft: `${theme.spacing(1)}px`,
    marginRight: 'auto',
  };
});

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '20px',
    marginLeft: `${theme.spacing(0.5)}px`,
    border: `1px solid ${
      theme.palette.mode === 'dark' ? theme.palette.primaryDark[500] : theme.palette.grey[200]
    }`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primaryDark[800] : '#FFF',
    padding: `${theme.spacing(0, 0.8)}px`,
    borderRadius: 5,
  };
});

const NewStartScreen = () => {
  const startScreenOptions = [
    {
      category: {
        name: 'Getting started',
        icon: <ArticleRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Installation', href: '/material-ui/getting-started/installation/' },
        { name: 'Usage', href: '/material-ui/getting-started/usage/' },
        { name: 'Learn', href: '/material-ui/getting-started/learn/' },
      ],
    },
    {
      category: {
        name: 'Popular searches',
        icon: <ToggleOffRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Material Icons', href: '/material-ui/material-icons/' },
        { name: 'Text field', href: '/material-ui/react-text-field/' },
        { name: 'Button', href: '/material-ui/react-button/' },
      ],
    },
    {
      category: {
        name: 'Customization',
        icon: <EditRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'How to customize', href: '/material-ui/customization/how-to-customize/' },
        { name: 'Theming', href: '/material-ui/customization/theming/' },
        { name: 'Default Theme', href: '/material-ui/customization/default-theme/' },
      ],
    },
    {
      category: {
        name: 'System',
        icon: <HandymanRoundedIcon className="DocSearch-NewStartScreenTitleIcon" />,
      },
      items: [
        { name: 'Basics', href: '/system/basics/' },
        { name: 'Properties', href: '/system/properties/' },
        { name: 'The sx prop', href: '/system/the-sx-prop/' },
      ],
    },
  ];
  return (
    <div className="DocSearch-NewStartScreen">
      {startScreenOptions.map(({ category, items }) => (
        <div key={category.name} className="DocSearch-NewStartScreenCategory">
          <div className="DocSearch-NewStartScreenTitle">
            {category.icon}
            {category.name}
          </div>
          {items.map(({ name, href }) => (
            <NextLink key={name} href={href}>
              <a href={href} className="DocSearch-NewStartScreenItem">
                {name}
                <KeyboardArrowRightRounded className="DocSearch-NewStartScreenItemIcon" />
              </a>
            </NextLink>
          ))}
        </div>
      ))}
    </div>
  );
};

function DocSearchHit(props) {
  const { children, hit } = props;

  function displayTag(pathname) {
    // does not need to show product label for MUI X because they are grouped by the product name in the search
    // i.e. Data Grid, Date Picker
    if (!pathname.match(/^\/(material-ui|joy-ui|base)\//)) {
      return null;
    }
    let text = '';
    if (pathname.startsWith('/material-ui/')) {
      text = 'Material UI';
    }
    if (pathname.startsWith('/joy-ui/')) {
      text = 'Joy UI';
    }
    if (pathname.startsWith('/base/')) {
      text = 'Base UI';
    }
    return <Chip label={text} size="small" variant="outlined" sx={{ mr: 1 }} />;
  }

  if (hit.pathname) {
    return (
      <Link
        href={hit.pathname}
        as={hit.as}
        sx={{ display: 'flex !important', '& .DocSearch-Hit-Container': { flex: 1, minWidth: 0 } }}
      >
        {children}
        {displayTag(hit.pathname)}
      </Link>
    );
  }

  // DocSearch stores the old results in its cache
  // hit.pathname won't be defined for them.
  return <Link href={hit.url}>{children}</Link>;
}

DocSearchHit.propTypes = {
  children: PropTypes.node,
  hit: PropTypes.object.isRequired,
};

export default function AppSearch() {
  useLazyCSS(
    'https://cdn.jsdelivr.net/npm/@docsearch/css@3.0.0-alpha.40/dist/style.min.css',
    '#app-search',
  );
  const FADE_DURATION = 100; // ms
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const searchButtonRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [initialQuery, setInitialQuery] = React.useState(undefined);
  const facetFilterLanguage = LANGUAGES_SSR.includes(userLanguage)
    ? `language:${userLanguage}`
    : `language:en`;
  const macOS = window.navigator.platform.toUpperCase().includes('MAC');
  const onOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const router = useRouter();
  const productSpace = getUrlProduct(router.asPath);

  const keyboardNavigator = {
    navigate({ item }) {
      const as = item.userLanguage !== 'en' ? `/${item.userLanguage}${item.as}` : item.as;
      router.push(item.pathname, as);
    },
  };

  const onClose = React.useCallback(() => {
    const modal = document.querySelector('.DocSearch-Container');
    if (modal) {
      // fade out transition
      modal.style.opacity = 0;
    }
    setIsOpen(false); // DO NOT call setIsOpen inside a timeout (it causes scroll issue).
  }, [setIsOpen]);

  const onInput = React.useCallback(
    (event) => {
      setIsOpen(true);
      setInitialQuery(event.key);
    },
    [setIsOpen, setInitialQuery],
  );

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  React.useEffect(() => {
    const addStartScreen = () => {
      const dropDown = document.querySelector('.DocSearch-Dropdown');
      const isExisting = document.querySelector('.DocSearch-NewStartScreen');
      if (dropDown && !isExisting) {
        dropDown.insertAdjacentHTML(
          'beforeend',
          ReactDOMServer.renderToStaticMarkup(<NewStartScreen />),
        );
      }
    };
    // add transition to Modal
    if (isOpen) {
      const modal = document.querySelector('.DocSearch-Container');
      const searchInput = document.querySelector('.DocSearch-Input');
      if (modal) {
        modal.style.opacity = 1;
        addStartScreen();
      }
      if (searchInput) {
        const handleInput = (event) => {
          const newStartScreen = document.querySelector('.DocSearch-NewStartScreen');
          if (newStartScreen) {
            newStartScreen.style.display = event.target.value !== '' ? 'none' : 'grid';
          }
        };
        searchInput.addEventListener('input', handleInput);
        return () => {
          searchInput.removeEventListener('input', handleInput);
        };
      }
    }
    return () => {};
  }, [isOpen]);

  const search = `${t('algoliaSearch')}…`;

  return (
    <React.Fragment>
      <SearchButton ref={searchButtonRef} onClick={onOpen}>
        <SearchIcon
          fontSize="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primary[300]
                : theme.palette.primary[500],
          }}
        />
        <SearchLabel>{search}</SearchLabel>
        <Shortcut>{macOS ? '⌘' : 'Ctrl+'}K</Shortcut>
      </SearchButton>
      {isOpen &&
        createPortal(
          <DocSearchModal
            initialQuery={initialQuery}
            appId={'TZGZ85B9TB'}
            apiKey={'8177dfb3e2be72b241ffb8c5abafa899'}
            indexName="material-ui"
            searchParameters={{
              facetFilters: ['version:master', facetFilterLanguage],
              optionalFilters: [`product:${productSpace}`],
              hitsPerPage: 40,
            }}
            placeholder={search}
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
            initialScrollY={typeof window !== 'undefined' ? window.scrollY : undefined}
            onClose={onClose}
            navigator={keyboardNavigator}
          />,
          document.body,
        )}
      <GlobalStyles
        styles={(theme) => ({
          html: {
            ':root': {
              '--docsearch-primary-color':
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              '--docsearch-text-color': theme.palette.text.primary,
              '--docsearch-muted-color': theme.palette.grey[600],
              '--docsearch-searchbox-shadow': 0,
              '--docsearch-hit-shadow': 0,
              '--docsearch-footer-shadow': 0,
              '--docsearch-spacing': `${theme.spacing(1.5)}px`,
              '--docsearch-hit-active-color':
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[300]
                  : theme.palette.primary[600],
              '--docsearch-logo-color': theme.palette.grey[600],
              '--docsearch-searchbox-focus-background': 'unset',
              '--docsearch-footer-background': 'unset',
              '--docsearch-modal-background': theme.palette.background.paper,
            },
          },
          body: {
            '.DocSearch-Container': {
              transition: `opacity ${FADE_DURATION}ms`,
              opacity: 0,
              zIndex: theme.zIndex.tooltip + 100,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.grey[900], 0.7)
                  : alpha(theme.palette.grey[600], 0.2),
              backdropFilter: 'blur(4px)',
            },
            '& .DocSearch-StartScreen': {
              display: 'none',
            },
            '& .DocSearch-NewStartScreen': {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: `${theme.spacing(2)}px`,
              padding: `${theme.spacing(2, 1)}px`,
            },
            '& .DocSearch-NewStartScreenCategory': {
              display: 'flex',
              flexDirection: 'column',
            },
            '& .DocSearch-NewStartScreenTitle': {
              display: 'flex',
              alignItems: 'center',
              padding: `${theme.spacing(1, 1)}px`,
              fontSize: theme.typography.pxToRem(14),
              color: theme.palette.text.secondary,
            },
            '& .DocSearch-NewStartScreenTitleIcon': {
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              marginRight: `${theme.spacing(1.5)}px`,
              fontSize: theme.typography.pxToRem(16),
            },
            '& .DocSearch-NewStartScreenItem': {
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              padding: `${theme.spacing(0.5, 4.6)}px`,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[300]
                  : theme.palette.primary[500],
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(14),
              '&:hover, &:focus': {
                '.DocSearch-NewStartScreenItemIcon': {
                  marginLeft: `${theme.spacing(1)}px`,
                },
              },
            },
            '& .DocSearch-NewStartScreenItemIcon': {
              marginLeft: `${theme.spacing(0.5)}px`,
              transition: 'margin 0.2s',
              fontSize: theme.typography.pxToRem(16),
            },
            '& .DocSearch-Modal': {
              maxWidth: '700px',
              boxShadow: `0px 4px 20px ${
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.7)
                  : alpha(theme.palette.grey[700], 0.2)
              }`,
              ...(theme.palette.mode === 'dark' && {
                border: '1px solid',
                borderColor: theme.palette.primaryDark[700],
              }),
              // docsearch.css: <= 750px will be full screen modal
              borderRadius: `clamp(0px, (100vw - 750px) * 9999, ${theme.shape.borderRadius}px)`,
            },
            '& .DocSearch-SearchBar': {
              borderBottom: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[200],
              padding: `${theme.spacing(1)}px`,
            },
            '& .DocSearch-Form': {
              '& .DocSearch-Reset': {
                display: 'none',
              },
              '& .DocSearch-Input': {
                paddingLeft: `${theme.spacing(2.5)}px`,
              },
              '& .DocSearch-Search-Icon': {
                width: '20px',
                height: '20px',
              },
            },
            '& .DocSearch-Cancel': {
              display: 'block',
              alignSelf: 'center',
              height: '1.5rem',
              marginRight: `${theme.spacing(1)}px`,
              padding: `${theme.spacing(0.3, 0.8, 0.6, 0.8)}px`,
              fontSize: 0,
              borderRadius: 5,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.grey[50],
              border: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[600]
                  : theme.palette.grey[300],
              '&::before': {
                content: '"esc"',
                fontSize: theme.typography.pxToRem(12),
                letterSpacing: '.08rem',
                fontWeight: 700,
                color: theme.palette.text.secondary,
              },
            },
            '& .DocSearch-Dropdown': {
              minHeight: 384, // = StartScreen height, to prevent layout shift when first char
              '&::-webkit-scrollbar-thumb': {
                borderColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[900]
                    : theme.palette.background.paper,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? theme.palette.primaryDark[700]
                    : theme.palette.grey[500],
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.paper,
              },
            },
            '& .DocSearch-Dropdown-Container': {
              '& .DocSearch-Hits:first-of-type': {
                '& .DocSearch-Hit-source': {
                  paddingTop: `${theme.spacing(1)}px`,
                },
              },
            },
            '& .DocSearch-Hit-source': {
              top: 'initial',
              paddingTop: `${theme.spacing(2)}px`,
              background: theme.palette.background.paper,
              fontSize: theme.typography.pxToRem(13),
              fontWeight: 500,
              color: theme.palette.text.secondary,
            },
            '& .DocSearch-Hit': {
              paddingBottom: 0,
              '&:not(:first-of-type)': {
                marginTop: -1,
              },
            },
            '& .DocSearch-Hit a': {
              backgroundColor: 'transparent',
              padding: `${theme.spacing(0.25, 0)}px`,
              paddingLeft: `${theme.spacing(2)}px`,
              border: '1px solid transparent',
              borderBottomColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[100],
            },
            '& .DocSearch-Hit-content-wrapper': {
              paddingLeft: `${theme.spacing(2)}px`,
            },
            '& .DocSearch-Hit-title': {
              fontSize: theme.typography.pxToRem(14),
              color: `${theme.palette.text.primary}`,
            },
            '& .DocSearch-Hit-path': {
              fontSize: theme.typography.pxToRem(12),
              color: `${theme.palette.text.secondary}`,
            },
            '& .DocSearch-Hit-Select-Icon': {
              height: '15px',
              width: '15px',
            },
            '& .DocSearch-Hit[aria-selected="true"] a': {
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[800]
                  : theme.palette.primary[50],
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[400]
                  : theme.palette.primary[500],
              borderRadius: theme.shape.borderRadius,
            },
            '& .DocSearch-Hit-action, & .DocSearch-Hits mark': {
              color: `${
                theme.palette.mode === 'dark'
                  ? theme.palette.primary[400]
                  : theme.palette.primary[500]
              }`,
            },
            '& .DocSearch-Footer': {
              borderTop: '1px solid',
              borderColor:
                theme.palette.mode === 'dark'
                  ? theme.palette.primaryDark[700]
                  : theme.palette.grey[200],
              '& .DocSearch-Commands': {
                display: 'none',
              },
            },
          },
        })}
      />
    </React.Fragment>
  );
}
