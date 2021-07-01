const { createMacro, MacroError } = require('babel-plugin-macros');
const helperModuleImports = require('@babel/helper-module-imports');
const fs = require('fs');
const path = require('path');

function invertObject(object) {
  const inverted = {};
  Object.keys(object).forEach((key) => {
    inverted[object[key]] = key;
  });
  return inverted;
}

/**
 * Supported imports:
 * 1. bare specifier e.g. `'@material-ui/utils/macros/MuiError.macro'`
 * 2. relative import from `packages/material-ui-utils/src` e.g. `'../macros/MuiError.macro'`
 *
 * @param {import('babel-plugin-macros').MacroParams} param0
 */
function muiError({ references, babel, config, source }) {
  const { errorCodesPath = {}, missingError = 'annotate' } = config;
  const errorCodes = JSON.parse(fs.readFileSync(errorCodesPath, { encoding: 'utf8' }));
  const errorCodesLookup = invertObject(errorCodes);
  let updatedErrorCodes = false;

  let handleMissingErrorCode;
  switch (missingError) {
    case 'annotate':
      handleMissingErrorCode = ({ devMessage, newExpressionPath }) => {
        // Outputs:
        // /* FIXME (minify-errors-in-prod): Unminified error message in production build! */
        // throw new Error(`A message with ${interpolation}`)
        newExpressionPath.replaceWith(
          babel.types.newExpression(babel.types.identifier('Error'), [devMessage]),
        );
        newExpressionPath.addComment(
          'leading',
          ' FIXME (minify-errors-in-prod): Unminified error message in production build! ',
        );
      };
      break;
    case 'throw':
      handleMissingErrorCode = ({ errorMessageLiteral }) => {
        throw new MacroError(
          `Missing error code for message '${errorMessageLiteral}'. Did you forget to run \`yarn extract-errors\` first?`,
        );
      };
      break;
    case 'write':
      handleMissingErrorCode = ({ errorMessageLiteral }) => {
        updatedErrorCodes = true;
        // error codes are 1-based
        const newErrorCode = Object.keys(errorCodesLookup).length + 1;
        errorCodesLookup[errorMessageLiteral] = newErrorCode;
        return newErrorCode;
      };
      break;
    default:
      throw new MacroError(
        `Unknown missing error behavior '${missingError}'. Can only handle 'annotate', 'throw' and 'write'.`,
      );
  }

  /**
   * Evaluates a babel node as a string.
   *
   * Supported nodes
   * - `'just a literal'`
   * - `'a literal' + 'concateneded' + 'with +'`
   * Cannot evaluate template literals or Array.prototype.join etc.
   *
   * @param {import('@babel/core').types.Node} node
   */
  function evaluateMessage(node) {
    if (babel.types.isBinaryExpression(node)) {
      if (node.operator !== '+') {
        throw new Error(`Unsupported binary operator '${node.operator}'. Can only evaluate '+'.`);
      }
      return `${evaluateMessage(node.left, babel)}${evaluateMessage(node.right, babel)}`;
    }
    if (babel.types.isStringLiteral(node)) {
      return node.value;
    }
    throw new Error('Can only evaluate strings that are concatenated with `+` or string literals.');
  }

  /**
   * The identifier for the callee in `formatMuiErrorMessage()`
   * Creating an identifier per MuiError reference would create duplicate imports.
   * It's not obvious that these will be deduplicated by bundlers.
   * We can already do this at transpile-time
   *
   * @type {import('@babel/core').NodePath | null}
   */
  let formatMuiErrorMessageIdentifier = null;

  references.default.forEach((babelPath) => {
    const newExpressionPath = babelPath.parentPath;
    if (!newExpressionPath.isNewExpression()) {
      throw new MacroError(
        'Encountered `MuiError` outside of a "new expression" i.e. `new MuiError()`. Use `throw new MuiError(message)` over `throw MuiError(message)`.',
      );
    }

    const errorMessageLiteral = evaluateMessage(newExpressionPath.node.arguments[0]);
    const errorMessageExpressions = newExpressionPath.node.arguments.slice(1);
    const errorMessageQuasis = errorMessageLiteral
      .split('%s')
      // Providing `cooked` here is important.
      // Otherwise babel will generate "" with NODE_ENV=test
      //
      // Original code used `cooked: String.raw({ raw: cooked })`
      // Thought it's unclear what for.
      // 'One line\nNext line' will end up as `One line
      // Next line` which is what you'd want from that literal.
      .map((cooked) => babel.types.templateElement({ raw: cooked.replace(/`/g, '\\`'), cooked }));

    // Outputs:
    //   `A ${adj} message that contains ${noun}`;
    const devMessage = babel.types.templateLiteral(errorMessageQuasis, errorMessageExpressions);

    let errorCode = errorCodesLookup[errorMessageLiteral];
    if (errorCode === undefined) {
      errorCode = handleMissingErrorCode({ devMessage, errorMessageLiteral, newExpressionPath });
      if (errorCode === undefined) {
        return;
      }
    }
    errorCode = parseInt(errorCode, 10);

    if (formatMuiErrorMessageIdentifier === null) {
      const isBareImportSourceIdentifier = source.startsWith('@material-ui/utils');
      if (isBareImportSourceIdentifier) {
        // Input: import MuiError from '@material-ui/utils/macros/MuiError.macro'
        // Outputs:
        // import { formatMuiErrorMessage } from '@material-ui/utils';
        formatMuiErrorMessageIdentifier = helperModuleImports.addNamed(
          babelPath,
          'formatMuiErrorMessage',
          '@material-ui/utils',
        );
      } else {
        const normalizedRelativeImport = path
          .normalize(source.replace('../macros/MuiError.macro', './formatMuiErrorMessage'))
          .replace(/\\/g, '/');
        // 'formatMuiErrorMessage' implies './formatMuiErrorMessage' for fs paths but not for import specifiers.
        const formatMuiErrorMessageImportSource = normalizedRelativeImport.startsWith('.')
          ? normalizedRelativeImport
          : `./${normalizedRelativeImport}`;
        // Input: import MuiError from '../macros/MuiError.macro'
        // Outputs:
        // import formatMuiErrorMessage from './formatMuiErrorMessage';
        formatMuiErrorMessageIdentifier = helperModuleImports.addDefault(
          babelPath,
          formatMuiErrorMessageImportSource,
          { nameHint: 'formatMuiErrorMessage' },
        );
      }
    }

    // Outputs:
    // formatMuiErrorMessage(ERROR_CODE, adj, noun)
    const prodMessage = babel.types.callExpression(
      babel.types.cloneDeep(formatMuiErrorMessageIdentifier),
      [babel.types.numericLiteral(errorCode), ...errorMessageExpressions],
    );

    // Outputs:
    // new Error(
    //   process.env.NODE_ENV !== "production"
    //     ? `A message with ${interpolation}`
    //     : formatProdError('A message with %s', interpolation)
    // )
    newExpressionPath.replaceWith(
      babel.types.newExpression(babel.types.identifier('Error'), [
        babel.types.conditionalExpression(
          babel.types.binaryExpression(
            '!==',
            babel.types.memberExpression(
              babel.types.memberExpression(
                babel.types.identifier('process'),
                babel.types.identifier('env'),
              ),
              babel.types.identifier('NODE_ENV'),
            ),
            babel.types.stringLiteral('production'),
          ),
          devMessage,
          prodMessage,
        ),
      ]),
    );
  });

  if (missingError === 'write' && updatedErrorCodes) {
    fs.writeFileSync(errorCodesPath, JSON.stringify(invertObject(errorCodesLookup), null, 2));
  }

  return { keepImports: false };
}

module.exports = createMacro(muiError, {
  configName: 'muiError',
});
