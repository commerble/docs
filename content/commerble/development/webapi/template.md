---
title: "テンプレートAPI"
weight: 2
description: 
---

この章では、各種テンプレートの検証APIについて説明します。

Commerbleにおけるテンプレートの種類と説明を下表に示します。

| テンプレート |                        説明                         |
| :----------- | :-------------------------------------------------- |
| template     | Commerble独自のテンプレート記法を用いたテンプレート |
| cshtml       | [Razor構文]を使用したWebページ用テンプレート        |
| mail         | [Razor構文]を使用したメール用テンプレート           |
| csx          | [C# Scripting]を使用したカスタムビューテンプレート  |

これらのテンプレートのうち、テンプレートAPIの使用で、`cshtml`,`mail`,`csx`のテンプレート内容を検証できます。[Meta Feed API]を使用して、テンプレートを更新する前に、この検証APIを使用してテンプレート内容を検証し、コンパイルエラーによるWebページのダウンを回避できます。

## cshtml

|  項目  |                          |                説明                 |
| :----- | :----------------------- | :---------------------------------- |
| Method | POST                     |                                     |
| Route  | ~/data/template/validate |                                     |
| Body   | JSON オブジェクト        |                                     |
|        | Template                 | テンプレート内容(String)            |
|        | WithViews                | 共通テンプレートを結合する(Boolean) |

**例**  
```
--- リクエスト:検証結果OK ---
POST ~/data/template/validate HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
    "Template": "@{var msg = \"Hello, Validate!\";} <h1>@msg</h1>",
    "WithViews": false
}

--- レスポンス:検証結果OK ---
HTTP/1.1 200 OK
Content-Length: 0
```
```
--- リクエスト:検証結果NG ---
POST ~/data/template/validate HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
    "Template": "<h1>@msg</h1>",
    "WithViews": false
}
--- レスポンス:検証結果NG ---
HTTP/1.1 400 BadRequest
Content-Length: 91
Content-Type: application/json; charset=utf-8

{
    "Message": "- error: (38, 6) The name &#39;msg&#39; does not exist in the current context"
}
```

## mail

|  項目  |                      |           説明           |
| :----- | :------------------- | :----------------------- |
| Method | POST                 |                          |
| Route  | ~/data/mail/validate |                          |
| Body   | JSON オブジェクト    |                          |
|        | Template             | テンプレート内容(String) |

**例**  
```
--- リクエスト:検証結果OK ---
POST ~/data/mail/validate HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
    "Template": "@{Message.Subject = \"お買い上げありがとうございます。\";} <text>Thank you :)</text>"
}

--- レスポンス:検証結果OK ---
HTTP/1.1 200 OK
Content-Length: 21
Content-Type: application/json; charset=utf-8

{
    "Message": "Success"
}
```
```
--- リクエスト:検証結果NG ---
POST ~/data/mail/validate HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
    "Template": "@{Message.Subject = \"お買い上げありがとうございます。\";} <text>@msg</text>"
}

--- レスポンス:検証結果NG ---
HTTP/1.1 400 BadRequest
Content-Length: 892
Content-Type: application/json; charset=utf-8

{
    "Message": "Errors while compiling a Template.\nPlease try the following to solve the situation:\n  * If the problem is about missing/invalid references or multiple defines either try to load \n    the missing references manually (in the compiling appdomain!) or\n    Specify your references manually by providing your own IReferenceResolver implementation.\n    See https://antaris.github.io/RazorEngine/ReferenceResolver.html for details.\n    Currently all references have to be available as files!\n  * If you get 'class' does not contain a definition for 'member': \n        try another modelType (for example 'null' to make the model dynamic).\n        NOTE: You CANNOT use typeof(dynamic) to make the model dynamic!\n    Or try to use static instead of anonymous/dynamic types.\nMore details about the error:\n - error: (27, 48) The name 'msg' does not exist in the current context\n"
}
```
## csx

|  項目  |                       |           説明           |
| :----- | :-------------------- | :----------------------- |
| Method | POST                  |                          |
| Route  | ~/data/query/validate |                          |
| Body   | JSON オブジェクト     |                          |
|        | Script                | テンプレート内容(String) |

**例**  
```
--- リクエスト:検証結果OK ---
POST ~/data/query/validate HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
    "Template": "using System.Linq;\n new []{0,1,2,3,4}.Where(i => (i % 2) == 0)"
}

--- レスポンス:検証結果OK ---
HTTP/1.1 200 OK
Content-Length: 21
Content-Type: application/json; charset=utf-8

{
    "Message": "Success"
}
```
```
--- リクエスト:検証結果NG ---
POST ~/data/query/validate HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json

{
    "Script": "new []{0,1,2,3,4}.Where(i => (i % 2) == 0)"
}

--- レスポンス:検証結果NG ---
HTTP/1.1 400 BadRequest
Content-Length: 342
Content-Type: application/json; charset=utf-8

{
    "Message": "(1,19): error CS1061: 'int[]' に 'Where' の定義が含まれておらず、型 'int[]' の最初の引数を受け付けるアクセス可能な拡張メソッド 'Where' が見つかりませんでした。using ディレクティブまたはアセンブリ参照が不足していないことを確認してください。]"
}
```

[Razor構文]: https://docs.microsoft.com/aspnet/mvc/mvc3#the-razor-view-engine "Razor"
[C# Scripting]: https://docs.microsoft.com/archive/msdn-magazine/2016/january/essential-net-csharp-scripting "C# Scripting"
[Meta Feed API]: ../data/#meta-feed "Meta Feed"