---
title: "SMSTunnel Notifications"
description: "Send text messages from your own Android phone and number with SMSTunnel."
sidebar:
  label: "SMSTunnel"

source: https://smstunnel.io

schemas:
  - smstunnel

has_sms: true

body_formats:
  - text

sample_urls:
  - smstunnel://{apikey}/{phone_no}
  - smstunnel://{apikey}/{phone_no1}/{phone_no2}/{phone_noN}
  - smstunnel://{apikey}/{phone_no}?device={device_id}

limits:
  max_chars: 1600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

SMSTunnel sends your notifications as text messages from your own Android phone, using your own number. The people you notify see a number they already know, and they can reply to it.

Apprise passes each text to your SMSTunnel account, and the SMSTunnel app on your phone sends it from the phone's own SIM. Each phone number you list gets its own text. A notification title is added to the start of the text, because a text message has no title of its own.

## Account Setup

1. Install the [SMSTunnel app from Google Play](https://play.google.com/store/apps/details?id=io.smstunnel.app) on your Android phone and sign in.
2. Sign in at [smstunnel.io](https://smstunnel.io) with the same account. Your phone is listed under **Phones**.
3. Open **Apps** in the dashboard and choose **Add an app**. Its key can send texts (the `sms:send` permission). The key starts with `sk_live_`. This is your `{apikey}`.

If you link more than one phone to your account, you can choose which one sends with `?device=`. The Device ID is the `id` of each phone in the list that SMSTunnel returns:

```bash
curl -H "X-API-Key: {apikey}" https://smstunnel.io/api/v1/devices
```

If your phone is offline, SMSTunnel keeps the text and your phone sends it once it is back online.

:::note
Your carrier's terms apply to every text your phone sends. Send only texts that people expect from you, such as alerts to yourself or your team.
:::

:::note
Attachments are not supported because SMSTunnel only sends text messages.
:::

## Syntax

Valid syntax is as follows:

- `smstunnel://{apikey}/{phone_no}`
- `smstunnel://{apikey}/{phone_no1}/{phone_no2}/{phone_noN}`
- `smstunnel://{apikey}/{phone_no}?device={device_id}`
- `smstunnel://{apikey}/{local_phone_no}?country={country_code}`
- `smstunnel://?key={apikey}&to={phone_no1},{phone_no2}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                         |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | Your SMSTunnel API Key. It needs the `sms:send` permission. It can also be given with `?key=`.                                                                                                                                                                                      |
| phone_no | Yes      | The phone number to notify, including its country code (for example `+14155550123`). Add as many as you like, separated by a slash. You can also use `?to=` with commas between the numbers.                                                                                        |
| device   | No       | The Device ID of the phone that sends the text. When it is not set, SMSTunnel picks one of the phones linked to your account.                                                                                                                                                       |
| country  | No       | A country calling code, such as `1` or `40`. With it, you can also write numbers in their local form: a number that does not start with `+` or `00` gets this country code in front of it (a leading `0` is dropped first). Without it, every number must include its country code. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a text to one phone number:

```bash
# Replace abcd1234 with your API Key
# Replace +14155550123 with the phone number to notify
apprise -vv -t "Backup" -b "The nightly backup finished." \
    smstunnel://abcd1234/+14155550123
```

Send the same notification to two phone numbers (one text each):

```bash
apprise -vv -b "The website is down." \
    smstunnel://abcd1234/+14155550123/+14155550124
```

Choose which of your phones sends the text:

```bash
apprise -vv -b "Disk space is low." \
    "smstunnel://abcd1234/+14155550123?device=6650f0c2a1b2c3d4e5f60718"
```

Write local numbers and let Apprise add the country code (`0712 345 678` becomes `+40712345678`):

```bash
apprise -vv -b "The door was opened." \
    "smstunnel://abcd1234/0712345678?country=40"
```
