---
title: "カスタマイズ"
weight: 1
description: 
---

# カスタマイズ

この章では、Commerbleの最大の特徴であるカスタマイズ性について説明します。

## カスタマイズ可能な領域

Commerbleは多様なカスタマイズで様々なご要望を実現できます。次図はCommerble ECのカスタマイズ可能な領域と不変的な共通システムの領域を表しています。

![customizable domain](customizable_domains.jpg)

セルフカスタム、オーダーカスタム、共通システム（カスタム不可）部がそれぞれ緑、赤、青で色分けされています。

## セルフカスタム

利用者が、いつでも、ご自身で変更可能な領域です。CMSの機能を用いたプログラム可能なテンプレート機能、もしくは、WEB APIを用いたカスタマイズ領域です。

### サイトテンプレート
サイトのビジュアルに関するテンプレートです。 商品一覧、商品詳細、検索ページなどがこれに当たります。

### カートテンプレート
カート処理に関するテンプレートです。 サイトテンプレートと同様に独自のビジュアルを構築できますが、カート処理に必要なビューモデルが与えられる点で異なります。 カートページ、配送先指定ページ、決済ページなどがこれに当たります。

### メールテンプレート
各種メールに関するテンプレートです。 注文確定メール、お問い合わせメールなどがこれに当たります

### 外部バッチ処理
WEB APIを利用して、管理用の外部バッチ処理を構築することができます。

## オーダーカスタム

ご依頼していただくことでカスタム可能な領域です。

### CMSスキーマ
サイトのビジュアルに関するデータ構造です。テナント固有の要件に合わせたスキーマをDBに構築できます。このCMSデータは各テンプレートから参照できます。なお、テンプレートからの更新はできません。

### データ連携スクリプト

カートデータからCMSデータへデータ連携を行うスクリプトです。カートシステムで商品登録をした際に、CMSに商品IDを自動コピーするなどの機能が実現できます。

### パイプラインモジュール
カート処理を行うモジュールです。カスタムパイプラインモジュールを作成することで、任意の決済プロバイダーを使用するような拡張が行えます。またパイプラインモジュールはパイプラインに登録しますがその順序もオーダーカスタム可能です。

詳しくは、[開発：パイプライン]をご参照ください。

### キャンペーンモジュール
キャンペーンやフィルターを実現するモジュールです。既存モジュールでは、ポイント付与キャンペーンやロール購入制限などがありますが、カスタムでテナント固有のキャンペーンやフィルターのロジックを構築できます。

詳しくは、[開発：キャンペーンモジュール]をご参照ください。

### テンプレートヘルパー
テンプレート内で使用できるAPI（関数型）です。カスタムテンプレートヘルパーを作成することで外部システムから情報を取得することができます。

詳しくは、[開発：テンプレートヘルパー]をご参照ください。

## 共通システム

すべてのテナントで共通となるシステムで、カスタマイズ不可能な領域です。

### パイプライン
カート処理を行う、処理単位です。カートパイプライン、注文パイプライン、履歴パイプライン、キャンセルパイプラインの4つが存在します。
これら4つのパイプラインにパイプラインモジュールを登録し、カート処理を行います。

詳しくは、[開発：パイプライン]をご参照ください。

### カートスキーマ
カート処理に関するデータ構造です。カートパイプラインやキャンペーンを処理するために必要なデータが格納されます。

### カート管理者機能
受注データの閲覧やキャンペーンの実施、商品登録など、カートエンジン内にかかわるデータを管理します。 また、それらの権限を管理します。

### CMS管理者機能
各種テンプレートやルーティング設定、データの編集など、ビジュアルにかかわるデータを管理します。 また、それらの権限を管理します。

### バッチ処理
現在、マネージド環境には、変更監視バッチ、メール送信バッチ、引当バッチ、キャンセルバッチ、アーカイブバッチ、ポイント失効バッチ、住所マスタ更新バッチがありますが、これらの一部パラメータを設定できます。


[開発：パイプライン]: ../../development/pipeline/ "パイプライン"
[開発：パイプラインモジュール]: ../../development/pipeline/#パイプラインモジュール "パイプラインモジュール"
[標準パイプラインモジュール]: ../../development/pipeline/#標準パイプラインモジュール "標準パイプラインモジュール"
[開発：キャンペーンモジュール]: ../../development/campaign/ "キャンペーンモジュール"
[開発：テンプレートヘルパー]: ../../development/template-helper/ "テンプレートヘルパー"