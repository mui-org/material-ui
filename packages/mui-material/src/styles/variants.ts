import type { Interpolation } from '@mui/system';
import type { ComponentsPropsList, ComponentsOwnerStateList } from './props';

export type ComponentsVariants<Theme = unknown> = {
  [Name in keyof ComponentsPropsList]?: Array<{
    props:
      | Partial<ComponentsOwnerStateList[Name]>
      | ((
          props: Partial<ComponentsOwnerStateList[Name]> & {
            ownerState: Partial<ComponentsOwnerStateList[Name]>;
          },
        ) => boolean);
    style: Interpolation<{ theme: Theme }>;
  }>;
};
