import * as React from 'react';
import type { PartiallyRequired } from '@mui/types';
import { expectType } from '@mui/types';
import type {
  AutocompleteOwnerState,
  AutocompleteProps,
  AutocompleteChangeReason,
  AutocompleteRenderGetTagProps,
  AutocompleteRenderValue,
  AutocompleteRenderValueGetItemProps,
  AutocompleteMappedValue,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { ChipTypeMap } from '@mui/material/Chip';
import { createTheme, styled } from '@mui/material/styles';
import type { AutocompleteValueOrFreeSoloValueMapping } from '../useAutocomplete';

interface MyAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> {
  myProp?: string;
}

function MyAutocomplete<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(props: MyAutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>) {
  return <Autocomplete {...props} />;
}

// Test for ChipComponent generic type
<MyAutocomplete<string, false, false, false, 'span'>
  options={['1', '2', '3']}
  renderValue={(value, getItemProps, ownerState) => {
    expectType<AutocompleteOwnerState<string, false, false, false, 'span'>, typeof ownerState>(
      ownerState,
    );

    return '';
  }}
  renderInput={() => null}
/>;

// multiple prop can be assigned for components that extend AutocompleteProps
<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    expectType<string[], typeof value>(value);
  }}
  renderInput={() => null}
  multiple
/>;

<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    expectType<string | null, typeof value>(value);
  }}
  renderInput={() => null}
/>;

// Tests presence of sx prop in ListboxProps
<Autocomplete
  options={['1', '2', '3']}
  slotProps={{ listbox: { sx: { height: '10px' } } }}
  renderInput={() => null}
/>;

// Tests presence of onMouseDown prop in InputProps
<Autocomplete
  options={['1', '2', '3']}
  renderInput={(params) => {
    expectType<React.MouseEventHandler, typeof params.slotProps.input.onMouseDown>(
      params.slotProps.input.onMouseDown,
    );
    return <TextField {...params} />;
  }}
/>;

<MyAutocomplete
  options={['1', '2', '3']}
  onChange={(event, value) => {
    expectType<string, typeof value>(value);
  }}
  renderInput={() => null}
  disableClearable
/>;

<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  onChange={(event, value) => {
    expectType<string | { label: string } | null, typeof value>(value);
  }}
  renderInput={() => null}
  freeSolo
/>;

// Test for getInputProps return type
<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={(params) => <TextField {...params} value={params.slotProps.htmlInput.value} />}
/>;

// Test for focusVisible class
<Autocomplete
  classes={{ focusVisible: 'test' }}
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={(params) => <TextField {...params} />}
/>;

interface Option {
  label: string;
  value: string;
}
const options: Option[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];

// Theme defaults support both raw options and mapped values.
createTheme({
  components: {
    MuiAutocomplete: {
      defaultProps: {
        options,
        getOptionLabel: (option: Option) => option.label,
        renderOption: (props, option, state, ownerState) => {
          expectType<React.HTMLAttributes<HTMLLIElement> & { key: React.Key }, typeof props>(props);
          expectType<AutocompleteRenderOptionState, typeof state>(state);
          expectType<boolean, typeof ownerState.fullWidth>(ownerState.fullWidth);
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {ownerState.getOptionLabel(option)}
            </li>
          );
        },
        renderValue: (value, getItemProps, ownerState) => {
          expectType<boolean, typeof ownerState.fullWidth>(ownerState.fullWidth);
          return <span {...getItemProps({ index: 0 })}>{ownerState.getOptionLabel(value)}</span>;
        },
      },
    },
  },
});

createTheme({
  components: {
    MuiAutocomplete: {
      defaultProps: {
        getOptionValue: (option: Option) => option.value,
      },
    },
  },
});

createTheme({
  components: {
    MuiAutocomplete: {
      defaultProps: {
        freeSolo: true,
        getOptionValue: (option: Option) => Number(option.value),
      },
    },
  },
});

const mappedProps: PartiallyRequired<
  AutocompleteProps<Option, false, false, false, ChipTypeMap['defaultComponent'], string>,
  'getOptionValue'
> = {
  options,
  getOptionValue: (option) => option.value,
  value: '1',
  renderInput: () => null,
};
expectType<string | null | undefined, typeof mappedProps.value>(mappedProps.value);

function MappedAutocomplete(props: typeof mappedProps) {
  return (
    <Autocomplete
      {...props}
      onChange={(event, value) => {
        expectType<string | null, typeof value>(value);
      }}
      renderValue={(value) => {
        expectType<string, typeof value>(value);
        return value;
      }}
    />
  );
}

<MappedAutocomplete {...mappedProps} />;

// Preserve the documented casts for wrappers of generic components.
const StyledAutocomplete = styled(Autocomplete)({}) as typeof Autocomplete;
const MemoAutocomplete = React.memo(Autocomplete) as typeof Autocomplete;

for (const WrappedAutocomplete of [StyledAutocomplete, MemoAutocomplete]) {
  <WrappedAutocomplete
    options={options}
    value={options[0]}
    onChange={(event, value) => {
      expectType<Option | null, typeof value>(value);
    }}
    renderInput={() => null}
  />;

  <WrappedAutocomplete
    {...mappedProps}
    onChange={(event, value) => {
      expectType<string | null, typeof value>(value);
    }}
  />;

  <WrappedAutocomplete
    options={options}
    multiple
    getOptionValue={(option) => Number(option.value)}
    value={[1]}
    onChange={(event, value) => {
      expectType<number[], typeof value>(value);
    }}
    renderInput={() => null}
  />;

  // @ts-expect-error A cast wrapper must still reject mismatched mapped values.
  <WrappedAutocomplete {...mappedProps} value={1} />;
}

// Specializing before wrapping fixes the generic defaults, so provide the mapped type too.
const TypedMappedAutocomplete = styled(
  Autocomplete<Option, false, false, false, ChipTypeMap['defaultComponent'], string>,
)({});
<TypedMappedAutocomplete
  {...mappedProps}
  onChange={(event, value) => {
    expectType<string | null, typeof value>(value);
  }}
/>;

// Uncast wrappers erase generics, but must still accept both raw and mapped props.
const UncastStyledAutocomplete = styled(Autocomplete)({});
const UncastMemoAutocomplete = React.memo(Autocomplete);
const rawWrapperProps = { options, value: options[0], renderInput: () => null };

for (const WrappedAutocomplete of [UncastStyledAutocomplete, UncastMemoAutocomplete]) {
  <WrappedAutocomplete {...rawWrapperProps} />;
}
React.createElement(Autocomplete, rawWrapperProps);

// Erased props, such as Storybook args, must spread back into Autocomplete.
function ErasedPropsAutocomplete(props: React.ComponentProps<typeof Autocomplete>) {
  return <Autocomplete {...props} />;
}
<ErasedPropsAutocomplete {...rawWrapperProps} />;

// Contextual callback types must survive wrapping in both prop modes.
for (const wrapperProps of [
  rawWrapperProps,
  { ...rawWrapperProps, getOptionValue: () => 1, value: 1 },
]) {
  for (const WrappedAutocomplete of [UncastStyledAutocomplete, UncastMemoAutocomplete]) {
    <WrappedAutocomplete
      {...wrapperProps}
      onChange={(event, value, reason) => {
        expectType<React.SyntheticEvent, typeof event>(event);
        expectType<unknown, typeof value>(value);
        expectType<AutocompleteChangeReason, typeof reason>(reason);
      }}
      renderValue={(value, getItemProps, ownerState) => {
        expectType<
          AutocompleteRenderValue<unknown, boolean | undefined, boolean | undefined>,
          typeof value
        >(value);
        expectType<AutocompleteRenderValueGetItemProps<boolean | undefined>, typeof getItemProps>(
          getItemProps,
        );
        expectType<boolean, typeof ownerState.focused>(ownerState.focused);
        return null;
      }}
      renderOption={(props, option, state, ownerState) => {
        expectType<React.HTMLAttributes<HTMLLIElement> & { key: React.Key }, typeof props>(props);
        expectType<unknown, typeof option>(option);
        expectType<AutocompleteRenderOptionState, typeof state>(state);
        expectType<boolean, typeof ownerState.focused>(ownerState.focused);
        // Erasing generics must not turn a valid mapper's return type into never.
        const id = ownerState.getOptionValue?.(option);
        expectType<AutocompleteMappedValue | undefined, typeof id>(id);
        return null;
      }}
      slotProps={{
        listbox: (ownerState) => {
          expectType<boolean, typeof ownerState.focused>(ownerState.focused);
          return {};
        },
      }}
    />;
  }

  React.createElement(Autocomplete, {
    ...wrapperProps,
    onChange: (event, value, reason) => {
      expectType<React.SyntheticEvent, typeof event>(event);
      expectType<unknown, typeof value>(value);
      expectType<AutocompleteChangeReason, typeof reason>(reason);
    },
    renderValue: (value, getItemProps, ownerState) => {
      expectType<
        AutocompleteRenderValue<unknown, boolean | undefined, boolean | undefined>,
        typeof value
      >(value);
      expectType<AutocompleteRenderValueGetItemProps<boolean | undefined>, typeof getItemProps>(
        getItemProps,
      );
      expectType<boolean, typeof ownerState.focused>(ownerState.focused);
      return null;
    },
  });
}

// Uncast wrappers accept a mapper returning a union of supported primitive IDs.
for (const value of ['1', 1, true]) {
  const mappedWrapperProps = {
    options,
    getOptionValue: () => value,
    value,
    renderInput: () => null,
  };

  for (const WrappedAutocomplete of [UncastStyledAutocomplete, UncastMemoAutocomplete]) {
    <WrappedAutocomplete {...mappedWrapperProps} />;
    <WrappedAutocomplete {...mappedWrapperProps} multiple value={[value]} />;
  }
  React.createElement(Autocomplete, mappedWrapperProps);
  React.createElement(Autocomplete, { ...mappedWrapperProps, multiple: true, value: [value] });
}

const freeSoloWrapperProps = {
  options,
  freeSolo: true as const,
  getOptionValue: (option: unknown) => Number(option),
  value: 'custom',
  renderInput: () => null,
};
for (const WrappedAutocomplete of [UncastStyledAutocomplete, UncastMemoAutocomplete]) {
  <WrappedAutocomplete {...freeSoloWrapperProps} />;

  // @ts-expect-error Uncast wrappers must still reject string mappings with freeSolo.
  <WrappedAutocomplete {...freeSoloWrapperProps} getOptionValue={() => '1'} />;
}
React.createElement(Autocomplete, freeSoloWrapperProps);
// @ts-expect-error createElement must still reject string mappings with freeSolo.
React.createElement(Autocomplete, { ...freeSoloWrapperProps, getOptionValue: () => '1' });

interface MyMappedAutocompleteProps<
  Value,
  MappedValue extends AutocompleteMappedValue<false>,
> extends AutocompleteProps<
  Value,
  false,
  false,
  false,
  ChipTypeMap['defaultComponent'],
  MappedValue
> {
  myProp?: string;
  getOptionValue: (option: Value) => MappedValue;
}

function GenericMappedAutocomplete<Value, MappedValue extends AutocompleteMappedValue<false>>(
  props: MyMappedAutocompleteProps<Value, MappedValue>,
) {
  return <Autocomplete {...props} />;
}

<GenericMappedAutocomplete {...mappedProps} />;

// The shared interface allows optional props; mapped calls must provide a mapper.
const missingMapperProps: AutocompleteProps<
  Option,
  false,
  false,
  false,
  ChipTypeMap['defaultComponent'],
  string
> = {
  options,
  renderInput: () => null,
};
// @ts-expect-error Mapped calls must include getOptionValue.
<Autocomplete {...missingMapperProps} />;
// @ts-expect-error An undefined mapper must not enable mapped selections.
<Autocomplete {...mappedProps} getOptionValue={undefined} />;

const stringFreeSoloProps: PartiallyRequired<
  AutocompleteProps<Option, false, false, true, ChipTypeMap['defaultComponent'], string>,
  'getOptionValue'
> = {
  options,
  getOptionValue: (option) => option.value,
  renderInput: () => null,
};
// @ts-expect-error String mappings are incompatible with freeSolo.
<Autocomplete {...stringFreeSoloProps} />;

// @ts-expect-error Explicit mapped type arguments must include getOptionValue.
<Autocomplete<Option, false, false, false, ChipTypeMap['defaultComponent'], string>
  options={options}
  renderInput={() => null}
/>;

// Raw values still infer the option type before options have loaded.
<Autocomplete
  options={[]}
  value={options[0]}
  onChange={(event, value) => {
    expectType<Option | null, typeof value>(value);
  }}
  renderInput={() => null}
/>;

const defaultOptions = [options[0], options[1]];
<MyAutocomplete
  multiple
  options={options}
  defaultValue={defaultOptions}
  isOptionEqualToValue={(o, v) => o.label === v.label}
  getOptionLabel={(o) => o.label}
  renderInput={() => null}
/>;

interface Tag {
  color: string;
  label: string;
}
type TagComponentProps = Tag & React.HTMLAttributes<HTMLDivElement>;
function TagComponent({ color, label, ...other }: TagComponentProps) {
  return <div {...other}>{label}</div>;
}

function renderTags(value: Tag[], getTagProps: AutocompleteRenderGetTagProps) {
  return value.map((tag: Tag, index) => {
    const { key, onDelete, ...tagProps } = getTagProps({ index });

    return <TagComponent key={key} {...tagProps} {...tag} />;
  });
}

function AutocompleteComponentsProps() {
  return (
    <Autocomplete
      options={['one', 'two', 'three']}
      renderInput={(params) => <TextField {...params} />}
      slotProps={{
        clearIndicator: { size: 'large' },
        paper: { elevation: 2 },
        popper: { placement: 'bottom-end' },
        popupIndicator: { size: 'large' },
        status: { 'aria-label': 'current autocomplete message' },
      }}
    />
  );
}

function CustomListboxRef() {
  const ref = React.useRef(null);
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} />}
      options={['one', 'two', 'three']}
      slotProps={{ listbox: { ref } }}
    />
  );
}

function CustomStatusSlot() {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Autocomplete
      renderInput={(params) => <TextField {...params} />}
      options={['one', 'two', 'three']}
      slots={{ status: 'div' }}
      slotProps={{ status: { ref } }}
    />
  );
}

// Tests presence of defaultMuiPrevented in event
<Autocomplete
  renderInput={(params) => <TextField {...params} />}
  options={['one', 'two', 'three']}
  onKeyDown={(event) => {
    expectType<
      React.KeyboardEvent<HTMLDivElement> & {
        defaultMuiPrevented?: boolean;
      },
      typeof event
    >(event);
  }}
/>;

// freeSolo prop adds string to the getOptionLabel and isOptionEqualToValue value argument type
<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={() => null}
  freeSolo
  getOptionLabel={(option) => {
    expectType<AutocompleteValueOrFreeSoloValueMapping<{ label: string }, true>, typeof option>(
      option,
    );

    return typeof option === 'string' ? option : option.label;
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<AutocompleteValueOrFreeSoloValueMapping<{ label: string }, true>, typeof value>(
      value,
    );
    expectType<{ label: string }, typeof option>(option);

    return typeof value === 'string' ? option.label === value : option.label === value.label;
  }}
/>;

// getOptionValue separates option-facing callbacks from the selected value
<Autocomplete
  options={options}
  getOptionValue={(option) => {
    expectType<Option, typeof option>(option);
    return option.value;
  }}
  getOptionLabel={(option) => {
    expectType<Option, typeof option>(option);
    return option.label;
  }}
  getOptionDisabled={(option) => {
    expectType<Option, typeof option>(option);
    return false;
  }}
  getOptionKey={(option) => {
    expectType<Option, typeof option>(option);
    return option.value;
  }}
  filterOptions={(items, state) => {
    expectType<Option[], typeof items>(items);
    expectType<(option: Option) => string, typeof state.getOptionLabel>(state.getOptionLabel);
    return items;
  }}
  groupBy={(option) => {
    expectType<Option, typeof option>(option);
    return option.label;
  }}
  value="1"
  onChange={(event, value, reason, details) => {
    expectType<string | null, typeof value>(value);
    if (details) {
      expectType<Option, typeof details.option>(details.option);
    }
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<Option, typeof option>(option);
    expectType<string, typeof value>(value);
    return option.value === value;
  }}
  onHighlightChange={(event, option) => {
    expectType<Option | null, typeof option>(option);
  }}
  renderOption={(props, option, state, ownerState) => {
    expectType<Option, typeof option>(option);
    expectType<string | null | undefined, typeof ownerState.value>(ownerState.value);
    const mappedValue = ownerState.getOptionValue?.(option);
    expectType<string | undefined, typeof mappedValue>(mappedValue);
    return <li {...props}>{option.label}</li>;
  }}
  slotProps={{
    listbox: (ownerState) => {
      // Slot state must use the same mapped selections as render callbacks.
      expectType<string | null | undefined, typeof ownerState.value>(ownerState.value);
      return {};
    },
  }}
  renderValue={(value) => {
    expectType<string, typeof value>(value);
    return value;
  }}
  renderInput={() => null}
/>;

// multiple mapped values are inferred as arrays of the getOptionValue return type
<Autocomplete
  multiple
  options={options}
  getOptionValue={(option) => Number(option.value)}
  value={[1, 2]}
  defaultValue={[1]}
  onChange={(event, value) => {
    expectType<number[], typeof value>(value);
  }}
  renderValue={(value) => {
    expectType<number[], typeof value>(value);
    return value.join(', ');
  }}
  renderInput={() => null}
/>;

// disableClearable removes null from a mapped single value
<Autocomplete
  disableClearable
  options={options}
  getOptionValue={(option) => Number(option.value)}
  onChange={(event, value) => {
    expectType<number, typeof value>(value);
  }}
  renderInput={() => null}
/>;

// Non-string primitive IDs retain their own type in component callbacks as well as the hook.
<Autocomplete
  options={options}
  getOptionValue={(option) => option.value === '1'}
  onChange={(event, value) => {
    expectType<boolean | null, typeof value>(value);
  }}
  renderInput={() => null}
/>;
const bigintMappedProps = {
  options,
  getOptionValue: (option: Option) => BigInt(option.value),
  renderInput: () => null,
};
// @ts-expect-error bigint IDs are not supported.
<Autocomplete {...bigintMappedProps} />;
for (const WrappedAutocomplete of [UncastStyledAutocomplete, UncastMemoAutocomplete]) {
  // @ts-expect-error Wrappers must also reject bigint IDs.
  <WrappedAutocomplete {...bigintMappedProps} />;
}
// @ts-expect-error createElement must also reject bigint IDs.
React.createElement(Autocomplete, bigintMappedProps);

// freeSolo adds strings to a non-string mapped value
<Autocomplete
  freeSolo
  options={options}
  getOptionValue={(option) => Number(option.value)}
  onChange={(event, value) => {
    expectType<string | number | null, typeof value>(value);
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<Option, typeof option>(option);
    expectType<string | number, typeof value>(value);
    return typeof value === 'number' && Number(option.value) === value;
  }}
  renderInput={() => null}
/>;

const stringMappedProps = {
  options,
  getOptionValue: (option: Option) => option.value,
  renderInput: () => null,
};
// @ts-expect-error String option values are indistinguishable from freeSolo values.
<Autocomplete {...stringMappedProps} freeSolo />;

// Runtime flags preserve all possible selection shapes without permitting string IDs.
const dynamicSelectionFlags = {
  multiple: Math.random() > 0.5,
  disableClearable: Math.random() > 0.5,
  freeSolo: Math.random() > 0.5,
};
<Autocomplete
  {...dynamicSelectionFlags}
  options={options}
  getOptionValue={(option) => Number(option.value)}
  onChange={(event, value) => {
    expectType<number | string | null | Array<number | string>, typeof value>(value);
  }}
  renderInput={() => null}
/>;
// @ts-expect-error String IDs are invalid when freeSolo might be true.
<Autocomplete {...stringMappedProps} freeSolo={dynamicSelectionFlags.freeSolo} />;

// Existing explicit generic arguments retain their meaning: the second argument is Multiple.
<Autocomplete<Option, true>
  multiple
  options={options}
  onChange={(event, value) => {
    expectType<Option[], typeof value>(value);
  }}
  renderInput={() => null}
/>;

// value cannot change the selected value type without getOptionValue
// @ts-expect-error Without getOptionValue, value must have the same type as an option.
<Autocomplete options={options} value="1" renderInput={() => null} />;

const nonPrimitiveMappedProps = {
  options,
  getOptionValue: (option: Option) => ({ value: option.value }),
  renderInput: () => null,
};
// @ts-expect-error getOptionValue must return a primitive value.
<Autocomplete {...nonPrimitiveMappedProps} />;

<Autocomplete<Option, false, false, false, ChipTypeMap['defaultComponent'], string>
  options={options}
  getOptionValue={(option) => option.value}
  // @ts-expect-error value must match the getOptionValue return type.
  value={1}
  renderInput={() => null}
/>;

// Selected values must not widen the type inferred from getOptionValue.
const rawOptionMappedProps = {
  options,
  getOptionValue: () => 1,
  value: options[0],
  renderInput: () => null,
};
// @ts-expect-error The wrapper overload must not accept raw options as mapped values.
<Autocomplete {...rawOptionMappedProps} />;
// @ts-expect-error A primitive option must also be converted to its mapped value.
<Autocomplete options={['one']} getOptionValue={() => 1} value="one" renderInput={() => null} />;

const literalMappedProps = {
  options: [{ id: 'foo' as const }],
  getOptionValue: (option: { id: 'foo' }) => option.id,
};
// @ts-expect-error value must match the inferred getOptionValue return type.
<Autocomplete {...literalMappedProps} value="bar" renderInput={() => null} />;
// @ts-expect-error defaultValue must match the inferred getOptionValue return type.
<Autocomplete {...literalMappedProps} defaultValue="bar" renderInput={() => null} />;

<Autocomplete
  {...literalMappedProps}
  value="foo"
  defaultValue="foo"
  onChange={(event, value) => {
    expectType<'foo' | null, typeof value>(value);
  }}
  renderInput={() => null}
/>;

// getOptionLabel and isOptionEqualToValue value argument type should not include string when freeSolo is false
<MyAutocomplete
  options={[{ label: '1' }, { label: '2' }]}
  renderInput={() => null}
  getOptionLabel={(option) => {
    expectType<{ label: string }, typeof option>(option);

    return option.label;
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<{ label: string }, typeof value>(value);
    expectType<{ label: string }, typeof option>(option);

    return option.label === value.label;
  }}
/>;
