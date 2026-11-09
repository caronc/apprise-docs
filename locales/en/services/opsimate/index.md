---
title: "OpsiMate Notifications"
description: "Fire and resolve alerts on a self-hosted OpsiMate server."
sidebar:
  label: "OpsiMate"

source: https://opsimate.dev

schemas:
  - opsimate: insecure
  - opsimates

has_incident: true
has_selfhosted: true

sample_urls:
  - opsimate://{apikey}@{hostname}
  - opsimate://{apikey}@{hostname}:{port}
  - opsimates://{apikey}@{hostname}:{port}?team={team}
  - opsimates://{apikey}@{hostname}:{port}?resolve=yes
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[OpsiMate](https://opsimate.dev) is a self-hosted operations console that gathers the alerts of your monitoring tools into one queue. Apprise sends alerts to it through its [Custom Alerts API](https://docs.opsimate.dev/docs/integrations/custom-alerts), so anything Apprise can notify can show up on your OpsiMate board. The project lives on [GitHub](https://github.com/OpsiMate/OpsiMate).

1. Install OpsiMate and note the hostname and port its server listens on.
2. Find the API token of your installation. It is the `API_TOKEN` setting of the OpsiMate server (`security.api_token` in its configuration file). A default installation ships with the token `opsimate`.

There is no account to create; the API token is all Apprise needs.

## Syntax

Valid syntax is as follows:

- `opsimate://{apikey}@{hostname}`
- `opsimate://{apikey}@{hostname}:{port}`
- `opsimates://{apikey}@{hostname}`
- `opsimates://{apikey}@{hostname}:{port}`
- `opsimates://{apikey}@{hostname}:{port}?team={team}`
- `opsimates://{apikey}@{hostname}:{port}?resolve=yes`

Secure connections (via https) should be referenced using **opsimates://** where as insecure connections (via http) should be referenced via **opsimate://**.

## What gets sent

Each notification fires one alert:

- The title names the alert. Without a title, the first line of the message is used (cut to 120 characters).
- The message is the alert summary.
- The notification type picks the severity: `failure` is **critical**, `warning` is **warning**, and `info` or `success` is **info**.
- Every alert carries the tag `source=apprise`, plus the team (when set) and any `+key=value` tags you add.

Every alert also carries an id. OpsiMate updates the alert that already has the same id instead of adding a new one, so a check that fires every minute keeps one alert open rather than one per minute. Unless you set `id=`, the id is derived from the alert name, so notifications with the same title always address the same alert.

A `success` notification resolves the alert instead of firing it when you add `resolve=yes` to your URL. Only the id and the status are sent in that case, so the alert keeps the name, severity and summary it was fired with. A tool that reports "down" as a `failure` and "up" as a `success` keeps OpsiMate's active alert view clean by itself.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                              |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Yes      | The API token of your OpsiMate server. You may also pass it as `apikey=` or `token=` instead of placing it in front of the hostname.                                     |
| hostname | Yes      | The OpsiMate server you're sending your alerts to.                                                                                                                       |
| port     | No       | The port the OpsiMate server is listening on. By default the port is **80** for **opsimate://** and **443** for all **opsimates://** references.                         |
| id       | No       | A fixed alert id. Every notification sent through this URL then fires or resolves that one alert, whatever its title. Without it, the id is derived from the alert name. |
| team     | No       | The team that owns the alert. It is set as the alert's team and added as a `team` tag.                                                                                   |
| resolve  | No       | Set it to `yes` to resolve the alert on a `success` notification instead of firing it. Every other notification type still fires the alert. The default is `no`.         |
| +key     | No       | Adds a tag to the alert, for example `+env=prod`. The `source` tag is always `apprise` and can not be changed.                                                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Fire a critical alert on an OpsiMate server listening on port 3001:

```bash
# Assuming our {apikey} is opsimate (the default token)
# Assuming our {hostname} is opsimate.local
apprise -vv -n failure -t "Disk full on web-01" -b "Disk usage at 98 percent" \
   "opsimate://opsimate@opsimate.local:3001"
```

Fire an alert owned by a team, with extra tags, over https:

```bash
apprise -vv -n warning -t "Disk filling on web-01" -b "Disk usage at 85 percent" \
   "opsimates://opsimate@opsimate.example.com?team=platform&+env=prod&+host=web-01"
```

Fire an alert, then resolve it later by sending a `success` notification with the same title:

```bash
apprise -vv -n failure -t "Disk full on web-01" -b "Disk usage at 98 percent" \
   "opsimate://opsimate@opsimate.local:3001?team=platform&resolve=yes"

apprise -vv -n success -t "Disk full on web-01" -b "Disk usage back to 40 percent" \
   "opsimate://opsimate@opsimate.local:3001?team=platform&resolve=yes"
```

Always address one alert with a fixed id, whatever the title:

```bash
apprise -vv -n failure -t "Backup job" -b "Nightly backup did not finish" \
   "opsimate://opsimate@opsimate.local:3001?id=backup-nightly&resolve=yes"
```

The same from Python:

```python
import apprise

ap = apprise.Apprise()
ap.add("opsimate://opsimate@opsimate.local:3001?team=platform&resolve=yes")

# Fire the alert
ap.notify(
    title="Disk full on web-01",
    body="Disk usage at 98 percent",
    notify_type=apprise.NotifyType.FAILURE,
)

# Resolve it again
ap.notify(
    title="Disk full on web-01",
    body="Disk usage back to 40 percent",
    notify_type=apprise.NotifyType.SUCCESS,
)
```

Attachments are not supported; the Custom Alerts API has no field for files.
