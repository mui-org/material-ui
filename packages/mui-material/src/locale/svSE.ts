import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('sv-SE');

export const svSE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visa sökväg',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå till första sidan';
          }
          if (type === 'last') {
            return 'Gå till sista sidan';
          }
          if (type === 'next') {
            return 'Gå till nästa sida';
          }
          // if (type === 'previous') {
          return 'Gå till föregående sida';
        },
        labelRowsPerPage: 'Rader per sida:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} av ${count !== -1 ? formatNumber(count) : `fler än ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Stjärnor' : 'Stjärna'}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Rensa',
        closeText: 'Stäng',
        loadingText: 'Laddar…',
        noOptionsText: 'Inga alternativ',
        openText: 'Öppna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Stäng',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sidnavigering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå till '}sida ${page}`;
          }
          if (type === 'first') {
            return 'Gå till första sidan';
          }
          if (type === 'last') {
            return 'Gå till sista sidan';
          }
          if (type === 'next') {
            return 'Gå till nästa sida';
          }
          // if (type === 'previous') {
          return 'Gå till föregående sida';
        },
      },
    },
  },
};
