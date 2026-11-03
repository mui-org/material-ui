import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('zh-TW');

export const zhTW: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展開',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '前往第一頁';
          }
          if (type === 'last') {
            return '前往最後一頁';
          }
          if (type === 'next') {
            return '前往下一頁';
          }
          return '前往上一頁';
        },
        labelRowsPerPage: '每頁列數：',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${formatNumber(from)} 至 ${formatNumber(to)} 筆，${count !== -1 ? `共 ${formatNumber(count)} 筆` : `超過 ${formatNumber(to)} 筆`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 顆星`,
        emptyLabelText: '未評分',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清除',
        closeText: '關閉',
        loadingText: '載入中…',
        noOptionsText: '沒有可用選項',
        openText: '開啟',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '分頁導覽',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : '前往'}第 ${page} 頁`;
          }
          if (type === 'first') {
            return '前往第一頁';
          }
          if (type === 'last') {
            return '前往最後一頁';
          }
          if (type === 'next') {
            return '前往下一頁';
          }
          // if (type === 'previous')
          return '前往上一頁';
        },
      },
    },
  },
};
