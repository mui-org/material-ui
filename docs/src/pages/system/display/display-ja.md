# ディスプレイ

<p class="description">一般的な値の一部のサポートと、印刷時の表示を制御するための追加機能が含まれています。 一般的な値の一部のサポートと、印刷時の表示を制御するための追加機能が含まれています。 一般的な値の一部のサポートと、印刷時の表示を制御するための追加機能が含まれています。 一般的な値の一部のサポートと、印刷時の表示を制御するための追加機能が含まれています。 一般的な値の一部のサポートと、印刷時の表示を制御するための追加機能が含まれています。 Quickly and responsively toggle the display value of components and more with the display utilities.</p>

## 例

### Inline

{{"demo": "pages/system/display/Inline.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
<Box component="div" sx={{ display: 'inline' }}>inline</Box>
```

### Block

{{"demo": "pages/system/display/Block.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box component="span" sx={{ display: 'block' }}>block</Box>
<Box component="span" sx={{ display: 'block' }}>block</Box>
```

## 要素を隠す

For faster mobile-friendly development, use responsive display classes for showing and hiding elements by device. Avoid creating entirely different versions of the same site, instead hide element responsively for each screen size.

| Screen Size        | Class                                                        |
|:------------------ |:------------------------------------------------------------ |
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

{{"demo": "pages/system/display/Hiding.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: { xs: 'block', md: 'none' }}}>
  hide on screens wider than md
</Box>
<Box sx={{ display: { xs: 'none', md: 'block' }}}>
  hide on screens smaller than md
</Box>
```

## Display in print

{{"demo": "pages/system/display/Print.js", "defaultCodeOpen": false}}

```jsx
<Box sx={{ display: 'block', displayPrint: 'none' }}>
  Screen Only (Hide on print only)
</Box>
<Box sx={{ display: 'none', displayPrint: 'block' }}>
  Print Only (Hide on screen only)
</Box>
```

## Overflow

{{"demo": "pages/system/display/Overflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ overflow: 'hidden' }}>
  Overflow Hidden
</Box>
<Box component="div" sx={{ overflow: 'visible' }}>
  Overflow visible
</Box>
```

## Text overflow

{{"demo": "pages/system/display/TextOverflow.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ textOverflow: 'clip' }}>
  Text Overflow Clip
</Box>
<Box component="div" sx={{ textOverflow: 'ellipsis' }}>
  Text Overflow Ellipsis
</Box>
```

## Visibility

{{"demo": "pages/system/display/Visibility.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ visibility: 'visible' }}>
  Visibility Visible
</Box>
<Box component="div" sx={{ visibility: 'hidden' }}>
  Visibility Hidden
</Box>
```

## White space

{{"demo": "pages/system/display/WhiteSpace.js", "defaultCodeOpen": false}}

```jsx
<Box component="div" sx={{ whiteSpace: 'nowrap' }}>
  White Space Nowrap
</Box>
<Box component="div" sx={{ whiteSpace: 'normal' }}>
  White Space Normal
</Box>
```

## API

```js
import { display } from '@material-ui/system';
```

| Import name    | Prop           | CSS property    | Theme key |
|:-------------- |:-------------- |:--------------- |:--------- |
| `displayPrint` | `displayPrint` | `display`       | none      |
| `displayRaw`   | `display`      | `display`       | none      |
| `overflow`     | `overflow`     | `overflow`      | none      |
| `textOverflow` | `textOverflow` | `text-overflow` | none      |
| `visibility`   | `visibility`   | `visibility`    | none      |
| `whiteSpace`   | `whiteSpace`   | `white-space`   | none      |
