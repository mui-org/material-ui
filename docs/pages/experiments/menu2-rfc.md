---
title: 'RFC draft: Menu successor with submenu support'
description: A proposal for a Base UI-backed Menu successor, with submenu support and Material UI customization.
---

# RFC draft: Menu successor with submenu support

<p class="description">This is a draft for maintainer review, not an approved release plan. Please add review comments on this file.</p>

Suggested issue title: `[RFC] Menu: Base UI-based successor with submenu support`

The sections match `.github/ISSUE_TEMPLATE/3.rfc.yml`. Companion experiments: [playground](/experiments/menu2-playground/), [recipes](/experiments/menu2-recipes/).

## What's the problem?

Material UI's `Menu` does not support submenus. [#11723](https://github.com/mui/material-ui/issues/11723) tracks the request since 2018. The v0.x component had nested menus, but the v1 rewrite removed them.

The [Menubar docs](https://mui.com/material-ui/react-menubar/) show how to compose Base UI submenus. Users have asked for a packaged component instead ([#48336](https://github.com/mui/material-ui/issues/48336)). Copied examples and community packages do not provide a submenu API that Material UI maintains and tests.

We propose a Base UI-backed successor with Material visuals and full theme support. The current `Menu` stays stable. This integration also tests rules for future Material UI components built on Base UI; it does not commit every component to the same API shape.

## What are the requirements?

1. **Correct behavior at any nesting depth:** trigger semantics, RTL-aware arrow keys, Escape that closes one level, focus return to the parent item, and typeahead at each level.
2. **Pointer support:** hover-open delays and safe diagonal travel from a trigger to its submenu.
3. **Positioning:** flip at boundaries, track the anchor, and limit the popup to the available space.
4. **Material presentation and customization:** shared styles, `sx`, utility classes, root composition, slots, and theme `defaultProps`/`styleOverrides`/`variants`.
5. **Low cost for existing users:** preserve the classic API and behavior. Keep Base UI out of bundles that do not use the successor. Measure the shared-style and barrel costs separately.
6. **Familiar API where possible:** document changed behavior and features with no direct replacement.
7. **Related menu features:** checkbox and radio items, labeled groups, and hover-open. A dedicated context menu follows separately.
8. **Maintained behavior:** reuse Base UI's focus, dismissal, and positioning logic.
9. **Normal Material UI integration:** standard imports, tooling, theming, and tests. Users must not need a separate Base UI installation.

## What are our options?

### Option A: Add submenus to the existing Menu

Earlier attempts show the integration risks:

| Attempt                                                 | Approach                       | Main concern                                                           |
| :------------------------------------------------------ | :----------------------------- | :--------------------------------------------------------------------- |
| [#14700](https://github.com/mui/material-ui/pull/14700) | Nested Menu components         | Required changes to the menu implementation and API.                   |
| [#20591](https://github.com/mui/material-ui/pull/20591) | A `subMenu` prop on `MenuItem` | Bundle cost, hover intent, positioning, and regression risk.           |
| [#37570](https://github.com/mui/material-ui/pull/37570) | A docs demo                    | Accessibility review found problems with Escape and submenu semantics. |

The current stack is `Menu → Popover → Modal`. Nested instances have separate backdrops and focus traps. `ModalManager` hides content outside the top modal, including the parent menu. `MenuList` has no shared submenu navigation state, and `Popover` does not flip to the other side of an anchor.

Supporting submenus would require changes across that stack or a separate behavior path within the existing API. Base UI already supplies the coordinated menu tree. We reject this option because it adds risk to existing consumers and duplicates that work.

### Option B: Leave it as copy-paste docs code

Useful as an example, but not the end state. Users still own the integration, updates, tests, and theme contract.

### Option C: Wait for the next major

This delays the feature and API feedback. An unstable successor lets us test the proposal without replacing the current `Menu`.

### Option D: A successor built on Base UI, shipped as public unstable (proposed)

[Base UI Menu](https://base-ui.com/react/components/menu) supplies submenu navigation, hover intent, focus return, typeahead, and collision handling. Material UI supplies presentation, customization, and the public API.

This reduces new behavior code, but does not remove integration work. We must test the composed result and document the differences below.

## Proposed solution

Build on the [proof of concept](https://github.com/mui/material-ui/pull/48663) and [companion experiment](https://github.com/mui/material-ui/pull/48823).

The team chose explicit root, trigger, and popup components. See [API shape](#api-shape-explicit-root-trigger-and-popup) for the reasons.
The implementation separates behavior from the trigger and popup surfaces.
Detached triggers are outside the initial release; their API and recipe have been removed.

### Positioning (decided)

Ship under `Unstable_` while the API settles, with one component per subpath:

```jsx
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
```

The classic `Menu` keeps its API. Classic and successor items share `MenuItemBase` and the focus and hover styles. Menu2 popups and indicators also share styled bases. The Menu2 surface and item theme styles apply before the more specific component styles. Default checkbox and radio indicators use `ListItemIcon`, so icon-column selectors also apply to them. The experiment also adds a `defaultMuiPrevented` check to `useButtonBase`, so Base UI can own Enter and Space activation without ButtonBase activating the item again.

### Rules for Base UI-backed components (Menu is the first)

- **Customization:** use `render` for `Menu2Trigger`, `Menu2Item`, `Menu2LinkItem`, `Menu2CheckboxItem`, and `Menu2RadioItem`. Items keep Material styles, indicators, and ripple without a `component` prop or root slot API. Forward the supplied children to keep indicators and ripple. Use Material UI `slots`/`slotProps` for internal parts, such as popup layers and indicators.
- **Slot handling:** use `useSlot` for the popup list. At Base UI render boundaries, reuse `appendOwnerState`, `resolveComponentProps`, and Material UI's `mergeSlotProps`. Use Base UI's `mergeProps` for behavioral props and compose refs. Keep adapters local until another integration needs them. These adapters filter Material props from host elements, combine state-based classes, infer native buttons, and prevent duplicate keyboard activation.
- **Style reuse:** share styled elements where practical; otherwise share style functions. Audit each consumer. Viewport-relative heights and item-adjacent divider rules do not transfer unchanged to Base UI's popup tree. New parts own their spacing; use `Menu2Separator` between items.
- **Presentation:** retain `dense`, `disableGutters`, and `divider`. Omit the visual-only `selected` prop; checkbox and radio items express checked state. Base UI owns behavior; Material UI owns styles.
- **Density:** set `slotProps.list.dense` on `Menu2Popup`. Submenus inherit this density and cannot override it. Item-level `dense` props remain available.
- **Dependency:** make `@base-ui/react` a direct dependency of `@mui/material`. Review version updates rather than auto-merge them. Test the upstream states used by the integration, including checked indicators, starting and ending transitions, and resolved placement.
- **Theme state:** keep `Mui-*` classes and `ownerState` as the Material customization contract. Item render callbacks, slot callbacks, and theme variants receive the live highlighted state and, where applicable, the checked or open state. Exit-tint tracking stays internal. Popup slot callbacks receive resolved public props, not live uncontrolled open state. Internal animation and placement styles can use Base UI attributes.
- **API boundary:** explicitly pick the forwarded root, trigger, and positioner props. New upstream props require API and routing review. This is not complete type isolation: changes to an exposed upstream type still reach Material UI. Keep Base UI's callback names and signatures: `onOpenChange(open, eventDetails)`, `onCheckedChange(checked, eventDetails)`, and `onValueChange(value, eventDetails)`.
- **Tooling and tests:** use normal theme type registration, API generation, and `describeConformance` for rendered parts. Test behavior differences and the integration boundary as well as the individual parts. Root components have behavior tests; popup conformance tests target the menu surface.

### API shape: explicit root, trigger, and popup

`Menu2` and `Menu2Submenu` own behavior and render no element. Each contains an explicit trigger and popup. `Menu2Popup` and `Menu2SubmenuPopup` combine Portal, Positioner, Popup, Paper, Grow, and List. This exposes the composition boundary without requiring callers to assemble every internal layer. Items, links, checkbox items, radio groups and items, groups, labels, and separators remain separate. Checkbox and radio indicators are internal defaults, not separate public components.

```jsx
<Menu2>
  <Menu2Trigger render={<Button>Options</Button>} />
  <Menu2Popup elevation={4}>
    <Menu2Item onClick={handleCut}>Cut</Menu2Item>
    <Menu2Submenu>
      <Menu2SubmenuTrigger>Share</Menu2SubmenuTrigger>
      <Menu2SubmenuPopup>
        <Menu2Item>Email</Menu2Item>
        <Menu2Item>Copy link</Menu2Item>
      </Menu2SubmenuPopup>
    </Menu2Submenu>
  </Menu2Popup>
</Menu2>
```

The trigger components have different presentation contracts:

- `Menu2Trigger` requires a `render` prop with an element or a render function. A custom component must forward props and its ref. A render function must pass the supplied props and ref to its element. Put `openOnHover`, `delay`, and `closeDelay` on `Menu2Trigger`. Put event handlers and trigger attributes on this component or the supplied element.
- `Menu2SubmenuTrigger` is a styled menu item, optionally inside a `Tooltip`. Put `disabled`, `label`, and hover props on that trigger. `Menu2Submenu` has no `disabled` prop or trigger slot.
- `Menu2Item`, `Menu2CheckboxItem`, and `Menu2RadioItem` infer `nativeButton` from a host render element, such as `render={<button />}`. For a custom component or render function that returns a native button, set `nativeButton`. Submenu triggers still infer it from their root slot and `component`. `Menu2Trigger` cannot infer it from a custom renderer; set its `nativeButton` prop when needed.

The explicit submenu trigger avoids registering one DOM node as both an item and a submenu trigger. It costs one public component and theme key, but gives the trigger one behavioral owner. An alternative would make a generic item switch its behavior according to context; this proposal keeps that distinction explicit.

For the classic controlled pattern, omit `Menu2Trigger`, set `open` on `Menu2`, and set `anchor` on `Menu2Popup`. The caller then owns the external button's ARIA attributes and the popup's accessible label. Set an explicit `finalFocus` target on the popup when the opening context must receive focus on close. See the [controlled-anchor example](/experiments/menu2-playground/#controlled-anchor).
`finalFocus` controls focus on close, not keyboard opening or initial item focus.
With only an external button's `onClick` handler, Enter opens onto the menu container; ArrowDown and ArrowUp do not open the menu.
A registered trigger supplies these handlers and focuses the first enabled item on Enter, Space, or ArrowDown, and the last on ArrowUp.
`Menu2Trigger` supplies that registration without a detached handle.

#### Customization targets

`Menu2Item` renders a styled `div` by default. Its optional `render` prop accepts an element or a function with props and typed item state. Custom renderers must forward props, ref, and children to preserve the ripple. Root attributes belong on the item or the supplied element; element-specific props and refs belong on that element. The `MuiMenu2Item` theme key and utility classes stay unchanged.

Checkbox and radio items use the same render contract, with `checked` in the render state. Forward the supplied children to keep both the indicator and ripple. The `indicator` slot remains available for separate customization.

`MuiMenu2` and `MuiMenu2Submenu` configure behavioral `defaultProps`. They have no DOM ref, `sx`, slots, style overrides, or theme variants. `MuiMenu2Trigger` also supports `defaultProps` only. The surface theme keys are `MuiMenu2Popup` and `MuiMenu2SubmenuPopup`, with their own exported class hooks.

Submenu popups inherit `MuiMenu2Popup` styles for their matching slots. All item roots inherit `MuiMenu2Item` styles. Shared overrides and variants apply first, then the component-specific theme styles, with `sx` last. CSS specificity still applies. Callbacks use the rendered component's state. Utility classes remain component-specific, and `defaultProps` do not pass between theme keys.

Use class selectors in `styleOverrides.root` for the highlighted state. Items retain the `dense`, `divider`, and `gutters` override keys from the classic MenuItem. The utility classes stay available; the classic MenuItem theme API is unchanged.

The [documented state data attributes](/material-ui/react-menu2/#state-data-attributes) are also public styling hooks. Keep the Base UI names, including `data-popup-open` on triggers and `data-open` on popup surfaces. Undocumented attributes and internal `data-mui-*` markers are not part of this contract.

Checkbox and radio items own their `indicator` slot. Set `icon` and `checkedIcon` on an item or in its theme `defaultProps` to change the icons. Use `slots.indicator`, `slotProps.indicator`, and the item's `styleOverrides.indicator` to customize the container. If `slotProps.indicator.children` is not `null` or `undefined`, it takes precedence over the icon props. Indicator class objects, utility helpers, and class types are exported from the owning item's subpath; the class names stay unchanged. Custom indicators receive these classes and the live checked, disabled, and highlighted state. They must forward props and their ref. The default indicators have no separate exports or theme keys.

| Target                        | Top-level props                                                                 | Slot         |
| :---------------------------- | :------------------------------------------------------------------------------ | :----------- |
| Shared stacking layer         | `container`, `keepMounted`                                                      | `portal`     |
| Positioned element            | Positioning props                                                               | `positioner` |
| Paper surface (`role="menu"`) | `ref`, `className`, `style`, `sx`, `elevation`, event handlers, HTML attributes | `root`       |
| Presentational list           | None                                                                            | `list`       |
| Animation                     | `transitionDuration`                                                            | `transition` |
| Root-menu backdrop            | None                                                                            | `backdrop`   |

These props and slots belong to the popup, not the behavioral root. The `portal` slot carries `theme.zIndex.modal` and contains both the positioner and the backdrop. This keeps the click blocker above Dialog when the menu is inside it. The backdrop stays behind the menu. Submenus use the parent menu's stacking context by default, so their `zIndex` cannot change the whole menu's stacking level. A `styled(Menu2Popup)` class attaches to the Paper surface. Root slot `sx` takes precedence over top-level `sx` for conflicting properties.

Each slot's ref targets its own element. Use `slotProps.positioner` for positioning props, styles, and the positioned element's ref; placement attributes such as `data-side` are on that element. The popup also accepts positioning props directly. Its forwarded ref targets the surface. With `keepMounted`, the default portal hides when its direct positioner becomes hidden, after the exit transition. Replacing `slots.portal` removes both its stacking and closed-state styles, so the replacement must supply them. The positioner is a slot, not a separate public component.

All popup HTML attributes reach the menu surface. Matching `slotProps.root` attributes take precedence. An explicit `aria-labelledby` takes precedence over `aria-label`; either replaces the inferred trigger name.

Popup event handlers observe navigation keys that Base UI stops before they reach the portal. Handlers in `slotProps.portal` observe only events that reach that element. Replacing a slot changes its rendered element, not the underlying Base UI provider.

#### Benchmark results

`Menu2Benchmark.test.tsx` compares the classic Menu and successor in a browser. These results describe the tested desktop configuration, not every device or assistive technology.

| Dimension              | Classic `Menu`                      | Successor                                          |
| :--------------------- | :---------------------------------- | :------------------------------------------------- |
| Open from trigger      | Caller connects the button          | Supplied trigger supports click and keyboard       |
| Initial keyboard focus | Depends on caller's open handling   | First enabled item; last enabled item with ArrowUp |
| Initial pointer focus  | Selected item, or first item        | Popup; no highlighted item                         |
| Disabled items         | Skipped by keyboard navigation      | Focusable, but not activatable                     |
| Escape                 | Closes and restores trigger focus   | Same at the root; submenus close one level         |
| Tab                    | Closes and returns focus to trigger | Closes and moves focus to the next element         |
| Body scrolling         | Locked                              | Locked                                             |
| Material backdrop      | Rendered                            | Transparent popup backdrop when modal              |
| Sibling `aria-hidden`  | Applied                             | Not applied                                        |
| Default placement      | Below trigger, aligned to start     | Same                                               |

Keep these differences and document them:

- **Initial focus:** keep Base UI's pointer-open behavior. No item is ready for accidental Enter activation. This differs from the [APG menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), which places focus on an item when a menu opens. Menu has no public `initialFocus` prop, so matching the classic behavior would require a local focus override.
- **Disabled items and Tab:** focusable disabled items and Tab leaving the menu follow the APG pattern.
- **Page treatment:** Menu2 does not use Material's modal stack. It shares only the page scroll lock with Modal and does not set `aria-hidden` on siblings. The absence of sibling `aria-hidden` is a DOM observation, not a complete screen-reader accessibility test.
- **Modality:** `modal` defaults to `true`. A modal menu locks page scroll for mouse, keyboard, and touch input, and its backdrop blocks outside clicks. Menus opened by hover are non-modal.

`variant="selectedMenu"` has no direct replacement. It makes the selected item the initial focus target in the classic Menu. A checked radio item records a value, but does not control initial focus in Menu2. The benchmark verifies that distinction. See the [upstream discussion of initial focus](https://github.com/mui/base-ui/issues/2143).

Other behavior and caveats:

- **Hover:** submenus open on hover by default, with a 100 ms delay and safe pointer travel. These defaults are configurable.
- **Item styles:** CSS `:hover` uses `action.hover`; `Mui-focusVisible` uses `action.focus`, or the ring under `theme.focusVisible`. Base UI's `highlighted` state remains a customization hook, but does not set the default focus tint.
- **Submenu indicator:** the default chevron points left in RTL. Custom content and components control their own direction; they are not mirrored. Use `slotProps.indicator` to change content or styles, or `slots.indicator` to replace the container. Set `slots.indicator` to `null` to omit it and its spacing.
- **Placement:** a submenu overlaps its parent by 4 px and starts 8 px above the trigger to account for list padding. Collisions can change the resolved placement.
- **Escape:** closes the innermost submenu and returns focus to its trigger. Set `closeParentOnEsc` on the submenu to request closure of the parent menus too.
- **Open tint:** an open submenu trigger uses `action.hover`. Hover-driven closes clear this tint when exit starts. Other closes keep it through exit to prevent a gap before focus returns. Exit timing is internal; `open` still reflects Base UI's logical state.
- **Focus outline after keyboard navigation:** with `theme.focusVisible`, the outline can follow the pointer after keyboard navigation. Base UI moves focus on hover, and the browser can preserve `:focus-visible`. We confirmed this in Chromium with real input. The classic Menu keeps focus and its outline on the keyboard-selected item. Accept this difference; no local focus override is planned.
- **Focus guards:** Base UI inserts guards beside root and submenu triggers while menus are open. Adjacency and child-position selectors can therefore match different elements. The guards use fixed positioning, so they do not add flex or grid gaps by themselves. Use `useFlexGap` when menus are direct children of a `Stack`; its default sibling-margin rule can move the first trigger when a guard is inserted before it. New parts own their spacing; a plain `Divider` still uses the classic adjacency rules. An upstream discussion of guard placement remains separate work.
- **Height:** the popup uses the smaller of the viewport limit and Base UI's available height, with internal scrolling.

### Known issues

- **Closing menus:** in Base UI 1.9.0, focus can stay on an item until its exit animation ends. Pressing Escape, then Enter during exit, can still activate that item. This affects Grow and CSS transitions, with or without `keepMounted`. Pointer blocking does not remove the closing menu from the accessibility tree. Track [Base UI issue #5519](https://github.com/mui/base-ui/issues/5519) and [draft PR #5537](https://github.com/mui/base-ui/pull/5537), which combines earlier focus return with native `inert`. Do not add `inert` alone: it can leave focus on the document body.
- **Portal-container refs on mount:** with `defaultOpen` or `keepMounted`, Base UI 1.9.0 can read a container ref before its element is attached. The portal then uses `document.body` instead of the requested container. Use a callback ref with state and pass the resolved element as `container`; an initial `null` makes the portal wait. The accessibility fixtures use this pattern. A general ref-resolution fix belongs upstream; no local runtime patch is included.
- **Scroll lock limits:** Menu2 uses the Modal scroll lock, so it has the same limits as Dialog. It does not lock a page where `html` scrolls the viewport, for example with `html { overflow-x: hidden }`. If other code changes the body overflow while the menu is open, the menu can restore an old value at close. A separate change can fix both for every Modal.
- **Retained menus in dialogs:** a `Menu2Popup` with `keepMounted` inside a kept-mounted Material Dialog can remain under `aria-hidden="true"` when it uses the default portal container. The menu is visible, but can be hidden from assistive technology. Leave `keepMounted` disabled on `Menu2Popup` in this configuration. Automatic integration is deferred. [Base UI issue #5577](https://github.com/mui/base-ui/issues/5577) describes a related portal limitation, but not this exact composition: Material's modal manager hides the retained Menu2 portal.

### Compatibility

Keep `dense`, `disableGutters`, `divider`, `keepMounted`, `container`, and Material's customization mechanisms. Theme keys change to `MuiMenu2*`; classic `MuiMenu` and `MuiMenuItem` overrides do not reach the successor.

Migration also changes open/close callbacks, positioning, initial focus, and transition completion. There is no direct equivalent for selected-item initial focus, independent scroll-lock control, or disabling the portal. The [prop map](#appendix-full-prop-mapping) records these limits. This is not a drop-in replacement.

Unlike a classic `MenuItem` with `href`, `Menu2LinkItem` does not support `disabled`. There is no direct replacement for a disabled link item.

### New capabilities

Submenus, checkbox and radio items with indicators, labeled groups, a supplied trigger with ARIA wiring, per-item typeahead labels, hover-open delays, and cancelable open changes with reasons.

### Where the experiment stands

The experiment implements the API above, shared styles, theme registration, RTL integration, live item state, ref composition, and Grow transitions. Tests cover conformance and the main interaction paths, including controlled state, canceled changes, nested Escape, and menus without a trigger.

Menu2 requires Base UI 1.9.0 or later. Version 1.9.0 includes the [menu tree fix](https://github.com/mui/base-ui/pull/5645) and the [transition state fix for retained menus](https://github.com/mui/base-ui/pull/5738). No local patch is needed. The regression tests remain in place.

The playground compares classic Menu and Menu2, focus indicators, transition choices, and reduced motion. [Public demos](/material-ui/react-menu2/), [generated API docs](/material-ui/api/menu-2/), and a [migration guide](/material-ui/migration/upgrade-to-menu-v2/) are available. The API generator covers the public components and excludes the private defaults.
Detached-trigger support has been removed. `Menu2Trigger` connects the supplied `render` element to the menu in the explicit composition API.

Remaining release work is listed once in the rollout plan.

### Decisions

These choices are proposed for maintainer review.

| Topic              | Decision and limit                                                                                                                                                                                                                                               |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animation          | Grow by default. Base UI owns mounting and completion. Compatible transition components or CSS remain options. See the transition contract below.                                                                                                                |
| Ripple             | Keep ButtonBase as the item root, not a nested interactive child. Forward `disableRipple` only when supplied so theme defaults apply. Base UI owns Enter and Space activation.                                                                                   |
| Elevation          | Keep the popup's `elevation` prop, default 8, with a root slot override.                                                                                                                                                                                         |
| Backdrop           | A modal root menu renders a transparent backdrop that blocks outside clicks. Slots and slot props customize it. `slots.backdrop: null` omits it. No submenu backdrop.                                                                                            |
| Imperative actions | Keep Base UI's `actionsRef`, which exposes `close()` and `unmount()`. There is no `action.updatePosition()` equivalent.                                                                                                                                          |
| Theme and refs     | Item, link, checkbox, and radio parts have `HTMLElement` refs; element-specific refs belong on their render elements. `Menu2SubmenuTrigger` still uses `OverridableComponent`. Popup refs target the `HTMLDivElement` surface. Behavioral roots have no DOM ref. |
| Item descriptions  | Use Material UI Tooltip for supplementary text or images, without links, buttons, or other controls. Preview Card is outside the initial release.                                                                                                                |
| Context menu       | A separate component later, with the correct accessibility behavior and touch long-press. Menu2 doesn't support context menus, and the docs and recipes don't show them.                                                                                         |
| Behavior defaults  | Keep Base UI behavior unless an integration requirement needs a change. Material UI owns the modal layer and adds start alignment, submenu offsets, and Grow.                                                                                                    |
| Open tint on close | Track the popup's ending state internally. Clear the exit tint when exit ends or the popup unmounts; do not add a timer or wait for focus return.                                                                                                                |
| Forced colors      | `enhanceHighContrast` styles the item parts and indicators. Disabled cues take precedence over highlight styling.                                                                                                                                                |

Menu2 passes `modal={false}` to Base UI and implements `modal` with Material UI parts. The scroll lock uses the `ModalManager` instance that Modal uses, so a menu and a Modal on one page share one lock. The backdrop slot blocks outside clicks for a modal root menu. Both are absent for hover-opened menus and `modal={false}`. Setting the backdrop slot to `null` lets outside clicks through and keeps the scroll lock.

### Resolved review questions

Keep the numbering for existing review references. "Resolved" means chosen in this proposal, not release-complete.

1. ✅ **Context menu:** a separate component. Menu2 doesn't support context menus, and the docs and recipes don't show them.

2. ✅ **Accessibility ownership:** Base UI supplies semantics and interaction; Material UI remains responsible for the composed result, styles, and public customization.

   The default light-theme focus tint has approximately 1.3:1 contrast against white. Sharing it with the classic item does not resolve the [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) gap. A library-wide state-style review remains separate work. Under `theme.focusVisible`, the item uses the classic inset ring instead of the focus tint; the inset avoids clipping in a scrolling popup. Shared styles do not imply identical keyboard-to-pointer behavior; see the caveat above.

   Dedicated axe fixtures check open, nested, and non-modal menus. Base UI 1.8.0 [fixes the portal owner role](https://github.com/mui/base-ui/pull/5058); `aria-required-children` now passes without an exception. In the non-modal fixture, axe reports an `aria-hidden-focus` failure for Base UI's focus guards. The open and nested fixtures report this rule as incomplete. All three fixtures report `aria-valid-attr-value` as incomplete for the trigger's `aria-controls` reference. The fixtures skip assertions for both rules, and `menus.a11y.json` records the results. Interaction tests check keyboard opening, Tab navigation, reference IDs, and the trigger's label and expanded state. The closing-state audit found the upstream gap listed under [known issues](#known-issues). Recheck it after the upstream fix.

   Repeat manual screen-reader checks after the composition API changes. Use NVDA with Firefox, and VoiceOver with Safari. Record the browser and screen-reader versions, then check:

   - The trigger announces its name, menu-button role, and expanded state.
   - Enter, Space, ArrowDown, and ArrowUp announce the expected first or last item.
   - Escape returns focus to the trigger. Tab and Shift+Tab leave the items without stopping on a hidden focus guard.

3. ✅ **Other defaults:** retain Base UI behavior with the documented Material presentation choices.

4. ✅ **SSR, client directive, and refs:** public modules have `'use client'`. The trigger can render on the server, but the portal popup is client-rendered, including with `defaultOpen` or `keepMounted`. Behavioral roots have no DOM ref. Caller-rendered parts have polymorphic refs; popup refs target the menu surface. The `positioner` and `portal` slot refs give access to their own elements.

5. ✅ **Base UI API exposure:** explicitly pick supported root, trigger, and positioning props. Detached-trigger APIs and horizontal `orientation` remain outside this API. Upstream changes to exposed types still require review.

6. ✅ **Open parent tint:** use `action.hover` while open. Keep it through exit except for hover-driven closes. Keep `Mui-open` tied to the logical open state. Exit timing has no public class, style override key, or slot callback state. A new open-state color token would be a separate design choice.

7. ✅ **Explicit composition:** keep one behavioral owner per trigger. Expose root, trigger, and popup components for both menus and submenus. Require `render` on `Menu2Trigger`. Keep the styled default and slots on `Menu2SubmenuTrigger`. A Material Menubar remains separate work.

8. ✅ **TypeScript minimum:** Material UI supports TypeScript 5 and later ([#49323](https://github.com/mui/material-ui/pull/49323)). This supports the `const` type parameters in Base UI declarations. Include all `MuiMenu2*` theme types in the standard Material UI theme types; no extra import is needed.

### Rollout plan

1. **Review the proposal:** the benchmark and API experiment are ready for maintainer feedback.
2. **Prepare an unstable release:** target a v9 minor release after review.
   - Review the explicit root, trigger, and popup API. Keep detached triggers outside this release.
   - Verify the built package with the supported TypeScript versions, including Menu2 and its theme types.
   - Keep generated PropTypes and API docs aligned with the public components.
   - Keep the public demos and migration guide aligned with the final API and behavior decisions.
   - Validate accessibility in open and nested menus. Record known inherited gaps rather than treating shared styles as proof of compliance.
   - Refresh bundle measurements and run release checks, including browser and visual regressions. Historical results do not validate the release revision.
3. **Stabilize after feedback:** remove `Unstable_` when the API settles. Replacing the classic `Menu` requires a separate migration and release decision.

### Appendix: full prop mapping

Open-state props and callbacks belong to `Menu2` or `Menu2Submenu`.
Positioning, focus return, portal, transition, and surface props belong to `Menu2Popup` or `Menu2SubmenuPopup`.
Trigger behavior belongs to the trigger component.

<details>
<summary>1. Open and close</summary>

| Classic Menu             | New equivalent                     | Notes                                                                                          |
| :----------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------- |
| Required `open`          | `open` or `defaultOpen`            | Controlled and uncontrolled modes.                                                             |
| `onClose(event, reason)` | `onOpenChange(open, eventDetails)` | Reports both opening and closing. Details include the event, reason, and cancellation methods. |
| No direct equivalent     | `onOpenChangeComplete(open)`       | Reports completion after popup animations. Not an enter-start callback.                        |

</details>

<details>
<summary>2. Positioning</summary>

| Classic Menu / Popover                                | New equivalent                                                        | Notes                                                                                      |
| :---------------------------------------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `anchorEl`                                            | `anchor`                                                              | Also accepts refs and virtual elements. Defaults to the supplied trigger.                  |
| `anchorOrigin` + `transformOrigin`                    | `side`, `align`, `sideOffset`, `alignOffset`                          | Placement model changes; animation origin follows resolved placement.                      |
| `anchorReference="anchorPosition"` + `anchorPosition` | Virtual `anchor`                                                      | Caller supplies its rectangle.                                                             |
| `marginThreshold` (16)                                | `collisionPadding` (5)                                                | Different defaults and collision model.                                                    |
| `anchorReference="none"`                              | No direct equivalent                                                  | Omitting `anchor` uses the trigger. Pass a virtual `anchor` at the position that you want. |
| `action.updatePosition()`                             | Automatic tracking                                                    | `disableAnchorTracking` stops anchor tracking; it is not an imperative update method.      |
| No direct equivalent                                  | `collisionBoundary`, `sticky`, `collisionAvoidance`, `positionMethod` | Additional positioning controls.                                                           |

</details>

<details>
<summary>3. Focus and modality</summary>

| Classic Menu                              | New equivalent               | Notes                                                                                                                           |
| :---------------------------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `autoFocus`, `disableAutoFocusItem`       | Base UI initial focus        | No direct override. Keyboard and pointer open differ.                                                                           |
| `variant="selectedMenu"`                  | No direct equivalent         | Checkbox and radio items express checked state, not initial focus.                                                              |
| `disableAutoFocus`, `disableEnforceFocus` | No direct equivalent         | `modal` controls outside interaction, not each classic focus option independently.                                              |
| `disableRestoreFocus`                     | `finalFocus={false}`         | A ref or function can instead set the return target.                                                                            |
| `disableScrollLock`                       | No independent equivalent    | `modal={false}` also permits outside interaction. Hover-opened menus do not lock.                                               |
| `hideBackdrop`                            | `slots={{ backdrop: null }}` | Omits the backdrop. Outside clicks reach the page, and the scroll lock stays.                                                   |
| `disablePortal`                           | No equivalent                | The popup always uses a portal.                                                                                                 |
| `keepMounted`, `container`                | Same props                   | Client-side portal controls; they do not render the popup on the server. `container` takes an element or a ref, not a function. |

</details>

<details>
<summary>4. Transitions</summary>

| Classic Menu                               | New equivalent                                                            |
| :----------------------------------------- | :------------------------------------------------------------------------ |
| `TransitionComponent` / `slots.transition` | `slots.transition`, default Grow; `null` for CSS-only animation           |
| `transitionDuration`                       | Same prop: `'auto'`, milliseconds, or separate enter and exit durations   |
| `onTransitionEnter`                        | Transition slot start callbacks, where applicable                         |
| `onTransitionExited`                       | `onOpenChangeComplete(false)` for popup close completion                  |
| `closeAfterTransition`                     | Base UI controls unmounting after popup animations; no equivalent boolean |

Grow animates the popup itself with height-dependent timing. The adapter waits for Base UI's starting state to finish and keeps the opening surface focusable. Current Grow uses Material UI's internal Transition, not react-transition-group. Base UI observes browser animations and owns unmounting and `onOpenChangeComplete`.

A custom transition must forward its child's props and ref, animate that same popup element, and add no DOM wrapper. It must start in time for Base UI to detect the browser animation. Compatibility is tested for Grow, Fade, and Zoom; an arbitrary transition needs validation.

Use `onOpenChangeComplete`, not `slotProps.transition.onEntered` or `onExited`: Base UI can unmount the transition before its completion timer fires. The adapter owns `in`, `appear`, `mountOnEnter`, and `unmountOnExit`. Start callbacks and easing remain available. A slot's `timeout` overrides `transitionDuration`; automatic duration is only passed to a transition that declares support.

`keepMounted` retains a closed popup; it does not replace transition completion. Material transitions follow `theme.motion.reducedMotion`. CSS animations must apply a reduced-motion policy separately.

For CSS-only animation:

```tsx
<Menu2Popup
  slots={{ transition: null }}
  slotProps={{
    root: {
      sx: {
        transition: 'opacity 250ms',
        '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
        '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
      },
    },
  }}
>
  <Menu2Item>Profile</Menu2Item>
</Menu2Popup>
```

This example follows the system preference. The playground also shows the theme policy, including `always` and `never`. `transitionDuration` has no effect when `slots.transition` is `null`.

</details>

<details>
<summary>5. Styling and slots</summary>

| Classic Menu                           | New equivalent                                     | Notes                                        |
| :------------------------------------- | :------------------------------------------------- | :------------------------------------------- |
| `root` slot                            | Popup's `portal` slot                              | Shared stacking layer.                       |
| `paper` slot                           | Popup's `root` slot                                | Paper surface with the menu role.            |
| `list`, `transition`, `backdrop` slots | Same names on the popup                            | Backdrop is available only on the root menu. |
| No direct equivalent                   | `positioner` slot                                  | Positioning styles, attributes, and ref.     |
| `elevation`                            | Same prop, default 8                               | Forwarded to Paper.                          |
| Paper viewport height limit            | `min(calc(100vh - 96px), var(--available-height))` | Also respects available collision space.     |
| `BackdropProps`                        | `slotProps.backdrop`                               | Customizes the backdrop.                     |
| `PopoverClasses`                       | No equivalent                                      | Menu2 does not render Popover.               |

</details>

<details>
<summary>6. Item props</summary>

| Classic MenuItem / MenuList                                        | New equivalent                          | Notes                                                                                                                                             |
| :----------------------------------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `dense`, `disableGutters`, `divider`                               | Same props                              | Presentation remains Material-owned.                                                                                                              |
| `<Divider />`                                                      | `Menu2Separator`                        | Owns its margins, including beside submenu focus guards.                                                                                          |
| `selected`                                                         | Removed                                 | Use dedicated checkbox and radio items for checked state.                                                                                         |
| `disabled`                                                         | Same prop on supported item parts       | Disabled items remain focusable. `Menu2LinkItem` does not support `disabled`.                                                                     |
| No equivalent                                                      | `closeOnClick`                          | Defaults to `true` on Menu2Item; `false` on link, checkbox, and radio items. Submenu triggers open the submenu instead of activating a leaf item. |
| `href` / `LinkComponent`                                           | `Menu2LinkItem`                         | Renders an anchor by default; use `render={<RouterLink to="/profile" />}` for a routing link.                                                     |
| Item `autoFocus`                                                   | No dedicated equivalent                 | Base UI owns initial menu focus.                                                                                                                  |
| `disableRipple`                                                    | Same prop                               | `MuiButtonBase` theme defaults apply unless overridden.                                                                                           |
| `focusVisibleClassName`, `onFocusVisible`, `action.focusVisible()` | No dedicated Menu2 equivalents          | Use state classes for styling. `highlighted` includes pointer navigation and is not equivalent to keyboard focus-visible.                         |
| `MenuList.disableListWrap`                                         | `loopFocus`, default `true`             | Inverse boolean.                                                                                                                                  |
| `MenuList.autoFocus` / `autoFocusItem` / `variant`                 | No direct equivalent                    | Initial focus follows Base UI behavior.                                                                                                           |
| `MenuList.disablePadding`, `subheader`                             | `slotProps.list`, group and label parts | Use semantic groups for labeled sections.                                                                                                         |

</details>

## Resources and benchmarks

- [Proof of concept #48663](https://github.com/mui/material-ui/pull/48663) and [experiment #48823](https://github.com/mui/material-ui/pull/48823).
- Main requests: [nested menus #11723](https://github.com/mui/material-ui/issues/11723), [packaged Menubar #48336](https://github.com/mui/material-ui/issues/48336), and [nested menu docs #45790](https://github.com/mui/material-ui/issues/45790).
- [Base UI Menu](https://base-ui.com/react/components/menu), [release history](https://base-ui.com/react/overview/releases), and [initial-focus discussion](https://github.com/mui/base-ui/issues/2143).

### Bundle cost

These measurements compare `2d07df256a` with the merge base `f0a678be0b`, using the same installed dependencies and build tools.
They include the explicit Root/Trigger/Popup API and exclude the removed Material detached-trigger API.
Both revisions use production ESM builds, Node.js 24.16.0, Vite 8.3.4, and gzip level 9.
React, React DOM, `@emotion/react`, and `@emotion/styled` are external.
The Menu2 measurements include Base UI 1.9.0 without a local patch.
These are import bundles, not complete applications. Sizes use decimal kB.

Each menu case includes Button. The classic case adds Menu and MenuItem; the Menu2 case adds Menu2, Menu2Trigger, Menu2Popup, and Menu2Item.
The submenu case also adds Menu2Submenu, Menu2SubmenuTrigger, and Menu2SubmenuPopup.
The high-contrast case adds `enhanceHighContrast` from `@mui/material/styles` to the classic imports.
The table uses component subpath imports. The Menu2 imports use the `Unstable_` prefix.

| Imports                             | Minified kB | Gzip kB |
| :---------------------------------- | ----------: | ------: |
| Classic Menu, merge base            |     126.497 |  40.481 |
| Classic Menu, this PR               |     127.773 |  40.937 |
| Classic + high contrast, merge base |     135.742 |  42.369 |
| Classic + high contrast, this PR    |     139.770 |  43.318 |
| Menu2                               |     238.824 |  78.404 |
| Menu2 with submenu                  |     247.538 |  80.812 |
| Classic Menu and Menu2              |     269.223 |  87.999 |
| Classic Menu and Menu2 with submenu |     277.930 |  90.487 |

The classic subpath case grows by **456 B gzip**. Named barrel imports grow by **470 B gzip**.
Button-only imports grow by **14 B gzip** through either import path.
With `enhanceHighContrast`, the classic case grows by **949 B gzip**, including the new Menu2 styles in the helper.
None of these classic-only cases retains Base UI or Floating UI modules.
These are total PR costs for the measured imports, not only the cost of shared styles or a guarantee for every classic component.

Menu2 is not a size reduction: it costs **37.467 kB gzip** more than the classic case.
Adding Menu2 alongside classic Menu costs **47.062 kB gzip** in this fixture.
Adding submenu support to the Menu2 case costs a further **2.408 kB gzip**.
Application results depend on the components and dependencies already in use.

Run `pnpm -r --filter @mui/material... build`, then `pnpm exec node test/bundle-size/menu2.mjs` to repeat the comparison.
The script also accepts a path to a baseline Material package build. Use the same installed dependencies for that build.
It checks the retained module graph and fails if classic imports include Base UI or Floating UI code, or if the selected Material build is not used.
Two runs of each revision produced identical results. Repeat the check on the release revision.
