---
title: "CM.com Notifications"
description: "Send SMS notifications through CM.com."
sidebar:
  label: "CM.com"

source: https://www.cm.com

schemas:
  - cm

has_sms: true

body_formats:
  - text

sample_urls:
  - cm://{token}/{phone_no}
  - cm://{sender}@{token}/{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 1224
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for a [CM.com account](https://www.cm.com/register/).
2. Open the [Channels app](https://www.cm.com/app/channels) and copy your **Product Token** from the API settings. It looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` and is your `{token}`.

Messages are sent over SMS by default. Other channels, such as WhatsApp or Viber, can be picked with `?channels=` once CM.com has set them up on your account.

:::note
Long messages are sent as one SMS made of up to 8 parts. Messages with characters outside the standard SMS alphabet (such as emoji or Greek letters) fit fewer characters in each part.
:::

:::note
Attachments are not supported because CM.com only accepts media as a link to a file that is already online.
:::

## Syntax

Valid syntax is as follows:

- `cm://{token}/{phone_no}`
- `cm://{token}/{phone_no1}/{phone_no2}/{phone_noN}`
- `cm://{sender}@{token}/{phone_no}`
- `cm://{token}/{phone_no}?channels={channel1},{channel2}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                             |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | Your CM.com Product Token, including its dashes.                                                                                                                                        |
| phone_no | Yes      | The phone number to notify, including the country code. Add as many as you like, separated by a slash.                                                                                  |
| sender   | No       | The sender the message comes from. This can be a name of up to 11 letters and digits, or a phone number of up to 16 digits. It can also be set with `?from=`. The default is `Apprise`. |
| channels | No       | The channels CM.com may use to deliver the message, separated by a comma. Choose from `sms`, `whatsapp`, `viber` and `rcs`. The default is `sms`.                                       |
| batch    | No       | Sends to up to 1000 phone numbers in a single request when set to `yes`. The default is `no`.                                                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to one phone number:

```bash
# Replace 0123abcd-4567-89ef-abcd-0123456789ab with your Product Token
# Replace 15551234567 with the phone number to notify
apprise -vv -b "Backup complete." \
    cm://0123abcd-4567-89ef-abcd-0123456789ab/15551234567
```

Send to two phone numbers from a named sender:

```bash
apprise -vv -t "Alert" -b "Something happened." \
    "cm://Alerts@0123abcd-4567-89ef-abcd-0123456789ab/15551234567/15557654321"
```

Let CM.com deliver over WhatsApp or SMS:

```bash
apprise -vv -b "Server is back online." \
    "cm://0123abcd-4567-89ef-abcd-0123456789ab/15551234567?channels=whatsapp,sms"
```
