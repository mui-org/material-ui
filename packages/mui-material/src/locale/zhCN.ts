import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('zh-CN');

export const zhCN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展开',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '第一页';
          }
          if (type === 'last') {
            return '最后一页';
          }
          if (type === 'next') {
            return '下一页';
          }
          return '上一页';
        },
        labelRowsPerPage: '每页行数:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${formatNumber(from)} 条到第 ${formatNumber(to)} 条，${count !== -1 ? `共 ${formatNumber(count)} 条` : `至少 ${formatNumber(to)} 条`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 颗星`,
        emptyLabelText: '无标签',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '关闭',
        loadingText: '加载中……',
        noOptionsText: '没有可用选项',
        openText: '打开',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '关闭',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '分页导航',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : '转到'}第 ${page} 页`;
          }
          if (type === 'first') {
            return '转到第一页';
          }
          if (type === 'last') {
            return '转到最后一页';
          }
          if (type === 'next') {
            return '转到下一页';
          }
          // if (type === 'previous')
          return '转到上一页';
        },
      },
    },
  },
};
