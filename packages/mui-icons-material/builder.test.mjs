import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { RENAME_FILTER_MUI, RENAME_FILTER_DEFAULT, getComponentName, handler } from './builder.mjs';

const currentDirectory = path.dirname(fileURLToPath(new URL(import.meta.url)));

const DISABLE_LOG = true;

// To cut down on test time, use fixtures instead of node_modules
// const MUI_ICONS_ROOT = path.join(currentDirectory, '../node_modules/material-design-icons/');
const MUI_ICONS_ROOT = path.join(currentDirectory, './fixtures/material-design-icons/');
const MUI_ICONS_SVG_DIR = path.join(MUI_ICONS_ROOT, 'svg');

const GAME_ICONS_ROOT = path.join(currentDirectory, './fixtures/game-icons/');
const GAME_ICONS_SVG_DIR = path.join(GAME_ICONS_ROOT, 'svg/icons/');

describe('builder', () => {
  describe('#getComponentName', () => {
    it('should change capitalize dashes', () => {
      expect(getComponentName('hi-world')).to.equal('HiWorld');
    });

    it('should capitalize based on environment path.sep', () => {
      expect(getComponentName(`this${path.sep}dir`)).to.equal('ThisDir');
    });
  });

  it('should have icons to test with', () => {
    expect(fs.lstatSync(MUI_ICONS_SVG_DIR).isDirectory()).to.equal(true);
  });

  describe('--output-dir', () => {
    const options = {
      svgDir: MUI_ICONS_SVG_DIR,
      innerPath: '/svg/production/',
      glob: '/**/production/*_24px.svg',
      renameFilter: RENAME_FILTER_MUI,
      disableLog: DISABLE_LOG,
      outputDir: null,
    };

    beforeEach(
      process.env.VITEST
        ? async function beforeEachHook(ctx) {
            // DON'T CLEAN UP TO MAKE TEST INSPECTABLE
            options.outputDir = path.join(
              os.tmpdir(),
              'material-ui-icons-builder-test',
              ctx.task.name,
            );
            await emptyDir(options.outputDir);
          }
        : async function beforeEachHook() {
            // DON'T CLEAN UP TO MAKE TEST INSPECTABLE
            options.outputDir = path.join(
              os.tmpdir(),
              'material-ui-icons-builder-test',
              this.currentTest.fullTitle(),
            );
            await emptyDir(options.outputDir);
          },
    );

    it('script outputs to directory', async () => {
      await handler(options);
      expect(fs.lstatSync(options.outputDir).isDirectory()).to.equal(true);
      expect(fs.lstatSync(path.join(options.outputDir, 'index.js')).isFile()).to.equal(true);
    });
  });

  describe('--svg-dir, --innerPath, --fileSuffix', () => {
    const options = {
      svgDir: GAME_ICONS_SVG_DIR,
      glob: '**/*.svg',
      innerPath: '/dice/svg/000000/transparent/',
      renameFilter: RENAME_FILTER_DEFAULT,
      disableLog: false,
      outputDir: null,
    };

    beforeEach(
      process.env.VITEST
        ? async function beforeEachHook(ctx) {
            // DON'T CLEAN UP TO MAKE TEST INSPECTABLE
            options.outputDir = path.join(
              os.tmpdir(),
              'material-ui-icons-builder-test',
              ctx.task.name,
            );
            await emptyDir(options.outputDir);
          }
        : async function beforeEachHook() {
            // DON'T CLEAN UP TO MAKE TEST INSPECTABLE
            options.outputDir = path.join(
              os.tmpdir(),
              'material-ui-icons-builder-test',
              this.currentTest.fullTitle(),
            );
            await emptyDir(options.outputDir);
          },
    );

    it('script outputs to directory', async () => {
      await handler(options);
      expect(fs.lstatSync(options.outputDir).isDirectory()).to.equal(true);
      expect(fs.lstatSync(path.join(options.outputDir, 'delapouite')).isDirectory()).to.equal(true);

      const actualFilePath = path.join(
        options.outputDir,
        'delapouite',
        'dice',
        'svg',
        '000000',
        'transparent',
        'Dice-six-faces-four.js',
      );
      expect(fs.existsSync(actualFilePath)).to.equal(true);

      const actualFileData = fs.readFileSync(actualFilePath, { encoding: 'utf8' });
      expect(actualFileData).to.include("import createSvgIcon from './utils/createSvgIcon'");
    });
  });

  describe('Template rendering', () => {
    const options = {
      svgDir: MUI_ICONS_SVG_DIR,
      innerPath: '/svg/',
      glob: '/*_24px.svg',
      renameFilter: RENAME_FILTER_MUI,
      disableLog: DISABLE_LOG,
      outputDir: null,
    };

    beforeEach(
      process.env.VITEST
        ? async function beforeEachHook(ctx) {
            // DON'T CLEAN UP TO MAKE TEST INSPECTABLE
            options.outputDir = path.join(
              os.tmpdir(),
              'material-ui-icons-builder-test',
              ctx.task.name,
            );
            await emptyDir(options.outputDir);
          }
        : async function beforeEachHook() {
            // DON'T CLEAN UP TO MAKE TEST INSPECTABLE
            options.outputDir = path.join(
              os.tmpdir(),
              'material-ui-icons-builder-test',
              this.currentTest.fullTitle(),
            );
            await emptyDir(options.outputDir);
          },
    );

    it('should produce the expected output', async () => {
      await handler(options);
      expect(fs.lstatSync(options.outputDir).isDirectory()).to.equal(true);

      const cases = [
        'Accessibility.js',
        'StarRounded.js',
        'QueueMusicOutlined.js',
        'AccessAlarms.js',
        'TimesOneMobiledata.js',
        'ThirtyFps.js',
        'SixtyFps.js',
        'FiveMp.js',
        'ElevenMp.js',
        'TwentyFourMp.js',
        'AccessAlarmsTwoTone.js',
        'RecordVoiceOverTwoTone.js',
      ];

      cases.forEach((name) => {
        const actual = fs.readFileSync(path.join(options.outputDir, name), { encoding: 'utf8' });
        // Update the snapshots
        // fs.writeFileSync(path.join(MUI_ICONS_ROOT, 'expected', name), actual, { encoding: 'utf8' });

        const expected = fs.readFileSync(path.join(MUI_ICONS_ROOT, 'expected', name), {
          encoding: 'utf8',
        });

        expect(actual).to.equal(expected);
      });
    });
  });
});

// These 23 legacy *Outline icons were removed in v9 because they were
// exact SVG-path duplicates of their *Outlined counterparts.
// This test prevents them from being silently reintroduced.
// eslint-disable-next-line import/prefer-default-export
export const LEGACY_OUTLINE_ICONS = [
  'AddCircleOutline',
  'ChatBubbleOutline',
  'CheckCircleOutline',
  'DeleteOutline',
  'DoneOutline',
  'DriveFileMoveOutline',
  'ErrorOutline',
  'HelpOutline',
  'InfoOutline',
  'LabelImportantOutline',
  'LightbulbOutline',
  'LockOutline',
  'MailOutline',
  'ModeEditOutline',
  'PauseCircleOutline',
  'PeopleOutline',
  'PersonOutline',
  'PieChartOutline',
  'PlayCircleOutline',
  'RemoveCircleOutline',
  'StarOutline',
  'WorkOutline',
  'WorkspacesOutline',
];

describe('Legacy *Outline icon removal', () => {
  let indexContent;

  beforeAll(() => {
    indexContent = fs.readFileSync(path.join(currentDirectory, 'lib', 'index.js'), {
      encoding: 'utf8',
    });
  });

  LEGACY_OUTLINE_ICONS.forEach((name) => {
    it(`should not export ${name}`, () => {
      // Check that the icon is not exported from the package index
      expect(indexContent).not.to.include(`"${name}"`);
      // Check that the component file does not exist
      expect(fs.existsSync(path.join(currentDirectory, 'lib', `${name}.js`))).to.equal(false);
    });
  });

  it('should still export DriveFileRenameOutline (not a duplicate)', () => {
    expect(indexContent).to.include('"DriveFileRenameOutline"');
    expect(fs.existsSync(path.join(currentDirectory, 'lib', 'DriveFileRenameOutline.js'))).to.equal(
      true,
    );
  });
});

async function emptyDir(dir) {
  await fs.promises.rm(dir, { recursive: true, force: true });
  await fs.promises.mkdir(dir, { recursive: true });
}
