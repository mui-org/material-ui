import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import Menu2 from '../Unstable_Menu2';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Popup, { getMenu2PopupUtilityClass, menu2PopupClasses } from './index';
import describeConformance from '../../test/describeConformance';

describe('<Menu2Popup />', () => {
  const { render } = createRenderer();

  it('exports utility classes under the public popup name', () => {
    const expectedClasses = {
      root: 'MuiMenu2Popup-root',
      portal: 'MuiMenu2Popup-portal',
      positioner: 'MuiMenu2Popup-positioner',
      backdrop: 'MuiMenu2Popup-backdrop',
      list: 'MuiMenu2Popup-list',
    };
    expect(menu2PopupClasses).to.deep.equal(expectedClasses);
    Object.entries(expectedClasses).forEach(([slot, className]) => {
      expect(getMenu2PopupUtilityClass(slot)).to.equal(className);
    });
  });

  describeConformance(
    <Menu2Popup anchor={document.body}>
      <Menu2Item>Item</Menu2Item>
    </Menu2Popup>,
    () => ({
      classes: menu2PopupClasses,
      render: (node) =>
        render(
          <Menu2 defaultOpen modal={false}>
            {node}
          </Menu2>,
        ),
      getRootElement: () => screen.getByRole('menu'),
      skip: ['componentProp'],
      refInstanceof: window.HTMLDivElement,
      muiName: 'MuiMenu2Popup',
      testVariantProps: { align: 'center' },
      slots: {
        portal: { expectedClassName: menu2PopupClasses.portal },
        positioner: { expectedClassName: menu2PopupClasses.positioner },
        list: { expectedClassName: menu2PopupClasses.list },
      },
    }),
  );
});
