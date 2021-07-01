---
title: React Rating（评分）组件
components: Rating
githubLabel: 'component: Rating'
waiAria: 'https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating'
---

# Rating 评分

<p class="description">评分组件可以让用户深入了解他人的意见和经验，也可以让用户提交自己的评价。
</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 基础的评分组件

{{"demo": "pages/components/rating/BasicRating.js"}}

## 评分精度

使用 `value`  属性可以让评分组件展示任何的浮点的评分值。 您可以使用 `precision` 属性定义可变化的最小增量值。

{{"demo": "pages/components/rating/HalfRating.js"}}

## 悬停反馈

你可以在鼠标悬停时让组件显示一个辅助标签来帮助用户选择正确的评分值。 以下案例使用了 `onChangeActive` 这一属性。

{{"demo": "pages/components/rating/HoverRating.js"}}

## 尺寸

你可以使用 `size` 属性来更改评分组件大小。

{{"demo": "pages/components/rating/RatingSize.js"}}

## 自定义评分组件

你可以参考以下一些例子来自定义组件。 您可以在 [重写文档页面](/customization/how-to-customize/) 中了解更多有关此内容的信息。

{{"demo": "pages/components/rating/CustomizedRating.js"}}

## Radio group

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

{{"demo": "pages/components/rating/RadioGroupRating.js"}}

## 无障碍设计

([WAI 教程](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

这个组件的可访问性依赖于：

- 一个单选框组，其字段在视觉上是隐藏的。 它包含六个单选按钮，一组用于每颗星星的选择，另一组代表默认选中的 0 颗星。 请确保为 `name` 属性提供一个对父表单唯一的值。
- 包含实际文字的单选按钮的标签（“一颗星”，“两颗星”，...）。 当页面的语言不是英语时，请确保为 `getLabelText` 属性提供一个合适的函数。 你可以使用这上面 [所提供的本地化语言选项](https://material-ui.com/guides/localization/)，或者单独提供你自己的语言包。
- 为评分图标提供了一个视觉上独特的外观。 默认情况下，评分组件通过颜色和形状的差异（填充和空图标）来表示所指定的值。 如果你使用颜色作为唯一的方式来表示数值，那么数值信息也应该像下面这个示例一样以文本的形式来显示。 这对于符合 WCAG2.1 的 [成功标准 1.4.1](https://www.w3.org/TR/WCAG21/#use-of-color) 非常重要。

{{"demo": "pages/components/rating/TextRating.js"}}

### ARIA

只读评分有一个 "img" 的角色（role），以及一个描述显示评分的 aria-label。

### 键盘输入

由于评分组件是由单选按钮组成的，所以键盘交互遵循本地浏览器行为。 Tab 键将聚焦当前的评分，光标键可以控制所选的评分。

只读的评分组件不可以被聚焦。
