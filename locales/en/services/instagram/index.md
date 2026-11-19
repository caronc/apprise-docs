---
title: "Instagram Notifications"
description: "Send Instagram direct messages from your Instagram professional account."
sidebar:
  label: "Instagram"

source: https://developers.facebook.com/docs/instagram-platform/

schemas:
  - instagram

has_attachments: true
has_chat: true

body_formats:
  - text

sample_urls:
  - instagram://{token}/{user_id}
  - instagram://{token}/{user_id1}/{user_id2}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::caution
Instagram only lets a business reply to people who messaged it first. Each person you notify must have sent your Instagram account a direct message within the last **24 hours**, or Instagram will refuse the notification.
:::

## Account Setup

Apprise sends Instagram direct messages from an Instagram **professional** account (Business or Creator).

1. In the Instagram app, switch your account to a professional account if it isn't one already.
2. In the Instagram app, open **Settings** > **Messages and story replies** > **Message controls** and turn on **Allow access to messages**.
3. Visit the [Meta for Developers](https://developers.facebook.com/apps) portal, create a new app of type **Business**, and add the **Instagram** product to it.
4. Open **Instagram** > **API setup with Instagram business login**, add your Instagram account, and click **Generate token**. Copy the access token.
5. Have each person you want to notify send your Instagram account a direct message. Then find their user ID (see below).

The access token is valid for 60 days. Generate a new one from the same page when it expires.

If your app is still in **Development** mode, add each person you message as an Instagram tester under **App roles**.

### Finding a user ID

Instagram identifies each person by a numeric user ID that is only valid for your account. Once someone has messaged you, list your conversations to find it:

```bash
curl "https://graph.instagram.com/v26.0/me/conversations?platform=instagram&fields=participants&access_token={token}"
```

Each conversation lists its participants with their `username` and `id`. Use the `id` of the person you want to notify.

### Using a Facebook Page token

If your Instagram account is linked to a Facebook Page, you can use that Page's access token (it starts with `EAA`) instead. Apprise detects it automatically. Meta documents sending files with a Page token, so use one if attachments fail with your Instagram token.

## Syntax

Valid syntax is as follows:

- `instagram://{token}/{user_id}`
- `instagram://{token}/{user_id1}/{user_id2}/{user_idN}`

## Parameter Breakdown

| Variable | Required | Description                                                                             |
| -------- | -------- | --------------------------------------------------------------------------------------- |
| token    | Yes      | The access token generated for your Instagram account, or a Facebook Page access token. |
| user_id  | Yes      | The numeric user ID of a person to message. You can list as many as you like.           |
| to       | No       | Another way to list user IDs, separated by commas.                                      |

Images (PNG and JPEG, up to 8 MB), audio, video and PDF files (up to 25 MB) can be attached. Each one arrives as its own message.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to one person:

```bash
# Assuming our {token} is IGAAabc123
# Assuming the {user_id} to notify is 1234567890123456
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "instagram://IGAAabc123/1234567890123456"
```

Send a picture to two people using a Facebook Page token:

```bash
# Assuming our Facebook Page {token} is EAAabc123
apprise -vv -b "Today's graph" --attach=graph.png \
   "instagram://EAAabc123/1234567890123456/6543210987654321"
```
