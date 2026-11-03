import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('pt-BR');

export const ptBR: Localization = {
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
            return 'Ir para a primeira página';
          }
          if (type === 'last') {
            return 'Ir para a última página';
          }
          if (type === 'next') {
            return 'Ir para a próxima página';
          }
          // if (type === 'previous') {
          return 'Ir para a página anterior';
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
        loadingText: 'Carregando…',
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
        'aria-label': 'Navegar pela paginação',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ir para a '}página ${page}`;
          }
          if (type === 'first') {
            return 'Ir para a primeira página';
          }
          if (type === 'last') {
            return 'Ir para a última página';
          }
          if (type === 'next') {
            return 'Ir para a próxima página';
          }
          // if (type === 'previous') {
          return 'Ir para a página anterior';
        },
      },
    },
  },
};
