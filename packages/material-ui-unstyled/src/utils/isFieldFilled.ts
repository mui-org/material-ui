function hasValue(value: any) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determines if a field is filled or empty.
//
// @param obj - object to look for `value` in
// @param SSR - if true, checks the `defaultValue` in addition to `value`
// @returns {boolean} False when value not present or empty string.
//                    True when any number or non-empty string.
export default function isFieldFilled(obj: any, SSR = false) {
  return Boolean(
    obj &&
      ((hasValue(obj.value) && obj.value !== '') ||
        (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== '')),
  );
}
