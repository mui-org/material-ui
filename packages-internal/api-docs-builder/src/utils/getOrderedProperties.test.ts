import { describe, it, expect } from 'vitest';
import * as ts from 'typescript';
import { getOrderedProperties } from './getOrderedProperties';

const FILE_NAME = '/virtual/slots.ts';

const SOURCE = `
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

interface ListSlots {
  list?: unknown;
  group?: unknown;
  indicator?: unknown;
}

interface MessageSlots {
  root?: unknown;
  avatar?: unknown;
}

export interface BoxSlots extends ListSlots, MessageSlots {
  box?: unknown;
}

export interface GroupSlots extends Pick<BoxSlots, 'group' | 'root' | 'avatar' | 'indicator'> {
  own?: unknown;
}

export type Warmup = 'avatar' | 'indicator';
`;

function createChecker() {
  const options: ts.CompilerOptions = { target: ts.ScriptTarget.ES2020, noLib: true };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (fileName, languageVersion, ...other) =>
    fileName === FILE_NAME
      ? ts.createSourceFile(fileName, SOURCE, languageVersion)
      : getSourceFile(fileName, languageVersion, ...other);
  host.fileExists = (fileName) => fileName === FILE_NAME;
  const program = ts.createProgram([FILE_NAME], options, host);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(FILE_NAME)!;
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile)!;
  const exports = Object.fromEntries(
    checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.name, symbol]),
  );
  const getDeclaredType = (name: string) => checker.getDeclaredTypeOfSymbol(exports[name]);
  return { checker, getDeclaredType };
}

function getNames(typeName: string, { warmup = false, ordered = false } = {}) {
  const { checker, getDeclaredType } = createChecker();
  if (warmup) {
    // Creates the 'avatar' and 'indicator' literal types before the `Pick` keys.
    getDeclaredType('Warmup');
  }
  const type = getDeclaredType(typeName);
  const properties = ordered ? getOrderedProperties(checker, type) : type.getProperties();
  return properties.map((symbol) => symbol.name);
}

describe('getOrderedProperties', () => {
  it('reproduces the unstable order of `type.getProperties()` for a `Pick`', () => {
    expect(getNames('GroupSlots', { warmup: true })).not.to.deep.equal(getNames('GroupSlots'));
  });

  it('orders `Pick` members by declaration, regardless of checker state', () => {
    const expected = ['own', 'group', 'indicator', 'root', 'avatar'];
    expect(getNames('GroupSlots', { ordered: true })).to.deep.equal(expected);
    expect(getNames('GroupSlots', { ordered: true, warmup: true })).to.deep.equal(expected);
  });

  it('keeps the checker order for interface inheritance', () => {
    expect(getNames('BoxSlots', { ordered: true })).to.deep.equal(getNames('BoxSlots'));
  });
});
