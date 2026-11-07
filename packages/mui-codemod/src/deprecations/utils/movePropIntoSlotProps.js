import findComponentJSX from '../../util/findComponentJSX';
import findComponentDefaultProps from '../../util/findComponentDefaultProps';
import assignObject from '../../util/assignObject';
import appendAttribute from '../../util/appendAttribute';

function mergeSlotProps(j, removedValue, existingSlot, resolveUnknownSlotProps) {
  const isCallback =
    existingSlot.type === 'ArrowFunctionExpression' || existingSlot.type === 'FunctionExpression';

  if (!isCallback && (!resolveUnknownSlotProps || existingSlot.type === 'ObjectExpression')) {
    return j.objectExpression([j.spreadElement(removedValue), j.spreadElement(existingSlot)]);
  }

  const usedNames = new Set(
    j([removedValue, existingSlot])
      .find(j.Identifier)
      .nodes()
      .map((node) => node.name),
  );
  [removedValue, existingSlot].forEach((node) => {
    if (node.type === 'Identifier') {
      usedNames.add(node.name);
    }
  });
  const createIdentifier = (baseName) => {
    let name = baseName;
    let index = 1;
    while (usedNames.has(name)) {
      name = `${baseName}${index}`;
      index += 1;
    }
    usedNames.add(name);
    return j.identifier(name);
  };

  const ownerState = createIdentifier('ownerState');
  if (isCallback) {
    return j.arrowFunctionExpression(
      [ownerState],
      j.objectExpression([
        j.spreadElement(removedValue),
        j.spreadElement(j.callExpression(existingSlot, [ownerState])),
      ]),
    );
  }

  const slotProps = createIdentifier('slotProps');
  return j.arrowFunctionExpression(
    [ownerState],
    j.blockStatement([
      j.variableDeclaration('const', [j.variableDeclarator(slotProps, existingSlot)]),
      j.returnStatement(
        j.objectExpression([
          j.spreadElement(removedValue),
          j.spreadElement(
            j.conditionalExpression(
              j.binaryExpression(
                '===',
                j.unaryExpression('typeof', slotProps),
                j.literal('function'),
              ),
              j.callExpression(slotProps, [ownerState]),
              slotProps,
            ),
          ),
        ]),
      ),
    ]),
  );
}

function moveJsxPropIntoSlotProps(
  j,
  element,
  propName,
  slotName,
  slotPropName,
  resolveUnknownSlotProps,
) {
  const propIndex = element.openingElement.attributes.findIndex(
    (attr) => attr.type === 'JSXAttribute' && attr.name.name === propName,
  );

  if (propIndex !== -1) {
    const removedAttr = element.openingElement.attributes.splice(propIndex, 1)[0];
    const removedValue =
      removedAttr.value.type === 'StringLiteral'
        ? j.literal(removedAttr.value.value)
        : removedAttr.value.expression;

    let hasSlotProps = false;
    element.openingElement.attributes.forEach((attr) => {
      if (attr.name?.name === 'slotProps') {
        hasSlotProps = true;
        const slots = attr.value.expression;
        const slotIndex = slots.properties.findIndex((prop) => prop?.key?.name === slotName);

        if (slotIndex === -1) {
          // Create new slot
          const slotValue = slotPropName
            ? j.objectExpression([j.objectProperty(j.identifier(slotPropName), removedValue)])
            : removedValue;

          assignObject(j, {
            target: attr,
            key: slotName,
            expression: slotValue,
          });
        } else {
          // Add property to existing slot
          const existingSlot = slots.properties[slotIndex].value;
          if (slotPropName) {
            if (existingSlot.type === 'ObjectExpression') {
              existingSlot.properties.push(
                j.objectProperty(j.identifier(slotPropName), removedValue),
              );
            } else {
              slots.properties[slotIndex].value = j.objectExpression([
                j.objectProperty(j.identifier(slotPropName), removedValue),
              ]);
            }
          } else {
            slots.properties[slotIndex].value = mergeSlotProps(
              j,
              removedValue,
              existingSlot,
              resolveUnknownSlotProps,
            );
          }
        }
      }
    });

    if (!hasSlotProps) {
      // Create new slotProps
      const slotValue = slotPropName
        ? j.objectExpression([j.objectProperty(j.identifier(slotPropName), removedValue)])
        : removedValue;

      appendAttribute(j, {
        target: element,
        attributeName: 'slotProps',
        expression: j.objectExpression([j.objectProperty(j.identifier(slotName), slotValue)]),
      });
    }
  }
}

function moveDefaultPropsPropIntoslotProps(
  j,
  defaultPropsPathCollection,
  propName,
  slotName,
  slotPropName,
  resolveUnknownSlotProps,
) {
  defaultPropsPathCollection.find(j.ObjectProperty, { key: { name: propName } }).forEach((path) => {
    const removedValue = path.value.value;
    const defaultProps = path.parent.value;

    let hasSlotProps = false;
    defaultProps.properties.forEach((property) => {
      if (property.key?.name === 'slotProps') {
        hasSlotProps = true;
        const slotIndex = property.value.properties.findIndex(
          (prop) => prop?.key?.name === slotName,
        );
        if (slotIndex === -1) {
          // Create new slot
          const slotValue = slotPropName
            ? j.objectExpression([j.objectProperty(j.identifier(slotPropName), removedValue)])
            : removedValue;

          property.value.properties.push(j.objectProperty(j.identifier(slotName), slotValue));
        } else {
          // Add property to existing slot
          const existingSlot = property.value.properties[slotIndex].value;
          if (slotPropName) {
            if (existingSlot.type === 'ObjectExpression') {
              existingSlot.properties.push(
                j.objectProperty(j.identifier(slotPropName), removedValue),
              );
            } else {
              property.value.properties[slotIndex].value = j.objectExpression([
                j.objectProperty(j.identifier(slotPropName), removedValue),
              ]);
            }
          } else {
            property.value.properties[slotIndex].value = mergeSlotProps(
              j,
              removedValue,
              existingSlot,
              resolveUnknownSlotProps,
            );
          }
        }
      }
    });

    if (!hasSlotProps) {
      // Create new slotProps
      const slotValue = slotPropName
        ? j.objectExpression([j.objectProperty(j.identifier(slotPropName), removedValue)])
        : removedValue;

      defaultProps.properties.push(
        j.objectProperty(
          j.identifier('slotProps'),
          j.objectExpression([j.objectProperty(j.identifier(slotName), slotValue)]),
        ),
      );
    }

    path.prune();
  });
}

/**
 * Moves prop into slotProps.
 * If the slotProps prop exists, it will merge the prop into the slotProps.
 * If there are duplicated values, the values will be spread.
 * Set `resolveUnknownSlotProps` to resolve existing slot prop values that may be callbacks.
 *
 * @param {import('jscodeshift')} j
 * @param {{ root: import('jscodeshift').Collection; componentName: string, propName: string, slotName: string, slotPropName?: string, resolveUnknownSlotProps?: boolean }} options
 *
 * @example <Component TransitionProps={value} /> => <Component slotProps={{ transition: value }} />
 * @example <Component tooltipClasses={classes} /> => <Component slotProps={{ tooltip: { classes: classes } }} />
 */
export default function movePropIntoSlotProps(j, options) {
  const { propName, slotName, slotPropName, resolveUnknownSlotProps = false } = options;

  findComponentJSX(j, options, (elementPath) => {
    moveJsxPropIntoSlotProps(
      j,
      elementPath.node,
      propName,
      slotName,
      slotPropName,
      resolveUnknownSlotProps,
    );
  });

  const defaultPropsPathCollection = findComponentDefaultProps(j, options);

  moveDefaultPropsPropIntoslotProps(
    j,
    defaultPropsPathCollection,
    propName,
    slotName,
    slotPropName,
    resolveUnknownSlotProps,
  );
}
