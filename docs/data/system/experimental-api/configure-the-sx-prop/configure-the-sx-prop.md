# Configure the sx prop

<p class="description">Learn about the experimental API for extending or changing the behavior of the sx prop.</p>

## Extend the sx prop

You can add new keys to be processed by the `sx` prop by extending the `unstable_sxConfig` option inside the theme, as shown below:

{{"component": "file://./demos/extend-the-sx-prop/index.ts"}}

## Override existing behavior

It is also possible to change some of the existing behavior of the `sx` prop.
For example, in some design systems, the border radiuses need to be restricted to specific values, instead of allowing any number to be used—as is the default with MUI System.
You can change this behavior by providing a custom config for the `borderRadius` property:

{{"component": "file://./demos/change-the-behavior-sx-prop/index.ts"}}

## API

Each value of the config inside `unstable_sxConfig` accepts the following properties:

- `cssProperty` (_string_ [optional]): Indicates the CSS property, if it is different than the key
- `themeKey` (_string_ [optional]): The path of the theme mapping
- `transform` (_(cssValue: unknown, userValue: unknown) => number | string | React.CSSProperties | CSSObject_ [optional]): Lets users define a function that can transform the value before it's returned
- `style` (_(props: any) => CSSObject_ [optional]): Offers maximum customizability. Note that you need to make sure that the breakpoint values can be processed
