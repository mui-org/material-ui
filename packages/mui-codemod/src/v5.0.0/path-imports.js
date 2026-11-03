import { dirname } from 'path';
import addImports from 'jscodeshift-add-imports';
import getJSExports from '../util/getJSExports';

const muiImportRegExp = /^@mui\/([^/]+)$/;

export default function transformer(fileInfo, api, options) {
  const j = api.jscodeshift;
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const styleExports = getJSExports(
    require.resolve('@mui/material-v5/modern/styles', {
      paths: [dirname(fileInfo.path)],
    }),
  );

  const barrelImportsToTransform = {
    material: {},
    'icons-material': {},
  };

  const root = j(fileInfo.source);

  root.find(j.ImportDeclaration).forEach((path) => {
    if (!path.node.specifiers.length) {
      return;
    }

    if (path.value.importKind && path.value.importKind !== 'value') {
      return;
    }

    const importPath = path.value.source.value;

    const match = importPath.match(muiImportRegExp);
    if (!match) {
      return;
    }

    const moduleName = match[1];
    const importsToAdd = barrelImportsToTransform[moduleName];

    if (!importsToAdd) {
      return;
    }

    const indexesToPrune = [];

    path.node.specifiers.forEach((specifier, index) => {
      if (specifier.importKind && specifier.importKind !== 'value') {
        return;
      }
      if (specifier.type === 'ImportNamespaceSpecifier') {
        return;
      }

      if (specifier.type === 'ImportSpecifier') {
        const name = specifier.imported.name;
        if (moduleName === 'material') {
          if (styleExports.has(name)) {
            importsToAdd.styles ??= [];
            importsToAdd.styles.push(specifier);
            indexesToPrune.push(index);
            return;
          }

          if (name.endsWith('Classes')) {
            const base = name.replace(/Classes$/, '');
            const componentName = base.charAt(0).toUpperCase() + base.slice(1); // autocomplete → Autocomplete
            importsToAdd[componentName] ??= [];
            importsToAdd[componentName].push(
              j.importSpecifier(specifier.imported, specifier.local),
            );
            indexesToPrune.push(index);
            return;
          }
        }

        importsToAdd[name] ??= [];
        importsToAdd[name].push(j.importDefaultSpecifier(specifier.local));

        indexesToPrune.push(index);
      }
    });

    // We prune imports starting with the highest index as otherwise subsequent indexes would become
    // invalid once an index that comes before it gets pruned.
    indexesToPrune.sort((a, b) => a - b).reverse();
    indexesToPrune.forEach((index) => path.get('specifiers', index).prune());

    if (!path.node.specifiers.length) {
      path.prune();
    }
  });

  Object.entries(barrelImportsToTransform).forEach(([moduleName, importsToAdd]) => {
    Object.entries(importsToAdd).forEach(([module, specifiers]) => {
      const fullTargetModule = `@mui/${moduleName}/${module}`;
      addImports(root, j.importDeclaration(specifiers, j.stringLiteral(fullTargetModule)));
    });
  });

  return root.toSource(printOptions);
}
