import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('si-LK');

export const siLK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'ගමන් මඟ පෙන්වන්න',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }
          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }
          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          }
          // if (type === 'previous') {
          return 'පෙර පිටුවට යන්න';
        },
        labelRowsPerPage: 'පිටුවක පේළි:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} දක්වා ${count !== -1 ? formatNumber(count) : `${formatNumber(to)} ට වැඩි ප්‍රමාණයකින්`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `තරු ${value}`,
        emptyLabelText: 'හිස්',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'මකන්න',
        closeText: 'වසන්න',
        loadingText: 'නැංවෙමින්…',
        noOptionsText: 'විකල්ප නැත',
        openText: 'විවෘත කරන්න',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'වසන්න',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'පිටු අතර සංචරණය',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `පිටුව ${page} ${selected ? '' : 'ට යන්න'}`;
          }
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }
          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }
          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          }
          // if (type === 'previous') {
          return 'පෙර පිටුවට යන්න';
        },
      },
    },
  },
};
