# 屏幕阅读器

<p class="description">为改善屏幕阅读器的无障碍功能而收集的工具集。
</p>

## 视觉上被隐藏的元素

The visually hidden style utility provides a common mechanism for hidings elements visually, but making them available for assistive technology. It's a simple style object of type `React.CSSProperties`. The visually hidden style utility provides a common mechanism for hidings elements visually, but making them available for assistive technology. It's a simple style object of type `React.CSSProperties`. It's a simple style object of type `React.CSSProperties`.

{{"demo": "pages/system/screen-readers/VisuallyHiddenUsage.js", "defaultCodeOpen": true}}

如果你不追求实现严格的 CSP 政策，那么也可以这样编写代码：

```jsx
import { visuallyHidden } from '@material-ui/utils';

<div style={visuallyHidden}>about how to visually hide elements</div>;
```
