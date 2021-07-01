---
title: React アバターコンポーネント
components: Avatar, AvatarGroup, Badge
githubLabel: 'component: Avatar'
---

# Avatar

<p class="description">Avatars(アバター) は、テーブルからダイアログメニューまで、あらゆる用途に使用されています。</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Image avatars(画像アバター)

Image Avatars(画像アバター) は通常の`img` propsである、 `src` もしくは `srcSet`をコンポーネントに渡すことで作成できます。

{{"demo": "pages/components/avatars/ImageAvatars.js"}}

## Letter avatars(文字アバター)

`children`に文字列を渡すことで、シンプルな文字列を使ったアバターを作成することができます。

{{"demo": "pages/components/avatars/LetterAvatars.js"}}

You can use different background colors for the avatar. The following demo generates the color based on the name of the person.

{{"demo": "pages/components/avatars/BackgroundLetterAvatars.js"}}

## サイズ

アバターのサイズは、 `height` と `width` の CSS プロパティで変更できます。

{{"demo": "pages/components/avatars/SizeAvatars.js"}}

## Icon avatars (アイコンアバター)

アイコンアバターは、 `children(子要素)`としてアイコンを渡すことによって作成されます。

{{"demo": "pages/components/avatars/IconAvatars.js"}}

## バリアント

四角形や丸いアバターを作成したい場合は、`variant` propを指定することで実現できます。

{{"demo": "pages/components/avatars/VariantAvatars.js"}}

## Fallbacks (エラー回避)

アバター画像の読み込み時に問題が発生した場合、コンポーネントは以下の順序に沿って代替手段をとります。

- 指定された`children`(子要素)
- `alt`に指定された文字列の頭文字
- 汎用アバターアイコン

{{"demo": "pages/components/avatars/FallbackAvatars.js"}}

## Grouped

`AvatarGroup`は与えられた子要素をスタックとしてレンダリングします。

{{"demo": "pages/components/avatars/GroupAvatars.js"}}

## バッジをつける

{{"demo": "pages/components/avatars/BadgeAvatars.js"}}
