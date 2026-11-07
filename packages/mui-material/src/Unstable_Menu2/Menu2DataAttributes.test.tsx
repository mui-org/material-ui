import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2CheckboxItem from '../Unstable_Menu2CheckboxItem';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2RadioGroup from '../Unstable_Menu2RadioGroup';
import Menu2RadioItem from '../Unstable_Menu2RadioItem';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import Menu2 from './Menu2';

function expectCheckedState(elements: Element[], checked: boolean) {
  elements.forEach((element) => {
    expect(element).to.have.attribute(checked ? 'data-checked' : 'data-unchecked', '');
    expect(element).not.to.have.attribute(checked ? 'data-unchecked' : 'data-checked');
  });
}

describe('Menu2 state data attributes', () => {
  const { render } = createRenderer();

  it.skipIf(isJsdom())(
    'updates the root trigger attributes when the menu opens and closes',
    async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup transitionDuration={0}>
            <Menu2Item>Action</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      const trigger = screen.getByRole('button', { name: 'Options' });
      expect(trigger).not.to.have.attribute('data-popup-open');
      expect(trigger).not.to.have.attribute('data-pressed');

      await user.click(trigger);
      const menu = await screen.findByRole('menu');
      await waitFor(() => expect(menu).toHaveFocus());
      expect(trigger).to.have.attribute('data-popup-open', '');
      expect(trigger).to.have.attribute('data-pressed', '');

      await user.keyboard('{Escape}');
      await waitFor(() => expect(trigger).not.to.have.attribute('data-popup-open'));
      expect(trigger).not.to.have.attribute('data-pressed');
    },
  );

  it.skipIf(isJsdom())(
    'updates the submenu trigger without changing the root trigger state',
    async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup transitionDuration={0}>
            <Menu2Submenu>
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup transitionDuration={0}>
                <Menu2Item>Nested action</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );
      const rootTrigger = screen.getByRole('button', { name: 'Options' });
      await user.tab();
      await user.keyboard('{Enter}');
      const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
      await waitFor(() => expect(submenuTrigger).toHaveFocus());
      expect(submenuTrigger).not.to.have.attribute('data-popup-open');

      await user.keyboard('{ArrowRight}');
      const nestedItem = await screen.findByRole('menuitem', { name: 'Nested action' });
      await waitFor(() => expect(nestedItem).toHaveFocus());
      expect(submenuTrigger).to.have.attribute('data-popup-open', '');
      expect(rootTrigger).to.have.attribute('data-popup-open', '');

      await user.keyboard('{ArrowLeft}');
      await waitFor(() => expect(submenuTrigger).not.to.have.attribute('data-popup-open'));
      expect(rootTrigger).to.have.attribute('data-popup-open', '');
    },
  );

  it('updates checked attributes on the checkbox item and its default indicator', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2CheckboxItem slotProps={{ indicator: { 'data-testid': 'indicator' } }}>
            Ruler
          </Menu2CheckboxItem>
        </Menu2Popup>
      </Menu2>,
    );
    const item = screen.getByRole('menuitemcheckbox', { name: 'Ruler' });
    const indicator = screen.getByTestId('indicator');
    expectCheckedState([item, indicator], false);

    await user.click(item);
    expectCheckedState([item, indicator], true);

    await user.click(item);
    expectCheckedState([item, indicator], false);
    expect(indicator.isConnected).to.equal(true);
  });

  it('moves checked attributes between radio items and their default indicators', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <Menu2RadioGroup defaultValue="one">
            <Menu2RadioItem
              value="one"
              slotProps={{ indicator: { 'data-testid': 'one-indicator' } }}
            >
              One
            </Menu2RadioItem>
            <Menu2RadioItem
              value="two"
              slotProps={{ indicator: { 'data-testid': 'two-indicator' } }}
            >
              Two
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );
    const one = screen.getByRole('menuitemradio', { name: 'One' });
    const two = screen.getByRole('menuitemradio', { name: 'Two' });
    const oneIndicator = screen.getByTestId('one-indicator');
    const twoIndicator = screen.getByTestId('two-indicator');
    expectCheckedState([one, oneIndicator], true);
    expectCheckedState([two, twoIndicator], false);

    await user.click(two);
    expectCheckedState([one, oneIndicator], false);
    expectCheckedState([two, twoIndicator], true);

    await user.click(one);
    expectCheckedState([one, oneIndicator], true);
    expectCheckedState([two, twoIndicator], false);
  });

  it('removes disabled attributes when items become enabled', async () => {
    function Demo() {
      const [disabled, setDisabled] = React.useState(true);

      return (
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Item closeOnClick={false} onClick={() => setDisabled(false)}>
              Enable items
            </Menu2Item>
            <Menu2Item disabled={disabled}>Action</Menu2Item>
            <Menu2CheckboxItem
              disabled={disabled}
              slotProps={{ indicator: { 'data-testid': 'checkbox-indicator' } }}
            >
              Ruler
            </Menu2CheckboxItem>
            <Menu2RadioGroup>
              <Menu2RadioItem
                value="one"
                disabled={disabled}
                slotProps={{ indicator: { 'data-testid': 'radio-indicator' } }}
              >
                One
              </Menu2RadioItem>
            </Menu2RadioGroup>
          </Menu2Popup>
        </Menu2>
      );
    }

    const { user } = render(<Demo />);
    const enableItem = screen.getByRole('menuitem', { name: 'Enable items' });
    const targets = [
      screen.getByRole('menuitem', { name: 'Action' }),
      screen.getByRole('menuitemcheckbox', { name: 'Ruler' }),
      screen.getByRole('menuitemradio', { name: 'One' }),
      screen.getByTestId('checkbox-indicator'),
      screen.getByTestId('radio-indicator'),
    ];
    expect(enableItem).not.to.have.attribute('data-disabled');
    targets.forEach((target) => expect(target).to.have.attribute('data-disabled', ''));

    await user.click(enableItem);
    targets.forEach((target) => expect(target).not.to.have.attribute('data-disabled'));
  });

  it('removes the disabled attribute when a submenu trigger becomes enabled', async () => {
    function Demo() {
      const [disabled, setDisabled] = React.useState(true);

      return (
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Item closeOnClick={false} onClick={() => setDisabled(false)}>
              Enable submenu
            </Menu2Item>
            <Menu2Submenu>
              <Menu2SubmenuTrigger disabled={disabled} openOnHover={false}>
                More
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested action</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      );
    }

    const { user } = render(<Demo />);
    const trigger = screen.getByRole('menuitem', { name: 'More' });
    expect(trigger).to.have.attribute('data-disabled', '');

    await user.click(screen.getByRole('menuitem', { name: 'Enable submenu' }));
    expect(trigger).not.to.have.attribute('data-disabled');
    expect(trigger).not.to.have.attribute('data-popup-open');
  });
});
