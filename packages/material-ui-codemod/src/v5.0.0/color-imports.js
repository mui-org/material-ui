/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const printOptions = options.printOptions || {
    quote: 'single',
  };

  /**
   * @type import('jscodeshift').ImportDeclaration
   */
  let colorImport;
  let hasPrivateImport = false;

  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === '@material-ui/core/colors') {
      colorImport = path.node;
    }
    if (path.node.source.value.match(/@material-ui\/core\/colors\/.+/)) {
      hasPrivateImport = true;
    }
  });

  if (!colorImport) {
    colorImport = j.importDeclaration([], j.literal('@material-ui/core/colors'));
    if (hasPrivateImport) {
      root.find(j.ImportDeclaration).at(0).insertAfter(colorImport);
    }
  }

  root
    .find(j.ImportDeclaration)
    .filter(({ node }) => node.source.value.match(/@material-ui\/core\/colors\/.+/))
    .forEach(({ node }) => {
      const match = node.source.value.match(/^@material-ui\/core\/colors\/(?<color>.+)$/);
      colorImport.specifiers.push(
        j.importSpecifier(j.identifier(match.groups.color), node.specifiers[0].local),
      );
    })
    .remove();

  return root.toSource(printOptions);
}
