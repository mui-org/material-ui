import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Toolbar, { toolbarClasses as classes } from '@mui/material/Toolbar';
import describeConformance from '../../test/describeConformance';

describe('<Toolbar />', () => {
  const { render } = createRenderer();

  describeConformance(<Toolbar />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiToolbar',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'foo', styleKey: 'foo' },
  }));

  it('should render with gutters class', () => {
    const { container } = render(<Toolbar className="woofToolbar">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.gutters);
  });

  it('can disable the gutters', () => {
    const { container } = render(<Toolbar disableGutters>foo</Toolbar>);

    expect(container.firstChild).not.to.have.class(classes.gutters);
  });

  it('can condense itself', () => {
    const { container } = render(<Toolbar variant="dense">foo</Toolbar>);

    expect(container.firstChild).to.have.class(classes.dense);
  });
});
