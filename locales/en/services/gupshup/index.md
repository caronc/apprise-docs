---
title: "Gupshup Notifications"
description: "Send WhatsApp notifications through Gupshup."
sidebar:
  label: "Gupshup"

source: https://www.gupshup.io

schemas:
  - gupshup

has_chat: true

body_formats:
  - text

sample_urls:
  - gupshup://{app}:{apikey}@{source}/{phone_no}
  - gupshup://{app}:{apikey}@{source}/{phone_no1}/{phone_no2}/{phone_noN}
  - gupshup://{app}:{apikey}@{source}/{phone_no}?template={template_id}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for a [Gupshup account](https://www.gupshup.io/) and sign in to the console.
2. Create a WhatsApp app. The name you give it (for example `DemoAPI`) is your `{app}`.
3. Copy the **API Key** shown in the top right corner of the console. This is your `{apikey}`.
4. Note the WhatsApp Business phone number linked to your app, including the country code. This is your `{source}`. While testing in the sandbox, use Gupshup's sandbox number `917834811114`.

:::note
WhatsApp only delivers a regular message to someone who has messaged your number in the last 24 hours. To reach people outside of that window, create a message template in the Gupshup console, wait for it to be approved, and pass its ID with `?template=`.
:::

:::note
Attachments are not supported. Gupshup's API key interface only accepts files that are already hosted at a public web address.
:::

## Syntax

Valid syntax is as follows:

- `gupshup://{app}:{apikey}@{source}/{phone_no}`
- `gupshup://{app}:{apikey}@{source}/{phone_no1}/{phone_no2}/{phone_noN}`
- `gupshup://{app}:{apikey}@{source}/{phone_no}?template={template_id}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                             |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| app      | Yes      | Your Gupshup app name. It can also be given with `?app=`.                                                               |
| apikey   | Yes      | Your Gupshup API Key. It can also be given with `?key=`.                                                                |
| source   | Yes      | The WhatsApp Business phone number your app sends from, including the country code. It can also be given with `?from=`. |
| phone_no | Yes      | The phone number to notify, including the country code. Add as many as you like, separated by a slash.                  |
| template | No       | The ID of an approved message template to send instead of a regular message.                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Template Variables

Templates contain placeholders such as `{{1}}` and `{{2}}`. Fill them in with the `:` (colon) prefix:

- `:1=some text` puts fixed text into `{{1}}`.
- `:body=2` puts the Apprise message body into `{{2}}`.
- `:type=3` puts the notification type (`info`, `success`, `warning` or `failure`) into `{{3}}`.

When no placeholders are given, the template is sent as-is and the message body is not used.

## Examples

Send a WhatsApp message to one phone number:

```bash
# Replace DemoAPI with your app name
# Replace abcd1234 with your API Key
# Replace 917834811114 with the number your app sends from
# Replace 15551234567 with the phone number to notify
apprise -vv -b "Backup complete." \
    gupshup://DemoAPI:abcd1234@917834811114/15551234567
```

Send a WhatsApp message to two phone numbers:

```bash
apprise -vv -t "Alert" -b "Something happened." \
    gupshup://DemoAPI:abcd1234@917834811114/15551234567/15557654321
```

Send an approved template, placing the message body into `{{1}}`:

```bash
apprise -vv -b "Disk is full." \
    "gupshup://DemoAPI:abcd1234@917834811114/15551234567?template=c6aecef6-bcb0-4fb1-8100-28c094e3bc6b&:body=1"
```
