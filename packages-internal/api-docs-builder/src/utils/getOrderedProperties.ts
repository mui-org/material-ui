/* eslint-disable no-bitwise */
import * as ts from '@typescript/typescript6';

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

function getSourceType(type: ts.Type, properties: ts.Symbol[]): ts.Type | undefined {
  return type.aliasTypeArguments?.find(
    (argument) =>
      argument.flags & ts.TypeFlags.Object &&
      properties.every((symbol) => argument.getProperty(symbol.name)),
  );
}

function collectNamesOfParts(checker: ts.TypeChecker, parts: ts.Type[], names: Set<string>) {
  let unstable = false;
  parts.forEach((part) => {
    if (collectNames(checker, part, names)) {
      unstable = true;
    }
  });
  return unstable;
}

// Adds the property names of `type` to `names` in the checker order, except for members of a
// mapped type with an unstable key order. Returns whether there were any of those.
function collectNames(checker: ts.TypeChecker, type: ts.Type, names: Set<string>): boolean {
  const interfaceType = getInterfaceTarget(type);
  if (interfaceType) {
    interfaceType.symbol.members?.forEach((member) => {
      if (member.flags & MEMBER_FLAGS) {
        names.add(member.name);
      }
    });
    return collectNamesOfParts(checker, checker.getBaseTypes(interfaceType), names);
  }
  if (type.isIntersection()) {
    return collectNamesOfParts(checker, type.types, names);
  }

  const properties = type.getProperties();
  if (!hasUnstableKeyOrder(type)) {
    properties.forEach((symbol) => names.add(symbol.name));
    return false;
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
  } else {
    [...properties].sort(compareByDeclaration).forEach((symbol) => names.add(symbol.name));
  }
  return true;
}

/**
 * Returns the properties of `type` in an order that doesn't depend on the checker state.
 *
 * `type.getProperties()` lists the members of a mapped type such as `Pick<T, 'a' | 'b'>` in
 * the internal order of the key union, which depends on which literal types the checker
 * created first. Those members follow the order of the source type `T` (the first alias type
 * argument that has all of them), or declaration position when there is none. Interfaces and
 * intersections are walked to find such members. Without any, `type.getProperties()` is
 * returned as is.
 */
export function getOrderedProperties(checker: ts.TypeChecker, type: ts.Type): ts.Symbol[] {
  const properties = type.getProperties();
  const names = new Set<string>();
  if (!collectNames(checker, type, names)) {
    return properties;
  }
  const byName = new Map(properties.map((symbol) => [symbol.name, symbol]));
  const ordered = [...names].flatMap((name) => byName.get(name) ?? []);
  // Members the walk can't name, such as computed keys, keep the checker order at the end.
  return [...ordered, ...properties.filter((symbol) => !names.has(symbol.name))];
}
