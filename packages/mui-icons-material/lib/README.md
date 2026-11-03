# @mui/icons-material

<!-- #host-reference -->

This package contains Google's [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons) converted to Material UI [SVG Icon](https://next.mui.com/material-ui/icons/#svgicon) components.

> Google also offers [Material Symbols](https://fonts.google.com/icons?icon.set=Material+Symbols) as the successor of Material Icons. `@mui/icons-material` only covers Icons at this time, there are no support for Symbols yet.

## Installation

The Material Icons package depends on Material UI—install both with the following command:

<!-- #npm-tag-reference -->

```bash
npm install @mui/icons-material@next @mui/material@next @emotion/styled @emotion/react
```

## Documentation

<!-- #host-reference -->

- Learn more about Material UI's [SVG Icon component](https://next.mui.com/material-ui/icons/#svgicon).
- Browse the available icons on the [Material Icons page](https://next.mui.com/material-ui/material-icons/).

## Contributing

The Icons package is updated via a script that reads through Google's Material Icons set and extracts the SVG elements from there. Because of this, we don't accept new icons that diverge from the source.

To update the `@mui/icons-material` package with the latest Material Icons set, run the following commands:

1. In the "mui-icons-material" directory, run `pnpm src:download`
2. In the "mui-icons-material" directory, run `pnpm src:icons`
3. In the root of the Material UI repo, run `pnpm docs:mdicons:synonyms`
4. If the number of icons changes significantly, edit the icons/icons.md and material-icons/material-icons.md under docs/data/material/components and update the numbers.

This process is performed by the maintainers on a quarterly basis.
