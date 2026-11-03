import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import ListSubheader, { listSubheaderClasses } from '@mui/material/ListSubheader';
import ListItem, { listItemClasses } from '@mui/material/ListItem';
import List, { listClasses as classes } from '@mui/material/List';
import describeConformance from '../../test/describeConformance';

describe('<List />', () => {
  const { render } = createRenderer();

  describeConformance(<List />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    muiName: 'MuiList',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { disablePadding: true },
  }));

  it('should render with padding classes', () => {
    const { container } = render(<List className="woofList" />);

    expect(container.firstChild).to.have.class(classes.padding);
  });

  it('can disable the padding', () => {
    const { container } = render(<List disablePadding />);

    expect(container.firstChild).not.to.have.class(classes.padding);
  });

  describe('prop: subheader', () => {
    it('should render with subheader class', () => {
      const { container } = render(<List subheader={<ListSubheader>Title</ListSubheader>} />);

      expect(container.firstChild).to.have.class(classes.subheader);
    });

    it('should render ListSubheader', () => {
      const { container } = render(<List subheader={<ListSubheader>Title</ListSubheader>} />);
      const item = container.querySelector('li');

      expect(item).to.have.class(listSubheaderClasses.root);
    });
  });

  describe('prop: dense', () => {
    it('is disabled by default', () => {
      const { container } = render(<List />);

      expect(container.firstChild).not.to.have.class(classes.dense);
    });

    it('adds a dense class', () => {
      const { container } = render(<List dense />);

      expect(container.firstChild).to.have.class(classes.dense);
    });

    it('sets dense on deep nested ListItem', () => {
      // mocking a tooltip
      const Tooltip = React.Fragment;

      const { container } = render(
        <List dense>
          <Tooltip>
            <ListItem>Inbox</ListItem>
          </Tooltip>
          <ListItem>Drafts</ListItem>
          <ListItem />
        </List>,
      );

      const liItems = container.querySelectorAll('li');
      for (let i = 0; i < liItems.length; i += 1) {
        expect(liItems[i]).to.have.class(listItemClasses.dense);
      }
    });
  });
});
