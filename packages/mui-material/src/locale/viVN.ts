import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('vi-VN');

export const viVN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mở ra',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Tới trang đầu tiên';
          }
          if (type === 'last') {
            return 'Tới trang cuối cùng';
          }
          if (type === 'next') {
            return 'Tới trang tiếp theo';
          }
          // if (type === 'previous') {
          return 'Về trang trước đó';
        },
        labelRowsPerPage: 'Số hàng mỗi trang:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} trong ${count !== -1 ? formatNumber(count) : `nhiều hơn ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} sao`,
        emptyLabelText: 'Không có dữ liệu',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Xóa',
        closeText: 'Đóng',
        loadingText: 'Đang tải…',
        noOptionsText: 'Không có lựa chọn nào',
        openText: 'Mở',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Đóng',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Thanh điều khiển trang',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Tới '}trang ${page}`;
          }
          if (type === 'first') {
            return 'Tới trang đầu tiên';
          }
          if (type === 'last') {
            return 'Tới trang cuối cùng';
          }
          if (type === 'next') {
            return 'Tới trang tiếp theo';
          }
          // if (type === 'previous') {
          return 'Về trang trước đó';
        },
      },
    },
  },
};
