---
productId: material-ui
title: React Rating component
components: Rating
githubLabel: 'scope: rating'
waiAria: https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating
githubSource: packages/mui-material/src/Rating
---

# Rating

<p class="description">Ratings provide insight regarding others' opinions and experiences, and can allow the user to submit a rating of their own.</p>

{{"component": "@mui/internal-core-docs/ComponentLinkHeader"}}

## Basic rating

{{"component": "file://./demos/basic/index.ts"}}

## Rating precision

The rating can display any float number with the `value` prop.
Use the `precision` prop to define the minimum increment value change allowed.

{{"component": "file://./demos/half/index.ts"}}

## Hover feedback

You can display a label on hover to help the user pick the correct rating value.
The demo uses the `onChangeActive` prop.

{{"component": "file://./demos/hover/index.ts"}}

## Sizes

For larger or smaller ratings use the `size` prop.

{{"component": "file://./demos/size/index.ts"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"component": "file://./demos/customized/index.ts"}}

## Radio group

The rating is implemented with a radio group, set `highlightSelectedOnly` to restore the natural behavior.

{{"component": "file://./demos/radio-group/index.ts"}}

## Accessibility

([WAI tutorial](https://www.w3.org/WAI/tutorials/forms/custom-controls/#a-star-rating))

The accessibility of this component relies on:

- A radio group with its fields visually hidden.
  It contains six radio buttons, one for each star, and another for 0 stars that is checked by default. Be sure to provide a value for the `name` prop that is unique to the parent form.
- Labels for the radio buttons containing actual text ("1 Star", "2 Stars", …).
  Be sure to provide a suitable function to the `getLabelText` prop when the page is in a language other than English. You can use the [included locales](/material-ui/guides/localization/), or provide your own.
- A visually distinct appearance for the rating icons.
  By default, the rating component uses both a difference of color and shape (filled and empty icons) to indicate the value. In the event that you are using color as the only means to indicate the value, the information should also be also displayed as text, as in this demo. This is important to meet [WCAG 2.2 Success Criterion 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

{{"component": "file://./demos/text/index.ts"}}

### ARIA

The read only rating has a role of "img", and an aria-label that describes the displayed rating.

### Keyboard

Because the rating component uses radio buttons, keyboard interaction follows the native browser behavior. Tab will focus the current rating, and cursor keys control the selected rating.

The read only rating is not focusable.

## Testing

When testing the Rating component in environments such as Jest with jsdom, certain user interactions—especially hover-based interactions—may not behave as expected.
This is because the component relies on `getBoundingClientRect()` to calculate the position of each icon and determine which icon is currently being hovered.
In jsdom, `getBoundingClientRect()` returns `0` values by default, which can lead to incorrect behavior such as `NaN` being passed to the `onChange` handler.

To avoid this issue in your test suite:

- Prefer `fireEvent` over `userEvent` when simulating click events.
- Avoid relying on hover behavior to trigger changes.
- If needed, mock `getBoundingClientRect()` manually for more advanced interactions.

```tsx
// @vitest-environment jsdom

import { Rating } from '@mui/material';
import { render, fireEvent, screen } from '@testing-library/react';

import { describe, test, vi } from 'vitest';

describe('Rating', () => {
  test('should update rating on click', () => {
    const handleChange = vi.fn();
    render(<Rating onChange={(_, newValue) => handleChange(newValue)} />);

    fireEvent.click(screen.getByLabelText('2 Stars'));

    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
```
