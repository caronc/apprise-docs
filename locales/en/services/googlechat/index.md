---
title: "Google Chat Notifications"
description: "Send Google Chat notifications."
sidebar:
  label: "Google Chat"

source: https://chat.google.com/

schemas:
  - gchat

sample_urls:
  - https://chat.googleapis.com/v1/spaces/{workspace}/messages?key={webhook_key}&token={webhook_token}
  - gchat://{workspace}/{webhook_key}/{webhook_token}

limits:
  max_chars: 4000
---

<!-- SERVICE:DETAILS -->

## Account Setup

For this to work correctly you a GSuite account (there are free trials if you don't have one). You then need to create a Webhook; they can be done as follows:

1. [Open Google Chat in your browser](https://chat.google.com/)
1. Go to the room to which you want to add a bot.
1. From the room menu at the top of the page, select **Manage webhooks**.
1. Provide it a name and optional avatar and click **SAVE**
1. Copy the URL associated with your new webhook.
1. Click outside the dialog box to close.

When you've completed, you'll get a URL that looks a little like this:

```text
https://chat.googleapis.com/v1/spaces/AAAAkM/messages?key=AIzaSSjMm-WEfqKqqsHI&token=O7bnyri_WEXKcyFk%3D
                                      ^    ^              ^                  ^       ^                 ^
                                      |    |              |                  |       |                 |
                                     workspace             ... webhook_key...         ..webhook_token..
```

Simplified, it looks like this:

- `https://chat.googleapis.com/v1/spaces/WORKSPACE/messages?key=WEBHOOK_KEY&token=WEBHOOK_TOKEN`

Now it's important to note that while this Apprise plugin uses `gchat://`, you can also just use this URL exactly the way it was provided to you from Google when you copied and pasted. This is a perfectly valid Google Chat Apprise URL as well.

## Syntax

Valid syntax is as follows:

- `https://chat.googleapis.com/v1/spaces/{workspace}/messages?key={webhook_key}&token={webhook_token}`
- `gchat://{workspace}/{webhook_key}/{webhook_token}`

## Parameter Breakdown

| Variable      | Required | Description                                                                            |
| ------------- | -------- | -------------------------------------------------------------------------------------- |
| workspace     | Yes      | The workspace associated with your Google Chat account.                                |
| webhook_key   | Yes      | The webhook key associated with your Google Chat account.                              |
| webhook_token | Yes      | The webhook token associated with your Google Chat account.                            |
| thread        | No       | You can optionally specify a `ThreadKey` on the URL to focus its notifications there. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Google Chat notification

```bash
# Assuming our {workspace} is AAAAkM
# Assuming our {webhook_key} is AIzaSSjMm-WEfqKqqsHI
# Assuming our {webhook_token} is O7bnyri_WEXKcyFk%3D

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   gchat://AAAAkM/AIzaSSjMm-WEfqKqqsHI/O7bnyri_WEXKcyFk%3D
```

Remember, you can also just use the URL as it was provided to you when configuring your Webhook:
Send a Google Chat notification

```bash
# Assuming our {workspace} is AAAAkM
# Assuming our {webhook_key} is AIzaSSjMm-WEfqKqqsHI
# Assuming our {webhook_token} is O7bnyri_WEXKcyFk%3D

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   https://chat.googleapis.com/v1/spaces/AAAAkM/messages?key=AIzaSSjMm-WEfqKqqsHI&token=O7bnyri_WEXKcyFk%3D
```

Want to target a specific threadKey? Just do the following:

```bash
# Assuming our {workspace} is AAAAkM
# Assuming our {webhook_key} is AIzaSSjMm-WEfqKqqsHI
# Assuming our {webhook_token} is O7bnyri_WEXKcyFk%3D
# Assuming our {threadkey} is ABC

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   gchat://AAAAkM/AIzaSSjMm-WEfqKqqsHI/O7bnyri_WEXKcyFk%3D/?thread=ABC
```
