---
productId: material-ui
title: React Autocomplete component
components: TextField, Popper, Autocomplete
githubLabel: 'scope: autocomplete'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
githubSource: packages/mui-material/src/Autocomplete
---

# Autocomplete

<p class="description">The autocomplete is a normal text input enhanced by a panel of suggested options.</p>

The widget is useful for setting the value of a single-line textbox in one of two types of scenarios:

1. The value for the textbox must be chosen from a predefined set of allowed values, for example a location field must contain a valid location name: [combo box](#combo-box).
2. The textbox may contain any arbitrary value, but it is advantageous to suggest possible values to the user, for example a search field may suggest similar or previous searches to save the user time: [free solo](#free-solo).

It's meant to be an improved version of the "react-select" and "downshift" packages.

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Combo box

The value must be chosen from a predefined set of allowed values.

{{"component": "file://./demos/combo-box/index.ts"}}

### Options structure

By default, the component accepts the following options structures:

```ts
interface AutocompleteOption {
  label: string;
}
// or
type AutocompleteOption = string;
```

for instance:

```js
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
// or
const options = ['The Godfather', 'Pulp Fiction'];
```

However, you can use different structures by providing a `getOptionLabel` prop.

Without `getOptionValue`, the component uses strict equality to compare an option with the current value.
If your options are objects and the value is not one of the exact option instances, provide the `isOptionEqualToValue` prop to customize the comparison.
When `getOptionValue` is provided, its return value is used for the default comparison instead.

:::warning
If your options have duplicate labels, you must extract a unique key with the `getOptionKey` prop.

```tsx
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'The Godfather', id: 2 },
];

return <Autocomplete options={options} getOptionKey={(option) => option.id} />;
```

:::

### Object options with primitive values

By default, `value`, `defaultValue`, and the value passed to `onChange` contain the selected option object.
Use the `getOptionValue` prop when you want them to contain a primitive value instead, such as an ID.
The prop must return a unique, non-null string, number, or boolean for every option.
When `freeSolo` is enabled, it must return a number or boolean because strings are reserved for free-solo values.

This requirement also applies to options created by `filterOptions`.
Include the fields that `getOptionValue` reads in every generated option.

Callbacks that operate on options, such as `getOptionLabel` and `renderOption`, continue to receive the original option object.
The `details.option` passed to `onChange` also contains the original option.

Keep `getOptionValue` and any custom `isOptionEqualToValue` callback stable between renders to reuse cached option lookups.
Define them outside the component, as in the demo below, or use `React.useCallback` with all dependencies.
Changing a callback that determines matching rebuilds its lookup so the results reflect the new behavior.

{{"component": "file://./demos/option-value-mapping/index.ts"}}

#### Typed wrappers

For typed wrappers, supply the mapped value type as the final generic argument of `AutocompleteProps` or `UseAutocompleteProps`.
`Value` is the original option type, and `MappedValue` is the type returned by `getOptionValue`.
This wrapper accepts film options and uses `number | null` for selected values.
It makes `getOptionValue` required so callers must provide the mapping:

```tsx
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { ChipTypeMap } from '@mui/material/Chip';

interface Film {
  id: number;
  label: string;
}

interface FilmAutocompleteProps extends AutocompleteProps<
  Film, // Value: the original option type
  false, // Multiple
  false, // DisableClearable
  false, // FreeSolo
  ChipTypeMap['defaultComponent'], // ChipComponent
  number // MappedValue: the type returned by getOptionValue
> {
  getOptionValue: (option: Film) => number;
}

function FilmAutocomplete(props: FilmAutocompleteProps) {
  return <Autocomplete {...props} />;
}
```

For a wrapper around `useAutocomplete`, use `UseAutocompleteProps<Film, false, false, false, number>` and require `getOptionValue` in the same way.
Omitting the final generic argument preserves the original option values.

### Playground

Each of the following examples demonstrates one feature of the Autocomplete component.

{{"component": "file://./demos/playground/index.ts"}}

### Country select

Choose one of the 248 countries.

{{"component": "file://./demos/country-select/index.ts"}}

### Controlled states

The component has two states that can be controlled:

1. the "value" state with the `value`/`onChange` props combination. This state represents the value selected by the user, for instance when pressing <kbd class="key">Enter</kbd>.
2. the "input value" state with the `inputValue`/`onInputChange` props combination. This state represents the value displayed in the textbox.

These two states are isolated, and should be controlled independently.

:::info

- A component is **controlled** when it's managed by its parent using props.
- A component is **uncontrolled** when it's managed by its own local state.

Learn more about controlled and uncontrolled components in the [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).
:::

{{"component": "file://./demos/controllable-states/index.ts"}}

:::warning

If you control the `value`, make sure it's referentially stable between renders.
In other words, the reference to the value shouldn't change if the value itself doesn't change.

```tsx
// ⚠️ BAD
return <Autocomplete multiple value={allValues.filter((v) => v.selected)} />;

// 👍 GOOD
const selectedValues = React.useMemo(
  () => allValues.filter((v) => v.selected),
  [allValues],
);
return <Autocomplete multiple value={selectedValues} />;
```

In the first example, `allValues.filter` is called and returns **a new array** every render.
The fix includes memoizing the value, so it changes only when needed.
:::

## Free solo

Set `freeSolo` to true so the textbox can contain any arbitrary value.

### Search input

The prop is designed to cover the primary use case of a **search input** with suggestions, for example Google search or react-autowhatever.

{{"component": "file://./demos/free-solo/index.ts"}}

:::warning
Be careful when using the free solo mode with non-string options, as it may cause type mismatch.

The value created by typing into the textbox is always a string, regardless of the type of the options.
:::

### Creatable

If you intend to use this mode for a [combo box](#combo-box) like experience (an enhanced version of a select element) we recommend setting:

- `selectOnFocus` to help the user clear the selected value.
- `clearOnBlur` to help the user enter a new value.
- `handleHomeEndKeys` to move focus inside the popup with the <kbd class="key">Home</kbd> and <kbd class="key">End</kbd> keys.
- `resetHighlightOnMouseLeave` to clear mouse-created highlights when the pointer leaves the popup.
- A last option, for instance: `Add "YOUR SEARCH"`.

{{"component": "file://./demos/free-solo-create-option/index.ts"}}

You could also display a dialog when the user wants to add a new value.

{{"component": "file://./demos/free-solo-create-option-dialog/index.ts"}}

## Grouped

You can group the options with the `groupBy` prop.
If you do so, make sure that the options are also sorted with the same dimension that they are grouped by,
otherwise, you will notice duplicate headers.

{{"component": "file://./demos/grouped/index.ts"}}

To control how the groups are rendered, provide a custom `renderGroup` prop.
This is a function that accepts an object with two fields:

- `group`—a string representing a group name
- `children`—a collection of list items that belong to the group

The following demo shows how to use this prop to define custom markup and override the styles of the default groups:

{{"component": "file://./demos/render-group/index.ts"}}

## Disabled options

{{"component": "file://./demos/disabled-options/index.ts"}}

## `useAutocomplete`

For advanced customization use cases, a headless `useAutocomplete()` hook is exposed.
It accepts almost the same options as the Autocomplete component minus all the props
related to the rendering of JSX.
The Autocomplete component is built on this hook.

```tsx
import useAutocomplete from '@mui/material/useAutocomplete';
```

- 📦 [4.6 kB gzipped](https://bundlephobia.com/package/@mui/material).

{{"component": "file://./demos/use/index.ts", "collapseToEmpty": true}}

### Customized hook

{{"component": "file://./demos/customized-hook/index.ts", "collapseToEmpty": true}}

Head to the [customization](#customization) section for an example with the `Autocomplete` component instead of the hook.

## Asynchronous requests

The component supports two different asynchronous use-cases:

- [Load on open](#load-on-open): it waits for the component to be interacted with to load the options.
- [Search as you type](#search-as-you-type): a new request is made for each keystroke.

### Load on open

It displays a progress state as long as the network request is pending.

{{"component": "file://./demos/asynchronous/index.ts"}}

### Search as you type

If your logic is fetching new options on each keystroke and using the current value of the textbox
to filter on the server, you may want to consider throttling requests.

Additionally, you will need to disable the built-in filtering of the `Autocomplete` component by
overriding the `filterOptions` prop:

```jsx
<Autocomplete filterOptions={(x) => x} />
```

### Google Maps place

A customized UI for Google Maps Places Autocomplete.
For this demo, we need to load the [Google Maps JavaScript](https://developers.google.com/maps/documentation/javascript/overview) and [Google Places](https://developers.google.com/maps/documentation/places/web-service/overview) API.

{{"component": "file://./demos/google-maps/index.ts"}}

The demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

:::error
Before you can start using the Google Maps JavaScript API and Places API, you need to get your own [API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

This demo has limited quotas to make API requests. When your quota exceeds, you will see the response for "Paris".
:::

### Infinite loading

This demo uses `@tanstack/react-query` to additively fetch new data onto existing `options` upon reaching the end of the current list. The list is virtualized using `@tanstack/react-virtual`.

{{"component": "file://./demos/infinite-loading/index.ts"}}

## Single value rendering

By default (when `multiple={false}`), the selected option is displayed as plain text inside the input.
The `renderValue` prop allows you to customize how the selected value is rendered.
This can be useful for adding custom styles, displaying additional information, or formatting the value differently.

- The `getItemProps` getter provides props like `data-item-index`, `disabled`, `tabIndex` and others. These props should be spread onto the rendered component for proper accessibility.
- If using a custom component other than a Material UI Chip, destructure the `onDelete` prop as it's specific to the Material UI Chip.

{{"component": "file://./demos/custom-single-value-rendering/index.ts"}}

## Multiple values

When `multiple={true}`, the user can select multiple values. These selected values, referred to as "items" can be customized using the `renderValue` prop.

- The `getItemProps` getter supplies essential props like `data-item-index`, `disabled`, `tabIndex` and others. Make sure to spread them on each rendered item.
- If using a custom component other than a Material UI Chip, destructure the `onDelete` prop as it's specific to the Material UI Chip.

{{"component": "file://./demos/tags/index.ts"}}

To help screen reader users discover how to reach and remove selected items, add `aria-description` to the input and each removable `<Chip>`, as shown in the demo.
These descriptions are application text, so translate them together with the rest of your interface.

### Fixed options

In the event that you need to lock certain tags so that they can't be removed, you can set the chips disabled.

{{"component": "file://./demos/fixed-tags/index.ts"}}

### Selection indicators

This example demonstrates how icons are used to indicate the selection state of each item in the listbox.

{{"component": "file://./demos/checkboxes-tags/index.ts"}}

### Limit tags

You can use the `limitTags` prop to limit the number of displayed options when not focused.

{{"component": "file://./demos/limit-tags/index.ts"}}

## Sizes

Fancy smaller inputs? Use the `size` prop.

{{"component": "file://./demos/sizes/index.ts"}}

## Customization

### Custom input

The `renderInput` prop allows you to customize the rendered input. Its argument contains props that must be forwarded.
Pay particular attention to `params.slotProps.input` (including its `ref`) and `params.slotProps.htmlInput`.

Autocomplete renders selected values through `params.slotProps.input.startAdornment`. When adding a custom start
adornment, preserve the provided adornment:

```tsx
const getInputSlotProps = (params) => ({
  ...params.slotProps.input,
  startAdornment: (
    <>
      {customStartAdornment}
      {params.slotProps.input.startAdornment}
    </>
  ),
});

<Autocomplete
  options={options}
  renderInput={(params) => (
    <TextField
      {...params}
      slotProps={{
        ...params.slotProps,
        input: getInputSlotProps(params),
      }}
    />
  )}
/>;
```

Likewise, preserve `params.slotProps.input.endAdornment` when customizing it. It contains Autocomplete's built-in controls.

:::warning
If you're using a custom input component inside the Autocomplete, make sure that you forward the ref to the underlying DOM element.
:::

{{"component": "file://./demos/custom-input/index.ts"}}

### Wrapping with `styled()`

Autocomplete is a generic component: TypeScript infers the option type from the `options` prop and uses it to type props like `getOptionLabel`, `renderOption`, and `onChange`.
Wrapping it with the `styled()` utility loses these generic types, so the options are typed as `unknown`.
To keep them, cast the styled component back to `typeof Autocomplete`:

```tsx
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

interface Film {
  label: string;
  year: number;
}

const StyledAutocomplete = styled(Autocomplete)({
  // your custom styles go here
}) as typeof Autocomplete;

function FilmPicker({ films }: { films: Film[] }) {
  return (
    <StyledAutocomplete
      options={films}
      getOptionLabel={(option) => option.label} // option is typed as Film
      renderInput={(params) => <TextField {...params} label="Film" />}
    />
  );
}
```

### Globally customized options

To globally customize the Autocomplete options for all components in your app,
you can use the [theme default props](/material-ui/customization/theme-components/#theme-default-props) and set the `renderOption` property in the `defaultProps` key.
The `renderOption` property takes the `ownerState` as the fourth parameter, which includes props and internal component state.
To display the label, you can use the `getOptionLabel` prop from the `ownerState`.
This approach enables different options for each Autocomplete component while keeping the options styling consistent.

{{"component": "file://./demos/globally-customized-options/index.ts"}}

### GitHub's picker

This demo reproduces GitHub's label picker:

{{"component": "file://./demos/git-hub-label/index.ts"}}

Head to the [Customized hook](#customized-hook) section for a customization example with the `useAutocomplete` hook instead of the component.

### Hint

The following demo shows how to add a hint feature to the Autocomplete:

{{"component": "file://./demos/hint/index.ts"}}

## Highlights

The following demo relies on [autosuggest-highlight](https://github.com/moroshko/autosuggest-highlight), a small (1 kB) utility for highlighting text in autosuggest and autocomplete components.

{{"component": "file://./demos/highlights/index.ts"}}

## Custom filter

The component exposes a factory to create a filter method that can be provided to the `filterOptions` prop.
You can use it to change the default option filter behavior.

```js
import { createFilterOptions } from '@mui/material/Autocomplete';
```

### `createFilterOptions(config) => filterOptions`

#### Arguments

1. `config` (_object_ [optional]):

- `config.ignoreAccents` (_bool_ [optional]): Defaults to `true`. Remove diacritics.
- `config.ignoreCase` (_bool_ [optional]): Defaults to `true`. Lowercase everything.
- `config.limit` (_number_ [optional]): Default to null. Limit the number of suggested options to be shown. For example, if `config.limit` is `100`, only the first `100` matching options are shown. It can be useful if a lot of options match and virtualization wasn't set up.
- `config.matchFrom` (_'any' | 'start'_ [optional]): Defaults to `'any'`.
- `config.stringify` (_func_ [optional]): Controls how an option is converted into a string so that it can be matched against the input text fragment.
- `config.trim` (_bool_ [optional]): Defaults to `false`. Remove trailing spaces.

#### Returns

`filterOptions`: the returned filter method can be provided directly to the `filterOptions` prop of the `Autocomplete` component, or the parameter of the same name for the hook.

In the following demo, the options need to start with the query prefix:

```jsx
const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.title,
});

<Autocomplete filterOptions={filterOptions} />;
```

{{"component": "file://./demos/filter/index.ts", "collapseToEmpty": true}}

### Advanced

For richer filtering mechanisms, like fuzzy matching, it's recommended to look at [match-sorter](https://github.com/kentcdodds/match-sorter). For instance:

```jsx
import { matchSorter } from 'match-sorter';

const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

<Autocomplete filterOptions={filterOptions} />;
```

## Virtualization

Search within 10,000 randomly generated options. The list is virtualized thanks to [react-window](https://github.com/bvaughn/react-window).

{{"component": "file://./demos/virtualize/index.ts"}}

## Events

If you would like to prevent the default key handler behavior, you can set the event's `defaultMuiPrevented` property to `true`:

```jsx
<Autocomplete
  onKeyDown={(event) => {
    if (event.key === 'Enter') {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = true;
      // your handler code
    }
  }}
/>
```

## Limitations

### autocomplete/autofill

Browsers have heuristics to help the user fill in form inputs.
However, this can harm the UX of the component.

By default, the component disables the input **autocomplete** feature (remembering what the user has typed for a given field in a previous session) with the `autoComplete="off"` attribute.
Google Chrome does not currently support this attribute setting ([Issue 41239842](https://issues.chromium.org/issues/41239842)).
A possible workaround is to remove the `id` to have the component generate a random one.

In addition to remembering past entered values, the browser might also propose **autofill** suggestions (saved login, address, or payment details).
In the event you want the avoid autofill, you can try the following:

- Name the input without leaking any information the browser can use. For example `id="field1"` instead of `id="country"`. If you leave the id empty, the component uses a random id.
- Set `autoComplete="new-password"` (some browsers will suggest a strong password for inputs with this attribute setting):

  ```jsx
  <TextField
    {...params}
    slotProps={{
      ...params.slotProps,
      htmlInput: {
        ...params.slotProps.htmlInput,
        autoComplete: 'new-password',
      },
    }}
  />
  ```

Read [the guide on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/Turning_off_form_autocompletion) for more details.

### ListboxComponent

If you provide a custom `ListboxComponent` prop, you need to make sure that the intended scroll container has the `role` attribute set to `listbox`. This ensures the correct behavior of the scroll, for example when using the keyboard to navigate.

## Accessibility

(WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

We encourage the usage of a label for the textbox.
The component implements the WAI-ARIA authoring practices.
