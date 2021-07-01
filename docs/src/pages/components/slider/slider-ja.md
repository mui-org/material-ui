---
title: React Slider component
components: Slider, SliderUnstyled
githubLabel: 'component: Slider'
materialDesign: https://material.io/components/sliders
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#slider'
---

# Slider

<p class="description">スライダーを使用すると、ユーザーは値の範囲から選択できます。</p>

[Sliders](https://material.io/design/components/sliders.html) reflect a range of values along a bar, from which users may select a single value. 音量、明るさ、画像フィルタの適用などの設定を調整するのに最適です。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 連続スライダー

連続スライダーにより、ユーザーは主観的な範囲に沿って値を選択できます。

{{"demo": "pages/components/slider/ContinuousSlider.js"}}

## サイズ

小さいスライダーの場合は、`size="small"` を設定してください。

{{"demo": "pages/components/slider/SliderSizes.js"}}

## 個別のスライダー

個別のスライダーは、値インジケーターを参照することで特定の値に調整できます。 `marks={true}`で各ステップのマークを生成できます。

{{"demo": "pages/components/slider/DiscreteSlider.js"}}

### Small steps

デフォルトのステップ増分を変更できます。

{{"demo": "pages/components/slider/DiscreteSliderSteps.js"}}

### Custom marks

`marks`プロップに豊富な配列を提供することにより、カスタムマークを作成できます。

{{"demo": "pages/components/slider/DiscreteSliderMarks.js"}}

### Restricted values

`step={null}` を追加すると、選択可能な値を `marks` プロパティで指定した値に制限できます。

{{"demo": "pages/components/slider/DiscreteSliderValues.js"}}

### Label always visible

`valueLabelDisplay = "on"`すると、常にサムラベルを強制的に表示できます。

{{"demo": "pages/components/slider/DiscreteSliderLabel.js"}}

## Range slider

スライダーを使用して、 `value` プロパティに値の配列を供給することで、範囲の開始と終了を設定できます。

{{"demo": "pages/components/slider/RangeSlider.js"}}

### Minimum distance

`onChange` イベントハンドラー内の値の範囲を最小にするように強制できます。 デフォルトでは、あるつまみをドラッグしている途中に、別のつまみにポインタを移動すると、アクティブなつまみとホバリングしたつまみが入れ替わります。 `disableTouchListener` プロパティでこの機能を無効にできます。 最小距離に達した場合でも範囲を移動させたい場合は、 `onChange` で `activeThumb` パラメータを使います。

{{"demo": "pages/components/slider/MinimumDistanceSlider.js"}}

## Slider with input field

この例では、入力によって離散値を設定することができます。

{{"demo": "pages/components/slider/InputSlider.js"}}

## カラー

{{"demo": "pages/components/slider/ColorSlider.js"}}

## Customized sliders

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [オーバーライドについてのドキュメント](/customization/how-to-customize/) を参照してください。

{{"demo": "pages/components/slider/CustomizedSlider.js"}}

### 音楽プレーヤー

{{"demo": "pages/components/slider/MusicPlayerSlider.js"}}

## 垂直スライダー

{{"demo": "pages/components/slider/VerticalSlider.js"}}

**警告**: Chrome, Safari、および新しいEdgeバージョンなど WebKitをベースにしたすべてのブラウザでは、** ** `<Slider orientation="vertical" />` 水平方向([chromium issue #1158217](https://bugs.chromium.org/p/chromium/issues/detail?id=1158217) )に公開されます。 By applying `-webkit-appearance: slider-vertical;` the slider is exposed as vertical.

However, by applying `-webkit-appearance: slider-vertical;` keyboard navigation for horizontal keys (<kbd class="key">Arrow Left</kbd>, <kbd class="key">Arrow Right</kbd>) is reversed ([chromium issue #1162640](https://bugs.chromium.org/p/chromium/issues/detail?id=1162640)). Usually, up and right should increase and left and down should decrease the value. If you apply `-webkit-appearance` you could prevent keyboard navigation for horizontal arrow keys for a truly vertical slider. This might be less confusing to users compared to a change in direction.

{{"demo": "pages/components/slider/VerticalAccessibleSlider.js"}}

## Track

Trackは、ユーザーが選択可能な範囲を表示します。

### Removed track

`track={false}` でTrackをオフにできます。

{{"demo": "pages/components/slider/TrackFalseSlider.js"}}

### Inverted track

`track="inverted"` でTrackを反転できます。

{{"demo": "pages/components/slider/TrackInvertedSlider.js"}}

## Non-linear scale

`scale` プロパティを使用して、異なるスケールの `value` を表すことができます。

In the following demo, the value _x_ represents the value _2^x_. Increasing _x_ by one increases the represented value by factor _2_.

{{"demo": "pages/components/slider/NonLinearSlider.js"}}

## Unstyled

<!-- #default-branch-switch -->

- 📦 [5.6 kB gzipped](https://bundlephobia.com/result?p=@material-ui/unstyled@next)

The slider also comes with an unstyled version. It's ideal for doing heavy customizations and minimizing bundle size.

```js
import SliderUnstyled from '@material-ui/unstyled/SliderUnstyled';
```

{{"demo": "pages/components/slider/UnstyledSlider.js"}}

## アクセシビリティ

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#slider)

コンポーネントは、アクセス可能にするために必要なほとんどの作業を処理します。 ただし、次の点を確認する必要があります。

- それぞれのつまみがユーザーフレンドリーなラベル(`aria-label`, `aria-labelledby` または `getAriaLabel` プロパティ)を持っていること
- それぞれのつまみが、現在の値をユーザーフレンドリーなテキストで示していること。 値がラベルのセマンティクスと一致する場合、これは必要ありません。 この名前は、 `getAriaValueText`または`aria-valuetext`プロパティを使用して変更できます。

## 制限事項

### IE 11

The slider's value label is not centered in IE 11. The alignement is not handled to make customizations easier with the lastest browsers. You can solve the issue with:

```css
.MuiSlider-valueLabel {
  left: calc(-50% - 4px);
}
```
