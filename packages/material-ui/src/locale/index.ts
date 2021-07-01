import { ComponentsPropsList } from '../styles/props';

export interface Localization {
  components?: {
    MuiAlert?: {
      defaultProps: Pick<ComponentsPropsList['MuiAlert'], 'closeText'>;
    };
    MuiBreadcrumbs?: { defaultProps: Pick<ComponentsPropsList['MuiBreadcrumbs'], 'expandText'> };
    MuiTablePagination?: {
      defaultProps: Pick<
        ComponentsPropsList['MuiTablePagination'],
        'labelRowsPerPage' | 'labelDisplayedRows' | 'getItemAriaLabel'
      >;
    };
    MuiRating?: {
      defaultProps: Pick<ComponentsPropsList['MuiRating'], 'emptyLabelText' | 'getLabelText'>;
    };
    MuiAutocomplete?: {
      defaultProps: Pick<
        ComponentsPropsList['MuiAutocomplete'],
        'clearText' | 'closeText' | 'loadingText' | 'noOptionsText' | 'openText'
      >;
    };
    // The core package has no dependencies on the @material-ui/lab components.
    // We can't use ComponentsPropsList, we have to duplicate and inline the definitions.
    MuiPagination?: {
      defaultProps: Pick<ComponentsPropsList['MuiPagination'], 'aria-label' | 'getItemAriaLabel'>;
    };
  };
}

export const arEG: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'إظهر العنوان',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'إذهب الى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'إذهب الي الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'إذهب الى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'إذهب الى الصفحة السابقة';
        },
        labelRowsPerPage: 'عدد الصفوف في الصفحة:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} من ${count !== -1 ? count : ` أكثر من${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'نجوم' : 'نجمة'}`,
        emptyLabelText: 'فارغ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'مسح',
        closeText: 'إغلاق',
        loadingText: 'يتم التحميل…',
        noOptionsText: 'لا يوجد خيارات',
        openText: 'فتح',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'إغلاق',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'التنقل عبر الصفحات',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'إذهب إلى '} صفحة ${page}`;
          }
          if (type === 'first') {
            return 'إذهب الى الصفحة الأولى';
          }
          if (type === 'last') {
            return 'إذهب الي الصفحة الأخيرة';
          }
          if (type === 'next') {
            return 'إذهب الى الصفحة التالية';
          }
          // if (type === 'previous') {
          return 'إذهب الى الصفحة السابقة';
        },
      },
    },
  },
};

export const azAZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göstər',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }
          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }
          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          }
          // if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        },
        labelRowsPerPage: 'Səhifəyə düşən sətrlər:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} dən ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Ulduz';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Ulduzlar';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Boş',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Silmək',
        closeText: 'Bağlamaq',
        loadingText: 'Yüklənir…',
        noOptionsText: 'Seçimlər mövcud deyil',
        openText: 'Открыть',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bağlamaq',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Səhifənin naviqasiyası',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page} ${selected ? 'səhifə' : 'səhifəyə keç'}`;
          }
          if (type === 'first') {
            return 'Birinci səhifəyə keç';
          }
          if (type === 'last') {
            return 'Sonuncu səhifəyə keç';
          }
          if (type === 'next') {
            return 'Növbəti səhifəyə keç';
          }
          // if (type === 'previous') {
          return 'Əvvəlki səhifəyə keç';
        },
      },
    },
  },
};

export const bnBD: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'পথ দেখান',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }
          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }
          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          }
          // if (type === 'previous') {
          return 'আগের পৃষ্ঠায় যান';
        },
        labelRowsPerPage: 'প্রতি পৃষ্ঠায় সারি:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} / ${count !== -1 ? count : `${to} থেকে বেশি`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} স্টার`,
        emptyLabelText: 'খালি',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'পরিষ্কার করুন',
        closeText: 'বন্ধ করুন',
        loadingText: 'লোড হচ্ছে…',
        noOptionsText: 'কোন অপশন নেই',
        openText: 'ওপেন করুন',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'বন্ধ করুন',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'পেজিনেশন নেভিগেশন',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'যান '}পৃষ্ঠা ${page}-এ`;
          }
          if (type === 'first') {
            return 'প্রথম পৃষ্ঠায় যান';
          }
          if (type === 'last') {
            return 'শেষ পৃষ্ঠায় যান';
          }
          if (type === 'next') {
            return 'পরবর্তী পৃষ্ঠায় যান';
          }
          // if (type === 'previous') {
          return 'আগের পৃষ্ঠায় যান';
        },
      },
    },
  },
};

export const bgBG: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показване на пътя',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Отиди на първата страница';
          }
          if (type === 'last') {
            return 'Отиди на последната страница';
          }
          if (type === 'next') {
            return 'Отиди на следващата страница';
          }
          // if (type === 'previous') {
          return 'Отиди на предишната страница';
        },
        labelRowsPerPage: 'Редове на страница:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} от ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Звезд${value !== 1 ? 'и' : 'а'}`,
        emptyLabelText: 'Изчисти',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Изчисти',
        closeText: 'Затвори',
        loadingText: 'Зареждане…',
        noOptionsText: 'Няма налични опции',
        openText: 'Отвори',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Затвори',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Пагинация',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Към '}страница ${page}`;
          }
          if (type === 'first') {
            return 'Отиди на първата страница';
          }
          if (type === 'last') {
            return 'Отиди на последната страница';
          }
          if (type === 'next') {
            return 'Отиди на следващата страница';
          }
          // if (type === 'previous') {
          return 'Отиди на предишната страница';
        },
      },
    },
  },
};

export const caES: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //    expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Files per pàgina:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Estrelles' : 'Estrella'}`,
        emptyLabelText: 'Buit',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Netejar',
        closeText: 'Tancar',
        loadingText: 'Carregant…',
        noOptionsText: 'Sense opcions',
        openText: 'Obert',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tancat',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const csCZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázat cestu',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Jít na první stránku';
          }
          if (type === 'last') {
            return 'Jít na poslední stránku';
          }
          if (type === 'next') {
            return 'Jít na další stránku';
          }
          // if (type === 'previous') {
          return 'Jít na předchozí stránku';
        },
        labelRowsPerPage: 'Řádků na stránce:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} z ${count !== -1 ? count : `více než ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          if (value === 1) {
            return `${value} hvězdička`;
          }
          if (value >= 2 && value <= 4) {
            return `${value} hvězdičky`;
          }
          return `${value} hvězdiček`;
        },
        emptyLabelText: 'Prázdné',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazat',
        closeText: 'Zavřít',
        loadingText: 'Načítání…',
        noOptionsText: 'Žádné možnosti',
        openText: 'Otevřít',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavřít',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigace stránkováním',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Jít na '}${page} stránku`;
          }
          if (type === 'first') {
            return 'Jít na první stránku';
          }
          if (type === 'last') {
            return 'Jít na poslední stránku';
          }
          if (type === 'next') {
            return 'Jít na další stránku';
          }
          // if (type === 'previous') {
          return 'Jít na předchozí stránku';
        },
      },
    },
  },
};

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
          `${from}-${to} von ${count !== -1 ? count : `mehr als ${to}`}`,
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

export const elGR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Εμφάνιση διαδρομής',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }
          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }
          if (type === 'next') {
            return 'Επόμενη σελίδα';
          }

          // if (type === "previous") {
          return 'Προηγούμενη σελίδα';
        },
        labelRowsPerPage: 'Γραμμές ανα σελίδα:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} από ${count !== -1 ? count : `πάνω από ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Αστέρι${value !== 1 ? 'α' : ''}`,
        emptyLabelText: 'Χωρίς βαθμολόγηση',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Καθαρισμός',
        closeText: 'Κλείσιμο',
        loadingText: 'Φόρτωση…',
        noOptionsText: 'Δεν υπάρχουν επιλογές',
        openText: 'Άνοιγμα',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Κλείσιμο',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Πλοήγηση σε σελίδες',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Μετάβαση '}σελίδα ${page}`;
          }
          if (type === 'first') {
            return 'Πρώτη σελίδα';
          }
          if (type === 'last') {
            return 'Τελευταία σελίδα';
          }
          if (type === 'next') {
            return 'Επόμενη σελίδα';
          }

          // if (type === "previous") {
          return 'Προηγούμενη σελίδα';
        },
      },
    },
  },
};

// default
export const enUS: Localization = {
  /*
  components: {
    MuiBreadcrumbs: { defaultProps: {
      expandText: 'Show path',
    }},
    MuiTablePagination: { defaultProps: { 
      getItemAriaLabel: (type) => {
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
      labelRowsPerPage: 'Rows per page:',
      labelDisplayedRows: ({ from, to, count }) =>
  `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
    }},
    MuiRating: { defaultProps: { 
      getLabelText: value => `${value} Star${value !== 1 ? 's' : ''}`,
      emptyLabelText: 'Empty',
    }},
    MuiAutocomplete: { defaultProps: { 
      clearText: 'Clear',
      closeText: 'Close',
      loadingText: 'Loading…',
      noOptionsText: 'No options',
      openText: 'Open',
    }},
    MuiAlert: { defaultProps: { 
      closeText: 'Close',
    }},
    MuiPagination: {  defaultProps: { 
      'aria-label': 'Pagination navigation',
      getItemAriaLabel: (type, page, selected) => {
        if (type === 'page') {
          return `${selected ? '' : 'Go to '}page ${page}`;
        }
        if (type === 'first') {
          return 'Go to first page';
        }
        if (type === 'last') {
          return 'Go to last page';
        }
        if (type === 'next') {
          return 'Go to next page';
        }
        // if (type === 'previous') {
        return 'Go to previous page';
      },
    },
  },
*/
};

export const esES: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Mostrar ruta',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ir a la primera página';
          }
          if (type === 'last') {
            return 'Ir a la última página';
          }
          if (type === 'next') {
            return 'Ir a la página siguiente';
          }
          // if (type === 'previous') {
          return 'Ir a la página anterior';
        },
        labelRowsPerPage: 'Filas por página:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Estrella${value !== 1 ? 's' : ''}`,
        emptyLabelText: 'Vacío',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Limpiar',
        closeText: 'Cerrar',
        loadingText: 'Cargando…',
        noOptionsText: 'Sin opciones',
        openText: 'Abierto',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Cerrar',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Paginador',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ir a la '}página ${page}`;
          }
          if (type === 'first') {
            return 'Ir a la primera página';
          }
          if (type === 'last') {
            return 'Ir a la última página';
          }
          if (type === 'next') {
            return 'Ir a la página siguiente';
          }
          // if (type === 'previous') {
          return 'Ir a la página anterior';
        },
      },
    },
  },
};

export const etEE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Näita teed',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }
          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }
          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          }
          // if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        },
        labelRowsPerPage: 'Ridu leheküljel:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Tärn${value !== 1 ? 'i' : ''}`,
        emptyLabelText: 'Tühi',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Tühjenda',
        closeText: 'Sulge',
        loadingText: 'Laen…',
        noOptionsText: 'Valikuid ei ole',
        openText: 'Ava',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sulge',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Lehekülgede valik',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Vali '}lehekülg ${page}`;
          }
          if (type === 'first') {
            return 'Vali esimene lehekülg';
          }
          if (type === 'last') {
            return 'Vali viimane lehekülg';
          }
          if (type === 'next') {
            return 'Vali järgmine lehekülg';
          }
          // if (type === 'previous') {
          return 'Vali eelmine lehekülg';
        },
      },
    },
  },
};

export const faIR: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'نمایش مسیر',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'رفتن به اولین صفحه';
          }
          if (type === 'last') {
            return 'رفتن به آخرین صفحه';
          }
          if (type === 'next') {
            return 'رفتن به صفحه‌ی بعدی';
          }
          // if (type === 'previous') {
          return 'رفتن به صفحه‌ی قبلی';
        },
        labelRowsPerPage: 'تعداد سطرهای هر صفحه:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} از ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستاره`,
        emptyLabelText: 'خالی',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'پاک‌کردن',
        closeText: 'بستن',
        loadingText: 'در حال بارگذاری…',
        noOptionsText: 'بی‌نتیجه',
        openText: 'بازکردن',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'بستن',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ناوبری صفحه',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'رفتن به '}صفحهٔ ${page}`;
          }
          if (type === 'first') {
            return 'رفتن به اولین صفحه';
          }
          if (type === 'last') {
            return 'رفتن به آخرین صفحه';
          }
          if (type === 'next') {
            return 'رفتن به صفحه‌ی بعدی';
          }
          // if (type === 'previous') {
          return 'رفتن به صفحه‌ی قبلی';
        },
      },
    },
  },
};

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
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
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
          `${from}-${to} sur ${count !== -1 ? count : `plus que ${to}`}`,
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

export const heIL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'הצג נתיב',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'לעמוד הראשון';
          }
          if (type === 'last') {
            return 'לעמוד האחרון';
          }
          if (type === 'next') {
            return 'לעמוד הבא';
          }
          // if (type === 'previous') {
          return 'לעמוד הקודם';
        },
        labelRowsPerPage: 'שורות בעמוד:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} כוכב${value !== 1 ? 'ים' : ''}`,
        emptyLabelText: 'ריק',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'נקה',
        closeText: 'סגור',
        loadingText: 'טוען…',
        noOptionsText: 'אין אופציות',
        openText: 'פתח',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'סגור',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ניווט בעמודים',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'ל '}עמוד ${page}`;
          }
          if (type === 'first') {
            return 'לעמוד הראשון';
          }
          if (type === 'last') {
            return 'לעמוד האחרון';
          }
          if (type === 'next') {
            return 'לעמוד הבא';
          }
          // if (type === 'previous') {
          return 'לעמוד הקודם';
        },
      },
    },
  },
};

export const hiIN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'रास्ता दिखायें',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }
          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }
          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          }
          // if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        },
        labelRowsPerPage: 'पंक्तियाँ प्रति पृष्ठ:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to === -1 ? count : to} कुल ${count} में`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} तार${value !== 1 ? 'े' : 'ा'}`,
        emptyLabelText: 'रिक्त',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'हटायें',
        closeText: 'बंद करें',
        loadingText: 'लोड हो रहा है…',
        noOptionsText: 'कोई विकल्प नहीं',
        openText: 'खोलें',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'बंद करें',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'पृस्ठानुसार संचालन',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `पृष्ठ ${page} ${selected ? '' : ' पर जाएँ'}`;
          }
          if (type === 'first') {
            return 'पहले पृष्ठ पर जाएँ';
          }
          if (type === 'last') {
            return 'अंतिम पृष्ठ पर जाएँ';
          }
          if (type === 'next') {
            return 'अगले पृष्ठ पर जाएँ';
          }
          // if (type === 'previous') {
          return 'पिछले पृष्ठ पर जाएँ';
        },
      },
    },
  },
};

export const huHU: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Útvonal',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Első oldalra';
          }
          if (type === 'last') {
            return 'Utolsó oldalra';
          }
          if (type === 'next') {
            return 'Következő oldalra';
          }
          // if (type === 'previous') {
          return 'Előző oldalra';
        },
        labelRowsPerPage: 'Sorok száma:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Csillag`,
        emptyLabelText: 'Üres',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Törlés',
        closeText: 'Bezárás',
        loadingText: 'Töltés…',
        noOptionsText: 'Nincs találat',
        openText: 'Megnyitás',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Bezárás',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Lapozás',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page}. oldal${selected ? '' : 'ra'}`;
          }
          if (type === 'first') {
            return 'Első oldalra';
          }
          if (type === 'last') {
            return 'Utolsó oldalra';
          }
          if (type === 'next') {
            return 'Következő oldalra';
          }
          // if (type === 'previous') {
          return 'Előző oldalra';
        },
      },
    },
  },
};

export const hyAM: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Տողեր մեկ էջում`',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Աստղ`,
        emptyLabelText: 'Դատարկ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Մաքրել',
        closeText: 'Փակել',
        loadingText: 'Բեռնում…',
        noOptionsText: 'Տարբերակներ չկան',
        openText: 'Բացել',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Փակել',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const idID: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Baris per halaman:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} dari ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Bintang`,
        // emptyLabelText: 'Empty',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hapus',
        closeText: 'Tutup',
        loadingText: 'Memuat…',
        noOptionsText: 'Tidak ada opsi',
        openText: 'Buka',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Tutup',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const isIS: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //    expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Raðir á síðu:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} af ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value === 1 ? 'Stjarna' : 'Stjörnur'}`,
        emptyLabelText: 'Tómt',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Hreinsa',
        closeText: 'Loka',
        loadingText: 'Hlaða…',
        noOptionsText: 'Engar niðurstöður',
        openText: 'Opna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Loka',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

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
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} di ${count !== -1 ? count : `more than ${to}`}`,
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

export const jaJP: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'すべて表示',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '最初のページへ';
          }
          if (type === 'last') {
            return '最後のページへ';
          }
          if (type === 'next') {
            return '次のページへ';
          }
          // if (type === 'previous') {
          return '前のページへ';
        },
        labelRowsPerPage: 'ページあたりの行数:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}～${to} / ${count !== -1 ? count : `${to}以上`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `星${value}`,
        emptyLabelText: '星なし',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'クリア',
        closeText: '閉じる',
        loadingText: '読み込み中…',
        noOptionsText: 'データがありません',
        openText: '開く',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '閉じる',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'ページ選択',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `ページ${page}${selected ? '' : 'へ'}`;
          }
          if (type === 'first') {
            return '最初のページへ';
          }
          if (type === 'last') {
            return '最後のページへ';
          }
          if (type === 'next') {
            return '次のページへ';
          }
          // if (type === 'previous') {
          return '前のページへ';
        },
      },
    },
  },
};

export const koKR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '경로 보기',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }
          if (type === 'last') {
            return '마지막 페이지로 이동';
          }
          if (type === 'next') {
            return '다음 페이지로 이동';
          }
          // if (type === 'previous') {
          return '이전 페이지로 이동';
        },
        labelRowsPerPage: '페이지 당 행:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} / ${count !== -1 ? count : `${to}개 이상`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 점`,
        emptyLabelText: '빈 텍스트',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '지우기',
        closeText: '닫기',
        loadingText: '불러오는 중…',
        noOptionsText: '옵션 없음',
        openText: '열기',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '닫기',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': '페이지네이션 네비게이션',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page} 번째 페이지${selected ? '' : '로 이동'}`;
          }
          if (type === 'first') {
            return '첫 번째 페이지로 이동';
          }
          if (type === 'last') {
            return '마지막 페이지로 이동';
          }
          if (type === 'next') {
            return '다음 페이지로 이동';
          }
          // if (type === 'previous') {
          return '이전 페이지로 이동';
        },
      },
    },
  },
};

export const kzKZ: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Толық жолды көрсету',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }
          if (type === 'last') {
            return 'Соңғы бетке өту';
          }
          if (type === 'next') {
            return 'Келесі бетке өту';
          }
          // if (type === 'previous') {
          return 'Алдыңғы бетке өту';
        },
        labelRowsPerPage: 'Беттегі қатарлар:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${count !== -1 ? count : `+${to}`} қатардың ішінен ${from}-${to}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} жұлдыз`,
        emptyLabelText: 'Рейтинг жоқ',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Тазарту',
        closeText: 'Жабу',
        loadingText: 'Жүктелуде…',
        noOptionsText: 'Қол жетімді нұсқалар жоқ',
        openText: 'Ашу',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Жабу',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Беттерді шарлау',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) return `${page} — бет`;
            return `${page} — бетке өту`;
          }
          if (type === 'first') {
            return 'Бірінші бетке өту';
          }
          if (type === 'last') {
            return 'Соңғы бетке өту';
          }
          if (type === 'next') {
            return 'Келесі бетке өту';
          }
          // if (type === 'previous') {
          return 'Алдыңғы бетке өту';
        },
      },
    },
  },
};

export const nlNL: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Regels per pagina :',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} van ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Ster${value !== 1 ? 'ren' : ''}`,
        // emptyLabelText: 'Empty',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wissen',
        closeText: 'Sluiten',
        loadingText: 'Laden…',
        noOptionsText: 'Geen opties',
        openText: 'Openen',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Sluiten',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const plPL: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Pokaż ścieżkę',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }
          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }
          if (type === 'next') {
            return 'Przejdź do następnej strony';
          }
          // if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        },
        labelRowsPerPage: 'Wierszy na stronę:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} z ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'gwiazdek';
          const lastDigit = value % 10;

          if ((value < 10 || value > 20) && lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'gwiazdki';
          } else if (value === 1) {
            pluralForm = 'gwiazdka';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Brak gwiazdek',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Wyczyść',
        closeText: 'Zamknij',
        loadingText: 'Ładowanie…',
        noOptionsText: 'Brak opcji',
        openText: 'Otwórz',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zamknij',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Nawigacja podziału na strony',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return selected ? `${page}. strona` : `Przejdź do ${page}. strony`;
          }
          if (type === 'first') {
            return 'Przejdź do pierwszej strony';
          }
          if (type === 'last') {
            return 'Przejdź do ostatniej strony';
          }
          if (type === 'next') {
            return 'Przejdź do następnej strony';
          }
          // if (type === 'previous') {
          return 'Przejdź do poprzedniej strony';
        },
      },
    },
  },
};

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
          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,
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
          `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`,
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

export const roRO: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Arată calea',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Mergi la prima pagină';
          }
          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }
          if (type === 'next') {
            return 'Mergi la pagina următoare';
          }
          // if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        },
        labelRowsPerPage: 'Rânduri pe pagină:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} din ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} St${value !== 1 ? 'ele' : 'ea'}`,
        emptyLabelText: 'Gol',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Șterge',
        closeText: 'Închide',
        loadingText: 'Se încarcă…',
        noOptionsText: 'Nicio opțiune',
        openText: 'Deschide',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Închide',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigare prin paginare',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Mergi la '}pagina ${page}`;
          }
          if (type === 'first') {
            return 'Mergi la prima pagină';
          }
          if (type === 'last') {
            return 'Mergi la ultima pagină';
          }
          if (type === 'next') {
            return 'Mergi la pagina următoare';
          }
          // if (type === 'previous') {
          return 'Mergi la pagina precedentă';
        },
      },
    },
  },
};

export const ruRU: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показать полный путь',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }
          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }
          if (type === 'next') {
            return 'Перейти на следующую страницу';
          }
          // if (type === 'previous') {
          return 'Перейти на предыдущую страницу';
        },
        labelRowsPerPage: 'Строк на странице:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} из ${count !== -1 ? count : `более чем ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Звёзд';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Звезды';
          } else if (lastDigit === 1) {
            pluralForm = 'Звезда';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Рейтинг отсутствует',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистить',
        closeText: 'Закрыть',
        loadingText: 'Загрузка…',
        noOptionsText: 'Нет доступных вариантов',
        openText: 'Открыть',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Закрыть',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навигация по страницам',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            if (selected) return `${page} страница`;
            return `Перейти на ${page} страницу`;
          }
          if (type === 'first') {
            return 'Перейти на первую страницу';
          }
          if (type === 'last') {
            return 'Перейти на последнюю страницу';
          }
          if (type === 'next') {
            return 'Перейти на следующую страницу';
          }
          // if (type === 'previous') {
          return 'Перейти на предыдущую страницу';
        },
      },
    },
  },
};

export const siLK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'ගමන් මඟ පෙන්වන්න',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }
          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }
          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          }
          // if (type === 'previous') {
          return 'පෙර පිටුවට යන්න';
        },
        labelRowsPerPage: 'පිටුවක පේළි:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} දක්වා ${count !== -1 ? count : `${to} ට වැඩි ප්‍රමාණයකින්`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `තරු ${value}`,
        emptyLabelText: 'හිස්',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'මකන්න',
        closeText: 'වසන්න',
        loadingText: 'නැංවෙමින්…',
        noOptionsText: 'විකල්ප නැත',
        openText: 'විවෘත කරන්න',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'වසන්න',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'පිටු අතර සංචරණය',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `පිටුව ${page} ${selected ? '' : 'ට යන්න'}`;
          }
          if (type === 'first') {
            return 'පළමු පිටුවට යන්න';
          }
          if (type === 'last') {
            return 'අවසාන පිටුවට යන්න';
          }
          if (type === 'next') {
            return 'මීළඟ පිටුවට යන්න';
          }
          // if (type === 'previous') {
          return 'පෙර පිටුවට යන්න';
        },
      },
    },
  },
};

export const skSK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Ukázať cestu ',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }
          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }
          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          }
          // if (type === 'previous') {
          return 'Ísť na predchádzajúcu stránku';
        },
        labelRowsPerPage: 'Riadkov na stránke:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} z ${count !== -1 ? count : `viac ako ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          if (value === 1) {
            return `${value} hviezdička`;
          }
          if (value >= 2 && value <= 4) {
            return `${value} hviezdičky`;
          }
          return `${value} hviezdičiek`;
        },
        emptyLabelText: 'Prázdne',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Vymazať',
        closeText: 'Zavrieť',
        loadingText: 'Načítanie…',
        noOptionsText: 'Žiadne možnosti',
        openText: 'Otvoriť',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Zavrieť',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Navigácia stránkovanim',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Ísť na '}stránku ${page}`;
          }
          if (type === 'first') {
            return 'Ísť na prvú stránku';
          }
          if (type === 'last') {
            return 'Ísť na poslednú stránku';
          }
          if (type === 'next') {
            return 'Ísť na ďaľšiu stránku';
          }
          // if (type === 'previous') {
          return 'Ísť na predchádzajúcu stránku';
        },
      },
    },
  },
};

export const svSE: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Visa sökväg',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Gå till första sidan';
          }
          if (type === 'last') {
            return 'Gå till sista sidan';
          }
          if (type === 'next') {
            return 'Gå till nästa sida';
          }
          // if (type === 'previous') {
          return 'Gå till föregående sida';
        },
        labelRowsPerPage: 'Rader per sida:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} av ${count !== -1 ? count : `fler än ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ${value !== 1 ? 'Stjärnor' : 'Stjärna'}`,
        emptyLabelText: 'Tom',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Rensa',
        closeText: 'Stäng',
        loadingText: 'Laddar…',
        noOptionsText: 'Inga alternativ',
        openText: 'Öppna',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Stäng',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sidnavigering',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Gå till '}sida ${page}`;
          }
          if (type === 'first') {
            return 'Gå till första sidan';
          }
          if (type === 'last') {
            return 'Gå till sista sidan';
          }
          if (type === 'next') {
            return 'Gå till nästa sida';
          }
          // if (type === 'previous') {
          return 'Gå till föregående sida';
        },
      },
    },
  },
};

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
          `${from}-${to} จาก ${count !== -1 ? count : `มากกว่า ${to}`}`,
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

export const trTR: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Yolu göster',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'İlk sayfaya git';
          }
          if (type === 'last') {
            return 'Son sayfaya git';
          }
          if (type === 'next') {
            return 'Sonraki sayfaya git';
          }
          // if (type === 'previous') {
          return 'Önceki sayfaya git';
        },
        labelRowsPerPage: 'Sayfa başına satır:',
        // labelDisplayedRows: ({ from, to, count }) =>
        //   `${from}-${to} tanesinden ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} Yıldız`,
        emptyLabelText: 'Boş',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Temizle',
        closeText: 'Kapat',
        loadingText: 'Yükleniyor…',
        noOptionsText: 'Seçenek yok',
        openText: 'Aç',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Kapat',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Sayfa navigasyonu',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${page}. ${selected ? 'sayfa' : 'sayfaya git'}`;
          }
          if (type === 'first') {
            return 'İlk sayfaya git';
          }
          if (type === 'last') {
            return 'Son sayfaya git';
          }
          if (type === 'next') {
            return 'Sonraki sayfaya git';
          }
          // if (type === 'previous') {
          return 'Önceki sayfaya git';
        },
      },
    },
  },
};

export const ukUA: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: 'Показати шлях сторінок',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }
          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }
          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          }
          // if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        },
        labelRowsPerPage: 'Рядків на сторінці:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} з ${count !== -1 ? count : `понад ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => {
          let pluralForm = 'Зірок';
          const lastDigit = value % 10;

          if (lastDigit > 1 && lastDigit < 5) {
            pluralForm = 'Зірки';
          } else if (lastDigit === 1) {
            pluralForm = 'Зірка';
          }

          return `${value} ${pluralForm}`;
        },
        emptyLabelText: 'Рейтинг відсутній',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Очистити',
        closeText: 'Згорнути',
        loadingText: 'Завантаження…',
        noOptionsText: 'Немає варіантів',
        openText: 'Розгорнути',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Згорнути',
      },
    },
    MuiPagination: {
      defaultProps: {
        'aria-label': 'Навігація сторінками',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `${selected ? '' : 'Перейти на '}сторінку ${page}`;
          }
          if (type === 'first') {
            return 'Перейти на першу сторінку';
          }
          if (type === 'last') {
            return 'Перейти на останню сторінку';
          }
          if (type === 'next') {
            return 'Перейти на наступну сторінку';
          }
          // if (type === 'previous') {
          return 'Перейти на попередню сторінку';
        },
      },
    },
  },
};

export const viVN: Localization = {
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiTablePagination: {
      defaultProps: {
        // getItemAriaLabel: (type) => {
        //   if (type === 'first') {
        //     return 'Go to first page';
        //   }
        //   if (type === 'last') {
        //     return 'Go to last page';
        //   }
        //   if (type === 'next') {
        //     return 'Go to next page';
        //   }
        //   // if (type === 'previous') {
        //   return 'Go to previous page';
        // },
        labelRowsPerPage: 'Số hàng mỗi trang:',
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}-${to} trong ${count !== -1 ? count : `nhiều hơn ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} sao`,
        emptyLabelText: 'Trống',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: 'Xóa',
        closeText: 'Đóng',
        loadingText: 'Đang tải…',
        noOptionsText: 'Không có lựa chọn',
        openText: 'Mở',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: 'Đóng',
      },
    },
    // MuiPagination: {
    //   defaultProps: {
    //     'aria-label': 'Pagination navigation',
    //     getItemAriaLabel: (type, page, selected) => {
    //       if (type === 'page') {
    //         return `${selected ? '' : 'Go to '}page ${page}`;
    //       }
    //       if (type === 'first') {
    //         return 'Go to first page';
    //       }
    //       if (type === 'last') {
    //         return 'Go to last page';
    //       }
    //       if (type === 'next') {
    //         return 'Go to next page';
    //       }
    //       // if (type === 'previous') {
    //       return 'Go to previous page';
    //     },
    //   },
    // },
  },
};

export const zhCN: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展开',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '第一页';
          }
          if (type === 'last') {
            return '最后一页';
          }
          if (type === 'next') {
            return '下一页';
          }
          return '上一页';
        },
        labelRowsPerPage: '每页行数:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${from} 条到第 ${to} 条，${count !== -1 ? `共 ${count} 条` : `至少 ${to} 条`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 颗星`,
        emptyLabelText: '无标签',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '关闭',
        loadingText: '加载中……',
        noOptionsText: '没有可用选项',
        openText: '打开',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '关闭',
      },
    },
  },
};

export const zhHK: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展開',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '第一頁';
          }
          if (type === 'last') {
            return '最後一頁';
          }
          if (type === 'next') {
            return '下一頁';
          }
          return '上一頁';
        },
        labelRowsPerPage: '每頁行數:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${from} 項至第 ${to} 項，${count !== -1 ? `共 ${count} 項` : `超過 ${to} 項`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 粒星`,
        emptyLabelText: '無標籤',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清除',
        closeText: '關閉',
        loadingText: '載入中……',
        noOptionsText: '沒有可用選項',
        openText: '開啟',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉',
      },
    },
  },
};

export const zhTW: Localization = {
  components: {
    MuiBreadcrumbs: {
      defaultProps: {
        expandText: '展開',
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === 'first') {
            return '第一頁';
          }
          if (type === 'last') {
            return '最後一頁';
          }
          if (type === 'next') {
            return '下一頁';
          }
          return '上一頁';
        },
        labelRowsPerPage: '每行行數:',
        labelDisplayedRows: ({ from, to, count }) =>
          `第 ${from} 條到第 ${to} 條，${count !== -1 ? `共 ${count} 條` : `至少 ${to} 條`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} 顆星`,
        emptyLabelText: '無標簽',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: '清空',
        closeText: '關閉',
        loadingText: '載入中……',
        noOptionsText: '没有可用選項',
        openText: '打開',
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: '關閉',
      },
    },
  },
};
