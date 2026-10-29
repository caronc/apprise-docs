---
title: "Kaleyra Notifications"
description: "Send SMS notifications through Kaleyra."
sidebar:
  label: "Kaleyra"

source: https://www.kaleyra.com

schemas:
  - kaleyra
  - klr

has_sms: true

body_formats:
  - text

sample_urls:
  - kaleyra://{sid}:{apikey}@{sender}/{phone_no}
  - kaleyra://{sid}:{apikey}@{sender}/{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for a [Kaleyra.io account](https://www.kaleyra.io/).
2. Sign in and open the **Developers** section.
3. Copy your **Account SID** (it looks like `HXAP16XXXXXX97IN`) and create an **API Key**. These are your `{sid}` and `{apikey}`.
4. Note the **Sender ID** Kaleyra approved for your account (for example `KLRHXA`). This is your `{sender}`. For two-way SMS, use the phone number you bought from Kaleyra instead.

Kaleyra keeps each account in one region. Apprise uses the Singapore servers by default. If your account lives in India or Europe, add `?region=in` or `?region=eu`.

:::note
Indian accounts must send with a registered DLT template. Add its ID with `?template=` and make sure your message matches the template text.
:::

:::note
Attachments are not supported because the Kaleyra SMS API only carries text.
:::

## Syntax

Valid syntax is as follows:

- `kaleyra://{sid}:{apikey}@{sender}/{phone_no}`
- `kaleyra://{sid}:{apikey}@{sender}/{phone_no1}/{phone_no2}/{phone_noN}`
- `kaleyra://{sid}:{apikey}@{sender}/{phone_no}?region={region}`
- `kaleyra://{sid}:{apikey}@{sender}/{phone_no}?region=in&template={template_id}`

You can shorten `kaleyra://` to `klr://`.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                               |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | Yes      | Your Kaleyra Account SID. It can also be given with `?sid=`.                                                                                                                                              |
| apikey   | Yes      | Your Kaleyra API Key. It can also be given with `?key=`.                                                                                                                                                  |
| sender   | Yes      | The Sender ID (or two-way phone number) the message comes from. It can also be given with `?from=`.                                                                                                       |
| phone_no | Yes      | The phone number to notify, including the country code. Add as many as you like, separated by a slash.                                                                                                    |
| region   | No       | Where your Kaleyra account lives: `sg` (Singapore), `in` (India) or `eu` (Europe). The default is `sg`.                                                                                                   |
| type     | No       | The route type to send on: `default`, `txn` (transactional), `txnd`, `mkt` (marketing) or `otp` (one-time passwords). Indian accounts use `txn`, `txnd`, `mkt` or `otp`. When not set, Kaleyra picks one. |
| template | No       | The ID of a registered DLT template. This is required for Indian accounts.                                                                                                                                |
| flash    | No       | Set to `yes` to send a flash SMS, which pops up on the screen without being saved. The default is `no`.                                                                                                   |
| batch    | No       | Set to `yes` to send to up to 100 phone numbers in a single request. The default is `no`.                                                                                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to one phone number:

```bash
# Replace HXAP16XXXXXX97IN with your Account SID
# Replace abcd1234 with your API Key
# Replace KLRHXA with your Sender ID
# Replace 15551234567 with the phone number to notify
apprise -vv -b "Backup complete." \
    kaleyra://HXAP16XXXXXX97IN:abcd1234@KLRHXA/15551234567
```

Send an SMS to two phone numbers in one request:

```bash
apprise -vv -t "Alert" -b "Something happened." \
    "klr://HXAP16XXXXXX97IN:abcd1234@KLRHXA/15551234567/15557654321?batch=yes"
```

Send from an Indian account with a DLT template:

```bash
apprise -vv -b "Your backup completed successfully." \
    "kaleyra://HXAP16XXXXXX97IN:abcd1234@KLRHXA/919876543210?region=in&type=txn&template=1107160000000000000"
```
