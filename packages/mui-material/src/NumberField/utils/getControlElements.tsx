import InputAdornment from '../../InputAdornment';

import { styled } from '../../zero-styled';
import type { ControlsPosition, NumberFieldOwnerState } from '../NumberField.types';
import type { NumberFieldClasses } from '../numberFieldClasses';

const Controls = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'Controls',
})<{ ownerState: NumberFieldOwnerState }>({});

interface GetControlElementsOptions {
  controlsPosition: ControlsPosition;
  IncrementButton: React.ReactNode;
  DecrementButton: React.ReactNode;
  classes: Pick<NumberFieldClasses, 'controls'>;
  ownerState: NumberFieldOwnerState;
}

/**
 * Places the built-in controls in the input's start/end adornments.
 */
function getControlElements({
  controlsPosition,
  IncrementButton,
  DecrementButton,
  classes,
  ownerState,
}: GetControlElementsOptions): {
  startControls: React.ReactNode | null;
  endControls: React.ReactNode | null;
} {
  const controlProps = { className: classes.controls, ownerState };

  switch (controlsPosition) {
    case 'end':
      return {
        startControls: null,
        endControls: (
          <Controls position="end" {...controlProps}>
            {IncrementButton}
            {DecrementButton}
          </Controls>
        ),
      };
    case 'split':
      return {
        startControls: (
          <Controls position="start" {...controlProps}>
            {DecrementButton}
          </Controls>
        ),
        endControls: (
          <Controls position="end" {...controlProps}>
            {IncrementButton}
          </Controls>
        ),
      };
    case 'start':
      return {
        startControls: (
          <Controls position="start" {...controlProps}>
            {IncrementButton}
            {DecrementButton}
          </Controls>
        ),
        endControls: null,
      };
    default:
      throw /* minify-error */ new Error(
        `MUI: Cannot position NumberField controls because "controlsPosition" is invalid: ${controlsPosition}. Use "start", "end", or "split".`,
      );
  }
}

export default getControlElements;
