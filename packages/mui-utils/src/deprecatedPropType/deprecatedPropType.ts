import type { Validator } from 'prop-types';

export default function deprecatedPropType<T>(
  validator: Validator<T>,
  reason: string,
): Validator<T> {
  if (process.env.NODE_ENV === 'production') {
    return () => null;
  }

  return (
    props: Record<string, any>,
    propName: string,
    componentName?: string,
    location?: string,
    propFullName?: string,
  ) => {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (typeof props[propName] !== 'undefined') {
      return new Error(
        `The ${location} \`${propFullNameSafe}\` of ` +
          `\`${componentNameSafe}\` is deprecated. ${reason}`,
      );
    }

    return null;
  };
}
