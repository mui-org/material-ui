---
title: React アコーディオン コンポーネント
components: Accordion, AccordionActions, AccordionDetails, AccordionSummary
githubLabel: 'component: Accordion'
materialDesign: https://material.io/archive/guidelines/components/expansion-panels.html
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#accordion'
---

# Accordion (拡張パネル)

<p class="description">Expansion panels(拡張パネル) には作成フローが含まれ、要素を簡単に編集できます。</p>

Reactアコーディオンコンポーネントは 単体で扱えるコンテナ、もしくはカードコンポーネントのようにより大きなコンポーネントと組み合わせて使います。

{{"component": "modules/components/ComponentLinkHeader.js"}}

> **注：** 拡張パネルについては、[Material Design guidelines](https://material.io/)では説明されていませんが、Material-UIでは引き続きサポートされます。 以前は"expansion panel"としてしられていたものです。

## 基本の Accordionコンポーネント

{{"demo": "pages/components/accordion/BasicAccordion.js", "bg": true}}

## Controlled Accordion

パネルのデフォルトの動作を拡張し、`Accordion`コンポーネントを使用してアコーディオンを作成します。

{{"demo": "pages/components/accordion/ControlledAccordions.js", "bg": true}}

## アコーディオンコンポーネントのカスタマイズ

コンポーネントのカスタマイズ例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/accordion/CustomizedAccordions.js"}}

## パフォーマンス

Accordionsのコンテンツは、パネルが展開されていない場合でもデフォルトでマウントされます。 このデフォルトの動作では、サーバー側のレンダリングとSEOが考慮されています。 パネルの中で高価なコンポーネント ツリーをレンダリングしたり、単に多くのパネルをレンダリングする場合は、`TransitionProps` の `unmountOnExit` を有効にして、このデフォルトの動作を変更するのが良いでしょう。

```jsx
<Accordion TransitionProps={{ unmountOnExit: true }} />
```

他のパフォーマンス最適化と同様、これは特効薬ではありません。 まずボトルネックを特定してから、これらの最適化戦略を試してください。

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#accordion)

最適なアクセシビリティのために、 `AccordionSummary``id` と `aria-controls` を設定することをお勧めします。 `Accordion` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。 最適なアクセシビリティのために、 `AccordionSummary``id` と `aria-controls` を設定することをお勧めします。 `Accordion` は、パネルのコンテンツ領域に必要な `aria-labelledby` および `id` を導き出します。
