import type { Localization } from './utils/LocaleTextApi';

export const azAZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göstər',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }
          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }
          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          }
          // if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        },
        labelRowsPerPage: 'Səhifəyə düşən sətrlər:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} dən ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Ulduz';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Ulduzlar';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Boş',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Silmək',
        closeText: 'Bağlamaq',
        loadingText: 'Yüklənir…',
        noOptionsText: 'Seçimlər mövcud deyil',
        openText: 'Открыть',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bağlamaq',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Səhifənin naviqasiyası',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page} ${selected ? 'səhifə' : 'səhifəyə keç'}`;
          }
          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }
          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }
          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          }
          // if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        },
      },
    },
  },
};
