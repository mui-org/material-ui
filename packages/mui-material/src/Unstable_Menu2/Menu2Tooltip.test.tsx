import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';

describe.skipIf(isJsdom())('Menu2 with Tooltip', () => {
  const { render } = createRenderer();

  it('supports Tooltip composition through render on pointer hover and keyboard focus', async () => {
    const itemRef = React.createRef<HTMLElement>();
    const onClick = vi.fn();
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button>Options</Button>} />
        <Menu2Popup transitionDuration={0}>
          <Menu2Item>Before</Menu2Item>
          <Menu2Item
            ref={itemRef}
            closeOnClick={false}
            onClick={onClick}
            render={(props) => (
              <Tooltip title="Create a new file" describeChild enterDelay={0} leaveDelay={0}>
                <div {...props} />
              </Tooltip>
            )}
          >
            File
          </Menu2Item>
          <Menu2Item>After</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const item = await screen.findByRole('menuitem', { name: 'File' });
    await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
    expect(itemRef.current).to.equal(item);
    expect(item.parentElement).to.equal(
      screen.getByRole('menuitem', { name: 'Before' }).parentElement,
    );

    await user.hover(item);
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).to.have.text('Create a new file');
      expect(item).to.have.attribute('aria-describedby', tooltip.id);
    });
    await user.unhover(item);
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
    await user.keyboard('{Enter}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Before' })).toHaveFocus());
    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'File' })).toHaveFocus());
    await waitFor(() => expect(screen.getByRole('tooltip')).to.have.text('Create a new file'));
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  it('describes disabled items on keyboard focus without activating them', async () => {
    const handleClick = vi.fn();
    const handleChange = vi.fn();
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Before</Menu2Item>
          <Tooltip title="Unavailable while offline" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2Item disabled onClick={handleClick}>
              Import
            </Menu2Item>
          </Tooltip>
          <Tooltip title="Locked in published view" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2CheckboxItem disabled onCheckedChange={handleChange}>
              Page breaks
            </Menu2CheckboxItem>
          </Tooltip>
          <Menu2RadioGroup defaultValue="fit" onValueChange={handleChange}>
            <Tooltip title="Unavailable in preview" describeChild enterDelay={0} leaveDelay={0}>
              <Menu2RadioItem disabled value="custom">
                Custom zoom
              </Menu2RadioItem>
            </Tooltip>
          </Menu2RadioGroup>
          <Menu2Item>After</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await act(async () => screen.getByRole('button', { name: 'Options' }).focus());
    await user.keyboard('{ArrowDown}');
    await waitFor(() =>
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'Before' })),
    );

    const items = [
      { role: 'menuitem', name: 'Import', description: 'Unavailable while offline' },
      {
        role: 'menuitemcheckbox',
        name: 'Page breaks',
        description: 'Locked in published view',
      },
      { role: 'menuitemradio', name: 'Custom zoom', description: 'Unavailable in preview' },
    ];

    for (const { role, name, description } of items) {
      // eslint-disable-next-line no-await-in-loop -- Navigate through each item in menu order.
      await user.keyboard('{ArrowDown}');
      const item = screen.getByRole(role, { name });
      // eslint-disable-next-line no-await-in-loop -- Wait for the focused item's tooltip.
      await waitFor(() => {
        expect(document.activeElement).to.equal(item);
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).to.have.text(description);
        expect(item).to.have.attribute('aria-describedby', tooltip.id);
      });
      expect(item).to.have.attribute('aria-disabled', 'true');

      // eslint-disable-next-line no-await-in-loop -- Check activation before moving to the next item.
      await user.keyboard('{Enter} ');
      expect(handleClick).not.toHaveBeenCalled();
      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole('menu')).not.to.equal(null);
      if (role !== 'menuitem') {
        expect(item).to.have.attribute('aria-checked', 'false');
      }
    }

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(document.activeElement).to.equal(screen.getByRole('menuitem', { name: 'After' }));
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });
});
