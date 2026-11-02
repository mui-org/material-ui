'use client';
import * as React from 'react';
import validateOptionValues, { validateOptionValue } from './validateOptionValues';

// The runtime helper handles all modes; public props enforce the narrower per-mode value types.
type OptionValue<Value, MappedValue> = Value | MappedValue | string;

interface UseOptionValueParameters<Value, MappedValue> {
  options: readonly Value[];
  getOptionValue?: ((option: Value) => MappedValue) | undefined;
  isOptionEqualToValue?:
    ((option: Value, value: OptionValue<Value, MappedValue>) => boolean) | undefined;
  freeSolo: boolean;
  multiple: boolean;
  value: OptionValue<Value, MappedValue> | readonly OptionValue<Value, MappedValue>[] | null;
}

const defaultGetOptionValue = <Value>(option: Value) => option;
const defaultResolveFromOptions = <Value>(option: Value) => ({ option });

/**
 * Maps and matches Autocomplete values using cached option lookups and custom equality when supplied.
 * Current options take precedence over retained selections created by `filterOptions`.
 *
 * Call `rememberSelectedOption` before resetting the input or publishing an option selection.
 * Retained options survive popup closure and are discarded once no longer selected.
 * Matches wrap the original option or free-solo string; unresolved mapped values return `null`.
 */
export default function useOptionValue<Value, MappedValue = never>({
  options,
  getOptionValue: getOptionValueProp,
  isOptionEqualToValue: isOptionEqualToValueProp,
  freeSolo,
  multiple,
  value,
}: UseOptionValueParameters<Value, MappedValue>) {
  const getOptionValue = getOptionValueProp ?? defaultGetOptionValue;
  const hasOptionValueMapping = getOptionValueProp !== undefined;
  const reportedErrorMessages = React.useMemo(() => new Set<string>(), []);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // Mapped values identify options and must therefore be valid, unique primitive keys.
      validateOptionValues({
        options,
        freeSolo,
        getOptionValueProp,
        duplicatedErrorMessages: reportedErrorMessages,
      });
    }, [options, freeSolo, getOptionValueProp, reportedErrorMessages]);
  }

  // Determines if an option is equal to a value, considering custom equality and free-solo scenarios.
  const isOptionEqualToValue = React.useCallback(
    (option: Value, value: OptionValue<Value, MappedValue>) => {
      // With value mapping, strings are reserved for free-solo values and cannot identify options.
      if (getOptionValueProp !== undefined && freeSolo && typeof value === 'string') {
        return false;
      }

      // Custom equality takes precedence over comparing the option's mapped value.
      if (isOptionEqualToValueProp) {
        return isOptionEqualToValueProp(option, value);
      }

      return getOptionValue(option) === value;
    },
    [freeSolo, getOptionValue, getOptionValueProp, isOptionEqualToValueProp],
  );

  // Creates a lookup map from option values to their corresponding options for efficient resolution.
  const optionValueMap = React.useMemo(() => {
    if (getOptionValueProp === undefined || isOptionEqualToValueProp) {
      return null;
    }

    return new Map<OptionValue<Value, MappedValue>, Value>(
      options.map((option) => [getOptionValueProp(option), option]),
    );
  }, [getOptionValueProp, isOptionEqualToValueProp, options]);

  // Wrap matches so null/undefined options remain distinct from lookup misses.
  const resolveFromOptions = React.useMemo<
    (value: OptionValue<Value, MappedValue>) => { option: OptionValue<Value, MappedValue> } | null
  >(() => {
    if (!hasOptionValueMapping) {
      // Without value mapping, selected values are already options.
      return defaultResolveFromOptions;
    }

    if (isOptionEqualToValueProp) {
      const resolvedOptions = new Map<OptionValue<Value, MappedValue>, { option: Value } | null>();
      // Custom equality defines matching behavior, so resolve the first matching option.
      return (value) => {
        if (freeSolo && typeof value === 'string') {
          // Strings always represent free-solo values when mapping is enabled.
          return { option: value };
        }

        // Cache misses as well as matches so unchanged selections do not rescan the options.
        if (!resolvedOptions.has(value)) {
          const index = options.findIndex((option) => isOptionEqualToValueProp(option, value));
          resolvedOptions.set(value, index === -1 ? null : { option: options[index] });
        }

        return resolvedOptions.get(value)!;
      };
    }

    // Default equality uses mapped values as keys, so resolve them through the lookup map.
    return (value) => {
      if (freeSolo && typeof value === 'string') {
        // Check before the map because a mapped string and free-solo text are indistinguishable.
        return { option: value };
      }

      return optionValueMap!.has(value) ? { option: optionValueMap!.get(value)! } : null;
    };
  }, [freeSolo, hasOptionValueMapping, isOptionEqualToValueProp, optionValueMap, options]);

  // Maintains a ref to selected options generated by filterOptions to ensure they persist across renders.
  const selectedGeneratedOptionsRef = React.useRef<Value[]>([]);
  const getOptionFromValue = React.useCallback(
    (value: OptionValue<Value, MappedValue>) => {
      const resolved = resolveFromOptions(value);
      if (resolved !== null) {
        return resolved;
      }

      // A selected option created by filterOptions must survive popup closure and later searches.
      // Keep this fallback outside the options cache so cached misses cannot hide new selections.
      const index = selectedGeneratedOptionsRef.current.findIndex((selectedOption) =>
        isOptionEqualToValue(selectedOption, value),
      );
      return index === -1 ? null : { option: selectedGeneratedOptionsRef.current[index] };
    },
    [resolveFromOptions, isOptionEqualToValue],
  );

  const selectedValues = React.useMemo<readonly OptionValue<Value, MappedValue>[]>(() => {
    // `multiple` distinguishes a list of selections from an option that is itself an array.
    if (multiple) {
      return value as readonly OptionValue<Value, MappedValue>[];
    }

    if (value != null) {
      return [value as OptionValue<Value, MappedValue>];
    }

    return [];
  }, [multiple, value]);
  // Default equality supports set lookups; custom equality must compare options and values.
  const selectedValuesSet = React.useMemo(() => {
    if (isOptionEqualToValueProp || selectedValues.length === 0) {
      return null;
    }

    return new Set(
      hasOptionValueMapping && freeSolo
        ? selectedValues.filter((selectedValue) => typeof selectedValue !== 'string')
        : selectedValues,
    );
  }, [freeSolo, hasOptionValueMapping, isOptionEqualToValueProp, selectedValues]);
  const isOptionSelected = React.useCallback(
    (option: Value) => {
      if (selectedValuesSet) {
        return selectedValuesSet.has(getOptionValue(option));
      }

      return selectedValues.some(
        (value2) => value2 != null && isOptionEqualToValue(option, value2),
      );
    },
    [getOptionValue, isOptionEqualToValue, selectedValues, selectedValuesSet],
  );

  // Cleans up selected generated options that are no longer valid after each render.
  React.useEffect(() => {
    // Also discard attempted selections rejected by a controlled value after the render commits.
    if (selectedGeneratedOptionsRef.current.length > 0) {
      selectedGeneratedOptionsRef.current = hasOptionValueMapping
        ? selectedGeneratedOptionsRef.current.filter(isOptionSelected)
        : [];
    }
  });

  // Remembers a selected option that was generated by filterOptions but not present in the current options.
  const rememberSelectedOption = React.useCallback(
    (option: Value, optionValue: OptionValue<Value, MappedValue>) => {
      if (process.env.NODE_ENV !== 'production') {
        if (hasOptionValueMapping) {
          // filterOptions can synthesize options that were not covered by options-prop validation.
          validateOptionValue(optionValue, freeSolo, reportedErrorMessages);
        }
      }

      if (!hasOptionValueMapping || resolveFromOptions(optionValue) !== null) {
        return;
      }

      selectedGeneratedOptionsRef.current = [
        ...selectedGeneratedOptionsRef.current.filter(
          (selectedOption) =>
            isOptionSelected(selectedOption) && !isOptionEqualToValue(selectedOption, optionValue),
        ),
        option,
      ];
    },
    [
      hasOptionValueMapping,
      resolveFromOptions,
      isOptionSelected,
      isOptionEqualToValue,
      freeSolo,
      reportedErrorMessages,
    ],
  );

  return {
    getOptionValue,
    isOptionEqualToValue,
    isOptionSelected,
    getOptionFromValue,
    rememberSelectedOption,
  };
}
