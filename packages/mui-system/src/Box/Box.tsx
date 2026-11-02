'use client';
import type * as React from 'react';
import PropTypes from 'prop-types';
import ClassNameGenerator from '@mui/utils/ClassNameGenerator';
import type { OverridableComponent, OverrideProps } from '@mui/types';
import createBox from '../createBox';
import boxClasses from './boxClasses';
import type {
  SxProps,
  AllSystemCSSProperties,
  ResponsiveStyleValue,
  OverwriteCSSProperties,
  AliasesCSSProperties,
} from '../styleFunctionSx';
import type { PropsFor } from '../style';
import type { ComposedStyleFunction } from '../compose';
import type { Theme as SystemTheme } from '../createTheme';
import type borders from '../borders';
import type display from '../display';
import type flexbox from '../flexbox';
import type grid from '../cssGrid';
import type palette from '../palette';
import type positions from '../positions';
import type shadows from '../shadows';
import type sizing from '../sizing';
import type spacing from '../spacing';
import type typography from '../typography';

export interface CustomSystemProps extends AliasesCSSProperties, OverwriteCSSProperties {}

export type SimpleSystemKeys = keyof PropsFor<
  ComposedStyleFunction<
    [
      typeof borders,
      typeof display,
      typeof flexbox,
      typeof grid,
      typeof palette,
      typeof positions,
      typeof shadows,
      typeof sizing,
      typeof spacing,
      typeof typography,
    ]
  >
>;

// The SimpleSystemKeys are subset of the AllSystemCSSProperties, so this should be ok
// This is needed as these are used as keys inside AllSystemCSSProperties
type StandardSystemKeys = Extract<SimpleSystemKeys, keyof AllSystemCSSProperties>;

export type SystemProps<Theme extends object = {}> = {
  [K in StandardSystemKeys]?:
    | ResponsiveStyleValue<AllSystemCSSProperties[K]>
    | ((theme: Theme) => ResponsiveStyleValue<AllSystemCSSProperties[K]>);
};

export interface BoxOwnProps<Theme extends object = SystemTheme> {
  children?: React.ReactNode;
  ref?: React.Ref<unknown> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface BoxTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
  Theme extends object = SystemTheme,
> {
  props: AdditionalProps & BoxOwnProps<Theme>;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Box (Material UI)](https://mui.com/material-ui/react-box/)
 * - [Menubar (Material UI)](https://mui.com/material-ui/react-menubar/)
 * - [Box (MUI System)](https://mui.com/system/react-box/)
 *
 * API:
 *
 * - [Box API](https://mui.com/system/api/box/)
 */
const Box = createBox({
  defaultClassName: boxClasses.root,
  generateClassName: ClassNameGenerator.generate,
}) as OverridableComponent<BoxTypeMap>;

Box.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export type BoxProps<
  RootComponent extends React.ElementType = BoxTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BoxTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Box;
