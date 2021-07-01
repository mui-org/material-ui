# Shadows

<p class="description">Box-shadow ユーティリティを使用して要素に影を追加または削除します。</p>

## 例

Elevationヘルパーを使用すると、 **z-axis** に沿った2つのサーフェス間の相対的な影の濃度または距離を制御できます。 デフォルトでは、濃度25です。

{{"demo": "pages/system/shadows/Demo.js", "defaultCodeOpen": false, "bg": true}}

```jsx
<Box sx={{ boxShadow: 0 }}>…
<Box sx={{ boxShadow: 1 }}>…
<Box sx={{ boxShadow: 2 }}>…
<Box sx={{ boxShadow: 3 }}>…
```

## API

```js
import { shadows } from '@material-ui/system';
```

| Import name | Prop        | CSS property | Theme key |
|:----------- |:----------- |:------------ |:--------- |
| `boxShadow` | `boxShadow` | `box-shadow` | `shadows` |
