---
title: "Kook Notifications"
description: "Send notifications to Kook channels and direct messages."
sidebar:
  label: "Kook"

source: https://www.kookapp.cn/

schemas:
  - kook

has_attachments: true
has_chat: true

sample_urls:
  - kook://{BotToken}/{ChannelID}
  - kook://{BotToken}/{ChannelID1}/{ChannelID2}
  - kook://{BotToken}/@{UserID}
  - kook://{WebhookKey}?mode=webhook

limits:
  - name: "Bot API"
    max_chars: 5000
  - name: "Webhook"
    max_chars: 5000
---

<!-- SERVICE:DETAILS -->

Kook (formerly Kaihei / 开黑啦) is a Chinese gaming-focused communication
platform similar to Discord, offering text channels, voice channels, and
direct messaging.

<!-- SPONSORS:BANNER -->

## Account Setup

### Bot Mode (Recommended)

Bot mode gives you full API access including file attachment support.

1. Visit [https://developer.kookapp.cn](https://developer.kookapp.cn) and sign in.
2. Click **Create Application** and give it a name (e.g. "Apprise").
3. Under your new application, click **Bot** in the left sidebar.
4. Click **Add Bot** and then copy the **Token** shown on the Bot page.
5. Invite the bot to your server using the **OAuth2** page and grant it the
   required permissions (at minimum: **Send Messages**).
6. Enable Developer Mode in Kook: **Settings → Others → Developer Mode**.
7. Right-click any channel and select **Copy ID** to get its numeric ID.

### Webhook Mode

Webhook mode is simpler but does not support file attachments.

1. In Kook, open **Server Settings → Integrations → Webhooks**.
2. Click **Create Webhook** for the desired channel.
3. Copy the **webhook key** from the generated URL (the part after `/incoming/`).

## Syntax

Valid syntax is as follows:

- `kook://{token}/{channel_id}`
- `kook://{token}/{channel_id1}/{channel_id2}/...`
- `kook://{token}/@{user_id}`
- `kook://{token}/{channel_id}/@{user_id}`
- `kook://{webhook_key}?mode=webhook`

:::note
Prefix a target with `@` to send a **direct message** to a user instead
of posting to a channel.
:::

## Parameter Breakdown

| Variable     | Required | Description                                                           |
| ------------ | -------- | --------------------------------------------------------------------- |
| `token`      | \*Yes    | Your bot token (bot mode) or webhook key (webhook mode).              |
| `channel_id` | No       | Numeric channel ID to post to. May be repeated for multiple channels. |
| `user_id`    | No       | Numeric user ID for a direct message. Prefix with `@`.                |
| `mode`       | No       | Operating mode: `bot` (default) or `webhook`.                         |
| `msg_type`   | No       | Message body format: `kmarkdown` (default) or `text`.                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a KMarkdown notification to a single channel:

```bash
apprise -vv -t "Title" -b "Hello from **Apprise**!" \
    kook://BOT_TOKEN/CHANNEL_ID
```

Send to multiple channels:

```bash
apprise -vv -t "Alert" -b "Message body" \
    kook://BOT_TOKEN/CHANNEL_ID1/CHANNEL_ID2
```

Send a direct message to a user:

```bash
apprise -vv -t "DM" -b "Private message" \
    kook://BOT_TOKEN/@USER_ID
```

Send via incoming webhook:

```bash
apprise -vv -b "Webhook notification" \
    "kook://WEBHOOK_KEY?mode=webhook"
```

Force plain-text formatting:

```bash
apprise -vv -b "Plain text message" \
    "kook://BOT_TOKEN/CHANNEL_ID?msg_type=text"
```
