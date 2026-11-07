fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: CustomTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
      },
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      TransitionComponent: ComponentTransition,
      TransitionProps: CustomTransitionProps,
      slots: {
        root: 'div',
        transition: SlotTransition,
      },
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      FabProps: CustomFabProps,
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      FabProps: CustomFabProps,
      slotProps: {
        transition: CustomTransitionProps,
        fab: { size: 'small' },
      },
    },
  },
});

fn({
  MuiSpeedDial: {
    defaultProps: {
      FabProps: CustomFabProps,
      slotProps: {
        fab: (ownerState) => ({ color: ownerState.open ? 'secondary' : 'primary' }),
      },
    },
  },
});

const ownerState = CustomFabProps;
const namedFabProps = (state) => ({ title: state.open ? 'open' : 'closed' });
fn({
  MuiSpeedDial: {
    defaultProps: {
      FabProps: ownerState,
      slotProps: { fab: namedFabProps },
    },
  },
});
