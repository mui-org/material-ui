type OptionValueTypeValidationParams<Option> = {
  options: readonly Option[];
  freeSolo: boolean;
  // Invalid mapper results must reach this validator, so its return type is deliberately unknown.
  getOptionValueProp: ((option: Option) => unknown) | undefined;
  duplicatedErrorMessages: Set<string>;
};

/**
 * Validates the option values returned by the `getOptionValue` method of `useAutocomplete`.
 * Ensures that each option has a unique and valid value, and reports errors for duplicates or invalid types.
 */
export default function validateOptionValues<Option>({
  options,
  freeSolo,
  getOptionValueProp,
  duplicatedErrorMessages,
}: OptionValueTypeValidationParams<Option>) {
  if (!getOptionValueProp) {
    return;
  }

  const seenOptionValues = new Set();

  for (const option of options) {
    const value = getOptionValueProp(option);

    validateOptionValue(value, freeSolo, duplicatedErrorMessages);

    if (freeSolo && typeof value === 'string') {
      continue;
    }

    if (seenOptionValues.has(value)) {
      tryShowErrorMessage(
        `MUI: The \`getOptionValue\` method of useAutocomplete returned the duplicate value ${getOptionValueDescription(
          value,
        )} for multiple options.\n` +
          `useAutocomplete uses these values to identify options. ` +
          'Change `getOptionValue` or the options so that every option has a unique value.',
        duplicatedErrorMessages,
      );
    }

    seenOptionValues.add(value);
  }
}

export function validateOptionValue(
  value: unknown,
  freeSolo: boolean,
  duplicatedErrorMessages: Set<string>,
) {
  if (freeSolo && typeof value === 'string') {
    tryShowErrorMessage(
      `MUI: The \`getOptionValue\` method of useAutocomplete returned the string value ${getOptionValueDescription(
        value,
      )} while \`freeSolo\` is enabled.\n` +
        `useAutocomplete cannot distinguish string option values from free-solo values. ` +
        'Return a number or boolean from `getOptionValue`, or disable `freeSolo`.',
      duplicatedErrorMessages,
    );
    return;
  }

  // Only primitive keys can safely identify options in comparisons and lookup maps.
  if (!isValidOptionValue(value)) {
    const invalidValue =
      value === null || Number.isNaN(value)
        ? getOptionValueDescription(value)
        : `a value of type ${typeof value}`;

    tryShowErrorMessage(
      `MUI: The \`getOptionValue\` method of useAutocomplete returned ${invalidValue}, which is not a valid option value.\n` +
        `useAutocomplete uses this value to identify and match options. ` +
        'Return a unique string, number, or boolean for every option.',
      duplicatedErrorMessages,
    );
  }
}

function isValidOptionValue(value: unknown) {
  const valueType = typeof value;
  return (
    (valueType === 'string' || valueType === 'number' || valueType === 'boolean') &&
    !Number.isNaN(value)
  );
}

function getOptionValueDescription(value: unknown) {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  return String(value);
}

function tryShowErrorMessage(message: string, duplicatedErrorMessages: Set<string>) {
  if (duplicatedErrorMessages.has(message)) {
    return;
  }

  console.error(message);
  duplicatedErrorMessages.add(message);
}
