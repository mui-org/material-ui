// TypeScript 7 ships no importable compiler API: its root export is just
// `version`, and the replacement is still behind `typescript/unstable/*`.
// `@typescript/typescript6` is Microsoft's republished 6.x API for exactly
// this case. Swap it for the stable API once TypeScript 7.1 ships it
// (https://github.com/microsoft/TypeScript/issues/63703).
import type ts from '@typescript/typescript6';

export interface PropTypeDefinition {
  name: string;
  jsDoc: string | undefined;
  propType: PropType;
  filenames: Set<string>;
  /**
   * @internal
   */
  $$id: number;
}

export interface PropTypesComponent {
  name: string;
  propsFilename?: string;
  types: PropTypeDefinition[];
}

export type PropType =
  | AnyType
  | ArrayType
  | BooleanType
  | DOMElementType
  | ElementType
  | FunctionType
  | InstanceOfType
  | InterfaceType
  | LiteralType
  | NumericType
  | ObjectType
  | StringType
  | UndefinedType
  | UnionType;

export interface BasePropType {
  jsDoc: string | undefined;
  type: string;
}

export interface UndefinedType extends BasePropType {
  type: 'UndefinedNode';
}

export interface AnyType extends BasePropType {
  type: 'any';
}

export interface ArrayType extends BasePropType {
  arrayType: PropType;
  type: 'array';
}

export interface BooleanType extends BasePropType {
  type: 'boolean';
}

export interface DOMElementType extends BasePropType {
  optional?: boolean;
  type: 'DOMElementNode';
}

export interface ElementType extends BasePropType {
  elementType: 'element' | 'node' | 'elementType';
  type: 'ElementNode';
}

export interface FunctionType extends BasePropType {
  type: 'FunctionNode';
}

export interface InstanceOfType extends BasePropType {
  instance: string;
  type: 'InstanceOfNode';
}

export interface InterfaceType extends BasePropType {
  type: 'InterfaceNode';
  types: ReadonlyArray<[string, PropType]>;
}

export interface LiteralType extends BasePropType {
  value: string | number | ts.PseudoBigInt;
  type: 'LiteralNode';
}

export interface NumericType extends BasePropType {
  type: 'NumericNode';
}

export interface ObjectType extends BasePropType {
  type: 'ObjectNode';
}

export interface StringType extends BasePropType {
  type: 'StringNode';
}

export interface UnionType extends BasePropType {
  type: 'UnionNode';
  types: readonly PropType[];
}
