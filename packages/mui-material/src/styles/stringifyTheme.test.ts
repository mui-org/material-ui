import { describe, it, expect } from 'vitest';
import { createTheme } from '@mui/material/styles';
import { stringifyTheme } from './stringifyTheme';

describe('StringifyTheme', () => {
  it('should serialize the theme', () => {
    const theme = createTheme({ cssVariables: true });
    const result = stringifyTheme({
      breakpoints: theme.breakpoints,
      motion: theme.motion,
      transitions: theme.transitions,
    });
    expect(result).to
      .equal(`import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = {
  "breakpoints": {
    "keys": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    },
    "unit": "px"
  },
  "motion": {
    "reducedMotion": "never"
  },
  "transitions": {
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    },
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    }
  }
};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`);

    // test that non-seriazable values still exist in the original theme
    expect(typeof theme.generateStyleSheets).to.equal('function');
  });

  it('should serialize the custom theme', () => {
    const theme = createTheme({
      cssVariables: true,
      breakpoints: {
        values: {
          mobile: 0,
          tablet: 640,
          laptop: 1024,
          desktop: 1280,
        } as any,
      },
      motion: {
        reducedMotion: 'always',
      },
      transitions: {
        duration: {
          standard: 432,
        },
      },
    });
    const result = stringifyTheme({
      breakpoints: theme.breakpoints,
      motion: theme.motion,
      transitions: theme.transitions,
    });
    expect(result).to
      .equal(`import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = {
  "breakpoints": {
    "keys": [
      "mobile",
      "tablet",
      "laptop",
      "desktop"
    ],
    "values": {
      "mobile": 0,
      "tablet": 640,
      "laptop": 1024,
      "desktop": 1280
    },
    "unit": "px"
  },
  "motion": {
    "reducedMotion": "always"
  },
  "transitions": {
    "duration": {
      "standard": 432,
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    },
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    }
  }
};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`);

    // test that non-seriazable values still exist in the original theme
    expect(typeof theme.generateStyleSheets).to.equal('function');
  });

  it('works with framework toRuntimeSource', () => {
    const theme = { palette: { primary: { main: '#ff5252' } }, toRuntimeSource: stringifyTheme };
    expect(theme.toRuntimeSource.call(theme, theme)).to
      .equal(`import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = {
  "palette": {
    "primary": {
      "main": "#ff5252"
    }
  }
};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.motion = { reducedMotion: 'never', ...theme.motion };
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`);
  });
});
