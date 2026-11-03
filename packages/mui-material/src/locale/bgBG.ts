import type { Localization } from './utils/LocaleTextApi';

export const bgBG: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показване на пътя',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Отиди на първата страница';
          }
          if (type === 'last') {
            return 'Отиди на последната страница';
          }
          if (type === 'next') {
            return 'Отиди на следващата страница';
          }
          // if (type === 'previous') {
          return 'Отиди на предишната страница';
        },
        labelRowsPerPage: 'Редове на страница:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} от ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Звезд${value !== 1 ? 'и' : 'а'}`,
        emptyLabelText: 'Изчисти',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Изчисти',
        closeText: 'Затвори',
        loadingText: 'Зареждане…',
        noOptionsText: 'Няма налични опции',
        openText: 'Отвори',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Затвори',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Пагинация',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Към '}страница ${page}`;
          }
          if (type === 'first') {
            return 'Отиди на първата страница';
          }
          if (type === 'last') {
            return 'Отиди на последната страница';
          }
          if (type === 'next') {
            return 'Отиди на следващата страница';
          }
          // if (type === 'previous') {
          return 'Отиди на предишната страница';
        },
      },
    },
  },
};
