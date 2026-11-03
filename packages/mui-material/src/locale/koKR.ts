import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ko-KR');

export const koKR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '경로 보기',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }
          if (type === 'last') {
            return '마지막 페이지로 이동';
          }
          if (type === 'next') {
            return '다음 페이지로 이동';
          }
          // if (type === 'previous') {
          return '이전 페이지로 이동';
        },
        labelRowsPerPage: '페이지 당 행:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} / ${count !== -1 ? formatNumber(count) : `${formatNumber(to)}개 이상`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 점`,
        emptyLabelText: '빈 텍스트',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '지우기',
        closeText: '닫기',
        loadingText: '불러오는 중…',
        noOptionsText: '옵션 없음',
        openText: '열기',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '닫기',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '페이지네이션 네비게이션',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page} 번째 페이지${selected ? '' : '로 이동'}`;
          }
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }
          if (type === 'last') {
            return '마지막 페이지로 이동';
          }
          if (type === 'next') {
            return '다음 페이지로 이동';
          }
          // if (type === 'previous') {
          return '이전 페이지로 이동';
        },
      },
    },
  },
};
