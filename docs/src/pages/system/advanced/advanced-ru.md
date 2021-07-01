# Дополнительные параметры

<p class="description">Here you can find examples of how you can use the system in your custom components.</p>

## Adding the `sx` prop to your custom components

The `unstable_styleFunctionSx` utility adds the support for the [`sx` prop](/system/basics/#the-sx-prop) to your own components. Normally you would use the `Box` component from `@material-ui/core` at the root of your component tree. If you would like to use the system independently from Material-UI, the `unstable_styleFunctionSx` utility will give you the same capabilities, while having a smaller bundle size.

{{"demo": "pages/system/advanced/StyleFunctionSxDemo.js"}}

## Using standalone system utilities

If you only need some elements of the system in your custom components, you can directly use and combine the different style functions available, and access them as component props. You might use this approach if you need smaller bundle size and better performance than using Box, for the price of using a subset of what the [`sx` prop](/system/basics/#the-sx-prop) supports, and a different API.

{{"demo": "pages/system/advanced/CombiningStyleFunctionsDemo.js", "defaultCodeOpen": true}}
