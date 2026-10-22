---
title: "Squadcast Notifications"
description: "Trigger and resolve Squadcast incidents through an Incident Webhook."
sidebar:
  label: "Squadcast"

source: https://www.squadcast.com

schemas:
  - squadcast

has_incident: true

body_formats:
  - markdown

keywords: "SolarWinds Incident Response"

limits:
  max_chars: 30000

sample_urls:
  - squadcast://{webhook_key}
  - squadcast://{webhook_key}?region=eu
  - squadcast://{webhook_key}?action=resolve&dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Squadcast](https://www.squadcast.com) (now SolarWinds Incident Response) receives Apprise notifications as incidents, which then page whoever is on-call for the service.

1. Sign in to Squadcast and open **Services**.
2. Pick the team and the service you want to alert, then click **Alert Sources**.
3. Search for **Incident Webhook** and copy the Webhook URL. It looks like `https://api.squadcast.com/v2/incidents/api/7f550a9f4c44173a37664d938f1355f0f92a47a7`. The value at the end is your webhook key.

You can also paste that URL into Apprise as-is. Accounts hosted in Europe get a URL starting with `https://api.eu.squadcast.com`; Apprise picks up the region from it, or you can add `?region=eu` to a `squadcast://` URL.

## Syntax

Valid syntax is as follows:

- `squadcast://{webhook_key}`
- `squadcast://{webhook_key}?region=eu`
- `squadcast://{webhook_key}?action=resolve&dedup={key}`
- `https://api.squadcast.com/v2/incidents/api/{webhook_key}`
- `https://api.eu.squadcast.com/v2/incidents/api/{webhook_key}`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| webhook_key | Yes      | The value at the end of the Incident Webhook URL Squadcast gave your service.                                                                                                                                                                                                                                                                                                                                  |
| region      | No       | Where your Squadcast account is hosted. Possible values are **us** and **eu**. The default is **us**.                                                                                                                                                                                                                                                                                                          |
| action      | No       | What to do with the incident. Possible values are **map**, **trigger** and **resolve**. **map** resolves the incident when the notification type is `success` and triggers one for every other type. **trigger** triggers a new incident every time, even when the title repeats, and **resolve** always resolves it. The default is **map**.                                                                  |
| dedup       | No       | The event ID Squadcast uses to tie notifications to one incident. A resolve closes every incident with the same event ID. Without it, **map** and **resolve** use the title (or the first line of the message when there is no title) as the event ID, so a `success` notification resolves the incident that a `failure` with the same title triggered, while **trigger** triggers a new incident every time. |
| priority    | No       | The incident priority. Possible values are **P1**, **P2**, **P3**, **P4** and **P5** (a plain number such as `2` also works). When it is not set, Squadcast leaves the priority as **Unset**.                                                                                                                                                                                                                  |
| +key        | No       | Adds a tag to the incident, for example `+severity=high`.                                                                                                                                                                                                                                                                                                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Trigger an incident:

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7?priority=P1"
```

Trigger an incident, then resolve it later by sending a `success` notification with the same title:

```bash
apprise -vv -n failure -t "Disk almost full" -b "db01 is at 95% disk usage" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7?+service=database"

apprise -vv -n success -t "Disk almost full" -b "db01 is back to normal" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7"
```

Always resolve the incident with a fixed event ID on an account hosted in Europe, whatever the notification type:

```bash
apprise -vv -t "Disk" -b "db01 is back to normal" \
   "squadcast://7f550a9f4c44173a37664d938f1355f0f92a47a7?region=eu&dedup=db01-disk&action=resolve"
```

When you do not give a title, your message is used as the incident title.
