import type { PartiallyRequired } from '@mui/types';
import { expectType } from '@mui/types';
import type {
  FilterOptionsState,
  AutocompleteGroupedOption,
  UseAutocompleteProps,
  UseAutocompleteParameters,
  AutocompleteMappedValue,
} from '@mui/material/useAutocomplete';
import { useAutocomplete } from '@mui/material/useAutocomplete';

interface Person {
  id: string;
  name: string;
}

const persons: Person[] = [
  { id: '1', name: 'Chris' },
  { id: '2', name: 'Kim' },
  { id: '3', name: 'Ben' },
  { id: '4', name: 'Matt' },
];

interface MyMappedAutocompleteProps<
  Value,
  MappedValue extends AutocompleteMappedValue<FreeSolo>,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> extends UseAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, MappedValue> {
  myProp?: string;
  getOptionValue: (option: Value) => MappedValue;
}

function useMappedAutocomplete<
  Value,
  MappedValue extends AutocompleteMappedValue<FreeSolo>,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>(props: MyMappedAutocompleteProps<Value, MappedValue, Multiple, DisableClearable, FreeSolo>) {
  // Forward generic mapped props without spelling out the hook's type arguments.
  return useAutocomplete(props);
}

function Component() {
  // value type is inferred correctly when multiple is undefined
  useAutocomplete({
    options: ['1', '2', '3'],
    onChange(event, value) {
      expectType<string | null, typeof value>(value);
    },
  });

  // value type is inferred correctly when multiple is false
  useAutocomplete({
    options: ['1', '2', '3'],
    multiple: false,
    onChange(event, value) {
      expectType<string | null, typeof value>(value);
    },
  });

  // value type is inferred correctly for type unions
  useAutocomplete({
    options: ['1', '2', '3', 4, true],
    onChange(event, value) {
      expectType<string | number | boolean | null, typeof value>(value);
    },
  });

  // value type is inferred correctly for interface
  useAutocomplete({
    options: persons,
    onChange(event, value) {
      expectType<Person | null, typeof value>(value);
    },
  });

  // value type is inferred correctly when value is set
  useAutocomplete({
    options: ['1', '2', '3'],
    onChange(event, value) {
      expectType<string | null, typeof value>(value);
      value;
    },
    filterOptions(options, state) {
      expectType<FilterOptionsState<string>, typeof state>(state);
      expectType<string[], typeof options>(options);
      return options;
    },
    getOptionLabel(option) {
      expectType<string, typeof option>(option);
      return option;
    },
    value: null,
  });

  // Multiple selection mode

  // value type is inferred correctly for simple type
  useAutocomplete({
    options: ['1', '2', '3'],
    multiple: true,
    onChange(event, value) {
      expectType<string[], typeof value>(value);
      value;
    },
  });

  // value type is inferred correctly for union type
  useAutocomplete({
    options: ['1', '2', '3', 4, true],
    multiple: true,
    onChange(event, value) {
      expectType<Array<string | number | boolean>, typeof value>(value);
    },
  });

  // value type is inferred correctly for interface
  useAutocomplete({
    options: persons,
    multiple: true,
    onChange(event, value) {
      expectType<Person[], typeof value>(value);
      value;
    },
  });

  // no type inference conflict when value type is set explicitly
  useAutocomplete({
    options: persons,
    multiple: true,
    onChange(event, value: Person[]) {},
  });

  // options accepts const and value has correct type
  useAutocomplete({
    options: ['1', '2', '3'] as const,
    onChange(event, value) {
      expectType<'1' | '2' | '3' | null, typeof value>(value);
    },
  });

  // Disable clearable

  useAutocomplete({
    options: ['1', '2', '3'],
    disableClearable: true,
    onChange(event, value) {
      expectType<string, typeof value>(value);
    },
  });

  useAutocomplete({
    options: ['1', '2', '3'],
    disableClearable: false,
    onChange(event, value) {
      expectType<string | null, typeof value>(value);
    },
  });

  useAutocomplete({
    options: ['1', '2', '3'],
    onChange(event, value) {
      expectType<string | null, typeof value>(value);
    },
  });

  // Free solo
  useAutocomplete({
    options: persons,
    onChange(event, value) {
      expectType<string | Person | null, typeof value>(value);
    },
    freeSolo: true,
  });

  useAutocomplete({
    options: persons,
    disableClearable: true,
    onChange(event, value) {
      expectType<string | Person, typeof value>(value);
    },
    freeSolo: true,
  });

  useAutocomplete({
    options: persons,
    multiple: true,
    onChange(event, value) {
      expectType<Array<string | Person>, typeof value>(value);
    },
    freeSolo: true,
  });

  useAutocomplete({
    options: persons,
    getOptionLabel(option) {
      expectType<string | Person, typeof option>(option);
      return '';
    },
    freeSolo: true,
  });

  useAutocomplete({
    options: persons,
    getOptionKey(option) {
      expectType<string | Person, typeof option>(option);
      return '';
    },
    freeSolo: true,
  });

  // getOptionValue separates the option type from the selected value type
  const mappedAutocomplete = useAutocomplete({
    options: persons,
    getOptionValue(option) {
      expectType<Person, typeof option>(option);
      return option.id;
    },
    getOptionLabel(option) {
      expectType<Person, typeof option>(option);
      return option.name;
    },
    getOptionDisabled(option) {
      expectType<Person, typeof option>(option);
      return false;
    },
    getOptionKey(option) {
      expectType<Person, typeof option>(option);
      return option.id;
    },
    filterOptions(items, state) {
      expectType<Person[], typeof items>(items);
      expectType<(option: Person) => string, typeof state.getOptionLabel>(state.getOptionLabel);
      return items;
    },
    isOptionEqualToValue(option, value) {
      expectType<Person, typeof option>(option);
      expectType<string, typeof value>(value);
      return option.id === value;
    },
    onChange(event, value, reason, details) {
      expectType<string | null, typeof value>(value);
      if (details) {
        expectType<Person, typeof details.option>(details.option);
      }
    },
    onHighlightChange(event, option) {
      expectType<Person | null, typeof option>(option);
    },
    value: persons[0].id,
  });
  expectType<string | null, typeof mappedAutocomplete.value>(mappedAutocomplete.value);
  const mappedOption = mappedAutocomplete.getOptionFromValue(persons[0].id);
  expectType<{ option: Person } | null, typeof mappedOption>(mappedOption);
  // A successful lookup can still contain a nullable option.
  const nullableAutocomplete = useAutocomplete({
    options: [...persons, null, undefined],
    getOptionValue: (option) => {
      if (option === null) {
        return 'any';
      }
      return option === undefined ? 'unset' : option.id;
    },
  });
  const nullableOption = nullableAutocomplete.getOptionFromValue('any');
  if (nullableOption !== null) {
    expectType<Person | null | undefined, typeof nullableOption.option>(nullableOption.option);
  }
  expectType<Person[], typeof mappedAutocomplete.groupedOptions>(mappedAutocomplete.groupedOptions);
  // Rendering still takes an option, even though selection and resolution use its ID.
  mappedAutocomplete.getOptionProps({ option: persons[0], index: 0 });
  // @ts-expect-error A rendered option must not be replaced with its mapped ID.
  mappedAutocomplete.getOptionProps({ option: persons[0].id, index: 0 });

  const mappedGroupedAutocomplete = useAutocomplete({
    options: persons,
    getOptionValue: (option) => option.id,
    groupBy: (option) => option.name[0],
  });
  expectType<string | null, typeof mappedGroupedAutocomplete.value>(
    mappedGroupedAutocomplete.value,
  );
  expectType<AutocompleteGroupedOption<Person>[], typeof mappedGroupedAutocomplete.groupedOptions>(
    mappedGroupedAutocomplete.groupedOptions,
  );

  // mapped multiple values use the getOptionValue return type
  useAutocomplete({
    options: persons,
    getOptionValue: (option) => Number(option.id),
    multiple: true,
    defaultValue: [1, 2],
    onChange(event, value) {
      expectType<number[], typeof value>(value);
    },
  });

  // disableClearable removes null from a mapped single value
  useAutocomplete({
    options: persons,
    getOptionValue: (option) => Number(option.id),
    disableClearable: true,
    onChange(event, value) {
      expectType<number, typeof value>(value);
    },
  });

  // freeSolo adds strings to a non-string mapped value
  const freeSoloMappedAutocomplete = useAutocomplete({
    options: persons,
    getOptionValue: (option) => Number(option.id),
    freeSolo: true,
    onChange(event, value) {
      expectType<string | number | null, typeof value>(value);
    },
    isOptionEqualToValue(option, value) {
      expectType<Person, typeof option>(option);
      expectType<string | number, typeof value>(value);
      return typeof value === 'number' && Number(option.id) === value;
    },
  });
  const freeSoloOption = freeSoloMappedAutocomplete.getOptionFromValue('custom');
  expectType<{ option: Person | string } | null, typeof freeSoloOption>(freeSoloOption);
  // @ts-expect-error The resolver accepts mapped IDs or free-solo text, not options.
  freeSoloMappedAutocomplete.getOptionFromValue(persons[0]);

  // A runtime boolean can enable freeSolo, so string IDs are unsafe even before it becomes true.
  const dynamicFreeSolo = Math.random() > 0.5;
  const dynamicMappedAutocomplete = useAutocomplete({
    options: persons,
    freeSolo: dynamicFreeSolo,
    getOptionValue: (option) => Number(option.id),
  });
  expectType<number | string | null, typeof dynamicMappedAutocomplete.value>(
    dynamicMappedAutocomplete.value,
  );
  const dynamicStringMapping = {
    options: persons,
    freeSolo: dynamicFreeSolo,
    getOptionValue: (option: Person) => option.id,
  };
  // @ts-expect-error String IDs are invalid when freeSolo might be true.
  useAutocomplete(dynamicStringMapping);

  // Boolean IDs retain their own type rather than widening to all primitive IDs.
  const booleanMappedAutocomplete = useAutocomplete({
    options: persons.slice(0, 2),
    getOptionValue: (option) => option.id === '1',
  });
  expectType<boolean | null, typeof booleanMappedAutocomplete.value>(
    booleanMappedAutocomplete.value,
  );
  useAutocomplete({
    options: persons,
    // @ts-expect-error bigint IDs are not supported.
    getOptionValue: (option) => BigInt(option.id),
  });

  useAutocomplete({
    options: persons,
    // @ts-expect-error String option values are indistinguishable from freeSolo values.
    getOptionValue: (option) => option.id,
    freeSolo: true,
  });

  // Existing explicit generic arguments retain their meaning and raw-option value type
  const existingProps: UseAutocompleteProps<Person, false, false, false> = {
    options: persons,
    value: persons[0],
  };
  expectType<Person | null | undefined, typeof existingProps.value>(existingProps.value);

  const rawAutocomplete = useAutocomplete({ ...existingProps, getOptionValue: undefined });
  expectType<Person | null, typeof rawAutocomplete.value>(rawAutocomplete.value);

  const inferredFromRawValue = useAutocomplete({ options: [], value: persons[0] });
  expectType<Person | null, typeof inferredFromRawValue.value>(inferredFromRawValue.value);

  useAutocomplete<Person, true>({
    options: persons,
    multiple: true,
    onChange(event, value) {
      expectType<Person[], typeof value>(value);
    },
  });

  // Mapped props require a mapper and can be forwarded by wrappers.
  const mappedProps: PartiallyRequired<
    UseAutocompleteProps<Person, false, false, false, string>,
    'getOptionValue'
  > = {
    options: persons,
    getOptionValue: (option) => option.id,
    value: persons[0].id,
  };
  expectType<string | null | undefined, typeof mappedProps.value>(mappedProps.value);

  const wrappedAutocomplete = useMappedAutocomplete(mappedProps);
  expectType<string | null, typeof wrappedAutocomplete.value>(wrappedAutocomplete.value);

  const forwardedAutocomplete = useAutocomplete(mappedProps);
  expectType<string | null, typeof forwardedAutocomplete.value>(forwardedAutocomplete.value);
  expectType<Person[], typeof forwardedAutocomplete.groupedOptions>(
    forwardedAutocomplete.groupedOptions,
  );

  const forwardedGroupedAutocomplete = useAutocomplete({
    ...mappedProps,
    groupBy: (option) => option.name[0],
  });
  expectType<string | null, typeof forwardedGroupedAutocomplete.value>(
    forwardedGroupedAutocomplete.value,
  );
  expectType<
    AutocompleteGroupedOption<Person>[],
    typeof forwardedGroupedAutocomplete.groupedOptions
  >(forwardedGroupedAutocomplete.groupedOptions);

  const multipleFreeSoloProps: PartiallyRequired<
    UseAutocompleteProps<Person, true, false, true, number>,
    'getOptionValue'
  > = {
    options: persons,
    multiple: true,
    freeSolo: true,
    getOptionValue: (option) => Number(option.id),
    defaultValue: [1, 'custom'],
  };
  const multipleFreeSoloAutocomplete = useAutocomplete(multipleFreeSoloProps);
  expectType<Array<number | string>, typeof multipleFreeSoloAutocomplete.value>(
    multipleFreeSoloAutocomplete.value,
  );
  // Forwarding must also preserve inferred selection flags through generic wrappers.
  const wrappedFreeSoloAutocomplete = useMappedAutocomplete(multipleFreeSoloProps);
  expectType<Array<number | string>, typeof wrappedFreeSoloAutocomplete.value>(
    wrappedFreeSoloAutocomplete.value,
  );

  const missingMapperProps: UseAutocompleteProps<Person, false, false, false, string> = {
    options: persons,
  };
  // @ts-expect-error Mapped calls must include getOptionValue.
  useAutocomplete(missingMapperProps);
  // @ts-expect-error An undefined mapper must not enable mapped selections.
  useAutocomplete({ ...mappedProps, getOptionValue: undefined });

  const stringFreeSoloProps: PartiallyRequired<
    UseAutocompleteProps<Person, false, false, true, string>,
    'getOptionValue'
  > = {
    options: persons,
    getOptionValue: (option) => option.id,
  };
  // @ts-expect-error String mappings are incompatible with freeSolo.
  useAutocomplete(stringFreeSoloProps);

  const rawParameters: UseAutocompleteParameters<Person, false, false, false> = {
    options: persons,
    value: persons[0],
  };
  const rawParametersAutocomplete = useAutocomplete(rawParameters);
  expectType<Person | null, typeof rawParametersAutocomplete.value>(
    rawParametersAutocomplete.value,
  );

  // @ts-expect-error Explicit mapped type arguments must include getOptionValue.
  useAutocomplete<Person, false, false, false, string>({ options: persons });

  // `value` alone must not opt an object-option Autocomplete into mapped-value mode
  // @ts-expect-error Without getOptionValue, value must have the same type as an option.
  useAutocomplete({ options: persons, value: persons[0].id });

  useAutocomplete({
    options: persons,
    // @ts-expect-error getOptionValue must return a primitive value.
    getOptionValue: (option) => ({ id: option.id }),
  });

  useAutocomplete<Person, false, false, false, string>({
    options: persons,
    getOptionValue: (option) => option.id,
    // @ts-expect-error value must match the getOptionValue return type.
    value: 1,
  });

  // Selected values must not widen the type inferred from getOptionValue.
  const literalMappedProps = {
    options: [{ id: 'foo' as const }],
    getOptionValue: (option: { id: 'foo' }) => option.id,
  };
  // @ts-expect-error value must match the inferred getOptionValue return type.
  useAutocomplete({ ...literalMappedProps, value: 'bar' });
  // @ts-expect-error defaultValue must match the inferred getOptionValue return type.
  useAutocomplete({ ...literalMappedProps, defaultValue: 'bar' });

  useAutocomplete({
    ...literalMappedProps,
    value: 'foo',
    defaultValue: 'foo',
    onChange(event, value) {
      expectType<'foo' | null, typeof value>(value);
    },
  });

  const ungroupedAutocomplete = useAutocomplete({ options: persons });
  expectType<Person[], typeof ungroupedAutocomplete.groupedOptions>(
    ungroupedAutocomplete.groupedOptions,
  );

  const groupedAutocomplete = useAutocomplete({
    options: persons,
    groupBy: ({ id }) => id,
  });
  expectType<AutocompleteGroupedOption<Person>[], typeof groupedAutocomplete.groupedOptions>(
    groupedAutocomplete.groupedOptions,
  );
}
