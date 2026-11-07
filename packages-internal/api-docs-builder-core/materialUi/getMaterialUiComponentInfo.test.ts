import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import sinon from 'sinon';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

describe('getMaterialUiComponentInfo', () => {
  it.each([
    { name: 'Menu2', api: 'menu-2', spread: false },
    { name: 'Menu2Submenu', api: 'menu-2-submenu', spread: false },
    { name: 'Menu2Popup', api: 'menu-2-popup', spread: true },
    { name: 'Menu2SubmenuPopup', api: 'menu-2-submenu-popup', spread: true },
  ])('documents the $name HTML prop contract', ({ name, api, spread }) => {
    const componentInfo = getMaterialUiComponentInfo(
      path.join(process.cwd(), 'packages/mui-material/src', `Unstable_${name}`, `${name}.tsx`),
    );
    const metadata = JSON.parse(
      fs.readFileSync(path.join(componentInfo.apiPagesDirectory, `${api}.json`), 'utf8'),
    );

    expect(componentInfo.readFile().spread).to.equal(spread);
    expect(metadata.spread).to.equal(spread);
    expect(metadata.forwardsRefTo).to.equal(spread ? 'HTMLDivElement' : undefined);
  });

  it.each([
    ['internal/MenuItemBase.tsx', true],
    ['internal/Menu2ItemBase.tsx', true],
    ['Unstable_Menu2/Menu2IndicatorBase.tsx', true],
    ['Unstable_Menu2/Menu2PopupSlotBases.tsx', true],
    ['Unstable_Menu2SubmenuTrigger/Menu2SubmenuTriggerRootSlot.tsx', true],
    ['Unstable_Menu2/Menu2.tsx', false],
    ['Unstable_Menu2Popup/Menu2Popup.tsx', false],
    ['Unstable_Menu2SubmenuPopup/Menu2SubmenuPopup.tsx', false],
    ['Unstable_Menu2SubmenuTrigger/Menu2SubmenuTrigger.tsx', false],
    ['Popper/BasePopper.tsx', true],
    ['MenuItem/MenuItem.js', false],
    ['Menu/Menu.js', false],
  ] as const)('sets shouldSkip for %s to %s', (filename, shouldSkip) => {
    const componentInfo = getMaterialUiComponentInfo(
      path.join(process.cwd(), 'packages/mui-material/src', filename),
    );

    expect(componentInfo.readFile().shouldSkip).to.equal(shouldSkip);
  });

  it('return correct info for material component file', () => {
    const componentInfo = getMaterialUiComponentInfo(
      path.join(process.cwd(), `/packages/mui-material/src/Button/Button.js`),
    );
    sinon.assert.match(componentInfo, {
      name: 'Button',
      apiPathname: '/material-ui/api/button/',
      muiName: 'MuiButton',
      apiPagesDirectory: sinon.match((value) =>
        value.endsWith(path.join('docs', 'pages', 'material-ui', 'api')),
      ),
    });

    expect(componentInfo.getInheritance('ButtonBase')).to.deep.equal({
      name: 'ButtonBase',
      apiPathname: '/material-ui/api/button-base/',
    });

    let existed = false;
    try {
      fs.readdirSync(path.join(process.cwd(), 'docs/data'));
      existed = true;
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (existed) {
      const demos = componentInfo.getDemos();
      expect(demos).to.not.have.lengthOf(0);

      expect(demos[0]).to.deep.include({
        demoPageTitle: 'Button Group',
        demoPathname: '/material-ui/react-button-group/',
      });
      expect(demos[0].filePath).to.include('button-group/button-group.md');

      expect(demos[1]).to.deep.include({
        demoPageTitle: 'Button',
        demoPathname: '/material-ui/react-button/',
      });
      expect(demos[1].filePath).to.include('buttons/buttons.md');
    }
  });
});
