---
title: "システム連携について"
layout: single
weight: 10
description: 
related:
  - /commerble/achievement/member-site/
  - /commerble/achievement/oms/
  - /commerble/achievement/external-point/
  - /commerble/achievement/pms/
  - /commerble/achievement/custom-admin/
  - /commerble/achievement/delivery-charge/
---

Commerbleには、充実したAPI群、各種機能があり、他システムとの連携を柔軟に組み上げることが可能です。
Commerbleで外部システムと連携するために接続ポイントは以下の4つがあります。

- WEB API
- 受注イベント通知
- カスタムパイプラインモジュール
- カスタムテンプレートヘルパー

## Web API

Commerbleには管理オペレーション用のWeb APIがあり、このAPIを利用して、基幹システムや倉庫システムと連携できます。

このAPIは管理用です。カート処理用のWeb APIではないことに留意が必要です。

つまりこれはJAMStackで構成されたECサイト（フロントサイト）から使用する購入APIとしては機能しないことを意味します。そのようなAPIが必要な場合は[カスタマイズ実績：カートのWeb API化]をご参照ください。


## 受注イベント通知

Commerble上で受注が作成・更新された際に、外部システムへ作成・変更のあった受注IDを通知できます。

この通知は、通常[Azure Storage Queue]を介して通知いたしますので必要な際は別途Microsoft Azureの契約をお願いいたしております。

HTTPリクエストやAMQPを用いた通知をご希望の場合は、カスタマイズで対応可能ですのでご相談ください。

## カスタムパイプラインモジュール

カスタムパイプラインモジュールを[オーダーカスタム] することで、受注処理時に外部システムと接続できます。

このカスタマイズにより、独自の決済APIや送料計算、ポイント連携を実現できます。

詳しくは、[カスタマイズ：パイプラインモジュール]をご参照ください。


## カスタムテンプレートヘルパー

テンプレート内で使用できるAPIを[オーダーカスタム] することで、テンプレート内で外部システムにアクセスできます。

このカスタマイズにより、決済プロバイダ内に保存された登録カードの取得などを実現できます。

詳しくは、[カスタマイズ：テンプレートヘルパー]をご参照ください。

[カスタマイズ実績：カートのWeb API化]: ../../achievement/cartapi/ "カートのWeb API化"
[Azure Storage Queue]: https://docs.microsoft.com/azure/storage/queues/storage-queues-introduction "Azure Storage Queue"
[オーダーカスタム]: ../customization/#オーダーカスタム "オーダーカスタム"
[カスタマイズ：パイプラインモジュール]: ../customization/#パイプラインモジュール "パイプラインモジュール"
[カスタマイズ：テンプレートヘルパー]: ../customization/#テンプレートヘルパー "テンプレートヘルパー"