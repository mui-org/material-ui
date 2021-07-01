import { ExtendButton, ExtendButtonTypeMap, ButtonClasses } from '@material-ui/core/Button';
import { OverrideProps } from '@material-ui/core/OverridableComponent';
import { Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

export type LoadingButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button',
> = ExtendButtonTypeMap<{
  props: P & {
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<ButtonClasses> & {
      /** Styles applied to the root element. */
      root?: string;
      /** Styles applied to the root element if `loading={true}`. */
      loading?: string;
      /** Styles applied to the loadingIndicator element. */
      loadingIndicator?: string;
      /** Styles applied to the loadingIndicator element if `loadingPosition="center"`. */
      loadingIndicatorCenter?: string;
      /** Styles applied to the loadingIndicator element if `loadingPosition="start"`. */
      loadingIndicatorStart?: string;
      /** Styles applied to the loadingIndicator element if `loadingPosition="end"`. */
      loadingIndicatorEnd?: string;
      /** Styles applied to the endIcon element if `loading={true}` and `loadingPosition="end"`. */
      endIconLoadingEnd?: string;
      /** Styles applied to the startIcon element if `loading={true}` and `loadingPosition="start"`. */
      startIconLoadingStart?: string;
    };
    /**
     * If `true`, the loading indicator is shown.
     * @default false
     */
    loading?: boolean;
    /**
     * Element placed before the children if the button is in loading state.
     * @default <CircularProgress color="inherit" size={16} />
     */
    loadingIndicator?: React.ReactNode;
    /**
     * The loading indicator can be positioned on the start, end, or the center of the button.
     * @default 'center'
     */
    loadingPosition?: 'start' | 'end' | 'center';
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}>;

/**
 *
 * Demos:
 *
 * - [Buttons](https://material-ui.com/components/buttons/)
 *
 * API:
 *
 * - [LoadingButton API](https://material-ui.com/api/loading-button/)
 * - inherits [Button API](https://material-ui.com/api/button/)
 */
declare const LoadingButton: ExtendButton<LoadingButtonTypeMap>;

export type LoadingButtonProps<
  D extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<LoadingButtonTypeMap<P, D>, D>;

export default LoadingButton;
