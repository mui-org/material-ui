/**
 * Update all `theme.spacing.unit` usages to use `theme.spacing()`.
 * Find and replace string literal AST nodes to ensure all spacing API usages get updated, regardless
 * of any calculation being performed.
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 */
function transformThemeSpacingApi(j, root) {
  const mightContainApi = (path) => {
    return (
      j(path)
        .find(j.MemberExpression, {
          object: {
            property: {
              name: 'spacing',
            },
          },
          property: {
            name: 'unit',
          },
        })
        .size() > 0
    );
  };

  const replaceApi = (pathArg) => {
    pathArg
      .find(j.MemberExpression, {
        object: {
          property: {
            name: 'spacing',
          },
        },
        property: {
          name: 'unit',
        },
      })
      .replaceWith((path) => {
        let param = null;

        const themeParam = path.node.object.object.name;
        if (j.BinaryExpression.check(path.parent.node)) {
          const expression = path.parent.node;
          const operation = expression.operator;

          // Check if it's a variable
          if (j.Identifier.check(expression.right)) {
            param = expression.right;
          } else if (j.Literal.check(expression.right)) {
            const value = expression.right.value;
            if (operation === '*') {
              param = j.literal(1 * value);
            } else if (operation === '/') {
              param = j.literal(1 / value);
            } else if (operation === '**') {
              param = j.literal(1);
            } else if (operation === '%') {
              param = j.literal(1);
            }
          }
        }

        if (param) {
          path.parent.replace(
            j.callExpression(
              j.memberExpression(j.identifier(themeParam), j.identifier('spacing')),
              [param],
            ),
          );
          return path.node;
        }
        return j.callExpression(
          j.memberExpression(j.identifier(themeParam), j.identifier('spacing')),
          [j.literal(1)],
        );
      });
  };

  const arrowFunctions = root.find(j.ArrowFunctionExpression).filter(mightContainApi);
  const functionDeclarations = root.find(j.FunctionDeclaration).filter(mightContainApi);

  replaceApi(arrowFunctions);
  replaceApi(functionDeclarations);
}

/**
 * Update all `spacing.unit` usages to use `spacing()`.
 * Find and replace string literal AST nodes to ensure all spacing API usages get updated, regardless
 * of any calculation being performed.
 * @param {jscodeshift_api_object} j
 * @param {jscodeshift_ast_object} root
 */
function transformThemeSpacingApiDestructured(j, root) {
  const mightContainApi = (path) => {
    return (
      j(path)
        .find(j.MemberExpression, {
          object: {
            name: 'spacing',
          },
          property: {
            name: 'unit',
          },
        })
        .size() > 0
    );
  };

  const replaceApi = (pathArg) => {
    pathArg
      .find(j.MemberExpression, {
        object: {
          name: 'spacing',
        },
        property: {
          name: 'unit',
        },
      })
      .replaceWith((path) => {
        let param = null;

        const spacingParam = path.node.object.name;
        if (j.BinaryExpression.check(path.parent.node)) {
          const expression = path.parent.node;
          const operation = expression.operator;

          // Check if it's a variable
          if (j.Identifier.check(expression.right)) {
            param = expression.right;
          } else if (j.Literal.check(expression.right)) {
            const value = expression.right.value;
            if (operation === '*') {
              param = j.literal(1 * value);
            } else if (operation === '/') {
              param = j.literal(1 / value);
            } else if (operation === '**') {
              param = j.literal(1);
            } else if (operation === '%') {
              param = j.literal(1);
            }
          }
        }

        if (param) {
          path.parent.replace(j.callExpression(j.identifier(spacingParam), [param]));
          return path.node;
        }
        return j.callExpression(j.identifier(spacingParam), [j.literal(1)]);
      });
  };

  const arrowFunctions = root.find(j.ArrowFunctionExpression).filter(mightContainApi);
  const functionDeclarations = root.find(j.FunctionDeclaration).filter(mightContainApi);

  replaceApi(arrowFunctions);
  replaceApi(functionDeclarations);
}

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // transforms
  transformThemeSpacingApi(j, root);
  transformThemeSpacingApiDestructured(j, root);
  return root.toSource({ quote: 'single' });
};
