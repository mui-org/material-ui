import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('nb-NO');

export const nbNO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Vis sti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til forrige side';
        },
        labelRowsPerPage: 'Rader per side:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} av ${count !== -1 ? formatNumber(count) : `mer enn ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stjerne${value !== 1 ? 'r' : ''}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tøm',
        closeText: 'Lukk',
        loadingText: 'Laster inn…',
        noOptionsText: 'Ingen alternativer',
        openText: 'Åpne',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Lukk',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Paginering navigasjon',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå til '}side ${page}`;
          }
          if (type === 'first') {
            return 'Gå til første side';
          }
          if (type === 'last') {
            return 'Gå til siste side';
          }
          if (type === 'next') {
            return 'Gå til neste side';
          }
          // if (type === 'previous') {
          return 'Gå til forrige side';
        },
      },
    },
  },
};
