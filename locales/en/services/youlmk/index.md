---
title: "YouLMK Notifications"
description: "Send notifications to your YouLMK inbox: your phone, the browser, email, Slack or a webhook you own, with the rules you set per sender."
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

limits:
  - name: "Title"
    max_chars: 120
  - name: "Body"
    max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[YouLMK](https://youlmk.com/) is a hosted notification inbox. Anything with an HTTP client sends into it, and you decide per sender (a _source_) how far a message may reach (Silent, Badge, Banner, Break through), whether quiet hours hold it, and how repeats group. A notification lands on your phone, in your browser, in email, in Slack, or on a webhook you own.

1. Sign in at [youlmk.com](https://youlmk.com/) or in the app and create a source for the thing that will send (for example `apprise`). Every source has its own key and its own rules.
2. Open the source's **Key** screen. It shows two credentials, and either one works here:
   - the bearer token, `ylk_` followed by 32 characters
   - the URL key, `k_` followed by 14 characters

The trial is 10 notifications and 3 watches, no card; after that Send is $4 a month.

## Syntax

Valid syntax is as follows:

- `youlmk://{token}`
- `youlmk://{key}`
- `youlmk://{token}?priority={priority}`
- `youlmk://{token}?info={priority}&success={priority}&warning={priority}&failure={priority}`
- `youlmk://{token}?url={link}&group={group}`

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
| group                              | No       | Notifications with the same group within ten minutes become one card with a count. Defaults to the title.                                            |

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

Make every failure critical, with a link to the log:

```bash
apprise -vv -n failure -t "Backup failed" -b "exit 2" \
   "youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical&url=https://example.com/logs/2041"
```

Example YAML configuration:

```yaml
urls:
  - youlmk://ylk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?failure=critical
  - youlmk://k_xxxxxxxxxxxxxx?priority=low&group=nightly
```
