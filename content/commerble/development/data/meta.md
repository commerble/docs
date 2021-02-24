---
title: "メタデータ"
weight: 40
description: 
---

メタデータとは、Commerbleが定義するCMSシステムの標準データです。  
テンプレートやルーティング情報が該当します。メタデータのスキーマ仕様は固定でカスタマイズはできません。

メタデータは、Web API経由でアクセス可能です。

## ListFields

リストのフィールドデータ。CMSスキーマのカラム情報として扱われます。

|     列名      |   型    | 最大長 | 主キー | Identity | NULL許容 |                 説明                 |
| ------------- | ------- | ------ | :----: | :------: | :------: | ------------------------------------ |
| Id            | Int32   |        |   O    |          |          | リストフィールドID                   |
| ListId        | Int32   |        |        |          |    O     | リストID                             |
| ColumnOrdinal | Int32   |        |        |          |          | カラム番号                           |
| ColumnName    | String  | 60     |        |          |          | カラム名                             |
| DisplayText   | String  | 60     |        |          |    O     | 表示名                               |
| TypeId        | Int32   |        |        |          |    O     | タイプID                             |
| IsVersioned   | Boolean |        |        |          |          | バージョンフィールドフラグ(廃止予定) |
| IsPrimaryKey  | Boolean |        |        |          |          | プライマリキーフラグ                 |
| IsNullable    | Boolean |        |        |          |          | NULL許容フラグ                       |

+ Parents
    - [Lists](#lists)(1)
    - [Types](#types)(1)
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Lists

リストデータ。CMSスキーマのテーブル情報として扱われます。


|        列名        |   型   | 最大長 | 主キー | Identity | NULL許容 |                説明                |
| ------------------ | ------ | ------ | :----: | :------: | :------: | ---------------------------------- |
| Id                 | Int32  |        |   O    |          |          | リストID                           |
| Revision           | Int32  |        |        |          |          | リビジョン番号(1固定)              |
| TableName          | String | 60     |        |          |          | テーブル名                         |
| DisplayText        | String | 60     |        |          |    O     | 表示名                             |
| IdentityColumnName | String | 60     |        |          |    O     | 主キー用フィールド名               |
| DisplayColumnName  | String | 60     |        |          |    O     | 表示名用フィールド名               |
| IsMaster           | Int32  |        |        |          |          | マスターデータリストフラグ         |
| IsVersioned        | Int32  |        |        |          |          | バージョンリストフラグ（廃止予定） |
| CreaterUser        | Int32  |        |        |          |          | 作成者                             |
| CreateAt           | Int32  |        |        |          |          | 作成日                             |
| Deleted            | Int32  |        |        |          |          | ソフトデリートフラグ               |

+ Parents
+ Children
    - [ListFields](#listfields)(*)
    - [ListRelations](#listrelations)(*)
+ Realations
---------------------------------------------------------------------------------------

## ListRelations

リスト同士の関連データ

|     列名      |  型   | 最大長 | 主キー | Identity | NULL許容 |      説明      |
| ------------- | ----- | ------ | :----: | :------: | :------: | -------------- |
| ListId        | Int32 |        |   O    |          |          | リストID       |
| RelationId    | Int32 |        |   O    |          |          | 関連ID         |
| TargetListId  | Int32 |        |        |          |          | 関連先リストID |
| EditOrdinal   | Int32 |        |        |          |          | 未使用(0固定)  |
| UpdateCascade | Int32 |        |        |          |          | 未使用(0固定)  |
| DeleteCascade | Int32 |        |        |          |          | 未使用(0固定)  |

+ Parents
    - [Lists](#lists)(1)
+ Children
    - [ListRelationColumns](#listrelationcolumns)(1..*)
+ Realations
---------------------------------------------------------------------------------------

## ListRelationColumns

リスト関連の結合情報

|       列名       |   型   | 最大長 | 主キー | Identity | NULL許容 |        説明        |
| ---------------- | ------ | ------ | :----: | :------: | :------: | ------------------ |
| ListId           | Int32  |        |   O    |          |          | キャンペーンID     |
| RelationId       | Int32  |        |   O    |          |          | 関連ID             |
| ColumnName       | String | 60     |   O    |          |          | 関連元フィールド名 |
| TargetColumnName | String | 60     |        |          |          | 関連先フィールド名 |

+ Parents
    - [ListRelations](#listrelations)(1)
+ Children
+ Realations
---------------------------------------------------------------------------------------

## Types

フィールドタイプ

|         列名         |   型   | 最大長 | 主キー | Identity | NULL許容 |        説明        |
| -------------------- | ------ | ------ | :----: | :------: | :------: | ------------------ |
| Id                   | Int32  |        |   O    |          |          | キャンペーンID     |
| Name                 | String | 50     |        |          |          | 名称               |
| DbTypeName           | String | 40     |        |          |          | DB型名             |
| DbDefaultValue       | String | 100    |        |          |          | DBデフォルト値     |
| ClrTypeName          | String | 250    |        |          |          | ランタイム型名     |
| UrlConstraint        | String | MAX    |        |          |          | URL値検証正規表現  |
| InputValidation      | String | MAX    |        |          |          | 値検証正規表現     |
| DefaultFieldTypeName | String | 100    |        |          |          | 未使用(空文字固定) |

+ Parents
+ Children
    - [ListFields](#listfields)(*)
    - [RoutingParameters](#routingparameters)(*)
    - [TemplateParameters](#templateparameters)(*)
+ Realations
---------------------------------------------------------------------------------------

## RoutingParameters

ルーティングパラメータ

|     列名      |   型    | 最大長 | 主キー | Identity | NULL許容 |           説明           |
| ------------- | ------- | ------ | :----: | :------: | :------: | ------------------------ |
| Id            | Int32   |        |   O    |          |          | ルーティングパラメータID |
| Name          | String  | 128    |        |          |          | パラメータ名             |
| ParameterType | Int32   |        |        |          |          | パラメータ種類※           |
| TypeId        | Int32   |        |        |          |          | タイプID                 |
| Value         | String  | 128    |        |          |          | 値                       |
| HasValue      | Boolean | 128    |        |          |          | 値フラグ                 |

※ パラメータ種類 (1:ルートパラメータ、 2:クエリパラメータ、3:カスタムヘッダ)


+ Parents
    - [Routings](#routings)
+ Children
    - [RoutingDataTokens](#routingdatatokens)
+ Realations
---------------------------------------------------------------------------------------


## Routings

ルーティング情報

|      列名      |   型   | 最大長 | 主キー | Identity | NULL許容 |                    説明                    |
| -------------- | ------ | ------ | :----: | :------: | :------: | ------------------------------------------ |
| Id             | Int32  |        |   O    |          |          | ルーティングID                             |
| Name           | String | 100    |        |          |          | ルーティング名                             |
| Pattern        | String | 250    |        |          |          | ルーティングパターン                       |
| RouteType      | Int32  |        |        |          |          | ルーティングタイプ(1:テンプレート, 2:Blob) |
| ContentType    | String | 100    |        |          |          | コンテントタイプ                           |
| TemplateName   | String | 80     |        |          |    O     | テンプレート名(RouteTypeが1の時のみ使用)   |
| BlobExpression | String | 100    |        |          |    O     | Blobカラム(RouteTypeが2の時のみ使用)       |
| BlobQuery      | String | MAX    |        |          |    O     | Blobクエリ(RouteTypeが2の時のみ使用)       |
| LoadOrder      | Int32  |        |        |          |    O     | 優先順位(未使用)                           |

+ Parents
+ Children
    - [RoutingParameters](#routingparameters)
+ Realations
---------------------------------------------------------------------------------------


## RoutingDataTokens


| 列名  |   型   | 最大長 | 主キー | Identity | NULL許容 |             説明             |
| ----- | ------ | ------ | :----: | :------: | :------: | ---------------------------- |
| Id    | Int32  |        |   O    |          |          | ルーティングデータトークンID |
| Name  | String | 128    |   O    |          |          | ルーティングデータトークン名 |
| Value | Binary | MAX    |        |          |          | 値                           |

+ Parents
    - [RoutingParameters](#routingparameters)
+ Children
+ Realations
---------------------------------------------------------------------------------------


## TemplateParameters

テンプレートパラメータ

|  列名  |   型   | 最大長 | 主キー | Identity | NULL許容 |           説明           |
| ------ | ------ | ------ | :----: | :------: | :------: | ------------------------ |
| Id     | Int32  |        |   O    |          |          | テンプレートパラメータID |
| Name   | String | 50     |   O    |          |          | テンプレートパラメータ名 |
| TypeId | Int32  |        |        |          |          | タイプID                 |

+ Parents
    - [Templates](#templates)
+ Children
+ Realations
---------------------------------------------------------------------------------------


## Templates

テンプレート情報

| 列名 |   型   | 最大長 | 主キー | Identity | NULL許容 |        説明         |
| ---- | ------ | ------ | :----: | :------: | :------: | ------------------- |
| Id   | Int32  |        |   O    |          |          | テンプレートID      |
| Name | String | 256    |        |          |          | テンプレート名      |
| Text | String | MAX    |        |          |          | テンプレート        |
| Type | String | 16     |        |          |          | テンプレートタイプ※ |

※テンプレートタイプ: template,cshtml,mail,csx

+ Parents
+ Children
    - [TemplateParameters](#templateparameters)
+ Realations
---------------------------------------------------------------------------------------