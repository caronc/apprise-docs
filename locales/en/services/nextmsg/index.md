---
title: "NextMsg Notifications"
description: "Send push notifications to your iPhone or Android phone with NextMsg."
sidebar:
  label: "NextMsg"

source: https://nextmsg.app

schemas:
  - nextmsg

has_image: false

body_formats:
  - markdown

sample_urls:
  - nextmsg://{key}
  - nextmsg://{key}/{channel}

limits:
  - name: "Body"
    max_chars: 640
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

NextMsg is a one-way push notification app for iPhone and Android. There is no account to create.

1. Install NextMsg from the [App Store](https://apps.apple.com/app/nextmsg-push-notifications/id6831546010) or [Google Play](https://play.google.com/store/apps/details?id=app.nextmsg).
1. Open **Settings** in the app and copy your send key. It starts with `nextmsg_live_`.

You can also give Apprise a key of its own, which you can revoke in the app without changing anything else: open **Settings** -> **Agents** -> **Connect agent** and claim the code it shows as described in the [NextMsg docs](https://nextmsg.app/docs#agent-keys). These keys start with `nextmsg_agent_`.

## Syntax

Valid syntax is as follows:

- `nextmsg://{key}`
- `nextmsg://{key}/{channel}`

You can also paste the URL from the `curl` example in the app straight into Apprise:

- `https://api.nextmsg.app/p/{key}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| key      | Yes      | Your send key (`nextmsg_live_...`) or an agent key (`nextmsg_agent_...`).                                                                  |
| channel  | No       | The channel the message is filed under; each channel gets its own tab in the app. Use 1 to 32 characters: `a-z`, `0-9`, `-` and `_`. The default is `general`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

A title is shown in bold on the first line of the message. Messages can use `**bold**`, `*italic*`, `~~strikethrough~~` and `` `code` ``, and are at most 640 characters, title included. The free plan includes 100 messages a month.

## Examples

Send a NextMsg notification:

```bash
# Assuming our {key} is nextmsg_live_0123456789abcdef0123456789abcdef0123456789abcdef
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   nextmsg://nextmsg_live_0123456789abcdef0123456789abcdef0123456789abcdef
```

Send to the `backups` channel:

```bash
apprise -vv -t "Backup Failed" -b "The nightly backup did not finish" \
   nextmsg://nextmsg_live_0123456789abcdef0123456789abcdef0123456789abcdef/backups
```
