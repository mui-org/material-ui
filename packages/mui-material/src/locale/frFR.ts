import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('fr-FR');

export const frFR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Montrer le chemin',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Aller à la première page';
          }
          if (type === 'last') {
            return 'Aller à la dernière page';
          }
          if (type === 'next') {
            return 'Aller à la page suivante';
          }
          // if (type === 'previous') {
          return 'Aller à la page précédente';
        },
        labelRowsPerPage: 'Lignes par page :',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} sur ${count !== -1 ? formatNumber(count) : `plus que ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Etoile${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vide',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vider',
        closeText: 'Fermer',
        loadingText: 'Chargement…',
        noOptionsText: 'Pas de résultats',
        openText: 'Ouvrir',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fermer',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'navigation de pagination',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Aller à la '}page ${page}`;
          }
          if (type === 'first') {
            return 'Aller à la première page';
          }
          if (type === 'last') {
            return 'Aller à la dernière page';
          }
          if (type === 'next') {
            return 'Aller à la page suivante';
          }
          // if (type === 'previous') {
          return 'Aller à la page précédente';
        },
      },
    },
  },
};
