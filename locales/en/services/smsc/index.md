---
title: "SMSC Notifications"
description: "Send SMS and MMS notifications via SMSC (smsc.ru)."
sidebar:
  label: "SMSC"

source: https://smsc.ru/

schemas:
  - smsc: insecure

has_sms: true
has_attachments: true

keywords: "smsc.ru, smsc.kz"

sample_urls:
  - smsc://{login}:{password}@{toPhoneNo}
  - smsc://{login}:{password}@{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for an account at [smsc.ru](https://smsc.ru/) (also available as [smsc.kz](https://smsc.kz/)).
2. Fund your account -- all API calls consume credits.
3. Your **login** and **password** are the same credentials you use to log in to the SMSC web portal.

No additional API key or application registration is required.

:::note
When one or more file attachments are included in the notification, the plugin automatically sends an **MMS** instead of an SMS. No extra configuration is needed.
:::

## Syntax

Valid syntax is as follows:

- `smsc://{login}:{password}@{toPhoneNo}`
- `smsc://{login}:{password}@{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                     |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| login     | \*Yes    | Your SMSC account login (username).                                                                                                             |
| password  | \*Yes    | Your SMSC account password.                                                                                                                     |
| toPhoneNo | \*Yes    | One or more destination phone numbers in E.164 format. Separate multiple numbers with a `/` in the URL path, or use the `?to=` query parameter. |
| sender    | No       | Sender ID shown to recipients. Up to 11 alphanumeric or 15 numeric characters, subject to SMSC approval.                                        |
| translit  | No       | Set to `yes` to transliterate Cyrillic characters to Latin before sending. Defaults to `no`.                                                    |
| to        | No       | Alias for target phone numbers. Accepts a comma-separated list and may be combined with path-based targets.                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS via SMSC:

```bash
# Assuming login=mylogin, password=mypass, and recipient is +7-123-456-7890
apprise -vv -t "Test Title" -b "Test message body" \
   "smsc://mylogin:mypass@+71234567890"
```

Send to multiple recipients:

```bash
apprise -vv -t "Alert" -b "Server is down" \
   "smsc://mylogin:mypass@+71234567890/+79876543210"
```

Send with a custom sender ID and transliteration enabled:

```bash
apprise -vv -b "Hello world" \
   "smsc://mylogin:mypass@+71234567890?sender=MyBiz&translit=yes"
```

Send as MMS by attaching a file (auto-detected):

```bash
apprise -vv -b "See attached image" \
   --attach /path/to/image.png \
   "smsc://mylogin:mypass@+71234567890"
```
