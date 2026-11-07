import path from 'path';
import { describe, it, expect } from 'vitest';
import { projectSettings } from './projectSettings';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

describe('Material UI API project settings', () => {
  it.each([
    'Menu2',
    'Menu2Trigger',
    'Menu2Popup',
    'Menu2CheckboxItem',
    'Menu2Group',
    'Menu2GroupLabel',
    'Menu2Item',
    'Menu2LinkItem',
    'Menu2RadioGroup',
    'Menu2RadioItem',
    'Menu2Separator',
    'Menu2Submenu',
    'Menu2SubmenuTrigger',
    'Menu2SubmenuPopup',
  ])('documents the public %s API without a separate entrypoint', (name) => {
    const entryPoint = `src/Unstable_${name}/${name}.tsx`;
    const filename = path.join(process.cwd(), 'packages/mui-material', entryPoint);

    expect(projectSettings.typeScriptProjects[0].entryPointPath).not.to.include(entryPoint);
    expect(projectSettings.skipComponent?.(filename)).to.equal(false);
    const componentInfo = getMaterialUiComponentInfo(filename);
    expect(componentInfo.importName).to.equal(name.replace(/^Menu2/, 'Menu'));
    expect(componentInfo.readFile().shouldSkip).to.equal(false);
    expect(componentInfo.getDemos()).to.containSubset([
      { demoPathname: '/material-ui/react-menu2/' },
    ]);
  });

  it('uses the default import examples for existing components', () => {
    expect(projectSettings.getComponentImports).to.equal(undefined);
    expect(
      getMaterialUiComponentInfo(
        path.join(process.cwd(), 'packages/mui-material/src/Button/Button.js'),
      ).importName,
    ).to.equal(undefined);
  });

  it('uses the Container classes inherited by PigmentContainer', () => {
    expect(projectSettings.generateClassName('MuiPigmentContainer', 'root')).to.equal(
      'MuiContainer-root',
    );
    expect(projectSettings.generateClassName('MuiPigmentContainer', 'disableGutters')).to.equal(
      'MuiContainer-disableGutters',
    );
  });
});
