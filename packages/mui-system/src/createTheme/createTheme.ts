import deepmerge from '@mui/utils/deepmerge';
import type { CSSObject } from '@mui/styled-engine';
import createBreakpoints from '../createBreakpoints/createBreakpoints';
import type { Breakpoints, BreakpointsOptions } from '../createBreakpoints/createBreakpoints';
import cssContainerQueries from '../cssContainerQueries';
import type { CssContainerQueries } from '../cssContainerQueries';
import shape from './shape';
import type { Shape, ShapeOptions } from './shape';
import createSpacing from './createSpacing';
import type { Spacing, SpacingOptions } from './createSpacing';
import styleFunctionSx from '../styleFunctionSx/styleFunctionSx';
import defaultSxConfig from '../styleFunctionSx/defaultSxConfig';
import applyStyles from './applyStyles';
import type { ApplyStyles } from './applyStyles';
import type { SxConfig, SxProps } from '../styleFunctionSx';

export type {
  Breakpoint,
  Breakpoints,
  BreakpointOverrides,
} from '../createBreakpoints/createBreakpoints';

export type Direction = 'ltr' | 'rtl';

export interface Typography {}
export interface Mixins {}
export interface Shadows {}
export interface Transitions {}
export interface ZIndex {}

export interface ThemeOptions {
  shape?: ShapeOptions | undefined;
  breakpoints?: BreakpointsOptions | undefined;
  direction?: Direction | undefined;
  mixins?: Mixins | undefined;
  palette?: Record<string, any> | undefined;
  shadows?: Shadows | undefined;
  spacing?: SpacingOptions | undefined;
  transitions?: Transitions | undefined;
  components?: Record<string, any> | undefined;
  typography?: Typography | undefined;
  zIndex?: ZIndex | undefined;
  unstable_sxConfig?: SxConfig | undefined;
}

export interface Theme extends CssContainerQueries {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  shadows?: Shadows | undefined;
  spacing: Spacing;
  transitions?: Transitions | undefined;
  components?: Record<string, any> | undefined;
  mixins?: Mixins | undefined;
  typography?: Typography | undefined;
  zIndex?: ZIndex | undefined;
  applyStyles: ApplyStyles<'light' | 'dark'>;
  unstable_sxConfig: SxConfig;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
function createTheme(options: ThemeOptions = {}, ...args: object[]): Theme {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {},
    ...other
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing = createSpacing(spacingInput);

  let muiTheme: any = deepmerge(
    {
      breakpoints,
      direction: 'ltr',
      components: {}, // Inject component definitions.
      palette: { mode: 'light', ...paletteInput },
      spacing,
      shape: { ...shape, ...shapeInput },
    },
    other,
  );
  muiTheme = cssContainerQueries(muiTheme);

  muiTheme.applyStyles = applyStyles;

  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  muiTheme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...other?.unstable_sxConfig,
  };
  muiTheme.unstable_sx = function sx(this: any, props: any) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  };

  muiTheme.internal_cache = {};

  return muiTheme;
}

export default createTheme;
