---
title: "Fluxer Notifications"
description: "Send Fluxer notifications."
sidebar:
  label: "Fluxer"

source: https://fluxer.app/
schemas:
  - fluxer: insecure
  - fluxers

sample_urls:
  - https://api.fluxer.app/webhooks/{WebhookID}/{WebhookToken}
  - https://api.fluxer.app/v1/webhooks/{WebhookID}/{WebhookToken}
  - fluxer://{WebhookID}/{WebhookToken}
  - fluxer://{botname}@{WebhookID}/{WebhookToken}

has_selfhosted: true
has_attachments: true
has_image: true

limits:
  max_chars: 2000
---

<!-- SERVICE:DETAILS -->

## Account Setup

Fluxer uses webhooks for posting notifications.

A webhook URL looks like this:

`https://api.fluxer.app/webhooks/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV`

This effectively equates to:
`https://api.fluxer.app/webhooks/{WebhookID}/{WebhookToken}`

The last part of the URL you are given make up the 2 tokens you need to send notifications with. With respect to the above example the tokens are as follows:

1. **WebhookID** is `417429632418316298`
2. **WebhookToken** is `JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV`

### Pinging Roles, Tags, and Users

Fluxer supports Discord-style mentions. You can place these directly in the message body:

- **user**: `<@123>`
- **role**: `<@&456>`
- **tag**: `@everyone` or `@here`

You can also force pings via the `ping=` URL parameter (see below).

## Syntax

Valid syntax is as follows:

- `https://api.fluxer.app/webhooks/{WebhookID}/{WebhookToken}`
- `https://api.fluxer.app/v1/webhooks/{WebhookID}/{WebhookToken}`
- `fluxer://{WebhookID}/{WebhookToken}/`
- `fluxer://{botname}@{WebhookID}/{WebhookToken}/`

### Private Server Mode

Fluxer can be used in two modes:

- `mode=cloud` (default): posts to the Fluxer Cloud API (`https://api.fluxer.app`)
- `mode=private`: posts to the host you specify in the URL

When `mode=private` is used, a host is required:

- `fluxer://{host}/{WebhookID}/{WebhookToken}/?mode=private`
- `fluxer://{host}:{port}/{WebhookID}/{WebhookToken}/?mode=private`

If `mode=private` is selected but the host contains `fluxer.app`, Apprise will automatically switch back to `mode=cloud`.

## Parameter Breakdown

| Variable     | Required | Description |
| ------------ | -------- | ----------- |
| WebhookID    | Yes      | The first part of 2 tokens provided to you after creating an incoming webhook |
| WebhookToken | Yes      | The second part of 2 tokens provided to you after creating an incoming webhook |
| botname      | No       | Identify the name of the bot that should issue the message |
| host         | No       | Hostname of your private Fluxer server (used with `mode=private`) |
| port         | No       | Port of your private Fluxer server (used with `mode=private`) |
| mode         | No       | One of: `cloud` (default) or `private` |
| tts          | No       | Enable Text-To-Speech (default is **No**) |
| avatar       | No       | Override the default avatar icon and replace it with one identifying the notification type (default is **Yes**) |
| avatar_url   | No       | Override the avatar icon URL. If not set, Apprise chooses a URL dynamically based on message type |
| footer       | No       | Include a footer section in the embed (default is **No**) |
| footer_logo  | No       | Include the Fluxer footer logo when `footer=yes` (default is **Yes**) |
| image        | No       | Include an image in-line with the message describing the notification type (default is **No**) |
| fields       | No       | Use embedded fields when posting in `markdown` format (default is **Yes**) |
| format       | No       | The default is `text`. Set to `markdown` to enable markdown-to-embed parsing (headers are converted into embeds) |
| href         | No       | Identify a URL the title should link to when posting. You can also use `url=` as an alias |
| thread       | No       | Optionally set the `thread_id` you wish your message to be applied to |
| thread_name  | No       | Optionally set the thread name when using `thread=` |
| ping         | No       | A comma-separated list of users, roles, or tokens such as `everyone` that should always be pinged |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Fluxer notification:

```bash
# Assuming our {WebhookID} is 417429632418316298
# Assuming our {WebhookToken} is JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "fluxer://417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV"
```

Send a notification using markdown-to-embed formatting:

```bash
# Assuming our {WebhookID} is 417429632418316298
# Assuming our {WebhookToken} is JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
cat << _EOF | apprise -vv \
  "fluxer://417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV?format=markdown"
# Title

- Bullet 1
- Bullet 2
- Bullet 3
_EOF
```

Send an attachment:

```bash
# Assuming our {WebhookID} is 417429632418316298
# Assuming our {WebhookToken} is JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o3dV_js
apprise -vv -b "Here is a file" \
  --attach=/path/to/file.png \
  "fluxer://417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV"
```

Post to a private Fluxer server:

```bash
# Assuming your private server is https://fluxer.example.com
# Assuming our {WebhookID} is 417429632418316298
# Assuming our {WebhookToken} is JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV
apprise -vv -b "Private server test" \
  "fluxer://fluxer.example.com/417429632418316298/JHZ7lQml277CDHmQKMHI8qBe7bk2ZwO5UKjCiOAF7711o33MyqU344Qpgv7YTpadV?mode=private"
```
