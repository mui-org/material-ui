import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, describeConformanceV5 } from 'test/utils';
import SortIcon from '@material-ui/icons/Sort';
import TableSortLabel, { tableSortLabelClasses as classes } from '@material-ui/core/TableSortLabel';
import ButtonBase from '@material-ui/core/ButtonBase';

describe('<TableSortLabel />', () => {
  const render = createClientRender();

  describeConformanceV5(<TableSortLabel />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render,
    muiName: 'MuiTableSortLabel',
    testVariantProps: { variant: 'foo' },
    testDeepOverrides: { slotName: 'icon', slotClassName: classes.icon },
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should set the active class when active', () => {
    const activeFlag = true;
    const { container } = render(<TableSortLabel active={activeFlag} />);
    expect(container.firstChild).to.have.class(classes.active);
  });

  it('should not set the active class when not active', () => {
    const activeFlag = false;
    const { container } = render(<TableSortLabel active={activeFlag} />);
    expect(container.firstChild).not.to.have.class(classes.active);
  });

  describe('has an icon', () => {
    it('should have one child with the icon class', () => {
      const { container } = render(<TableSortLabel />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });

    it('when given direction desc should have desc direction class', () => {
      const { container } = render(<TableSortLabel direction="desc" />);
      const icon = container.querySelector(`.${classes.icon}`);
      expect(icon).not.to.have.class(classes.iconDirectionAsc);
      expect(icon).to.have.class(classes.iconDirectionDesc);
    });

    it('when given direction asc should have asc direction class', () => {
      const { container } = render(<TableSortLabel direction="asc" />);
      const icon = container.querySelector(`.${classes.icon}`);
      expect(icon).not.to.have.class(classes.iconDirectionDesc);
      expect(icon).to.have.class(classes.iconDirectionAsc);
    });

    it('should accept a custom icon for the sort icon', () => {
      const { getAllByTestId } = render(<TableSortLabel IconComponent={SortIcon} />);
      expect(getAllByTestId('SortIcon')).not.to.equal(null);
    });
  });

  describe('prop: hideSortIcon', () => {
    it('can hide icon when not active', () => {
      const { container } = render(<TableSortLabel active={false} hideSortIcon />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(0);
    });

    it('does not hide icon by default when not active', () => {
      const { container } = render(<TableSortLabel active={false} />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });

    it('does not hide icon when active', () => {
      const { container } = render(<TableSortLabel active hideSortIcon />);
      const iconChildren = container.querySelectorAll(`.${classes.icon}`);
      expect(iconChildren.length).to.equal(1);
    });
  });
});
