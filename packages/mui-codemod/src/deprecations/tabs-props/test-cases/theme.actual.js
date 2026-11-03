fn({
  MuiTabs: {
    defaultProps: {
      ScrollButtonComponent: CustomScrollButton,
      TabScrollButtonProps: { disableRipple: true },
      TabIndicatorProps: { className: 'indicator' },
    },
  },
});

fn({
  MuiTabs: {
    defaultProps: {
      slots: {
        StartScrollButtonIcon: CustomIcon,
        EndScrollButtonIcon: CustomIcon2,
      },
    },
  },
});
