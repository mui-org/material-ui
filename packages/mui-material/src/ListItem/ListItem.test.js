import { describe, it, expect } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import ListItem, { listItemClasses as classes } from '@mui/material/ListItem';
import ListContext from '../List/ListContext';
import describeConformance from '../../test/describeConformance';

describe('<ListItem />', () => {
  const { render } = createRenderer();

  describeConformance(<ListItem secondaryAction="foo" />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    refInstanceof: window.HTMLLIElement,
    muiName: 'MuiListItem',
    testVariantProps: { dense: true },
    slots: {
      root: { expectedClassName: classes.root },
      secondaryAction: { expectedClassName: classes.secondaryAction },
    },
  }));

  it('should render with gutters classes', () => {
    render(<ListItem />);
    expect(screen.getByRole('listitem')).to.have.class(classes.gutters);
  });

  it('should disable the gutters', () => {
    render(<ListItem disableGutters />);
    expect(screen.getByRole('listitem')).not.to.have.class(classes.gutters);
  });

  describe('context: dense', () => {
    it('should forward the context', () => {
      let context = null;
      const { setProps } = render(
        <ListItem>
          <ListContext.Consumer>
            {(options) => {
              context = options;
            }}
          </ListContext.Consumer>
        </ListItem>,
      );
      expect(context).to.have.property('dense', false);
      setProps({ dense: true });
      expect(context).to.have.property('dense', true);
    });
  });

  describe('action', () => {
    it('should show action if provided', () => {
      render(<ListItem secondaryAction="foo" />);
      expect(screen.getByText('foo')).toBeVisible();
    });
  });
});
