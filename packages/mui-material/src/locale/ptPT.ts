import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('pt-PT');

export const ptPT: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar caminho',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Primeira página';
          }
          if (type === 'last') {
            return 'Última página';
          }
          if (type === 'next') {
            return 'Próxima página';
          }
          // if (type === 'previous') {
          return 'Página anterior';
        },
        labelRowsPerPage: 'Linhas por página:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} de ${count !== -1 ? formatNumber(count) : `mais de ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Estrela${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vazio',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpar',
        closeText: 'Fechar',
        loadingText: 'A carregar…',
        noOptionsText: 'Sem opções',
        openText: 'Abrir',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Fechar',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navegar por páginas',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ir para a '}página ${page}`;
          }
          if (type === 'first') {
            return 'Primeira página';
          }
          if (type === 'last') {
            return 'Última página';
          }
          if (type === 'next') {
            return 'Próxima página';
          }
          // if (type === 'previous') {
          return 'Página anterior';
        },
      },
    },
  },
};
