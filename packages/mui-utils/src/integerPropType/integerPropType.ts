import type PropTypes from 'prop-types';

export function getTypeByValue(value: any): string {
  const valueType = typeof value;
  switch (valueType) {
    case 'number':
      if (Number.isNaN(value)) {
        return 'NaN';
      }
      if (!Number.isFinite(value)) {
        return 'Infinity';
      }
      if (value !== Math.floor(value)) {
        return 'float';
      }

      return 'number';
    case 'object':
      if (value === null) {
        return 'null';
      }

      return value.constructor.name;
    default:
      return valueType;
  }
}

function requiredInteger(
  props: Record<string, any>,
  propName: string,
  componentName: string,
  location: string,
): Error | null {
  const propValue = props[propName];

  if (propValue == null || !Number.isInteger(propValue)) {
    const propType = getTypeByValue(propValue);

    return new RangeError(
      `Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`,
    );
  }

  return null;
}

function validator(
  props: Record<string, any>,
  propName: string,
  componentName: string,
  location: string,
): Error | null {
  const propValue = props[propName];

  if (propValue === undefined) {
    return null;
  }

  return requiredInteger(props, propName, componentName, location);
}

function validatorNoop(): null {
  return null;
}

validator.isRequired = requiredInteger;
validatorNoop.isRequired = validatorNoop;

const integerPropType: PropTypes.Requireable<number> =
  process.env.NODE_ENV === 'production' ? validatorNoop : validator;

export default integerPropType;
