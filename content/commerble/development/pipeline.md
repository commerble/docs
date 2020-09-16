---
title: "パイプライン"
weight: 1
description: 
---

# パイプライン
Commerbleのカートエンジンの中枢を担うのがパイプラインです。
カート操作の全てはパイプラインを通り、在庫数の確認や税計算を実施します。

パイプラインはカートパイプライン、注文パイプライン、履歴変更パイプライン、キャンセルパイプラインの4つあり、下図はそれらを図示したものです。

![cart flow](cart_flow.png)

それぞれのパイプラインには、複数のパイプラインモジュールが登録されています。図のカートパイプラインをみると、キャンペーン初期化、商品展開、販売可能数チェック...とパイプラインモジュールが登録されています。上から順番にパイプラインモジュールが実行され、エラーの有無を確認します。

薄い青色のパイプラインモジュールはカート表示を行うすべての際に実行され、濃い青色のパイプラインモジュールは注文確定ボタンを押した時にのみ実行されます。

パイプライン自体は、以上の4つで固定されているため、増減はできません。それぞれのパイプラインモジュールに何をどの順番で登録するかは[オーダーカスタム]可能です。またカスタムパイプラインモジュールを作成し、テナントを独自のロジックを構築することが可能です。

## パイプラインモジュール
下図はパイプラインモジュールを図示したものです。
![pipeline](pipeline.png)  
パイプラインモジュールには、`Calculate`と`Commit`の2つのエントリーポイントがあります。`Calculate`はカート内容を表示するすべてのタイミングで実行されますが、`Commit`が実行されるのは、注文確定ボタンを押した時のみです。もし `Commit`中にエラーが発生した場合は`Rollback`が実行されます。

パイプラインの実行スケジュールは下図のようになります。

![pipelines execution flow](pipelines_execution_flow.png)

パイプラインに登録されているモジュールの `Calculate` をすべて実行し、エラーがあった場合はエラーとして離脱します。　注文・変更・キャンセル確定時以外はこのタイミングでパイプラインを実行を抜けます。

注文・変更・キャンセル確定時には、次に、パイプラインに登録されているモジュールの `Commit` をすべて実行します。 エラー無くすべての `Commit`が終了すれば成功です。注文パイプラインであれば注文が作成され、キャンセルパイプラインであれば注文キャンセルが完了します。

もし、`Commit`中にエラーがある場合は、そのパイプラインモジュールの `Rollback`から逆向きに登録されているモジュールの`Rollback`を実行していき、実行失敗として結果を返します。

## 標準パイプラインモジュール

#### ApplyDiscount
値引き額を適用するモジュールです。キャンペーンで計算された値引額を明細に適用します。 Totalモジュールより前に呼ぶ必要があります。

#### BenefitStockLimit
特典商品を在庫チェックを行ったうえで、在庫内に収まるように調整します。

#### CancelToDatabase
受注キャンセルを確定させ、永続化します。

#### CartToDatabase
受注を確定させ、永続化します。

#### ChargeCashOnDelivery
手数料に代引き手数料額を適用します。

#### ChargeCvs
手数料にコンビニ後払い手数料額を適用します。

#### ClearCart
カート情報をクリアします。

#### DeliveryCharge
配送料マスタを参照し、配送料を決定します。

#### DeliveryDateRange
指定可能な配送可能のレンジを設定します。

#### DeliveryOrderZip
住所マスタを参照し、お届け先の郵便番号と都道府県、市区町村が存在するものか検証します。

#### Discount
割引額を0で初期化します。

#### ExpandItem
セット商品を展開し、子商品情報を追加します。

#### ExtraPointCharge
特別付与ポイントを0で初期化します。

#### HistoryToDatabase
注文の変更を確定させ、永続化します。

#### InitializeFilters
対象キャンペーン読み込み、初期化します。

#### InitializeOrder
カート情報を初期化します。

#### InitializePayments
支払い情報を初期化します。

#### ItemAmount
購入数量の値域を検証します。

#### ItemSalesPattern
販売パターンの制限を検証します。

#### ItemStockLimit
販売可能数と購入数量を検証します。

#### ItemSubtotal
明細小計を計算します。

#### LocalStoreOrderCustomer
Commerble標準会員データから購入者情報をコピーします。

#### OrderCustomerZip
住所マスタを参照し、ゲスト購入者の郵便番号と都道府県、市区町村が存在するものか検証します。

#### OrderPaymentMethod
支払い方法を検証します。

#### PaymentCashOnDelivery
代引き支払いを処理します。

#### PaymentExternal
外部決済を処理します。

#### PaymentOffline
オフライン決済を処理します。

#### PaymentOffsite
オフサイト決済を処理します。

#### PaymentZero.cs
0円決済時に代引きもしくはポイント払いに強制します。

#### PointCharge.cs
付与ポイントを0で初期化します。

#### PointRate
ポイント付与率を展開します。

#### PointUsage
使用ポイントを0で初期化します。

#### PriorBenefietStockLimit
付与商品キャンペーンの数量を販売可能数を検証して調整します。

#### ReserveRequest
仮予約明細を検証します。

#### SpecifyDeliveryDateTime
配送の可否を検証します。

#### Tax
明細の消費税を計算します。

#### Total
支払い額を計算します。

#### UsableDeliveryMethod
選択可能な配送方法を初期化します。

#### UsablePaymentMethod
選択可能な支払い方法を初期化します。

#### UserSalesPattern
購入者にかかわる販売パターンを検証します。

## カスタムパイプラインモジュール

オーダーカスタム実績のあるパイプラインモジュールを一部ご紹介します。

#### OrderSendMail
注文完了メールを送信します。

#### HistorySendMail
注文変更メールを送信します。

#### CancelSendMail
注文キャンセルメールを送信します。

#### PointCharge
付与ポイントを計算します。

#### PointUsage
使用ポイントを明細に振り分けます。

#### Tax
消費税計算方法をカスタムします。

#### DeliveryCharge
送料計算方法をカスタムします。

#### DeliveryDateRange
指定可能な配送可能のレンジをカスタムします。

#### OrderCustomer
外部会員情報から購入者情報を初期化します。

#### PaymentGMOPGToken
GMOペイメントゲートウェイ社のAPIを利用してトークン決済を実施します。

#### PaymentGMOPGDocomo
GMOペイメントゲートウェイ社のAPIを利用してキャリア決済(Docomo)を実施します。

#### PaymentGMOPGAu
GMOペイメントゲートウェイ社のAPIを利用してキャリア決済(au)を実施します。

#### PaymentGMOPGSoftbank
GMOペイメントゲートウェイ社のAPIを利用してキャリア決済(SoftBank)を実施します。

#### PaymentVeriTransToken
VeriTrans社のAPIを使用してトークン決済を実施します。

#### PaymentVeriTransCarrier
VeriTrans社のAPIを使用してキャリア決済を実施します。

#### PaymentPaygentToken
Paygent社のAPIを使用してトークン決済を実施します。

#### PaymentPaygentPayeasy
Paygent社のAPIを使用してペイジー決済を実施します。

#### PaymentPaygentRakuten
Paygent社のAPIを使用して楽天ペイ決済を実施します。

#### PaymentScore
SCORE社のAPIを使用して後払い決済を実施ます。(旧ニッセン後払い)

#### PaymentAmazon
Amazon Pay決済を実施します。

## パイプライン設定例

4パイプラインそれぞれのモジュール設定例を次に示します。カスタムパイプラインモジュールを追加、または、置き換えることで柔軟に処理を拡張できます。

#### カートパイプライン

|  \#  | 種別  |    モジュール     |                                  |
| ---: | :---: | :---------------- | :------------------------------- |
|    1 | 標準  | InitializeFilters | フィルター（キャンペーン）初期化 |
|    2 | 標準  | ExpandItem        | 商品展開(付与キャンペーン適用)   |
|    3 | 標準  | ItemSalesPattern  | 商品に関する販売パターンチェック |
|    4 | 標準  | Tax               | 税額計算                         |
|    5 | 標準  | ItemSubtotal      | 小計                             |
|    6 | 標準  | Discount          | 割引初期化とキャンペーン計算     |
|    7 | 標準  | ApplyDiscount     | 割引額を明細に適用               |
|    9 | 標準  | ItemAmount        | 商品の注文数量                   |
|    8 | 標準  | ItemStockLimit    | 在庫チェック                     |
|   10 | 標準  | BenefitStockLimit | 特典・付与商品在庫チェック       |
|   11 | 標準  | ReserveRequest    | 仮予約対象商品チェック           |

#### 注文パイプライン

|  \#  |   種別   |       モジュール        |                                                    |
| ---: | :------: | :---------------------- | :------------------------------------------------- |
|    0 |   標準   | CartPipeline            | 注文パイプラインの実行前にカートパイプラインを実行 |
|    1 |   標準   | LocalStoreOrderCustomer | 注文者情報取得                                     |
|    2 |   標準   | InitializeOrder         | 注文初期化                                         |
|    3 |   標準   | UserSalesPattern        | ユーザーアカウントに関する販売パターンチェック     |
|    4 |   標準   | OrderCustomerZip        | 注文者郵便番号チェック                             |
|    5 |   標準   | DeliveryOrderZip        | 配送先郵便番号チェック                             |
|    6 |   標準   | DeliveryCharge          | 送料                                               |
|    7 | カスタム | UsablePaymentMethod     | 利用可能決済方法                                   |
|    8 |   標準   | DeliveryDateRange       | 配送日範囲指定                                     |
|    9 |   標準   | SpecifyDeliveryDateTime | 配送日時指定可能チェック                           |
|   10 | カスタム | ChargeExternal          | 決済手数料                                         |
|   11 |   標準   | PointUsage              | ポイント利用初期化                                 |
|   12 | カスタム | PointUsage              | ポイント利用割り当て                               |
|   13 |   標準   | PointRate               | ポイント付与率展開                                 |
|   14 |   標準   | PointCharge             | ポイント付与初期化                                 |
|   15 | カスタム | PointCharge             | ポイント付与計算                                   |
|   16 |   標準   | ExtraPointCharge        | 特別ポイント付与初期化                             |
|   17 |   標準   | Total                   | 総額計算                                           |
|   18 |   標準   | PaymentCashOnDelivery   | 代引き                                             |
|   19 |   標準   | PaymentToken            | トークン決済（クレジットカード）                   |
|   20 |   標準   | OrderPaymentMethod      | 利用可能決済方法                                   |
|   21 |   標準   | CartToDatabase          | データ保存                                         |
|   22 | カスタム | OrderSendMail           | メール送信                                         |
|   23 |   標準   | ClearCart               | カート情報のクリア                                 |

#### 履歴パイプライン
|  \#  |   種別   |       モジュール        |                                |
| ---: | :------: | :---------------------- | :----------------------------- |
|    1 |   標準   | DeliveryOrderZip        | 配送先郵便番号チェック         |
|    2 |   カスタム   | UsablePaymentMethod     | 利用可能決済方法               |
|    3 |   標準   | Total                   | 総額計算(決済手数料の変更反映) |
|    4 |   標準   | SpecifyDeliveryDateTime | 配送日時指定可能チェック       |
|    5 |   標準   | OrderPaymentMethod      | 利用可能決済方法               |
|    6 |   標準   | InitializePayments      | 不必要な決済情報のクリア       |
|    7 |   標準   | HistoryToDatabase       | データ保存                     |
|    8 | カスタム | HistorySendMail         | メール送信                     |
#### キャンセルパイプライン
|  \#  |   種別   |    モジュール    |                        |
| ---: | :------: | :--------------- | :--------------------- |
|    1 | カスタム | CancelToken      | トークン決済キャンセル |
|    2 |   標準   | CancelToDatabase | データ保存             |
|    3 |   標準   | CancelSendMail   | メール送信             |

[オーダーカスタム]: ../../features/customization/#オーダーカスタム "オーダーカスタム"