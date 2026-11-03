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

function collectNames(checker: ts.TypeChecker, type: ts.Type, names: Set<string>) {
  const interfaceType = getInterfaceTarget(type);
  if (!interfaceType) {
    [...type.getProperties()].sort(compareByDeclaration).forEach((symbol) => {
      names.add(symbol.name);
    });
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
 * created first. Interface members keep the checker order (own members, then each base).
 * Members of any other type are sorted by declaration position.
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
