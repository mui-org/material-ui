import * as doctrine from 'doctrine';
import type { PropDescriptor, PropTypeDescriptor } from 'react-docgen';

export interface DescribeablePropDescriptor {
  annotation: doctrine.Annotation;
  defaultValue: string | null;
  required: boolean;
  type: PropTypeDescriptor;
}

export type CreateDescribeablePropSettings = {
  /**
   * Names of props that do not check if the annotations equal runtime default.
   */
  propsWithoutDefaultVerification?: string[];
};

/**
 * Returns `null` if the prop should be ignored.
 * Throws if it is invalid.
 * @param prop
 * @param propName
 */
export default function createDescribeableProp(
  prop: PropDescriptor,
  propName: string,
  settings: CreateDescribeablePropSettings = {},
): DescribeablePropDescriptor | null {
  const { defaultValue, description, required, type } = prop;
  const jsdocDefaultValue = (prop as any).jsdocDefaultValue as { value: string } | undefined;

  const { propsWithoutDefaultVerification = [] } = settings;

  const renderedDefaultValue = (defaultValue?.value as string | undefined)?.replace(/\r?\n/g, '');
  const renderDefaultValue = Boolean(
    renderedDefaultValue &&
    // Ignore "large" default values that would break the table layout.
    renderedDefaultValue.length <= 150,
  );

  if (description === undefined) {
    throw new Error(`The "${propName}" prop is missing a description.`);
  }

  const annotation = doctrine.parse(description, {
    sloppy: true,
  });

  if (
    annotation.description.trim() === '' ||
    annotation.tags.some((tag) => tag.title === 'ignore')
  ) {
    return null;
  }

  if (jsdocDefaultValue !== undefined && defaultValue === undefined) {
    // Assume that this prop:
    // 1. Is typed by another component
    // 2. Is forwarded to that component
    // Then validation is handled by the other component.
    // Though this does break down if the prop is used in other capacity in the implementation.
    // So let's hope we don't make this mistake too often.
  } else if (jsdocDefaultValue === undefined && defaultValue !== undefined && renderDefaultValue) {
    const shouldHaveDefaultAnnotation =
      // Discriminator for polymorphism which is not documented at the component level.
      // The documentation of `component` does not know in which component it is used.
      propName !== 'component';

    if (shouldHaveDefaultAnnotation) {
      throw new Error(
        `JSDoc @default annotation not found. Add \`@default ${defaultValue.value}\` to the JSDoc of this prop.`,
      );
    }
  } else if (
    jsdocDefaultValue !== undefined &&
    !propsWithoutDefaultVerification.includes(propName)
  ) {
    // `defaultValue` can't be undefined or we would've thrown earlier.
    if (jsdocDefaultValue.value !== defaultValue!.value) {
      throw new Error(
        `Expected JSDoc @default annotation for prop '${propName}' of "${jsdocDefaultValue.value}" to equal runtime default value of "${defaultValue?.value}"`,
      );
    }
  }

  return {
    annotation,
    defaultValue: renderDefaultValue ? renderedDefaultValue! : null,
    required: Boolean(required),
    type: type!,
  };
}
