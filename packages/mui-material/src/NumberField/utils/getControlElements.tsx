import InputAdornment from '@mui/material/InputAdornment';

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
 * Returns the start and end controls for the number field based on the controls position.
 * @param controlsPosition - The position of the controls ('start', 'end', 'split').
 * @param IncrementButton - The increment button element.
 * @param DecrementButton - The decrement button element.
 * @returns An object containing the start and end controls.
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
      throw new Error(`Invalid controls position: ${controlsPosition}`);
  }
}

export default getControlElements;
