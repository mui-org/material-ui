import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ru-RU');

export const ruRU: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показать полный путь',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }
          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }
          if (type === 'next') {
            return 'Перейти на следующую страницу';
          }
          // if (type === 'previous') {
          return 'Перейти на предыдущую страницу';
        },
        labelRowsPerPage: 'Строк на странице:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} из ${count !== -1 ? formatNumber(count) : `более чем ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Звёзд';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Звезды';
          } else if (lastDigit === 1) {
            pluralForm = 'Звезда';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Рейтинг отсутствует',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистить',
        closeText: 'Закрыть',
        loadingText: 'Загрузка…',
        noOptionsText: 'Нет доступных вариантов',
        openText: 'Открыть',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Закрыть',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навигация по страницам',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) {
              return `${page} страница`;
            }
            return `Перейти на ${page} страницу`;
          }
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }
          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }
          if (type === 'next') {
            return 'Перейти на следующую страницу';
          }
          // if (type === 'previous') {
          return 'Перейти на предыдущую страницу';
        },
      },
    },
  },
};
