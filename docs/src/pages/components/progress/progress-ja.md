---
title: Circular, Linear progress React components
components: CircularProgress, LinearProgress
githubLabel: 'component: CircularProgress'
materialDesign: https://material.io/components/progress-indicators
---

# Progress

<p class="description">一般にスピナーと呼ばれる進行状況インジケータは、指定されていない待機時間を表したり、プロセスの長さを表示します。</p>

進行状況インジケータは 、アプリの読み込み、フォームの送信、更新の保存など、進行中のプロセスのステータスをユーザーに通知します。

- **Determinate** インジケーターは、操作にかかる時間を表示します。
- **Indeterminate**インジケータは、不特定の待機時間を視覚化します。

Componentのアニメーションは、JavaScript が読み込まれる前でも可能な限り動作するよう、CSS に依存しています。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Circular

### Circular indeterminate

{{"demo": "pages/components/progress/CircularIndeterminate.js"}}

### Circular color

{{"demo": "pages/components/progress/CircularColor.js"}}

### Circular determinate

{{"demo": "pages/components/progress/CircularDeterminate.js"}}

### Interactive integration

{{"demo": "pages/components/progress/CircularIntegration.js"}}

### Circular with label

{{"demo": "pages/components/progress/CircularWithValueLabel.js"}}

## Linear

### Linear indeterminate

{{"demo": "pages/components/progress/LinearIndeterminate.js"}}

### Linear color

{{"demo": "pages/components/progress/LinearColor.js"}}

### Linear determinate

{{"demo": "pages/components/progress/LinearDeterminate.js"}}

### Linear buffer

{{"demo": "pages/components/progress/LinearBuffer.js"}}

### Linear with label

{{"demo": "pages/components/progress/LinearWithValueLabel.js"}}

## Non-standard ranges

進捗コンポーネントは、0〜100の範囲の値を受け入れます。 これにより、これらがデフォルトの最小値/最大値であるスクリーンリーダーユーザーの作業が簡素化されます。 ただし、場合によっては、値がこの範囲外のデータソースを使用している場合があります。 範囲内の値を0〜100のスケールに簡単に変換する方法は次のとおりです。

```jsx
// MIN = 最小値
// MAX = 最大値
// 値を正規化する関数(MIN / MAX が積分される)
const normalise = value => (value - MIN) * 100 / (MAX - MIN);

// レンダリング時に「正規化」関数を使うComponentの例です
function Progress(props) {
  return (
    <React.Fragment>
      <CircularProgress variant="determinate" value={normalise(props.value)} />
      <LinearProgress variant="determinate" value={normalise(props.value)} />
    </React.Fragment>
  )
}
```

## Customized progress

コンポーネントのカスタマイズの例を次に示します。 詳細については、 [こちら](/customization/how-to-customize/)を参照してください。

{{"demo": "pages/components/progress/CustomizedProgressBars.js", "defaultCodeOpen": false}}

## 外観の遅延

応答時間について知っておくべき重要な制限は [3つあります](https://www.nngroup.com/articles/response-times-3-important-limits/) 。 `ButtonBase` コンポーネントの波及効果により、ユーザーはシステムが瞬時に反応しているように感じます。 通常、0.1秒以上1.0秒未満の遅延の間、特別なフィードバックは必要ありません。 1.0秒後、ローダーを表示して、ユーザーの思考の流れが中断されないようにすることができます。

{{"demo": "pages/components/progress/DelayingAppearance.js"}}

## 制限事項

### CPU負荷が高い場合

負荷が高いと、ストロークダッシュアニメーションが失われるか、ランダムな幅の `CircularProgress`が表示される場合があります。 メインレンダリングスレッドをブロックしないように、プロセッサを集中的に使用する操作をWebワーカーで、またはバッチで実行する必要があります。

![heavy load](/static/images/progress/heavy-load.gif)

不可能な場合は、 `disableShrink` プロパティを設定して問題を軽減できます。 [この問題](https://github.com/mui-org/material-ui/issues/10327)参照してください。

{{"demo": "pages/components/progress/CircularUnderLoad.js"}}

### 高頻度な更新

The `LinearProgress` uses a transition on the CSS transform property to provide a smooth update between different values. The default transition duration is 200ms. In the event a parent component updates the `value` prop too quickly, you will at least experience a 200ms delay between the re-render and the progress bar fully updated.

If you need to perform 30 re-renders per second or more, we recommend disabling the transition:

```css
.MuiLinearProgress-bar {
  transition: none;
}
```

### IE 11

The circular progress component animation on IE 11 is degraded. The stroke dash animation is not working (equivalent to `disableShrink`) and the circular animation wobbles. You can solve the latter with:

```css
.MuiCircularProgress-indeterminate {
  animation: circular-rotate 1.4s linear infinite;
}

@keyframes circular-rotate {
  0% {
    transform: rotate(0deg);
    /* Fix IE11 wobbly */
    transform-origin: 50% 50%;
  }
  100% {
    transform: rotate(360deg);
  }
}
```
