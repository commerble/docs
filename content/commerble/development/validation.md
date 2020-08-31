---
title: "入力バリデーション"
weight: 40
description: 
---

<style>
  code { word-wrap: break-word; }
</style>

# 入力バリデーション

EC の一部のカラムには次の制約が設けられいます。この制約はカスタム対象外のため、設計時に考慮する必要があります。

## AddressName
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  
[UserAddress.AddressName](/entities/ec#useraddresses)

## AddressPart
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  
[Address.Prefecture](/entities/ec#addresses), 
[Address.City](/entities/ec#addresses)

## AddressTextPart
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇|　|＆|（|）]*`

対象カラム  
[Address.Streat](/entities/ec#addresses)

## CreditCardNumber
バリデーション  
`[0-9]{13,16}`

対象カラム  
[OrderCustomer.CreditCardNumber](/entities/ec#ordercustomers), 
[UserCreditCard.Number](/entities/ec#usercreditcards)

## CreditSecurity
バリデーション  
`[0-9]{3,4}`

対象カラム 
[OrderCustomer.CreditSecurity](/entities/ec#ordercustomers) 

## Email
バリデーション  
```
^[a-zA-Z0-9!$&*=^`|~#%'+\/?_{}-][a-zA-Z0-9!$&*.=^`|~#%'+\/?_{}-]*@([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9]+$
```

対象カラム  
[OrderCustomer.MailAddress](/entities/ec#ordercustomers)

## PaymentNumeric
バリデーション  
`[0-9]{1,9}`

対象カラム  


## PersonName
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  
[Address.LastName](/entities/ec#addresses), 
[Address.FirstName](/entities/ec#addresses), 
[DeliveryOrder.SenderName](/entities/ec#deliveryorders), 
[UserManages.LastName](/entities/ec#usermanages), 
[UserManages.FirstName](/entities/ec#usermanages)

## PersonNameKana
バリデーション  
`[\p{IsKatakana}]*`

対象カラム  
[Address.LastNameKana](/entities/ec#addresses), 
[Address.FirstNameKana](/entities/ec#addresses), 
[UserManages.LastNameKana](/entities/ec#usermanages), 
[UserManages.FirstNameKana](/entities/ec#usermanages)

## PhoneNumber
バリデーション  
`[0-9]{10,11}`

対象カラム  
[Address.Tel](/entities/ec#addresses)

## WideJapaneseCharacter
バリデーション  
`[\p{IsHiragana}|\p{IsKatakana}|\p{IsCJKUnifiedIdeographs}|\p{IsCJKUnifiedIdeographsExtensionA}|\p{IsCJKCompatibilityIdeographs}|０-９Ａ-Ｚａ-ｚ|－|―|ー|‐|ヽ|ヾ|ゝ|ゞ|〃|仝|々|〆|〇]*`

対象カラム  


## ZipCode
バリデーション  
`[\d]{7}`

対象カラム  
[Address.ZipCode](/entities/ec#addresses)