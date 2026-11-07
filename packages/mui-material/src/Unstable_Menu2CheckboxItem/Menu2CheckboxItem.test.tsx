import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import type { Menu2CheckboxItemProps } from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2CheckboxItem, {
  menu2CheckboxItemClasses as classes,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import describeConformance from '../../test/describeConformance';

const renderCases: {
  name: string;
  render?: Menu2CheckboxItemProps['render'];
  nativeButton?: boolean;
}[] = [
  { name: 'default root' },
  { name: 'render element', render: <div /> },
  { name: 'render callback', render: (props) => <div {...props} /> },
  { name: 'native button', render: <button type="button" /> },
  {
    name: 'native button callback',
    render: (props) => <button {...props} type="button" />,
    nativeButton: true,
  },
];

describe('<Menu2CheckboxItem />', () => {
  const { render } = createRenderer();

  describeConformance(<Menu2CheckboxItem>Ruler</Menu2CheckboxItem>, () => ({
    classes,
    render: (node) =>
      render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>{node}</Menu2Popup>
        </Menu2>,
      ),
    getRootElement: ({ baseElement }) => baseElement.querySelector(`.${classes.root}`),
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
    slots: {
      indicator: { expectedClassName: classes.indicator },
      indicatorIcon: { expectedClassName: classes.indicatorIcon },
    },
    muiName: 'MuiMenu2CheckboxItem',
    testVariantProps: { checked: true },
  }));

  // The item root is a ButtonBase. Base UI and ButtonBase both emulate keyboard
  // activation on a non-native root, which used to toggle the item twice.
  renderCases.forEach(({ name, render: renderProp, nativeButton }) => {
    it(`toggles once per activation with a ${name} and keeps the menu open by default`, async () => {
      const onCheckedChange = spy();
      const onOpenChange = spy();
      const { user } = render(
        <Menu2 defaultOpen modal={false} onOpenChange={onOpenChange}>
          <Menu2Popup anchor={document.body}>
            <Menu2CheckboxItem
              onCheckedChange={onCheckedChange}
              render={renderProp}
              nativeButton={nativeButton}
            >
              Ruler
            </Menu2CheckboxItem>
          </Menu2Popup>
        </Menu2>,
      );

      const item = screen.getByRole('menuitemcheckbox', { name: 'Ruler' });
      await act(async () => {
        item.focus();
      });

      await user.keyboard('[Space]');
      expect(onCheckedChange.callCount).to.equal(1);
      expect(onCheckedChange.lastCall.args[0]).to.equal(true);
      expect(item).to.have.attribute('aria-checked', 'true');
      expect(onOpenChange.callCount).to.equal(0);

      await user.keyboard('[Enter]');
      expect(onCheckedChange.callCount).to.equal(2);
      expect(onCheckedChange.lastCall.args[0]).to.equal(false);
      expect(item).to.have.attribute('aria-checked', 'false');
      expect(onOpenChange.callCount).to.equal(0);

      await user.click(item);
      expect(onCheckedChange.callCount).to.equal(3);
      expect(onCheckedChange.lastCall.args[0]).to.equal(true);
      expect(item).to.have.attribute('aria-checked', 'true');
      expect(onOpenChange.callCount).to.equal(0);
      expect(screen.getByRole('menu')).not.to.equal(null);
    });
  });
});
