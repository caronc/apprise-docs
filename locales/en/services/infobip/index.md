---
title: "Infobip Notifications"
description: "Send SMS notifications through Infobip."
sidebar:
  label: "Infobip"

source: https://www.infobip.com

schemas:
  - infobip

has_sms: true

body_formats:
  - text

sample_urls:
  - infobip://{apikey}@{base_url}/{phone_no}
  - infobip://{apikey}@{base_url}/{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for an [Infobip account](https://www.infobip.com/signup).
2. Open the [API Keys](https://portal.infobip.com/dev/api-keys) page and create an API key with the `sms:message:send` scope. This is your `{apikey}`.
3. Find your personal **Base URL**. It is shown at the top of the [Infobip API documentation](https://www.infobip.com/docs/api) once you are signed in, and looks like `xxxxxx.api.infobip.com`.

You only need the first part of the Base URL (the `xxxxxx` part). Apprise adds `.api.infobip.com` for you. The full Base URL works too.

:::note
Free trial accounts can only send to phone numbers that were verified in your Infobip account.
:::

:::note
Attachments are not supported because SMS messages cannot carry files.
:::

## Syntax

Valid syntax is as follows:

- `infobip://{apikey}@{base_url}/{phone_no}`
- `infobip://{apikey}@{base_url}/{phone_no1}/{phone_no2}/{phone_noN}`
- `infobip://{apikey}@{base_url}/{phone_no}?from={sender}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                            |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Yes      | Your Infobip API key. It needs the `sms:message:send` scope.                                                                                           |
| base_url | Yes      | Your personal Infobip Base URL. Either the first part (`xxxxxx`) or the full `xxxxxx.api.infobip.com` can be given.                                    |
| phone_no | Yes      | The phone number to notify, including the country code. Add as many as you like, separated by a slash.                                                 |
| from     | No       | The sender the message comes from. This can be a phone number or a name your account is allowed to use. When it is not set, Infobip picks one for you. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to one phone number:

```bash
# Replace abcd1234 with your API key
# Replace xyz123 with the first part of your Base URL
# Replace 15551234567 with the phone number to notify
apprise -vv -b "Backup complete." \
    infobip://abcd1234@xyz123/15551234567
```

Send an SMS to two phone numbers from a named sender:

```bash
apprise -vv -t "Alert" -b "Something happened." \
    "infobip://abcd1234@xyz123/15551234567/15557654321?from=Alerts"
```
