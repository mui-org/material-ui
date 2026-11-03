import getReturnExpression from '../../util/getReturnExpression';
import migrateToVariants from '../../util/migrateToVariants';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function themeV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let shouldTransform = false;

  root.find(j.ArrowFunctionExpression).forEach((path) => {
    const styles = [];
    let args = [];

    if (path.parent.parent.parent.get('key', 'name').value === 'styleOverrides') {
      args = [path.node];
    }

    // 1. collecting styles that should be transformed
    args.forEach((arg) => {
      if (
        arg.type === 'ArrowFunctionExpression' &&
        arg.params[0] &&
        arg.params[0].type === 'ObjectPattern'
      ) {
        styles.push(arg);
      }
    });

    if (!shouldTransform && styles.length > 0) {
      shouldTransform = true;
    }

    migrateToVariants(j, styles);

    if (path.parent.get('key', 'name').value === 'root') {
      const componentTheme = path.parent.parent.parent.parent.get('properties');
      if (componentTheme.node.type === 'ObjectExpression') {
        componentTheme.node.properties.forEach((prop) => {
          if (prop.key.name === 'variants') {
            prop.value.elements = prop.value.elements.map((element) => {
              const styleIndex = element.properties.findIndex(
                (styleProp) =>
                  styleProp.type === 'ObjectProperty' && styleProp.key.name === 'style',
              );
              if (
                styleIndex !== -1 &&
                element.properties[styleIndex].value.type !== 'ObjectExpression'
              ) {
                element.properties[styleIndex].value = getReturnExpression(
                  element.properties[styleIndex].value,
                );
              }
              return element;
            });
            const stylesNode = getReturnExpression(path.node);
            const variantsNode = stylesNode?.properties.find(
              (styleProp) =>
                styleProp.type === 'ObjectProperty' && styleProp.key.name === 'variants',
            );
            if (variantsNode) {
              variantsNode.value.elements.push(...prop.value.elements);
            } else {
              stylesNode.properties.push(j.property('init', j.identifier('variants'), prop.value));
            }
          }
        });
        componentTheme.node.properties = componentTheme.node.properties.filter(
          (prop) => prop.key.name !== 'variants',
        );
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
        if (spaceMatch && line.match(/^\s+/)?.[0] === spaceMatch?.[0]) {
          isInStyled = false;
          spaceMatch = null;
        }
        lines.push(line);
      }
      if (line.includes('styleOverrides')) {
        isInStyled = true;
        spaceMatch = line.match(/^\s+/);
      }
    });
    return lines.join(lineTerminator);
  }

  return transformed;
}
