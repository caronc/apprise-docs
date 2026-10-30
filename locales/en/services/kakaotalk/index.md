---
title: "KakaoTalk Notifications"
description: "Send KakaoTalk messages to yourself or your friends."
sidebar:
  label: "KakaoTalk"

source: https://www.kakaocorp.com

schemas:
  - kakaotalk
  - kakao

has_chat: true

body_formats:
  - text

sample_urls:
  - kakaotalk://{client_id}/{refresh_token}
  - kakaotalk://{client_secret}@{client_id}/{refresh_token}
  - kakaotalk://{client_id}/{refresh_token}/{uuid1}/{uuid2}/{uuidN}

limits:
  max_chars: 200
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Apprise sends messages through the Kakao Talk Message API. The messages come from your own KakaoTalk account, either to yourself (in your "Chat with me" room) or to your friends.

1. Sign in to [Kakao Developers](https://developers.kakao.com/) and create an application.
2. Under **App Keys**, copy the **REST API Key**. This is your `{client_id}`.
3. Under **Kakao Login**, turn Kakao Login on and add a **Redirect URI** (for example `https://localhost/`).
4. Under **Kakao Login > Consent Items**, enable **Send message in KakaoTalk** (`talk_message`).
5. Under **Kakao Login > Security**, copy the **Client Secret** if it is turned on. This is your `{client_secret}`.
6. Open this address in your browser, sign in and agree. Swap in your own `{client_id}` and `{redirect_uri}`:

   ```text
   https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=talk_message
   ```

7. Your browser is sent to your Redirect URI with `?code=` on the end. Copy that code and trade it for your tokens:

   ```bash
   curl -X POST https://kauth.kakao.com/oauth/token \
       -d grant_type=authorization_code \
       -d client_id={client_id} \
       -d client_secret={client_secret} \
       -d redirect_uri={redirect_uri} \
       -d code={code}
   ```

8. Keep the `refresh_token` value from the response. This is your `{refresh_token}`. Leave out the `client_secret` line if your app does not use one.

Apprise uses the refresh token to get a fresh access token whenever it needs one. When Kakao hands out a new refresh token (about once a month before the old one expires), Apprise keeps it in its [persistent storage](/cli/persistent-storage/), so make sure persistent storage is turned on for long-running setups.

### Sending to Friends

With no target, messages are sent to yourself. To message friends, add their KakaoTalk UUIDs to the URL. Friends must also have signed in to your app, and your app needs permission to send to friends (see **Kakao Talk Message** in the Kakao Developers console). You can list your friends' UUIDs with the [friends list API](https://developers.kakao.com/docs/en/kakaotalk-social/rest-api) once the **Friends list in Kakao Service** (`friends`) consent item is enabled.

Use `me` as a target to include yourself along with your friends.

:::note
A KakaoTalk message holds at most 200 characters, so longer messages are split. Every message includes a link that opens when it is tapped. Set it with `?link=` to a page on a domain you registered under **Platform > Web** in your app.
:::

:::note
Attachments are not supported because the Kakao Talk Message API only accepts images by URL and has no file upload.
:::

## Syntax

Valid syntax is as follows:

- `kakaotalk://{client_id}/{refresh_token}`
- `kakaotalk://{client_secret}@{client_id}/{refresh_token}`
- `kakaotalk://{client_id}/{refresh_token}/{uuid}`
- `kakaotalk://{client_id}/{refresh_token}/{uuid1}/{uuid2}/{uuidN}/me`

You can shorten `kakaotalk://` to `kakao://`.

## Parameter Breakdown

| Variable      | Required | Description                                                                                                 |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| client_id     | Yes      | The REST API Key of your Kakao Developers application.                                                      |
| refresh_token | Yes      | The refresh token you got while setting up your account.                                                    |
| client_secret | No       | The Client Secret of your application, if it is turned on. It can also be given with `?secret=`.            |
| uuid          | No       | The UUID of a friend to notify. Use `me` for yourself. When no target is given, the message is sent to you. |
| link          | No       | The web page that opens when the message is tapped. The default is `https://developers.kakao.com`.          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to yourself:

```bash
# Replace 0123456789abcdef0123456789abcdef with your REST API Key
# Replace tGb4hhaFbYxNRexWXy6TQuKGx with your Refresh Token
apprise -vv -b "Backup complete." \
    kakaotalk://0123456789abcdef0123456789abcdef/tGb4hhaFbYxNRexWXy6TQuKGx
```

Send a message to two friends and yourself, using a Client Secret:

```bash
# Replace Sx9QeT1aYp7Lr3Kd with your Client Secret
apprise -vv -t "Alert" -b "Something happened." \
    "kakao://Sx9QeT1aYp7Lr3Kd@0123456789abcdef0123456789abcdef/tGb4hhaFbYxNRexWXy6TQuKGx/-Jqzh7SBuYq4kKCRo5WvhrCJsJS9gbm7kQ/aBcDeFgHiJkLmNoPqRsTuVwXyZ/me"
```

Open your own status page when the message is tapped:

```bash
apprise -vv -b "Server is down." \
    "kakaotalk://0123456789abcdef0123456789abcdef/tGb4hhaFbYxNRexWXy6TQuKGx?link=https://status.example.com"
```
