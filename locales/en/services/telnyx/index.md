---
title: "Telnyx Notifications"
description: "Send SMS notifications via Telnyx."
sidebar:
  label: "Telnyx"

source: https://telnyx.com

schemas:
  - telnyx

has_sms: true

sample_urls:
  - telnyx://{apikey}@{fromPhoneNo}
  - telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo}
  - telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

1. Sign up for an account at [telnyx.com](https://telnyx.com/).
2. Buy a phone number from the **Numbers** section of the [Mission Control Portal](https://portal.telnyx.com/).
3. Create a **Messaging Profile** and assign your phone number to it. A number cannot send messages until it belongs to a profile.
4. Generate a **V2 API Key** from the [API Keys page](https://portal.telnyx.com/#/app/api-keys) and copy it somewhere safe. This is the only time it is shown to you.

Your API key and the phone number you bought are everything you need to start sending.

## Syntax

Valid syntax is as follows:

- `telnyx://{apikey}@{fromPhoneNo}`
- `telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo}`
- `telnyx://{apikey}@{fromPhoneNo}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

If you do not provide a destination number, Apprise sends the message back to the number it was sent from. This is handy for testing.

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                 |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey      | \*Yes    | The V2 API Key generated from your Telnyx Mission Control Portal.                                                                                           |
| fromPhoneNo | \*Yes    | The Telnyx phone number the message is sent from. It must be assigned to a Messaging Profile.                                                               |
| toPhoneNo   | No       | One or more destination phone numbers. Separate multiple numbers with a `/` in the URL path. If you leave this out, the message goes back to `fromPhoneNo`. |
| to          | No       | Alias for the destination phone numbers. Accepts a comma-separated list and can be combined with numbers already in the URL path.                           |
| from        | No       | Alias for `fromPhoneNo`. Useful in YAML configuration files where you would rather keep the number on its own line.                                         |
| key         | No       | Alias for `apikey`. Useful in YAML configuration files.                                                                                                     |
| profile     | No       | The Messaging Profile ID to send through. Only needed when your number belongs to more than one profile and you want to pick a specific one.                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to yourself (the `from` number is also the destination):

```bash
# Assuming our API Key is KEY0123456789abcdef
# Assuming our Telnyx phone number is +1-405-123-1234
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "telnyx://KEY0123456789abcdef@+14051231234"
```

Send a message to someone else:

```bash
apprise -vv -t "Alert" -b "The backup job failed" \
   "telnyx://KEY0123456789abcdef@+14051231234/+15551231234"
```

Send to several people at once:

```bash
apprise -vv -b "Server is down" \
   "telnyx://KEY0123456789abcdef@+14051231234/+15551231234/+15559876543"
```

Send through a specific Messaging Profile:

```bash
apprise -vv -b "Nightly report ready" \
   "telnyx://KEY0123456789abcdef@+14051231234/+15551231234?profile=40017b3c-1234-5678-9abc-def012345678"
```

Use query parameters instead of building the numbers into the URL. This reads nicely in a YAML configuration file:

```bash
apprise -vv -b "Hello world" \
   "telnyx://?key=KEY0123456789abcdef&from=+14051231234&to=+15551231234,+15559876543"
```
