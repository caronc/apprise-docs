---
title: "Guilded Notifications"
description: "Send Guilded notifications."
sidebar:
  label: "Guilded"

source: https://guilded.gg/

schemas:
  - guilded

has_chat: true
has_attachments: true
has_image: true

sample_urls:
  - https://media.guilded.gg/webhooks/{WebhookID}/{WebhookToken}
  - guilded://{WebhookID}/{WebhookToken}/
  - guilded://{botname}@{WebhookID}/{WebhookToken}/

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

First set up a Guilded account on the website. From there you will need to generate a webhook.

The webhook will end up looking something like this:
`https://media.guilded.gg/webhooks/4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js`

This effectively equates to:
`https://media.guilded.gg/webhooks/{WebhookID}/{WebhookToken}`

**Note:** Apprise supports this URL _as-is_ (_as of v0.7.7_); you no longer need to parse the URL any further. However there is slightly less overhead (internally) if you do.

The last part of the URL you're given make up the 2 tokens you need to send notifications with. With respect to the above example the tokens are as follows:

1. **WebhookID** is `4174216298`
2. **WebhookToken** is `JHMHI8qBe7bk2ZwO5U711o3dV_js`

## Syntax

Valid syntax is as follows:

- `https://media.guilded.gg/webhooks/{WebhookID}/{WebhookToken}`
- `guilded://{WebhookID}/{WebhookToken}/`
- `guilded://{botname}@{WebhookID}/{WebhookToken}/`

Guilded can also support a variety of website arguments, the below identifies the defaults and therefore do not need to be specified unless you want to override them:

- `guilded://{WebhookID}/{WebhookToken}/?tts=No&avatar=Yes&footer=No&image=Yes`

## Parameter Breakdown

| Variable     | Required | Description                                                                                                                                                                        |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebhookID    | Yes      | The first part of 2 tokens provided to you after creating a _incoming-webhook_                                                                                                     |
| WebhookToken | Yes      | The second part of 2 tokens provided to you after creating a _incoming-webhook_                                                                                                    |
| botname      | No       | Identify the name of the bot that should issue the message. If one isn't specified then the default is to just use your account (associated with the _incoming-webhook_).          |
| tts          | No       | Enable Text-To-Speech (by default is is set to **No**)                                                                                                                             |
| footer       | No       | Include a message footer (by default is is set to **No**)                                                                                                                          |
| image        | No       | Include an image in-line with the message describing the notification type (by default is is set to **Yes**)                                                                       |
| avatar       | No       | Over-ride the default guilded avatar icon and replace it with one identify the notification type (by default is is set to **Yes**)                                                 |
| avatar_url   | No       | Over-ride the default guilded avatar icon URL. By default this is not set and Apprise chooses the URL dynamically based on the type of message (info, success, warning, or error). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Guilded notification:

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "guilded://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js"
```

If you want to have your own custom avatar URL you're already hosting from another website, you could set the following:

```bash
# Assuming our {WebhookID} is 4174216298
# Assuming our {WebhookToken} is JHMHI8qBe7bk2ZwO5U711o3dV_js
# Assuming our {AvatarURL} is https://i.imgur.com/FsEpmwg.jpeg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "guilded://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js?avatar_url=https://i.imgur.com/FsEpmwg.jpeg"
```
