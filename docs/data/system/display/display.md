# Display

<p class="description">Quickly and responsively toggle the display, overflow, visibility, and more with the display utilities.</p>

## Examples

### Inline

{{"component": "file://./demos/inline/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
```

### Block

{{"component": "file://./demos/block/index.ts", "collapseToEmpty": true, "bg": true}}

```jsx
<Box component="span" sx={{ display: 'block' }}>block</Box>
<Box component="span" sx={{ display: 'block' }}>block</Box>
```

## Hiding elements

For faster mobile-friendly development, use responsive display classes for showing and hiding elements by device. Avoid creating entirely different versions of the same site, instead hide element responsively for each screen size.

| Screen Size        | Class                                                        |
| :----------------- | :----------------------------------------------------------- |
| Hidden on all      | `sx={{ display: 'none' }}`                                   |
| Hidden only on xs  | `sx={{ display: { xs: 'none', sm: 'block' } }}`              |
| Hidden only on sm  | `sx={{ display: { xs: 'block', sm: 'none', md: 'block' } }}` |
| Hidden only on md  | `sx={{ display: { xs: 'block', md: 'none', lg: 'block' } }}` |
| Hidden only on lg  | `sx={{ display: { xs: 'block', lg: 'none', xl: 'block' } }}` |
| Hidden only on xl  | `sx={{ display: { xs: 'block', xl: 'none' } }}`              |
| Visible only on xs | `sx={{ display: { xs: 'block', sm: 'none' } }}`              |
| Visible only on sm | `sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}`  |
| Visible only on md | `sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }}`  |
| Visible only on lg | `sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}`  |
| Visible only on xl | `sx={{ display: { xs: 'none', xl: 'block' } }}`              |

{{"component": "file://./demos/hiding/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ display: { xs: 'block', md: 'none' }}}>
  hide on screens wider than md
</Box>
<Box sx={{ display: { xs: 'none', md: 'block' }}}>
  hide on screens smaller than md
</Box>
```

## Display in print

{{"component": "file://./demos/print/index.ts", "collapseToEmpty": true}}

```jsx
<Box sx={{ display: 'block', displayPrint: 'none' }}>
  Screen Only (Hide on print only)
</Box>
<Box sx={{ display: 'none', displayPrint: 'block' }}>
  Print Only (Hide on screen only)
</Box>
```

## Overflow

{{"component": "file://./demos/overflow/index.ts", "collapseToEmpty": true}}

```jsx
<Box component="div" sx={{ overflow: 'hidden' }}>
  Not scrollable, overflow is hidden
</Box>
<Box component="div" sx={{ overflow: 'auto' }}>
  Try scrolling this overflow auto box
</Box>
```

## Text overflow

{{"component": "file://./demos/text-overflow/index.ts", "collapseToEmpty": true}}

```jsx
<Box component="div" sx={{ textOverflow: 'clip' }}>
  Lorem Ipsum is simply dummy text
</Box>
<Box component="div" sx={{ textOverflow: 'ellipsis' }}>
  Lorem Ipsum is simply dummy text
</Box>
```

## Visibility

{{"component": "file://./demos/visibility/index.ts", "collapseToEmpty": true}}

```jsx
<Box component="div" sx={{ visibility: 'visible' }}>
  Visible container
</Box>
<Box component="div" sx={{ visibility: 'hidden' }}>
  Invisible container
</Box>
```

## White space

{{"component": "file://./demos/white-space/index.ts", "collapseToEmpty": true}}

```jsx
<Box component="div" sx={{ whiteSpace: 'nowrap' }}>
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
</Box>
```

## API

```js
import { display } from '@mui/system';
```

| Import name    | Prop           | CSS property    | Theme key |
| :------------- | :------------- | :-------------- | :-------- |
| `displayPrint` | `displayPrint` | `display`       | none      |
| `displayRaw`   | `display`      | `display`       | none      |
| `overflow`     | `overflow`     | `overflow`      | none      |
| `textOverflow` | `textOverflow` | `text-overflow` | none      |
| `visibility`   | `visibility`   | `visibility`    | none      |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none      |
