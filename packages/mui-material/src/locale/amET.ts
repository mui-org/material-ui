import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('am-ET');

export const amET: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'መንገድ አሳይ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ወደ መጀመሪያው ገጽ ይሂዱ';
          }
          if (type === 'last') {
            return 'ወደ መጨረሻው ገጽ ይሂዱ';
          }
          if (type === 'next') {
            return 'ወደ ቀጣዩ ገጽ ይሂዱ';
          }
          // if (type === 'previous') {
          return 'ወደ ቀዳሚው ገጽ ይሂዱ';
        },
        labelRowsPerPage: 'ረድፎች በአንድ ገጽ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}-${formatNumber(to)} ከ ${count !== -1 ? formatNumber(count) : `${formatNumber(to)} በላይ`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ኮከ${value !== 1 ? 'ቦች' : 'ብ'}`,
        emptyLabelText: 'ባዶ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'አጽዳ',
        closeText: 'ዝጋ',
        loadingText: 'በመጫን ላይ…',
        noOptionsText: 'አማራጮች የሉም',
        openText: 'ክፈት',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ዝጋ',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'የገጽ አሰሳ',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ወደ '}ገጽ ${page}${selected ? '' : ' ሂድ'}`;
          }
          if (type === 'first') {
            return 'ወደ መጀመሪያው ገጽ ይሂዱ';
          }
          if (type === 'last') {
            return 'ወደ መጨረሻው ገጽ ይሂዱ';
          }
          if (type === 'next') {
            return 'ወደ ቀጣዩ ገጽ ይሂዱ';
          }
          // if (type === 'previous') {
          return 'ወደ ቀዳሚው ገጽ ይሂዱ';
        },
      },
    },
  },
};
