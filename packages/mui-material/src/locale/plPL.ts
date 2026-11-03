import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('pl-PL');

export const plPL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaż ścieżkę',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }
          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }
          if (type === 'next') {
            return 'Przejdź do następnej strony';
          }
          // if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        },
        labelRowsPerPage: 'Wierszy na stronę:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} z ${count !== -1 ? formatNumber(count) : `ponad ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'gwiazdek';
          const lastDigit = value % 10;

          if ((value < 10 || value > 20) && lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'gwiazdki';
          } else if (value === 1) {
            pluralForm = 'gwiazdka';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Brak gwiazdek',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wyczyść',
        closeText: 'Zamknij',
        loadingText: 'Ładowanie…',
        noOptionsText: 'Brak opcji',
        openText: 'Otwórz',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zamknij',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Nawigacja podziału na strony',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return selected ? `${page}. strona` : `Przejdź do ${page}. strony`;
          }
          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }
          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }
          if (type === 'next') {
            return 'Przejdź do następnej strony';
          }
          // if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        },
      },
    },
  },
};
