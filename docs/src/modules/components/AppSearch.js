import * as React from 'react';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { alpha, styled, useTheme } from '@material-ui/core/styles';
import GlobalStyles from '@material-ui/core/GlobalStyles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import { handleEvent } from 'docs/src/modules/components/MarkdownLinks';
import docsearch from 'docsearch.js';
import { LANGUAGES_SSR } from 'docs/src/modules/constants';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const StyledInput = styled(Input)({
  color: 'inherit',
});

function AlgoliaStyles() {
  return (
    <GlobalStyles
      styles={(theme) => {
        return {
          '.algolia-autocomplete': {
            '& .ds-dropdown-menu': {
              boxShadow: theme.shadows[1],
              borderRadius: theme.shape.borderRadius,
              '&::before': {
                display: 'none',
              },
              '& [class^=ds-dataset-]': {
                border: 0,
                maxHeight: 'calc(100vh - 100px)',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
              },
            },
            '& .algolia-docsearch-suggestion--category-header-lvl0': {
              color: theme.palette.text.primary,
            },
            '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--subcategory-column': {
              opacity: 1,
              padding: '5.33px 10.66px',
              textAlign: 'right',
              width: '25%',
            },
            '& .algolia-docsearch-suggestion .algolia-docsearch-suggestion--content': {
              float: 'right',
              padding: '5.33px 0 5.33px 10.66px',
              width: '75%',
            },
            '& .algolia-docsearch-suggestion--subcategory-column-text': {
              color: theme.palette.text.secondary,
              fontWeight: theme.typography.fontWeightRegular,
            },
            '& .algolia-docsearch-suggestion--highlight': {
              color: theme.palette.mode === 'light' ? '#174d8c' : '#acccf1',
            },
            '& .algolia-docsearch-suggestion': {
              textDecoration: 'none',
              backgroundColor: theme.palette.background.paper,
            },
            '& .algolia-docsearch-suggestion--title': {
              ...theme.typography.h6,
              color: theme.palette.text.primary,
            },
            '& .algolia-docsearch-suggestion--text': {
              ...theme.typography.body2,
              color: theme.palette.text.secondary,
            },
            '&& .algolia-docsearch-suggestion--no-results': {
              width: '100%',
              '&::before': {
                display: 'none',
              },
            },
            '& .ds-dropdown-menu .ds-suggestion.ds-cursor .algolia-docsearch-suggestion--content': {
              backgroundColor: `${theme.palette.action.selected} !important`,
            },
          },
        };
      }}
    />
  );
}

const RootDiv = styled('div')(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  };
});

const SearchDiv = styled('div')(({ theme }) => {
  return {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(13),
    lineHeight: '21px',
    color: alpha(theme.palette.common.white, 0.8),
    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    padding: theme.spacing(0, 0.5),
    position: 'absolute',
    right: theme.spacing(1),
    height: 23,
    top: 'calc(50% - 11px)',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),
    // So that clicks target the input.
    // Makes the text non selectable but neither is the placeholder or adornment.
    pointerEvents: 'none',
    '&.Mui-focused': {
      opacity: 0,
    },
  };
});

/**
 * When using this component it is recommend to include a preload link
 * `<link rel="preload" href="https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css" as="style" />`
 * to potentially reduce load times
 */
export default function AppSearch() {
  const inputRef = React.useRef(null);
  const [focused, setFocused] = React.useState(false);
  const theme = useTheme();
  const userLanguage = useUserLanguage();
  const t = useTranslate();

  useLazyCSS('https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css', '#app-search');

  React.useEffect(() => {
    const handleKeyDown = (nativeEvent) => {
      if (nativeEvent.defaultPrevented) {
        return;
      }

      if (nativeEvent.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current.blur();
        return;
      }

      const matchMainShortcut =
        (nativeEvent.ctrlKey || nativeEvent.metaKey) && nativeEvent.key === 'k';
      const matchNonkeyboardNode =
        ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(document.activeElement.tagName) === -1 &&
        !document.activeElement.isContentEditable;

      if (matchMainShortcut && matchNonkeyboardNode) {
        nativeEvent.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const desktop = useMediaQuery(theme.breakpoints.up('sm'));

  React.useEffect(() => {
    if (desktop) {
      // In non-SSR languages, fall back to English.
      const facetFilterLanguage =
        LANGUAGES_SSR.indexOf(userLanguage) !== -1 ? `language:${userLanguage}` : `language:en`;

      // This assumes that by the time this effect runs the Input component is committed
      // this holds true as long as the effect and the component are in the same
      // suspense boundary. If you move effect and component apart be sure to check
      // that this assumption still holds
      const search = docsearch({
        apiKey: '1d8534f83b9b0cfea8f16498d19fbcab',
        indexName: 'material-ui',
        inputSelector: '#docsearch-input',
        algoliaOptions: {
          facetFilters: ['version:next', facetFilterLanguage],
        },
        autocompleteOptions: {
          openOnFocus: true,
        },
        handleSelected: (input, event, suggestion) => {
          event.button = 0;
          const parseUrl = document.createElement('a');
          parseUrl.href = suggestion.url;
          handleEvent(event, parseUrl.pathname + parseUrl.hash);
          input.close();
        },
        // debug: true, // Set debug to true if you want to inspect the dropdown.
      });

      search.autocomplete.on('autocomplete:cursorchanged', (event) => {
        const combobox = event.target;
        const selectedOptionNode = document.getElementById(
          combobox.getAttribute('aria-activedescendant'),
        );
        const listboxNode = document.querySelector('.ds-suggestions').parentElement;

        if (selectedOptionNode === null || listboxNode === null) {
          if (process.env.NODE_ENV !== 'production') {
            console.warn('Cant scroll to selected option.');
          }
          return;
        }

        // Scroll active descendant into view.
        // Logic copied from https://www.w3.org/TR/wai-aria-practices/examples/listbox/js/listbox.js
        //
        // Consider this API instead once it has a better browser support:
        // .scrollIntoView({ scrollMode: 'if-needed', block: 'nearest' });
        if (listboxNode.scrollHeight > listboxNode.clientHeight) {
          const element = selectedOptionNode;

          const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
          const elementBottom = element.offsetTop + element.offsetHeight;
          if (elementBottom > scrollBottom) {
            listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
          } else if (element.offsetTop < listboxNode.scrollTop) {
            listboxNode.scrollTop = element.offsetTop;
          }
        }
      });
    }
  }, [desktop, userLanguage]);

  const macOS = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <RootDiv>
      <SearchDiv>
        <SearchIcon />
      </SearchDiv>
      <AlgoliaStyles />
      <StyledInput
        disableUnderline
        placeholder={`${t('algoliaSearch')}…`}
        inputProps={{
          'aria-label': t('algoliaSearch'),
        }}
        type="search"
        id="docsearch-input"
        inputRef={inputRef}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        componentsProps={{
          input: {
            sx: {
              padding: 1,
              paddingLeft: 9,
              transition: theme.transitions.create('width'),
              width: 140,
              '&:focus': {
                width: 170,
              },
            },
          },
        }}
      />
      <Shortcut className={focused && 'Mui-focused'}>
        {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
        {macOS ? '⌘' : 'Ctrl+'}K
      </Shortcut>
    </RootDiv>
  );
}
