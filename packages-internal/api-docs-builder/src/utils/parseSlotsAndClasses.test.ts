import { describe, it, expect } from 'vitest';
import * as ts from 'typescript';
import parseSlotsAndClasses from './parseSlotsAndClasses';
import type { TypeScriptProject } from './createTypeScriptProject';
import type { ProjectSettings } from '../ProjectSettings';

const FILE_NAME = '/virtual/index.ts';

const SOURCE = `
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

declare namespace React {
  interface ReactElement {}
}

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

export declare function Box(props: { slots?: BoxSlots }): React.ReactElement;

export interface GroupSlots extends Pick<BoxSlots, 'group' | 'root' | 'avatar' | 'indicator'> {
  own?: unknown;
}

export declare function Group(props: { slots?: GroupSlots }): React.ReactElement;

export type Warmup = 'avatar' | 'indicator';
`;

function createProject({ warmup = false } = {}): TypeScriptProject {
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
  const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(FILE_NAME)!)!;
  const exports = Object.fromEntries(
    checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.name, symbol]),
  );
  if (warmup) {
    // Creates the 'avatar' and 'indicator' literal types before the `Pick` keys.
    checker.getDeclaredTypeOfSymbol(exports.Warmup);
  }
  return { name: 'test', rootPath: '/virtual', exports, program, checker };
}

function getSlotNames(componentName: string, options?: { warmup?: boolean }) {
  return parseSlotsAndClasses({
    typescriptProject: createProject(options),
    projectSettings: {} as ProjectSettings,
    componentName,
    muiName: `Mui${componentName}`,
  }).slots.map((slot) => slot.name);
}

describe('parseSlotsAndClasses', () => {
  it('lists interface slots in declaration order, own members first', () => {
    expect(getSlotNames('Box')).to.deep.equal([
      'box',
      'list',
      'group',
      'indicator',
      'root',
      'avatar',
    ]);
  });

  it('lists `Pick` slots in the same order regardless of checker state', () => {
    // Guards the fixture: the raw checker order of the `Pick` must depend on the warmup.
    const rawOrder = (warmup: boolean) => {
      const { checker, exports } = createProject({ warmup });
      return checker
        .getDeclaredTypeOfSymbol(exports.GroupSlots)
        .getProperties()
        .map((symbol) => symbol.name);
    };
    expect(rawOrder(true)).not.to.deep.equal(rawOrder(false));

    const expected = ['own', 'group', 'indicator', 'root', 'avatar'];
    expect(getSlotNames('Group')).to.deep.equal(expected);
    expect(getSlotNames('Group', { warmup: true })).to.deep.equal(expected);
  });
});
