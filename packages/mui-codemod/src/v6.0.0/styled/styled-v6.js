import migrateToVariants from '../../util/migrateToVariants';

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function styledV6(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  let shouldTransform = false;

  root.find(j.CallExpression).forEach((path) => {
    const styles = [];
    let args = [];

    // styled('div')(...arguments)
    if (
      path.node.callee.type === 'Identifier' &&
      path.node.callee.name === 'styled' &&
      path.parentPath.node.type === 'CallExpression'
    ) {
      args = path.parentPath.node.arguments;
    }

    // styled.div(...arguments)
    if (
      path.node.callee.type === 'MemberExpression' &&
      path.node.callee.object.type === 'Identifier' &&
      path.node.callee.object.name === 'styled'
    ) {
      args = path.node.arguments;
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

    // Replace arrow function with object expression if the arg properties is empty
    args.forEach((arg, index) => {
      if (
        arg.type === 'ArrowFunctionExpression' &&
        arg.params[0] &&
        arg.params[0].type === 'ObjectPattern' &&
        arg.params[0].properties.length === 0
      ) {
        if (arg.body.type === 'ObjectExpression') {
          args[index] = arg.body;
        }
        if (arg.body.type === 'BlockStatement') {
          const returnStatement = arg.body.body.find((item) => item.type === 'ReturnStatement');
          if (returnStatement) {
            args[index] = returnStatement.argument;
          }
        }
      }
    });
  });

  const transformed = root.toSource(printOptions);

  if (shouldTransform) {
    // recast adds extra newlines that we don't want, https://github.com/facebook/jscodeshift/issues/249
    // need to remove them manually
    const lineTerminator = transformed.includes('\r\n') ? '\r\n' : '\n';
    const lines = [];
    let isInStyled = false;
    transformed.split(lineTerminator).forEach((line, index, array) => {
      if (!isInStyled) {
        lines.push(line);
      } else if (
        line !== '' ||
        (line === '' && array[index + 1] && array[index + 1].includes('return'))
      ) {
        if (line.match(/^}\)+(\({}\)|\(\))?;?$/) || line.match(/^\);?$/)) {
          isInStyled = false;
        }
        lines.push(line);
      }
      if (line.includes('styled.') || line.includes('styled(')) {
        isInStyled = true;
      }
    });
    return lines.join(lineTerminator);
  }

  return transformed;
}
