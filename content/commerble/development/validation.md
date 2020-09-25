---
title: "入力バリデーション"
weight: 40
description: 
---

<style>
  code { word-wrap: break-word; }
</style>

# 入力バリデーション

ECデータ の一部のカラムには次の制約が設けられいます。この制約はカスタマイズすることもできますが、配送業者システム、伝票システム、基幹システムで文字化けやエラーが発生しないようにデータが流れるすべて経路の最大公約数をとる必要があります。

## AddressName
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  
[UserAddress.AddressName](data/ec#useraddresses)

## AddressPart
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  
[Address.Prefecture](data/ec#addresses), 
[Address.City](data/ec#addresses)

## AddressTextPart
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇|　|＆|（|）]*`

対象カラム  
[Address.Streat](data/ec#addresses)

## CreditCardNumber
バリデーション  
`[0-9]{13,16}`

対象カラム  
[OrderCustomer.CreditCardNumber](data/ec#ordercustomers), 
[UserCreditCard.Number](data/ec#usercreditcards)

## CreditSecurity
バリデーション  
`[0-9]{3,4}`

対象カラム 
[OrderCustomer.CreditSecurity](data/ec#ordercustomers) 

## Email
バリデーション  
```
^[a-zA-Z0-9!$&*=^`|~#%'+\/?_{}-][a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]*@([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9]+$
```

対象カラム  
[OrderCustomer.MailAddress](data/ec#ordercustomers)

## PaymentNumeric
バリデーション  
`[0-9]{1,9}`

対象カラム  


## PersonName
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  
[Address.LastName](data/ec#addresses), 
[Address.FirstName](data/ec#addresses), 
[DeliveryOrder.SenderName](data/ec#deliveryorders), 
[UserManages.LastName](data/ec#usermanages), 
[UserManages.FirstName](data/ec#usermanages)

## PersonNameKana
バリデーション  
`[\p{IsKatakana}]*`

対象カラム  
[Address.LastNameKana](data/ec#addresses), 
[Address.FirstNameKana](data/ec#addresses), 
[UserManages.LastNameKana](data/ec#usermanages), 
[UserManages.FirstNameKana](data/ec#usermanages)

## PhoneNumber
バリデーション  
`[0-9]{10,11}`

対象カラム  
[Address.Tel](data/ec#addresses)

## WideJapaneseCharacter
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  


## ZipCode
バリデーション  
`[\d]{7}`

対象カラム  
[Address.ZipCode](data/ec#addresses)