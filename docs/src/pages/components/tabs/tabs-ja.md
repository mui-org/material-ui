---
title: React Tabs component
components: Tabs, Tab, TabScrollButton, TabContext, TabList, TabPanel
githubLabel: 'component: Tabs'
materialDesign: https://material.io/components/tabs
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#tabpanel'
---

# Tabs

<p class="description">タブでは、様々なビューの探索を切り替えを簡単に行うことができます。</p>

[タブ](https://material.io/design/components/tabs.html) は、関連し、同じ階層レベルにあるコンテンツのグループ間のナビゲーションを整理し、許可します。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## シンプルなタブ

A basic example with tab panels.

{{"demo": "pages/components/tabs/BasicTabs.js"}}

## Experimental API

`@material-ui/lab` offers utility components that inject props to implement accessible tabs following [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/#tabpanel).

{{"demo": "pages/components/tabs/LabTabs.js"}}

## ラップされたラベル

長いラベルはタブで自動的に折り返されます。 If the label is too long for the tab, it will overflow, and the text will not be visible.

{{"demo": "pages/components/tabs/TabsWrappedLabel.js"}}

## Colored tab

{{"demo": "pages/components/tabs/ColorTabs.js"}}

## 無効タブ

A tab can be disabled by setting the `disabled` prop.

{{"demo": "pages/components/tabs/DisabledTabs.js"}}

## 固定タブ

Fixed tabs should be used with a limited number of tabs, and when a consistent placement will aid muscle memory.

### 最大幅

小さいビューには、 `variant = "fullWidth"` プロパティを使用する必要があります。 このデモでは、 [react-swipeable-views](https://github.com/oliviertassinari/react-swipeable-views) を使用してタブの遷移をアニメーション化し、タッチデバイスでタブをスワイプできるようにします。

{{"demo": "pages/components/tabs/FullWidthTabs.js", "bg": true}}

### 中央揃え

より大きなビューには、`centered`プロパティを使用する必要があります。

{{"demo": "pages/components/tabs/CenteredTabs.js", "bg": true}}

## スクロール可能なタブ

### 自動スクロールボタン

左右のスクロールボタンはデスクトップに自動的に表示され、モバイルでは非表示になります。 （ビューポート幅に基づく）

{{"demo": "pages/components/tabs/ScrollableTabsButtonAuto.js", "bg": true}}

### 強制スクロールボタン

Left and right scroll buttons be presented (reserve space) regardless of the viewport width with `scrollButtons={true}` `allowScrollButtonsMobile`:

{{"demo": "pages/components/tabs/ScrollableTabsButtonForce.js", "bg": true}}

If you want to make sure the buttons are always visible, you should customize the opacity.

```css
.MuiTabs-scrollButtons.Mui-disabled {
  opacity: 0.3;
}
```

{{"demo": "pages/components/tabs/ScrollableTabsButtonVisible.js", "bg": true}}

### スクロールボタンを防ぐ

Left and right scroll buttons are never be presented with `scrollButtons={false}`. All scrolling must be initiated through user agent scrolling mechanisms (e.g. left/right swipe, shift mouse wheel, etc.)

{{"demo": "pages/components/tabs/ScrollableTabsButtonPrevent.js", "bg": true}}

## カスタマイズされたタブ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/tabs/CustomizedTabs.js"}}

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/styles/tabs/) を確認すると良いでしょう。

## 垂直タブ

タブラベルは、すべてアイコンまたはすべてテキストのいずれかです。

{{"demo": "pages/components/tabs/VerticalTabs.js", "bg": true}}

Note that you can restore the scrollbar with `visibleScrollbar`.

## Nav tabs

By default, tabs use a `button` element, but you can provide your custom tag or component. 次に、タブナビゲーションを実装する例を示します。

{{"demo": "pages/components/tabs/NavTabs.js"}}

## Icon tabs

タブラベルは、すべてアイコンまたはすべてテキストのいずれかです。

{{"demo": "pages/components/tabs/IconTabs.js"}}

{{"demo": "pages/components/tabs/IconLabelTabs.js"}}

## サードパーティ製ルーティングライブラリ

One frequent use case is to perform navigation on the client only, without an HTTP round-trip to the server. The `Tab` component provides the `component` prop to handle this use case. Here is a [more detailed guide](/guides/routing/#tabs).

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#tabpanel)

The following steps are needed in order to provide necessary information for assistive technologies:

1. Label `Tabs` via `aria-label` or `aria-labelledby`.
2. `Tab`s need to be connected to their corresponding `[role="tabpanel"]` by setting the correct `id`, `aria-controls` and `aria-labelledby`.

An example for the current implementation can be found in the demos on this page. We've also published [an experimental API](#experimental-api) in `@material-ui/lab` that does not require extra work.

### Keyboard navigation

The components implement keyboard navigation using the "manual activation" behavior. If you want to switch to the "selection automatically follows focus" behavior you have pass `selectionFollowsFocus` to the `Tabs` component. The WAI-ARIA authoring practices have a detailed guide on [how to decide when to make selection automatically follow focus](https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus).

#### Demo

The following two demos only differ in their keyboard navigation behavior. Focus a tab and navigate with arrow keys to notice the difference, e.g. <kbd class="key">Arrow Left</kbd>.

```jsx
/* Tabs where selection follows focus */
<Tabs selectionFollowsFocus />
```

{{"demo": "pages/components/tabs/AccessibleTabs1.js", "defaultCodeOpen": false}}

```jsx
/* Tabs where each tab needs to be selected manually */
<Tabs />
```

{{"demo": "pages/components/tabs/AccessibleTabs2.js", "defaultCodeOpen": false}}
