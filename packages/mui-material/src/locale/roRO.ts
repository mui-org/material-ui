import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ro-RO');

export const roRO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Arată calea',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Mergi la prima pagină';
          }
          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }
          if (type === 'next') {
            return 'Mergi la pagina următoare';
          }
          // if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        },
        labelRowsPerPage: 'Rânduri pe pagină:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} din ${count !== -1 ? formatNumber(count) : `mai mult de ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} St${value !== 1 ? 'ele' : 'ea'}`,
        emptyLabelText: 'Gol',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Șterge',
        closeText: 'Închide',
        loadingText: 'Se încarcă…',
        noOptionsText: 'Nicio opțiune',
        openText: 'Deschide',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Închide',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigare prin paginare',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Mergi la '}pagina ${page}`;
          }
          if (type === 'first') {
            return 'Mergi la prima pagină';
          }
          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }
          if (type === 'next') {
            return 'Mergi la pagina următoare';
          }
          // if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        },
      },
    },
  },
};
