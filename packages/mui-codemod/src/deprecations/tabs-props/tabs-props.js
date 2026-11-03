import movePropIntoSlots from '../utils/movePropIntoSlots';
import movePropIntoSlotProps from '../utils/movePropIntoSlotProps';
import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';

const slotKeyRenames = {
  StartScrollButtonIcon: 'startScrollButtonIcon',
  EndScrollButtonIcon: 'endScrollButtonIcon',
};

function renameSlotKey(property) {
  const name = property.key?.name || property.key?.value;
  if (name && slotKeyRenames[name]) {
    property.key.name = slotKeyRenames[name];
  }
}

function renameJsxSlotKeys(j, element, attributeName) {
  element.openingElement.attributes.forEach((attr) => {
    if (
      attr.type === 'JSXAttribute' &&
      attr.name?.name === attributeName &&
      attr.value?.expression?.type === 'ObjectExpression'
    ) {
      attr.value.expression.properties.forEach(renameSlotKey);
    }
  });
}

function renameDefaultPropsSlotKeys(j, defaultPropsPathCollection, attributeName) {
  defaultPropsPathCollection
    .find(j.ObjectProperty, { key: { name: attributeName } })
    .forEach((path) => {
      if (path.value.value.type === 'ObjectExpression') {
        path.value.value.properties.forEach(renameSlotKey);
      }
    });
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  movePropIntoSlots(j, {
    root,
    packageName: options.packageName,
    componentName: 'Tabs',
    propName: 'ScrollButtonComponent',
    slotName: 'scrollButtons',
  });
  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Tabs',
    propName: 'TabScrollButtonProps',
    slotName: 'scrollButtons',
  });

  movePropIntoSlotProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Tabs',
    propName: 'TabIndicatorProps',
    slotName: 'indicator',
  });

  findComponentJSX(
    j,
    { root, packageName: options.packageName, componentName: 'Tabs' },
    (elementPath) => {
      renameJsxSlotKeys(j, elementPath.node, 'slots');
    },
  );

  const defaultPropsPathCollection = findComponentDefaultProps(j, {
    root,
    packageName: options.packageName,
    componentName: 'Tabs',
  });

  renameDefaultPropsSlotKeys(j, defaultPropsPathCollection, 'slots');

  return root.toSource(printOptions);
}
