import { describe, expect, it } from 'vitest';
import { menuItemOverridesResolver } from './menuItemStyles';

describe('menuItemOverridesResolver', () => {
  const styles = {
    root: { padding: 1 },
    dense: { padding: 2 },
    divider: { padding: 3 },
    gutters: { padding: 4 },
  };

  [false, true].forEach((dense) => {
    [false, true].forEach((divider) => {
      [false, true].forEach((disableGutters) => {
        it(`keeps override order with dense=${dense}, divider=${divider}, disableGutters=${disableGutters}`, () => {
          expect(
            menuItemOverridesResolver({ ownerState: { dense, divider, disableGutters } }, styles),
          ).to.deep.equal([
            styles.root,
            dense && styles.dense,
            divider && styles.divider,
            !disableGutters && styles.gutters,
          ]);
        });
      });
    });
  });

  it('accepts partial theme overrides', () => {
    expect(
      menuItemOverridesResolver({ ownerState: { dense: true, divider: true } }, {}),
    ).to.deep.equal([undefined, undefined, undefined, undefined]);
  });
});
