import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import ListItemAvatar, { listItemAvatarClasses as classes } from '@material-ui/core/ListItemAvatar';

describe('<ListItemAvatar />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <ListItemAvatar>
      <div />
    </ListItemAvatar>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiListItemAvatar',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );
});
