# Commerble docs
[公開サイト](https://www.commerble.com/docs)

[ドキュメント一覧](./list.md)

## 始め方

### 必要なもの
 - Hugo **Extended**  
  Binaryバージョンは [Hugo リリース](https://github.com/gohugoio/hugo/releases) よりダウンロード可能。  
  hugo コマンドのパスを通しておくと便利。
 - [NodeJS](https://nodejs.org/en)  
  docsy theme で PostCSS が必要。 

### ローカル環境で動かす
- ローカル環境にダウンロード
  ```
  git clone https://github.com/commerble/docs.git
  cd docs
  git submodule update --init --recursive
  npm install
  ```
- ローカル環境で動かす
  ```
  hugo server
  ```

## ドキュメントの目的
- これまで培った知識をまとめ、開発者・運営者・EC導入検討者に共有する。
- よくある問い合わせをまとめ、回答情報の均一化・抜け漏れの防止、また回答コストを削減する。
- Commerbleの導入イメージをEC導入検討者に提供する。
- 情報をまとめる。情報は分散して配置され再利用されず、同じような資料を各々が個別管理している現状を改善したい。

## 対象読者
- EC導入検討中の運営者
- EC導入検討中の情シス
- Commerble導入中の運営者
- Commerble導入中の情シス
- Commerble開発パートナー
- Commerble社員
- ECメディア

## ドキュメントの作成指針
- ホームページ、社内Docsサイト、Documentsリポジトリ、Backlog、個人で作った資料などを元に作成する。
- 書き足し、訂正がしやすいようドキュメントをグルーピングする。
- 内容が細かくなりすぎないようにする。
- ネガティブな内容を書かない。（他システムの批判など）
- ドキュメントの内容は issues で受付中。

## ドキュメントのグルーピング
最上位のグループは以下を想定する。

[ドキュメント全体リスト](./list.md)

### 1. 特徴
- 対象読者
  - **EC導入検討中の運営者**
  - **EC導入検討中の情シス**
  - ECメディア
- 概要
  - Commerbleがフィットする店舗の規模・価格を記載する。
  - Commerbleのシステム全体像、対象スコープを感じてもらう。
  - Commerbleの代表する強みを記載する。
  - 可用性、セキュリティ、パフォーマンスなど非機能要件を記載する。
  - ホームページのFeatureを肉付けしたものを想定。

### 2. 導入
- 対象読者
  - **EC導入検討中の運営者**
  - **EC導入検討中の情シス**
  - Commerble開発パートナー
- 概要
  - Commerbleの導入イメージを導入を検討中の人に提供する。
  - プロジェクト進行の流れを記載する。
  - システム移行の注意事項を記載する。

### 3. 運用
- 対象読者
  - **EC導入検討中の運営者**
  - **EC導入検討中の情シス**
  - **Commerble導入中の運営者**
  - **Commerble導入中の情シス**
  - **Commerble開発パートナー**
  - Commerble社員
- 概要
  - メインコンテンツ。
  - Commerbleの仕様、カスタマイズ例を記載する。
  - 外部システム連携例を記載する。

### 4. 開発
- 対象読者
  - EC導入検討中の情シス
  - Commerble導入中の情シス
  - **Commerble開発パートナー**
  - **Commerble社員**
- 概要
  - Commerbleの開発を支援する開発者向け情報を記載する。
  - OData、テンプレート(Razor)、Webhook、メール送信


