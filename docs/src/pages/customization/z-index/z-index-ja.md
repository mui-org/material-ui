# z-index

<p class="description">z-indexは、コンテンツを配置するための3番目の軸を提供することでレイアウトを制御するのに役立つCSSプロパティです。</p>

いくつかのMaterial-UIコンポーネントは`z-indexを利用します` 、ドロワー、モーダル、スナックバー、ツールチップなどを適切に階層化するように設計されたMaterial-UI デフォルトのz-indexスケールを採用しています。

The `z-index` values start at an arbitrary number, high and specific enough to ideally avoid conflicts:

- mobile stepper: 1000
- speed dial: 1050
- app bar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

これらの値はいつでもカスタマイズできます。 これらは、テーマの[`zIndex`](/customization/default-theme/?expand-path=$.zIndex)キーの下のテーマにあります。 個々の値をカスタマイズすることはお勧めできません。; 1つを変更した場合は、すべてを変更する必要があります。
