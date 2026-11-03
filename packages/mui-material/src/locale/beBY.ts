import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('be-BY');

export const beBY: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Паказаць шлях',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перайсці на першую старонку';
          }
          if (type === 'last') {
            return 'Перайсці на апошнюю старонку';
          }
          if (type === 'next') {
            return 'Перайсці на наступную старонку';
          }
          // if (type === 'previous') {
          return 'Перайсці на папярэднюю старонку';
        },
        labelRowsPerPage: 'Радкоў на старонцы:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} з ${count !== -1 ? formatNumber(count) : `больш чым ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Зорак';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5 && (value < 10 || value > 20)) {
            pluralForm = 'Зоркі';
          } else if (lastDigit === 1 && value % 100 !== 11) {
            pluralForm = 'Зорка';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Рэйтынг адсутнічае',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Ачысціць',
        closeText: 'Закрыць',
        loadingText: 'Загрузка…',
        noOptionsText: 'Няма варыянтаў',
        openText: 'Адкрыць',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Закрыць',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навігацыя па старонкам',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) {
              return `${page} старонка`;
            }
            return `Перайсці на ${page} старонку`;
          }
          if (type === 'first') {
            return 'Перайсці на першую старонку';
          }
          if (type === 'last') {
            return 'Перайсці на апошнюю старонку';
          }
          if (type === 'next') {
            return 'Перайсці на наступную старонку';
          }
          // if (type === 'previous') {
          return 'Перайсці на папярэднюю старонку';
        },
      },
    },
  },
};
