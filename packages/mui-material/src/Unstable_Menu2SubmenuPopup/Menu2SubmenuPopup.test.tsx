import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import Menu2 from '../Unstable_Menu2';
import Menu2Popup from '../Unstable_Menu2Popup';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import Menu2SubmenuPopup, {
  getMenu2SubmenuPopupUtilityClass,
  menu2SubmenuPopupClasses,
} from './index';
import describeConformance from '../../test/describeConformance';

describe('<Menu2SubmenuPopup />', () => {
  const { render } = createRenderer();

  it('exports utility classes under the public popup name', () => {
    const expectedClasses = {
      root: 'MuiMenu2SubmenuPopup-root',
      portal: 'MuiMenu2SubmenuPopup-portal',
      positioner: 'MuiMenu2SubmenuPopup-positioner',
      list: 'MuiMenu2SubmenuPopup-list',
    };
    expect(menu2SubmenuPopupClasses).to.deep.equal(expectedClasses);
    Object.entries(expectedClasses).forEach(([slot, className]) => {
      expect(getMenu2SubmenuPopupUtilityClass(slot)).to.equal(className);
    });
  });

  // Base UI needs browser layout to open a submenu.
  describe.skipIf(isJsdom())('conformance', () => {
    describeConformance(
      <Menu2SubmenuPopup>
        <Menu2Item>Nested</Menu2Item>
      </Menu2SubmenuPopup>,
      () => ({
        classes: menu2SubmenuPopupClasses,
        render: (node) =>
          render(
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                <Menu2Submenu defaultOpen>
                  <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                  {node}
                </Menu2Submenu>
              </Menu2Popup>
            </Menu2>,
          ),
        getRootElement: ({ baseElement }) =>
          baseElement.querySelector(`.${menu2SubmenuPopupClasses.root}`),
        skip: ['componentProp'],
        refInstanceof: window.HTMLDivElement,
        muiName: 'MuiMenu2SubmenuPopup',
        testVariantProps: { align: 'center' },
        slots: {
          portal: { expectedClassName: menu2SubmenuPopupClasses.portal },
          positioner: { expectedClassName: menu2SubmenuPopupClasses.positioner },
          list: { expectedClassName: menu2SubmenuPopupClasses.list },
        },
      }),
    );
  });
});
