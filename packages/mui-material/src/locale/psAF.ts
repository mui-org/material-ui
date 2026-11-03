import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('ps-AF');

export const psAF: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'لاره ښکاره کړه',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'لومړۍ پاڼې ته لاړ شه';
          }
          if (type === 'last') {
            return 'ورستۍ پاڼې ته لاړ شه';
          }
          if (type === 'next') {
            return 'بلی پاڼې ته لاړ شه';
          }
          // if (type === 'previous') {
          return 'مخکینۍ پاڼې ته لاړ شه';
        },
        labelRowsPerPage: 'په پاڼه کی د کرښو شمیر',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? formatNumber(count) : `${formatNumber(to)} زیات له`} ${formatNumber(to)}- ${formatNumber(from)} د`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستوری`,
        emptyLabelText: 'خالی',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'پاک کول',
        closeText: 'تړل',
        loadingText: '… لوډ کیږی',
        noOptionsText: 'بی پایلی',
        openText: 'خلاصول',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'تړل',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'د پاڼو ترتیب',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : ' ته لاړ شه'}پاڼې ${page}`;
          }
          if (type === 'first') {
            return 'لومړۍ پاڼی ته لاړ شه';
          }
          if (type === 'last') {
            return 'وروستۍ پاڼې ته لاړه شه';
          }
          if (type === 'next') {
            return 'بلې پاڼې ته لاړ شه';
          }
          // if (type === 'previous') {
          return 'مخکنۍ پاڼې ته لاړ شه';
        },
      },
    },
  },
};
