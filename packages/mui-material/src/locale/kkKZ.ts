import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('kk-KZ');

export const kkKZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Толық жолды көрсету',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }
          if (type === 'last') {
            return 'Соңғы бетке өту';
          }
          if (type === 'next') {
            return 'Келесі бетке өту';
          }
          // if (type === 'previous') {
          return 'Алдыңғы бетке өту';
        },
        labelRowsPerPage: 'Беттегі қатарлар:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? formatNumber(count) : `+${formatNumber(to)}`} қатардың ішінен ${formatNumber(from)}–${formatNumber(to)}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} жұлдыз`,
        emptyLabelText: 'Рейтинг жоқ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Тазарту',
        closeText: 'Жабу',
        loadingText: 'Жүктелуде…',
        noOptionsText: 'Қол жетімді нұсқалар жоқ',
        openText: 'Ашу',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Жабу',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Беттерді шарлау',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) {
              return `${page} — бет`;
            }
            return `${page} — бетке өту`;
          }
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }
          if (type === 'last') {
            return 'Соңғы бетке өту';
          }
          if (type === 'next') {
            return 'Келесі бетке өту';
          }
          // if (type === 'previous') {
          return 'Алдыңғы бетке өту';
        },
      },
    },
  },
};
