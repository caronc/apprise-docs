---
title: "Clickatell Notifications"
description: "Send Clickatell notifications."
sidebar:
  label: "Clickatell"

source: https://www.clickatell.com/

schemas:
  - clickatell

has_sms: true

sample_urls:
  - clickatell://{source}@{apikey}/{PhoneNo}
  - clickatell://{source}@{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}
  - clickatell://{apikey}/{PhoneNo}
  - clickatell://{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign up for BulkSMS account [from here](https://www.clickatell.com/). You will be provided to create a user and password to associate with your account. From here you can generate an apikey; this is all you need to use this through Apprise.

## Syntax

Valid syntax is as follows:

- `clickatell://{source}@{apikey}/{PhoneNo}`
- `clickatell://{source}@{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `clickatell://{apikey}/{PhoneNo}`
- `clickatell://{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Parameter Breakdown

| Variable | Required | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| apikey   | **Yes**  | The API Key you generated as part of your Clickatell account |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification to your Clickatell account:

```bash
# Assuming our {apikey} is token
# Assuming our {PhoneNo} is 1-800-555-1234
apprise -vv --body="Test Message" \
   "clickatell://token/1-800-555-1234"
```
