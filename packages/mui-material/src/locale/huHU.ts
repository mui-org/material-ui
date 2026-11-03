import type { Localization } from './utils/LocaleTextApi';

export const huHU: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Útvonal',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Első oldalra';
          }
          if (type === 'last') {
            return 'Utolsó oldalra';
          }
          if (type === 'next') {
            return 'Következő oldalra';
          }
          // if (type === 'previous') {
          return 'Előző oldalra';
        },
        labelRowsPerPage: 'Sorok száma:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Csillag`,
        emptyLabelText: 'Üres',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Törlés',
        closeText: 'Bezárás',
        loadingText: 'Töltés…',
        noOptionsText: 'Nincs találat',
        openText: 'Megnyitás',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bezárás',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Lapozás',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page}. oldal${selected ? '' : 'ra'}`;
          }
          if (type === 'first') {
            return 'Első oldalra';
          }
          if (type === 'last') {
            return 'Utolsó oldalra';
          }
          if (type === 'next') {
            return 'Következő oldalra';
          }
          // if (type === 'previous') {
          return 'Előző oldalra';
        },
      },
    },
  },
};
