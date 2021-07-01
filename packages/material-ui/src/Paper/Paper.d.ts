import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { Theme } from '../styles';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { PaperClasses } from './paperClasses';

export interface PaperPropsVariantOverrides {}

export interface PaperTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<PaperClasses>;
    /**
     * Shadow depth, corresponds to `dp` in the spec.
     * It accepts values between 0 and 24 inclusive.
     * @default 1
     */
    elevation?: number;
    /**
     * If `true`, rounded corners are disabled.
     * @default false
     */
    square?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
    /**
     * The variant to use.
     * @default 'elevation'
     */
    variant?: OverridableStringUnion<'elevation' | 'outlined', PaperPropsVariantOverrides>;
  };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Paper](https://material-ui.com/components/paper/)
 *
 * API:
 *
 * - [Paper API](https://material-ui.com/api/paper/)
 */
declare const Paper: OverridableComponent<PaperTypeMap>;

export type PaperProps<
  D extends React.ElementType = PaperTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<PaperTypeMap<P, D>, D>;

export default Paper;
