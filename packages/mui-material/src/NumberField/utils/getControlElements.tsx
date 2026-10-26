import InputAdornment from '@mui/material/InputAdornment';

import { styled } from '../../zero-styled';
import type { ControlsPosition } from '../NumberField.types';

const Controls = styled(InputAdornment, {
  name: 'MuiNumberField',
  slot: 'Controls',
})({});

/**
 * Returns the start and end controls for the number field based on the controls position.
 * @param controlsPosition - The position of the controls ('start', 'end', 'split').
 * @param IncrementButton - The increment button element.
 * @param DecrementButton - The decrement button element.
 * @returns An object containing the start and end controls.
 */
function getControlElements(
  controlsPosition: ControlsPosition,
  IncrementButton: React.ReactNode,
  DecrementButton: React.ReactNode,
): {
  startControls: React.ReactNode | null;
  endControls: React.ReactNode | null;
} {
  switch (controlsPosition) {
    case 'end':
      return {
        startControls: null,
        endControls: (
          <Controls position="end">
            {IncrementButton}
            {DecrementButton}
          </Controls>
        ),
      };
    case 'split':
      return {
        startControls: <Controls position="start">{DecrementButton}</Controls>,
        endControls: <Controls position="end">{IncrementButton}</Controls>,
      };
    case 'start':
      return {
        startControls: (
          <Controls position="start">
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
