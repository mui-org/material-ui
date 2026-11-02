import type * as React from 'react';
import type { OverrideProps } from '@mui/types';
import type { SxProps } from '../styleFunctionSx';
import type { Theme, Breakpoint } from '../createTheme';
import type { ContainerClasses } from './containerClasses';

export interface ContainerTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & {
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ContainerClasses> | undefined;
    /**
     * If `true`, the left and right padding is removed.
     * @default false
     */
    disableGutters?: boolean | undefined;
    /**
     * Set the max-width to match the min-width of the current breakpoint.
     * This is useful if you'd prefer to design for a fixed set of sizes
     * instead of trying to accommodate a fully fluid viewport.
     * It's fluid by default.
     * @default false
     */
    fixed?: boolean | undefined;
    /**
     * Determine the max-width of the container.
     * The container width grows with the size of the screen.
     * Set to `false` to disable `maxWidth`.
     * @default 'lg'
     */
    maxWidth?: Breakpoint | false | undefined;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme> | undefined;
  };
  defaultComponent: DefaultComponent;
}

export type ContainerProps<
  RootComponent extends React.ElementType = ContainerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ContainerTypeMap<AdditionalProps, RootComponent>, RootComponent>;
