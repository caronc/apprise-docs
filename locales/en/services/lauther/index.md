---
title: "Lauther Notifications"
description: "Send Lauther push notifications."
sidebar:
  label: "Lauther"

source: https://lauther.app/

schemas:
  - lauther

sample_urls:
  - lauther://{token}
  - lauther://{token}?priority=high&sound=default

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Lauther is a push notification and anonymous identity app for your phone.

1. Install the [Lauther app](https://lauther.app/) on your device.
2. Inside the app, go to **Apps** and tap **+** to create a **New Token**.
3. Copy the token that is generated — it will look like this:

   ```text
   lpt_AbCdEf1234567890
   ```

This token is all Apprise needs to deliver messages to your device.

## Syntax

Valid syntax is as follows:

- `lauther://{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                         |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | The token generated for you within the Lauther app. It always starts with `lpt_`.                                                                   |
| priority | No       | The priority to send the notification at. Possible values are **lowest**, **low**, **normal**, **high**, and **emergency**. Defaults to **normal**. |
| sound    | No       | The name of the notification sound to play on the receiving device.                                                                                 |
| click    | No       | A URL to open when the notification is tapped.                                                                                                      |
| icon     | No       | A URL to an image used to override the notification's icon.                                                                                         |
| color    | No       | A color used to override the notification's appearance (for example `#D9EF00`).                                                                     |
| group    | No       | A grouping/collapse key used to group related notifications together on the device.                                                                 |
| route    | No       | A page on your paired site to open (signed in) when the notification is tapped. Must resolve to the same origin as your paired site.                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a basic Lauther notification:

```bash
# Assuming our token is lpt_AbCdEf1234567890
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   lauther://lpt_AbCdEf1234567890
```

Send a high priority notification with a custom sound and a tap-through link:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "lauther://lpt_AbCdEf1234567890?priority=high&sound=default&click=https://example.com"
```
