---
title: React Pagination（分页）组件
components: Pagination, PaginationItem
githubLabel: 'component: Pagination'
---

# Pagination 分页

<p class="description">使用分页组件，用户可以从一系列页面中选择某个特定的页面。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础分页

{{"demo": "pages/components/pagination/BasicPagination.js"}}

## 描边分页

{{"demo": "pages/components/pagination/PaginationOutlined.js"}}

## 圆形分页

{{"demo": "pages/components/pagination/PaginationRounded.js"}}

## 分页大小

{{"demo": "pages/components/pagination/PaginationSize.js"}}

## 按钮

你可以有选择地启用首尾页的按钮，或这禁用上一页和下一页的按钮。

{{"demo": "pages/components/pagination/PaginationButtons.js"}}

## 分页范围

你可以使用 `siblingRange` 属性来指定当前页面两侧显示的数字多少，并使用`boundaryRange`属性来调整在起始和结束页码旁边显示的位数。

{{"demo": "pages/components/pagination/PaginationRanges.js"}}

## 可控制的分页

{{"demo": "pages/components/pagination/PaginationControlled.js"}}

## 与 Router 整合

{{"demo": "pages/components/pagination/PaginationLink.js"}}

## `usePagination`

For advanced customization use cases, a headless `usePagination()` hook is exposed. 它支持的选项与分页组件大致相同，但不包括与 JSX 渲染有关的所有属性。 The Pagination component is built on this hook.

```jsx
import { usePagination } from '@material-ui/core/Pagination';
```

{{"demo": "pages/components/pagination/UsePagination.js"}}

## 表格分页

`Pagination` 组件的设计是为了在不使用无限加载的情况下，将任意数量的项目进行分页。 比如说博客这样重视 SEO 的环境下，它是首选。

对于大型表格数据的分页，应该使用 `TablePagination` 组件。

{{"demo": "pages/components/pagination/TablePagination.js"}}

> ⚠️注意，`Pagination` 页面的属性从 1 开始，以满足在 URL 中包含当前页面参数值的要求，而 `TablePagination` 页面的属性则从 0 开始，以满足渲染大量表格数据时基于零开始的 JavaScript 数组的要求。

您可以在文档的 [表格部分](/components/tables/#custom-pagination-options) 中了解更多关于此用例的信息。

## 无障碍设计

### ARIA

默认情况下，根节点具有 "导航（navigation）" 和 aria-label 的“分页导航” 的作用。 页面的项目带有一个 aria-label，用于标识项目的用途（“转到首页”，“转到上一页”，“转到第一页”等）。 你可以使用 `getItemAriaLabel` 属性来覆盖它们。

### 键盘输入

分页项目按标签顺序排列，标签索引为“0”。
