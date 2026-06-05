---
title: "Zoom Team Chat Notifications"
description: "Send notifications to Zoom Team Chat channels via Incoming Webhooks."
sidebar:
  label: "Zoom"

source: https://zoom.us

schemas:
  - zoom

has_chat: true

sample_urls:
  - https://inbots.zoom.us/incoming/hook/{webhook_id}?token={token}
  - zoom://{webhook_id}/{token}/
  - zoom://{webhook_id}/{token}/?mode=simple

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Zoom Team Chat notifications are delivered through the **Incoming Webhook** app available on the Zoom Marketplace. The app posts messages into a channel of your choice.

1. Sign in to [https://marketplace.zoom.us](https://marketplace.zoom.us) and search for **Incoming Webhook**.
2. Click **Add** to install the app to your Zoom account.
3. Open Zoom Team Chat and navigate to the channel you want to receive notifications.
4. In the message input box, type the slash command:

   ```text
   /inc connect
   ```

   Follow the on-screen prompts. When complete, Zoom provides two values:
   - **Endpoint URL** — for example:

     ```text
     https://inbots.zoom.us/incoming/hook/AbCdEfGhIjKl
     ```

   - **Verification Token** — a short alphanumeric string used to authenticate requests.

5. The Webhook ID is the final path segment of the endpoint URL (`AbCdEfGhIjKl` in the example above).

Assemble your Apprise URL using both values:

```text
zoom://{webhook_id}/{token}
```

:::note
Zoom incoming webhooks do not support file attachments or Markdown formatting. All messages are delivered as plain text or with simple structured heading/body layout.
:::

## Syntax

Valid syntax is as follows:

- `zoom://{webhook_id}/{token}/`
- `zoom://{webhook_id}/{token}/?mode=full`
- `zoom://{webhook_id}/{token}/?mode=simple`
- `https://inbots.zoom.us/incoming/hook/{webhook_id}?token={token}`

**Full mode** (default) sends a structured message. When a notification title is provided it appears as a heading above the message body. This uses Zoom's `?format=full` API parameter.

**Simple mode** sends the message as a plain-text string. If a title is provided it is prepended to the body separated by a colon.

## Parameter Breakdown

| Variable   | Required | Description                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------------- |
| webhook_id | \*Yes    | The Webhook ID from the Zoom endpoint URL (the path segment after `/hook/`).           |
| token      | \*Yes    | The Verification Token provided by Zoom when the webhook was created.                  |
| mode       | No       | Notification mode: `full` (default, structured with heading) or `simple` (plain text). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification using the default full mode:

```bash
# Replace AbCdEfGhIjKl with your Webhook ID
# Replace VerToken123 with your Verification Token
apprise -vv -t "Alert Title" -b "Something happened." \
    zoom://AbCdEfGhIjKl/VerToken123/
```

Send a plain-text notification using simple mode:

```bash
apprise -vv -t "Info" -b "Deployment complete." \
    "zoom://AbCdEfGhIjKl/VerToken123/?mode=simple"
```

Use the native endpoint URL with the token appended as a query parameter:

```bash
apprise -vv -b "Webhook test." \
    "https://inbots.zoom.us/incoming/hook/AbCdEfGhIjKl?token=VerToken123"
```
