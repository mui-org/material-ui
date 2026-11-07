import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '../styles';
import Menu2CheckboxItem from '../Unstable_Menu2CheckboxItem';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2LinkItem from '../Unstable_Menu2LinkItem';
import Menu2RadioGroup from '../Unstable_Menu2RadioGroup';
import Menu2RadioItem from '../Unstable_Menu2RadioItem';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import Menu2 from './Menu2';

// Every item part gives its render or slot callback and theme variants the live state.
const slotProps = {
  root: (ownerState: { highlighted?: boolean }) => ({
    'data-testid': 'target',
    'data-owner-highlighted': String(ownerState.highlighted),
  }),
};

const cases = [
  {
    name: 'MuiMenu2Item',
    item: (
      <Menu2Item render={(props, state) => <div {...props} {...slotProps.root(state)} />}>
        Target
      </Menu2Item>
    ),
  },
  {
    name: 'MuiMenu2LinkItem',
    item: (
      <Menu2LinkItem
        href="#target"
        render={(props, state) => (
          <a {...props} {...slotProps.root(state)}>
            {props.children}
          </a>
        )}
      >
        Target
      </Menu2LinkItem>
    ),
  },
  {
    name: 'MuiMenu2CheckboxItem',
    item: (
      <Menu2CheckboxItem render={(props, state) => <div {...props} {...slotProps.root(state)} />}>
        Target
      </Menu2CheckboxItem>
    ),
  },
  {
    name: 'MuiMenu2RadioItem',
    item: (
      <Menu2RadioGroup defaultValue="target">
        <Menu2RadioItem
          value="target"
          render={(props, state) => <div {...props} {...slotProps.root(state)} />}
        >
          Target
        </Menu2RadioItem>
      </Menu2RadioGroup>
    ),
  },
  {
    name: 'MuiMenu2SubmenuTrigger',
    item: (
      <Menu2Submenu>
        <Menu2SubmenuTrigger
          openOnHover={false}
          render={(props, state) => <div {...props} {...slotProps.root(state)} />}
        >
          Target
        </Menu2SubmenuTrigger>
        <Menu2SubmenuPopup>
          <Menu2Item>Nested</Menu2Item>
        </Menu2SubmenuPopup>
      </Menu2Submenu>
    ),
  },
] as const;

describe.skipIf(isJsdom())('Menu2 live highlighted ownerState', () => {
  const { render } = createRenderer();

  cases.forEach(({ name, item }) => {
    it(`${name} gives its root customization and theme variants the live highlighted state`, async () => {
      const theme = createTheme({
        components: {
          [name]: { variants: [{ props: { highlighted: true }, style: { paddingRight: '23px' } }] },
        },
      });
      const { user } = render(
        <ThemeProvider theme={theme}>
          <Menu2>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup transitionDuration={0}>
              <Menu2Item>Before</Menu2Item>
              {item}
              <Menu2Item>After</Menu2Item>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      const target = await screen.findByTestId('target');
      await waitFor(() => expect(screen.getByRole('menu')).toHaveFocus());
      expect(target).to.have.attribute('data-owner-highlighted', 'false');
      const idlePadding = getComputedStyle(target).paddingRight;
      expect(idlePadding).not.to.equal('23px');

      await user.keyboard('{ArrowDown}{ArrowDown}');
      await waitFor(() => expect(target).to.have.attribute('data-highlighted'));
      expect(target).to.have.attribute('data-owner-highlighted', 'true');
      expect(getComputedStyle(target).paddingRight).to.equal('23px');

      await user.keyboard('{ArrowDown}');
      await waitFor(() => expect(target).not.to.have.attribute('data-highlighted'));
      expect(target).to.have.attribute('data-owner-highlighted', 'false');
      expect(getComputedStyle(target).paddingRight).to.equal(idlePadding);
    });
  });
});
