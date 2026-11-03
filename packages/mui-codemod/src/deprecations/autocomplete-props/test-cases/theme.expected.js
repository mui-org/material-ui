fn({
  MuiAutocomplete: {
    defaultProps: {
      renderValue: (value, getItemProps, ownerState) =>
        value.map((option, index) => (
          <Chip label={option.label} data-focused={ownerState.focused} {...getItemProps({ index })} />
        )),

      slots: {
        paper: CustomPaper,
        popper: CustomPopper
      },

      slotProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },
        popupIndicator: { width: 16 },
        chip: { height: 10 },

        listbox: {
          component: CustomListbox,
          ...{ height: 12 }
        }
      }
    },
  },
});

fn({
  MuiAutocomplete: {
    defaultProps: {
      renderValue: (value, getItemProps, ownerState) =>
        value.map((option, index) => (
          <Chip label={option.label} data-focused={ownerState.focused} {...getItemProps({ index })} />
        )),

      slotProps: {
        clearIndicator: { width: 10 },
        paper: { width: 12 },
        popper: { width: 14 },

        popupIndicator: {
          ...{ width: 16 },
          ...{ width: 20 }
        },

        chip: { height: 10 },

        listbox: {
          component: CustomListbox,
          ...{ height: 12 }
        }
      },

      slots: {
        paper: CustomPaper,
        popper: CustomPopper
      }
    },
  },
});
