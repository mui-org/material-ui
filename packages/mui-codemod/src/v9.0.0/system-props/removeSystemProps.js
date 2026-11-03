// from `packages/mui-system/src/styleFunctionSx/defaultSxConfig.js`
const defaultSxConfig = {
  // borders
  border: {},
  borderTop: {},
  borderRight: {},
  borderBottom: {},
  borderLeft: {},
  borderColor: {},
  borderTopColor: {},
  borderRightColor: {},
  borderBottomColor: {},
  borderLeftColor: {},
  outline: {},
  outlineColor: {},
  borderRadius: {},
  color: {},
  bgcolor: {},
  backgroundColor: {},
  p: {},
  pt: {},
  pr: {},
  pb: {},
  pl: {},
  px: {},
  py: {},
  padding: {},
  paddingTop: {},
  paddingRight: {},
  paddingBottom: {},
  paddingLeft: {},
  paddingX: {},
  paddingY: {},
  paddingInline: {},
  paddingInlineStart: {},
  paddingInlineEnd: {},
  paddingBlock: {},
  paddingBlockStart: {},
  paddingBlockEnd: {},

  m: {},
  mt: {},
  mr: {},
  mb: {},
  ml: {},
  mx: {},
  my: {},
  margin: {},
  marginTop: {},
  marginRight: {},
  marginBottom: {},
  marginLeft: {},
  marginX: {},
  marginY: {},
  marginInline: {},
  marginInlineStart: {},
  marginInlineEnd: {},
  marginBlock: {},
  marginBlockStart: {},
  marginBlockEnd: {},

  // display
  displayPrint: {},
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},

  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},

  // grid
  gap: {},
  rowGap: {},
  columnGap: {},
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},

  // positions
  position: {},
  zIndex: {},
  top: {},
  right: {},
  bottom: {},
  left: {},

  // shadows
  boxShadow: {},

  // sizing
  width: {},
  maxWidth: {},
  minWidth: {},
  height: {},
  maxHeight: {},
  minHeight: {},
  boxSizing: {},

  // typography
  font: {},
  fontFamily: {},
  fontSize: {},
  fontStyle: {},
  fontWeight: {},
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {},
};
const systemProps = Object.keys(defaultSxConfig);
const components = [
  'Box',
  'Stack',
  'Typography',
  'Link',
  'Grid',
  'Grid2',
  'DialogContentText',
  'TimelineContent',
  'TimelineOppositeContent',
];

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function removeSystemProps(file, api, options) {
  if (file.path?.endsWith('.json') || file.path?.endsWith('.d.ts')) {
    return file.source;
  }
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const deprecatedElements = [];
  const typographyColorMatcher = {
    matcher: (key, val) =>
      key !== 'color' ||
      val.value === 'inherit' ||
      val.value?.includes('.') ||
      val.value === 'divider' ||
      val.value?.startsWith('#') ||
      val.value?.match(/\(.*\)/),
  };
  const customReplacement = {
    Typography: typographyColorMatcher,
    // These components extend Typography
    DialogContentText: typographyColorMatcher,
    TimelineContent: typographyColorMatcher,
    TimelineOppositeContent: typographyColorMatcher,
    Link: {
      // Same as Typography but keep color="inherit" as a Link component prop (controls underline behavior)
      matcher: (key, val) =>
        key !== 'color' ||
        val.value?.includes('.') ||
        val.value === 'divider' ||
        val.value?.startsWith('#') ||
        val.value?.match(/\(.*\)/),
    },
  };
  const elementReplacement = {};

  if (options.jsx) {
    options.jsx.split(',').forEach((name) => {
      const trimmed = name.trim();
      if (!trimmed) {
        return;
      }
      deprecatedElements.push(trimmed);
      if (customReplacement[trimmed]) {
        elementReplacement[trimmed] = customReplacement[trimmed];
      }
    });
  }

  const packageName = options.packageName;
  const importSources = ['@mui'];

  if (packageName) {
    importSources.push(packageName);
  }

  root
    .find(
      j.ImportDeclaration,
      (decl) =>
        typeof decl.source.value === 'string' &&
        importSources.some(
          (source) => decl.source.value === source || decl.source.value.startsWith(`${source}/`),
        ),
    )
    .forEach((decl) => {
      decl.node.specifiers.forEach((spec) => {
        if (spec.type === 'ImportSpecifier') {
          const name = spec.imported.name;
          if (components.includes(name)) {
            deprecatedElements.push(spec.local.name);
            if (customReplacement[name]) {
              elementReplacement[spec.local.name] = customReplacement[name];
            }
          }
        }
        if (spec.type === 'ImportDefaultSpecifier') {
          const name = decl.node.source.value.split('/').pop();
          if (components.includes(name)) {
            deprecatedElements.push(spec.local.name);
            if (customReplacement[name]) {
              elementReplacement[spec.local.name] = customReplacement[name];
            }
          }
        }
      });
    });

  root
    .find(j.JSXElement, {
      openingElement: {
        name: {
          name: (name) => {
            return deprecatedElements.includes(name);
          },
        },
      },
    })
    .forEach((el) => {
      const sx = j.objectExpression([]);
      const elementName = el.value?.openingElement?.name?.name;

      const sxNodes = j(el)
        .find(j.JSXAttribute)
        .filter((path) => path.parent.parent.node === el.node && path.node.name.name === 'sx');

      const sxNodesArray = sxNodes.nodes() || [];
      const existingSxValue = sxNodesArray[0]?.value?.expression;

      let spreadElement = null;
      el.node.openingElement.attributes.forEach((attr) => {
        if (attr.type === 'JSXSpreadAttribute') {
          spreadElement = attr;
        }
      });

      const attrToPrune = ['sx'];
      el.node.openingElement.attributes.forEach((attr) => {
        if (
          attr.type === 'JSXSpreadAttribute' ||
          !attr.value ||
          !systemProps.includes(attr?.name?.name)
        ) {
          return;
        }
        const key = attr?.name?.name;
        const literal = attr?.value;
        const val = literal.type === 'JSXExpressionContainer' ? literal.expression : literal;
        const shouldPrune =
          !elementReplacement[elementName] || elementReplacement[elementName].matcher(key, val);
        if (key && val) {
          if (shouldPrune) {
            sx.properties.push(j.property('init', j.identifier(key), val));
            attrToPrune.push(key);
          }
        }
      });

      if (sx.properties.length) {
        el.node.openingElement.attributes = el.node.openingElement.attributes.filter(
          (attr) => attr.type !== 'JSXAttribute' || !attrToPrune.includes(attr?.name?.name),
        );

        let finalSx;
        if (!existingSxValue) {
          finalSx = sx;
        } else if (existingSxValue?.type === 'ObjectExpression') {
          sx.properties.push(...existingSxValue.properties);
          finalSx = sx;
        } else if (existingSxValue?.type === 'ArrayExpression') {
          existingSxValue.elements = [sx, ...existingSxValue.elements];
          finalSx = existingSxValue;
        } else {
          finalSx = j.arrayExpression([
            sx,
            existingSxValue.type === 'Identifier'
              ? j.spreadElement(
                  j.conditionalExpression(
                    j.callExpression(
                      j.memberExpression(j.identifier('Array'), j.identifier('isArray')),
                      [existingSxValue],
                    ),
                    existingSxValue,
                    j.arrayExpression([existingSxValue]),
                  ),
                )
              : existingSxValue,
          ]);
        }

        if (spreadElement && spreadElement.argument.type === 'Identifier') {
          if (finalSx.type === 'ObjectExpression') {
            const propSx = j.memberExpression(spreadElement.argument, j.identifier('sx'));
            finalSx = j.arrayExpression([
              finalSx,
              j.spreadElement(
                j.conditionalExpression(
                  j.callExpression(
                    j.memberExpression(j.identifier('Array'), j.identifier('isArray')),
                    [propSx],
                  ),
                  propSx,
                  j.arrayExpression([propSx]),
                ),
              ),
            ]);
          } else if (finalSx.type === 'ArrayExpression') {
            finalSx.elements.push(j.memberExpression(spreadElement.argument, j.identifier('sx')));
          }
        }

        el.node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('sx'), j.jsxExpressionContainer(finalSx)),
        );
      }
    });

  return root.toSource(printOptions);
}
