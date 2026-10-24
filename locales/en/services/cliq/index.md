---
title: "Zoho Cliq Notifications"
description: "Post messages to Zoho Cliq channels and bots using a Webhook Token."
sidebar:
  label: "Zoho Cliq"

source: https://www.zoho.com/cliq/

schemas:
  - cliq
  - zcliq
  - zohocliq

has_chat: true
has_image: true

body_formats:
  - markdown

limits:
  max_chars: 5000

sample_urls:
  - cliq://{token}/{channel}
  - cliq://{token}/@{bot}
  - cliq://{botname}@{token}/#{channel}/@{bot}?region=eu
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Zoho Cliq](https://www.zoho.com/cliq/) messages are posted using a Webhook Token:

1. Sign in to Zoho Cliq and open **Bots & Tools**, then **Webhook Tokens**.
2. Complete the verification step and click **Generate New Token**.
3. Copy the token. It looks like `1001.2798931fdf4905dc5d37806b47d8253a.2d73063dae2ccf4a04810ddb0a1b2c3d`.

Messages can be sent to a channel or to a bot:

- **Channels** are addressed by their unique name, which is shown on the channel's **Channel Info** page.
- **Bots** are addressed by their unique name with a leading `@`. A bot message goes to your own chat with the bot unless `broadcast=yes` is set, in which case every subscriber of the bot receives it.

If your account is not hosted in the US data center, add `region=` to the URL. You can tell which one you use from the address you sign in at, for example `cliq.zoho.eu` means `region=eu`.

You can also paste a Cliq webhook URL as-is, for example `https://cliq.zoho.com/api/v2/channelsbyname/{channel}/message?zapikey={token}`.

:::note
Webhook Tokens can only post messages, so attachments are not supported.
:::

## Syntax

Valid syntax is as follows:

- `cliq://{token}/{channel}`
- `cliq://{token}/#{channel}`
- `cliq://{token}/@{bot}`
- `cliq://{botname}@{token}/#{channel1}/#{channel2}/@{bot}`
- `https://cliq.zoho.com/api/v2/channelsbyname/{channel}/message?zapikey={token}`
- `https://cliq.zoho.com/api/v2/bots/{bot}/message?zapikey={token}`

The `zcliq://` and `zohocliq://` schemas work the same way as `cliq://`.

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                      |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token     | Yes      | Your Zoho Cliq Webhook Token.                                                                                                                                    |
| channel   | \*No     | The unique name of a channel to notify. The leading `#` is optional.                                                                                             |
| bot       | \*No     | The unique name of a bot to notify, written with a leading `@`.                                                                                                  |
| botname   | No       | The sender name shown on the message. When it is not set and `image=yes`, the name **Apprise** is used.                                                          |
| region    | No       | The data center your account is hosted in. Possible values are **us**, **eu**, **in**, **au**, **cn**, **jp**, **sa**, **uk** and **ca**. The default is **us**. |
| company   | No       | Your company ID, for accounts that belong to more than one company. It is the number after `/company/` in your Cliq address.                                     |
| image     | No       | Shows an icon that matches the notification type as the sender's picture. Set it to `no` to post as yourself instead. The default is `yes`.                      |
| broadcast | No       | Sends bot messages to every subscriber of the bot. The default is `no`.                                                                                          |

\*At least one channel or bot must be specified.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to the `general` channel:

```bash
apprise -vv -t "Backup Complete" -b "All files were copied" \
   "cliq://1001.2798931fdf4905dc5d37806b47d8253a.2d73063dae2ccf4a04810ddb0a1b2c3d/general"
```

Send a message to a channel and to every subscriber of a bot, on an account hosted in Europe:

```bash
apprise -vv -t "Disk Space" -b "db01 is at 95% disk usage" \
   "cliq://Monitor@1001.2798931fdf4905dc5d37806b47d8253a.2d73063dae2ccf4a04810ddb0a1b2c3d/#ops/@alertbot?region=eu&broadcast=yes"
```
