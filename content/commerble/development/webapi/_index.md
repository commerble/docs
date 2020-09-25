---
title: "Web API"
weight: 30
description: 
---

# Web API

この章では、Commerbleの管理用Web APIについて説明します。

このAPIは管理用であり、カート処理用のWeb APIでは無いことに留意が必要です。

つまりこれはJAMStackで構成されたECサイト(フロントサイト)から使用する購入APIとしては機能しないことを意味します。  
そのようなAPIが必要な場合は[カスタマイズ実績：カートのWeb API化]をご参照ください。

## エンドポイント

CommerbleではWEB APIをREST形式で提供しています。REST仕様は[OData]に則っています。

ODataのバージョンは旧フィードAPIがV3、現行API(data)がV4を提供しています。

|          エンドポイント          |           種類           | ODataバージョン |   状態   |
| :------------------------------- | :----------------------: | :-------------: | :------: |
| ~/ec.feed/odata.svc              |         EC Feed          |       V3        |   廃止   |
| ~/ec.feed.v2/odata.svc           |         EC Feed          |       V3        | 廃止予定 |
| ~/ec.feed.v3/odata.svc           |         EC Feed          |       V3        | 廃止予定 |
| ~/ec.feed.v4/odata.svc           |         EC Feed          |       V3        |          |
| ~/ec.feed.v5/odata.svc           |         EC Feed          |       V3        |          |
| ~/cms.feed/list/odata.svc        |        CMS  Feed         |       V3        |   廃止   |
| ~/cms.feed.v2/list/odata.svc     |        CMS  Feed         |       V3        |          |
| ~/cms.feed/metadata/odata.svc    |        Meta  Feed        |       V3        |   廃止   |
| ~/cms.feed.v2/metadata/odata.svc |        Meta  Feed        |       V3        |          |
| ~/data/ec                        |         EC Feed          |       V4        |          |
| ~/data/cms                       |        CMS  Feed         |       V4        |          |
| ~/data/meta                      |        Meta Feed         |       V4        |          |
| ~/data/query                     |       Custom View        |       V4        |          |
| ~/data/template/validate         | Front Template Validator |        -        |          |
| ~/data/query/validate            | Query Template Validator |        -        |          |
| ~/data/mail/validate             | Mail Template Validator  |        -        |          |

<dl>
    <dt>EC Feed</dt>
    <dd>共通スキーマのデータにアクセスできます</dd>
    <dt>CMS Feed</dt>
    <dd>各テナントごとに設定したスキーマのデータにアクセスできます</dd>
    <dt>Meta Feed</dt>
    <dd>テンプレートデータ及びルーティングデータにアクセスできます</dd>
    <dt>Custom View</dt>
    <dd>カスタムビューテンプレートを実行できます</dd>
    <dt>Front Template Validator</dt>
    <dd>フロントテンプレートを検証できます</dd>
    <dt>Query Template Validator</dt>
    <dd>カスタムビューテンプレートを検証できます</dd>
    <dt>Mail Template Validator</dt>
    <dd>メールテンプレートを検証できます</dd>
</dl>

エンドポイントのフルURLと認証情報は契約後にご提供いたします。

## 認証

FeedRead/Write ロールが付与された管理サイトアカウントをベーシック認証で使用します。

同一アカウントで3回パスワードが間違われた場合はアカウントロックされます。

## 制限

Web APIの利用に対して、単位時間当たりのアクセス可能数などの利用制限はありません。 業務ドメインに基づいて、必要であれば、1000リクエスト、1万リクエスト、10万リクエストしていただけます。

ただし、、更新する必要のないデータを頻繁に入れ替えるなど、大量のAPIコールを日常的に実施することは避けてください。

モニタリングでそれらの兆候が観測された場合は、Commerble社から確認・状況の改善のご協力をお願いすることがあります。

## リンク

- [EC Feedを使用する](./data/#ec-feed)
- [CMS Feedを使用する](./data/#cms-feed)
- [Meta Feedを使用する](./data/#meta-feed)
- [Custom Viewを使用する](./query/)
- [Front Template Validatorを使用する](./template/#cshtml)
- [Mail Template Validatorを使用する](./template/#mail)
- [Query Template Validatorを使用する](./template/#csx)


[OData]: https://www.odata.org/ "OData"
[カスタマイズ実績：カートのWeb API化]: ../../achievement/cartapi/ "カートのWeb API化"
