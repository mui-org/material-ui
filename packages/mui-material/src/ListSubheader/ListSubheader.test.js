import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import ListSubheader, { listSubheaderClasses as classes } from '@mui/material/ListSubheader';
import describeConformance from '../../test/describeConformance';

describe('<ListSubheader />', () => {
  const { render } = createRenderer();

  describeConformance(<ListSubheader />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    muiName: 'MuiListSubheader',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { disableGutters: true },
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
