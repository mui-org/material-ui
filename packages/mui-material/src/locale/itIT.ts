import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('it-IT');

export const itIT: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visualizza percorso',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Vai alla prima pagina';
          }
          if (type === 'last') {
            return "Vai all'ultima pagina";
          }
          if (type === 'next') {
            return 'Vai alla pagina successiva';
          }
          // if (type === 'previous') {
          return 'Vai alla pagina precedente';
        },
        labelRowsPerPage: 'Righe per pagina:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} di ${count !== -1 ? formatNumber(count) : `più di ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Stell${value !== 1 ? 'e' : 'a'}`,
        emptyLabelText: 'Vuoto',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Svuota',
        closeText: 'Chiudi',
        loadingText: 'Caricamento in corso…',
        noOptionsText: 'Nessuna opzione',
        openText: 'Apri',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Chiudi',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigazione impaginata',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Vai alla '}pagina ${page}`;
          }
          if (type === 'first') {
            return 'Vai alla prima pagina';
          }
          if (type === 'last') {
            return "Vai all'ultima pagina";
          }
          if (type === 'next') {
            return 'Vai alla pagina successiva';
          }
          // if (type === 'previous') {
          return 'Vai alla pagina precedente';
        },
      },
    },
  },
};
