import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { TypographyProps } from '../Typography';
import { ListItemTextClasses } from './listItemTextClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface ListItemTextRootSlotPropsOverrides {}

export interface ListItemTextSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the primary slot.
   * @default Typography
   */
  primary?: React.ElementType | undefined;
  /**
   * The component that renders the secondary slot.
   * @default Typography
   */
  secondary?: React.ElementType | undefined;
}

export type ListItemTextSlotsAndSlotProps<
  PrimaryTypographyComponent extends React.ElementType = React.ElementType<TypographyProps<'span'>>,
  SecondaryTypographyComponent extends React.ElementType = React.ElementType<TypographyProps<'p'>>,
> = CreateSlotsAndSlotProps<
  ListItemTextSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on `div` element.
     */
    root: SlotProps<'div', ListItemTextRootSlotPropsOverrides, ListItemTextOwnerState>;
    /**
     * Props forwarded to the primary slot (as long as disableTypography is not `true`)
     * By default, the available props are based on the [Typography](https://mui.com/material-ui/api/typography/#props) component
     */
    primary:
      | TypographyProps<
          PrimaryTypographyComponent,
          { component?: PrimaryTypographyComponent | undefined }
        >
      | ((
          ownerState: ListItemTextOwnerState,
        ) => TypographyProps<
          PrimaryTypographyComponent,
          { component?: PrimaryTypographyComponent | undefined }
        >);
    /**
     * Props forwarded to the secondary slot (as long as disableTypography is not `true`)
     * By default, the available props are based on the [Typography](https://mui.com/material-ui/api/typography/#props) component
     */
    secondary:
      | TypographyProps<
          SecondaryTypographyComponent,
          { component?: SecondaryTypographyComponent | undefined }
        >
      | ((
          ownerState: ListItemTextOwnerState,
        ) => TypographyProps<
          SecondaryTypographyComponent,
          { component?: SecondaryTypographyComponent | undefined }
        >);
  }
>;

export interface ListItemTextOwnerState extends ListItemTextProps {}

export interface ListItemTextProps<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p',
>
  extends
    StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    ListItemTextSlotsAndSlotProps<PrimaryTypographyComponent, SecondaryTypographyComponent> {
  /**
   * Alias for the `primary` prop.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemTextClasses> | undefined;
  /**
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography?: boolean | undefined;
  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset?: boolean | undefined;
  /**
   * The main content element.
   */
  primary?: React.ReactNode;
  /**
   * The secondary content element.
   */
  secondary?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 * - [Menubar](https://next.mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [ListItemText API](https://next.mui.com/material-ui/api/list-item-text/)
 */
export default function ListItemText<
  PrimaryTypographyComponent extends React.ElementType = 'span',
  SecondaryTypographyComponent extends React.ElementType = 'p',
>(
  props: ListItemTextProps<PrimaryTypographyComponent, SecondaryTypographyComponent>,
): React.JSX.Element;
