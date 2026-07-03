---
title: "SerwerSMS Notifications"
description: "Send SMS and MMS notifications via the SerwerSMS Polish gateway."
sidebar:
  label: "SerwerSMS"

source: https://serwersms.pl

schemas:
  - serwersms

has_sms: true
has_attachments: true

keywords: "serwer, serwersms.pl"

sample_urls:
  - serwersms://{username}:{password}@{sender}/{target_phone}
  - serwersms://{username}:{password}@{sender}/{target_group}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for a SerwerSMS account at [serwersms.pl](https://serwersms.pl).
2. Note your login username and password from your account settings.
3. Configure a sender name in the SerwerSMS customer panel. Sender names must be pre-approved by the carrier and are limited to 11 alphanumeric characters (e.g. `MyApp`).
4. Optionally create contact groups in the panel and note their numeric group IDs.

## Syntax

Valid syntax is as follows:

- `serwersms://{username}:{password}@{sender}/{target_phone}`
- `serwersms://{username}:{password}@{sender}/#{target_group}`
- `serwersms://{username}:{password}@{sender}/{target_phone}/#{target_group}`

:::note
The `#` group prefix must be written as `%23` when entered directly in a URL (e.g. `/%23456`). Apprise automatically encodes and decodes this when saving or loading from a configuration file.
:::

## Parameter Breakdown

| Variable     | Required  | Description                                                                                                |
| ------------ | --------- | ---------------------------------------------------------------------------------------------------------- |
| username     | **\*Yes** | Your SerwerSMS account login username.                                                                     |
| password     | **\*Yes** | Your SerwerSMS account password.                                                                           |
| sender       | **\*Yes** | The approved sender name shown on the recipient's phone (up to 11 alphanumeric characters).                |
| target_phone | **\*No**  | One or more phone numbers to deliver the SMS to. Prefix each number with `+` followed by the country code. |
| target_group | **\*No**  | One or more SerwerSMS contact group IDs. Prefix each group ID with `#`.                                    |
| to           | No        | A comma-separated list of phone numbers and/or group IDs. Alias for `target_phone` / `target_group`.       |
| from         | No        | Alias for `sender`.                                                                                        |

:::note
At least one `target_phone` or `target_group` must be provided. Each target triggers a separate API call.
:::

:::note
When an attachment is provided, the message is automatically sent as MMS via the SerwerSMS MMS endpoint. No extra configuration is needed -- simply pass `--attach` on the command line or supply an attachment in the API call.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to a single phone number:

```bash
# Assuming username=mylogin, password=secret, sender=MyApp
# Target phone number: +48 123 456 789
apprise -vv -t "Test Title" -b "Test Message" \
   serwersms://mylogin:secret@MyApp/+48123456789
```

Send to multiple phone numbers:

```bash
apprise -vv -t "Alert" -b "Server is down" \
   serwersms://mylogin:secret@MyApp/+48123456789/+48987654321
```

Send to a SerwerSMS contact group (group ID 100):

```bash
apprise -vv -t "Broadcast" -b "Maintenance tonight" \
   "serwersms://mylogin:secret@MyApp/%23100"
```

Send to a phone number and a group in one URL:

```bash
apprise -vv -t "Alert" -b "Check the logs" \
   "serwersms://mylogin:secret@MyApp/+48123456789/%23200"
```

Send an MMS with an image attachment:

```bash
apprise -vv -t "Alert" -b "See attached" \
   --attach /path/to/image.jpg \
   serwersms://mylogin:secret@MyApp/+48123456789
```
