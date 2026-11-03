# Codeblock

<p class="description">Installation component.</p>

## Tabs

### Codeblock version

<codeblock storageKey="package-manager">

```bash npm
npm install @mui/material @emotion/react @emotion/styled
# `@emotion/react` and `@emotion/styled` are peer dependencies
```

```bash pnpm
pnpm add @mui/material @emotion/react @emotion/styled
# `@emotion/react` and `@emotion/styled` are peer dependencies
```

```bash yarn
yarn add @mui/material @emotion/react @emotion/styled
# `@emotion/react` and `@emotion/styled` are peer dependencies
```

</codeblock>

### Component version

{{"component": "@mui/internal-core-docs/HighlightedCodeWithTabs", "tabs": [{"tab":"JS", "code":"<div>Hello</div>", "language": "jsx"}, {"tab": "TS", "code": "type A = {}"}]}}

## With header path

```jsx title="PlainCssSliderDeep1.js"
import * as React from 'react';
import Slider from '@mui/material/Slider';
import './PlainCssSliderDeep1.css';

export default function PlainCssSliderDeep1() {
  return (
    <div>
      <Slider defaultValue={30} />
      <Slider defaultValue={30} className="slider" />
    </div>
  );
}
```
