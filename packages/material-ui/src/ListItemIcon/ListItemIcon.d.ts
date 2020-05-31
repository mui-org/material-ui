import { StandardProps } from '..';

export interface ListItemIconProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemIconClassKey> {
  children: React.ReactElement;
}

export type ListItemIconClassKey = 'root' | 'alignItemsFlexStart';

declare const ListItemIcon: React.ComponentType<ListItemIconProps>;

export default ListItemIcon;
