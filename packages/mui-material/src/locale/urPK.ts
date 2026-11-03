import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ur-PK');

export const urPK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'راستہ دکھائیں',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'پہلے صفحے پر جائیں';
          }
          if (type === 'last') {
            return 'آخری صفحے پر جائیں';
          }
          if (type === 'next') {
            return 'اگلے صفحے پر جائیں';
          }
          // if (type === 'previous') {
          return 'پچھلے صفحے پر جائیں';
        },
        labelRowsPerPage: 'ایک صفحے پر قطاریں:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? `${formatNumber(count)} میں سے` : `${formatNumber(to)} سے ذیادہ میں سے`} ${formatNumber(from)} سے ${formatNumber(to)} قطاریں`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستار${value !== 1 ? 'ے' : 'ہ'}`,
        emptyLabelText: 'خالی',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'کلئیر',
        closeText: 'بند کریں',
        loadingText: 'لوڈ ہو رہا ہے۔۔۔',
        noOptionsText: 'کوئی آپشن نہیں',
        openText: 'کھولیں',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'بند کریں',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'صفحات کی ترتیب',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `صفحہ نمبر ${page}${selected ? '' : ' پر جائیں'}`;
          }
          if (type === 'first') {
            return 'پہلے صفحے پر جائیں';
          }
          if (type === 'last') {
            return 'آخری صفحے پر جائیں';
          }
          if (type === 'next') {
            return 'اگلے صفحے پر جائیں';
          }
          // if (type === 'previous') {
          return 'پچھلے صفحے پر جائیں';
        },
      },
    },
  },
};
