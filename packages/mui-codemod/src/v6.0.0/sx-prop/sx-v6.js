import getReturnExpression from '../../util/getReturnExpression';
import {
  getCreateBuildStyle,
  getAppendPaletteModeStyles,
  getObjectKey,
  getBuildArrowFunctionAST,
  isThemePaletteMode,
  removeProperty,
} from '../../util/migrateToVariants';

/**
 *
 * @param {import('jscodeshift').MemberExpression | import('jscodeshift').Identifier} node
 */
function getCssVarName(node) {
  let varName = '-';
  while (node.type === 'MemberExpression') {
    varName += `-${node.object?.name || node.property?.name || 'unknown'}`;
    if (node.object.type === 'MemberExpression') {
      node = node.object;
    } else {
      node = node.property;
    }
  }
  varName += `-${node.name || 'unknown'}`;
  return varName;
}

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function sxV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const createBuildStyle = getCreateBuildStyle(j);
  const appendPaletteModeStyles = getAppendPaletteModeStyles(j);
  const buildArrowFunctionAST = getBuildArrowFunctionAST(j);

  /**
   *
   * @param {import('jscodeshift').Identifier} node
   */
  function replaceUndefined(node, replacement = j.nullLiteral()) {
    if (node?.type === 'Identifier' && node.name === 'undefined') {
      return replacement;
    }
    return node;
  }

  let shouldTransform = false;

  root
    .find(j.JSXAttribute, { name: { name: 'sx' }, value: { type: 'JSXExpressionContainer' } })
    .forEach((path) => {
      /**
       * @type {[import('jscodeshift').StringLiteral, import('jscodeshift').Expression][]}
       */
      const cssVars = [];
      const conditionalExpressions = []; // for ensuring the sequence of styles
      let currentIndex = 0;
      const sxContainer = path.node.value;

      if (
        ['ArrowFunctionExpression', 'ObjectExpression', 'ArrayExpression'].includes(
          sxContainer.expression.type,
        )
      ) {
        shouldTransform = true;
        (sxContainer.expression.type === 'ArrayExpression'
          ? sxContainer.expression.elements
          : [sxContainer.expression]
        ).forEach((item, index) => {
          currentIndex = index;
          recurseObjectExpression({
            root: item,
            replaceRoot: (newRoot) => {
              sxContainer.expression = newRoot;
            },
            node: item,
            buildStyle: createBuildStyle(),
          });
        });

        if (cssVars.length) {
          const cssVarsObject = j.objectExpression(
            cssVars.map(([varName, value]) => j.objectProperty(varName, value)),
          );
          if (path.parent.node.type === 'JSXOpeningElement') {
            const styleAttribute = path.parent.node.attributes.find(
              (attribute) => attribute.type === 'JSXAttribute' && attribute.name.name === 'style',
            );
            const spreadAttribute = path.parent.node.attributes.find(
              (attribute) => attribute.type === 'JSXSpreadAttribute',
            );
            if (styleAttribute) {
              if (styleAttribute.value.expression.type === 'ObjectExpression') {
                styleAttribute.value.expression.properties = [
                  ...cssVarsObject.properties,
                  ...styleAttribute.value.expression.properties,
                ];
              } else if (
                styleAttribute.value.expression.type === 'Identifier' ||
                styleAttribute.value.expression.type === 'MemberExpression'
              ) {
                styleAttribute.value.expression = j.objectExpression([
                  ...cssVarsObject.properties,
                  j.spreadElement(styleAttribute.value.expression),
                ]);
              }
            } else if (spreadAttribute) {
              path.parent.node.attributes.push(
                j.jsxAttribute(
                  j.jsxIdentifier('style'),
                  j.jsxExpressionContainer(
                    j.objectExpression([
                      ...cssVarsObject.properties,
                      j.spreadElement(
                        j.memberExpression(spreadAttribute.argument, j.identifier('style')),
                      ),
                    ]),
                  ),
                ),
              );
            } else {
              path.parent.node.attributes.push(
                j.jsxAttribute(j.jsxIdentifier('style'), j.jsxExpressionContainer(cssVarsObject)),
              );
            }
          }
        }

        if (conditionalExpressions.length && sxContainer.expression.type === 'ArrayExpression') {
          // insert the conditional expressions in the correct order
          let cumulativeIndex = 0;
          conditionalExpressions.forEach(([index, newElement]) => {
            sxContainer.expression.elements.splice(index + 1 + cumulativeIndex, 0, newElement);
            cumulativeIndex += 1;
          });
        }

        if (sxContainer.expression.type === 'ArrayExpression') {
          sxContainer.expression.elements = sxContainer.expression.elements.filter(
            (item) => item.type !== 'ObjectExpression' || item.properties.length > 0,
          );
        }
      }

      function wrapSxInArray(newElement) {
        if (
          sxContainer.expression.type === 'ObjectExpression' ||
          sxContainer.expression.type === 'ArrowFunctionExpression'
        ) {
          sxContainer.expression = j.arrayExpression([sxContainer.expression]);
        }
        if (sxContainer.expression.type === 'ArrayExpression') {
          // store in a list to be added later to ensure the sequence of styles
          conditionalExpressions.push([currentIndex, newElement]);
        }
      }

      function rootThemeCallback(data) {
        if (data.root.type === 'ObjectExpression') {
          data.replaceRoot?.(buildArrowFunctionAST([j.identifier('theme')], data.root));
        } else if (data.root.type === 'ArrayExpression') {
          data.root.elements.forEach((item, index) => {
            if (item === data.node) {
              data.root.elements[index] = buildArrowFunctionAST([j.identifier('theme')], data.root);
            }
          });
        }
      }

      /**
       *
       * @param {{ node: import('jscodeshift').Expression }} data
       */
      function recurseObjectExpression(data) {
        if (data.node.type === 'ArrowFunctionExpression') {
          const returnExpression = getReturnExpression(data.node);
          if (returnExpression) {
            if (
              returnExpression.type === 'MemberExpression' &&
              returnExpression.property?.type === 'ConditionalExpression'
            ) {
              recurseObjectExpression({
                ...data,
                node: j.conditionalExpression(
                  returnExpression.property.test,
                  { ...returnExpression, property: returnExpression.property.consequent },
                  { ...returnExpression, property: returnExpression.property.alternate },
                ),
              });
            } else if (returnExpression.type === 'TemplateLiteral') {
              const firstExpression = returnExpression.expressions[0];
              if (firstExpression?.type === 'ConditionalExpression') {
                recurseObjectExpression({
                  ...data,
                  node: j.conditionalExpression(
                    firstExpression.test,
                    {
                      ...returnExpression,
                      expressions: [
                        firstExpression.consequent,
                        ...(returnExpression.expressions || []).slice(1),
                      ],
                    },
                    {
                      ...returnExpression,
                      expressions: [
                        firstExpression.alternate,
                        ...(returnExpression.expressions || []).slice(1),
                      ],
                    },
                  ),
                });
              } else {
                recurseObjectExpression({
                  ...data,
                  node: returnExpression,
                });
              }
            } else if (
              (returnExpression.type === 'CallExpression' &&
                getObjectKey(returnExpression.callee)?.name === 'theme') ||
              (returnExpression.type === 'MemberExpression' &&
                getObjectKey(returnExpression)?.name === 'theme') ||
              (returnExpression.type === 'BinaryExpression' &&
                (getObjectKey(returnExpression.left)?.name === 'theme' ||
                  getObjectKey(returnExpression.right)?.name === 'theme'))
            ) {
              data.replaceValue?.(returnExpression);
              rootThemeCallback(data);
            } else {
              recurseObjectExpression({
                ...data,
                node: returnExpression,
              });
            }
          }
        }
        if (data.node.type === 'ObjectExpression') {
          const modeStyles = {}; // to collect styles from `theme.palette.mode === '...'`
          data.node.properties.forEach((prop) => {
            if (prop.type === 'ObjectProperty') {
              recurseObjectExpression({
                ...data,
                node: prop.value,
                parentNode: data.node,
                key: prop.key,
                buildStyle: createBuildStyle(prop.key, data.buildStyle),
                replaceValue: (newValue) => {
                  prop.value = newValue;
                },
                deleteSelf: () => {
                  removeProperty(data.node, prop);
                  if (data.node.properties.length === 0) {
                    data.deleteSelf?.();
                  }
                },
                modeStyles,
              });
            } else {
              recurseObjectExpression({
                ...data,
                node: prop,
                parentNode: data.node,
                buildStyle: createBuildStyle(prop.key, data.buildStyle),
              });
            }
          });
          appendPaletteModeStyles(data.node, modeStyles);
        }
        if (data.node.type === 'SpreadElement') {
          if (data.node.argument.type === 'LogicalExpression') {
            const paramName =
              data.node.argument.left.type === 'BinaryExpression'
                ? getObjectKey(data.node.argument.left.left)?.name
                : getObjectKey(data.node.argument.left)?.name;
            if (paramName === 'theme' && data.node.argument.left.right.type === 'StringLiteral') {
              if (data.node.argument.right.type === 'ObjectExpression') {
                const mode = data.node.argument.left.right.value;
                data.node.argument.right.properties.forEach((prop) => {
                  if (prop.type === 'ObjectProperty') {
                    recurseObjectExpression({
                      ...data,
                      node: prop.value,
                      parentNode: data.node.argument.right,
                      key: prop.key,
                      buildStyle: createBuildStyle(prop.key, data.buildStyle, mode),
                      replaceValue: (newValue) => {
                        prop.value = newValue;
                      },
                    });
                  } else {
                    recurseObjectExpression({
                      ...data,
                      node: prop,
                      parentNode: data.node.argument.right,
                      buildStyle: createBuildStyle(prop.key, data.buildStyle, mode),
                    });
                  }
                });
                appendPaletteModeStyles(data.parentNode, {
                  [mode]: data.node.argument.right,
                });
              }
              if (data.deleteSelf) {
                data.deleteSelf();
              } else {
                removeProperty(data.parentNode, data.node);
              }
              return;
            }

            if (data.node.argument.right.type === 'ObjectExpression') {
              recurseObjectExpression({
                ...data,
                node: data.node.argument.right,
                root: data.node.argument.right,
                replaceRoot: (newRoot) => {
                  data.node.argument.right = newRoot;
                },
              });
            }
            wrapSxInArray(
              j.logicalExpression(
                data.node.argument.operator,
                data.node.argument.left,
                data.buildStyle(data.node.argument.right),
              ),
            );
            if (data.deleteSelf) {
              data.deleteSelf();
            } else {
              removeProperty(data.parentNode, data.node);
            }
          }
          if (data.node.argument.type === 'ConditionalExpression') {
            const isSxSpread =
              (data.node.argument.test.type === 'CallExpression' &&
                data.node.argument.test.callee.type === 'MemberExpression' &&
                data.node.argument.test.callee.object.name === 'Array' &&
                data.node.argument.test.callee.property.name === 'isArray') ||
              (data.node.argument.consequent.type === 'Identifier' &&
                data.node.argument.consequent.name === 'sx') ||
              (data.node.argument.alternate.type === 'Identifier' &&
                data.node.argument.alternate.name === 'sx');

            if (!isSxSpread) {
              recurseObjectExpression({
                ...data,
                node: data.node.argument,
                parentNode: data.node,
              });
              wrapSxInArray(data.node.argument);
              if (data.deleteSelf) {
                data.deleteSelf();
              } else {
                removeProperty(data.parentNode, data.node);
              }
            }
          }
          if (data.node.argument.type === 'CallExpression') {
            if (
              getObjectKey(data.node.argument.callee)?.name === 'theme' &&
              data.node.argument.callee.property?.name?.startsWith('apply')
            ) {
              const objIndex = data.node.argument.arguments.findIndex(
                (arg) => arg.type === 'ObjectExpression',
              );
              recurseObjectExpression({
                ...data,
                node: data.node.argument.arguments[objIndex],
                buildStyle: (styleExpression) => {
                  const newArguments = [...data.node.argument.arguments];
                  newArguments[objIndex] = styleExpression;
                  return j.arrowFunctionExpression([j.identifier('theme')], {
                    ...data.node.argument,
                    arguments: newArguments,
                  });
                },
              });
            }
          }
        }
        if (data.node.type === 'ConditionalExpression') {
          if (
            data.node.test.type === 'BinaryExpression' ||
            data.node.test.type === 'UnaryExpression' ||
            data.node.test.type === 'Identifier' ||
            data.node.test.type === 'MemberExpression'
          ) {
            if (
              data.parentNode?.type === 'ObjectExpression' &&
              (data.node.test?.type === 'BinaryExpression' || data.node.test?.type === 'Identifier')
            ) {
              if (
                data.node.consequent.type !== 'ObjectExpression' &&
                data.node.alternate.type !== 'ObjectExpression'
              ) {
                if (isThemePaletteMode(data.node.test.left)) {
                  const consequentKey = getObjectKey(data.node.consequent);
                  if (consequentKey.type === 'Identifier' && consequentKey.name !== 'theme') {
                    const varName = getCssVarName(data.node.consequent);
                    cssVars.push([j.stringLiteral(varName), data.node.consequent]);
                    data.node.consequent = j.stringLiteral(`var(${varName})`);
                  }
                  const alternateKey = getObjectKey(data.node.alternate);
                  if (alternateKey.type === 'Identifier' && alternateKey.name !== 'theme') {
                    const varName = getCssVarName(data.node.alternate);
                    cssVars.push([j.stringLiteral(varName), data.node.alternate]);
                    data.node.alternate = j.stringLiteral(`var(${varName})`);
                  }

                  if (data.modeStyles) {
                    if (!data.modeStyles[data.node.test.right.value]) {
                      data.modeStyles[data.node.test.right.value] = [];
                    }
                    data.modeStyles[data.node.test.right.value].push(
                      j.objectProperty(data.key, replaceUndefined(data.node.consequent)),
                    );
                  }
                  data.replaceValue?.(replaceUndefined(data.node.alternate));
                  rootThemeCallback(data);
                } else {
                  wrapSxInArray(
                    j.conditionalExpression(
                      data.node.test,
                      data.buildStyle?.(replaceUndefined(data.node.consequent)),
                      data.buildStyle?.(replaceUndefined(data.node.alternate)),
                    ),
                  );
                  if (data.deleteSelf) {
                    data.deleteSelf();
                  } else {
                    removeProperty(data.parentNode, data.node);
                  }
                }
              }
            }
          }
        }
        if (data.node.type === 'TemplateLiteral') {
          if (data.parentNode?.type === 'ObjectExpression') {
            const modeStyles = {};
            data.node.expressions.forEach((expression, index) => {
              if (expression.type === 'MemberExpression') {
                const memberKey = getObjectKey(expression);
                if (memberKey.type === 'Identifier' && memberKey.name !== 'theme') {
                  const varName = getCssVarName(expression);
                  cssVars.push([j.stringLiteral(varName), expression]);
                  data.node.expressions[index] = j.stringLiteral(`var(${varName})`);
                }
              } else {
                recurseObjectExpression({
                  ...data,
                  node: expression,
                  parentNode: data.parentNode,
                  buildStyle: createBuildStyle(data.key, data.buildStyle),
                  replaceValue: (newValue) => {
                    data.node.expressions[index] = newValue;
                  },
                  modeStyles,
                });
              }
            });
            if (data.modeStyles) {
              Object.entries(modeStyles).forEach(([mode, objectStyles]) => {
                const clonedNode = {
                  ...data.node,
                  expressions: data.node.expressions.map((expression) => ({ ...expression })),
                };
                clonedNode.expressions = objectStyles.map((item) => item.value);

                if (!data.modeStyles[mode]) {
                  data.modeStyles[mode] = [];
                }
                data.modeStyles[mode].push(j.objectProperty(data.key, clonedNode));
              });
              if (data.key) {
                data.replaceValue?.(data.node);
              }
            }
          }
          if (
            data.node.expressions?.some(
              (expression) =>
                getObjectKey(expression)?.name === 'theme' ||
                (expression.type === 'CallExpression' &&
                  getObjectKey(expression.callee)?.name === 'theme'),
            )
          ) {
            rootThemeCallback(data);
          }
        }
      }
    });

  const transformed = root.toSource(printOptions);

  if (shouldTransform) {
    // recast adds extra newlines that we don't want, https://github.com/facebook/jscodeshift/issues/249
    // need to remove them manually
    const lineTerminator = transformed.includes('\r\n') ? '\r\n' : '\n';
    const lines = [];
    let isInStyled = false;
    let spaceMatch;
    transformed.split(lineTerminator).forEach((line) => {
      if (!isInStyled) {
        lines.push(line);
      } else if (line !== '') {
        if (spaceMatch && line.match(/^\s+/)?.[0] === spaceMatch?.[0] && line.endsWith('}')) {
          isInStyled = false;
          spaceMatch = null;
        }
        lines.push(line);
      }
      if (line.includes('sx=') && !line.match(/sx=\{\{[^}]+\}\}/)) {
        isInStyled = true;
        spaceMatch = line.match(/^\s+/);
      }
    });
    return lines.join(lineTerminator);
  }

  return transformed;
}
