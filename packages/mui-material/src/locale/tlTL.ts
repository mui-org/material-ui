import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('tl-TL');

// Tagalog-Tagalog
export const tlTL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ipakita ang landas',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Pumunta sa unang pahina';
          }
          if (type === 'last') {
            return 'Pumunta sa huling pahina';
          }
          if (type === 'next') {
            return 'Pumunta sa susunod na pahina';
          }
          // if (type === 'previous') {
          return 'Pumunta sa nakaraang pahina';
        },
        labelRowsPerPage: 'Mga hilera bawat pahina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} ng ${count !== -1 ? formatNumber(count) : `higit sa ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Bituin${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Walang laman',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Maaliwalas',
        closeText: 'Isara',
        loadingText: 'Naglo-load…',
        noOptionsText: 'Walang mga pagpipilian',
        openText: 'Bukas',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Isara',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sayfa navigasyonu',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Pumunta sa'}pahina ${page}`;
          }
          if (type === 'first') {
            return 'Pumunta sa unang pahina';
          }
          if (type === 'last') {
            return 'Pumunta sa huling pahina';
          }
          if (type === 'next') {
            return 'Pumunta sa susunod na pahina';
          }
          // if (type === 'previous') {
          return 'Pumunta sa nakaraang pahina';
        },
      },
    },
  },
};
