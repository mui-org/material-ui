import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('hi-IN');

export const hiIN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'रास्ता दिखायें',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }
          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }
          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          }
          // if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        },
        labelRowsPerPage: 'पंक्तियाँ प्रति पृष्ठ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}-${to === -1 ? formatNumber(count) : formatNumber(to)} कुल ${formatNumber(count)} में`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} तार${value !== 1 ? 'े' : 'ा'}`,
        emptyLabelText: 'रिक्त',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'हटायें',
        closeText: 'बंद करें',
        loadingText: 'लोड हो रहा है…',
        noOptionsText: 'कोई विकल्प नहीं',
        openText: 'खोलें',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'बंद करें',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'पृस्ठानुसार संचालन',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `पृष्ठ ${page} ${selected ? '' : ' पर जाएँ'}`;
          }
          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }
          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }
          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          }
          // if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        },
      },
    },
  },
};
