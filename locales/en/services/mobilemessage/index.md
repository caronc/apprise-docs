---
title: "Mobile Message Notifications"
description: "Send SMS notifications to Australian mobiles via Mobile Message."
sidebar:
  label: "Mobile Message"

source: https://mobilemessage.com.au

schemas:
  - mobilemessage
  - mobilemsg

has_sms: true

sample_urls:
  - mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo}
  - mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 1530
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for an account at [mobilemessage.com.au](https://mobilemessage.com.au/).
2. Sign in and open **Settings** -> **API**. Create an API key, then copy its **API username** and **API password**.
3. Open **Settings** -> **Sender IDs** and choose an approved Sender ID. This can be a dedicated number, a verified mobile, or an ACMA-registered name such as `ALERTS`.

:::caution
Mobile Message only delivers to Australian mobile numbers. Apprise drops other numbers before sending them.
:::

## Syntax

Valid syntax is as follows:

- `mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo}`
- `mobilemessage://{apiUser}:{apiPass}@{senderID}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

You can shorten `mobilemessage://` to `mobilemsg://`.

Use local (`0412345678`) or international (`61412345678`) phone numbers. Apprise converts them to international form.

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                         |
| --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiUser   | \*Yes    | The API username created under **Settings** -> **API**.                                                                                             |
| apiPass   | \*Yes    | The API password that came with your API username.                                                                                                  |
| senderID  | \*Yes    | The Sender ID your message is delivered from. It must already be registered on your account.                                                        |
| toPhoneNo | \*Yes    | One or more Australian mobile numbers. Separate them with a `/` in the URL path.                                                                    |
| to        | No       | Alias for the destination numbers. Accepts a comma-separated list and can be combined with numbers already in the URL path.                         |
| from      | No       | Alias for `senderID`. Handy in YAML configuration files where you would rather keep the Sender ID on its own line.                                  |
| batch     | No       | Group up to 10,000 recipients per request instead of sending one request each. Defaults to `yes`.                                                   |
| unicode   | No       | Keep emoji and accented characters instead of removing them. This reduces the size of each message part and may use more credits. Defaults to `no`. |
| max_parts | No       | The most message parts a single notification may use, between `1` and `99`. Lower it to cap what one alert can cost you. Defaults to `10`.          |
| ref       | No       | Your own reference string, attached to each message and echoed back by the service. Useful for matching messages up in your Mobile Message history. |

<!-- TEMPLATE:SERVICE-PARAMS -->

:::note
Long messages are split into parts, and each part costs one credit. GSM-7 parts hold 153 characters, for 1,530 by default. With `unicode=yes`, parts hold 67 characters, for 670 by default.
:::

## Examples

Send an alert to one number:

```bash
# Assuming our API username is apiuser01
# Assuming our API password is s3cr3tpassw0rd
# Assuming our Sender ID is ALERTS
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678"
```

Send to several people in one request:

```bash
apprise -vv -b "The backup job failed" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678/0498765432"
```

Send from a dedicated number instead of an alphanumeric name:

```bash
apprise -vv -b "Server is down" \
   "mobilemsg://apiuser01:s3cr3tpassw0rd@61400000000/0412345678"
```

Limit an alert to one message part to control its cost:

```bash
apprise -vv -b "Disk usage above 90%" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678?max_parts=1"
```

Allow emoji and accented characters, and tag the messages with your own reference:

```bash
apprise -vv -b "Backup finished, café server included" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@ALERTS/0412345678?unicode=yes&ref=nightly-backup"
```

Use query parameters to keep values separate in a YAML configuration:

```bash
apprise -vv -b "Hello world" \
   "mobilemessage://apiuser01:s3cr3tpassw0rd@?from=ALERTS&to=0412345678,0498765432"
```
