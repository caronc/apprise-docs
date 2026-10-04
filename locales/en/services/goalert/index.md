---
title: "GoAlert Notifications"
description: "Raise and close GoAlert alerts."
sidebar:
  label: "GoAlert"

source: https://goalert.me

schemas:
  - goalert: insecure
  - goalerts

has_selfhosted: true

body_formats:
  - markdown

sample_urls:
  - goalerts://{hostname}/{integration_key}
  - goalerts://{hostname}:{port}/{integration_key}
  - goalerts://{hostname}/{path}/{integration_key}
  - goalerts://{hostname}/{integration_key1}/{integration_key2}
  - goalerts://{hostname}/{integration_key}?dedup=disk-check

limits:
  - name: "Title"
    max_chars: 1024
  - name: "Body"
    max_chars: 6144
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

GoAlert is a self-hosted on-call scheduling and alerting platform. Apprise raises alerts through a GoAlert **Generic API** integration key:

1. Sign in to GoAlert and open the **Service** that should receive the alerts.
2. Under **Integration Keys**, click the **+** button.
3. Give the key a name such as `Apprise`, set the type to **Generic API** and save it.
4. Copy the generated URL. It looks like `https://goalert.example.com/api/v2/generic/incoming?token=ab12cd34-ab12-4c5d-8e9f-0123456789ab`.

The `token` value at the end is your integration key, and the start of the URL is your GoAlert server. For the example above, the Apprise URL is `goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab`.

Each integration key belongs to one GoAlert service. Add more keys to the same URL to raise the alert in several services at once.

## Syntax

Valid syntax is as follows:

- `goalert://{hostname}/{integration_key}`
- `goalerts://{hostname}/{integration_key}`
- `goalerts://{hostname}:{port}/{integration_key}`
- `goalerts://{hostname}/{path}/{integration_key}`
- `goalerts://{hostname}/{integration_key1}/{integration_key2}/{integration_keyN}`

Use **goalerts://** for secure (https) connections and **goalert://** for insecure (http) ones.

## Parameter Breakdown

| Variable        | Required | Description                                                                                                                                                                                                                                                                                                 |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname        | Yes      | The GoAlert server you are sending your alert to.                                                                                                                                                                                                                                                           |
| integration_key | Yes      | One or more GoAlert **Generic API** integration keys. Each key raises the alert in the service it belongs to.                                                                                                                                                                                               |
| port            | No       | The port the GoAlert server is listening on. The default is **80** for **goalert://** and **443** for **goalerts://**.                                                                                                                                                                                      |
| path            | No       | If GoAlert is hosted under a sub-path (for example behind a reverse proxy), include it before your integration keys. The default is **/**.                                                                                                                                                                  |
| action          | No       | What to do with the alert. Possible values are **map**, **trigger** and **close**. **map** closes matching alerts when the notification type is `success` and raises an alert for every other type. **trigger** always raises an alert and **close** always closes matching alerts. The default is **map**. |
| dedup           | No       | A deduplication key. Alerts sent with the same key update the same open alert instead of creating a new one, and a **close** action closes it. Without it, GoAlert only matches alerts with the exact same title and body, so set a **dedup** key whenever you want a later message to close an alert.      |

You can also attach extra metadata to an alert by adding `+key=value` entries to the URL, for example `+env=prod&+team=ops`.

The title becomes the alert summary, which GoAlert sends by SMS and voice. The body becomes the alert details. When no title is given, the start of the body is used as the summary. GoAlert does not accept file attachments on this API.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Raise a GoAlert alert:

```bash
# Assuming our {hostname} is goalert.example.com
# Assuming our {integration_key} is ab12cd34-ab12-4c5d-8e9f-0123456789ab
apprise -vv -t "Disk space low" -b "Only 2% free on /var" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab"
```

Raise an alert with a deduplication key, then close it once the problem is fixed:

```bash
# Raise the alert
apprise -vv -n failure -t "Disk space low" -b "Only 2% free on /var" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab?dedup=disk-var"

# Close it again (a success notification closes alerts by default)
apprise -vv -n success -t "Disk space recovered" -b "40% free on /var" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab?dedup=disk-var"
```

Raise the same alert in two services, with some metadata attached:

```bash
apprise -vv -t "Backup failed" -b "Nightly backup did not finish" \
   "goalerts://goalert.example.com/ab12cd34-ab12-4c5d-8e9f-0123456789ab/cd34ef56-cd34-4e5f-9a0b-0123456789cd?+env=prod"
```
