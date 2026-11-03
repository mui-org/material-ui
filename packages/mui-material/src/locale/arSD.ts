import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ar-SD');

export const arSD: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'إظهار المسار',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'انتقل إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'انتقل إلى الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'انتقل إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'انتقل إلى الصفحة السابقة';
        },
        labelRowsPerPage: 'عدد الصفوف في الصفحة:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} من ${count !== -1 ? formatNumber(count) : ` أكثر من${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'نجوم' : 'نجمة'}`,
        emptyLabelText: 'فارغ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'مسح',
        closeText: 'إغلاق',
        loadingText: 'جار التحميل…',
        noOptionsText: 'لا يوجد خيارات',
        openText: 'فتح',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'إغلاق',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'التنقل عبر الصفحات',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'انتقل إلى '} صفحة ${page}`;
          }
          if (type === 'first') {
            return 'انتقل إلى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'انتقل الي الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'انتقل إلى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'انتقل إلى الصفحة السابقة';
        },
      },
    },
  },
};
