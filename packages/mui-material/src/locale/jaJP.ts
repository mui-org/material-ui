import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ja-JP');

export const jaJP: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'すべて表示',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '最初のページへ';
          }
          if (type === 'last') {
            return '最後のページへ';
          }
          if (type === 'next') {
            return '次のページへ';
          }
          // if (type === 'previous') {
          return '前のページへ';
        },
        labelRowsPerPage: 'ページあたりの行数:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}～${formatNumber(to)} / ${count !== -1 ? formatNumber(count) : `${formatNumber(to)}以上`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `星${value}`,
        emptyLabelText: '星なし',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'クリア',
        closeText: '閉じる',
        loadingText: '読み込み中…',
        noOptionsText: 'データがありません',
        openText: '開く',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '閉じる',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ページ選択',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `ページ${page}${selected ? '' : 'へ'}`;
          }
          if (type === 'first') {
            return '最初のページへ';
          }
          if (type === 'last') {
            return '最後のページへ';
          }
          if (type === 'next') {
            return '次のページへ';
          }
          // if (type === 'previous') {
          return '前のページへ';
        },
      },
    },
  },
};
