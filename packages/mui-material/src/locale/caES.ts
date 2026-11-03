import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ca-ES');

export const caES: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostra el camí',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ves a la primera pàgina';
          }
          if (type === 'last') {
            return "Ves a l'última pàgina";
          }
          if (type === 'next') {
            return 'Ves a la pàgina següent';
          }
          // if (type === 'previous') {
          return 'Ves a la pàgina anterior';
        },
        labelRowsPerPage: 'Files per pàgina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} de ${count !== -1 ? formatNumber(count) : `més de ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Estrelles' : 'Estrella'}`,
        emptyLabelText: 'Buit',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Netejar',
        closeText: 'Tancar',
        loadingText: 'Carregant…',
        noOptionsText: 'Sense opcions',
        openText: 'Obert',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tancat',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navegació entre pàgines',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ves a la '}pàgina ${page}`;
          }
          if (type === 'first') {
            return 'Ves a la primera pàgina';
          }
          if (type === 'last') {
            return "Ves a l'última pàgina";
          }
          if (type === 'next') {
            return 'Ves a la pàgina següent';
          }
          // if (type === 'previous') {
          return 'Ves a la pàgina anterior';
        },
      },
    },
  },
};
