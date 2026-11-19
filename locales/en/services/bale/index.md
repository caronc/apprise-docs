---
title: "Bale Notifications"
description: "Send notifications to Bale users, groups and channels through a Bale Bot."
sidebar:
  label: "Bale"

source: https://bale.ai

schemas:
  - bale

has_attachments: true
has_chat: true

body_formats:
  - text

sample_urls:
  - bale://{bot_token}/{chat_id}
  - bale://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}
  - bale://{bot_token}/@{channel}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Apprise sends Bale messages through a Bale Bot.

1. In the Bale app, start a chat with the **@botfather** account.
2. Send it `/newbot` and follow the prompts to name your bot.
3. @botfather replies with your **Bot Token**. It looks like `123456789:abcdefghijKLMNOPqrst`.

Next, find the Chat ID of each person or group you want to notify:

1. Have them send any message to your bot.
2. Open the following link in your browser, using your own Bot Token:

   ```text
   https://tapi.bale.ai/bot{bot_token}/getUpdates
   ```

3. The Chat ID is the `id` value found inside the `chat` section of the response. Group Chat IDs start with a minus sign (`-`).

To post to a public channel, add your bot to the channel as an administrator and use the channel's username (for example `@mychannel`) instead of a Chat ID.

:::note
The `getUpdates` link does not work if your bot already has a webhook set up.
:::

:::note
Bale reads every message as Markdown, so characters such as `*` and `_` may change how your text looks.
:::

## Syntax

Valid syntax is as follows:

- `bale://{bot_token}/{chat_id}`
- `bale://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}`
- `bale://{bot_token}/@{channel}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                         |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| bot_token | Yes      | The Bot Token @botfather sent you when the bot was created. It looks like `123456789:abcdef`.                       |
| chat_id   | Yes      | The Chat ID of a person or group, or a public channel's `@username`. Add as many as you like, separated by a slash. |
| to        | No       | Another way to list the Chat IDs to notify, separated by a comma. Handy in configuration files.                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to one person:

```bash
# Replace 123456789:abcdefghij with your Bot Token
# Replace 987654321 with the Chat ID to notify
apprise -vv -t "Alert" -b "Something happened." \
    bale://123456789:abcdefghij/987654321
```

Send a message to a group and a channel, with a photo attached:

```bash
apprise -vv -b "Backup complete." --attach=/path/to/photo.jpg \
    "bale://123456789:abcdefghij/-987654321/@mychannel"
```
