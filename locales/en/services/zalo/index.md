---
title: "Zalo Notifications"
description: "Send notifications to Zalo users and groups through a Zalo Bot."
sidebar:
  label: "Zalo"

source: https://zalo.me

schemas:
  - zalo

has_chat: true

body_formats:
  - markdown
  - text

sample_urls:
  - zalo://{bot_token}/{chat_id}
  - zalo://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Apprise sends Zalo messages through a Zalo Bot.

1. In the Zalo app, search for the **Zalo Bot Manager** account.
2. Choose **Create bot** from its menu. The bot name must start with `Bot` (for example `Bot Apprise`).
3. Zalo sends you a message containing your **Bot Token**. It looks like `123456789:abcdefghijKLMNOPqrst`.

Next, find the Chat ID of each person or group you want to notify:

1. Have them send any message to your bot.
2. Open the following link in your browser, using your own Bot Token:

   ```text
   https://bot-api.zaloplatforms.com/bot{bot_token}/getUpdates
   ```

3. The Chat ID is the `id` value found inside the `chat` section of the response.

:::note
The `getUpdates` link does not work if your bot already has a webhook set up.
:::

:::note
Attachments are not supported. Zalo only accepts photos that are already hosted online, not file uploads.
:::

## Syntax

Valid syntax is as follows:

- `zalo://{bot_token}/{chat_id}`
- `zalo://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                  |
| --------- | -------- | -------------------------------------------------------------------------------------------- |
| bot_token | Yes      | The Bot Token Zalo sent you when the bot was created. It looks like `123456789:abcdef`.      |
| chat_id   | Yes      | The Chat ID of a person or group to notify. Add as many as you like, separated by a slash.   |
| format    | No       | Use `markdown` (the default) for bold, italic, headings and lists, or `text` for plain text. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to one person:

```bash
# Replace 123456789:abcdefghij with your Bot Token
# Replace abc.xyz with the Chat ID to notify
apprise -vv -t "Alert" -b "Something happened." \
    zalo://123456789:abcdefghij/abc.xyz
```

Send a plain text message to two chats:

```bash
apprise -vv -b "Backup complete." \
    "zalo://123456789:abcdefghij/abc.xyz/def.uvw?format=text"
```
