import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction, {
  listItemSecondaryActionClasses as classes,
} from '@mui/material/ListItemSecondaryAction';
import describeConformance from '../../test/describeConformance';

describe('<ListItemSecondaryAction />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItemSecondaryAction />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiListItemSecondaryAction',
    skip: ['themeVariants'],
  }));

  it('should render without classes that disable gutters', () => {
    render(
      <ListItem
        slots={{ secondaryAction: ListItemSecondaryAction }}
        slotProps={{ secondaryAction: { 'data-testid': 'secondary-action' } }}
        secondaryAction="foo"
      />,
    );

    expect(screen.getByTestId('secondary-action')).not.to.have.class(classes.disableGutters);
  });

  it('should disable the gutters', () => {
    render(
      <ListItem
        disableGutters
        slots={{ secondaryAction: ListItemSecondaryAction }}
        slotProps={{ secondaryAction: { 'data-testid': 'secondary-action' } }}
        secondaryAction="foo"
      />,
    );

    expect(screen.getByTestId('secondary-action')).to.have.class(classes.disableGutters);
  });
});
