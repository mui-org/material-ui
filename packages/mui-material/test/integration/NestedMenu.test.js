import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, within, screen } from '@mui/internal-test-utils';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NoTransition = React.forwardRef(function NoTransition(props, ref) {
  const { children, in: inProp } = props;
  if (!inProp) {
    return null;
  }
  return <div ref={ref}>{children}</div>;
});

function NestedMenu(props) {
  const { firstMenuOpen, secondMenuOpen } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const canBeOpen = Boolean(anchorEl);

  return (
    <div>
      <button type="button" ref={setAnchorEl}>
        anchor
      </button>
      <Menu
        anchorEl={anchorEl}
        hideBackdrop
        slotProps={{ list: { id: 'second-menu' } }}
        slots={{ transition: NoTransition }}
        open={Boolean(secondMenuOpen && canBeOpen)}
      >
        <MenuItem>Second Menu</MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl}
        hideBackdrop
        slotProps={{ list: { id: 'first-menu' } }}
        slots={{ transition: NoTransition }}
        open={Boolean(firstMenuOpen && canBeOpen)}
      >
        <MenuItem>Profile 1</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}

describe('<NestedMenu> integration', () => {
  const { render } = createRenderer();

  it('should not be open', () => {
    render(<NestedMenu />);

    expect(screen.queryAllByRole('menu')).to.have.length(0);
  });

  it('should focus the first item of the first menu when nothing has been selected', () => {
    render(<NestedMenu firstMenuOpen />);

    expect(screen.getByRole('menu')).to.have.id('first-menu');
    expect(within(screen.getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should focus the first item of the second menu when nothing has been selected', () => {
    render(<NestedMenu secondMenuOpen />);

    expect(screen.getByRole('menu')).to.have.id('second-menu');
    expect(within(screen.getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should open the first menu after it was closed', () => {
    const { setProps } = render(<NestedMenu firstMenuOpen />);

    setProps({ firstMenuOpen: false });
    setProps({ firstMenuOpen: true });

    expect(screen.getByRole('menu')).to.have.id('first-menu');
    expect(within(screen.getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should be able to open second menu again', () => {
    const { setProps } = render(<NestedMenu secondMenuOpen />);

    setProps({ secondMenuOpen: false });
    setProps({ secondMenuOpen: true });

    expect(screen.getByRole('menu')).to.have.id('second-menu');
    expect(within(screen.getByRole('menu')).getAllByRole('menuitem')[0]).toHaveFocus();
  });
});
