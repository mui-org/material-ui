import type { PaletteColorOptions, SimplePaletteColorOptions } from '../styles/createPalette';

/**
 * Type guard to check if the object has a "main" property of type string.
 *
 * @param obj - the object to check
 * @returns boolean
 */
function hasCorrectMainProperty(obj: PaletteColorOptions): obj is SimplePaletteColorOptions {
  return typeof (obj as SimplePaletteColorOptions).main === 'string';
}

type AdditionalPropertiesToCheck = (keyof Omit<SimplePaletteColorOptions, 'main'>)[];

/**
 * Checks if the object conforms to the SimplePaletteColorOptions type.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param obj - The object to check
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns boolean
 */
function checkSimplePaletteColorValues(
  obj: PaletteColorOptions,
  additionalPropertiesToCheck: AdditionalPropertiesToCheck = [],
): boolean {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }

  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== 'string') {
      return false;
    }
  }

  return true;
}

/**
 * Creates a filter function used to filter simple palette color options.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns ([, value]: [any, PaletteColorOptions]) => boolean
 */
export default function createSimplePaletteValueFilter(
  additionalPropertiesToCheck: AdditionalPropertiesToCheck = [],
) {
  return ([, value]: [any, PaletteColorOptions]) =>
    value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}
