import { SxProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { Theme } from '@material-ui/core/styles';
import { MasonryItemClasses } from './masonryItemClasses';

export interface MasonryItemTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & {
    /**
     * The content of the component, normally an `<img>` or a `<div>`.
     */
    children: NonNullable<React.ReactNode>;
    /**
     * The height of the content of the component in px.
     */
    contentHeight: number;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<MasonryItemClasses>;
    /**
     * Allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Masonry](https://material-ui.com/components/masonry/)
 *
 * API:
 *
 * - [MasonryItem API](https://material-ui.com/api/masonry-item/)
 */
declare const MasonryItem: OverridableComponent<MasonryItemTypeMap>;

export type MasonryItemProps<
  D extends React.ElementType = MasonryItemTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<MasonryItemTypeMap<P, D>, D>;

export default MasonryItem;
