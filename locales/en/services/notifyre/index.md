---
title: "Notifyre Notifications"
description: "Send SMS and fax notifications via the Notifyre API."
sidebar:
  label: "Notifyre"

source: https://notifyre.com

schemas:
  - notifyre

has_sms: true
has_attachments: true

limits:
  - name: "SMS"
    max_chars: 160
  - name: "Fax"
    max_chars: 32768
---

<!-- SERVICE:DETAILS -->

<!-- SPONSORS:BANNER -->

## Account Setup

1. Sign up at [notifyre.com](https://notifyre.com/) and log in.
2. Navigate to **Settings > Developer**.
3. Click **New** to create an API token and copy it -- it is only shown once.

Notifyre supports both SMS delivery and fax delivery from the same API key. Fax mode is activated by adding `?mode=fax` to the Apprise URL. Attachments (PDF, DOCX, PNG, JPEG, TIFF, and more) are supported in fax mode and are base64-encoded as fax document pages. The notification body is always included as a plain-text cover page prepended before any file attachments.

## Syntax

Valid syntax is as follows:

- `notifyre://{apikey}/{phoneno}`
- `notifyre://{apikey}/{phoneno1}/{phoneno2}`
- `notifyre://{apikey}/{phoneno}?from={from}`
- `notifyre://{apikey}/{phoneno}?campaign={campaign}`
- `notifyre://{apikey}/{faxno}?mode=fax`
- `notifyre://{apikey}/{faxno}?mode=fax&from={from}`
- `notifyre://{apikey}/{faxno}?mode=fax&template={template}`
- `notifyre://{apikey}/{faxno}?mode=fax&hq=no`
- `notifyre://{apikey}/{faxno}?mode=fax&ref={ref}`
- `notifyre://{apikey}/{faxno}?mode=fax&header={header}`
- `notifyre://{apikey}/{faxno1}/{faxno2}?mode=fax`

## Parameter Breakdown

| Variable | Required | Description |
| -------- | -------- | ----------- |
| apikey   | \*Yes    | Your Notifyre API token (Settings > Developer). |
| phoneno  | \*Yes    | The target phone or fax number to notify. Numbers must include the country code (e.g. `+15551234567`). |
| from     | No       | The sender phone or fax number. When omitted, Notifyre uses a shared number from your account pool. |
| mode     | No       | Delivery mode: `sms` (default) or `fax`. |
| campaign | No       | Campaign name attached to the message. Defaults to the Apprise application ID (`Apprise`). Applies to both SMS and fax. |
| template | No       | Fax template name. Used only in fax mode. |
| ref      | No       | Client reference string for tracking. Used only in fax mode. |
| hq       | No       | High-quality fax flag. Set to `no` to disable. Defaults to `yes`. Used only in fax mode. |
| header   | No       | Cover page header text. Used only in fax mode. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS to a single number:

```bash
apprise -vv -t "Alert" -b "Server is down" \
    "notifyre://YOURAPIKEY/+15551234567"
```

Send an SMS to multiple numbers:

```bash
apprise -vv -t "Alert" -b "Server is down" \
    "notifyre://YOURAPIKEY/+15551234567/+15559876543"
```

Send a fax with the notification body as cover sheet text:

```bash
apprise -vv -t "Notice" -b "Please review the attached document." \
    "notifyre://YOURAPIKEY/+15551234567?mode=fax"
```

Send a fax with a PDF attachment:

```bash
apprise -vv -t "Invoice" -b "Please find the invoice attached." \
    --attach /path/to/invoice.pdf \
    "notifyre://YOURAPIKEY/+15551234567?mode=fax"
```

Send a fax specifying the sender number:

```bash
apprise -vv -t "Notice" -b "Document enclosed." \
    "notifyre://YOURAPIKEY/+15551234567?mode=fax&from=+15550000001"
```
