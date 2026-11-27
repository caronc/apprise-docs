---
title: "Sparetext Notifications"
description: "Send text messages from your own Android phone or iPhone, and your own number, with Sparetext."
sidebar:
  label: "Sparetext"

source: https://sparetext.dev

schemas:
  - sparetext

has_sms: true

body_formats:
  - text

sample_urls:
  - sparetext://{apikey}/{phone_no}
  - sparetext://{apikey}/{phone_no1}/{phone_no2}/{phone_noN}
  - sparetext://{apikey}/{phone_no}?device={device_id}

limits:
  max_chars: 1600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

Sparetext sends your notifications as text messages from your own phone, using your own number. The people you notify see a number they already know, and they can reply to it.

Apprise passes the text to your Sparetext account, and the Sparetext app on your phone sends it from the phone's own SIM. A notification title is added to the start of the text, because a text message has no title of its own. Up to 100 phone numbers are handed to Sparetext in one request.

## Account Setup

1. Sign up at [sparetext.dev](https://sparetext.dev).
2. Install the Sparetext app on your phone from the [download page](https://sparetext.dev/download) and pair it with your account. The dashboard walks you through it.
3. Open **API keys** in the dashboard and choose **New API key**. The key starts with `spt_live_`. This is your `{apikey}`.

On Android, the app sends each text by itself. On an iPhone, sending is semi-automatic (through a Shortcut, or one tap per text), and fully automatic when a Mac running Sparetext for Mac sends the texts for it.

If you pair more than one phone, you can choose which one sends with `?device=`. The Device ID is the `id` of each phone in the list that Sparetext returns:

```bash
curl -H "x-api-key: {apikey}" https://sparetext.dev/api/v1/devices
```

If your phone is offline, the text waits and goes out once the phone is back online. By default a text waits up to a day; you can change this for each phone in the dashboard.

:::note
Each text goes out through your phone's own carrier plan, so your carrier's rules apply. Carriers filter bulk texts from personal numbers. Keep to texts people expect, such as alerts to yourself or your team.
:::

:::note
A person who replies STOP is put on your opt-out list, and Sparetext does not text them again until they reply START. Apprise logs a warning for each number that was left out, and the others still get the text.
:::

:::note
Only text is sent. Attachments are not supported.
:::

## Message Length

A text can be up to 1,600 characters. Sparetext refuses a longer notification, unless you add `?overflow=truncate` (to keep the first 1,600 characters) or `?overflow=split` (to send it as several texts).

Your phone sends a long text as several SMS parts, which arrive joined together. A text written in the basic SMS alphabet (GSM-7) fits 160 characters in one part. A single character outside it, such as an emoji (🔴 or ✅) or a curly quote, sends the whole text as UCS-2, which fits only 70 characters in one part. Your carrier may count each part as one SMS.

- In the Sparetext dashboard settings, **Swap look-alike characters** turns curly quotes, long dashes and ellipses into plain ones when that keeps a text in GSM-7. Emoji stay as written.
- With `-vvv`, Apprise logs the encoding of each text and how many parts it takes.

## Syntax

Valid syntax is as follows:

- `sparetext://{apikey}/{phone_no}`
- `sparetext://{apikey}/{phone_no1}/{phone_no2}/{phone_noN}`
- `sparetext://{apikey}/{phone_no}?device={device_id}`
- `sparetext://?key={apikey}&to={phone_no1},{phone_no2}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                    |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | Your Sparetext API Key. It can also be given with `?key=`.                                                                                                                                                                                                                                     |
| phone_no | Yes      | The phone number to text, including its country code (for example `+12025550123`). Add as many as you like, separated by a slash. You can also use `?to=` with commas between the numbers. A number written without `+` or `00` in front is read in the country set on your Sparetext account. |
| device   | No       | The Device ID of the phone that sends the text. When it is not set, Sparetext uses the phone that last texted that person, or else your default phone.                                                                                                                                         |
| batch    | No       | `yes` (the default) hands up to 100 phone numbers to Sparetext in one request. `no` sends one request per phone number, so a number Sparetext refuses does not hold back the others.                                                                                                           |
| server   | No       | The Sparetext server to send through. It is `https://sparetext.dev` unless you set it, for example to test against another server.                                                                                                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a text to one phone number:

```bash
# Replace spt_live_abc123 with your API Key
# Replace +12025550123 with the phone number to text
apprise -vv -t "Backup" -b "The nightly backup finished." \
    sparetext://spt_live_abc123/+12025550123
```

Send the same notification to two phone numbers:

```bash
apprise -vv -b "The website is down." \
    sparetext://spt_live_abc123/+12025550123/+12025550124
```

Choose which of your phones sends the text:

```bash
apprise -vv -b "Disk space is low." \
    "sparetext://spt_live_abc123/+12025550123?device=dev_abcdefghjkmn"
```

Keep a long notification, such as the changes on a watched web page, to one text:

```bash
apprise -vv -b "$(cat changes.txt)" \
    "sparetext://spt_live_abc123/+12025550123?overflow=truncate"
```
