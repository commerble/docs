---
title: "データAPI"
weight: 1
description: 
---

この章では、Commerbleの提供するWeb APIのうちデータAPIについて説明します。

データAPIでは、Commerbleに保存されているデータにアクセスできます。

また、アクセスするデータによって以下の3つのエンドポイントに分かれています。

- EC Feed
- CMS Feed
- Meta Feed

データAPIは全て[OData]として提供されます。[OData]の仕様は、[OData V4 Documentation]もしくは[OData V3 Documentation]をご確認ください。

## EC Feed

EC Feedでは、共通スキーマの情報を作成、更新、削除できます。 操作可能なデータはODataメタデータを確認ください。

|     エンドポイント     |            メタデータ            |             補足             |
| :--------------------- | :------------------------------- | :--------------------------- |
| ~/data/ec              | ~/data/ec/$metadata              | 現行エンドポイント、OData V4 |
| ~/ec.feed.v5/odata.svc | ~/ec.feed.v5/odata.svc/$metadata | 旧エンドポイント、OData V3   |

またメタデータに合わせて、[データ：ECデータ]もご確認ください。

## CMS Feed

CMS Feedでは、テナントごとにカスタムされたスキーマの情報を作成、更新、削除できます。

はじめに、使用するCMSスキーマを策定する必要があります。詳しくは、[CMSスキーマの定義例]をご確認ください。

スキーマの定義を作成後、オーダーカスタムをご依頼いただきCommerble社側でスキーマを反映いたします。
反映までが完了しない状態でメタデータにアクセスしても操作可能なデータが無いことに留意が必要です。

CMSスキーマの反映後は、操作可能なデータはODataメタデータを確認ください。

|        エンドポイント        |               メタデータ               |             補足             |
| :--------------------------- | :------------------------------------- | :--------------------------- |
| ~/data/cms                   | ~/data/cms/$metadata                   | 現行エンドポイント、OData V4 |
| ~/cms.feed.v2/list/odata.svc | ~/cms.feed.v2/list/odata.svc/$metadata | 旧エンドポイント、OData V3   |

## Meta Feed

Meta Feedでは、テンプレートやルーティングなどのCMS機能にかかわる共通スキーマ情報を作成、更新、削除できます。操作可能なデータはODataメタデータを確認ください。

|          エンドポイント          |                 メタデータ                 |             補足             |
| :------------------------------- | :----------------------------------------- | :--------------------------- |
| ~/data/meta                      | ~/data/meta/$metadata                      | 現行エンドポイント、OData V4 |
| ~/cms.feed.v2/metadata/odata.svc | ~/cms.feed.v2/metadata/odata.svc/$metadata | 旧エンドポイント、OData V3   |

またメタデータに合わせて、[データ：メタデータ]もご確認ください。

## サンプル

以下にEC Feedで商品を追加する例を示します。

```
--- リクエスト ---
POST ~/data/ec/Products HTTP/1.1
Accept: application/json
Authorization: Basic xxxxxxxxxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
  "Name": "サンプル商品1-黒-S",
  "ProductType": 0,
  "SalesStart": "2020-01-01T00:00:00+09:00",
  "SalesEnd": null,
  "ReleaseDate": null,
  "ReReleaseDate": null,
  "ExternalId1": "SAMPLE001",
  "ExternalId2": "BLK-S",
  "ExternalId3": null,
  "ExternalId4": null,
  "UnitPrice": 1000,
  "TaxationPrice": 1000,
  "SalesPatternId": 1,
  "DeliveryPatternId": 1,
  "SalesStatus": 0
}

--- レスポンス ---
HTTP/1.1 201 Created
Cache-Control: no-cache
Content-Length: 519
Content-Type: application/json;charset=utf-8
Location: ~/data/ec/Products(1)

{
    "@odata.context": "~/data/ec/$metadata#Products/$entity",
    "Id": 1,
    "Name": "サンプル商品1-黒-S",
    "ProductType": 0,
    "SalesStart": "2020-01-01T00:00:00+09:00",
    "SalesEnd": null,
    "ReleaseDate": null,
    "ReReleaseDate": null,
    "ExternalId1": "SAMPLE001",
    "ExternalId2": "BLK-S",
    "ExternalId3": null,
    "ExternalId4": null,
    "UnitPrice": 1000,
    "SalesPatternId": 1,
    "DeliveryPatternId": 1,
    "SetOnly": null,
    "Cero": null,
    "MemoId": null,
    "SalesStatus": 0,
    "TaxationPrice": 1000,
    "OrderedProduct": null
}
```

[OData]: https://www.odata.org/ "OData"
[OData V4 Documentation]: https://www.odata.org/documentation/ "OData V4"
[OData V3 Documentation]: https://www.odata.org/documentation/odata-version-3-0/ "OData V3"
[データ：ECデータ]: ../../data/ec/ "ECデータ"
[CMSスキーマの定義例]: ../../data/cms/#定義例 "CMSデータ"
[データ：メタデータ]: ../../data/meta/ "メタデータ"
