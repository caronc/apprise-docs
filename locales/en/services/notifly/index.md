---
title: "Notifly Notifications"
description: "Send notifications through the workflows you build in Notifly."
sidebar:
  label: "Notifly"

source: https://notifly.io/

schemas:
  - notifly

body_formats:
  - text

sample_urls:
  - notifly://{apikey}/{workflow}/{subscriber}
  - notifly://{apikey}/{workflow}/{subscriber1}/{subscriber2}/{subscriber3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Notifly](https://notifly.io/) is a hosted notification service. You build a workflow in the dashboard, and the workflow decides how each subscriber is notified (email, SMS, push, chat or in-app). Creating an account is free, and the free plan includes 10,000 events a month.

1. Create an **API Key** in the **API Keys** section of your dashboard. Keys belong to an environment (Development or Production).
2. Create a **Workflow** and note its trigger identifier. This is the `{workflow}` in the URL.
3. Create a **Subscriber** and note its subscriber ID. This is the `{subscriber}` in the URL.

Apprise sends the title, body and notification type to the workflow as `payload` values, so your workflow templates must use them. Add these to your template steps:

- `{{payload.title}}`: the notification title
- `{{payload.body}}`: the notification body
- `{{payload.type}}`: one of `info`, `success`, `warning` or `failure`

A workflow that does not reference these values still runs, but the message it sends will not contain what you passed to Apprise.

## Syntax

Valid syntax is as follows:

- `notifly://{apikey}/{workflow}/{subscriber}`
- `notifly://{apikey}/{workflow}/{subscriber1}/{subscriber2}/{subscriber3}`

Each `{subscriber}` triggers the workflow with its own request.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                        |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Yes      | The **API Key** you created in your Notifly dashboard.                                                                                             |
| workflow   | Yes      | The trigger identifier of the workflow to run.                                                                                                     |
| subscriber | Yes      | The ID of the subscriber to notify. More than one can be specified in the URL path.                                                                |
| to         | No       | Additional subscriber IDs. More than one can be separated with a space and/or comma.                                                               |
| :key       | No       | Adds `key` to the `payload` sent to your workflow. For example, `?:order=1234` adds `"order": "1234"`. Use as many as you need, one per parameter. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Notifly notification to one subscriber:

```bash
# Assuming our {apikey} is abc123
# Assuming our {workflow} is apprise-alert
# Assuming our {subscriber} is user-42
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   notifly://abc123/apprise-alert/user-42
```

Send to two subscribers and pass an extra value to the workflow:

```bash
apprise -vv -t "Backup failed" -b "The nightly backup did not finish." \
   "notifly://abc123/apprise-alert/user-42/user-43?:server=db1"
```
