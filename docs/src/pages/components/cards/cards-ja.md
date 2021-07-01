---
title: React Card コンポーネント
components: Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Collapse, Paper
githubLabel: 'component: Card'
materialDesign: https://material.io/components/cards
---

# Card (カード)

<p class="description">Cardは一つの主題に関してのコンテンツとアクションを含みます。</p>

Card は、1つのトピックに関するコンテンツとアクションを表示する面です。

関連する実行可能な情報を容易にスキャンできる必要があります。 テキストや画像などの要素は、階層を明確に示すように配置する必要があります。

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic card

Cardは複数のアクション、UIコントロール、およびオーバーフローメニューをサポートできますが制限してください。Cardがより複雑で詳細な情報への入り口であることを忘れてはいけません。

{{"demo": "pages/components/cards/BasicCard.js", "bg": true}}

### Outlined Card

Set `variant="outlined"` to render an outlined card.

{{"demo": "pages/components/cards/OutlinedCard.js", "bg": true}}

## 複雑なインタラクション

デスクトップでは、Cardの内容が展開できる可能性があります。 (レシピを見るには下向きの矢印をクリックしてください。)

{{"demo": "pages/components/cards/RecipeReviewCard.js", "bg": true}}

## メディア

内容を補助する為に画像を用いたCardの例。

{{"demo": "pages/components/cards/MediaCard.js", "bg": true}}

デフォルトでは、メディアを表示する為に `<div>` 要素と *背景画像* の組み合わせを使用します。 しかし、これは例えばビデオやレスポンシブ画像を表​​示したい場合など、状況によっては問題が発生する可能性があります。 そのような場合は `component` プロパティを使用します。

{{"demo": "pages/components/cards/ImgMediaCard.js", "bg": true}}

> `component="img"`の場合、CardMediaはイメージのセンタリングを`object-fit`に依存します。 これはIE11ではサポートされていません。

## プライマリーアクション

よくそのカード全体をクリックすることによって、カードの拡張、別の画面へのリンク、その他の動作などのメインアクションを実行できるようにすることがあります。。 そのようなとき、`CardActionArea` コンポーネントでその内容をラップすることでカードのアクション領域を指定できます。

{{"demo": "pages/components/cards/ActionAreaCard.js", "bg": true}}

カードは、イベントの重複を避けるために、メインアクションエリアから離れている補足アクションを提供することもできます。

{{"demo": "pages/components/cards/MultiActionAreaCard.js", "bg": true}}

## UIコントロール

Card内の補足的なアクションは、通常はカードの下部に配置されているアイコンとテキスト及びUIコントロールから明示的に呼び出されます。

これはメディアコントロール付きCardの例です。

{{"demo": "pages/components/cards/MediaControlCard.js", "bg": true}}

## カスタマイズ

🎨 インスピレーションを求めている場合は、 [MUI Treasury's customization examples](https://mui-treasury.com/components/card) を確認すると良いでしょう。
