---
title: "FireHydrant Notifications"
description: "Open and resolve FireHydrant Signals alerts through a webhook event source."
sidebar:
  label: "FireHydrant"

source: https://firehydrant.com

schemas:
  - firehydrant

has_incident: true
has_image: true

body_formats:
  - text

sample_urls:
  - firehydrant://{token}
  - firehydrant://{token}?priority=low&tags=service:api-gateway
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[FireHydrant](https://firehydrant.com) receives Apprise notifications as Signals events. Your alert rules in FireHydrant then decide who gets paged.

1. Sign in to FireHydrant and open **Signals** -> **Sources**.
2. Copy the generic webhook URL. It looks like `https://signals.firehydrant.com/v1/process/eyJhbGciOiJIUzI1NiJ9...`. The long value at the end is your token.

To skip your alert rules and page someone directly, open **Teams**, pick a team and go to its **Alert Triggers** tab. Choose a team, escalation policy, on-call schedule or user from the drop-down and copy the webhook URL shown there instead.

You can paste either URL into Apprise as-is. To send to more than one of them, add one Apprise URL for each.

FireHydrant does not accept file attachments from other services, so Apprise does not send them.

## Syntax

Valid syntax is as follows:

- `firehydrant://{token}`
- `firehydrant://{token}?action=resolve&dedup={key}`
- `https://signals.firehydrant.com/v1/process/{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                                                                                                               |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | The long value at the end of your FireHydrant webhook URL.                                                                                                                                                                                                                                                                                                                                                |
| action   | No       | What to do with the alert. Possible values are **map**, **trigger** and **resolve**. **map** resolves the alert when the notification type is `success` and opens an alert for every other type. **trigger** opens a new alert every time, even when the title repeats, and **resolve** always resolves it. The default is **map**.                                                                       |
| level    | No       | The event level. Possible values are **info**, **warn**, **error** and **fatal**. By default it follows the notification type: `info` and `success` send **info**, `warning` sends **warn** and `failure` sends **error**.                                                                                                                                                                                |
| priority | No       | How urgently people are paged. Possible values are **low**, **medium** and **high**. When it is not set, FireHydrant uses **high** unless an alert rule says otherwise.                                                                                                                                                                                                                                   |
| dedup    | No       | A deduplication key. Events sent with the same key update the same open alert instead of creating a new one, and a resolve closes it. Without it, **map** and **resolve** use the title (or the first line of the message when there is no title) as the key, so a `success` notification resolves the alert that a `failure` with the same title opened, while **trigger** opens a new alert every time. |
| click    | No       | A link back to wherever the alert came from. FireHydrant shows it on the alert.                                                                                                                                                                                                                                                                                                                           |
| tags     | No       | A comma-separated list of tags. Use `service:{slug}` and `environment:{slug}` to link the alert to entries in your FireHydrant service catalog.                                                                                                                                                                                                                                                           |
| image    | No       | Sends the Apprise notification icon along with the alert. The default is `yes`.                                                                                                                                                                                                                                                                                                                           |
| +key     | No       | Adds an annotation to the alert, for example `+team=sre`. Your alert rules can match on these.                                                                                                                                                                                                                                                                                                            |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Open an alert:

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123"
```

Open an alert, then resolve it later by sending a `success` notification with the same title:

```bash
apprise -vv -n failure -t "Disk almost full" -b "db01 is at 95% disk usage" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123?tags=service:database"

apprise -vv -n success -t "Disk almost full" -b "db01 is back to normal" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123"
```

Send a low priority alert with an annotation your alert rules can match on:

```bash
apprise -vv -t "Backup slow" -b "The nightly backup took 3 hours" \
   "firehydrant://eyJhbGciOiJIUzI1NiJ9.eyJvcmdfaWQiOiIxMjMifQ.abc123?priority=low&+team=sre"
```

FireHydrant needs a summary on every alert. When you do not give a title, your message is used as the summary.
