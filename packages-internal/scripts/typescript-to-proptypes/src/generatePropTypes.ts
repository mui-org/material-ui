import partition from 'es-toolkit/compat/partition';
import type { PropTypeDefinition, PropTypesComponent, PropType, LiteralType } from './models';
import { createDOMElementType, createBooleanType, uniqueUnionTypes } from './createType';

export interface GeneratePropTypesOptions {
  /**
   * If source itself written in typescript prop-types disable prop-types validation
   * by injecting propTypes as
   * ```jsx
   * .propTypes = { ... } as any
   * ```
   */
  disablePropTypesTypeChecking?: boolean;
  /**
   * Set to true if you want to make sure `babel-plugin-transform-react-remove-prop-types` recognizes the generated .propTypes.
   */
  ensureBabelPluginTransformReactRemovePropTypesIntegration?: boolean;
  /**
   * Enable/disable the default sorting (ascending) or provide your own sort function
   * @default true
   */
  sortProptypes?: boolean | ((a: PropTypeDefinition, b: PropTypeDefinition) => 0 | -1 | 1);
  /**
   * The name used when importing prop-types
   * @default 'PropTypes'
   */
  importedName?: string;
  /**
   * Enable/disable including JSDoc comments
   * @default true
   */
  includeJSDoc?: boolean;
  /**
   * Previous source code of the validator for each prop type
   */
  previousPropTypesSource?: Map<string, string>;
  /**
   * Previous JSDoc comment source for each prop type
   */
  previousPropTypesJsDoc?: Map<string, string>;
  /**
   * Given the `prop`, the `previous` source of the validator and the `generated` source:
   * What source should be injected? `previous` is `undefined` if the validator
   * didn't exist before
   * @default Uses `generated` source
   */
  reconcilePropTypes?(
    proptype: PropTypeDefinition,
    previous: string | undefined,
    generated: string,
  ): string;
  /**
   * Control which PropTypes are included in the final result
   * @param proptype The current PropType about to be converted to text
   */
  shouldInclude?(proptype: PropTypeDefinition): boolean | undefined;
  /**
   * A comment that will be added to the start of the PropTypes code block
   * @example
   * foo.propTypes = {
   *  // Comment goes here
   * }
   */
  comment?: string;
  /**
   * Overrides the given `sortLiteralUnions` based on the proptype.
   * If `undefined` is returned the default `sortLiteralUnions` will be used.
   */
  getSortLiteralUnions?: (
    component: PropTypesComponent,
    propType: PropTypeDefinition,
  ) => ((a: LiteralType, b: LiteralType) => number) | undefined;
  /**
   * By default literals in unions are sorted by:
   * - numbers last, ascending
   * - anything else by their stringified value using localeCompare
   */
  sortLiteralUnions?: (a: LiteralType, b: LiteralType) => number;
}

function defaultSortLiteralUnions(a: LiteralType, b: LiteralType) {
  const { value: valueA } = a;
  const { value: valueB } = b;
  // numbers ascending
  if (typeof valueA === 'number' && typeof valueB === 'number') {
    return valueA - valueB;
  }
  // numbers last
  if (typeof valueA === 'number') {
    return 1;
  }
  if (typeof valueB === 'number') {
    return -1;
  }
  // sort anything else by their stringified value
  return String(valueA).localeCompare(String(valueB));
}

/**
 * Generates code from the given component
 * @param component The component to convert to code
 * @param options The options used to control the way the code gets generated
 */
export function generatePropTypes(
  component: PropTypesComponent,
  options: GeneratePropTypesOptions = {},
): string {
  const {
    disablePropTypesTypeChecking = false,
    ensureBabelPluginTransformReactRemovePropTypesIntegration = false,
    importedName = 'PropTypes',
    includeJSDoc = true,
    sortProptypes = true,
    previousPropTypesSource = new Map<string, string>(),
    previousPropTypesJsDoc = new Map<string, string>(),
    reconcilePropTypes = (_prop: PropTypeDefinition, _previous: string, generated: string) =>
      generated,
    shouldInclude,
    getSortLiteralUnions = () => defaultSortLiteralUnions,
  } = options;

  function jsDoc(documentedNode: PropTypeDefinition | LiteralType): string {
    if (!includeJSDoc || !documentedNode.jsDoc) {
      return '';
    }
    return `/**\n* ${documentedNode.jsDoc
      .split(/\r?\n/)
      .reduce((prev, curr) => `${prev}\n* ${curr}`)}\n*/\n`;
  }

  function generatePropType(
    propType: PropType,
    context: { component: PropTypesComponent; propTypeDefinition: PropTypeDefinition },
  ): string {
    if (propType.type === 'InterfaceNode') {
      return `${importedName}.shape({\n${propType.types
        .slice()
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, type]) => {
          let regex = /^(UnionNode|DOMElementNode)$/;
          if (name !== 'children') {
            regex = /^(UnionNode|DOMElementNode|ElementNode)$/;
          }
          return `"${name}": ${generatePropType(type, context)}${
            !type.type.match(regex) ? '.isRequired' : ''
          }`;
        })
        .join(',\n')}\n})`;
    }

    if (propType.type === 'FunctionNode') {
      return `${importedName}.func`;
    }

    if (propType.type === 'StringNode') {
      return `${importedName}.string`;
    }

    if (propType.type === 'boolean') {
      return `${importedName}.bool`;
    }

    if (propType.type === 'NumericNode') {
      return `${importedName}.number`;
    }

    if (propType.type === 'LiteralNode') {
      return `${importedName}.oneOf([${jsDoc(propType)}${propType.value}])`;
    }

    if (propType.type === 'ObjectNode') {
      return `${importedName}.object`;
    }

    if (propType.type === 'any') {
      // key isn't a prop like the others, see
      // https://github.com/mui/material-ui/issues/25304
      if (context.propTypeDefinition.name === 'key') {
        return '() => null';
      }

      return `${importedName}.any`;
    }

    if (propType.type === 'ElementNode') {
      return `${importedName}.${propType.elementType}`;
    }

    if (propType.type === 'InstanceOfNode') {
      return `${importedName}.instanceOf(${propType.instance})`;
    }

    if (propType.type === 'DOMElementNode') {
      return `(props, propName) => {
			if (props[propName] == null) {
				return ${
          propType.optional
            ? 'null'
            : `new Error(\`Prop '\${propName}' is required but wasn't specified\`)`
        }
			}
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
				return new Error(\`Expected prop '\${propName}' to be of type Element\`)
			}
      return null;
		}`;
    }

    if (propType.type === 'array') {
      if (propType.arrayType.type === 'any') {
        return `${importedName}.array`;
      }

      return `${importedName}.arrayOf(${generatePropType(propType.arrayType, context)})`;
    }

    if (propType.type === 'UnionNode') {
      const uniqueTypes = uniqueUnionTypes(propType).types;
      const isOptional = uniqueTypes.some(
        (type) =>
          type.type === 'UndefinedNode' || (type.type === 'LiteralNode' && type.value === 'null'),
      );
      const nonNullishUniqueTypes = uniqueTypes.filter((type) => {
        return (
          type.type !== 'UndefinedNode' && !(type.type === 'LiteralNode' && type.value === 'null')
        );
      });

      if (uniqueTypes.length === 2 && uniqueTypes.some((type) => type.type === 'DOMElementNode')) {
        return generatePropType(
          createDOMElementType({ jsDoc: undefined, optional: isOptional }),
          context,
        );
      }

      let [literals, rest] = partition(
        isOptional ? nonNullishUniqueTypes : uniqueTypes,
        (type): type is LiteralType => type.type === 'LiteralNode',
      );

      const sortLiteralUnions =
        getSortLiteralUnions(context.component, context.propTypeDefinition) ||
        defaultSortLiteralUnions;
      literals = literals.sort(sortLiteralUnions);

      const nodeToStringName = (type: PropType): string => {
        if (type.type === 'InstanceOfNode') {
          return `${type.type}.${type.instance}`;
        }
        if (type.type === 'InterfaceNode') {
          // An interface is PropTypes.shape
          // Use `ShapeNode` to get it sorted in the correct order
          return `ShapeNode`;
        }

        return type.type;
      };

      rest = rest.sort((a, b) => nodeToStringName(a).localeCompare(nodeToStringName(b)));

      if (literals.find((x) => x.value === 'true') && literals.find((x) => x.value === 'false')) {
        rest.push(createBooleanType({ jsDoc: undefined }));
        literals = literals.filter((x) => x.value !== 'true' && x.value !== 'false');
      }

      const literalProps =
        literals.length !== 0
          ? `${importedName}.oneOf([${literals
              .map((x) => `${jsDoc(x)}${x.value}`)
              .reduce((prev, curr) => `${prev},${curr}`)}])`
          : '';

      if (rest.length === 0) {
        return `${literalProps}${isOptional ? '' : '.isRequired'}`;
      }

      if (literals.length === 0 && rest.length === 1) {
        return `${generatePropType(rest[0], context)}${isOptional ? '' : '.isRequired'}`;
      }

      return `${importedName}.oneOfType([${literalProps ? `${literalProps}, ` : ''}${rest
        .map((type) => generatePropType(type, context))
        .reduce((prev, curr) => `${prev},${curr}`)}])${isOptional ? '' : '.isRequired'}`;
    }

    throw new Error(
      `Nothing to handle node of type "${propType.type}" in "${context.propTypeDefinition.name}"`,
    );
  }

  function generatePropTypeDefinition(
    propTypeDefinition: PropTypeDefinition,
    context: { component: PropTypesComponent },
  ): string {
    let isRequired: boolean | undefined = true;

    if (propTypeDefinition.propType.type === 'DOMElementNode') {
      // DOMElement generator decides
      isRequired = undefined;
    } else if (propTypeDefinition.propType.type === 'UnionNode') {
      // union generator decides
      isRequired = undefined;
    }

    const validatorSource = reconcilePropTypes(
      propTypeDefinition,
      previousPropTypesSource.get(propTypeDefinition.name),
      `${generatePropType(propTypeDefinition.propType, {
        component: context.component,
        propTypeDefinition,
      })}${isRequired === true ? '.isRequired' : ''}`,
    );

    const previousJsDoc = previousPropTypesJsDoc.get(propTypeDefinition.name);
    const jsDocSource =
      previousJsDoc !== undefined && validatorSource.includes('@typescript-to-proptypes-ignore')
        ? `${previousJsDoc}\n`
        : jsDoc(propTypeDefinition);

    return `${jsDocSource}"${propTypeDefinition.name}": ${validatorSource},`;
  }

  const propTypes = component.types.slice();

  if (typeof sortProptypes === 'function') {
    propTypes.sort(sortProptypes);
  } else if (sortProptypes === true) {
    propTypes.sort((a, b) => a.name.localeCompare(b.name));
  }

  let filteredNodes = propTypes;
  if (shouldInclude) {
    filteredNodes = filteredNodes.filter((type) => shouldInclude(type));
  }

  if (filteredNodes.length === 0) {
    return '';
  }

  const generated = filteredNodes
    .map((prop) => generatePropTypeDefinition(prop, { component }))
    .reduce((prev, curr) => `${prev}\n${curr}`);
  if (generated.length === 0) {
    return '';
  }

  const comment =
    options.comment &&
    `// ${options.comment.split(/\r?\n/gm).reduce((prev, curr) => `${prev}\n// ${curr}`)}\n`;

  const propTypesMemberTrailingComment = ensureBabelPluginTransformReactRemovePropTypesIntegration
    ? '/* remove-proptypes */'
    : '';
  const propTypesCasting = disablePropTypesTypeChecking ? ' as any' : '';
  const propTypesBanner = comment !== undefined ? comment : '';

  return `${component.name}.propTypes ${propTypesMemberTrailingComment}= {\n${propTypesBanner}${generated}\n}${propTypesCasting}`;
}
