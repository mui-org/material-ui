import * as doctrine from 'doctrine';
import type { PropDescriptor, PropTypeDescriptor } from 'react-docgen';
import { HIDDEN_JSDOC_TAGS, IGNORE_HINT } from '../buildApiUtils';

/**
 * Props shared by every component, never listed in the API docs when they have their usual type.
 * `null` hides the prop whatever its type.
 */
const HIDDEN_PROPS: Record<string, string | null> = {
  className: 'string',
  style: 'object',
  ref: null,
};

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
 * @param isExternal If `true`, the prop is only declared in dependencies.
 */
export default function createDescribeableProp(
  prop: PropDescriptor,
  propName: string,
  settings: CreateDescribeablePropSettings = {},
  isExternal = false,
): DescribeablePropDescriptor | null {
  const hiddenType = HIDDEN_PROPS[propName];
  if (hiddenType !== undefined && (hiddenType === null || prop.type?.name === hiddenType)) {
    return null;
  }

  const { defaultValue, description, required, type } = prop;
  const jsdocDefaultValue = (prop as any).jsdocDefaultValue as { value: string } | undefined;

  const { propsWithoutDefaultVerification = [] } = settings;

  const renderedDefaultValue = (defaultValue?.value as string | undefined)?.replace(/\r?\n/g, '');
  const renderDefaultValue = Boolean(
    renderedDefaultValue &&
    // Ignore "large" default values that would break the table layout.
    renderedDefaultValue.length <= 150,
  );

  const annotation = doctrine.parse(description ?? '', {
    sloppy: true,
  });

  if (annotation.tags.some((tag) => HIDDEN_JSDOC_TAGS.includes(tag.title))) {
    return null;
  }

  if (annotation.description.trim() === '') {
    // Props from dependencies are only listed when they have component-specific documentation.
    if (isExternal) {
      return null;
    }
    throw new Error(
      `The "${propName}" prop has no description. Add a JSDoc comment to \`${propName}\` in the component's TypeScript props, then run \`pnpm proptypes\`. ${IGNORE_HINT}`,
    );
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
