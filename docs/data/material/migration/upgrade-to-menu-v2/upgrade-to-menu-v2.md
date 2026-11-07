# Upgrade to Menu v2

<p class="description">Move a menu from the Menu component to Menu v2: what to change, what behaves differently, and why.</p>

## Menu v2 status

Menu v2 is an unstable component in Material UI v9.
Import it from the `Unstable_Menu2` subpaths.
Its API can change in a minor release.

The current Menu isn't deprecated and keeps working unchanged.
You can adopt Menu v2 one menu at a time and use both components in the same app.

## Why you should upgrade

Menu v2 provides the following improvements over Menu:

- **Submenus** at any nesting depth, with correct keyboard, hover, and ARIA behavior.
  This was [one of the most requested Menu features since 2018](https://github.com/mui/material-ui/issues/11723), and the current Menu can't support it.
- **Checkbox and radio items** with the correct roles, `aria-checked`, and built-in indicators.
- **Groups with labels**, connected with `aria-labelledby`.
- **A trigger component** that sets `aria-haspopup`, `aria-expanded`, and `aria-controls`, so there's no anchor state to manage.
- **Collision-aware positioning** that flips and follows the anchor automatically.
- **Accessibility fixes** that the current Menu can't make without breaking existing behavior.
  See [Behavior changes](#behavior-changes).

### Why it's a new component

Every open Menu is a full `Modal` (`Menu` → `Popover` → `Modal`), and nesting one modal inside another breaks in six places:

1. **Backdrop.** Each menu renders a full-screen backdrop that captures clicks.
   A submenu's backdrop covers its parent, so clicking the parent closes the child.
2. **`aria-hidden`.** `ModalManager` applies it to everything except the topmost modal, so an open submenu hides its parent from screen readers.
3. **Keys.** ArrowRight and ArrowLeft do nothing in a vertical list, and there's no hook to open a submenu.
4. **Focus.** Each modal has its own focus trap, and the traps don't coordinate when a submenu closes.
5. **Collision.** `Popover` doesn't flip, so a submenu near the edge of the screen is clipped.
6. **State.** Each `MenuList` keeps its own keyboard state, and nested lists share none of it.

Fixing this in place means rewriting `Menu`, `MenuList`, `MenuItem`, `Popover`, `Modal`, `ModalManager`, and `FocusTrap`.
It also means replacing two models that `Dialog` and every `Popover` depend on: backdrop dismissal and per-modal focus traps.
Three attempts along those lines were abandoned ([#14700](https://github.com/mui/material-ui/pull/14700), [#20591](https://github.com/mui/material-ui/pull/20591), [#37570](https://github.com/mui/material-ui/pull/37570)).

Menu v2 uses [Base UI](https://base-ui.com/react/components/menu) instead, which already solves the behavior.
Base UI is a dependency of `@mui/material`, the same as `@popperjs/core`.
You don't install or import it, and apps that don't import Menu v2 don't bundle it.

## How to upgrade

### Static menu lists

For an always-visible `MenuList` inside `Paper`, keep `@mui/material/MenuList` and `@mui/material/MenuItem`.
Menu v2 has no standalone list component.
This also applies to the static list in [Menu List composition](/material-ui/react-menu/#composition-with-menu-list).

To change a static list into a popup, put `MenuTrigger` and `MenuPopup` inside `Menu`.
`MenuPopup` replaces the `Paper` and `MenuList` wrapper.
Then migrate the items as described in [Update the items](#6-update-the-items).
Omitting `MenuTrigger` does not make Menu v2 a static list; `MenuPopup` still renders a positioned popup in a portal.

### Context menus

Menu v2 doesn't support context menus.
Keep using Menu for them, as in the [Context menu](/material-ui/react-menu/#context-menu) demo.
Material UI plans to add a separate context menu component.
See [Context menu](/material-ui/react-menu2/#context-menu) for the reasons.

### 1. Update the imports

Each part is the default export of its own subpath:

```diff
-import Menu from '@mui/material/Menu';
-import MenuItem from '@mui/material/MenuItem';
+import Menu from '@mui/material/Unstable_Menu2';
+import MenuTrigger from '@mui/material/Unstable_Menu2Trigger';
+import MenuPopup from '@mui/material/Unstable_Menu2Popup';
+import MenuItem from '@mui/material/Unstable_Menu2Item';
```

Every other part follows the same `@mui/material/Unstable_Menu2<Part>` pattern.
For example, import `MenuSeparator` from `@mui/material/Unstable_Menu2Separator`.

The examples use `Menu`, `MenuItem`, and similar local names for the Menu v2 components imported from the `Unstable_Menu2` subpaths.

### 2. Replace the anchor state with a trigger

`Menu` owns state and behavior, `MenuTrigger` connects the button, and `MenuPopup` contains the items.
The anchor state and ARIA wiring go away.

After, with Menu v2:

```jsx
<Menu>
  <MenuTrigger render={<Button>Dashboard</Button>} />
  <MenuPopup>
    <MenuItem>Profile</MenuItem>
  </MenuPopup>
</Menu>
```

Before, with Menu:

```jsx
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);

<Button
  id="basic-button"
  aria-controls={open ? 'basic-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open}
  onClick={(event) => setAnchorEl(event.currentTarget)}
>
  Dashboard
</Button>
<Menu
  id="basic-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={() => setAnchorEl(null)}
  slotProps={{ list: { 'aria-labelledby': 'basic-button' } }}
>
  <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
</Menu>
```

Selecting a `MenuItem` closes the menu by default, so its `onClick={handleClose}` is no longer necessary.
Set `closeOnClick={false}` on a `MenuItem` to keep the menu open.

Pass your component to the required `render` prop of `MenuTrigger` to add the trigger behavior:

```jsx
<MenuTrigger
  render={
    <IconButton aria-label="More actions">
      <MoreVertIcon />
    </IconButton>
  }
/>
```

There's no default trigger, so the element is always yours.
Three things to watch:

- Forward props and ref from a wrapper component to the element it renders, the same as with `Tooltip`.
  Menu v2 merges the behavior through props, so a component that drops them doesn't open the menu.
- Set `nativeButton={false}` on `MenuTrigger` when the element doesn't render a native `<button>`.
- Use `MenuSubmenuTrigger` to open a submenu, not a button.
  See [Submenu](/material-ui/react-menu2/#submenu).

To control the open state, keep `MenuTrigger` and pass `open` and `onOpenChange` to `Menu`.
See [Controlled menu](/material-ui/react-menu2/#controlled-menu).
To keep the `anchorEl` pattern, omit `MenuTrigger` and pass `anchor` to `MenuPopup`.
See [Without a trigger](/material-ui/react-menu2/#without-a-trigger).

### 3. Update the open and close props

`onOpenChange` replaces `onClose`, and `open` becomes optional:

```diff
-<Menu open={open} onClose={handleClose}>
+<Menu open={open} onOpenChange={handleOpenChange}>
```

- `open` is no longer required.
  Use `defaultOpen` for an uncontrolled menu.
- `onClose(event, reason)` becomes `onOpenChange(open, eventDetails)`.
  It fires for opening and closing.
  Call `eventDetails.cancel()` to prevent the change.

Update any checks of the close reason:

| Menu `onClose` reason                                  | Menu v2 `eventDetails.reason` |
| :----------------------------------------------------- | :---------------------------- |
| `escapeKeyDown`                                        | `escape-key`                  |
| `backdropClick`                                        | `outside-press`               |
| `tabKeyDown`                                           | `focus-out`                   |
| No reason; an item's `onClick` handler closed the menu | `item-press`                  |

The `trigger-press` reason can report either opening or closing.
Check the `open` argument before you run close-only logic:

```js
function handleOpenChange(open, eventDetails) {
  if (!open && eventDetails.reason === 'trigger-press') {
    saveDraft();
  }
}
```

Tab and Shift+Tab report `focus-out`.
Other focus changes can report this reason too.
After Tab, `eventDetails.event` is a native `FocusEvent`.
After Shift+Tab, it is a native `KeyboardEvent`.

### 4. Update the positioning props

`side` and `align` on `MenuPopup`, with offsets, replace `anchorOrigin` and `transformOrigin`:

```diff
-<Menu
-  anchorEl={anchorEl}
-  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
-  transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
->
+<MenuPopup side="top" align="end">
```

`MenuPopup` uses the `MenuTrigger` element as its anchor.
Pass `anchor` to position the menu against another element, or when you omit `MenuTrigger`.

- `anchorEl` becomes `anchor`.
  It also accepts refs and virtual elements.
- `anchorOrigin` and `transformOrigin` become `side`, `align`, `sideOffset`, and `alignOffset`.
  The defaults are `side="bottom"` and `align="start"`.
- `anchorReference="anchorPosition"` with `anchorPosition` becomes `anchor={virtualElement}`.
  Give the virtual element the position that you want.
  For context menus, see [Context menus](#context-menus).
- `anchorReference="none"` has no direct equivalent.
  Omitting `anchor` uses the trigger.
  Pass a virtual `anchor` at the position that you want.
- `marginThreshold` (default 16) becomes `collisionPadding` on `MenuPopup` (default 5).
- `action.updatePosition()` is removed, because the position updates automatically.
  Use `disableAnchorTracking` to stop tracking layout shifts.
  `actionsRef` provides `close()` and `unmount()`.
- `PopoverClasses` is removed, because Menu v2 doesn't use `Popover`.
- `collisionBoundary`, `sticky`, `collisionAvoidance`, and `positionMethod` are new props.

Common origin pairs map to these values in left-to-right text:

<table>
  <thead>
    <tr>
      <th colspan="2" style="text-align:left">Menu</th>
      <th style="text-align:left">Menu v2</th>
    </tr>
    <tr>
      <th style="text-align:left"><code>anchorOrigin</code></th>
      <th style="text-align:left"><code>transformOrigin</code></th>
      <th style="text-align:left"><code>side</code> and <code>align</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>bottom, left</td>
      <td>top, left</td>
      <td><code>side="bottom" align="start"</code></td>
    </tr>
    <tr>
      <td>bottom, center</td>
      <td>top, center</td>
      <td><code>side="bottom" align="center"</code></td>
    </tr>
    <tr>
      <td>bottom, right</td>
      <td>top, right</td>
      <td><code>side="bottom" align="end"</code></td>
    </tr>
    <tr>
      <td>top, left</td>
      <td>bottom, left</td>
      <td><code>side="top" align="start"</code></td>
    </tr>
    <tr>
      <td>top, right</td>
      <td>bottom, right</td>
      <td><code>side="top" align="end"</code></td>
    </tr>
    <tr>
      <td>top, right</td>
      <td>top, left</td>
      <td><code>side="right" align="start"</code></td>
    </tr>
    <tr>
      <td>top, left</td>
      <td>top, left</td>
      <td><code>side="bottom" align="start"</code> with a negative <code>sideOffset</code>. See "Place the menu over its trigger" below.</td>
    </tr>
  </tbody>
</table>

Use the logical `inline-start` and `inline-end` sides to get the correct direction in right-to-left text.

#### Place the menu over its trigger

The classic [Positioned menu](/material-ui/react-menu/#positioned-menu) demo sets both origins to `top` / `left`, so the menu covers its trigger.
Use the anchor height to move Menu v2 up by the same distance:

```jsx
<Menu>
  <MenuTrigger render={<Button>Options</Button>} />
  <MenuPopup side="bottom" align="start" sideOffset={({ anchor }) => -anchor.height}>
    <MenuItem>Profile</MenuItem>
  </MenuPopup>
</Menu>
```

This matches the resting position in left-to-right text, not the animation origin.
Use `align="end"` in right-to-left text to keep physical left alignment.
Collision handling can still move the popup near viewport edges.

### 5. Check the transition

Move the transition props to `MenuPopup`.
They keep their names and defaults, except the `onEntered` and `onExited` callbacks:

- `slotProps.transition.onEntered` and `onExited` become `onOpenChangeComplete(open)` on `Menu`.
  It fires after the animation, with `true` after the menu opens and `false` after it closes.
- `slotProps.transition` no longer sets `in`, `appear`, `mountOnEnter`, `unmountOnExit`, or the unmount.
  Base UI controls them.

`slots.transition` still defaults to `Grow`, and `transitionDuration` still defaults to `'auto'`, so the duration depends on the menu height.
Set `slots.transition` to `null` to animate with CSS.
The menu surface then has the `data-starting-style` and `data-ending-style` attributes.
See [Transitions](/material-ui/react-menu2/#transitions).

### 6. Update the items

Separators, groups, links, and checked items become dedicated parts:

- `<Divider />` between items becomes `MenuSeparator`, which controls its own margins.
- `ListSubheader` becomes `MenuGroup` with `MenuGroupLabel`, which adds the correct ARIA relationship.
- Items with `href`, `LinkComponent`, or `component="a"` become `MenuLinkItem`, which renders a real `<a role="menuitem">`.
  For a router link, use `render={<RouterLink to="/profile" />}` and forward props, ref, and children to an anchor.
- Items with `role="menuitemcheckbox"` become `MenuCheckboxItem`.
  Its `checked` or `defaultChecked` prop replaces `selected`, and it reports the new state through `onCheckedChange(checked, eventDetails)`.
- Items with `role="menuitemradio"` become `MenuRadioItem` inside a `MenuRadioGroup`.
  Give each item a `value`, and set the current value with `value` or `defaultValue` on the group.
  The group reports the new value through `onValueChange(value, eventDetails)`.

In both callbacks, `eventDetails.event` is a native event, not a React synthetic event.
Its target can be a descendant of the item.

`MenuCheckboxItem`, `MenuRadioItem`, and `MenuLinkItem` keep the menu open by default.
Set `closeOnClick` on these items to close the menu after selection.

On `MenuItem`, `MenuLinkItem`, `MenuCheckboxItem`, `MenuRadioItem`, and `MenuSubmenuTrigger`, replace `component` with `render`.
Put custom component props on the supplied element:

```diff
-<MenuItem component="li">File</MenuItem>
+<MenuItem render={<li />}>File</MenuItem>
```

These parts have no root slot API.
Put root attributes on the item or its render element instead of `slotProps.root`.
A render function also receives the typed item state.
Forward its supplied props, ref, and children to the root element to preserve Material styles, indicators, and ripple.
Checkbox and radio items have separate `indicator` and `indicatorIcon` slots for the container and icon.
`MenuSubmenuTrigger` keeps its `indicator` slot and accepts `slots={{ indicator: null }}` to omit it.
See [Item customization](/material-ui/react-menu2/#item).

`MenuGroup` and `MenuRadioGroup` also use optional `render` instead of `component` or a root slot.
Forward props, ref, and children to keep group labels and behavior.
See [Group customization](/material-ui/react-menu2/#groups).

These item props work as before:

- `dense`, `disableGutters`, and `divider` are unchanged.
- `disabled` is unchanged on supported item parts, but disabled items now stay focusable.
  See [Behavior changes](#behavior-changes).
  `MenuLinkItem` does not support this prop.
- `disableRipple` is unchanged.
  The item root is a `ButtonBase`, so items ripple as before.

These `MenuList` props move or change:

- `MenuList.disableListWrap` becomes `loopFocus` on `Menu` (default `true`), with the value inverted.
- `MenuList.dense` and `MenuList.disablePadding` move to `slotProps.list` on `MenuPopup`.
  The `list` slot is a `List`, so the props are unchanged.
- Naming attributes on `slotProps.list` move to `MenuPopup`.
  See [Move popup props to MenuPopup](#8-move-popup-props-to-menupopup).

Removed item and `MenuList` props, such as `selected`, are listed in [Check the removed props](#9-check-the-removed-props).

Composed list primitives still work inside items, so `ListItemIcon`, `ListItemText`, and `Typography` carry over unchanged.
`ListItemText inset` still aligns with the icon column.

### 7. Update the theme keys

Move menu styles from `MuiMenu` to `MuiMenu2Popup`, and item styles from `MuiMenuItem` to `MuiMenu2Item`.
The `paper` slot is now the `root` slot:

```diff
 const theme = createTheme({
   components: {
-    MuiMenu: {
-      styleOverrides: { paper: { borderRadius: 12 } },
-    },
-    MuiMenuItem: {
-      styleOverrides: { root: { fontWeight: 500 } },
-    },
+    MuiMenu2Popup: {
+      styleOverrides: { root: { borderRadius: 12 } },
+    },
+    MuiMenu2Item: {
+      styleOverrides: { root: { fontWeight: 500 } },
+    },
   },
 });
```

The CSS classes use the same component names as the theme keys:

| Menu class       | Menu v2 class           | Submenu class                  |
| :--------------- | :---------------------- | :----------------------------- |
| `.MuiMenu-root`  | `.MuiMenu2Popup-portal` | `.MuiMenu2SubmenuPopup-portal` |
| `.MuiMenu-paper` | `.MuiMenu2Popup-root`   | `.MuiMenu2SubmenuPopup-root`   |
| `.MuiMenu-list`  | `.MuiMenu2Popup-list`   | `.MuiMenu2SubmenuPopup-list`   |

For example, change an `& .MuiMenu-list` selector to `& .MuiMenu2Popup-list`.
The `menu2PopupClasses` and `menu2SubmenuPopupClasses` exports provide these class names from `@mui/material/Unstable_Menu2Popup` and `@mui/material/Unstable_Menu2SubmenuPopup`.

Menu v2 has separate theme keys for behavior and presentation:

- `MuiMenu2` and `MuiMenu2Submenu` support `defaultProps` only.
  `Menu` and `MenuSubmenu` render no DOM element, so they have no ref, `sx`, or slots.
- `MuiMenu2Popup` and `MuiMenu2SubmenuPopup` style the popups.
  `MuiMenu2Popup` styles also apply to the matching submenu popup slots.
- Each item part has its own key, such as `MuiMenu2Item`.
  `MuiMenu2Item` styles apply to all item roots.
- `MuiMenu2Trigger` supports `defaultProps` only, such as `openOnHover`.
  The trigger element keeps its own styles.
  Theme its component, or style the `.MuiMenu2Trigger-root` class.

A part's own key applies after the shared key.
For example, `MuiMenu2CheckboxItem` overrides apply after `MuiMenu2Item` overrides, and `MuiMenu2SubmenuPopup` overrides apply after `MuiMenu2Popup` overrides.
This includes theme variants, but not `defaultProps`.
Utility classes remain specific to each part.

Item `variants` move from `MuiMenuItem` to `MuiMenu2Item` the same way as `styleOverrides`.
A variant that matches on `selected` no longer applies, because Menu v2 items don't have that prop.
Match on `checked` under `MuiMenu2CheckboxItem` or `MuiMenu2RadioItem` instead.

`MuiMenu2Popup` variants style only the menu surface, which is the `root` slot.
They don't style the portal that replaces `.MuiMenu-root`.
If a `MuiMenu` variant uses a `& .MuiMenu-paper` selector, move those styles to the top level of the variant `style`.

### 8. Move popup props to MenuPopup

Props that styled or named the menu surface now go on `MenuPopup`.
Each prop targets one element:

- `ref`, `className`, `style`, `sx`, event handlers, and HTML attributes target the menu surface, which is the `root` slot.
  `elevation` sets its Paper elevation, with the default 8.
- `side`, `align`, and `slotProps.positioner` target the positioned element.
- `slotProps.portal` sets the stacking level for the menu and its modal interaction layer.
- `slots` and `slotProps` also customize the `list`, `backdrop`, and `transition` slots.
  There's no `trigger` slot: put trigger props on `MenuTrigger`.

:::warning
Move menu naming attributes, such as `aria-label` and `aria-labelledby`, from `slotProps.list` to `MenuPopup` or its `slotProps.root`.
The list is now presentational, so a name on it is not announced.
:::

### 9. Check the removed props

Delete or replace each removed prop as shown in the tables.
A row that says only "Delete it." has no replacement.
The initial focus props, such as `autoFocus`, have none because Menu v2 sets the [initial highlight](#the-initial-highlight) itself.

**Menu**

| Props to remove        | What to do instead                                                                                                                                                                                        |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`            | Delete it.                                                                                                                                                                                                |
| `disableAutoFocusItem` | Delete it.                                                                                                                                                                                                |
| `variant`              | Delete it. If you used `"selectedMenu"` to show the current value, use radio items. See [The selectedMenu variant is gone](#the-selectedmenu-variant-is-gone).                                            |
| `disableAutoFocus`     | Delete it.                                                                                                                                                                                                |
| `disableEnforceFocus`  | Delete it.                                                                                                                                                                                                |
| `disableRestoreFocus`  | Use `finalFocus={false}` on `MenuPopup`.                                                                                                                                                                  |
| `disableScrollLock`    | Use `modal={false}` on `Menu`. It also keeps the rest of the document interactive.                                                                                                                        |
| `disablePortal`        | Delete it. Menu v2 always renders in a portal. Use `container` on `MenuPopup` to choose the portal target. See [Portal containers](#portal-containers).                                                   |
| `hideBackdrop`         | Delete it. The Menu backdrop is invisible, so this prop only stopped outside clicks from closing the menu. To keep that behavior, see [Keep the menu open](/material-ui/react-menu2/#keep-the-menu-open). |
| `action`               | Delete it. The position updates automatically. See [Update the positioning props](#4-update-the-positioning-props).                                                                                       |
| `PopoverClasses`       | Delete it. Menu v2 doesn't use `Popover`.                                                                                                                                                                 |

**MenuList**

| Props to remove          | What to do instead                                                                         |
| :----------------------- | :----------------------------------------------------------------------------------------- |
| `autoFocus`              | Delete it.                                                                                 |
| `autoFocusItem`          | Delete it.                                                                                 |
| `variant`                | Delete it. See [The selectedMenu variant is gone](#the-selectedmenu-variant-is-gone).      |
| `disabledItemsFocusable` | Delete it. Disabled items are always focusable. See [Behavior changes](#behavior-changes). |

**MenuItem**

| Props to remove         | What to do instead                                                                                                                                                                                                         |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autoFocus`             | Delete it.                                                                                                                                                                                                                 |
| `selected`              | For one current value, use `MenuRadioItem` inside a `MenuRadioGroup`, and add `closeOnClick` to close the menu on selection. For independent toggles, use `MenuCheckboxItem`. See [Update the items](#6-update-the-items). |
| `focusVisibleClassName` | Style `.Mui-focusVisible` for keyboard focus only. Style `.MuiMenu2Item-highlighted`, or `menu2ItemClasses.highlighted`, to also match pointer navigation.                                                                 |
| `onFocusVisible`        | Delete it.                                                                                                                                                                                                                 |
| `action`                | Delete it. Menu v2 items have no `action` methods, such as `focusVisible()`.                                                                                                                                               |

## Behavior changes

These changes are intentional and mostly bring the menu in line with the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).

- **Opened with a pointer:** Menu highlights the selected item, or the first item.
  Menu v2 highlights nothing.
  See [The initial highlight](#the-initial-highlight).
- **Opened with a keyboard:** Menu highlights an item.
  Menu v2 highlights the first enabled item, and ArrowUp highlights the last enabled item.
- **Disabled items:** Menu skips them with the keyboard by default.
  Menu v2 keeps them focusable with arrow keys and announces them as disabled, but they cannot be activated.
- **Sibling content:** Menu hides it from screen readers with `aria-hidden`.
  Menu v2 keeps it in the accessibility tree.
- **Backdrop:** Menu renders one by default.
  Menu v2 renders one for modal menus.
  See [Backdrop](#backdrop).
- **Tab while open:** Menu closes, and focus returns to the trigger.
  Menu v2 closes, and focus moves to the next element.
  Shift+Tab also closes Menu v2, and focus returns to the trigger.
- **Submenus:** Menu doesn't support them.
  Menu v2 opens them on mouse hover after 100 ms, touch tap, or keyboard activation.

Escape still closes the menu, and the default placement is still below the trigger, aligned to the start.

A mouse click on a submenu trigger does not bypass the hover delay.
Set `openOnHover={false}` on `MenuSubmenuTrigger` to disable hover opening and open with a mouse click instead.
Touch taps and keyboard activation remain available.
See [Submenu](/material-ui/react-menu2/#submenu).

### Backdrop

A modal menu renders a transparent backdrop that blocks outside clicks.
It is absent when the menu opens on hover or has `modal={false}`.
Set `slots.backdrop` or `slotProps.backdrop` on `MenuPopup` to customize it, or `slots={{ backdrop: null }}` to omit it.

### Scroll locking

`modal` defaults to `true`, which locks page scrolling, also for touch input.
Menus opened by hover are non-modal.

### Retained menus in dialogs

A `MenuPopup` with `keepMounted` inside a kept-mounted Material UI Dialog can remain under `aria-hidden="true"` with the default portal container.
The visible menu can then be hidden from assistive technology.

:::warning
Leave `keepMounted` disabled on `MenuPopup` inside a kept-mounted Dialog.
:::

### Portal containers

`container` on `MenuPopup` accepts an element or a ref, but not a function.
Replace `container={() => element}` with `container={element}`.

With `defaultOpen` or `keepMounted`, `MenuPopup` can read a `container` ref before its element is attached.
The menu then renders in `document.body` instead of the container.
Keep the container element in state with a callback ref, and pass that element to `container`.
While the value is `null`, the portal waits.

```jsx
const [container, setContainer] = React.useState(null);

<div ref={setContainer}>
  <Menu defaultOpen>
    <MenuTrigger render={<Button>Options</Button>} />
    <MenuPopup container={container}>
      <MenuItem>Profile</MenuItem>
    </MenuPopup>
  </Menu>
</div>;
```

### The initial highlight

This is the change your users are most likely to notice.
When they open a menu with a pointer, Menu v2 highlights nothing, so pressing Enter can't activate an item they didn't choose.
Native desktop menus behave this way.

This is a deliberate deviation from the ARIA Authoring Practices Guide (APG), which says that focus moves to an item when the menu opens, with no exception for pointer opens.
There's no prop to restore the classic behavior.
See the [Base UI discussion on initial focus](https://github.com/mui/base-ui/issues/2143) for the reasoning.

### The selectedMenu variant is gone

This is a lost feature rather than a changed one.
`variant="selectedMenu"` selected which item took focus when the menu opened.
`variant="menu"` focused the first item and, after a pointer open, hid its focus ring when another item was selected.
The new foundation can't express either behavior.

Radio items are the closest replacement, because they show the current value.
They don't control the initial highlight: Enter, Space, and ArrowDown highlight the first enabled item, even if another item is checked.

### Styling around triggers

While a menu or a submenu is open, Base UI renders hidden `span` elements next to its trigger.
They keep the tab order and the accessibility tree correct.
The focus guards among them have a `data-base-ui-focus-guard` attribute.

:::warning
Sibling selectors in CSS (`+`, `~`, `:last-child`) near a trigger can match these hidden elements.
Style each part directly instead.
:::

For menus directly inside a `Stack`, set `useFlexGap` to use CSS gap instead of sibling margins.
This prevents the trigger from moving when a focus guard is inserted before it.

### Menu height

The classic Menu limits its height to the viewport minus 96px.
Menu v2 keeps this limit, and also limits the height to the space available at the anchor, so the value reacts to collisions.
