import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ku-CKB');

export const kuCKB: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'ڕێچکە پیشان بدە',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'چوونە یەکەم پەڕە';
          }
          if (type === 'last') {
            return 'چوونە کۆتا پەڕە';
          }
          if (type === 'next') {
            return 'چوونە پەڕەی دواتر';
          }
          // if (type === 'previous') {
          return 'گەڕانەوە بۆ پەڕەی پێشوو';
        },
        labelRowsPerPage: 'ژمارەی ڕیزەکان لە هەر پەڕەیەک:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} لە ${count !== -1 ? formatNumber(count) : ` زیاترە لە${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'ئەستێرەکان' : 'ئەستێرە'}`,
        emptyLabelText: 'خاڵیە',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'سڕینەوە',
        closeText: 'داخستن',
        loadingText: 'لە بارکردندایە…',
        noOptionsText: 'هیچ بژاردەیەک نیە',
        openText: 'کردنەوە',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'داخستن',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'گەڕان لە پەڕەکان',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'چوون بۆ '} پەڕەی ${page}`;
          }
          if (type === 'first') {
            return 'چوونە یەکەم پەڕە';
          }
          if (type === 'last') {
            return 'چوونە کۆتا پەڕە';
          }
          if (type === 'next') {
            return 'چوونە پەڕەی دواتر';
          }
          // if (type === 'previous') {
          return 'گەڕانەوە بۆ پەڕەی پێشوو';
        },
      },
    },
  },
};
