# Screen readers

<p class="description">Collection of utilities for improving accessibility with screen readers.</p>

## Visually hidden elements

The visually hidden style utility provides a common mechanism for hidings elements visually, but making them available for assistive technology.
It's a simple style object of type `React.CSSProperties`.

{{"component": "file://./demos/visually-hidden-usage/index.ts", "initialExpanded": true}}

If you don't have a strict CSP policy in place, you can also do:

```jsx
import { visuallyHidden } from '@mui/utils';

<div style={visuallyHidden}>about how to visually hide elements</div>;
```
