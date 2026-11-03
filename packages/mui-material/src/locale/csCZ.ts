import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('cs-CZ');

export const csCZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázat cestu',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Jít na první stránku';
          }
          if (type === 'last') {
            return 'Jít na poslední stránku';
          }
          if (type === 'next') {
            return 'Jít na další stránku';
          }
          // if (type === 'previous') {
          return 'Jít na předchozí stránku';
        },
        labelRowsPerPage: 'Řádků na stránce:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} z ${count !== -1 ? formatNumber(count) : `více než ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          if (value === 1) {
            return `${value} hvězdička`;
          }
          if (value >= 2 && value <= 4) {
            return `${value} hvězdičky`;
          }
          return `${value} hvězdiček`;
        },
        emptyLabelText: 'Prázdné',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazat',
        closeText: 'Zavřít',
        loadingText: 'Načítání…',
        noOptionsText: 'Žádné možnosti',
        openText: 'Otevřít',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavřít',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigace stránkováním',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Jít na '}${page}. stránku`;
          }
          if (type === 'first') {
            return 'Jít na první stránku';
          }
          if (type === 'last') {
            return 'Jít na poslední stránku';
          }
          if (type === 'next') {
            return 'Jít na další stránku';
          }
          // if (type === 'previous') {
          return 'Jít na předchozí stránku';
        },
      },
    },
  },
};
