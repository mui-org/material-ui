import SpeedDial from '@org/ui/material/SpeedDial';
import { SpeedDial as MySpeedDial } from '@org/ui/material';

<SpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
<MySpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;
<SpeedDial
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
  }}
/>;
<MySpeedDial
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    ...outerSlots,
  }}
/>;
<SpeedDial
  TransitionComponent={ComponentTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
/>;
// should skip non MUI components
<NonMuiSpeedDial TransitionComponent={CustomTransition} TransitionProps={CustomTransitionProps} />;

<SpeedDial FabProps={CustomFabProps} />;
<MySpeedDial FabProps={CustomFabProps} />;
<SpeedDial FabProps={CustomFabProps} slotProps={{ transition: CustomTransitionProps }} />;
<SpeedDial FabProps={CustomFabProps} slotProps={{ fab: { size: 'small' } }} />;
<NonMuiSpeedDial FabProps={CustomFabProps} />;
<SpeedDial FabProps={CustomFabProps} slotProps={{ fab: (ownerState) => ({ color: ownerState.open ? 'secondary' : 'primary' }) }} />;

const ownerState = CustomFabProps;
const namedFabProps = (state) => ({ title: state.open ? 'open' : 'closed' });
<SpeedDial FabProps={ownerState} slotProps={{ fab: namedFabProps }} />;
<SpeedDial FabProps={CustomFabProps} slotProps={{ fab: (state) => ({ title: ownerState.title }) }} />;
