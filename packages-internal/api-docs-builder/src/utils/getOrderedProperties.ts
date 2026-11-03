/* eslint-disable no-bitwise */
import * as ts from 'typescript';

const MEMBER_FLAGS = ts.SymbolFlags.Property | ts.SymbolFlags.Method | ts.SymbolFlags.Accessor;

function compareByDeclaration(a: ts.Symbol, b: ts.Symbol): number {
  const declarationA = a.declarations?.[0];
  const declarationB = b.declarations?.[0];
  if (!declarationA) {
    return declarationB ? 1 : a.name.localeCompare(b.name);
  }
  if (!declarationB) {
    return -1;
  }
  const fileA = declarationA.getSourceFile().fileName;
  const fileB = declarationB.getSourceFile().fileName;
  if (fileA !== fileB) {
    return fileA < fileB ? -1 : 1;
  }
  return declarationA.pos - declarationB.pos;
}

function getInterfaceTarget(type: ts.Type): ts.InterfaceType | null {
  if (!(type.flags & ts.TypeFlags.Object)) {
    return null;
  }
  const objectType = type as ts.ObjectType;
  if (objectType.objectFlags & ts.ObjectFlags.ClassOrInterface) {
    return objectType as ts.InterfaceType;
  }
  if (objectType.objectFlags & ts.ObjectFlags.Reference) {
    const target = (objectType as ts.TypeReference).target;
    if (target.objectFlags & ts.ObjectFlags.ClassOrInterface) {
      return target;
    }
  }
  return null;
}

// A mapped type over `keyof T` (`Partial`, `Required`, `Readonly`) lists its members in the
// order of `T`. Any other mapped type (`Pick`, `Omit`) lists them in the internal order of
// its key union.
function hasUnstableKeyOrder(type: ts.Type): boolean {
  if (!(type.flags & ts.TypeFlags.Object)) {
    return false;
  }
  if (!((type as ts.ObjectType).objectFlags & ts.ObjectFlags.Mapped)) {
    return false;
  }
  const declaration = type.symbol?.declarations?.[0];
  const constraint =
    declaration && ts.isMappedTypeNode(declaration)
      ? declaration.typeParameter.constraint
      : undefined;
  return !(
    constraint &&
    ts.isTypeOperatorNode(constraint) &&
    constraint.operator === ts.SyntaxKind.KeyOfKeyword
  );
}

// The type a `Pick<T, K>` or `Omit<T, K>` takes its members from: the first alias type argument
// that has all of them.
function getSourceType(type: ts.Type, properties: ts.Symbol[]): ts.Type | undefined {
  return type.aliasTypeArguments?.find(
    (argument) =>
      argument.flags & ts.TypeFlags.Object &&
      properties.every((symbol) => argument.getProperty(symbol.name)),
  );
}

function collectNames(checker: ts.TypeChecker, type: ts.Type, names: Set<string>) {
  const interfaceType = getInterfaceTarget(type);
  if (!interfaceType) {
    const properties = type.getProperties();
    if (!hasUnstableKeyOrder(type)) {
      properties.forEach((symbol) => names.add(symbol.name));
      return;
    }
    const sourceType = getSourceType(type, properties);
    if (sourceType) {
      const sourceNames = new Set<string>();
      collectNames(checker, sourceType, sourceNames);
      sourceNames.forEach((name) => {
        if (type.getProperty(name)) {
          names.add(name);
        }
      });
    }
    [...properties].sort(compareByDeclaration).forEach((symbol) => names.add(symbol.name));
    return;
  }
  interfaceType.symbol.members?.forEach((member) => {
    if (member.flags & MEMBER_FLAGS) {
      names.add(member.name);
    }
  });
  checker.getBaseTypes(interfaceType).forEach((baseType) => {
    collectNames(checker, baseType, names);
  });
}

/**
 * Returns the properties of `type` in an order that doesn't depend on the checker state.
 *
 * `type.getProperties()` lists the members of a mapped type such as `Pick<T, 'a' | 'b'>` in
 * the internal order of the key union, which depends on which literal types the checker
 * created first. Those members follow the order of the source type `T`, or declaration
 * position when there is no source type. Everything else keeps the checker order.
 */
export function getOrderedProperties(checker: ts.TypeChecker, type: ts.Type): ts.Symbol[] {
  const names = new Set<string>();
  collectNames(checker, type, names);

  const properties = type.getProperties();
  const byName = new Map(properties.map((symbol) => [symbol.name, symbol]));
  const ordered = [...names].flatMap((name) => byName.get(name) ?? []);
  const missing = properties.filter((symbol) => !names.has(symbol.name));
  return [...ordered, ...missing.sort(compareByDeclaration)];
}
