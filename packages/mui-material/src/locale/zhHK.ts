import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('zh-HK');

export const zhHK: Localization = {
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
            return '第一頁';
          }
          if (type === 'last') {
            return '最後一頁';
          }
          if (type === 'next') {
            return '下一頁';
          }
          return '上一頁';
        },
        labelRowsPerPage: '每頁行數:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${formatNumber(from)} 項至第 ${formatNumber(to)} 項，${count !== -1 ? `共 ${formatNumber(count)} 項` : `超過 ${formatNumber(to)} 項`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 粒星`,
        emptyLabelText: '無標籤',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清除',
        closeText: '關閉',
        loadingText: '載入中……',
        noOptionsText: '沒有可用選項',
        openText: '開啟',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉',
      },
    },
  },
};
