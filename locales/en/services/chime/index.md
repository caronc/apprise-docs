---
title: "Amazon Chime Notifications"
description: "Send notifications to Amazon Chime chat rooms via incoming webhooks."
sidebar:
  label: "Amazon Chime"

source: https://aws.amazon.com/chime/

schemas:
  - chime

sample_urls:
  - chime://{WebhookID}/{Token}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use this plugin you need an existing [Amazon Chime](https://aws.amazon.com/chime/) account and a chat room that you administer. Incoming webhooks are configured per chat room.

1. Open Amazon Chime in your browser and navigate to the chat room you want to receive notifications.
2. Choose the gear icon in the top-right corner of the chat room panel.
3. Choose **Manage webhooks and bots**.
4. Choose **Add webhook**, give it a recognizable name (such as `Apprise`), then choose **Create**.
5. Choose **Copy URL** next to your new webhook in the list.

The copied URL will look similar to:

```text
https://hooks.chime.aws/incomingwebhooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?token=AaBbCcDd%3D%3D
```

The portion after `/incomingwebhooks/` and before the `?` is your **Webhook ID**. The value of the `token=` query parameter (URL-decoded) is your **Token**.

:::note
Incoming webhooks are only available to chat room administrators. If the option is not visible, ask your room administrator.
:::

## Syntax

Valid syntax is as follows:

- `chime://{WebhookID}/{Token}`

You can also pass the Chime webhook URL directly — Apprise will parse it automatically:

- `https://hooks.chime.aws/incomingwebhooks/{WebhookID}?token={Token}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                   |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| WebhookID | \*Yes    | The Webhook ID found in the path of your Chime webhook URL (the UUID-like segment after `/incomingwebhooks/`) |
| Token     | \*Yes    | The authentication token from the `?token=` query parameter of your Chime webhook URL                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to an Amazon Chime chat room:

```bash
# Assuming your Webhook ID is xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
# Assuming your Token is AaBbCcDd== (URL-decoded form)
apprise -vv -t "Alert" -b "Something happened." \
   "chime://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/AaBbCcDd%3D%3D"
```

You can also paste the native Chime URL directly:

```bash
apprise -vv -b "Something happened." \
   "https://hooks.chime.aws/incomingwebhooks/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx?token=AaBbCcDd%3D%3D"
```

Example YAML configuration:

```yaml
urls:
  - chime://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/AaBbCcDd%3D%3D
```
