import * as recast from 'recast';
import { parse as docgenParse } from 'react-docgen';
import type { PropTypeDescriptor } from 'react-docgen';
import { escapeCell, escapeEntities, joinUnionTypes } from '../buildApi';

function getDeprecatedInfo(type: PropTypeDescriptor | undefined) {
  if (!type?.raw) {
    return false;
  }
  const marker = /deprecatedPropType\((\r*\n)*\s*PropTypes\./g;
  const match = type.raw.match(marker);
  const startIndex = type.raw.search(marker);
  if (match) {
    const offset = match[0].length;

    return {
      propTypes: type.raw.substring(startIndex + offset, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

export function getChained(type: PropTypeDescriptor | undefined) {
  if (type?.raw) {
    const marker = 'chainPropTypes';
    const indexStart = type.raw.indexOf(marker);

    if (indexStart !== -1) {
      const results = docgenParse(
        `
        import PropTypes from 'prop-types';
        const Foo = () => <div />
        Foo.propTypes = {
          bar: ${recast.print(recast.parse(type.raw).program.body[0].expression.arguments[0]).code}
        }
        export default Foo
      `,
        // helps react-docgen pickup babel.config.js
        { filename: './' },
      );
      const parsed = results[0];
      return {
        type: parsed.props?.bar?.type,
        required: parsed.props?.bar?.required,
      };
    }
  }

  return false;
}

export function isElementTypeAcceptingRefProp(type: PropTypeDescriptor | undefined): boolean {
  return type?.raw === 'elementTypeAcceptingRef';
}

function isRefType(type: PropTypeDescriptor | undefined): boolean {
  return type?.raw === 'refType';
}

function isIntegerType(type: PropTypeDescriptor | undefined): boolean {
  return type?.raw?.startsWith('integerPropType') ?? false;
}

export function isElementAcceptingRefProp(type: PropTypeDescriptor | undefined): boolean {
  return type?.raw ? /^elementAcceptingRef/.test(type.raw) : false;
}

export default function generatePropTypeDescription(
  type: PropTypeDescriptor | undefined,
): string | undefined {
  if (!type) {
    return undefined;
  }
  switch (type.name) {
    case 'custom': {
      if (isElementTypeAcceptingRefProp(type)) {
        return 'element type';
      }
      if (isElementAcceptingRefProp(type)) {
        return 'element';
      }
      if (isIntegerType(type)) {
        return 'integer';
      }
      if (isRefType(type)) {
        return 'ref';
      }
      if (type.raw === 'HTMLElementType') {
        return 'HTML element';
      }
      if (type.raw === '() => null') {
        return 'any';
      }

      const deprecatedInfo = getDeprecatedInfo(type);
      if (deprecatedInfo !== false) {
        return generatePropTypeDescription({
          // eslint-disable-next-line react/forbid-foreign-prop-types
          name: deprecatedInfo.propTypes,
        } as PropTypeDescriptor);
      }

      const chained = getChained(type);
      if (chained !== false && chained.type) {
        return generatePropTypeDescription(chained.type);
      }

      return type.raw;
    }

    case 'shape': {
      const shapeValue = type.value as Record<string, PropTypeDescriptor>;
      return `{ ${Object.keys(shapeValue)
        .map((subValue) => {
          const subType = shapeValue[subValue];
          return `${subValue}${subType.required ? '' : '?'}: ${generatePropTypeDescription(
            subType,
          )}`;
        })
        .join(', ')} }`;
    }

    case 'union': {
      const unionValue = type.value as PropTypeDescriptor[];
      return joinUnionTypes(
        unionValue.map((type2) => {
          return generatePropTypeDescription(type2) ?? '';
        }),
      );
    }
    case 'enum': {
      const enumValue = type.value as Array<{ value: string; computed?: boolean }>;
      return joinUnionTypes(
        enumValue.map((type2) => {
          return escapeCell(type2.value);
        }),
      );
    }

    case 'arrayOf': {
      const arrayValue = type.value as PropTypeDescriptor;
      return `Array${escapeEntities('<')}${generatePropTypeDescription(arrayValue)}${escapeEntities('>')}`;
    }

    case 'instanceOf': {
      const instanceValue = type.value as string;
      if (instanceValue.startsWith('typeof')) {
        return /typeof (.*) ===/.exec(instanceValue)![1];
      }
      return instanceValue;
    }

    default:
      return type.name;
  }
}
