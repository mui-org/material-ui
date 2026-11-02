import type { ValidationMap } from 'prop-types';
// This module is based on https://github.com/airbnb/prop-types-exact repository.
// However, in order to reduce the number of dependencies and to remove some extra safe checks
// the module was forked.

const specialProperty = 'exact-prop: \u200b';

export default function exactProp<T>(propTypes: ValidationMap<T>): ValidationMap<T> {
  if (process.env.NODE_ENV === 'production') {
    return propTypes;
  }

  return {
    ...propTypes,
    [specialProperty]: (props: { [key: string]: unknown }) => {
      const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(
          `The following props are not supported: ${unsupportedProps
            .map((prop) => `\`${prop}\``)
            .join(', ')}. Please remove them.`,
        );
      }
      return null;
    },
  };
}
