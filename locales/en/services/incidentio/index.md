---
title: "incident.io Notifications"
description: "Raise and resolve incident.io alerts through an HTTP alert source."
sidebar:
  label: "incident.io"

source: https://incident.io

schemas:
  - incidentio

has_incident: true

body_formats:
  - markdown

sample_urls:
  - incidentio://{source_id}/{token}
  - incidentio://{source_id}/{token}?action=resolve&dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[incident.io](https://incident.io) receives Apprise notifications as alerts. An alert can then page whoever is on-call or open an incident, depending on the alert routes you set up in incident.io.

1. Sign in to incident.io, open **Alerts**, and go to **Sources**.
2. Create a new alert source and choose **HTTP**.
3. incident.io shows you a URL and a secret token. The URL looks like `https://api.incident.io/v2/alert_events/http/01GW2G3V0S59R238FAHPDS1R66`. The ID at the end is your alert source ID.

You can also paste that URL into Apprise as-is, as long as you add your token to it with `?token=`.

## Syntax

Valid syntax is as follows:

- `incidentio://{source_id}/{token}`
- `incidentio://{source_id}/{token}?action=resolve&dedup={key}`
- `https://api.incident.io/v2/alert_events/http/{source_id}?token={token}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source_id | Yes      | The ID at the end of the URL incident.io gave your HTTP alert source.                                                                                                                                                                                                                                                                                                                                      |
| token     | Yes      | The secret token incident.io gave your HTTP alert source.                                                                                                                                                                                                                                                                                                                                                  |
| action    | No       | What to do with the alert. Possible values are **map**, **trigger** and **resolve**. **map** resolves the alert when the notification type is `success` and raises an alert for every other type. **trigger** raises a new alert every time, even when the title repeats, and **resolve** always resolves it. The default is **map**.                                                                      |
| dedup     | No       | A deduplication key. Alerts sent with the same key update the same open alert instead of creating a new one, and a resolve closes it. Without it, **map** and **resolve** use the title (or the first line of the message when there is no title) as the key, so a `success` notification resolves the alert that a `failure` with the same title raised, while **trigger** raises a new alert every time. |
| click     | No       | A link back to wherever the alert came from. incident.io shows it on the alert.                                                                                                                                                                                                                                                                                                                            |
| +key      | No       | Adds extra details to the alert, for example `+service=web`. Your alert source must be set up to read these details before incident.io uses them.                                                                                                                                                                                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Raise an alert:

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken"
```

Raise an alert, then resolve it later by sending a `success` notification with the same title:

```bash
apprise -vv -n failure -t "Disk almost full" -b "db01 is at 95% disk usage" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken?+service=database"

apprise -vv -n success -t "Disk almost full" -b "db01 is back to normal" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken"
```

Always resolve the alert with a fixed deduplication key, whatever the notification type:

```bash
apprise -vv -t "Disk" -b "db01 is back to normal" \
   "incidentio://01GW2G3V0S59R238FAHPDS1R66/mySecretToken?dedup=db01-disk&action=resolve"
```

incident.io needs a title on every alert. When you do not give one, your message is used as the title.
