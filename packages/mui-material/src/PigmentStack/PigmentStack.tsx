'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import type { OverridableComponent, OverrideProps } from '@mui/types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- The peer is resolvable only after its build.
// @ts-ignore: material-pigment-css links to its build directory, which is absent in a fresh checkout.
import Stack from '@mui/material-pigment-css/Stack';
import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import type { SxProps } from '@mui/system';
import type { Breakpoint, Theme } from '../styles';

type ResponsiveStyleValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null };

export interface PigmentStackOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'> | undefined;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string> | undefined;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactNode;
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface PigmentStackTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & PigmentStackOwnProps;
  defaultComponent: RootComponent;
}

export type PigmentStackProps<
  RootComponent extends React.ElementType = PigmentStackTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<PigmentStackTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, (slot) => generateUtilityClass('MuiStack', slot), {});
};
/**
 *
 * Demos:
 *
 * - [Stack](https://next.mui.com/material-ui/react-stack/)
 *
 * API:
 *
 * - [PigmentStack API](https://next.mui.com/material-ui/api/pigment-stack/)
 */
const PigmentStack = React.forwardRef(function PigmentStack({ className, ...props }, ref) {
  const classes = useUtilityClasses();
  return <Stack ref={ref} className={clsx(classes.root, className)} {...(props as any)} />;
}) as OverridableComponent<PigmentStackTypeMap>;

PigmentStack.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
    PropTypes.shape({
      lg: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      md: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      sm: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      xl: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      xs: PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    }),
  ]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.shape({
      lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      md: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xl: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    PropTypes.string,
  ]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default PigmentStack;
