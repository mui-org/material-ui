import { describe } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import ListItemIcon, { listItemIconClasses as classes } from '@mui/material/ListItemIcon';
import describeConformance from '../../test/describeConformance';

describe('<ListItemIcon />', () => {
  const { render } = createRenderer();

  describeConformance(
    <ListItemIcon>
      <div />
    </ListItemIcon>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiListItemIcon',
      refInstanceof: window.HTMLDivElement,
      skip: ['componentProp', 'themeVariants'],
    }),
  );
});
