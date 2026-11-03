---
title: Date and Time Pickers revamped
description: Check out the new features coming in v6 beta.
date: 2023-01-22T00:00:00.000Z
authors: ['josefreitas']
tags: ['MUI X', 'Product']
manualCard: true
---

There's a lot of exciting news in [MUI X v6.0.0-beta.0](https://github.com/mui/mui-x/releases/v6.0.0-beta.0), but there's hardly anything comparable to the revamp we're delivering for the Date and Time Pickers.

This is the result of our ongoing efforts to improve the usability and customizability of these components.
We kept the best aspects of the previous versions, and we're fleshing out the package with [new documentation](https://next.mui.com/x/react-date-pickers/), major new features, and one fundamental change: a new input type to replace the masked text fields.

## The new date and time fields

These new input components are called [Fields](https://next.mui.com/x/react-date-pickers/fields/), and they provide massive improvements to the experience of editing the value with a keyboard.

The previous generation of pickers, whose text input is based on a [mask approach](https://www.npmjs.com/package/rifm), are often cumbersome and fall flat on edge cases as well simple cases like modifying dates.

For example, watch what happens when we edit the month on this masked input:

<video style="width: 608px;" autoplay muted loop playsinline width="1216" height="310">
  <source src="/static/blog/v6-beta-pickers/masked-input-bad-ux.mp4" type="video/mp4" />
</video>

As you can notice, the day and year leak to the previous sections of the date, presenting a serious challenge to usability.

In contrast, the new fields are specialized in editing date and time values.
They recognize the values on the input (day, month, year, etc.) and respond accordingly.

<video style="width: 608px;" autoplay muted loop playsinline width="1216" height="310">
  <source src="/static/blog/v6-beta-pickers/basic-date-field.mp4" type="video/mp4" />
</video>

The Fields are included in the pickers, but they're also available as standalone components.
You can import them from the latest v6 package.

```jsx
import { DateField } from '@mui/x-date-pickers/DateField';

<DateField label="My first field" />;
```

They're by default used in the new Pickers (you don't need to declare a text field anymore).

```jsx
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

<DatePicker label="My first v6 picker" />;
```

## Enhanced keyboard usability

With the new Fields, the keyboard interaction is a first-class experience.
Not only can you type the date as text, but you can also use arrow keys to navigate and edit date and time values.

<video style="width: 608px;" autoplay muted loop playsinline width="1216" height="310">
  <source src="/static/blog/v6-beta-pickers/date-field-navigation.mp4" type="video/mp4" />
</video>

For a quick comparison, let's check out how the old and new approaches behave in typical scenarios.

<video autoplay muted loop playsinline width="1920" height="1080">
  <source src="/static/blog/v6-beta-pickers/quick-comparison-fields.mp4" type="video/mp4" />
</video>

Moreover, notice in the following example that as we edit the day, the component automatically navigates only in valid values.

<video style="width: 608px;" autoplay muted loop playsinline width="1216" height="274">
  <source src="/static/blog/v6-beta-pickers/smart-field-stable.mp4" type="video/mp4" />
</video>

:::info
**Behavior change alert**

During pre-releases, using <kbd class="key">Arrow Up</kbd> and <kbd class="key">Arrow Down</kbd> to update a date section would essentially update the entire field like you were navigating the calendar.
In the previous example, updating the day value from 28 to 1 would also update the month to March.

On the stable version, released after the original post, each date section is independent.
This behavior [has been changed](https://github.com/mui/mui-x/issues/7934) to be more consistent with native implementations.
:::

Please, try it out for yourself in the live demo below.

<iframe
  src="https://codesandbox.io/embed/date-field-demo-pb87v0?fontsize=12&hidenavigation=1&module=%2F"
  title="Date Field demo on CodeSandbox"
  style="width:100%; height:200px; border:0; border-radius: 4px; overflow:hidden;"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

### Fields roadmap

The Fields are still in beta, and there are many improvements on the way.
The following list describes some of the most notable features planned.

- **[Smart pasting](https://github.com/mui/mui-x/issues/7253)** \
  Date strings pasted in Fields will be parsed and matched with the sections of the date.
- **[Support days of the week](https://github.com/mui/mui-x/issues/7254)** \
  Users will be able to select a day in the week just like the can select a month.

We'd love to hear your [feedback](https://github.com/mui/mui-x/issues/new/choose) to help us improve these components even further.

## Other significant improvements

Now that you've seen what's fundamentally changed with the Pickers, let's briefly review some other noteworthy improvements.

- **[Customization of layout and internal components](https://next.mui.com/x/react-date-pickers/custom-layout/)** \
  Combining the concept of slots with the grid layout, you now can rearrange, extend, and customize most of the components used internally by the Pickers' views.
- **Default render input**\
  You don't need to provide the usual `TextField` on `renderInput` anymore unless you need it customized.
  In which case you can do it by:
  1. Customizing through props via `field` and `input` slots ([codebox example](https://codesandbox.io/p/sandbox/customizing-fields-with-props-o66r1c?file=/demo.tsx)).
  2. Build a new field component using the Field's headless API (documentation coming soon).
  3. Use an entirely [custom text field](https://next.mui.com/x/react-date-pickers/date-picker/#custom-input-component) to suit your use case.

- **Drag to edit**\
  Editing a date range is even easier now with the new drag-and-drop interface. Change `start` and `end` dates at will.

  <video autoplay muted loop playsinline width="1488" height="796">
    <source src="/static/blog/v6-beta-pickers/edit-drag.mp4" type="video/mp4" />
  </video>

- **Range shortcuts** (available from v6.0.0-beta.1)\
  Add quick and customizable shortcuts for your users. Choose to display them on the left, right, bottom or top.
  <img src="/static/blog/v6-beta-pickers/date-range-shortcuts.png" loading="lazy" alt="Date Range shortcuts." width="2222" height="1402" />

## Should we retire the masked inputs?

We believe that after using the date fields, you'll have no reason to come back to the masked input approach.
It has a few irreparable usability issues, and it sets some hard limits on what we can do with the input.

Our plan is to replace them entirely, but you can help us steer our roadmap.

If you want to voice your opinions or get involved, please consider scheduling a [user interview](https://forms.gle/7uq8PzE26FgwkPs46) with us.

As always, you can get in touch by opening new bug reports or feature requests in our [GitHub repository](https://github.com/mui/mui-x/issues/new/choose).
