import capitalize from '@mui/utils/capitalize';

function isEmpty(string: string) {
  return string.length === 0;
}

/**
 * Generates string classKey based on the properties provided. It starts with the
 * variant if defined, and then it appends all other properties in alphabetical order.
 * @param props - the properties for which the classKey should be created.
 */
export default function propsToClassKey(props: object): string {
  const { variant, ...other } = props as Record<string, any>;

  let classKey: string = variant || '';

  Object.keys(other)
    .sort()
    .forEach((key) => {
      if (key === 'color') {
        classKey += isEmpty(classKey)
          ? (props as Record<string, any>)[key]
          : capitalize((props as Record<string, any>)[key]);
      } else {
        classKey += `${isEmpty(classKey) ? key : capitalize(key)}${capitalize(
          (props as Record<string, any>)[key].toString(),
        )}`;
      }
    });

  return classKey;
}
