---
title: "800.com Notifications"
description: "Send SMS and MMS notifications via 800.com."
sidebar:
  label: "800.com"

source: https://www.800.com/

schemas:
  - eight00com

has_sms: true
has_attachments: true

keywords: "800.com"

sample_urls:
  - eight00com://{token}@{fromPhoneNo}
  - eight00com://{token}@{fromPhoneNo}/{toPhoneNo}

limits:
  max_chars: 600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign in to your [800.com](https://www.800.com) account or create one.
2. Click your avatar (top-right) and choose **Settings**.
3. Scroll to the **API** section and click **Generate Token**.
4. Copy the token immediately -- it is only displayed once.

Your text-enabled 800.com number is the `{fromPhoneNo}` used in the Apprise URL.

## Syntax

Valid syntax is as follows:

- `eight00com://{token}@{fromPhoneNo}`
- `eight00com://{token}@{fromPhoneNo}/{toPhoneNo}`
- `eight00com://{token}@{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                     |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token       | \*Yes    | Your 800.com Personal Access Token.                                                                                                                             |
| fromPhoneNo | \*Yes    | Your text-enabled 800.com phone number.                                                                                                                         |
| toPhoneNo   | No       | The recipient phone number(s). When omitted, the message is sent to the `fromPhoneNo`. Separate multiple numbers with `/` in the URL or use `?to=` with commas. |
| to          | No       | Alias for `toPhoneNo`. Accepts comma-separated numbers.                                                                                                         |
| from        | No       | Alternative way to supply the sender number as a query parameter.                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS from your 800.com number:

```bash
# Assuming your token is abc123, your 800.com number is +1-800-555-1234,
# and the recipient is +1-555-987-6543
apprise -vv -t "Test Title" -b "Test Message Body" \
   eight00com://abc123@8005551234/5559876543
```

Send an MMS with an image attachment:

```bash
apprise -vv -t "Test Title" -b "Test Message Body" \
   --attach /path/to/image.jpg \
   eight00com://abc123@8005551234/5559876543
```

Send to multiple recipients:

```bash
apprise -vv -t "Test Title" -b "Test Message Body" \
   eight00com://abc123@8005551234/5559876543/4441234567
```
