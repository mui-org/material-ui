/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

const componentAreas = {
  accordion: 'surfaces',
  accordionactions: 'surfaces',
  accordiondetails: 'surfaces',
  accordionsummary: 'surfaces',
  alert: 'feedback',
  alerttitle: 'feedback',
  appbar: 'surfaces',
  aspectratio: 'dataDisplay',
  autocomplete: 'inputs',
  avatar: 'dataDisplay',
  avatargroup: 'dataDisplay',
  backdrop: 'feedback',
  badge: 'dataDisplay',
  bottomnavigation: 'navigation',
  bottomnavigationaction: 'navigation',
  box: 'layout',
  breadcrumbs: 'navigation',
  button: 'inputs',
  buttonbase: 'inputs',
  buttongroup: 'inputs',
  card: 'surfaces',
  cardactionarea: 'surfaces',
  cardactions: 'surfaces',
  cardcontent: 'surfaces',
  cardcover: 'surfaces',
  cardheader: 'surfaces',
  cardmedia: 'surfaces',
  cardoverflow: 'surfaces',
  checkbox: 'inputs',
  chip: 'dataDisplay',
  chipdelete: 'dataDisplay',
  circularprogress: 'feedback',
  clickawaylistener: 'utils',
  collapse: 'utils',
  container: 'layout',
  cssbaseline: 'utils',
  dialog: 'feedback',
  dialogactions: 'feedback',
  dialogcontent: 'feedback',
  dialogcontenttext: 'feedback',
  dialogtitle: 'feedback',
  divider: 'dataDisplay',
  drawer: 'navigation',
  fab: 'inputs',
  fade: 'utils',
  filledinput: 'inputs',
  formcontrol: 'inputs',
  formcontrollabel: 'inputs',
  formgroup: 'inputs',
  formhelpertext: 'inputs',
  formlabel: 'inputs',
  globalstyles: 'utils',
  gridlegacy: 'layout',
  grid: 'layout',
  grow: 'utils',
  hidden: 'layout',
  icon: 'dataDisplay',
  iconbutton: 'inputs',
  imagelist: 'layout',
  imagelistitem: 'layout',
  imagelistitembar: 'layout',
  input: 'inputs',
  inputadornment: 'inputs',
  inputbase: 'inputs',
  inputlabel: 'inputs',
  linearprogress: 'feedback',
  link: 'navigation',
  list: 'dataDisplay',
  listbox: 'utils',
  listdivider: 'dataDisplay',
  listitem: 'dataDisplay',
  listitemavatar: 'dataDisplay',
  listitembutton: 'dataDisplay',
  listitemcontent: 'dataDisplay',
  listitemdecorator: 'dataDisplay',
  listitemicon: 'dataDisplay',
  listitemsecondaryaction: 'dataDisplay',
  listitemtext: 'dataDisplay',
  listsubheader: 'dataDisplay',
  masonry: 'layout',
  mediaquery: 'utils',
  menu: 'navigation',
  menuitem: 'navigation',
  menulist: 'navigation',
  mobilestepper: 'navigation',
  modal: 'utils',
  multiselect: 'inputs',
  nativeselect: 'inputs',
  nossr: 'utils',
  option: 'inputs',
  optiongroup: 'inputs',
  outlinedinput: 'inputs',
  pagination: 'navigation',
  paginationitem: 'navigation',
  paper: 'surfaces',
  popover: 'utils',
  popper: 'utils',
  portal: 'utils',
  progress: 'feedback',
  radio: 'inputs',
  radiogroup: 'inputs',
  rating: 'inputs',
  scopedcssbaseline: 'utils',
  scrolltrigger: 'surfaces',
  select: 'inputs',
  sheet: 'surfaces',
  skeleton: 'feedback',
  slide: 'utils',
  slider: 'inputs',
  snackbar: 'feedback',
  snackbarcontent: 'feedback',
  speeddial: 'navigation',
  speeddialaction: 'navigation',
  speeddialicon: 'navigation',
  stack: 'layout',
  step: 'navigation',
  stepbutton: 'navigation',
  stepconnector: 'navigation',
  stepcontent: 'navigation',
  stepicon: 'navigation',
  steplabel: 'navigation',
  stepper: 'navigation',
  svgicon: 'dataDisplay',
  swipeabledrawer: 'navigation',
  switch: 'inputs',
  tab: 'navigation',
  table: 'dataDisplay',
  tablebody: 'dataDisplay',
  tablecell: 'dataDisplay',
  tablecontainer: 'dataDisplay',
  tablefooter: 'dataDisplay',
  tablehead: 'dataDisplay',
  tablepagination: 'dataDisplay',
  tablerow: 'dataDisplay',
  tablesortlabel: 'dataDisplay',
  tablist: 'navigation',
  tabpanel: 'navigation',
  tabs: 'navigation',
  tabscrollbutton: 'navigation',
  tabslist: 'navigation',
  textarea: 'inputs',
  textareaautosize: 'utils',
  textfield: 'inputs',
  timeline: 'dataDisplay',
  togglebutton: 'inputs',
  togglebuttongroup: 'inputs',
  toolbar: 'surfaces',
  tooltip: 'dataDisplay',
  touchripple: 'inputs',
  transferlist: 'inputs',
  transitions: 'utils',
  focustrap: 'utils',
  treeview: 'dataDisplay',
  typography: 'dataDisplay',
  zoom: 'utils',
};

const areaMaintainers = {
  inputs: ['michaldudak', 'mnajdova'],
  dataDisplay: ['siriwatknp', 'michaldudak'],
  feedback: ['siriwatknp', 'hbjORbj'],
  surfaces: ['siriwatknp', 'hbjORbj'],
  navigation: ['mnajdova', 'michaldudak'],
  layout: ['siriwatknp', 'hbjORbj'],
  utils: ['mnajdova', 'michaldudak'],
};

const packageOwners = {
  base: ['michaldudak'],
  material: ['mnajdova'],
};

const packageMaintainers = {
  base: ['michaldudak', 'mnajdova'],
  'icons-material': ['michaldudak', 'siriwatknp'],
  material: ['mnajdova'],
  system: ['mnajdova', 'siriwatknp'],
};

const additionalRules = {
  '/scripts/': ['michaldudak'],
};

const thisDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const buffer = [];

function write(text) {
  buffer.push(text);
}

function save() {
  const fileContents = [...buffer, ''].join('\n');
  fs.writeFileSync(path.join(thisDirectory, '../.github/CODEOWNERS'), fileContents);
}

function findComponentArea(componentName) {
  // TODO: could make it smarter to reduce the number of entries in componentAreas
  // for example, "AccordionActions" could look up "Accordion"
  return componentAreas[componentName];
}

function normalizeComponentName(componentName) {
  // remove the "use" and "Unstable_" prefixes and "Unstyled" suffix
  return componentName.replace(/^(use|Unstable_)?(.*?)(Unstyled)?$/gm, '$2').toLowerCase();
}

function normalizeDocsComponentName(componentName) {
  switch (componentName) {
    case 'breadcrumbs':
    case 'progress':
    case 'transitions':
      return componentName;

    case 'badges':
      return 'badge';

    case 'floating-action-button':
      return 'fab';

    case 'focus-trap':
      return 'focustrap';

    case 'radio-buttons':
      return 'radio';

    case 'tables':
      return 'table';

    default:
      // remove the "use" and "Unstable" prefixes and remove the trailing "s" or "es" to make a singular form
      return componentName
        .replace(/^(use|Unstable)?(.*?)(es|s)?$/gm, '$2')
        .replace(/-/g, '')
        .toLowerCase();
  }
}

function getCodeowners(mapping) {
  return Object.entries(mapping)
    .map(([directory, maintainers]) => `${directory} @${maintainers.join(' @')}`)
    .join('\n');
}

function getAreaMaintainers(area, packageName) {
  return Array.from(
    new Set([
      ...areaMaintainers[area],
      // Material UI package owner is not added to individual components' owners
      // to reduce the number of PRs they'll get to review.
      ...(packageName === 'material' ? [] : packageOwners[packageName]),
    ]),
  )
    .map((name) => `@${name}`)
    .join(' ');
}

function processComponents(packageName) {
  const componentsDirectory = path.join(thisDirectory, `../packages/mui-${packageName}/src`);
  const componentDirectories = fs.readdirSync(componentsDirectory);
  const result = [];

  for (const componentDirectory of componentDirectories) {
    if (!fs.statSync(path.join(componentsDirectory, componentDirectory)).isDirectory()) {
      continue;
    }

    const componentName = normalizeComponentName(componentDirectory);
    const componentArea = findComponentArea(componentName);

    if (componentArea) {
      const maintainers = getAreaMaintainers(componentArea, packageName);
      const codeowners = `/packages/mui-${packageName}/src/${componentDirectory}/ ${maintainers}`;

      result.push(codeowners);
    } else {
      console.info(`No explicit owner defined for "${componentDirectory}" in ${packageName}.`);
    }
  }

  return result.join('\n');
}

function processDocs(packageName) {
  const docsDirectory = path.join(thisDirectory, `../docs/data/${packageName}/components`);
  const componentDirectories = fs.readdirSync(docsDirectory);
  const result = [];

  for (const componentDirectory of componentDirectories) {
    if (!fs.statSync(path.join(docsDirectory, componentDirectory)).isDirectory()) {
      continue;
    }

    const componentName = normalizeDocsComponentName(componentDirectory);
    const componentArea = findComponentArea(componentName);

    if (componentArea) {
      const maintainers = getAreaMaintainers(componentArea, packageName);
      const codeowners = `/docs/data/${packageName}/components/${componentDirectory}/ ${maintainers}`;
      result.push(codeowners);
    } else {
      console.info(
        `No explicit owner defined for docs of "${componentDirectory}" in ${packageName}.`,
      );
    }
  }

  return result.join('\n');
}

function processPackages() {
  return Object.entries(packageMaintainers)
    .map(([packageName, maintainers]) => `/packages/mui-${packageName}/ @${maintainers.join(' @')}`)
    .join('\n');
}

function run() {
  write('# This file is auto-generated, do not modify it manually.');
  write('# run `pnpm generate-codeowners` to update it.\n\n');

  write(getCodeowners(additionalRules));

  write('\n# Packages\n');
  write(processPackages());

  write('\n# Components - Material UI\n');
  write(processComponents('material'));
  write(processDocs('material'));

  write('\n# Components - Base UI\n');
  write(processComponents('base'));
  write(processDocs('base'));

  save();
}

run();
