---
title: "YouLMK Notifications"
description: "Send notifications to your YouLMK inbox by phone, browser, email, Slack, or webhook, using rules set for each sender."
sidebar:
  label: "YouLMK"

source: https://youlmk.com/

schemas:
  - youlmk

sample_urls:
  - youlmk://{token}
  - youlmk://{key}
  - youlmk://{token}?priority={priority}
  - youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}
  - youlmk://{token}?url={link}&group={group}

has_image: true

limits:
  - name: "Title"
    max_chars: 120
  - name: "Body"
    max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[YouLMK](https://youlmk.com/) is a hosted notification inbox. Any HTTP client can send it a message. For each sender (a _source_), you choose its reach (Silent, Badge, Banner, or Break through), whether it respects quiet hours, and how repeated messages are grouped. Notifications can arrive on your phone, in your browser, by email, in Slack, or through your own webhook.

1. Sign in at [youlmk.com](https://youlmk.com/) or in the app and create a source for the sender (for example, `apprise`). Every source has its own key and rules.
2. Open the source's **Key** screen. Either credential shown there works:
   - the bearer token, `ylk_` followed by 32 characters
   - the URL key, `k_` followed by 14 characters

The trial includes 10 notifications and 3 watches without a credit card. Afterward, Send costs $4 per month.

## Syntax

Valid syntax is as follows:

- `https://youlmk.com/k/{key}`
- `youlmk://{token}`
- `youlmk://{key}`
- `youlmk://{token}?priority={priority}`
- `youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}`
- `youlmk://{token}?url={link}&url_label={label}&group={group}`

The priority may be forced for every notification with `?priority=`, or set per Apprise notification type with `?info=`, `?success=`, `?warning=` and `?failure=`. When omitted, it is derived from the notification type:

| Apprise Type | YouLMK Priority |
| ------------ | --------------- |
| `info`       | `normal`        |
| `success`    | `normal`        |
| `warning`    | `high`          |
| `failure`    | `high`          |

`critical` is never a default: it may break through quiet hours and Focus when the source allows it, so it is opted into. The source's Reach stays the ceiling; a priority only moves down from it.

## Parameter Breakdown

| Variable                           | Required | Description                                                                                                                                          |
| ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| token                              | \*Yes    | The source's bearer token (`ylk_` and 32 characters) or its URL key (`k_` and 14 characters). It may also be supplied as a `?token=` query argument. |
| priority                           | No       | Forces this priority for every notification: `low`, `normal`, `high` or `critical`. Short-forms work too (e.g. `crit`).                              |
| info / success / warning / failure | No       | Override the priority used for that notification type (defaults: `normal` / `normal` / `high` / `high`). e.g. `?info=low&failure=critical`.          |
| url                                | No       | The address behind the notification's primary button, for example the run or the log it is about.                                                    |
| url_label                          | No       | The wording on that button, up to 24 characters. Anything longer is trimmed. YouLMK writes **Open** when this is left out.                           |
| group                              | No       | Notifications with the same group within ten minutes become one card with a count. Defaults to the title.                                            |
| image                              | No       | Set to `yes` to put Apprise's notification-type image on the card in place of your source's own icon. Defaults to `no`.                              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification:

```bash
apprise -vv -t "Backup finished" -b "4.2 GB in 3 min 10 s" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

The same with the URL key:

```bash
apprise -vv -t "Backup finished" -b "4.2 GB in 3 min 10 s" \
   "youlmk://k_xxxxxxxxxxxxxx"
```

Make every failure critical, with a labelled link to the log:

```bash
apprise -vv -n failure -t "Backup failed" -b "exit 2" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical&url=https://example.com/logs/2041&url_label=View%20log"
```

Example YAML configuration:

```yaml
urls:
  - youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical
  - youlmk://k_xxxxxxxxxxxxxx?priority=low&group=nightly&image=yes
```
