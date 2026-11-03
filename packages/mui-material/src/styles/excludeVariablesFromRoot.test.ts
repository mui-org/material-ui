import { describe, it, expect } from 'vitest';
import excludeVariablesFromRoot from './excludeVariablesFromRoot';

describe('excludeVariablesFromRoot', () => {
  it('should return true', () => {
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-0`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-1`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-2`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-3`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-4`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-5`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-6`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-7`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-8`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-9`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-10`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-11`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-12`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-13`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-14`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-15`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-16`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-17`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-18`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-19`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-20`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-21`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-22`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-23`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-overlays-24`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-palette-AppBar-darkBg`)).to.equal(true);
    expect(excludeVariablesFromRoot('mui').includes(`--mui-palette-AppBar-darkColor`)).to.equal(
      true,
    );
  });

  it('should return true for custom prefix', () => {
    expect(excludeVariablesFromRoot('').includes(`--overlays-1`)).to.equal(true);
    expect(excludeVariablesFromRoot('').includes(`--palette-AppBar-darkBg`)).to.equal(true);
    expect(excludeVariablesFromRoot('').includes(`--palette-AppBar-darkColor`)).to.equal(true);
  });
});
