fn({
  MuiTabs: {
    defaultProps: {
      slots: {
        scrollButtons: CustomScrollButton
      },

      slotProps: {
        scrollButtons: { disableRipple: true },
        indicator: { className: 'indicator' }
      }
    },
  },
});

fn({
  MuiTabs: {
    defaultProps: {
      slots: {
        startScrollButtonIcon: CustomIcon,
        endScrollButtonIcon: CustomIcon2,
      },
    },
  },
});
