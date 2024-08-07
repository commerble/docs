---
title: "CAPTCHA"
weight: 2
description:
---

CAPTCHA機能を有効にするためには、テンプレートに、CAPTCHAに必要なスクリプト等の実装が必要です。

## reCAPTCHA (Essentials, Starndard, Enterprise)

### 1. reCAPTCHAのクライアントトークンの生成に必要な処理を実装する

検証するエンドポイントの直前のテンプレートに、以下の3つの要素を実装します。

```
<input type="hidden" name="CAPTCHA" data-cb-recaptcha="token">
```
この要素はreCAPTCHAからのレスポンストークンを埋めるinput要素です。 `[data-cb-recaptcha="token"]` を付与します。また、inputタグは送信formタグの中にレンダリングされる必要があります。


```
<button type="submit" data-cb-recaptcha="trigger">購入</button>
```
この要素はreCAPTCHAにリクエストをするトリガーとなるbutton要素（購入ボタンなど）です。 `[data-cb-recaptcha="trigger"]` を付与してください。
`button[type="submit"]` 以外に、 `button[type="button"]` や `input[type="submit"]` などクリック可能な要素であれば利用できます。


```
@Page.Template.RecaptchaRenderInclude("<検証個所コード>")
```
このテンプレートヘルパーは、reCAPTCHA用のJavaScriptとヘルパー用のJavaScriptのためのscript要素をレンダリングします。body下部等の任意の場所で呼び出し出力されるHTMLにスクリプトを含めます。
引数には1つ以上の[検証個所コード](../../management/admin/ec/config/#captcha)を指定します。

reCAPTCHAに送信するアクション名には、検証個所コードが使用されます。
同一ページに複数アクション設置する際には、`trigger`の後`:<検証コード>`を付与して明示的に指定できます。

```
<button type="button" data-cb-recaptcha="trigger:Member/Payments/Create">追加</button>
<button type="button" data-cb-recaptcha="trigger:Member/Payments/Delete">削除</button>
```

なお、テンプレート上にSPAを構築している場合は、`RecaptchaRenderInclude` の初期化処理と、実際のDOMのレンダリングのタイミングにずれが生じ得ます。その際はレンダリング後に `window.__cbrecaptcha.mount();` を実行することで初期化できます。

<!-- textlint-disable ja-technical-writing/sentence-length -->
また、`[data-cb-recaptcha="trigger"]`の代わりにJavaScript上で`window.__cbrecaptcha.execute();//Promise<void>`を使用することで、任意のタイミングで`[data-cb-recaptcha="token"]`にレスポンストークンを埋めることができます。
<!-- textlint-enable ja-technical-writing/sentence-length -->

これらのヘルパーを使用せずに、Google reCAPTCHA js APIをそのまま利用し開発しても問題ありません。その際、取得したレスポンストークンは必ず"CAPTCHA"のキーでサーバーに送信するよう実装します。

### 2. CAPTCHAエラーをハンドルする 

CAPTCHA検証の結果、閾値を下回った場合は400エラーになり、`Page.IsCaptchaError()`が`true`を返します。このエラーコードを使うことで表示をコントロールできます。

```
<!-- ModdErrorsError400 -->

@if (Page.IsCaptchaError()) {
  <p>ボットと判定されました。</p>
}
```

## その他のCAPTCHAサービス

[Cloudflare Turnstile](https://www.cloudflare.com/ja-jp/products/turnstile/) 等、Google reCAPTCHAとは異なるCAPTCHAサービスをご希望される場合はお問い合わせください。

## 設定

CAPTCHA検証を有効にするにはテンプレート実装に加えて[アプリケーション設定](../../management/admin/ec/config/#captcha)が必要になります。

