---
title: "定義値"
weight: 40
description: 
---

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period-->
# 定義値(Enum)
[ECデータ](../ec) で利用される定義値の一覧です。

## HumanSexes

|  値  |     名称      |   和名   | 説明 |
| ---: | ------------- | -------- | ---- |
|    0 | NotKnown      | 不明     |      |
|    1 | Male          | 男性     |      |
|    2 | Female        | 女性     |      |
|    9 | NotApplicable | 適用不能 |      |

対象カラム  
[OrderCustomer.Sex](../ec#ordercustomers)

## OrderLineType

|  値  |       名称       |    和名    | 説明 |
| ---: | ---------------- | ---------- | ---- |
|    0 | NormalOrder      | 通常       |      |
|    1 | Canceled         | キャンセル |      |
|    2 | Returned         | 返品       |      |
|    3 | Benefit          | 特典       |      |
|    4 | SetProductParent | セット親   |      |
|    5 | SetProductChild  | セット子   |      |
|    6 | Unavailable      | 無効       |      |
|    7 | Additional       | 追加商品   |      |

対象カラム  
[OrderLine.OrderType](../ec#orderlines), 
[ReturnOrderLine.OrderType](../ec#returnorderlines)

## OrderType

|  値  |  名称   |    和名    | 説明 |
| ---: | ------- | ---------- | ---- |
|    0 | Normal  | 旧譜       |      |
|    1 | Reserve | 新譜       |      |
|    2 | Pending | 取り置き   |      |
|    3 | Bto     | 受注生産品 |      |
|    4 | ReSend  | 返品再送   |      |

対象カラム  
[PurchaseOrder.OrderType](../ec#purchaseorders), 
[ReturnOrder.OrderType](../ec#returnorders)

## OrderStatus

|  値  |       名称       |     和名     | 説明 |
| ---: | ---------------- | ------------ | ---- |
|    0 | Accept           | 受注         |      |
|    1 | UnAllocate       | 未引当       |      |
|    2 | PartAllocate     | 中途引当     |      |
|    3 | Allocated        | 引当済       |      |
|    6 | ShipIndicate     | 出荷指示済   |      |
|    7 | Ship             | 出荷済       |      |
|    8 | Arrival          | 着荷済       |      |
|    9 | Booked           | 計上済       |      |
|   10 | Cancel           | キャンセル   |      |
|   11 | ShipSuspend      | 出荷保留     |      |
|   12 | WorkerProcessing | バッチ処理中 |      |

対象カラム  
[PurchaseOrder.OrderStatus](../ec#purchaseorders), 
[ReturnOrder.OrderStatus](../ec#returnorders)

## PaymentMethod

|  値  |      名称      |       和名       |                              説明                               |
| ---: | -------------- | ---------------- | --------------------------------------------------------------- |
|    0 | CashOnDelivery | 代引き           |                                                                 |
|    1 | CreditCard     | クレジットカード |                                                                 |
|    2 | PointOnly      | 全額ポイント     |                                                                 |
|    3 | Cvs            | コンビニ決済     |                                                                 |
|    4 | Offsite        | オフサイト       | 銀行振込など、Commerbleのパイプライン内で決済処理を行わない決済 |
|    5 | Offline        | オフライン       | 実店舗での決済など、オンラインでない決済                        |
|    6 | Token          | トークン         | 決済方法問わずトークン方式の決済                                |
|  100 | External       | 外部             |                                                                 |
|   -1 | None           | None             |                                                                 |

対象カラム  
[PurchaseOrder.PaymentMethod](../ec#purchaseorders), 
[ReturnOrder.PaymentMethod](../ec#returnorders)

## DeliveryMethod

|  値  |    名称     |   和名   |                    説明                    |
| ---: | ----------- | -------- | ------------------------------------------ |
|    0 | None        |          | シリアライザのためにあるため、利用しない。 |
|    1 | Default     | 通常配送 |                                            |
|  100 | Mail        | メール便 |                                            |
|  200 | Periodical  | 定期便   |                                            |
|  201 | Periodical1 | 定期便1  | 通常は200(Priodical)にフォールバック       |
|  202 | Periodical2 | 定期便2  | 通常は200(Priodical)にフォールバック       |
|  203 | Periodical3 | 定期便3  | 通常は200(Priodical)にフォールバック       |
|  204 | Periodical4 | 定期便4  | 通常は200(Priodical)にフォールバック       |
|  205 | Periodical5 | 定期便5  | 通常は200(Priodical)にフォールバック       |
|  300 | Direct      | 産直     |                                            |
|  301 | Direct1     | 産直1    | 通常は300(Direct)にフォールバック          |
|  302 | Direct2     | 産直2    | 通常は300(Direct)にフォールバック          |
|  303 | Direct3     | 産直3    | 通常は300(Direct)にフォールバック          |
|  304 | Direct4     | 産直4    | 通常は300(Direct)にフォールバック          |
|  305 | Direct5     | 産直5    | 通常は300(Direct)にフォールバック          |

対象カラム  

## PaymentStatus

|  値  |    名称    |    和名    | 説明 |
| ---: | ---------- | ---------- | ---- |
|    0 | Ready      | 未決済     |      |
|    1 | Success    | 決済成功   |      |
|    2 | Fail       | 決済失敗   |      |
|    3 | Processing | 処理中     |      |
|    4 | Cancel     | キャンセル |      |

対象カラム  
[PurchaseOrder.PaymentStatus](../ec#purchaseorders),
[ReturnOrder.PaymentStatus](../ec#returnorders)

## ProductType

|  値  |  名称   |     和名     | 説明 |
| ---: | ------- | ------------ | ---- |
|    0 | Normal  | 単品         |      |
|    1 | Set     | セット       |      |
|    3 | Benefit | 副資材その他 |      |

対象カラム  
[Product.ProductType](../ec#products)

## SalesStatus

|  値  | 名称 |   和名   | 説明 |
| ---: | ---- | -------- | ---- |
|    0 | Sale | 通常     |      |
|    1 | Stop | 販売中止 |      |
|    2 | End  | 販売終了 |      |

対象カラム  
[Product.SalesStatus](../ec#products)

## StockOperation

|  値  | 名称 |        和名        | 説明 |
| ---: | ---- | ------------------ | ---- |
|    0 |      | 販売可能数戻し     |      |
|    1 |      | 出荷利用可能数戻し |      |
|    2 |      | 不良在庫戻し       |      |

対象カラム  
[ReturnReason.StockOperation](../ec#returnreasons)

## TaxRoundMode

|  値  |     名称      |    和名     |                       説明                       |
| ---: | ------------- | ----------- | ------------------------------------------------ |
|    0 | Round         | 四捨五入    | 税率は[TaxRates](../ec/#taxrates) で決定されます |
|    1 | Floor         | 切り捨て    | 税率は[TaxRates](../ec/#taxrates) で決定されます |
|    2 | Ceil          | 切り上げ    | 税率は[TaxRates](../ec/#taxrates) で決定されます |
|    3 | NoTaxCharge   | 非課税      |                                                  |
|    4 | UseTaxPrice   | 税額指定    | 税率は[TaxRates](../ec/#taxrates) で決定されます |
|    5 | NoRound       | 丸めなし    | 税率は[TaxRates](../ec/#taxrates) で決定されます |
|    6 | Round8        | 8%四捨五入  | 税率は8%に強制されます                           |
|    7 | Floor8        | 8%切り捨て  | 税率は8%に強制されます                           |
|    8 | Ceil8         | 8%切り上げ  | 税率は8%に強制されます                           |
|    9 | NoRound8      | 8%丸めなし  | 税率は8%に強制されます                           |
|   10 | Round10       | 10%四捨五入 | 税率は10%に強制されます                          |
|   11 | Floor10       | 10%切り捨て | 税率は10%に強制されます                          |
|   12 | Ceil10        | 10%切り上げ | 税率は10%に強制されます                          |
|   13 | NoRound10     | 10%丸めなし | 税率は10%に強制されます                          |
|   14 | UseTaxPrice8  | 8%税額指定  | 税率は8%に強制されます                           |
|   15 | UseTaxPrice10 | 10%税額指定 | 税率は10%に強制されます                          |


対象カラム  
[SalesProduct.TaxRoundMode](../ec#salesproducts)

## PointType

|  値  |      名称      |      和名      | 説明 |
| ---: | -------------- | -------------- | ---- |
|    0 | Withdraw       | 使用           |      |
|    1 | WithdrawCancel | 使用キャンセル |      |
|    2 | Deposit        | 付与           |      |
|    3 | DepositCancel  | 付与キャンセル |      |
|    4 | Adjust         | 調整           |      |
|    5 | Lapsed         | 失効           |      |

対象カラム  
[PointBankTransaction.PointType](../ec#pointbanktransactions),
[PointBankAllocates.PointType](../ec#pointbankallocates)

## MemberStatus

|  値  |   名称    | 和名 | 説明 |
| ---: | --------- | ---- | ---- |
|    0 | Default   | 通常 |      |
|    1 | Attention | 注意 |      |
|    2 | Warning   | 警告 |      |

対象カラム  
[OrderCustomers.MemberStatus](../ec#ordercustomers)

## TemperatureZone

|  値  |  名称  |  和名  | 説明 |
| ---: | ------ | ------ | ---- |
|    1 | Normal | 常温   |      |
|    2 | Cool   | 冷蔵   |      |
|    3 | Freeze | 冷凍   |      |
|    4 | Ice    | アイス |      |

対象カラム  
[DeliveryPatterns.TemperatureZone](../ec#deliverypatterns),
[Leadtime.TemperatureZone](../ec#temperaturezone)

## ReserveRequestStatus

|  値  |   名称    |    和名    |                                     説明                                     |
| ---: | --------- | ---------- | ---------------------------------------------------------------------------- |
|    0 | Accept    | 入荷待ち   | 標準動作では、販売可能数が更新された際に自動で、「引当済み」に変更されます。 |
|    1 | Allocated | 引当済み   |                                                                              |
|    2 | Purchased | 購入済み   |                                                                              |
|    3 | Cancel    | キャンセル |                                                                              |

対象カラム  
[ReserveRequests.Status](../ec#reserverequests),
[ReserveRequestStatusCounts.Status](../ec#reserverequeststatuscounts)

## MailType

|  値  |      名称       |         和名         | 説明 |
| ---: | --------------- | -------------------- | ---- |
|    0 | CustomerOrder   | 利用者向け注文関連   |      |
|    1 | CustomerRequest | 利用者向け仮予約関連 |      |
|    2 | CustomerInfo    | 利用者向け           |      |
|   10 | SystemAlert     | システム通知         |      |

対象カラム  

[MailRequests.MailType](../ec#mailrequests),
[MailHistory.MailType](../ec#mailhistory)

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period-->
