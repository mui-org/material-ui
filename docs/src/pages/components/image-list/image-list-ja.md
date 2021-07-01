---
title: Grid List React component
components: ImageList, ImageListItem, ImageListItemBar
materialDesign: https://material.io/components/image-lists
githubLabel: 'component: ImageList'
---

# Grid List

<p class="description">グリッドリストは、整理されたグリッドで画像のコレクションを表示します。</p>

画像リストは、繰り返しパターンの項目の集まりを表します。 それらは、保持するコンテンツの視覚的理解を改善するのに役立ちます。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## 画像のみのGrid list

標準的な画像リストは、同じ重要度の項目のリストに最適です。 均一なコンテナーの大きさ、比率、および間隔を持ちます。

{{"demo": "pages/components/image-list/StandardImageList.js"}}

## ステッチ状の(Quilted)画像リスト

ステッチ状の画像リスト特定のアイテムをコレクション内の他のアイテムより強調します。 さまざまなコンテナサイズと比率によって階層構造が作られます。

{{"demo": "pages/components/image-list/QuiltedImageList.js"}}

## 織り込み(Woven)画像リスト

織り込みイメージリストでは、交互のコンテナ比を使用して律動的なレイアウトを作成します。 織り込み画像リストは、ペアのコンテンツを閲覧するのに最適です。

{{"demo": "pages/components/image-list/WovenImageList.js"}}

## 積み上げ(Masonary)画像リスト

積み上げ画像リストは、各画像のアスペクト比を反映した動的なコンテナの高さを使用します。 この画像リストは、トリミングされていないペアのコンテンツ閲覧に最適です。

{{"demo": "pages/components/image-list/MasonryImageList.js"}}

## タイトルバー付き画像リスト

この例は、 `ImageListItemBar` を使用して、各 `ImageListItem`オーバーレイを追加する方法を示しています。 オーバーレイには、 `title`, `subtitle` および副次的アクション例えば`IconButton`を含めることができます。

{{"demo": "pages/components/image-list/TitlebarImageList.js"}}

### 画像の下にタイトルバー（標準）

タイトルバーは画像の下に配置できます。

{{"demo": "pages/components/image-list/TitlebarBelowImageList.js"}}

### 画像の下にタイトルバー（積み上げ）

{{"demo": "pages/components/image-list/TitlebarBelowMasonryImageList.js"}}

## カスタム画像リスト

タイルには、上部にカスタムのタイトルバーがあり、カスタムのグラデーション`titleBackground`があります。 セカンダリアクション `IconButton` は左側に配置されます。 タイルには、上部にカスタムのタイトルバーがあり、カスタムのグラデーション`titleBackground`があります。

{{"demo": "pages/components/image-list/CustomImageList.js", "defaultCodeOpen": false}}
