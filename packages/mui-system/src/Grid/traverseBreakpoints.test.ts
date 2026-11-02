import { describe, it, expect } from 'vitest';
import createBreakpoints from '../createBreakpoints/createBreakpoints';
import { traverseBreakpoints, filterBreakpointKeys } from './traverseBreakpoints';

const breakpoints = createBreakpoints({});

describe('traverse breakpoints', () => {
  it('supports array', () => {
    const styles = {};
    traverseBreakpoints(breakpoints, [1, 2, 3, 4, 5], (appendStyle, value) => {
      appendStyle(styles, { margin: value });
    });
    expect(styles).to.deep.equal({
      margin: 1,
      '@media (min-width:600px)': {
        margin: 2,
      },
      '@media (min-width:900px)': {
        margin: 3,
      },
      '@media (min-width:1200px)': {
        margin: 4,
      },
      '@media (min-width:1536px)': {
        margin: 5,
      },
    });
  });

  it('supports object', () => {
    const styles = {};
    traverseBreakpoints(
      breakpoints,
      { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
      (appendStyle, value) => {
        appendStyle(styles, { margin: value });
      },
    );
    expect(styles).to.deep.equal({
      margin: 1,
      '@media (min-width:600px)': {
        margin: 2,
      },
      '@media (min-width:900px)': {
        margin: 3,
      },
      '@media (min-width:1200px)': {
        margin: 4,
      },
      '@media (min-width:1536px)': {
        margin: 5,
      },
    });
  });

  it('works with mixed object', () => {
    const styles = {};
    traverseBreakpoints(
      breakpoints,
      { a: 2, b: 5, xs: 1, sm: 2, md: 3, foo: () => {}, bar: [] },
      (appendStyle, value) => {
        appendStyle(styles, { margin: value });
      },
    );
    expect(styles).to.deep.equal({
      margin: 1,
      '@media (min-width:600px)': {
        margin: 2,
      },
      '@media (min-width:900px)': {
        margin: 3,
      },
    });
  });

  it('does not iterate undefined value', () => {
    const styles = {};
    traverseBreakpoints(breakpoints, { xs: 1, sm: undefined, md: 3 }, (appendStyle, value) => {
      appendStyle(styles, { margin: value });
    });
    expect(styles).to.deep.equal({
      margin: 1,
      '@media (min-width:900px)': {
        margin: 3,
      },
    });
  });

  it('filters out breakpoints keys based on responsive keys', () => {
    const styles = { sm: 6, md: 3, xl: 2, xs: 1 };
    const filteredKeys = filterBreakpointKeys(breakpoints.keys, Object.keys(styles));
    expect(filteredKeys).to.deep.equal(['xs', 'sm', 'md', 'xl']);
  });

  describe('custom breakpoints', () => {
    const customBreakpoints = createBreakpoints({
      // @ts-expect-error: This runtime fixture supplies custom breakpoint names without module augmentation.
      values: { xxs: 0, xs: 400, sm: 600, md: 768 },
    });

    it('supports array', () => {
      const styles = {};
      traverseBreakpoints(customBreakpoints, [1, 2, 3, 4, 5], (appendStyle, value) => {
        appendStyle(styles, { margin: value });
      });
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:400px)': {
          margin: 2,
        },
        '@media (min-width:600px)': {
          margin: 3,
        },
        '@media (min-width:768px)': {
          margin: 4,
        },
      });
    });

    it('supports object', () => {
      const styles = {};
      traverseBreakpoints(
        customBreakpoints,
        { xxs: 1, xs: 2, sm: 3, md: 4, lg: 5 }, // lg is not a part of custom breakpoints
        (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        },
      );
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:400px)': {
          margin: 2,
        },
        '@media (min-width:600px)': {
          margin: 3,
        },
        '@media (min-width:768px)': {
          margin: 4,
        },
      });
    });

    it('supports object (random order)', () => {
      const newBreakpoints = createBreakpoints({
        // @ts-expect-error: This runtime fixture supplies custom breakpoint names without module augmentation.
        values: { mobile: 0, laptop: 1024, tablet: 640, desktop: 1280 },
      });
      const styles = {};
      traverseBreakpoints(
        newBreakpoints,
        { monitor: 5, laptop: 3, mobile: 4, desktop: 2, tablet: 1 }, // lg is not a part of custom breakpoints
        (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        },
      );
      expect(styles).to.deep.equal({
        margin: 4,
        '@media (min-width:640px)': {
          margin: 1,
        },
        '@media (min-width:1024px)': {
          margin: 3,
        },
        '@media (min-width:1280px)': {
          margin: 2,
        },
      });
    });
  });

  describe('new breakpoints', () => {
    const newBreakpoints = createBreakpoints({
      values: {
        // order does not matter
        // @ts-expect-error: laptop is a custom breakpoint absent from the default BreakpointOverrides.
        laptop: 1024,
        tablet: 640,
        mobile: 0,
        desktop: 1280,
      },
    });

    it('supports array', () => {
      const styles = {};
      traverseBreakpoints(newBreakpoints, [1, 2, 3, 4], (appendStyle, value) => {
        appendStyle(styles, { margin: value });
      });
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:640px)': {
          margin: 2,
        },
        '@media (min-width:1024px)': {
          margin: 3,
        },
        '@media (min-width:1280px)': {
          margin: 4,
        },
      });
    });

    it('supports object', () => {
      const styles = {};
      traverseBreakpoints(
        newBreakpoints,
        { mobile: 1, tablet: 2, laptop: 3, desktop: 4, monitor: 5 }, // monitor is not a part of custom breakpoints
        (appendStyle, value) => {
          appendStyle(styles, { margin: value });
        },
      );
      expect(styles).to.deep.equal({
        margin: 1,
        '@media (min-width:640px)': {
          margin: 2,
        },
        '@media (min-width:1024px)': {
          margin: 3,
        },
        '@media (min-width:1280px)': {
          margin: 4,
        },
      });
    });
  });
});
