import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('bn-BD');

export const bnBD: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'পথ দেখান',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }
          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }
          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          }
          // if (type === 'previous') {
          return 'আগের পৃষ্ঠায় যান';
        },
        labelRowsPerPage: 'প্রতি পৃষ্ঠায় সারি:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} / ${count !== -1 ? formatNumber(count) : `${formatNumber(to)} থেকে বেশি`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} স্টার`,
        emptyLabelText: 'খালি',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'পরিষ্কার করুন',
        closeText: 'বন্ধ করুন',
        loadingText: 'লোড হচ্ছে…',
        noOptionsText: 'কোন অপশন নেই',
        openText: 'ওপেন করুন',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'বন্ধ করুন',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'পেজিনেশন নেভিগেশন',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'যান '}পৃষ্ঠা ${page}-এ`;
          }
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }
          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }
          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          }
          // if (type === 'previous') {
          return 'আগের পৃষ্ঠায় যান';
        },
      },
    },
  },
};
