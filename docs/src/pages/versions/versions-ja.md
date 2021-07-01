# Material-UI Versions

<p class="description">このページに戻って、読んでいるドキュメントのバージョンをいつでも切り替えることができます。</p>

## Released versions

The most recent stable version (✓) is recommended for use in production.

{{"demo": "pages/versions/ReleasedVersions.js", "hideToolbar": true, "bg": "inline"}}

## 最新バージョン

ここには、最新の未発表の文書とコードがあります。 ここには、最新の未発表の文書とコードがあります。 これを使用して、変更点を確認し、Material-UIの貢献者により良いフィードバックを提供できます。

{{"demo": "pages/versions/LatestVersions.js", "hideToolbar": true, "bg": "inline"}}

## バージョン管理戦略

安定性により、再利用可能なコンポーネントとライブラリ、チュートリアル、ツール、および学習プラクティスが予期せず陳腐化することがなくなります。 Material-UIを取り巻くエコシステムが繁栄するには、安定性が不可欠です。

This document contains the practices that are followed to provide you with a leading-edge UI library, balanced with stability, ensuring that future changes are always introduced in a predictable way.

Material-UI は [Semantic Versioning 2.0.0](https://semver.org/) に従いバージョンを付けています。 Material-UIのバージョン番号には3つの部分があります：`major.minor.patch` 。 バージョン番号は、リリースに含まれる変更のレベルに基づいて増分されます。 Material-UIのバージョン番号には3つの部分があります：`major.minor.patch` 。 バージョン番号は、リリースに含まれる変更のレベルに基づいて増分されます。 Material-UIのバージョン番号には3つの部分があります：`major.minor.patch` 。 バージョン番号は、リリースに含まれる変更のレベルに基づいて増分されます。 Material-UIのバージョン番号には3つの部分があります：` major.minor.patch ` 。 バージョン番号は、リリースに含まれる変更のレベルに基づいて増分されます。

- **メジャーリリース**には、重要な新機能が含まれています。一部の機能は含まれていますが、アップデート中の開発者支援は最小限に抑えられます。 新しいメジャーリリースに更新するときは、更新スクリプトの実行、コードのリファクタリング、追加テストの実行、および新しいAPIの学習が必要になる場合があります。
- **マイナーリリース**には、重要な新機能が含まれています。 マイナーリリースは完全に下位互換性がある; アップデート中に開発者の支援は必要ありませんが、必要に応じて、リリースで追加された新しいAPI、機能、および機能を使用するようにアプリケーションとライブラリを変更できます。
- **パッチリリース**はリスクが低く、バグ修正と小さな新機能が含まれています。 更新中に開発者の支援は必要ありません。

## リリース頻度

定期的なリリーススケジュールは、Material-UIの継続的な進化に合わせて更新を計画および調整するのに役立ちます。

一般的に、次のリリースサイクルが期待できます。

- 12ヶ月ごとの **メジャー** リリース。
- メジャーリリースごとに 1-3の **マイナー** リリース。
- 毎週の **パッチ** リリース（緊急のバグ修正はいつでも）。

## リリーススケジュール

| Date      | Version     | Status   |
|:--------- |:----------- |:-------- |
| 2018年 5月  | v1.0.0      | Released |
| 2018年 9月  | v3.0.0      | Released |
| 2019年 5月  | v4.0.0      | Released |
| 2021年7月1日 | v5.0.beta.0 | 処理中です    |
| 2021年9月1日 | v5.0.0      | ⏳        |

詳細な概要については [マイルストーン](https://github.com/mui-org/material-ui/milestones) をご覧ください。

> ⚠️ **免責事項**: 我々は流動的な環境で事業を行っており、状況は変化する可能性があります。 提供される情報は、フレームワークの一般的な方向性を概説することを目的としています。 We may decide to add/remove new items at any time depending on our capability to deliver while meeting our quality standards. The development, releases and timing of any features or functionality of Material-UI remains at the sole discretion of Material-UI. The roadmap does not represent a commitment, obligation or promise to deliver at any time.

## サポートポリシー

詳細は [サポートされているバージョン](/getting-started/support/#supported-versions) をご覧ください。

## 廃止予定

時々**「重大な変更」 ** 、一部のAPIおよび機能のサポートの削除などが必要です。

これらの移行をできるだけ簡単にするには：

- 重大な変更の数は最小限に抑えられ、可能であれば移行ツールが提供されます。
- ここに記載されているサポート終了ポリシーに準拠しているため、アプリを最新のAPIとベストプラクティスに更新する時間があります。

### 廃止方針

- 非推奨となった機能は変更ログで、可能であれば実行時に警告で告知します。
- 廃止が発表された時、推奨されるアップデートの仕方が提供されます。
- 廃止猶予期間中の安定したAPIの既存使用をサポートしているため、その期間中もコードは機能し続けます。
- アプリの変更を必要とするピア依存の更新（React）は、メジャーリリースでのみ行われます。
