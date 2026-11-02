---
title: "Facebook Messenger Notifications"
description: "Send Facebook Messenger messages from your Facebook Page."
sidebar:
  label: "Facebook Messenger"

source: https://developers.facebook.com/docs/messenger-platform/

schemas:
  - messenger

has_attachments: true
has_chat: true

body_formats:
  - text

sample_urls:
  - messenger://{token}/{user_id}
  - messenger://{token}/{user_id1}/{user_id2}
  - messenger://{token}/{user_id}?template={template}

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::caution
Facebook only lets a Page message people who messaged it first. A regular message is only accepted within **24 hours** of the person's last message to your Page. To reach someone after that, use a [Utility template](#sending-after-24-hours).
:::

## Account Setup

Apprise sends Messenger messages from a Facebook **Page**, not from a personal profile.

1. Create a Facebook Page to send your notifications from, or use one you already manage.
2. Visit the [Meta for Developers](https://developers.facebook.com/apps) portal, create a new app of type **Business**, and add the **Messenger** product to it.
3. Open **Messenger** > **Messenger API Settings**, connect your Page, and click **Generate token**. Copy the Page access token.
4. Have each person you want to notify send your Page a message. Then find their user ID (see below).

If your app is still in **Development** mode, each person you message must have a role on the app (for example, Tester) under **App roles**.

### Finding a user ID

Facebook identifies each person by a numeric user ID that is only valid for your Page. Once someone has messaged your Page, list its conversations to find it:

```bash
curl "https://graph.facebook.com/v26.0/me/conversations?fields=participants&access_token={token}"
```

Each conversation lists its participants with their `name` and `id`. Use the `id` of the person you want to notify.

### Sending after 24 hours

A Utility template is a short, pre-approved message with a `{{1}}` placeholder. Apprise fills in `{{1}}` with your notification, and Facebook delivers it even when the 24 hour window has closed.

Your app needs the `page_utility_messaging` permission. Create the template once with:

```bash
curl -X POST "https://graph.facebook.com/v26.0/me/message_templates" \
   -H "Authorization: Bearer {token}" \
   -H "Content-Type: application/json" \
   -d '{"name": "apprise_alert", "language": "en", "category": "UTILITY",
        "components": [{"type": "BODY",
          "text": "You have a new alert: {{1}}. This message was sent automatically.",
          "example": {"body_text": [["Server is down"]]}}]}'
```

Facebook usually approves it within seconds. Then add `?template=apprise_alert` to your Apprise URL. Templates can't be used for advertising, and attachments are still sent as regular messages.

## Syntax

Valid syntax is as follows:

- `messenger://{token}/{user_id}`
- `messenger://{token}/{user_id1}/{user_id2}/{user_idN}`
- `messenger://{token}/{user_id}?template={template}`
- `messenger://{token}/{user_id}?template={template}&lang={language}`

## Parameter Breakdown

| Variable | Required | Description                                                                                   |
| -------- | -------- | --------------------------------------------------------------------------------------------- |
| token    | Yes      | The Page access token generated for your Facebook Page.                                       |
| user_id  | Yes      | The numeric user ID of a person to message. You can list as many as you like.                 |
| to       | No       | Another way to list user IDs, separated by commas.                                            |
| template | No       | The name of an approved Utility template. Your notification fills in its `{{1}}` placeholder. |
| lang     | No       | The language code the template was created with. The default is `en`.                         |

Images, audio, video and other files (up to 25 MB) can be attached. Each one arrives as its own message.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to one person:

```bash
# Assuming our {token} is EAAabc123
# Assuming the {user_id} to notify is 1234567890123456
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "messenger://EAAabc123/1234567890123456"
```

Send a picture to two people:

```bash
apprise -vv -b "Today's graph" --attach=graph.png \
   "messenger://EAAabc123/1234567890123456/6543210987654321"
```

Send through a Utility template so it arrives even after 24 hours:

```bash
apprise -vv -b "Server is down" \
   "messenger://EAAabc123/1234567890123456?template=apprise_alert"
```
