---
title: "Stackfield Notifications"
description: "Send notifications to a Stackfield room via incoming webhook."
sidebar:
  label: "Stackfield"

source: https://www.stackfield.com

schemas:
  - stackfield

sample_urls:
  - https://www.stackfield.com/apiwh/{token}
  - stackfield://{token}

has_chat: true

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Stackfield supports incoming webhooks scoped to individual rooms. Each webhook delivers a chat message to one room.

1. Log into your Stackfield account at [stackfield.com](https://www.stackfield.com).
2. Open the **Room** you want to receive Apprise notifications in.
3. Click the room name at the top to open **Room Settings**.
4. Select the **Integrations** tab, then click **Add a new WebHook**.
5. Choose **Chat Message** as the webhook type and click **Create Webhook**.
6. Give the webhook a name (e.g. "Apprise") and click **Save and Generate URL**.
7. Copy the generated URL -- it looks like this:

```text
https://www.stackfield.com/apiwh/e5a1cfbd-970e-45a1-b81c-3e004f9bdab5
                                 |---------- webhook token (UUID) ---------|
```

The UUID at the end of that URL is your **webhook token**.

## Syntax

Valid syntax is as follows:

- `stackfield://{token}`
- `https://www.stackfield.com/apiwh/{token}`

## Parameter Breakdown

| Variable | Required | Description                                                         |
| -------- | -------- | ------------------------------------------------------------------- |
| token    | \*Yes    | The UUID webhook token from your Stackfield room's integration URL. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification using the Apprise URL form:

```bash
# Replace the UUID below with your webhook token
apprise -vv -t "Alert" -b "Server restarted successfully." \
   stackfield://e5a1cfbd-970e-45a1-b81c-3e004f9bdab5
```

Apprise also accepts the native webhook URL directly:

```bash
apprise -vv -t "Alert" -b "Server restarted successfully." \
   "https://www.stackfield.com/apiwh/e5a1cfbd-970e-45a1-b81c-3e004f9bdab5"
```
