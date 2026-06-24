---
title: "PushWard Notifications"
description: "Send push notifications to your iPhone via PushWard."
sidebar:
  label: "PushWard"

source: https://pushward.app/

schemas:
  - pushward

has_image: true

sample_urls:
  - pushward://{apikey}
  - pushward://{apikey}?level=critical&volume=0.8

limits:
  - name: "Title"
    max_chars: 256
  - name: "Body"
    max_chars: 3000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use this plugin you need a [PushWard](https://pushward.app/) account and an integration key.

1. Sign in to the PushWard app.
2. Open your settings and copy your **integration key**. It always begins with the prefix `hlk_`.

That single key is all Apprise needs.

:::note
PushWard delivers a single Apple push, which Apple caps at a 4 KB total payload. The title and body share that budget, so very long messages are best split (`?overflow=split`).
:::

## Syntax

Valid syntax is as follows:

- `pushward://{apikey}`
- `pushward://{apikey}?level={level}`

The notification level may be set explicitly; when it is omitted, it is derived from the Apprise notification type.

## Parameter Breakdown

| Variable | Required | Description                                                                                                       |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| apikey   | \*Yes    | Your PushWard integration key (begins with `hlk_`). It may also be supplied as a `?apikey=` query argument.        |
| level    | No       | Forces this level for every notification: `passive`, `active`, `time-sensitive`, or `critical`. Short-forms work too (e.g. `crit`). |
| info / success / warning / failure | No | Override the level used for that notification type (defaults: `active` / `active` / `time-sensitive` / `time-sensitive`). e.g. `?info=passive&failure=critical`. |
| volume   | No       | The alert volume (`0.0`–`1.0`); only applied when the resolved level is `critical`.                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a notification:

```bash
apprise -vv -t "Alert" -b "Something happened." \
   "pushward://hlk_xxxxxxxxxxxx"
```

Send a critical alert at 80% volume:

```bash
apprise -vv -t "Server Down" -b "Production is unreachable." \
   "pushward://hlk_xxxxxxxxxxxx?level=critical&volume=0.8"
```

Example YAML configuration:

```yaml
urls:
  - pushward://hlk_xxxxxxxxxxxx?level=time-sensitive
```
