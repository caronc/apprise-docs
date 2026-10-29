---
title: "Telesign Notifications"
description: "Send SMS notifications through Telesign."
sidebar:
  label: "Telesign"

source: https://www.telesign.com

schemas:
  - telesign

has_sms: true

body_formats:
  - text

sample_urls:
  - telesign://{customer_id}:{apikey}@{phone_no}
  - telesign://{customer_id}:{apikey}@{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 1600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for a [Telesign account](https://www.telesign.com/).
2. Sign in to the [Telesign Portal](https://portal.telesign.com/).
3. Copy your **Customer ID** and **API Key** from the dashboard. These are your `{customer_id}` and `{apikey}`.

Telesign API keys often contain a slash (`/`), a plus (`+`) or an equals sign (`=`). Write these as `%2F`, `%2B` and `%3D` in the URL, or pass the key with `?key=` instead.

:::note
Trial accounts can only send to phone numbers that were verified in your Telesign account.
:::

:::note
Attachments are not supported because the Telesign SMS API only carries text.
:::

## Syntax

Valid syntax is as follows:

- `telesign://{customer_id}:{apikey}@{phone_no}`
- `telesign://{customer_id}:{apikey}@{phone_no1}/{phone_no2}/{phone_noN}`
- `telesign://{customer_id}:{apikey}@{phone_no}?from={sender}`
- `telesign://{customer_id}:{apikey}@{phone_no}?type={type}`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                         |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| customer_id | Yes      | Your Telesign Customer ID.                                                                                                                          |
| apikey      | Yes      | Your Telesign API Key. It can also be given with `?key=`.                                                                                           |
| phone_no    | Yes      | The phone number to notify, including the country code. Add as many as you like, separated by a slash.                                              |
| from        | No       | The Sender ID the message comes from, up to 20 letters and digits. Telesign must enable it on your account first.                                   |
| type        | No       | The kind of message being sent: `arn` (alerts, reminders and notifications), `otp` (one-time passwords) or `mkt` (marketing). The default is `arn`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to one phone number:

```bash
# Replace FFFFFFFF-EEEE-DDDD-1234-AB1234567890 with your Customer ID
# Replace abcd1234 with your API Key
# Replace 15551234567 with the phone number to notify
apprise -vv -b "Backup complete." \
    telesign://FFFFFFFF-EEEE-DDDD-1234-AB1234567890:abcd1234@15551234567
```

Send an SMS to two phone numbers from a Sender ID:

```bash
apprise -vv -t "Alert" -b "Something happened." \
    "telesign://FFFFFFFF-EEEE-DDDD-1234-AB1234567890:abcd1234@15551234567/15557654321?from=Alerts"
```

Pass an API Key that contains a slash with `?key=`:

```bash
apprise -vv -b "Backup complete." \
    "telesign://FFFFFFFF-EEEE-DDDD-1234-AB1234567890@15551234567?key=abc%2Fdef%3D%3D"
```
