---
title: "税率"
weight: 9999
description: 
---

カートでの税率計算式及び請求金額全体の計算式を示します。

<!-- textlint-disable ja-technical-writing/sentence-length -->
{{<katex>}}
\begin{aligned}
total &= S + (D - p_d) + (C - p_c) \\ \\
S &:= \sum_{i=1}^N \biggl( u_i a_i + \tau_i a_i - d_i - p_i \biggr) \\ \\
\tau_i &:= \begin{cases}
    四捨五入(t_i \theta) & (m_i = 四捨五入) \\
    \lfloor t_i \theta \rfloor & (m_i = 切り捨て) \\
    \lceil t_i \theta \rceil & (m_i = 切り上げ) \\
    0 & (m_i = 非課税) \\
    t_i & (m_i = 税額指定) \\
    t_i \theta & (m_i = 丸めなし) \\
    四捨五入(t_i \cdot 0.08) & (m_i = 四捨五入8\%) \\
    \lfloor t_i \cdot 0.08 \rfloor & (m_i = 切り捨て8\%) \\
    \lceil t_i \cdot 0.08 \rceil & (m_i = 切り上げ8\%) \\
    t_i \cdot 0.08 & (m_i = 丸めなし8\%) \\
    四捨五入(t_i \cdot 0.10) & (m_i = 四捨五入10\%) \\
    \lfloor t_i \cdot 0.10 \rfloor & (m_i = 切り捨て10\%) \\
    \lceil t_i \cdot 0.10 \rceil & (m_i = 切り上げ10\%) \\
    t_i \cdot 0.10 & (m_i = 丸めなし10\%) 
\end{cases} 
\end{aligned} 
{{</katex>}}

|              |                    項目                     |          説明           |
| :----------: | :------------------------------------------ | :---------------------- |
|   \\(i\\)    |                                             | カート内の商品  (1...N) |
|   \\(S\\)    |                                             | 小計                    |
|   \\(D\\)    | PurchaseOrder.DeliveryCharge                | 送料                    |
|   \\(C\\)    | PurchaseOrder.CashOnDeliveryCharge          | 代引き手数料            |
|  \\(p_d\\)   | PurchaseOrder.PointPaymentForDeliveryCharge | 送料分使用ポイント      |
|  \\(p_c\\)   | PurchaseOrder.PointPaymentForPaymentCharge  | 手数料分使用ポイント    |
|  \\(u_i\\)   | Product.UnitPrice                           | 商品単価                |
|  \\(t_i\\)   | Product.TaxationPrice                       | 課税単価                |
|  \\(a_i\\)   | OrderLine.OrderAmount                       | 数量                    |
| \\(\theta\\) | TaxRates.Where(t=>t.StartDate<=now).Last()  | 税率                    |
|  \\(m_i\\)   | SalesPattern.TaxRoundMode                   | 税計算モード            |
|  \\(p_i\\)   | OrderLine.PointUsage                        | 明細分使用ポイント      |
|  \\(d_i\\)   | OrderLine.DiscountPrice                     | 明細分割引額            |

<!-- textlint-enable ja-technical-writing/sentence-length -->

割引額はキャンペーンの適用によって決定されます。割引額の詳しい計算方法は[キャンペーンページ](../campaign/)を参照ください。

使用ポイントに標準の計算式は[ポイントページ](../point/)を参照ください。

**その他保存項目**

|           項目            |                            計算式                             |
| :------------------------ | :------------------------------------------------------------ |
| OrderLine.LinePrice       | \\(u_i a_i + \tau_i a_i - d_i\\)                              |
| OrderLine.Tax             | \\(\tau_i a_i\\)                                              |
| ShoppingCartBase.Subtotal | \\(\sum_{i=1}^N \biggl( u_i a_i + \tau_i a_i - d_i \biggr)\\) |
