import * as React from 'react';
import { expect } from 'chai';
import { describeConformanceV5, createClientRender } from 'test/utils';
import ListSubheader, { listSubheaderClasses as classes } from '@material-ui/core/ListSubheader';

describe('<ListSubheader />', () => {
  const render = createClientRender();

  describeConformanceV5(<ListSubheader />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    muiName: 'MuiListSubheader',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { disableGutters: true },
    skip: ['componentsProp'],
  }));

  it('should display primary color', () => {
    const { container } = render(<ListSubheader color="primary" />);

    expect(container.firstChild).to.have.class(classes.colorPrimary);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should display inset class', () => {
    const { container } = render(<ListSubheader inset />);

    expect(container.firstChild).to.have.class(classes.inset);
    expect(container.firstChild).to.have.class(classes.root);
  });

  describe('prop: disableSticky', () => {
    it('should display sticky class', () => {
      const { container } = render(<ListSubheader />);

      expect(container.firstChild).to.have.class(classes.sticky);
    });

    it('should not display sticky class', () => {
      const { container } = render(<ListSubheader disableSticky />);

      expect(container.firstChild).not.to.have.class(classes.sticky);
    });
  });

  describe('prop: disableGutters', () => {
    it('should not display gutters class', () => {
      const { container } = render(<ListSubheader disableGutters />);

      expect(container.firstChild).not.to.have.class(classes.gutters);
    });

    it('should display gutters class', () => {
      const { container } = render(<ListSubheader />);

      expect(container.firstChild).to.have.class(classes.gutters);
    });
  });
});
