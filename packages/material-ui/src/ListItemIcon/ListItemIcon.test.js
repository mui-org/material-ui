import * as React from 'react';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import ListItemIcon, { listItemIconClasses as classes } from '@material-ui/core/ListItemIcon';

describe('<ListItemIcon />', () => {
  const render = createClientRender();

  describeConformanceV5(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiListItemIcon',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'componentsProp', 'themeVariants'],
    }),
  );
});
