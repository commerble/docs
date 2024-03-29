---
title: "キャンペーン・フィルター"
weight: 1
description: 
---

Commerbleのカートエンジンの中枢を担うのが[パイプライン]です。キャンペーン・フィルターは[パイプラインモジュール]の実行前後に日時・会員ロール・金額・商品などの条件をもとに特定の処理を追加できる機能です。

この機能を使用し、テナントは送料無料キャンペーンや会員割引などのキャンペーンを実施できます。 また、カスタムキャンペーンモジュールを[オーダーカスタム]するこでテナント独自のキャンペーンを構築可能です。

## キャンペーンとフィルターの違い
Commerbleにおいて、キャンペーンとフィルターは同一ですが、用途によって名称を変えています。キャンペーンは値引きや特典商品の付与など、カートに影響を与えるものを差し、フィルターは会員購入制限などの購入の可否をチェックするためのカスタムルールを差します。

## キャンペーンモジュール

キャンペーンモジュールの実行フローを次図に示します。

![キャンペーンフロー](campaign_flow.png)

<!-- textlint-disable ja-technical-writing/sentence-length -->
青色がパイプラインモジュール、橙色がキャンペーンモジュールです。各パイプラインモジュールの実行前に処理するキャンペーンモジュールを各パイプラインモジュールの上、各パイプラインモジュールの実行後に処理するキャンペーンモジュールを各パイプラインモジュールの下に配置されています。
<!-- textlint-enable ja-technical-writing/sentence-length -->

キャンペーンはパイプラインと異なり、実施するキャンペーンモジュールを管理画面から設定可能です。

![キャンペーン管理画面](campaign_admin.jpg)

## 標準キャンペーンモジュール

### 送料無料
受注が条件を満たす場合、送料を無料にします。

### 決済手数料無料
受注が条件を満たす場合、決済手数料を無料にします。

### 追加商品付与
受注が条件を満たす場合、追加商品を付与します。

### 受注毎特典付与
受注が条件を満たす場合、特典商品を付与します。

### 商品毎特典付与
適用商品がカート内にある場合、特典商品を付与します。

### 商品定率割引
カート内の適用商品を指定割引率で値引きします。

### 商品定額割引
カート内の適用商品を対象に、指定額を明細に按分して値引きします。

### 注文定率割引
受注が条件を満たす場合、明細を低率で値引きします。

### 注文定額割引
受注が条件を満たす場合、指定額を明細に按分して値引きします。

### 商品定率ポイント付与
カート内の適用商品のポイント付与率を加算します。

### 商品定額ポイント付与
カート内の適用商品を指定額分のポイントを付与します。

### 注文定率ポイント付与
受注が条件を満たす場合、明細を低率で値引きします。

### 注文定額ポイント付与
受注が条件を満たす場合、指定額のポイントを明細に按分して付与します。

## 標準フィルターモジュール
### ロール購入制限
指定の会員ロールのみ購入できるように制限します。

### 同時購入制限
対象商品のみ同時に購入できるように制限します。

[パイプライン]: ../pipeline/ "パイプライン"
[パイプラインモジュール]: ../pipeline/#パイプラインモジュール "パイプラインモジュール"
[オーダーカスタム]: ../../features/customization/#オーダーカスタム "オーダーカスタム"
