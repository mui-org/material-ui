---
title: No SSR React component
components: NoSsr
---

# No SSR

<p class="description">NoSsrは、サーバーサイドレンダリング（SSR）の対象から意図的にコンポーネントを削除します。</p>

このコンポーネントは、次のようなさまざまな状況で役立ちます。

- SSRをサポートしていない壊れた依存関係のハッチングをエスケープします。
- スクロールせずに見える範囲にレンダリングするだけで、クライアントでの最初のペイントまでの時間を改善します。
- サーバーでのレンダリング時間を短縮します。
- サーバーの負荷が高すぎる場合、サービスの低下を有効にできます。
- 重要なものだけをレンダリングすることにより、対話までの時間を改善します（ `defer` プロパティを使用）。

[The palette](/system/palette/) style関数。

## Client-side deferring

{{"demo": "pages/components/no-ssr/SimpleNoSsr.js"}}

## フレーム延期

根本的には、NoSsrコンポーネントの目的は、レンダリングを **遅延することです**。 前のデモで示したように、これを使用して、サーバーからクライアントへのレンダリングを延期できます。

ただし、これを使用して、クライアント自体内のレンダリングを延期することもできます。 子をレンダリングするには、 `defer` プロパティでスクリーンフレーム** を **待つことができます。 ただし、これを使用して、クライアント自体内のレンダリングを延期することもできます。 子をレンダリングするには、 `defer` プロパティでスクリーンフレーム** を **待つことができます。 Reactは1ではなく [2 commits](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects) を行う。

{{"demo": "pages/components/no-ssr/FrameDeferring.js"}}
