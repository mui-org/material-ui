import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ne-NP');

// Nepali-नेपाली
export const neNP: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'बाटो देखाउनुहोस्',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'पहिलो पृष्ठमा जानुहोस्';
          }
          if (type === 'last') {
            return 'अन्तिम पृष्ठमा जानुहोस्';
          }
          if (type === 'next') {
            return 'अर्को पृष्ठमा जानुहोस्';
          }
          // if (type === 'previous') {
          return 'अघिल्लो पृष्ठमा जानुहोस्';
        },
        labelRowsPerPage: 'प्रति पृष्ठ पङ्क्तिहरू:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} को ${count !== -1 ? formatNumber(count) : `धेरै ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          return `${value} तारा${lastDigit === 1 ? 'स' : ''}`;
        },
        emptyLabelText: 'खाली',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'खाली गर्नुहोस्',
        closeText: 'बन्द गर्नुहोस्',
        loadingText: 'लोड हुँदै…',
        noOptionsText: 'कुनै विकल्प छैन',
        openText: 'खोल्नुहोस्',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'बन्द गर्नुहोस्',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'पृष्ठांकन नेभिगेसन',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'जाऊ त्यहाँ '}पृष्ठ ${page}`;
          }
          if (type === 'first') {
            return 'पहिलो पृष्ठमा जानुहोस्';
          }
          if (type === 'last') {
            return 'अन्तिम पृष्ठमा जानुहोस्';
          }
          if (type === 'next') {
            return 'अर्को पृष्ठमा जानुहोस्';
          }
          // if (type === 'previous') {
          return 'अघिल्लो पृष्ठमा जानुहोस्';
        },
      },
    },
  },
};
