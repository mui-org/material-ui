import isHostComponent from './isHostComponent';

/**
 * Appends the styleProps object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node, `styleProps` are not applied.
 * @param existingProps Props of the element.
 * @param styleProps
 */
export default function appendStyleProps(
  elementType: React.ElementType,
  existingProps: Record<string, any>,
  styleProps: object,
) {
  if (isHostComponent(elementType)) {
    return existingProps;
  }

  return {
    ...existingProps,
    styleProps: { ...existingProps.styleProps, ...styleProps },
  };
}
