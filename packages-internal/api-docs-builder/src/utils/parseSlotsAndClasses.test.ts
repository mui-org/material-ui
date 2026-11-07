import { describe, it, expect } from 'vitest';
import * as ts from '@typescript/typescript6';
import parseSlotsAndClasses from './parseSlotsAndClasses';
import type { TypeScriptProject } from './createTypeScriptProject';
import type { ProjectSettings } from '../ProjectSettings';

const FILE_NAME = '/virtual/index.ts';

const SOURCE = `
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Partial<T> = { [P in keyof T]?: T[P] };
type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

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

export interface FeedSlots extends Partial<BoxSlots> {}

export declare function Feed(props: { slots?: FeedSlots }): React.ReactElement;

export interface ShelfSlots extends Pick<BoxSlots, 'group' | 'box'> {}

export declare function Shelf(props: { slots?: ShelfSlots }): React.ReactElement;

export interface TraySlots extends Omit<BoxSlots, 'list'> {}

export declare function Tray(props: { slots?: TraySlots }): React.ReactElement;

type CartBase = MessageSlots & Pick<BoxSlots, 'group' | 'box'>;

export interface CartSlots extends CartBase {}

export declare function Cart(props: { slots?: CartSlots }): React.ReactElement;

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

  it('lists `Partial` slots in the order of the source interface', () => {
    expect(getSlotNames('Feed')).to.deep.equal(getSlotNames('Box'));
  });

  it('lists `Pick` and `Omit` slots in the order of the source interface', () => {
    expect(getSlotNames('Shelf')).to.deep.equal(['box', 'group']);
    expect(getSlotNames('Tray')).to.deep.equal(['box', 'group', 'indicator', 'root', 'avatar']);
  });

  it('lists `Pick` slots in an intersection in the order of the source interface', () => {
    expect(getSlotNames('Cart')).to.deep.equal(['root', 'avatar', 'box', 'group']);
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
