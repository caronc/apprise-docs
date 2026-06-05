---
title: "Webex Teams Notifications"
description: "Send Webex Teams notifications with optional file attachments."
sidebar:
  label: "Webex Teams"

source: https://teams.webex.com

schemas:
  - wxteams
  - webex

has_chat: true
has_attachments: true

sample_urls:
  - https://api.ciscospark.com/v1/webhooks/incoming/{token}
  - https://webexapis.com/v1/webhooks/incoming/{token}
  - wxteams://{token}/
  - webex://{token}/
  - wxteams://{bot_token}/{room_id}/

limits:
  - name: "Webhook"
    max_chars: 1000
  - name: "Bot API"
    max_chars: 7439
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Webex Teams notifications can be sent in two modes: **Webhook** (simple,
no attachments) and **Bot** (full API access with file attachment support).
The mode is auto-detected from the token format, or you can force it with
the `mode=` URL parameter.

### Mode 1 — Webhook (default)

To use webhook mode, first access [https://teams.webex.com](https://teams.webex.com) and create an
account if you don't already have one. You'll want to create at least one
'space' before getting the 'incoming webhook'.

Next, install the 'Incoming webhook' integration found under the 'other'
category at [https://apphub.webex.com/integrations/](https://apphub.webex.com/integrations/). At the time of writing,
[this was a direct link to it](https://apphub.webex.com/applications/incoming-webhooks-cisco-systems-38054-23307-75252).

If you're logged in, click on the 'Connect' button, accept the permissions,
and give the webhook a name such as 'apprise'.

When you're complete, you will receive a URL that looks something like this:

```text
https://api.ciscospark.com/v1/webhooks/incoming/\
       Y3lzY29zcGkyazovL3VzL1dFQkhPT0sajkkzYWU4fTMtMGE4Yy00
```

![image](./images/218330896-ea8715df-0e7d-4584-a803-aa23add9bd15.png)

The last part of the URL is your `{token}`:

- `https://api.ciscospark.com/v1/webhooks/incoming/{token}`

**Note:** Apprise supports this URL _as-is_ (_as of v0.7.7_).

> **Limitation:** Incoming webhooks do **not** support file attachments.
> Use Bot mode (below) if you need to send files.

### Mode 2 — Bot (API token + Room ID, supports attachments)

1. Visit [https://developer.webex.com/my-apps](https://developer.webex.com/my-apps) and create a new **Bot**.
2. After creating the bot, copy the **Bot Access Token** shown on the
   confirmation page (it is only shown once).
3. Invite the bot to the space/room you want it to post to.
4. Retrieve the **Room ID** for that space. You can list rooms via the
   [Rooms API](https://developer.webex.com/docs/api/v1/rooms/list-rooms).
   The Room ID is a long base64url string such as
   `Y2lzY29zcGFyazovL3VzL1JPTU9NLzEyMzQ1`.

Assemble your Apprise URL as:

```text
wxteams://{bot_token}/{room_id}
```

## Syntax

Valid syntax is as follows:

### Webhook Mode

- `https://api.ciscospark.com/v1/webhooks/incoming/{token}`
- `https://webexapis.com/v1/webhooks/incoming/{token}`
- `wxteams://{token}/`
- `webex://{token}/`

### Bot Mode

- `wxteams://{bot_token}/{room_id}/`
- `wxteams://{bot_token}/{room_id1}/{room_id2}/`

You can force a mode explicitly by appending `?mode=webhook` or `?mode=bot`.
If omitted, the mode is auto-detected from the token format:

- A token of 80–160 alphanumeric characters is treated as a **webhook** token.
- Any other token (longer, or containing non-alphanumeric characters) is
  treated as a **bot** access token and requires at least one Room ID.

## Parameter Breakdown

| Variable | Required | Description                                                     |
| -------- | -------- | --------------------------------------------------------------- |
| token    | Yes      | Webhook token _or_ Bot access token (auto-detected by format)   |
| room_id  | Bot only | Room ID of the Webex space to post to (may repeat for multiple) |
| mode     | No       | Force `webhook` or `bot` mode (auto-detected if omitted)        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Webex Teams notification via webhook:

```bash
# Assuming our {token} is T1JJ3T3L2DEFK543
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   wxteams://T1JJ3T3L2DEFK543/
```

Send a notification via Bot API to a specific room:

```bash
# bot_token and room_id are placeholders for your actual values
apprise -vv -b "Hello from Apprise Bot" \
   wxteams://NThhZjI0NzQtMGQx.../Y2lzY29zcGFyazovL3Vz.../
```

Send a notification with a file attachment (Bot mode required):

```bash
apprise -vv -b "See attached report" \
   --attach /path/to/report.pdf \
   wxteams://NThhZjI0NzQtMGQx.../Y2lzY29zcGFyazovL3Vz.../
```

Post to multiple rooms from one Bot token:

```bash
apprise -vv -b "Broadcast message" \
   wxteams://{bot_token}/{room_id1}/{room_id2}/
```
