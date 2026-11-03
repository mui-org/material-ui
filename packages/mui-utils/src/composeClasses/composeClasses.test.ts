import { describe, it, expect } from 'vitest';
import composeClasses from '@mui/utils/composeClasses';

describe('composeClasses', () => {
  it('should generate the classes based on the slots', () => {
    expect(
      composeClasses(
        {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
        undefined,
      ),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard',
      slot: 'MuiTest-slot',
    });
  });

  it('should consider classes if available', () => {
    expect(
      composeClasses(
        {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
        {
          standard: 'standardOverride',
          slot: 'slotOverride',
        },
      ),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard standardOverride',
      slot: 'MuiTest-slot slotOverride',
    });
  });

  it('should ignore false values', () => {
    expect(
      composeClasses(
        {
          root: ['root', false, 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
        {
          standard: 'standardOverride',
          slot: 'slotOverride',
        },
      ),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard standardOverride',
      slot: 'MuiTest-slot slotOverride',
    });
  });
});
