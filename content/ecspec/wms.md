---
title: "倉庫(WMS)連携"
weight: 9
description: 
---

## はじめに

WMSとの連携について、よくある連携を記載します。

![倉庫(WMS)連携](../media/wms.jpg)

## 商品連携

商品情報をWMSに連携します。

- 向き＝一般的に多いのは「基幹→EC→WMS」です。
- EC側とWMS側で共通のコードで商品を識別する必要があるので、JAN、品番、SKU等を使ってコードを一致させます。

## 在庫連携

WMSで管理している在庫情報をECに連携します。

- 向き＝WMS→EC。
- WMSの増減を元にEC在庫を更新します。
- 絶対値と相対値で更新する方法があります。どちらが良いかは運用や仕組みに合わせます。
- 一般的に絶対値を用いて在庫同期を行うとWMSとECで在庫の値にズレが生じます。生じた際の修正方法を検討しておきます。
- 特定のタイミングから連携できなかった場合のレスキュー方法を検討しておく。WMSを全出力して、それをECに反映するルートを作るなど。
- 入出荷による在庫増減だけでなく、不良品の発生や定期的に実施する棚卸による在庫増減も考慮しておきます。

## 受注連携

ECで受注したデータをWMSに連携する。連携形式は多様なので、以下それぞれ検討します。

- 受注情報をWMSに連携し、出荷時に利用します。
- 向き＝一般的に多いのはEC→WMS。
- EC側とWMS側で共通の受注番号で商品を識別する必要があります。

## 受注ステータス連携

### 出荷指示

商品出荷指示の際、受注ステータスを出荷指示に更新します。

- 向き＝EC→WMS。

### 出荷済み

- 向き＝WMS→EC。
- 送り状伝票番号をWMSからECに連携します。

### 受注キャンセル、返品

- 向き＝「WMS→EC」。
- キャンセルになった注文番号をWMSからECに連携します。
- 在庫についても戻す場合は、WMS側で在庫を戻し、上述の「在庫連携」でECに連携します。
- EC側は「受注キャンセル」のステータス情報をもとに決済情報のキャンセルなどを行います。

## 備考(セット商品の考慮)

在庫を共有している商品を利用する場合は、売り越しを防ぐために同期方法を考慮する必要があります。

- 商品A(在庫100)　商品B(在庫50) 、セット商品C(商品A＋商品B＝つまり在庫は50)。
- 商品Bが単体で売れた場合、商品BとCの在庫を1つずつ減らす必要があります。
 