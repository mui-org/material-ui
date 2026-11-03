import type ts from '@typescript/typescript6';
import { uniqBy } from 'es-toolkit/array';
import type {
  PropType,
  ArrayType,
  LiteralType,
  BooleanType,
  AnyType,
  UnionType,
  BasePropType,
  ElementType,
  DOMElementType,
  InstanceOfType,
  InterfaceType,
  FunctionType,
  StringType,
  ObjectType,
  NumericType,
} from './models';
import getTypeHash from './getTypeHash';

export function createAnyType(init: { jsDoc: string | undefined }): AnyType {
  return {
    type: 'any',
    jsDoc: init.jsDoc,
  };
}

export function createArrayType(init: {
  arrayType: PropType;
  jsDoc: string | undefined;
}): ArrayType {
  return {
    type: 'array',
    jsDoc: init.jsDoc,
    arrayType: init.arrayType,
  };
}

export function createBooleanType(init: { jsDoc: string | undefined }): BooleanType {
  return {
    type: 'boolean',
    jsDoc: init.jsDoc,
  };
}

export function createDOMElementType(init: {
  optional: boolean | undefined;
  jsDoc: string | undefined;
}): DOMElementType {
  return {
    type: 'DOMElementNode',
    jsDoc: init.jsDoc,
    optional: init.optional,
  };
}

export function createElementType(init: {
  elementType: ElementType['elementType'];
  jsDoc: string | undefined;
}): ElementType {
  return {
    type: 'ElementNode',
    jsDoc: init.jsDoc,
    elementType: init.elementType,
  };
}

export function createFunctionType(init: { jsDoc: string | undefined }): FunctionType {
  return {
    type: 'FunctionNode',
    jsDoc: init.jsDoc,
  };
}

export function createInstanceOfType(init: {
  jsDoc: string | undefined;
  instance: string;
}): InstanceOfType {
  return {
    type: 'InstanceOfNode',
    instance: init.instance,
    jsDoc: init.jsDoc,
  };
}

export function createInterfaceType(init: {
  jsDoc: string | undefined;
  types: ReadonlyArray<[string, PropType]> | undefined;
}): InterfaceType {
  return {
    type: 'InterfaceNode',
    jsDoc: init.jsDoc,
    types: init.types ?? [],
  };
}

export function createLiteralType(init: {
  value: string | number | ts.PseudoBigInt;
  jsDoc: string | undefined;
}): LiteralType {
  return {
    type: 'LiteralNode',
    value: init.value,
    jsDoc: init.jsDoc,
  };
}

export function createNumericType(init: { jsDoc: string | undefined }): NumericType {
  return {
    type: 'NumericNode',
    jsDoc: init.jsDoc,
  };
}

export function createObjectType(init: { jsDoc: string | undefined }): ObjectType {
  return {
    type: 'ObjectNode',
    jsDoc: init.jsDoc,
  };
}

export function createStringType(init: { jsDoc: string | undefined }): StringType {
  return {
    type: 'StringNode',
    jsDoc: init.jsDoc,
  };
}

export interface UndefinedType extends BasePropType {
  type: 'UndefinedNode';
}

export function createUndefinedType(init: { jsDoc: string | undefined }): UndefinedType {
  return {
    type: 'UndefinedNode',
    jsDoc: init.jsDoc,
  };
}

export function uniqueUnionTypes(node: UnionType): UnionType {
  return {
    type: node.type,
    jsDoc: node.jsDoc,
    types: uniqBy(node.types, (type) => {
      return getTypeHash(type);
    }),
  };
}

export function createUnionType(init: {
  jsDoc: string | undefined;
  types: readonly PropType[];
}): UnionType {
  const flatTypes: PropType[] = [];

  function flattenTypes(nodes: readonly PropType[]) {
    nodes.forEach((type) => {
      if (type.type === 'UnionNode') {
        flattenTypes(type.types);
      } else {
        flatTypes.push(type);
      }
    });
  }

  flattenTypes(init.types);

  return uniqueUnionTypes({
    type: 'UnionNode',
    jsDoc: init.jsDoc,
    types: flatTypes,
  });
}
