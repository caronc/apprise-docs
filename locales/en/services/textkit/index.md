---
title: "TextKit Notifications"
description: "Send SMS notifications through the TextKit API."
sidebar:
  label: "TextKit"

source: https://jointextkit.com/

schemas:
  - textkit

has_sms: true

sample_urls:
  - textkit://{apikey}/{to_phone}
  - textkit://{apikey}/{to_phone1}/{to_phone2}/{to_phone3}
  - textkit://{apikey}/{to_phone}?from={from_phone}

limits:
  max_chars: 1600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Create an account and an API key in the [TextKit console](https://jointextkit.com/console). Keys start with `tk_sk_`.

A test key (`tk_sk_test_`) simulates each send, so nothing reaches a phone. Live keys are enabled after a short live-access review.

## Syntax

Valid syntax is as follows:

- `textkit://{apikey}/{to_phone}`
- `textkit://{apikey}/{to_phone1}/{to_phone2}/{to_phone3}`
- `textkit://{apikey}/{to_phone}?from={from_phone}`

Each `{to_phone}` is sent its own copy of the message.

## Parameter Breakdown

| Variable | Required | Description                                                                                                               |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | The API key you created in the TextKit console.                                                                           |
| to_phone | Yes      | One or more phone numbers to notify, including the country code.                                                          |
| from     | No       | The number to send from, or a sender pool id (`pool_...`). You can leave it out when your account has exactly one number. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a TextKit notification:

```bash
# Assuming our {apikey} is tk_sk_abc123
# Assuming we want to notify +15551232000
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   textkit://tk_sk_abc123/15551232000
```

Send to two people from a chosen number:

```bash
# Assuming our sending number is +15005550100
apprise -vv -b "The nightly backup did not finish." \
   "textkit://tk_sk_abc123/15551232000/15551232001?from=15005550100"
```
