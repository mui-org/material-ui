import { dirname } from 'path';
import addImports from 'jscodeshift-add-imports';
import getJSExports from '../util/getJSExports';

export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  const importModule = options.importModule || '@mui/material';
  const targetModule = options.targetModule || '@mui/material';

  const whitelist = getJSExports(
    require.resolve(`@mui/material-v5/modern`, {
      paths: [dirname(fileInfo.path)],
    }),
  );
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const root = j(fileInfo.source);
  const importRegExp = new RegExp(`^${importModule}/(?:[^/]+/)*([^/]+)$`);

  const resultSpecifiers = [];

  root.find(j.ImportDeclaration).forEach((path) => {
    if (!path.node.specifiers.length) {
      return;
    }

    if (path.value.importKind && path.value.importKind !== 'value') {
      return;
    }
    const importPath = path.value.source.value;
    const match = importPath.match(importRegExp);
    if (!match) {
      return;
    }

    if (importPath.includes('internal/')) {
      return;
    }

    path.node.specifiers.forEach((specifier, index) => {
      if (specifier.importKind && specifier.importKind !== 'value') {
        return;
      }
      if (specifier.type === 'ImportNamespaceSpecifier') {
        return;
      }

      switch (specifier.type) {
        case 'ImportDefaultSpecifier': {
          const localName = specifier.local.name;
          const moduleName = match[1];
          if (!whitelist.has(moduleName)) {
            return;
          }
          resultSpecifiers.push(
            j.importSpecifier(j.identifier(moduleName), j.identifier(localName)),
          );
          path.get('specifiers', index).prune();
          break;
        }
        case 'ImportSpecifier':
          if (!whitelist.has(specifier.imported.name) && specifier.imported.name !== 'withStyles') {
            return;
          }
          resultSpecifiers.push(specifier);
          path.get('specifiers', index).prune();
          break;
        default:
          break;
      }
    });

    if (!path.node.specifiers.length) {
      path.prune();
    }
  });

  if (resultSpecifiers.length) {
    addImports(root, j.importDeclaration(resultSpecifiers, j.stringLiteral(targetModule)));
  }

  return root.toSource(printOptions);
}
