fn({
  MuiTablePagination: {
    defaultProps: {
      ActionsComponent: 'div',
      slotProps: {
        select: { native: true }
      },
    },
  },
});

fn({
  MuiTablePagination: {
    defaultProps: {
      ActionsComponent: 'div',

      slotProps: {
        root: { id: 'test' },
        select: { native: true }
      },

      slots: {
        root: 'div',
      }
    },
  },
});
