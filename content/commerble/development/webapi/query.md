---
title: "クエリAPI"
weight: 3
description: 
---

この章では、クエリAPIについて説明します。

クエリAPIではカスタムビューテンプレートを実行できます。
カスタムビューテンプレートとは`csx`タイプで作成されたテンプレートです。

カスタムビューテンプレートで許可されたデータベースアクセスは読み取りのみです。

## 保存されたテンプレートの実行

|  項目  |                       |      説明      |
| :----- | :-------------------- | :------------- |
| Method | GET                   |                |
| Route  | ~/data/query/render   |                |
| Query  | x-www-form-urlencoded |                |
|        | name                  | テンプレート名 |

**例**  
```
--- テンプレートの作成---
POST ~/data/meta/Templates HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json
{
    "Name": "QuerySample",
    "Text": "new []{ new { i = 0, s = \"0\" }, new { i = 1, s = \"1\" }, new { i = 2, s = \"2\" } }",
    "Type": "csx"
}

--- リクエスト ---
GET ~/data/query/render?name=QuerySample HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx

--- レスポンス ---
HTTP/1.1 200 OK
Content-Length: 49
Content-Type: application/json; charset=utf-8

[{"i":0,"s":"0"},{"i":1,"s":"1"},{"i":2,"s":"2"}]
```

## テンプレートを渡して実行

|  項目  |                     |           説明           |
| :----- | :------------------ | :----------------------- |
| Method | POST                |                          |
| Route  | ~/data/query/render |                          |
| Body   | JSON オブジェクト   |                          |
|        | Script              | テンプレート内容(String) |

**例** 
```
--- リクエスト ---
POST ~/data/query/render HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Content-Type: application/json
Accept: application/json

{
    "Script": "new []{ new { i = 0, s = \"0\" }, new { i = 1, s = \"1\" }, new { i = 2, s = \"2\" } }"
}

--- レスポンス ---
HTTP/1.1 200 OK
Content-Length: 49
Content-Type: application/json; charset=utf-8

[{"i":0,"s":"0"},{"i":1,"s":"1"},{"i":2,"s":"2"}]
```

## CSV形式で取得

`Accept`ヘッダフィールドに`text/csv`を指定してリクエストする、もしくは、リクエストURLに`$format=csv`クエリパラメータを付与し、CSVファイルをダウンロードが可能です。 

このCSVファイルはExcelで開くために、BOM付きUTF8エンコードとして出力されます。

**例** 
```
--- リクエスト:Acceptヘッダフィールド ---
GET ~/data/query/render?name=QuerySample HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx
Accept: text/csv

--- リクエスト:$formatクエリパラメータ ---
GET ~/data/query/render?name=QuerySample&$format=csv HTTP/1.1
Authorization: Basic xxxxxxxxxxxxxxxxxxx

--- レスポンス ---
HTTP/1.1 200 OK
Content-Length: 149
Content-Type: text/csv

"i","s"
0,"0"
1,"1"
2,"2"

```