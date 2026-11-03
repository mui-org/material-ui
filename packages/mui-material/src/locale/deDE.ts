import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('de-DE');

export const deDE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pfad anzeigen',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Zur ersten Seite';
          }
          if (type === 'last') {
            return 'Zur letzten Seite';
          }
          if (type === 'next') {
            return 'Zur nächsten Seite';
          }
          // if (type === 'previous') {
          return 'Zur vorherigen Seite';
        },
        labelRowsPerPage: 'Zeilen pro Seite:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} von ${count !== -1 ? formatNumber(count) : `mehr als ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Sterne' : 'Stern'}`,
        emptyLabelText: 'Keine Wertung',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Leeren',
        closeText: 'Schließen',
        loadingText: 'Wird geladen…',
        noOptionsText: 'Keine Optionen',
        openText: 'Öffnen',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Schließen',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigation via Seitennummerierung',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gehe zu '}Seite ${page}`;
          }
          if (type === 'first') {
            return 'Zur ersten Seite';
          }
          if (type === 'last') {
            return 'Zur letzten Seite';
          }
          if (type === 'next') {
            return 'Zur nächsten Seite';
          }
          // if (type === 'previous') {
          return 'Zur vorherigen Seite';
        },
      },
    },
  },
};
