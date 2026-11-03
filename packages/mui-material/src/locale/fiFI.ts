import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('fi-FI');

export const fiFI: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näytä reitti',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Mene ensimmäiselle sivulle';
          }
          if (type === 'last') {
            return 'Mene viimeiselle sivulle';
          }
          if (type === 'next') {
            return 'Mene seuraavalle sivulle';
          }
          // if (type === 'previous') {
          return 'Mene edelliselle sivulle';
        },
        labelRowsPerPage: 'Rivejä per sivu:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} / ${count !== -1 ? formatNumber(count) : `enemmän kuin ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Täht${value !== 1 ? 'eä' : 'i'}`,
        emptyLabelText: 'Tyhjä',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tyhjennä',
        closeText: 'Sulje',
        loadingText: 'Ladataan…',
        noOptionsText: 'Ei valintoja',
        openText: 'Avaa',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulje',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sivutus navigaatio',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? 'sivu' : 'Mene sivulle'} ${page}`;
          }
          if (type === 'first') {
            return 'Mene ensimmäiselle sivulle';
          }
          if (type === 'last') {
            return 'Mene viimeiselle sivulle';
          }
          if (type === 'next') {
            return 'Mene seuraavalle sivulle';
          }
          // if (type === 'previous') {
          return 'Mene edelliselle sivulle';
        },
      },
    },
  },
};
