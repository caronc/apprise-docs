---
title: "Whapi.Cloud Notifications"
description: "Send WhatsApp notifications from your own number through Whapi.Cloud."
sidebar:
  label: "Whapi.Cloud"

source: https://whapi.cloud

schemas:
  - whapi

has_attachments: true
has_chat: true

body_formats:
  - markdown

sample_urls:
  - whapi://{token}/{phone_no}
  - whapi://{token}/{phone_no1}/{group_id}/{phone_noN}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::note
Whapi.Cloud sends messages from your own WhatsApp number by linking it the same way WhatsApp Web does. It can reach groups and needs no Meta business verification or message templates. If you would rather use Meta's official WhatsApp Business service, see [WhatsApp](../whatsapp/). If you would rather host the same kind of link yourself, see [Evolution API](../evolution/).
:::

## Account Setup

1. Sign up at [Whapi.Cloud](https://panel.whapi.cloud/) and open (or create) a **Channel**.
2. On your phone, open WhatsApp and go to **Settings** > **Linked Devices** > **Link a Device**, then scan the QR code shown on the Channel page.
3. Copy the **API Token** shown on the Channel page. This is your `{token}`.

To send to a group, you need its ID. You can find it with the **Get groups** call in the [Whapi.Cloud API reference](https://whapi.readme.io/reference/getgroups). It looks like `120363042829563251@g.us`.

## Syntax

Valid syntax is as follows:

- `whapi://{token}/{phone_no}`
- `whapi://{token}/{group_id}`
- `whapi://{token}/{phone_no1}/{group_id}/{phone_noN}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | Your Whapi.Cloud Channel API Token. It can also be given with `?token=`.                                                                                                                          |
| phone_no | No       | A phone number to notify, including the country code.                                                                                                                                             |
| group_id | No       | A group to notify. Give the number alone (`120363042829563251`) or the full ID (`120363042829563251@g.us`). Any other chat ID, such as a WhatsApp Channel ending in `@newsletter`, is sent as-is. |
| preview  | No       | Set to `no` to stop WhatsApp from showing a preview of the first link in the message. The default is `yes`.                                                                                       |

At least one phone number or group must be given. Add as many as you like, separated by a slash.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a WhatsApp message to one phone number:

```bash
# Replace abcd1234 with your API Token
# Replace 15551234567 with the phone number to notify
apprise -vv -t "Alert" -b "Backup complete." \
    whapi://abcd1234/15551234567
```

Send a WhatsApp message to a phone number and a group, with an attachment:

```bash
apprise -vv -b "Here is today's report." \
    --attach=/path/to/report.pdf \
    whapi://abcd1234/15551234567/120363042829563251
```

Send a WhatsApp message without a link preview:

```bash
apprise -vv -b "Status page: https://example.com/status" \
    "whapi://abcd1234/15551234567?preview=no"
```
