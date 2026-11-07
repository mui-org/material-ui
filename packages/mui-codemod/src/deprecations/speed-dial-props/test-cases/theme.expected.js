fn({
  MuiSpeedDial: {
    defaultProps: {
      slots: {
        transition: CustomTransition
      },

      slotProps: {
        transition: CustomTransitionProps
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: CustomTransition
      },

      slotProps: {
        transition: CustomTransitionProps
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slots: {
        root: 'div',
        transition: SlotTransition,
      },

      slotProps: {
        transition: CustomTransitionProps
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slotProps: {
        fab: CustomFabProps
      },
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slotProps: {
        transition: CustomTransitionProps,
        fab: {
          ...CustomFabProps,
          ...{ size: 'small' }
        },
      }
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      slotProps: {
        fab: ownerState1 => ({
          ...CustomFabProps,

          ...(ownerState => ({
            color: ownerState.open ? 'secondary' : 'primary'
          }))(ownerState1)
        }),
      }
    },
  },
});

const ownerState = CustomFabProps;
const namedFabProps = (state) => ({ title: state.open ? 'open' : 'closed' });
fn({
  MuiSpeedDial: {
    defaultProps: {
      slotProps: { fab: ownerState1 => {
        const slotProps = namedFabProps;

        return {
          ...ownerState,
          ...(typeof slotProps === "function" ? slotProps(ownerState1) : slotProps)
        };
      } }
    },
  },
});
