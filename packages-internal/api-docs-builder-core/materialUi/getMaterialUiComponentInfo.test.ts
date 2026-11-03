import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import sinon from 'sinon';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

describe('getMaterialUiComponentInfo', () => {
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
