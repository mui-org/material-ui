import type PropTypes from 'prop-types';

export default function chainPropTypes<A, B>(
  propType1: PropTypes.Validator<A>,
  propType2: PropTypes.Validator<B>,
): PropTypes.Validator<A & B> {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}
