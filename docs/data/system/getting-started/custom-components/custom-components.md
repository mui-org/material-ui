# Custom components

<p class="description">Learn how to use MUI System with custom components.</p>

## Using sx with custom components

Normally you would use the [`Box`](/system/react-box/) component at the root of your component tree in order to work with [the `sx` prop](/system/getting-started/the-sx-prop/).
If you want to use `sx` with fully custom (non-MUI) components, you can do so with the `unstable_styleFunctionSx` utility.
This gives you all the same capabilities, and with a smaller bundle size.

The following demo shows how to implement this utility:

{{"component": "file://./demos/style-function-sx-demo/index.ts"}}

## Using standalone system utilities

If you only need specific style functions from the `sx` prop, you can import them individually rather than pulling in the entire package.
This is useful if you need to optimize for the smallest bundle size possible.

The demo below illustrates how this works:

{{"component": "file://./demos/combining-style-functions-demo/index.ts", "initialExpanded": true}}
