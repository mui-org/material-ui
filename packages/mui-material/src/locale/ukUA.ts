import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('uk-UA');

export const ukUA: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показати шлях сторінок',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }
          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }
          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          }
          // if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        },
        labelRowsPerPage: 'Рядків на сторінці:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} з ${count !== -1 ? formatNumber(count) : `понад ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Зірок';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Зірки';
          } else if (lastDigit === 1) {
            pluralForm = 'Зірка';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Рейтинг відсутній',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистити',
        closeText: 'Згорнути',
        loadingText: 'Завантаження…',
        noOptionsText: 'Немає варіантів',
        openText: 'Розгорнути',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Згорнути',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навігація сторінками',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Перейти на '}сторінку ${page}`;
          }
          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }
          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }
          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          }
          // if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        },
      },
    },
  },
};
