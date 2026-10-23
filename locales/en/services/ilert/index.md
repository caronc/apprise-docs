---
title: "ilert Notifications"
description: "Raise, accept and resolve ilert alerts through an API alert source."
sidebar:
  label: "ilert"

source: https://www.ilert.com

schemas:
  - ilert

has_incident: true
has_image: true

body_formats:
  - markdown

limits:
  max_chars: 32768

sample_urls:
  - ilert://{integration_key}
  - ilert://{integration_key}?priority=high
  - ilert://{integration_key}?action=resolve&dedup={key}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[ilert](https://www.ilert.com) receives Apprise notifications as alerts, which then page whoever is on-call through the alert source's escalation policy.

1. Sign in to ilert and open **Alert sources**.
2. Click **Add a new alert source** and choose **API** as the integration type.
3. Pick the escalation policy that should be paged and save.
4. Copy the **integration key** shown on the alert source's detail page.

## Syntax

Valid syntax is as follows:

- `ilert://{integration_key}`
- `ilert://{integration_key}?priority=high`
- `ilert://{integration_key}?action=resolve&dedup={key}`

## Parameter Breakdown

| Variable        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| integration_key | Yes      | The integration key of your ilert API alert source.                                                                                                                                                                                                                                                                                                                                                                                                             |
| action          | No       | What to do with the alert. Possible values are **map**, **trigger**, **acknowledge** and **resolve**. **map** resolves the alert when the notification type is `success` and raises one for every other type. **trigger** raises a new alert every time, even when the title repeats. **acknowledge** accepts the alert and **resolve** always resolves it. The default is **map**.                                                                             |
| dedup           | No       | The alert key ilert uses to tie notifications to one alert. While an alert with this key is open, new notifications are added to it instead of raising another one. Without it, **map**, **acknowledge** and **resolve** use the title (or the first line of the message when there is no title) as the alert key, so a `success` notification resolves the alert that a `failure` with the same title raised, while **trigger** raises a new alert every time. |
| priority        | No       | The alert priority. Possible values are **high** and **low**. When it is not set, the alert source's own priority setting is used.                                                                                                                                                                                                                                                                                                                              |
| route           | No       | A routing key that sends new alerts to a different escalation policy than the alert source's own.                                                                                                                                                                                                                                                                                                                                                               |
| click           | No       | A link to show on the alert.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| image           | No       | Shows an icon on the alert that matches the notification type. Set it to `no` if you do not want this. The default is `yes`.                                                                                                                                                                                                                                                                                                                                    |
| +key            | No       | Adds a label to the alert, for example `+env=prod`.                                                                                                                                                                                                                                                                                                                                                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Raise a high priority alert:

```bash
apprise -vv -t "Database down" -b "The primary database is not responding" \
   "ilert://il1api0123456789abcdef0123456789abcdef?priority=high"
```

Raise an alert, then resolve it later by sending a `success` notification with the same title:

```bash
apprise -vv -n failure -t "Disk almost full" -b "db01 is at 95% disk usage" \
   "ilert://il1api0123456789abcdef0123456789abcdef?+service=database"

apprise -vv -n success -t "Disk almost full" -b "db01 is back to normal" \
   "ilert://il1api0123456789abcdef0123456789abcdef"
```

Always resolve the alert with a fixed alert key, whatever the notification type:

```bash
apprise -vv -t "Disk" -b "db01 is back to normal" \
   "ilert://il1api0123456789abcdef0123456789abcdef?dedup=db01-disk&action=resolve"
```

When you do not give a title, your message is used as the alert summary.
