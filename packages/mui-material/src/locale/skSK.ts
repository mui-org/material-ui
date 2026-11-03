import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('sk-SK');

export const skSK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázať cestu ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }
          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }
          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          }
          // if (type === 'previous') {
          return 'Ísť na predchádzajúcu stránku';
        },
        labelRowsPerPage: 'Riadkov na stránke:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} z ${count !== -1 ? formatNumber(count) : `viac ako ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          if (value === 1) {
            return `${value} hviezdička`;
          }
          if (value >= 2 && value <= 4) {
            return `${value} hviezdičky`;
          }
          return `${value} hviezdičiek`;
        },
        emptyLabelText: 'Prázdne',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazať',
        closeText: 'Zavrieť',
        loadingText: 'Načítanie…',
        noOptionsText: 'Žiadne možnosti',
        openText: 'Otvoriť',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavrieť',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigácia stránkovanim',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ísť na '}stránku ${page}`;
          }
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }
          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }
          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          }
          // if (type === 'previous') {
          return 'Ísť na predchádzajúcu stránku';
        },
      },
    },
  },
};
