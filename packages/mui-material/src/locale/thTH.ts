import type { Localization } from './utils/LocaleTextApi';
import buildFormatNumber from './utils/buildFormatNumber';

const formatNumber = buildFormatNumber('th-TH');

export const thTH: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'แสดงเส้นทาง',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'ไปที่หน้าแรก';
          }
          if (type === 'last') {
            return 'ไปที่หน้าสุดท้าย';
          }
          if (type === 'next') {
            return 'ไปที่หน้าถัดไป';
          }
          // if (type === 'previous') {
          return 'ไปที่หน้าก่อน';
        },
        labelRowsPerPage: 'จำนวนแถวต่อหน้า:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${formatNumber(from)}–${formatNumber(to)} จาก ${count !== -1 ? formatNumber(count) : `มากกว่า ${formatNumber(to)}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ดาว`,
        emptyLabelText: 'ว่างเปล่า',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'เคลียร์',
        closeText: 'ปิด',
        loadingText: 'กำลังโหลด…',
        noOptionsText: 'ไม่มีตัวเลือก',
        openText: 'เปิด',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'ปิด',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ไปที่'}หน้า ${page}`;
          }
          if (type === 'first') {
            return 'ไปที่หน้าแรก';
          }
          if (type === 'last') {
            return 'ไปที่หน้าสุดท้าย';
          }
          if (type === 'next') {
            return 'ไปที่หน้าถัดไป';
          }
          // if (type === 'previous') {
          return 'ไปที่หน้าก่อน';
        },
      },
    },
  },
};
