import * as ts from '@typescript/typescript6';
import type { TypeScriptProject } from './createTypeScriptProject';

export interface ParsedProp {
  /**
   * If `true`, some signatures do not contain this property.
   * For example: `id` in `{ id: number, value: string } | { value: string }`
   */
  onlyUsedInSomeSignatures: boolean;
  signatures: { symbol: ts.Symbol; componentType: ts.Type }[];
}

export interface ParsedComponent {
  name: string;
  location: ts.Node;
  type: ts.Type;
  sourceFile: ts.SourceFile | undefined;
  props: Record<string, ParsedProp>;
}

function isTypeJSXElementLike(type: ts.Type, project: TypeScriptProject): boolean {
  const symbol = type.symbol ?? type.aliasSymbol;
  if (symbol) {
    const name = project.checker.getFullyQualifiedName(symbol);
    return (
      // Some types are resolved to paths like: "/Users/.../node_modules/@types/react/jsx-runtime".JSX.Element
      name.endsWith('.JSX.Element') || name.endsWith('.ReactElement') || name.endsWith('.ReactNode')
    );
  }

  if (type.isUnion()) {
    return type.types.every(
      // eslint-disable-next-line no-bitwise
      (subType) => subType.flags & ts.TypeFlags.Null || isTypeJSXElementLike(subType, project),
    );
  }

  return false;
}

function isStyledFunction(node: ts.VariableDeclaration): boolean {
  return (
    !!node.initializer &&
    ts.isCallExpression(node.initializer) &&
    ts.isCallExpression(node.initializer.expression) &&
    ts.isIdentifier(node.initializer.expression.expression) &&
    node.initializer.expression.expression.escapedText === 'styled'
  );
}

// TODO update to reflect https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65135
function getJSXLikeReturnValueFromFunction(type: ts.Type, project: TypeScriptProject) {
  return type
    .getCallSignatures()
    .filter((signature) => isTypeJSXElementLike(signature.getReturnType(), project));
}

function parsePropsType({
  name,
  type,
  shouldInclude = () => true,
  location,
  sourceFile,
}: {
  name: string;
  type: ts.Type;
  location: ts.Node;
  shouldInclude?: (data: { name: string; depth: number }) => boolean;
  sourceFile: ts.SourceFile | undefined;
}): ParsedComponent {
  const parsedProps: Record<string, ParsedProp> = {};

  type
    .getProperties()
    .filter((property) => shouldInclude({ name: property.getName(), depth: 1 }))
    .forEach((property) => {
      parsedProps[property.getName()] = {
        signatures: [
          {
            symbol: property,
            componentType: type,
          },
        ],
        onlyUsedInSomeSignatures: false,
      };
    });

  return {
    name,
    location,
    type,
    sourceFile,
    props: parsedProps,
  };
}

function parseFunctionComponent({
  node,
  shouldInclude,
  project,
}: {
  node: ts.VariableDeclaration | ts.FunctionDeclaration;
  shouldInclude?: (data: { name: string; depth: number }) => boolean;
  project: TypeScriptProject;
}): ParsedComponent | null {
  if (!node.name) {
    return null;
  }

  const symbol = project.checker.getSymbolAtLocation(node.name);
  if (!symbol) {
    return null;
  }
  const componentName = node.name.getText();

  // Discriminate render functions to components
  if (componentName[0].toUpperCase() !== componentName[0]) {
    return null;
  }

  const signatures = getJSXLikeReturnValueFromFunction(
    project.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
    project,
  );
  if (signatures.length === 0) {
    return null;
  }

  const parsedComponents = signatures.map((signature) =>
    parsePropsType({
      shouldInclude,
      name: componentName,
      type: project.checker.getTypeOfSymbolAtLocation(
        signature.parameters[0],
        signature.parameters[0].valueDeclaration!,
      ),
      location: signature.parameters[0].valueDeclaration!,
      sourceFile: node.getSourceFile(),
    }),
  );

  const squashedProps: Record<string, ParsedProp> = {};
  parsedComponents.forEach((parsedComponent) => {
    Object.keys(parsedComponent.props).forEach((propName) => {
      if (!squashedProps[propName]) {
        squashedProps[propName] = parsedComponent.props[propName];
      } else {
        squashedProps[propName].signatures = [
          ...squashedProps[propName].signatures,
          ...parsedComponent.props[propName].signatures,
        ];
      }
    });
  });

  const squashedParsedComponent: ParsedComponent = {
    ...parsedComponents[0],
    props: squashedProps,
  };

  Object.keys(squashedParsedComponent.props).forEach((propName) => {
    squashedParsedComponent.props[propName].onlyUsedInSomeSignatures =
      squashedParsedComponent.props[propName].signatures.length < signatures.length;
  });

  return squashedParsedComponent;
}

export interface GetPropsFromComponentDeclarationOptions {
  project: TypeScriptProject;
  node: ts.Node;
  /**
   * Called before a PropType is added to a component/object
   * @returns true to include the prop, false to skip it
   */
  shouldInclude?: (data: { name: string; depth: number }) => boolean;
  /**
   * Control if const declarations should be checked
   * @default false
   * @example declare const Component: React.JSXElementConstructor<Props>;
   */
  checkDeclarations?: boolean;
}

function getPropsFromVariableDeclaration({
  node,
  project,
  checkDeclarations,
  shouldInclude,
}: { node: ts.VariableDeclaration } & Pick<
  GetPropsFromComponentDeclarationOptions,
  'project' | 'checkDeclarations' | 'shouldInclude'
>) {
  const type = project.checker.getTypeAtLocation(node.name);
  if (!node.initializer) {
    if (
      checkDeclarations &&
      type.aliasSymbol &&
      type.aliasTypeArguments &&
      project.checker.getFullyQualifiedName(type.aliasSymbol) === 'React.JSXElementConstructor'
    ) {
      const propsType = type.aliasTypeArguments[0];
      if (propsType === undefined) {
        throw new TypeError(
          'Unable to find symbol for `props`. This is a bug in typescript-to-proptypes.',
        );
      }
      return parsePropsType({
        name: node.name.getText(),
        type: propsType,
        location: node.name,
        shouldInclude,
        sourceFile: node.getSourceFile(),
      });
    }

    if (checkDeclarations) {
      return parseFunctionComponent({
        node,
        shouldInclude,
        project,
      });
    }

    return null;
  }

  if (
    (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) &&
    node.initializer.parameters.length === 1
  ) {
    return parseFunctionComponent({
      node,
      shouldInclude,
      project,
    });
  }
  //  x = React.memo((props:type) { return <div/> })
  //  x = React.forwardRef((props:type) { return <div/> })
  if (ts.isCallExpression(node.initializer) && node.initializer.arguments.length > 0) {
    const potentialComponent = node.initializer.arguments[0];
    if (
      (ts.isArrowFunction(potentialComponent) || ts.isFunctionExpression(potentialComponent)) &&
      potentialComponent.parameters.length > 0 &&
      getJSXLikeReturnValueFromFunction(
        project.checker.getTypeAtLocation(potentialComponent),
        project,
      ).length > 0
    ) {
      const propsSymbol = project.checker.getSymbolAtLocation(
        potentialComponent.parameters[0].name,
      );
      if (propsSymbol) {
        return parsePropsType({
          name: node.name.getText(),
          type: project.checker.getTypeOfSymbolAtLocation(
            propsSymbol,
            propsSymbol.valueDeclaration!,
          ),
          location: propsSymbol.valueDeclaration!,
          shouldInclude,
          sourceFile: node.getSourceFile(),
        });
      }
    }
  }

  // handle component factories: x = createComponent()
  if (
    checkDeclarations &&
    node.initializer &&
    !isStyledFunction(node) &&
    getJSXLikeReturnValueFromFunction(type, project).length > 0
  ) {
    return parseFunctionComponent({
      node,
      shouldInclude,
      project,
    });
  }

  return null;
}

export function getPropsFromComponentNode({
  node,
  shouldInclude,
  project,
  checkDeclarations,
}: GetPropsFromComponentDeclarationOptions): ParsedComponent | null {
  let parsedComponent: ParsedComponent | null = null;
  // function x(props: type) { return <div/> }
  if (
    ts.isFunctionDeclaration(node) &&
    node.name &&
    node.parameters.length === 1 &&
    getJSXLikeReturnValueFromFunction(project.checker.getTypeAtLocation(node.name), project)
      .length > 0
  ) {
    parsedComponent = parseFunctionComponent({ node, shouldInclude, project });
  } else if (ts.isVariableDeclaration(node)) {
    parsedComponent = getPropsFromVariableDeclaration({
      node,
      project,
      checkDeclarations,
      shouldInclude,
    });
  } else if (ts.isVariableStatement(node)) {
    // const x = ...
    ts.forEachChild(node.declarationList, (variableNode) => {
      if (parsedComponent != null) {
        return;
      }

      // x = (props: type) => { return <div/> }
      // x = function(props: type) { return <div/> }
      // x = function y(props: type) { return <div/> }
      // x = react.memo((props:type) { return <div/> })
      if (ts.isVariableDeclaration(variableNode) && variableNode.name) {
        parsedComponent = getPropsFromVariableDeclaration({
          node: variableNode,
          project,
          checkDeclarations,
          shouldInclude,
        });
      }

      if (
        ts.isClassDeclaration(variableNode) &&
        variableNode.name &&
        variableNode.heritageClauses &&
        variableNode.heritageClauses.length === 1
      ) {
        const heritage = variableNode.heritageClauses[0];
        if (heritage.types.length !== 1) {
          return;
        }

        const arg = heritage.types[0];
        if (!arg.typeArguments) {
          return;
        }

        parsedComponent = parsePropsType({
          shouldInclude,
          name: variableNode.name.getText(),
          location: arg.typeArguments[0],
          type: project.checker.getTypeAtLocation(arg.typeArguments[0]),
          sourceFile: node.getSourceFile(),
        });
      }
    });
  }

  return parsedComponent;
}
