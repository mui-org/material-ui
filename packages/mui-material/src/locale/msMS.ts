import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ms-MS');

// Malay-Melayu
export const msMS: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Tunjukkan laluan',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Pergi ke halaman pertama';
          }
          if (type === 'last') {
            return 'Pergi ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Pergi ke halaman seterusnya';
          }
          // if (type === 'previous') {
          return 'Pergi ke halaman sebelumnya';
        },
        labelRowsPerPage: 'Baris setiap halaman:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} daripada ${count !== -1 ? formatNumber(count) : `lebih daripada ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          const lastDigit = value % 10;
          return `${value} Bintang${lastDigit === 1 ? 's' : ''}`;
        },
        emptyLabelText: 'kosong',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Jelas',
        closeText: 'tutup',
        loadingText: 'Memuatkan…',
        noOptionsText: 'Tiada pilihan',
        openText: 'Buka',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'tutup',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigasi penomboran',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Pergi ke '}muka surat ${page}`;
          }
          if (type === 'first') {
            return 'Pergi ke halaman pertama';
          }
          if (type === 'last') {
            return 'Pergi ke halaman terakhir';
          }
          if (type === 'next') {
            return 'Pergi ke halaman seterusnya';
          }
          // if (type === 'previous') {
          return 'Pergi ke halaman sebelumnya';
        },
      },
    },
  },
};
