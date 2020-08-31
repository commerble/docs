---
title: "EC"
weight: 40
description: 
---

<style>
  table th { font-size: 11px; }
  table td { font-size: 11px; }
</style>

# EC
EC データの一覧です。

## ActiveCampaigns
現在アクティブなキャンペーン。有効期限内かつ付与商品がある場合は在庫が存在する場合。

|       列名       |    型    | 最大長 | 主キー | Identity | NULL許容 |          説明          |
| ---------------- | -------- | ------ | :----: | :------: | :------: | ---------------------- |
| Id               | Int32    |        |   O    |          |          | キャンペーンID         |
| Name             | String   | Max    |        |          |    O     | キャンペーン名称       |
| StartDate        | DateTime |        |        |          |          | キャンペーン開始日時   |
| EndDate          | DateTime |        |        |          |          | キャンペーン終了日時   |
| CampaignType     | Int32    |        |        |          |          | キャンペーンタイプ     |
| ApplyPrice       | Decimal  |        |        |          |    O     | 適応価格               |
| BenefitItemCount | Int32    |        |        |          |          | 付与商品カウント       |
| RemainItemCount  | Int32    |        |        |          |    O     | 残商品カウント         |
| ConfigParameter  | String   | Max    |        |          |    O     | キャンペーンパラメータ |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Addresses
住所

|     列名      |   型   |      最大長      | 主キー | Identity | NULL許容 |                                      説明                                       |
| ------------- | ------ | ---------------- | :----: | :------: | :------: | ------------------------------------------------------------------------------- |
| Id            | Int64  |                  |   O    |    O     |          | 住所ID                                                                          |
| FirstName     | String | 64               |        |          |          | 名　[PersonName制約]({{< ref "../validation#personname" >}})                    |
| FirstNameKana | String | 64               |        |          |          | メイ　[PersonNameKana制約]({{< ref "../validation#personnamekana" >}})          |
| LastName      | String | 64               |        |          |          | 姓　[PersonName制約]({{< ref "../validation#personname" >}})                    |
| LastNameKana  | String | 64               |        |          |          | セイ　[PersonNameKana制約]({{< ref "../validation#personnamekana" >}})          |
| CountryCode   | String | 10(fixed length) |        |          |          | 国コード                                                                        |
| ZipCode       | String | 10(fixed length) |        |          |          | 郵便番号　[ZipCode制約]({{< ref "../validation#zipcode" >}})                    |
| Prefecture    | String | 10(fixed length) |        |          |          | 都道府県 [AddressPart制約]({{< ref "../validation#addresspart" >}})             |
| City          | String | 128              |        |          |          | 市区町村 [AddressPart制約]({{< ref "../validation#addresspart" >}})             |
| Street        | String | 128              |        |          |          | 番地、丁、号 [AddressTextPart制約]({{< ref "../validation#addresstextpart" >}}) |
| Building      | String | 128              |        |          |    O     | 建物名 部屋番号                                                                 |
| Tel           | String | 32(fixed length) |        |          |          | 電話番号 [PhoneNumber制約]({{< ref "../validation#phoneNumber" >}})             |

+ Parents
+ Children
	- [AddressesLastUpdate]({{< ref "#addresseslastupdates" >}})(0..1)
	- [DeliveryOrders]({{< ref "#deliveryorders" >}})(*)
	- [InvoiceOrderCustomers]({{< ref "#ordercustomers" >}})(*)
	- [OrderedOrderCustomers]({{< ref "#ordercustomers" >}})(*)
	- [UserAddresses]({{< ref "#useraddresses" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## AddressesLastUpdates
住所最終更新

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ---------- | -------- | ------ | :----: | :------: | :------: | ------------ |
| Id         | Int64    |        |   O    |          |          | 住所ID       |
| LastUpdate | DateTime |        |        |          |    O     | 最終更新日時 |

+ Parents
	- [Address]({{< ref "#addresses" >}})(1) [FK(Id)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## BeginingSalesControls

|         列名          |    型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| --------------------- | -------- | ------ | :----: | :------: | :------: | ------------ |
| ProductId             | Int32    |        |   O    |          |          | 商品ID       |
| ShipmentOperationDate | DateTime |        |   O    |          |          | 配送処理日時 |

+ Parents
	- [Product]({{< ref "#products" >}})(1) [FK(ProductId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## BenefitItems
キャンペーン付与商品

|       列名       |  型   | 最大長 | 主キー | Identity | NULL許容 |      説明      |
| ---------------- | ----- | ------ | :----: | :------: | :------: | -------------- |
| CampaignId       | Int32 |        |   O    |          |          | キャンペーンID |
| BenefitProductId | Int32 |        |   O    |          |          | 付与商品ID     |
| Amount           | Int32 |        |        |          |    O     | 数量           |

+ Parents
	- [Campaign]({{< ref "#campaigns" >}})(1) [FK(CampaignId)] 	
	- [Product]({{< ref "#products" >}})(1) [FK(BenefitProductId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## CampaignActionMaster
適応可能アクションのマスタ

|       列名       |   型   | 最大長 | 主キー | Identity | NULL許容 |           説明           |
| ---------------- | ------ | ------ | :----: | :------: | :------: | ------------------------ |
| CampaignActionId | Int32  |        |   O    |          |          | キャンペーンアクションID |
| ActionName       | String | 200    |        |          |          | アクション名             |
| ActionTypeName   | String | 200    |        |          |          | アクションタイプ名       |
| ActionMethodName | String | 200    |        |          |          | アクションメソッド名     |

+ Parents
+ Children
	- [CampaignActions]({{< ref "#campaignactions" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## CampaignActions
計画済みキャンペーンパラメータ情報

|       列名       |   型   | 最大長 | 主キー | Identity | NULL許容 |           説明           |
| ---------------- | ------ | ------ | :----: | :------: | :------: | ------------------------ |
| CampaignId       | Int32  |        |   O    |          |          | キャンペーンID           |
| CampaignActionId | Int32  |        |   O    |          |          | キャンペーンアクションID |
| ConfigParameter  | String | Max    |        |          |          | キャンペーンパラメータ   |

+ Parents
	- [Campaign]({{< ref "#campaigns" >}})(1) [FK(CampaignId)] 	
	- [CampaignActionMaster]({{< ref "#campaignactionmaster" >}})(1) [FK(CampaignActionId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## CampaignMatches
クーポンコードマスタ

|        列名        |   型   | 最大長 | 主キー | Identity | NULL許容 |                       説明                        |
| ------------------ | ------ | ------ | :----: | :------: | :------: | ------------------------------------------------- |
| CampaignId         | Int32  |        |   O    |          |          | キャンペーンID                                    |
| Code               | String | 128    |   O    |          |          | クーポンコード                                    |
| MaxUsagePerAccount | Int32  | Max    |        |          |    O     | 1アカウント当たりの最大適用数。NULLの場合は無制限 |

+ Parents
	- [Campaign]({{< ref "#campaigns" >}})(1) [FK(CampaignId)]  	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## CampaignRoles
ロール対象キャンペーン設定

|    列名    |  型   | 最大長 | 主キー | Identity | NULL許容 |      説明      |
| ---------- | ----- | ------ | :----: | :------: | :------: | -------------- |
| CampaignId | Int32 |        |   O    |          |          | キャンペーンID |
| RoleNo     | Int64 |        |   O    |          |          | ロールNo       |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Campaigns
実施済みキャンペーン

|     列名     |    型    |      最大長      | 主キー | Identity | NULL許容 |                                     説明                                     |
| ------------ | -------- | ---------------- | :----: | :------: | :------: | ---------------------------------------------------------------------------- |
| Id           | Int32    |                  |   O    |    O     |          | キャンペーンID                                                               |
| Name         | String   | Max              |        |          |          | キャンペーン名称                                                             |
| StartDate    | DateTime |                  |        |          |          | 開始日時                                                                     |
| EndDate      | DateTime |                  |        |          |          | 終了日時                                                                     |
| CampaignType | Int32    |                  |        |          |          | [CampaignActionMaster.CampaignActionId]({{< ref "#campaignactionmaster" >}}) |
| Count        | String   | 10(fixed length) |        |          |    O     | 未使用                                                                       |
| MemoId       | Int64    |                  |        |          |    O     | メモID                                                                       |
| ApplyPrice   | Decimal  |                  |        |          |    O     | 適応価格                                                                     |

+ Parents
+ Children
	- [BenefitItems]({{< ref "#benefititems" >}})(*)
	- [CampaignActions]({{< ref "#campaignactions" >}})(*)
	- [CampaignMatches]({{< ref "#campaignmatches" >}})(*)
+ Realations
	- [Categories]({{< ref "#categories" >}})(*)
	- [Products]({{< ref "#products" >}})(*)
	- [PurchaseOrders]({{< ref "#purchaseorders" >}})(*)
---------------------------------------------------------------------------------------

## Categories
カテゴリー

|         列名          |   型   |      最大長      | 主キー | Identity | NULL許容 |        説明        |
| --------------------- | ------ | ---------------- | :----: | :------: | :------: | ------------------ |
| Id                    | Int32  |                  |   O    |    O     |          | カテゴリID         |
| Name                  | String | 200              |        |          |          | カテゴリ名         |
| ExternalCategoryName1 | String | 32(fixed length) |        |          |    O     | 外部カテゴリ名1    |
| ExternalCategoryName2 | String | 32(fixed length) |        |          |    O     | 外部カテゴリ名2    |
| CategoryGroupId       | Int32  |                  |        |          |          | カテゴリグループID |
| MemoId                | Int64  |                  |        |          |    O     | メモID             |

+ Parents
	- [CategoryGroup]({{< ref "#categorygroups" >}})(1) [FK(CategoryGroupId)] 	
+ Children
+ Realations
	- [Campaigns]({{< ref "#campaigns" >}})(*)
	- [Products]({{< ref "#products" >}})(*)
---------------------------------------------------------------------------------------

## CategoryGroups
カテゴリグループ

|       列名        |   型   | 最大長 | 主キー | Identity | NULL許容 |         説明         |
| ----------------- | ------ | ------ | :----: | :------: | :------: | -------------------- |
| Id                | Int32  |        |   O    |    O     |          | カテゴリグループID   |
| CategoryGroupName | String | 200    |        |          |          | カテゴリグループ名称 |

+ Parents
+ Children
	- [Categories]({{< ref "#categories" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## CutoffSchedules
未使用

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 | 説明 |
| ---------- | -------- | ------ | :----: | :------: | :------: | ---- |
| Id         | Int32    |        |   O    |    O     |          |      |
| BeginDate  | DateTime |        |        |          |          |      |
| EndDate    | DateTime |        |        |          |          |      |
| CutoffDate | DateTime |        |        |          |          |      |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## DeliveryCharges
送料テーブル 配送ソースと都道府県で一意に決まる

|     列名     |   型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ------------ | ------- | ------ | :----: | :------: | :------: | ------------ |
| ShipSourceId | Int32   |        |   O    |          |          | 配送ソースID |
| PrefectureId | Int32   |        |   O    |          |          | 都道府県ID   |
| Charge       | Decimal |        |        |          |          | 送料         |

+ Parents
	- [Prefecture]({{< ref "#prefectures" >}})(1) [FK(PrefectureId)] 	
	- [ShipSource]({{< ref "#shipsources" >}})(1) [FK(ShipSourceId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## DeliveryOrders
受注配送情報

|      列名      |    型    |      最大長      | 主キー | Identity | NULL許容 |                                       説明                                       |
| -------------- | -------- | ---------------- | :----: | :------: | :------: | -------------------------------------------------------------------------------- |
| OrderId        | Int64    |                  |   O    |          |          | 受注ID                                                                           |
| DeliveryDate   | DateTime |                  |        |          |    O     | 配送日                                                                           |
| HourRange      | String   | 4(fixed length)  |        |          |    O     | 配送時間 例：午前8時から12時の場合"0812"                                         |
| WrappingTypeId | Int32    |                  |        |          |    O     | 梱包種ID                                                                         |
| SenderName     | String   | 20(fixed length) |        |          |    O     | 依頼者名 [PersonName制約]({{< ref "../validation#personname" >}}) 依頼者名印字用 |
| AddressName    | String   | 50               |        |          |          | 配送先名                                                                         |
| DeliveryNo     | String   | 20(fixed length) |        |          |    O     | 配送番号                                                                         |
| AddressId      | Int64    |                  |        |          |    O     | 住所ID                                                                           |
| ShipSourceId   | Int32    |                  |        |          |    O     | 配送ソースID                                                                     |
| MailAddress    | String   | 256              |        |          |    O     | メールアドレス                                                                   |

+ Parents
	- [Address]({{< ref "#addresses" >}})(0..1) [FK(AddressId)] 	
	- [PurchaseOrder]({{< ref "#purchaseorders" >}})(1) [FK(OrderId)] 	
	- [ShipSource]({{< ref "#shipsources" >}})(0..1) [FK(ShipSourceId)] 	
	- [WrappingType]({{< ref "#wrappingtypes" >}})(0..1) [FK(WrappingTypeId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## DeliveryPatterns
配送パターン

|        列名         |   型    | 最大長 | 主キー | Identity | NULL許容 |                               説明                                |
| ------------------- | ------- | ------ | :----: | :------: | :------: | ----------------------------------------------------------------- |
| Id                  | Int32   |        |   O    |    O     |          | 配送ID                                                            |
| ShipSourceId        | Int32   |        |        |          |          | 配送ソースID                                                      |
| DeliveryPatternName | String  | 50     |        |          |    O     | 配送パターン名称                                                  |
| CanMailDelivery     | Boolean |        |        |          |          | メール便可                                                        |
| TemperatureZone     | Int32   |        |        |          |          | 配送温度帯区分 [TemperatureZone]({{< ref "enum#temperaturezone" >}}) |

+ Parents
+ Children
	- [Products]({{< ref "#products" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## DeliveryStocks
配送可能在庫

|           列名            |    型    | 最大長 | 主キー | Identity | NULL許容 |       説明       |
| ------------------------- | -------- | ------ | :----: | :------: | :------: | ---------------- |
| ProductId                 | Int32    |        |   O    |          |          | 商品ID           |
| Amount                    | Int32    |        |        |          |          | 在庫数           |
| ReserveCount              | Int32    |        |        |          |          | 予約数           |
| WarehouseStockCount       | Int32    |        |        |          |    O     | 倉庫在庫数       |
| WarehouseCountAt          | DateTime |        |        |          |    O     | 倉庫在庫更新日時 |
| TheoreticalStockCount     | Int32    |        |        |          |    O     | 論理在庫数       |
| WarehouseReturnStockCount | Int32    |        |        |          |    O     | 倉庫返却在庫数   |
| BrokenAmount              | Int32    |        |        |          |    O     | 故障在庫         |

+ Parents
+ Children
	- [Product]({{< ref "#products" >}})(1)
+ Realations
---------------------------------------------------------------------------------------

## ExternalStockCounts
外部在庫数

|       列名        |    型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ----------------- | -------- | ------ | :----: | :------: | :------: | ------------ |
| ProductId         | Int32    |        |   O    |          |          | 商品ID       |
| ExternalSourceId  | Int32    |        |   O    |          |          | 外部ソースID |
| StockRequestStart | DateTime |        |        |          |    O     | TODO         |
| CountDate         | DateTime |        |        |          |    O     | TODO         |
| Amount            | Int32    |        |        |          |    O     | 総量         |
| Remains           | Int32    |        |        |          |    O     | 残量         |

+ Parents
	- [Product]({{< ref "#products" >}})(1) [FK(ProductId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ExternalStockSources
外部在庫ソース

|    列名    |   型   | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ---------- | ------ | ------ | :----: | :------: | :------: | ------------ |
| Id         | Int32  |        |   O    |    O     |          | 外部ソースID |
| SourceName | String | 50     |        |          |          | ソース名     |

+ Parents
+ Children
	- [ReserveStocks]({{< ref "#reservestocks" >}})(*)
	- [SalesStockAllocationPriorities]({{< ref "#salesstockallocationpriorities" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## Favorites
お気に入り

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 |   説明   |
| ---------- | -------- | ------ | :----: | :------: | :------: | -------- |
| UserNo     | Int64    |        |   O    |          |          | ユーザNo |
| ProductId  | Int32    |        |   O    |          |          | 商品ID   |
| RegisterAt | DateTime |        |        |          |          | 登録日時 |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## HourRanges
配送時間

|     列名      |   型   |     最大長      | 主キー | Identity | NULL許容 |                   説明                    |
| ------------- | ------ | --------------- | :----: | :------: | :------: | ----------------------------------------- |
| ShipSourceId  | Int32  |                 |   O    |          |          | 配送ソースID                              |
| HourRangeCode | String | 4(fixed length) |   O    |          |          | 着時間コード 例：午前８時から正午 => 0812 |
| StartHour     | Int32  |                 |        |          |          | 到着下限                                  |
| EndHour       | Int32  |                 |        |          |          | 到着上限                                  |

+ Parents
	- [ShipSource]({{< ref "#shipsources" >}})(1) [FK(ShipSourceId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## LastUpdateRecords
最終更新レコード

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 |                    説明                    |
| ---------- | -------- | ------ | :----: | :------: | :------: | ------------------------------------------ |
| RecordType | Int32    |        |   O    |          |          | 1: 受注情報,  3: 住所情報, 5: ユーザー情報 |
| TargetId   | Int64    |        |   O    |          |          | ターゲットID                               |
| UpdateAt   | DateTime |        |        |          |          | 更新日時                                   |
| DeleteAt   | DateTime |        |        |          |    O     | 削除日時                                   |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Leadtimes
リードタイム 郵便番号別に必要になるリードタイム

|       列名       |   型    |      最大長      | 主キー | Identity | NULL許容 |                               説明                                |
| ---------------- | ------- | ---------------- | :----: | :------: | :------: | ----------------------------------------------------------------- |
| ShipSourceId     | Int32   |                  |   O    |          |          | 配送ソースID                                                      |
| ZipCode          | String  | 10(fixed length) |   O    |          |          | 郵便番号                                                          |
| TemperatureZone  | Int32   |                  |   O    |          |          | 配送温度帯区分 [TemperatureZone]({{< ref "enum#temperaturezone" >}}) |
| LeadtimeValue    | Int32   |                  |        |          |          | リードタイム[日]                                                  |
| CanCashOnDeliver | Boolean |                  |        |          |          | 代引き可                                                          |
| CanCool          | Boolean |                  |        |          |          | クール便可                                                        |
| CanFreez         | Boolean |                  |        |          |          | 冷凍可                                                            |
| CanSetHour       | Boolean |                  |        |          |          | 配送時間指定可                                                    |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## MailHistories
メール送信履歴

|     列名     |    型    | 最大長 | 主キー | Identity | NULL許容 |         説明         |
| ------------ | -------- | ------ | :----: | :------: | :------: | -------------------- |
| Id           | Int64    |        |   O    |    O     |          | メールID             |
| MailType     | Int32    |        |        |          |          | メールタイプ         |
| TemplateName | String   | 128    |        |          |    O     | メールテンプレート名 |
| SendAt       | DateTime |        |        |          |          | 送信日時             |
| Sender       | String   | 128    |        |          |          | 送り主メールアドレス |
| Recipient    | String   | 128    |        |          |          | 送り先メールアドレス |
| Subject      | String   | 1000   |        |          |          | 題                   |
| Body         | String   | Max    |        |          |          | 本文                 |
| UserNo       | Int64    |        |        |          |    O     | ユーザNo             |
| RelateId     | Int64    |        |        |          |    O     | 受注ID               |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(0..1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## MailRequests
送信待ちメールリスト

|     列名     |    型    | 最大長 | 主キー | Identity | NULL許容 |         説明         |
| ------------ | -------- | ------ | :----: | :------: | :------: | -------------------- |
| Id           | Int64    |        |   O    |    O     |          | メールID             |
| MailType     | Int32    |        |        |          |          | メールタイプ         |
| TemplateName | String   | 128    |        |          |          | メールテンプレート名 |
| SendAt       | DateTime |        |        |          |          | 送信日時             |
| Sender       | String   | 128    |        |          |          | 送り主メールアドレス |
| Recipient    | String   | 128    |        |          |          | 送り先メールアドレス |
| RelateId     | Int64    |        |        |          |    O     | 受注ID               |
| UserNo       | Int64    |        |        |          |    O     | ユーザNo             |
| TemplateData | String   | Max    |        |          |          | テンプレート引数     |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(0..1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Memos
メモ、BOの各項目でのみ確認可能

| 列名 |   型   | 最大長 | 主キー | Identity | NULL許容 |  説明  |
| ---- | ------ | ------ | :----: | :------: | :------: | ------ |
| Id   | Int64  |        |   O    |    O     |          | メモID |
| Text | String | Max    |        |          |          | 本文   |

+ Parents
+ Children
	- [OperationHistories]({{< ref "#operationhistories" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## NationalHolidays
国民の休日

| 列名 |    型    | 最大長 | 主キー | Identity | NULL許容 | 説明 |
| ---- | -------- | ------ | :----: | :------: | :------: | ---- |
| Date | DateTime |        |   O    |          |          | 休日 |
| Name | String   | 100    |        |          |    O     | 名称 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## OperationHistories
オペレーション履歴

|      列名       |    型    |      最大長      | 主キー | Identity | NULL許容 |        説明        |
| --------------- | -------- | ---------------- | :----: | :------: | :------: | ------------------ |
| Id              | Int64    |                  |   O    |    O     |          | オペレーションID   |
| OperationAt     | DateTime |                  |        |          |          | オペレーション日時 |
| OriginalInfo    | String   | Max              |        |          |    O     | 変更前データ       |
| ChangeInfo      | String   | Max              |        |          |    O     | 変更後データ       |
| TargetTable     | String   | 50(fixed length) |        |          |          | 変更対象テーブル名 |
| OperatorAccount | Guid     |                  |        |          |    O     | 実行アカウント     |
| UserNo          | Int64    |                  |        |          |    O     | 実行ユーザNo       |
| ProductId       | Int32    |                  |        |          |    O     | 商品ID             |
| Reason          | Int32    |                  |        |          |          | 理由ID             |
| MemoId          | Int64    |                  |        |          |    O     | メモID             |

+ Parents
	- [Memo]({{< ref "#memos" >}})(0..1) [FK(MemoId)] 	
	- [OperationReason]({{< ref "#operationreasons" >}})(1) [FK(Reason)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## OperationReasons
オペレーション理由

|  列名  |   型   | 最大長 | 主キー | Identity | NULL許容 |         説明         |
| ------ | ------ | ------ | :----: | :------: | :------: | -------------------- |
| Id     | Int32  |        |   O    |    O     |          | オペレーション理由ID |
| Reason | String | 50     |        |          |          | 本文                 |

+ Parents
+ Children
	- [OperationHistories]({{< ref "#operationhistories" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## OrderAmountHistories
受注数履歴

|    列名     |  型   | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ----------- | ----- | ------ | :----: | :------: | :------: | ------------ |
| HistoryId   | Int64 |        |   O    |    O     |          | 受注数履歴ID |
| UserNo      | Int64 |        |        |          |          | ユーザNo     |
| OrderId     | Int64 |        |        |          |          | 受注ID       |
| ProductId   | Int32 |        |        |          |          | 商品ID       |
| OrderAmount | Int32 |        |        |          |          | 受注数       |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## OrderCustomers
購入者

|         列名         |    型    |      最大長      | 主キー | Identity | NULL許容 |                                      説明                                      |
| -------------------- | -------- | ---------------- | :----: | :------: | :------: | ------------------------------------------------------------------------------ |
| Id                   | Int32    |                  |   O    |    O     |          | 購入者ID                                                                       |
| IsGuest              | Boolean  |                  |        |          |          | ゲストフラグ                                                                   |
| UserNo               | Int64    |                  |        |          |    O     | ユーザNo                                                                       |
| MemberRank           | Int32    |                  |        |          |    O     | 会員ランク                                                                     |
| MemberStatus         | Int32    |                  |        |          |    O     | 会員ステータス [MemberStatus]({{< ref "enum#memberstatus" >}})                 |
| OrdererName          | String   | 20(fixed length) |        |          |    O     | 受注者名                                                                       |
| FirstName            | String   | 50               |        |          |          | 購入者　名                                                                     |
| LastName             | String   | 50               |        |          |          | 購入者　姓                                                                     |
| FirstNameKana        | String   | 50               |        |          |          | 購入者　メイ                                                                   |
| LastNameKana         | String   | 50               |        |          |          | 購入者　セイ                                                                   |
| MailAddress          | String   | 128              |        |          |          | 購入者メールアドレス [Email制約]({{< ref "../validation#email" >}})            |
| CreditCardNumber     | String   | 20(fixed length) |        |          |    O     | Deprecate [CreditCardNumber制約]({{< ref "../validation#creditcardnumber" >}}) |
| CreditCardExpire     | String   | 10(fixed length) |        |          |    O     | Deprecate                                                                      |
| CreditSecurity       | String   | 10(fixed length) |        |          |    O     | Deprecate [CreditSecurity制約]({{< ref "../validation#creditsecurity" >}})     |
| AuthorizeNo          | String   | 128              |        |          |    O     | 与信番号                                                                       |
| AuthorizeAt          | DateTime |                  |        |          |    O     | 与信日時                                                                       |
| CreditResponseStatus | String   | 10(fixed length) |        |          |    O     | Deprecate                                                                      |
| TransactionNo        | String   | 128              |        |          |    O     | トランザクション番号                                                           |
| NumberOfPayments     | Int32    |                  |        |          |    O     | 支払回数                                                                       |
| AuthorizeError       | Boolean  |                  |        |          |    O     | 与信エラー                                                                     |
| OrderedAddressId     | Int64    |                  |        |          |    O     | 購入者 住所ID                                                                  |
| InvoiceAddressId     | Int64    |                  |        |          |    O     | 請求書 住所ID                                                                  |
| Birthday             | DateTime |                  |        |          |    O     | 購入者 誕生日                                                                  |
| Sex                  | Int32    |                  |        |          |    O     | 購入者 性別 [HumanSexes]({{< ref "enum#humansexes" >}})                        |
| OriginalOrderId      | String   | 128              |        |          |    O     | 複製元受注ID                                                                   |
| PaymentDetail        | String   | 128              |        |          |    O     | 支払詳細                                                                       |
| PaymentSlipNumber    | String   | 128              |        |          |    O     | 支払票番号                                                                     |
| PaymentSlipUrl       | String   | 256 or MAX       |        |          |    O     | 支払票URL ※旧: 256, 新: MAX                                                    |
| CompletePayment      | Boolean  |                  |        |          |    O     | 支払完了フラグ                                                                 |
| PaymentMailAddress   | String   | 128              |        |          |    O     | 支払メールアドレス                                                             |
| GuestAccessKey       | String   | 32(fixed length) |        |          |    O     | ゲストアクセスキー                                                             |
| AutoCancelDate       | DateTime |                  |        |          |    O     | 自動キャンセル日時                                                             |

+ Parents
	- [InvoiceAddress]({{< ref "#addresses" >}})(0..1) [FK(InvoiceAddressId)] 	
	- [OrderedAddress]({{< ref "#addresses" >}})(0..1) [FK(OrderedAddressId)] 	
	- [UserAccount]({{< ref "#useraccounts" >}})(0..1) [FK(UserNo)] 	
+ Children
	- [PurchaseOrders]({{< ref "#purchaseorders" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## OrderLines
受注明細

|         列名         |    型    | 最大長 | 主キー | Identity | NULL許容 |                             説明                              |
| -------------------- | -------- | ------ | :----: | :------: | :------: | ------------------------------------------------------------- |
| Id                   | Int64    |        |   O    |    O     |          | 受注明細ID                                                    |
| OrderLineType        | Int32    |        |        |          |          | 受注明細タイプ [OrderLineType]({{< ref "enum#orderlinetype" >}}) |
| OrderId              | Int64    |        |        |          |          | 受注ID                                                        |
| ReserveId            | Int64    |        |        |          |    O     | 予約ID                                                        |
| ArriveNoticeId       | Int64    |        |        |          |    O     | 着荷ID                                                        |
| ProductId            | Int32    |        |        |          |          | 商品ID                                                        |
| ParentId             | Int64    |        |        |          |    O     | 親商品ID(セット商品参照)                                      |
| OrderAmount          | Int32    |        |        |          |          | 受注数                                                        |
| AllocateAmount       | Int32    |        |        |          |          | 引当数                                                        |
| Allocating           | Boolean  |        |        |          |          | 引当中                                                        |
| UnitPrice            | Decimal  |        |        |          |          | 単価                                                          |
| ReportPrice          | Decimal  |        |        |          |    O     | 計上額                                                        |
| LinePrice            | Decimal  |        |        |          |          | 計（税込）                                                    |
| Tax                  | Decimal  |        |        |          |          | 税                                                            |
| PointUsage           | Decimal  |        |        |          |          | ポイント使用額                                                |
| PointUsageTax        | Decimal  |        |        |          |          | ポイント使用額（税分）                                        |
| PointUsagePrice      | Decimal  |        |        |          |          | ポイント使用額（単価x数量分）                                 |
| PointCharge          | Decimal  |        |        |          |          | 付与ポイント                                                  |
| PointChargeRate      | Int32    |        |        |          |          | ポイント付与率                                                |
| AllocateCompleteDate | DateTime |        |        |          |    O     | 引当完了日時                                                  |
| ExtraPoint           | Decimal  |        |        |          |    O     | 特別付与ポイント                                              |
| MemoId               | Int64    |        |        |          |    O     | メモID                                                        |
| ProductName          | String   | 200    |        |          |    O     | 商品名                                                        |
| DiscountPrice        | Decimal  |        |        |          |          | 値引額                                                        |
| Description          | String   | 256    |        |          |    O     | 説明 (カートイン時に付与可能)                                 |

+ Parents
	- [Product]({{< ref "#products" >}})(1) [FK(ProductId)] 	
	- [PurchaseOrder]({{< ref "#purchaseorders" >}})(1) [FK(OrderId)] 	
	- [ReserveStock]({{< ref "#reservestocks" >}})(0..1) [FK(ReserveId)] 	
+ Children
	- [ReturnOrderLines]({{< ref "#returnorderlines" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## OrdersLastUpdates
受注最終更新日時

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ---------- | -------- | ------ | :----: | :------: | :------: | ------------ |
| Id         | Int64    |        |   O    |          |          | 受注ID       |
| LastUpdate | DateTime |        |        |          |    O     | 最終更新日時 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PointBankAccounts
ポイントバンクアカウント

|      列名      |    型    |      最大長      | 主キー | Identity | NULL許容 |        説明         |
| -------------- | -------- | ---------------- | :----: | :------: | :------: | ------------------- |
| UserNo         | Int64    |                  |   O    |          |          | ユーザNo            |
| BankCode       | String   | 32(fixed length) |        |          |          | バンクコード="Modd" |
| ExpireDate     | DateTime |                  |        |          |          | 失効期限日時        |
| ActivePoint    | Int64    |                  |        |          |          | 有効ポイント        |
| TemporaryPoint | Int64    |                  |        |          |          | 仮ポイント          |
| CreateDate     | DateTime |                  |        |          |          | 最終作成日時        |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(1) 	
+ Children
	- [PointBankAllocates]({{< ref "#pointbankallocates" >}})(*)
	- [PointBankTransactions]({{< ref "#pointbanktransactions" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## PointBankAllocates
アーカイブ済みポイントレコード

|      列名       |    型    |      最大長      | 主キー | Identity | NULL許容 |                         説明                          |
| --------------- | -------- | ---------------- | :----: | :------: | :------: | ----------------------------------------------------- |
| TransactionNo   | Int64    |                  |   O    |          |          | ポイントトランザクションNo                            |
| UserNo          | Int64    |                  |        |          |          | ユーザNo                                              |
| BankCode        | String   | 32(fixed length) |        |          |          | バンクコード="Modd"                                   |
| PointType       | Int32    |                  |        |          |          | ポイントタイプ [PointType]({{< ref "enum#pointtype" >}}) |
| PointValue      | Int64    |                  |        |          |          | ポイント値                                            |
| CreateDate      | DateTime |                  |        |          |          | 作成日時                                              |
| ActivateDate    | DateTime |                  |        |          |    O     | アクティベート日時                                    |
| ExpireDate      | DateTime |                  |        |          |          | 失効期限                                              |
| DescriptionType | Int32    |                  |        |          |          | 説明タイプ 任意に設定可能                             |
| Descriptions    | String   | 256              |        |          |          | 説明                                                  |
| RelateKey       | String   | 64(fixed length) |        |          |          | 受注Id                                                |
| AllocateDate    | DateTime |                  |        |          |    O     | アーカイブ日時                                        |

+ Parents
	- [PointBankAccount]({{< ref "#pointbankaccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PointBankDepositLimits
本付与可能ポイント

|     列名     |    型    |      最大長      | 主キー | Identity | NULL許容 |              説明              |
| ------------ | -------- | ---------------- | :----: | :------: | :------: | ------------------------------ |
| UserNo       | Int64    |                  |   O    |          |          | ユーザNo                       |
| BankCode     | String   | 32(fixed length) |   O    |          |          | バンクコード=Modd              |
| ExpireDate   | DateTime |                  |   O    |          |          | 失効期限日時                   |
| DepositLimit | Int64    |                  |        |          |    O     | 本付与可能な額（仮付与の合計） |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PointBankLapsedSummaries
ポイント失効詳細

|      列名      |    型    |      最大長      | 主キー | Identity | NULL許容 |             説明             |
| -------------- | -------- | ---------------- | :----: | :------: | :------: | ---------------------------- |
| UserNo         | Int64    |                  |   O    |          |          | ユーザNo                     |
| BankCode       | String   | 32(fixed length) |   O    |          |          | バンクコード=Modd            |
| ExpireDate     | DateTime |                  |   O    |          |          | 失効日時                     |
| ActivePoint    | Int64    |                  |        |          |    O     | 失効日時に失効する本ポイント |
| TemporaryPoint | Int64    |                  |        |          |    O     | 失効日時に失効する仮ポイント |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PointBankTransactions
ポイントレコード

|      列名       |    型    |      最大長      | 主キー | Identity | NULL許容 |                         説明                          |
| --------------- | -------- | ---------------- | :----: | :------: | :------: | ----------------------------------------------------- |
| TransactionNo   | Int64    |                  |   O    |    O     |          | ポイントトランザクションID                            |
| UserNo          | Int64    |                  |        |          |          | ユーザNo                                              |
| BankCode        | String   | 32(fixed length) |        |          |          | バンクコード=Modd                                     |
| PointType       | Int32    |                  |        |          |          | ポイントタイプ [PointType]({{< ref "enum#pointtype" >}}) |
| PointValue      | Int64    |                  |        |          |          | ポイント値                                            |
| CreateDate      | DateTime |                  |        |          |          | 作成日時                                              |
| ActivateDate    | DateTime |                  |        |          |    O     | 本付与日時                                            |
| ExpireDate      | DateTime |                  |        |          |          | 失効期限日時                                          |
| DescriptionType | Int32    |                  |        |          |          | 説明タイプ 任意に設定可能                             |
| Descriptions    | String   | 256              |        |          |          | 説明                                                  |
| RelateKey       | String   | 64(fixed length) |        |          |          | 受注Id                                                |

+ Parents
	- [PointBankAccount]({{< ref "#pointbankaccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Prefectures
都道府県

| 列名 |   型   |     最大長      | 主キー | Identity | NULL許容 |    説明    |
| ---- | ------ | --------------- | :----: | :------: | :------: | ---------- |
| Id   | Int32  |                 |   O    |    O     |          | 都道府県ID |
| Name | String | 6(fixed length) |        |          |          | 都道府県名 |

+ Parents
+ Children
	- [DeliveryCharges]({{< ref "#deliverycharges" >}})(*)
	- [ZipCodes]({{< ref "#zipcodes" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## ProductStockSummaries
販売可能数

|    列名     |  型   | 最大長 | 主キー | Identity | NULL許容 |    説明    |
| ----------- | ----- | ------ | :----: | :------: | :------: | ---------- |
| ProductId   | Int32 |        |   O    |          |          | 商品ID     |
| LimitAmount | Int32 |        |        |          |          | 販売可能数 |

+ Parents
	- [Product]({{< ref "#products" >}})(1) [FK(ProductId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ProductStocks
商品在庫

|         列名          |   型   |      最大長      | 主キー | Identity | NULL許容 |      説明      |
| --------------------- | ------ | ---------------- | :----: | :------: | :------: | -------------- |
| ProductId             | Int32  |                  |   O    |          |          | 商品ID         |
| ExternalId1           | String | 32(fixed length) |        |          |    O     | 外部ID1        |
| ExternalId2           | String | 32(fixed length) |        |          |    O     | 外部ID2        |
| ExternalId3           | String | 32(fixed length) |        |          |    O     | 外部ID3        |
| ExternalId4           | String | 32(fixed length) |        |          |    O     | 外部ID4        |
| ProductName           | String | 200              |        |          |    O     | 商品名         |
| StoreSaleAmount       | Int32  |                  |        |          |          | 店舗販売可能数 |
| StoreStockAmount      | Int32  |                  |        |          |          | 店舗在庫数     |
| StoreOrderAmount      | Int32  |                  |        |          |          | 未出荷数       |
| StoreAllocateAmount   | Int32  |                  |        |          |          | 引当数         |
| StoreUnallocateAmount | Int32  |                  |        |          |          | 未引当数       |
| StoreReserveAmount    | Int32  |                  |        |          |          | 予備在庫数     |
| StoreBrokenAmount     | Int32  |                  |        |          |          | 不良在庫数     |
| RequestAmount         | Int32  |                  |        |          |          | 仮予約数       |
| PendingAmount         | Int32  |                  |        |          |          | 保留在庫数     |
| WarehouseStockAmount  | Int32  |                  |        |          |          | 倉庫在庫数     |
| ExternalStockAmount   | Int32  |                  |        |          |          | 基幹在庫数     |
| ExternalSaleAmount    | Int32  |                  |        |          |          | 基幹販売可能数 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Products
商品

|       列名        |    型    |      最大長      | 主キー | Identity | NULL許容 |                           説明                            |
| ----------------- | -------- | ---------------- | :----: | :------: | :------: | --------------------------------------------------------- |
| Id                | Int32    |                  |   O    |    O     |          | 商品ID                                                    |
| Name              | String   | 200              |        |          |          | 商品名                                                    |
| ProductType       | Int32    |                  |        |          |          | 商品タイプ [ProductType]({{< ref "enum#producttype" >}})     |
| SalesStart        | DateTime |                  |        |          |          | 販売開始日時                                              |
| SalesEnd          | DateTime |                  |        |          |    O     | 販売終了日時                                              |
| ReleaseDate       | DateTime |                  |        |          |    O     | 発売日                                                    |
| ReReleaseDate     | DateTime |                  |        |          |    O     | 再販日                                                    |
| ExternalId1       | String   | 32(fixed length) |        |          |          | 外部ID1 商品型番                                          |
| ExternalId2       | String   | 32(fixed length) |        |          |    O     | 外部ID2 商品枝番                                          |
| ExternalId3       | String   | 32(fixed length) |        |          |    O     | 外部ID3 品目コード                                        |
| ExternalId4       | String   | 32(fixed length) |        |          |    O     | 外部ID4 JANコード                                         |
| UnitPrice         | Decimal  |                  |        |          |    O     | 単価                                                      |
| SalesPatternId    | Int32    |                  |        |          |    O     | 販売パターンID                                            |
| DeliveryPatternId | Int32    |                  |        |          |    O     | 配送パターンID                                            |
| SetOnly           | Boolean  |                  |        |          |    O     | セット販売のみ可                                          |
| Cero              | Int32    |                  |        |          |    O     | CERO区分                                                  |
| MemoId            | Int64    |                  |        |          |    O     | メモID                                                    |
| SalesStatus       | Int32    |                  |        |          |    O     | 販売ステータス [SalesStatus]({{< ref "enum#salesstatus" >}}) |
| TaxationPrice     | Decimal  |                  |        |          |    O     | 課税対象単価                                              |
| OrderedProduct    | Boolean  |                  |        |          |    O     | 受注生産品フラグ                                          |

+ Parents
	- [DeliveryPattern]({{< ref "#deliverypatterns" >}})(0..1) [FK(DeliveryPatternId)] 	
	- [SalesPattern]({{< ref "#salespatterns" >}})(0..1) [FK(SalesPatternId)] 	
+ Children
	- [BeginingSalesControls]({{< ref "#beginingsalescontrols" >}})(*)
	- [BenefitItems]({{< ref "#benefititems" >}})(*)
	- [Children]({{< ref "#setproductchildren" >}})(*)
	- [DeliveryStock]({{< ref "#deliverystocks" >}})(0..1)
	- [ExternalStockCounts]({{< ref "#externalstockcounts" >}})(*)
	- [OrderLines]({{< ref "#orderlines" >}})(*)
	- [Parents]({{< ref "#setproductchildren" >}})(*)
	- [ProductStockSummary]({{< ref "#productstocksummaries" >}})(0..1)
	- [ReserveRequests]({{< ref "#reserverequests" >}})(*)
	- [ReserveStocks]({{< ref "#reservestocks" >}})(*)
	- [ReturnOrderLines]({{< ref "#returnorderlines" >}})(*)
	- [SalesProduct]({{< ref "#salesproducts" >}})(0..1)
+ Realations
	- [Campaigns]({{< ref "#campaigns" >}})(0..1)
	- [Categories]({{< ref "#categories" >}})(0..1)
---------------------------------------------------------------------------------------

## PurchaseHistories
受注履歴

|     列名      |    型    | 最大長 | 主キー | Identity | NULL許容 |        説明        |
| ------------- | -------- | ------ | :----: | :------: | :------: | ------------------ |
| UserNo        | Int64    |        |   O    |          |          | ユーザNo           |
| OrderId       | Int64    |        |   O    |          |          | 受注ID             |
| OrderDate     | DateTime |        |        |          |          | 受注日時           |
| SerializeData | String   | Max    |        |          |          | シリアライズデータ |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PurchaseOrderImports
取込済受注データ

|     列名      |   型   | 最大長 | 主キー | Identity | NULL許容 |      説明      |
| ------------- | ------ | ------ | :----: | :------: | :------: | -------------- |
| OrderId       | Int64  |        |   O    |          |          | 受注ID         |
| ImportOrderId | String | 64     |        |          |    O     | 取り込み受注ID |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PurchaseOrderServices
サービスバリュー　受注に付加可能なKeyValueストア

|  列名   |   型   | 最大長 | 主キー | Identity | NULL許容 |  説明  |
| ------- | ------ | ------ | :----: | :------: | :------: | ------ |
| OrderId | Int64  |        |   O    |          |          | 受注ID |
| Code    | String | 64     |   O    |          |          | コード |
| Value   | String | Max    |        |          |    O     | 値     |

+ Parents
	- [PurchaseOrder]({{< ref "#purchaseorders" >}})(1) [FK(OrderId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PurchaseOrderStatusHistories
受注ステータス変更履歴

|     列名     |    型    | 最大長 | 主キー | Identity | NULL許容 |       説明       |
| ------------ | -------- | ------ | :----: | :------: | :------: | ---------------- |
| Id           | Int64    |        |   O    |    O     |          | 受注変更ID       |
| OrderId      | Int64    |        |        |          |          | 受注ID           |
| BeforeStatus | Int32    |        |        |          |    O     | 変更前ステータス |
| AfterStatus  | Int32    |        |        |          |    O     | 変更後ステータス |
| TrackAt      | DateTime |        |        |          |          | 変更日時         |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## PurchaseOrders
受注

|             列名              |    型    |     最大長      | 主キー | Identity | NULL許容 |                               説明                               |
| ----------------------------- | -------- | --------------- | :----: | :------: | :------: | ---------------------------------------------------------------- |
| Id                            | Int64    |                 |   O    |    O     |          | 受注ID                                                           |
| OrderType                     | Int32    |                 |        |          |    O     | 受注タイプ [OrderType]({{< ref "enum#ordertype" >}})                |
| OrderStatus                   | Int32    |                 |        |          |          | 受注ステータス [OrderStatus]({{< ref "enum#orderstatus" >}})        |
| OrderDate                     | DateTime |                 |        |          |          | 受注日時                                                         |
| ShipRequestDate               | DateTime |                 |        |          |    O     | 配送要求日時                                                     |
| ShipDate                      | DateTime |                 |        |          |    O     | 配送日時                                                         |
| DeliveryCompleteDate          | DateTime |                 |        |          |    O     | 着荷日時                                                         |
| CustomerId                    | Int32    |                 |        |          |          | 購入者ID                                                         |
| PaymentMethod                 | Int32    |                 |        |          |          | 支払方法 [PaymentMethod]({{< ref "enum#paymentmethod" >}})          |
| PaymentStatus                 | Int32    |                 |        |          |          | 支払ステータス [PaymentStatus]({{< ref "enum#paymentstatus" >}})    |
| TaxRate                       | Int32    |                 |        |          |          | 税率                                                             |
| DeliveryCharge                | Decimal  |                 |        |          |          | 税込送料                                                         |
| PointPaymentForDeliveryCharge | Decimal  |                 |        |          |          | TotalUsagePointの内、送料に使用した量                            |
| TotalPayment                  | Decimal  |                 |        |          |          | 単価 x 数量 + 単価にかかる税(丸め済) x 数量 + 税込送料 + 手数料  |
| TotalUsagePoint               | Decimal  |                 |        |          |          | 使用ポイント                                                     |
| ReturnPrice                   | Decimal  |                 |        |          |          | 返金額                                                           |
| CashOnDeliveryCharge          | Decimal  |                 |        |          |          | 手数料                                                           |
| CardPayment                   | Decimal  |                 |        |          |          | Deprecate                                                        |
| TotalAmount                   | Int32    |                 |        |          |          | 数量                                                             |
| CancelBeforeStatus            | Int32    |                 |        |          |    O     | キャンセル前ステータス                                           |
| ReturnDate                    | DateTime |                 |        |          |    O     | 返品日                                                           |
| ExtraPoint                    | Decimal  |                 |        |          |    O     | 特別付与ポイント　カート分                                       |
| ExtraPointSummary             | Decimal  |                 |        |          |    O     | 特別付与ポイント = ExtraPoint + SUM(OrderLines[].ExtraPoint)     |
| SiteId                        | Int32    |                 |        |          |    O     | サイトID                                                         |
| MemoId                        | Int64    |                 |        |          |    O     | メモID                                                           |
| BookingEnable                 | Boolean  |                 |        |          |    O     | 計上許可                                                         |
| ChargePointSummary            | Decimal  |                 |        |          |    O     | 計付与ポイント                                                   |
| OriginalOrderId               | Int64    |                 |        |          |    O     | 複製元受注ID                                                     |
| EstimateShipDate              | DateTime |                 |        |          |    O     | 着日指定から算出される出荷予定日、nullの場合出荷準備出来次第出荷 |
| AllocationCompleteDate        | DateTime |                 |        |          |    O     | 引当完了日時                                                     |
| DeliveryReportDate            | DateTime |                 |        |          |    O     | 配送報告日時                                                     |
| ShipBookAt                    | DateTime |                 |        |          |    O     | 出荷計上日時                                                     |
| DeliveryBookAt                | DateTime |                 |        |          |    O     | 配送計上日時                                                     |
| ChangeStamp                   | Binary   | 8(fixed length) |        |          |    O     | チェンジスタンプ                                                 |
| DiscountPrice                 | Decimal  |                 |        |          |          | 割引額                                                           |
| PointPaymentForPaymentCharge  | Decimal  |                 |        |          |          | TotalUsagePointの内、決済手数料に使用した量                      |

+ Parents
	- [OrderCustomer]({{< ref "#ordercustomers" >}})(1) [FK(CustomerId)] 	
+ Children
	- [DeliveryOrder]({{< ref "#deliveryorders" >}})(0..1)
	- [OrderLines]({{< ref "#orderlines" >}})(*)
	- [OrdersLastUpdate]({{< ref "#orderslastupdates" >}})(0..1)
	- [OriginalPurchaseOrder]({{< ref "#purchaseorders" >}})(*)
	- [PurchaseOrderImport]({{< ref "#purchaseorderimports" >}})(0..1)
	- [RelatePurchaseOrders]({{< ref "#purchaseorders" >}})(*)
	- [ReserveRequests]({{< ref "#reserverequests" >}})(*)
	- [ReserveStocks]({{< ref "#reservestocks" >}})(*)
	- [ReturnOrders]({{< ref "#returnorders" >}})(*)
	- [ServiceValues]({{< ref "#purchaseorderservices" >}})(*)
+ Realations
	- [Campaigns]({{< ref "#campaigns" >}})(*)
---------------------------------------------------------------------------------------

## ReserveRequestStatusCounts
仮予約要求ステータス数量

|   列名    |  型   | 最大長 | 主キー | Identity | NULL許容 |                                  説明                                   |
| --------- | ----- | ------ | :----: | :------: | :------: | ----------------------------------------------------------------------- |
| ProductId | Int32 |        |   O    |          |          | 商品ID                                                                  |
| Status    | Int32 |        |   O    |          |          | ステータス [ReserveRequestStatus]({{< ref "enum#reserverequeststatus" >}}) |
| Count     | Int32 |        |        |          |    O     | 数量                                                                    |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ReserveRequests
仮予約要求

|      列名      |    型    | 最大長 | 主キー | Identity | NULL許容 |                                  説明                                   |
| -------------- | -------- | ------ | :----: | :------: | :------: | ----------------------------------------------------------------------- |
| Id             | Int64    |        |   O    |    O     |          | 仮予約ID                                                                |
| RequestAt      | DateTime |        |        |          |          | 仮予約日時                                                              |
| UserNo         | Int64    |        |        |          |          | ユーザNo                                                                |
| ProductId      | Int32    |        |        |          |          | 商品ID                                                                  |
| Amount         | Int32    |        |        |          |          | 数量                                                                    |
| Status         | Int32    |        |        |          |          | ステータス [ReserveRequestStatus]({{< ref "enum#reserverequeststatus" >}}) |
| OrderId        | Int64    |        |        |          |    O     | 受注ID                                                                  |
| ReserveStockId | Int64    |        |        |          |    O     | 仮予約在庫ID                                                            |
| MailAddress    | String   | 128    |        |          |    O     | メールアドレス                                                          |
| SiteId         | Int32    |        |        |          |          | サイトID                                                                |

+ Parents
	- [Product]({{< ref "#products" >}})(1) [FK(ProductId)] 	
	- [PurchaseOrder]({{< ref "#purchaseorders" >}})(0..1) 	
	- [ReserveStock]({{< ref "#reservestocks" >}})(0..1) [FK(ReserveStockId)] 	
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ReserveStocks
仮予約在庫数

|       列名       |    型    | 最大長 | 主キー | Identity | NULL許容 |           説明           |
| ---------------- | -------- | ------ | :----: | :------: | :------: | ------------------------ |
| ReserveId        | Int64    |        |   O    |    O     |          | 仮予約ID                 |
| UserNo           | Int64    |        |        |          |    O     | ユーザNo                 |
| OrderId          | Int64    |        |        |          |    O     | 受注ID                   |
| ProductId        | Int32    |        |        |          |    O     | 商品ID                   |
| Amount           | Int32    |        |        |          |    O     | 数量                     |
| ExpireAt         | DateTime |        |        |          |    O     | 期限                     |
| Purchased        | Boolean  |        |        |          |    O     | 支払済みフラグ           |
| ExternalSourceId | Int32    |        |        |          |    O     | NULLの場合内部在庫ストア |

+ Parents
	- [ExternalStockSource]({{< ref "#externalstocksources" >}})(0..1) 	
	- [Product]({{< ref "#products" >}})(0..1) [FK(ProductId)] 	
	- [PurchaseOrder]({{< ref "#purchaseorders" >}})(0..1) 	
	- [UserAccount]({{< ref "#useraccounts" >}})(0..1) [FK(UserNo)] 	
+ Children
	- [OrderLines]({{< ref "#orderlines" >}})(*)
	- [ReserveRequests]({{< ref "#reserverequests" >}})(*)
	- [ReturnOrderLines]({{< ref "#returnorderlines" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## ReturnOrderLines
返品明細

|         列名         |    型    | 最大長 | 主キー | Identity | NULL許容 |                           説明                            |
| -------------------- | -------- | ------ | :----: | :------: | :------: | --------------------------------------------------------- |
| Id                   | Int64    |        |   O    |    O     |          | 返品ID                                                    |
| OrderLineType        | Int32    |        |        |          |          | 明細タイプ [OrderLineType]({{< ref "enum#orderlinetype" >}}) |
| OrderId              | Int64    |        |        |          |          | 受注ID                                                    |
| ReserveId            | Int64    |        |        |          |    O     | 予約ID                                                    |
| ArriveNoticeId       | Int64    |        |        |          |    O     | 着荷ID                                                    |
| ProductId            | Int32    |        |        |          |          | 商品ID                                                    |
| ParentId             | Int64    |        |        |          |    O     | 複製元受注ID                                              |
| OrderAmount          | Int32    |        |        |          |          | 受注数                                                    |
| AllocateAmount       | Int32    |        |        |          |          | 引当数                                                    |
| Allocating           | Boolean  |        |        |          |          | 引当中                                                    |
| UnitPrice            | Decimal  |        |        |          |          | 単価                                                      |
| ReportPrice          | Decimal  |        |        |          |    O     | 計上額                                                    |
| LinePrice            | Decimal  |        |        |          |          | 計                                                        |
| Tax                  | Decimal  |        |        |          |          | 税                                                        |
| PointUsage           | Decimal  |        |        |          |          | 使用ポイント                                              |
| PointUsageTax        | Decimal  |        |        |          |          | 使用ポイント　税額分                                      |
| PointUsagePrice      | Decimal  |        |        |          |          | 使用ポイント　商品額分                                    |
| PointCharge          | Decimal  |        |        |          |          | 付与ポイント                                              |
| PointChargeRate      | Int32    |        |        |          |          | ポイント付与率                                            |
| AllocateCompleteDate | DateTime |        |        |          |    O     | 引当完了日時                                              |
| ExtraPoint           | Decimal  |        |        |          |    O     | 特別付与ポイント                                          |
| MemoId               | Int64    |        |        |          |    O     | メモID                                                    |
| PurchaseOrderLineId  | Int64    |        |        |          |    O     | 受注明細ID                                                |
| ProductName          | String   | 200    |        |          |    O     | 商品名                                                    |
| DiscountPrice        | Decimal  |        |        |          |          | 割引額                                                    |
| Description          | String   | 256    |        |          |    O     | 説明                                                      |

+ Parents
	- [OrderLine]({{< ref "#orderlines" >}})(0..1) [FK(PurchaseOrderLineId)] 	
	- [Product]({{< ref "#products" >}})(1) [FK(ProductId)] 	
	- [ReserveStock]({{< ref "#reservestocks" >}})(0..1) [FK(ReserveId)] 	
	- [ReturnOrder]({{< ref "#returnorders" >}})(1) 	
+ Children
	- [ParentReturnOrderLine]({{< ref "#returnorderlines" >}})(*)
	- [RelateReturnOrderLines]({{< ref "#returnorderlines" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## ReturnOrders
返品受注

|             列名              |    型    | 最大長 | 主キー | Identity | NULL許容 |                           説明                            |
| ----------------------------- | -------- | ------ | :----: | :------: | :------: | --------------------------------------------------------- |
| Id                            | Int64    |        |   O    |    O     |          | 受注ID                                                    |
| OrderType                     | Int32    |        |        |          |    O     | 受注タイプ [OrderType]({{< ref "enum#ordertype" >}})         |
| OrderStatus                   | Int32    |        |        |          |          | 受注ステータス [OrderStatus]({{< ref "enum#orderstatus" >}}) |
| OrderDate                     | DateTime |        |        |          |          | 受注日時                                                  |
| ShipRequestDate               | DateTime |        |        |          |    O     | 配送要求日時                                              |
| ShipDate                      | DateTime |        |        |          |    O     | 配送日時                                                  |
| DeliveryCompleteDate          | DateTime |        |        |          |    O     | 着荷日時                                                  |
| CustomerId                    | Int32    |        |        |          |          | 購入者ID                                                  |
| PaymentMethod                 | Int32    |        |        |          |          | 支払方法 [PaymentMethod]({{< ref "enum#paymentmethod" >}})   |
| PaymentStatus                 | Int32    |        |        |          |          | 支払状況 [PaymentStatus]({{< ref "enum#paymentstatus" >}})   |
| TaxRate                       | Int32    |        |        |          |          | 税率                                                      |
| DeliveryCharge                | Decimal  |        |        |          |          | 送料                                                      |
| PointPaymentForDeliveryCharge | Decimal  |        |        |          |          | 使用ポイント 送料分                                       |
| TotalPayment                  | Decimal  |        |        |          |          | 支払合計                                                  |
| TotalUsagePoint               | Decimal  |        |        |          |          | 使用ポイント合計                                          |
| ReturnPrice                   | Decimal  |        |        |          |          | 返金額                                                    |
| CaseOnDeliveryCharge          | Decimal  |        |        |          |          | 手数料                                                    |
| CardPayment                   | Decimal  |        |        |          |          | Deprecate                                                 |
| totalAmount                   | Int32    |        |        |          |          | 数量                                                      |
| CancelBeforeStatus            | Int32    |        |        |          |    O     | キャンセル前ステータス                                    |
| ReturnDate                    | DateTime |        |        |          |    O     | 返品日時                                                  |
| ExtraPoint                    | Decimal  |        |        |          |    O     | 特別ポイント                                              |
| ExtraPointSummary             | Decimal  |        |        |          |    O     | 特別ポイント合計                                          |
| SiteId                        | Int32    |        |        |          |    O     | サイトID                                                  |
| MemoId                        | Int64    |        |        |          |    O     | メモID                                                    |
| BookingEnable                 | Boolean  |        |        |          |    O     | 計上許可                                                  |
| ChargePointSummary            | Decimal  |        |        |          |    O     | 付与ポイント合計                                          |
| OriginalOrderId               | Int64    |        |        |          |    O     | 複製元受注ID                                              |
| EstimateShipDate              | DateTime |        |        |          |    O     | 見積もり配送日時                                          |
| AllocationCompleteDate        | DateTime |        |        |          |    O     | 引当完了日時                                              |
| DeliveryReportDate            | DateTime |        |        |          |    O     | 配送報告日時                                              |
| ShipBookAt                    | DateTime |        |        |          |    O     | 出荷計上日時                                              |
| DeliveryBookAt                | DateTime |        |        |          |    O     | 配送計上日時                                              |
| ReturnReasonId                | Int32    |        |        |          |          | 返品理由ID                                                |
| PurchaseOrderId               | Int64    |        |        |          |          | 受注ID                                                    |
| DiscountPrice                 | Decimal  |        |        |          |          | 割引額                                                    |
| PointPaymentForPaymentCharge  | Decimal  |        |        |          |          | ポイント使用額　手数料分                                  |

+ Parents
	- [PurchaseOrder]({{< ref "#purchaseorders" >}})(1) [FK(PurchaseOrderId)] 	
	- [ReturnReason]({{< ref "#returnreasons" >}})(1) [FK(ReturnReasonId)] 	
+ Children
	- [OriginalReturnOrder]({{< ref "#returnorders" >}})(*)
	- [RelateReturnOrders]({{< ref "#returnorders" >}})(*)
	- [ReturnOrderLines]({{< ref "#returnorderlines" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## ReturnReasons
返品理由

|          列名          |   型    | 最大長 | 主キー | Identity | NULL許容 |                 説明                 |
| ---------------------- | ------- | ------ | :----: | :------: | :------: | ------------------------------------ |
| Id                     | Int32   |        |   O    |          |          | 返品理由ID                           |
| Name                   | String  | 50     |        |          |          | 返品理由名称                         |
| DeliverlyStatus        | Int32   |        |        |          |    O     | 配送ステータス                       |
| StockOperation         | Int32   |        |        |          |          | 在庫オペレーション                   |
| MoneyTransactionCancel | Boolean |        |        |          |          | 支払トランザクションキャンセルフラグ |
| PointChargeBack        | Boolean |        |        |          |          | 付与ポイント回収フラグ               |
| PointUseBack           | Boolean |        |        |          |          | 使用ポイント返還フラグ               |
| CreateReDeliverly      | Boolean |        |        |          |          | 再配送可能フラグ                     |
| CancelExternal1        | Boolean |        |        |          |    O     | キャンセル外部ID1                    |
| CancelExternal2        | Boolean |        |        |          |    O     | キャンセル外部ID2                    |
| CancelExternal3        | Boolean |        |        |          |    O     | キャンセル外部ID3                    |
| CancelExternal4        | Boolean |        |        |          |    O     | キャンセル外部ID4                    |

+ Parents
+ Children
	- [ReturnOrders]({{< ref "#returnorders" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## Roles
ユーザーロール

| 列名 |   型   | 最大長 | 主キー | Identity | NULL許容 |   説明   |
| ---- | ------ | ------ | :----: | :------: | :------: | -------- |
| No   | Int64  |        |   O    |    O     |          | ロールNo |
| Name | String | 256    |        |          |          | ロール名 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## SalesPatterns
販売パターン

|          列名           |   型    | 最大長 | 主キー | Identity | NULL許容 |                           説明                            |
| ----------------------- | ------- | ------ | :----: | :------: | :------: | --------------------------------------------------------- |
| Id                      | Int32   |        |   O    |    O     |          | 販売パターンID                                            |
| Name                    | String  | 128    |        |          |          | 販売パターン名                                            |
| MemberRank              | Int32   |        |        |          |    O     | 会員ランク                                                |
| CartId                  | Int32   |        |        |          |          | カートID                                                  |
| PaymentMethodBits       | Int32   |        |        |          |          | 支払方法 Bits                                             |
| SinglePurchaseOnly      | Boolean |        |        |          |          | 一括支払のみ                                              |
| CanGuestPurchase        | Boolean |        |        |          |          | ゲスト購入可                                              |
| CanSetDeliveryDate      | Boolean |        |        |          |          | 配送日指定可                                              |
| CanSetDeliveryHour      | Boolean |        |        |          |          | 配送時間帯指定可                                          |
| PointChargeRate         | Int32   |        |        |          |          | ポイント付与率                                            |
| StockControlMode        | Int32   |        |        |          |          | 在庫割当モード                                            |
| MaxReserveRequestAmount | Int32   |        |        |          |    O     | 最大予約数                                                |
| MaxPurchasePerAccount   | Int32   |        |        |          |    O     | アカウント毎最大購入数                                    |
| MaxPurchasePerOrder     | Int32   |        |        |          |    O     | 受注毎最大購入数                                          |
| InternalStockPriority   | Int32   |        |        |          |    O     | 内部在庫優先順序                                          |
| EnableUserCancel        | Boolean |        |        |          |    O     | ユーザキャンセル許可                                      |
| TaxRoundMode            | Int32   |        |        |          |    O     | 税丸めモード [TaxRoundMode]({{< ref "enum#taxroundmode" >}}) |
| EnableReserveOrder      | Boolean |        |        |          |    O     | 仮予約可                                                  |
| MaxMailDeliveryPerOrder | Int32   |        |        |          |    O     | 受注毎最大メール便数                                      |

+ Parents
	- [StockControl]({{< ref "#stockcontrols" >}})(1) [FK(StockControlMode)] 	
+ Children
	- [Products]({{< ref "#products" >}})(*)
	- [SalesStockAllocationPriorities]({{< ref "#salesstockallocationpriorities" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## SalesProducts
商品毎セールスパターン

|          列名           |   型    | 最大長 | 主キー | Identity | NULL許容 |                     説明                     |
| ----------------------- | ------- | ------ | :----: | :------: | :------: | -------------------------------------------- |
| ProductId               | Int32   |        |   O    |          |          |                                              |
| MemberRank              | Int32   |        |        |          |    O     |                                              |
| CartId                  | Int32   |        |        |          |    O     |                                              |
| PaymentMethodBits       | Int32   |        |        |          |    O     |                                              |
| SinglePurchaseOnly      | Boolean |        |        |          |    O     |                                              |
| CanGuestPurchase        | Boolean |        |        |          |    O     |                                              |
| CanSetDeliveryDate      | Boolean |        |        |          |    O     |                                              |
| CanSetDeliveryHour      | Boolean |        |        |          |    O     |                                              |
| PointChargeRate         | Int32   |        |        |          |    O     |                                              |
| StockControlMode        | Int32   |        |        |          |    O     |                                              |
| MaxReserveRequestAmount | Int32   |        |        |          |    O     |                                              |
| MaxPurchasePerAccount   | Int32   |        |        |          |    O     |                                              |
| MaxPurchasePerOrder     | Int32   |        |        |          |    O     |                                              |
| InternalStockPriority   | Int32   |        |        |          |    O     |                                              |
| EnableUserCancel        | Boolean |        |        |          |    O     |                                              |
| TaxRoundMode            | Int32   |        |        |          |    O     | [TaxRoundMode]({{< ref "enum#taxroundmode" >}}) |
| EnableReserveOrder      | Boolean |        |        |          |    O     |                                              |
| MaxMailDeliveryPerOrder | Int32   |        |        |          |    O     |                                              |

+ Parents
+ Children
	- [Product]({{< ref "#products" >}})(1)
+ Realations
---------------------------------------------------------------------------------------

## SalesStatusMaster
販売ステータスマスター

| 列名 |   型   |      最大長      | 主キー | Identity | NULL許容 |         説明         |
| ---- | ------ | ---------------- | :----: | :------: | :------: | -------------------- |
| Id   | Int32  |                  |   O    |          |          | 販売ステータスマスタ |
| Name | String | 10(fixed length) |        |          |          | 名称                 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## SalesStockAllocationPriorities
在庫割り当て優先順位

|       列名       |  型   | 最大長 | 主キー | Identity | NULL許容 |        説明        |
| ---------------- | ----- | ------ | :----: | :------: | :------: | ------------------ |
| SalesPatternId   | Int32 |        |   O    |          |          | セールスパターンID |
| ExternalSourceId | Int32 |        |   O    |          |          | 外部在庫ID         |
| Priority         | Int32 |        |        |          |          | 優先順位           |

+ Parents
	- [ExternalStockSource]({{< ref "#externalstocksources" >}})(1) 	
	- [SalesPattern]({{< ref "#salespatterns" >}})(1) [FK(SalesPatternId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## SalesStockSummaries
販売可能数サマリ

|       列名       |  型   | 最大長 | 主キー | Identity | NULL許容 |      説明      |
| ---------------- | ----- | ------ | :----: | :------: | :------: | -------------- |
| ProductId        | Int32 |        |   O    |          |          | 商品ID         |
| ExternalSourceId | Int32 |        |   O    |          |          | 外部在庫ID     |
| Priority         | Int32 |        |        |          |    O     | 優先順位       |
| InAmount         | Int32 |        |        |          |          | 店舗販売可能数 |
| ExAmount         | Int32 |        |        |          |          | 外部販売可能数 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## SetProductChildren
セット商品

|      列名      |   型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| -------------- | ------- | ------ | :----: | :------: | :------: | ------------ |
| SetProductId   | Int32   |        |   O    |          |          | セット商品ID |
| ChildProductId | Int32   |        |   O    |          |          | 子商品ID     |
| Amount         | Int32   |        |        |          |          | 数量         |
| DividePrice    | Decimal |        |        |          |          | 分割価格     |

+ Parents
	- [ChildProduct]({{< ref "#products" >}})(1) [FK(ChildProductId)] 	
	- [ParentProduct]({{< ref "#products" >}})(1) [FK(SetProductId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ShipSourceHolidays
配送ソースの休日

|     列名     |    型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ------------ | -------- | ------ | :----: | :------: | :------: | ------------ |
| ShipSourceId | Int32    |        |   O    |          |          | 配送ソースID |
| Holiday      | DateTime |        |   O    |          |          | 休日         |

+ Parents
	- [ShipSource]({{< ref "#shipsources" >}})(1) [FK(ShipSourceId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ShipSourceUnavailables
配送ソースの配送不可エリア

|      列名       |   型   |      最大長      | 主キー | Identity | NULL許容 |      説明      |
| --------------- | ------ | ---------------- | :----: | :------: | :------: | -------------- |
| ShipSourceId    | Int32  |                  |   O    |          |          | 配送ソースID   |
| UnavailableType | Int32  |                  |   O    |          |          | 配送不可タイプ |
| ZipCode         | String | 10(fixed length) |   O    |          |          | 郵便番号       |

+ Parents
	- [ShipSource]({{< ref "#shipsources" >}})(1) [FK(ShipSourceId)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ShipSources
配送ソース

|         列名          |   型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| --------------------- | ------- | ------ | :----: | :------: | :------: | ------------ |
| Id                    | Int32   |        |   O    |          |          | 配送ソースID |
| Deliverer             | String  | 50     |        |          |          | 名称         |
| WorkOnSunday          | Boolean |        |        |          |          | 日曜日配送可 |
| WorkOnSaturday        | Boolean |        |        |          |          | 土曜日配送可 |
| WorkOnNationalHoliday | Boolean |        |        |          |          | 祝日配送可   |

+ Parents
+ Children
	- [DeliveryCharges]({{< ref "#deliverycharges" >}})(*)
	- [DeliveryOrders]({{< ref "#deliveryorders" >}})(*)
	- [HourRanges]({{< ref "#hourranges" >}})(*)
	- [ShipSourceHolidays]({{< ref "#shipsourceholidays" >}})(*)
	- [ShipSourceUnavailables]({{< ref "#shipsourceunavailables" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## StockControls
在庫割当モード

|       列名       |   型    | 最大長 | 主キー | Identity | NULL許容 |       説明       |
| ---------------- | ------- | ------ | :----: | :------: | :------: | ---------------- |
| StockControlMode | Int32   |        |   O    |          |          | 在庫割当モードID |
| ExternalStock    | Boolean |        |        |          |          | 外部在庫フラグ   |

+ Parents
+ Children
	- [SalesPatterns]({{< ref "#salespatterns" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## TaxRates
税率

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 |   説明   |
| ---------- | -------- | ------ | :----: | :------: | :------: | -------- |
| StartDate  | DateTime |        |   O    |          |          | 開始日時 |
| Percentage | Int32    |        |        |          |          | 税率     |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserAccounts
ユーザアカウント

|     列名     |    型    | 最大長 | 主キー | Identity | NULL許容 |        説明        |
| ------------ | -------- | ------ | :----: | :------: | :------: | ------------------ |
| UserNo       | Int64    |        |   O    |    O     |          | ユーザNo           |
| IsAnonymous  | Boolean  |        |        |          |          | ゲストフラグ       |
| IsActive     | Boolean  |        |        |          |          | 有効フラグ         |
| UserName     | String   | 256    |        |          |    O     | ユーザ名           |
| CreateDate   | DateTime |        |        |          |          | 作成日時           |
| ActivateDate | DateTime |        |        |          |    O     | アクティベート日時 |
| QuitDate     | DateTime |        |        |          |    O     | 退会日時           |

+ Parents
+ Children
	- [Favorites]({{< ref "#favorites" >}})(*)
	- [MailHistories]({{< ref "#mailhistories" >}})(*)
	- [MailRequests]({{< ref "#mailrequests" >}})(*)
	- [OrderCustomers]({{< ref "#ordercustomers" >}})(*)
	- [PointBankAccounts]({{< ref "#pointbankaccounts" >}})(*)
	- [PurchaseHistories]({{< ref "#purchasehistories" >}})(*)
	- [ReserveRequests]({{< ref "#reserverequests" >}})(*)
	- [ReserveStocks]({{< ref "#reservestocks" >}})(*)
	- [UserAddresses]({{< ref "#useraddresses" >}})(*)
	- [UserExternalKeys]({{< ref "#userexternalkeys" >}})(*)
	- [UserProperty]({{< ref "#userproperties" >}})(0..1)
	- [UserRole]({{< ref "#userroles" >}})(*)
	- [UsersLastUpdate]({{< ref "#userslastupdates" >}})(0..1)
+ Realations
---------------------------------------------------------------------------------------

## UserAddresses
ユーザ登録住所

|    列名     |   型   | 最大長 | 主キー | Identity | NULL許容 |                               説明                               |
| ----------- | ------ | ------ | :----: | :------: | :------: | ---------------------------------------------------------------- |
| UserNo      | Int64  |        |   O    |          |          | ユーザNo                                                         |
| AddressId   | Int64  |        |   O    |          |          | 住所ID                                                           |
| AddressName | String | 128    |        |          |          | 住所名[AddressName制約]({{< ref "../validation#addressname" >}}) |

+ Parents
	- [Address]({{< ref "#addresses" >}})(1) [FK(AddressId)] 	
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserAuthentications
ユーザ認証情報

|      列名      |    型    | 最大長 | 主キー | Identity | NULL許容 |         説明         |
| -------------- | -------- | ------ | :----: | :------: | :------: | -------------------- |
| UserNo         | Int64    |        |   O    |          |          | ユーザNo             |
| Password       | String   | 256    |   O    |          |          | パスワードハッシュ   |
| CreateDate     | DateTime |        |        |          |          | 作成日時             |
| FailedCount    | Int32    |        |        |          |          | ログイン失敗数       |
| LastFailedDate | DateTime |        |        |          |    O     | 最終ログイン失敗日時 |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserCredentials
ユーザ資格情報

|   列名   |   型   | 最大長 | 主キー | Identity | NULL許容 |         説明         |
| -------- | ------ | ------ | :----: | :------: | :------: | -------------------- |
| UserNo   | Int64  |        |   O    |          |          | ユーザ名             |
| Password | String | 256    |        |          |          | パスワードハッシュ   |
| HashType | Int32  |        |        |          |          | ハッシュアルゴリズム |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserCreditCards
Deprecate

|   列名    |   型   | 最大長 | 主キー | Identity | NULL許容 |                                 説明                                 |
| --------- | ------ | ------ | :----: | :------: | :------: | -------------------------------------------------------------------- |
| UserNo    | Int64  |        |   O    |          |          |                                                                      |
| DisplayNo | Int64  |        |   O    |          |          |                                                                      |
| Number    | String | 128    |        |          |          | [CreditCardNumber制約]({{< ref "../validation#creditcardnumber" >}}) |
| Expire    | String | 128    |        |          |          |                                                                      |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserExternalKeys
ユーザアカウント外部キー

|       列名       |    型    | 最大長 | 主キー | Identity | NULL許容 |       説明       |
| ---------------- | -------- | ------ | :----: | :------: | :------: | ---------------- |
| AuthenticateType | Int32    |        |   O    |          |          | 認証タイプ       |
| ExternalKey      | String   | 256    |   O    |          |          | 外部キー         |
| UserNo           | Int64    |        |        |          |          | ユーザNo         |
| RelateDate       | DateTime |        |        |          |          | 連携日時         |
| LastLoginDate    | DateTime |        |        |          |    O     | 最終ログイン日時 |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserManages
ユーザ管理

|       列名       |    型    |      最大長      | 主キー | Identity | NULL許容 |                                 説明                                  |
| ---------------- | -------- | ---------------- | :----: | :------: | :------: | --------------------------------------------------------------------- |
| UserNo           | Int64    |                  |   O    |          |          | ユーザNo                                                              |
| IsAnonymous      | Boolean  |                  |        |          |          | ゲストフラグ                                                          |
| IsActive         | Boolean  |                  |        |          |          | 有効フラグ                                                            |
| UserName         | String   | 256              |        |          |    O     | ユーザ名                                                              |
| CreateDate       | DateTime |                  |        |          |          | 作成日時                                                              |
| ActivateDate     | DateTime |                  |        |          |    O     | アクティベート日時                                                    |
| QuitDate         | DateTime |                  |        |          |    O     | 退会日時                                                              |
| ExternalKey      | String   | 256              |        |          |    O     | 外部キー                                                              |
| RelateDate       | DateTime |                  |        |          |          | 連携日時                                                              |
| LastLoginDate    | DateTime |                  |        |          |    O     | 最終ログイン日時                                                      |
| ExpireDate       | DateTime |                  |        |          |    O     | 期限日時                                                              |
| ActivePoint      | Int64    |                  |        |          |    O     | 本ポイント                                                            |
| TemporaryPoint   | Int64    |                  |        |          |    O     | 仮ポイント                                                            |
| LastDepositDate  | DateTime |                  |        |          |    O     | 最終付与日時                                                          |
| LastWithdrawDate | DateTime |                  |        |          |    O     | 最終使用日時                                                          |
| UserRole         | String   | Max              |        |          |    O     | ユーザーロール                                                        |
| LastName         | String   | 64               |        |          |    O     | 姓 [PersonName制約]({{< ref "../validation#personname" >}})           |
| FirstName        | String   | 64               |        |          |    O     | 名 [PersonNameKana制約]({{< ref "../validation#personnamekana" >}})   |
| LastNameKana     | String   | 64               |        |          |    O     | セイ [PersonName制約]({{< ref "../validation#personname" >}})         |
| FirstNameKana    | String   | 64               |        |          |    O     | メイ [PersonNameKana制約]({{< ref "../validation#personnamekana" >}}) |
| Subscribe        | Boolean  |                  |        |          |          | メルマガ許可                                                          |
| Birthday         | DateTime |                  |        |          |    O     | 誕生日                                                                |
| Sex              | Int32    |                  |        |          |          | 性別                                                                  |
| MemberStatus     | Int32    |                  |        |          |          | 会員ステータス                                                        |
| CountryCode      | String   | 10(fixed length) |        |          |    O     | 国コード                                                              |
| ZipCode          | String   | 10(fixed length) |        |          |    O     | 郵便番号                                                              |
| Prefecture       | String   | 10(fixed length) |        |          |    O     | 都道府県                                                              |
| City             | String   | 128              |        |          |    O     | 市区町村                                                              |
| Street           | String   | 128              |        |          |    O     | 通り・番地                                                            |
| Building         | String   | 128              |        |          |    O     | 建物・階・部屋番号                                                    |
| Tel              | String   | 32(fixed length) |        |          |    O     | 電話番号                                                              |
| FailedCount      | Int32    |                  |        |          |    O     | ログイン失敗回数                                                      |

+ Parents
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserProperties
ユーザー情報

|     列名      |    型    |      最大長      | 主キー | Identity | NULL許容 |       説明       |
| ------------- | -------- | ---------------- | :----: | :------: | :------: | ---------------- |
| UserNo        | Int64    |                  |   O    |          |          | ユーザNo         |
| Email         | String   | 256              |        |          |    O     | メールアドレス   |
| MemberStatus  | Int32    |                  |        |          |          | 会員ステータス   |
| LastName      | String   | 64               |        |          |    O     | 姓               |
| FirstName     | String   | 64               |        |          |    O     | 名               |
| LastNameKana  | String   | 64               |        |          |    O     | セイ             |
| FirstNameKana | String   | 64               |        |          |    O     | メイ             |
| Subscribe     | Boolean  |                  |        |          |          | メルマガ受信許可 |
| Birthday      | DateTime |                  |        |          |    O     | 誕生日           |
| Sex           | Int32    |                  |        |          |          | 性別             |
| AddressId     | Int64    |                  |        |          |          | 住所ID           |
| Token         | String   | 32(fixed length) |        |          |    O     | トークン         |

+ Parents
	- [Address]({{< ref "#addresses" >}})(1) [FK(AddressId)] 	
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UserRoles
ユーザーロール

|     列名      |   型   | 最大長 | 主キー | Identity | NULL許容 |    説明    |
| ------------- | ------ | ------ | :----: | :------: | :------: | ---------- |
| UserNo        | Int64  |        |   O    |          |          | ユーザNo   |
| RoleNo        | Int64  |        |   O    |          |          | ロールNo   |
| RoleParameter | String | 1024   |        |          |    O     | ロール引数 |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(UserNo)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## UsersLastUpdates
最終更新ユーザー情報

|    列名    |    型    | 最大長 | 主キー | Identity | NULL許容 |     説明     |
| ---------- | -------- | ------ | :----: | :------: | :------: | ------------ |
| Id         | Int64    |        |   O    |          |          | ユーザNo     |
| LastUpdate | DateTime |        |        |          |    O     | 最終更新日時 |

+ Parents
	- [UserAccount]({{< ref "#useraccounts" >}})(1) [FK(Id)] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## WrappingTypes
梱包タイプ

| 列名 |   型   | 最大長 | 主キー | Identity | NULL許容 |  説明  |
| ---- | ------ | ------ | :----: | :------: | :------: | ------ |
| Id   | Int32  |        |   O    |          |          | 梱包ID |
| Name | String | 50     |        |          |          | 梱包名 |

+ Parents
+ Children
	- [DeliveryOrders]({{< ref "#deliveryorders" >}})(*)
+ Realations
---------------------------------------------------------------------------------------

## ZipCodeAddrs
郵便番号

|     列名      |   型   |      最大長      | 主キー | Identity | NULL許容 |    説明    |
| ------------- | ------ | ---------------- | :----: | :------: | :------: | ---------- |
| ZipCodeAddrId | Int32  |                  |   O    |    O     |          | 郵便番号ID |
| Zip           | String | 10(fixed length) |        |          |          | 郵便番号   |
| Jis           | String | 10(fixed length) |        |          |          | JISコード  |
| City          | String | 128              |        |          |          | 市区町村   |
| Street        | String | 128              |        |          |          | 通り       |

+ Parents
	- [ZipCode]({{< ref "#zipcodes" >}})(1) [FK()] 	
+ Children
+ Realations
---------------------------------------------------------------------------------------

## ZipCodes
郵便番号

|     列名     |   型   |      最大長      | 主キー | Identity | NULL許容 |   説明    |
| ------------ | ------ | ---------------- | :----: | :------: | :------: | --------- |
| Zip          | String | 10(fixed length) |   O    |          |          | 郵便番号  |
| Jis          | String | 10(fixed length) |   O    |          |          | JISコード |
| PrefectureId | Int32  |                  |        |          |          | 都道府県  |

+ Parents
	- [Prefecture]({{< ref "#prefectures" >}})(1) [FK(PrefectureId)] 	
+ Children
	- [DstZipCode]({{< ref "#zipcodes" >}})(0..1)
	- [SrcZipCode]({{< ref "#zipcodes" >}})(0..1)
	- [ZipCodeAddrs]({{< ref "#zipcodeaddrs" >}})(*)
+ Realations
---------------------------------------------------------------------------------------
