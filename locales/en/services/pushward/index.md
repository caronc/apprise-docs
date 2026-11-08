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
  - pushward://{apikey}?ack=yes&repeat=120&expire=1800
  - pushward://{apikey}?snooze=15,60

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
- `pushward://{apikey}?info={level}&success={level}&warning={level}&failure={level}`
- `pushward://{apikey}?ack=yes&repeat={seconds}&expire={seconds}`
- `pushward://{apikey}?snooze={minutes},{minutes}`

The notification level may be set explicitly via `?level=` to force the same level for every notification, or you may fine-tune each Apprise type individually using `?info=`, `?success=`, `?warning=`, and `?failure=`. When omitted, the level is derived automatically from the Apprise notification type using the following defaults:

| Apprise Type | PushWard Level   |
| ------------ | ---------------- |
| `info`       | `active`         |
| `success`    | `active`         |
| `warning`    | `time-sensitive` |
| `failure`    | `time-sensitive` |

## Parameter Breakdown

| Variable                           | Required | Description                                                                                                                                                                                                          |
| ---------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey                             | \*Yes    | Your PushWard integration key (begins with `hlk_`). It may also be supplied as a `?apikey=` query argument.                                                                                                          |
| level                              | No       | Forces this level for every notification: `passive`, `active`, `time-sensitive`, or `critical`. Short-forms work too (e.g. `crit`).                                                                                  |
| info / success / warning / failure | No       | Override the level used for that notification type (defaults: `active` / `active` / `time-sensitive` / `time-sensitive`). e.g. `?info=passive&failure=critical`.                                                     |
| volume                             | No       | The alert volume (`0.0`–`1.0`); only applied when the resolved level is `critical`.                                                                                                                                  |
| ack                                | No       | Set to `yes` to repeat the notification until someone taps Acknowledge. The default is `no`. Not sent when the resolved level is `passive`, and cannot be combined with `snooze`. Up to 25 can be repeating at once. |
| repeat                             | No       | Seconds between repeats (`30`-`3600`, default `60`); only applied with `ack`. At most 50 repeats are sent.                                                                                                           |
| expire                             | No       | Seconds before repeating stops (`60`-`10800`, default `3600`); only applied with `ack`.                                                                                                                              |
| url                                | No       | A link opened from the notification, up to 2048 characters.                                                                                                                                                          |
| subtitle                           | No       | A line shown under the title, up to 256 characters.                                                                                                                                                                  |
| thread                             | No       | Groups notifications together. Up to 128 characters.                                                                                                                                                                 |
| collapse                           | No       | A later notification with the same value replaces this one. Up to 64 characters.                                                                                                                                     |
| snooze                             | No       | Up to 3 snooze buttons, as different durations in minutes (`1`-`1440`), e.g. `?snooze=15,60`.                                                                                                                        |

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

Map individual Apprise notification types to different PushWard levels:

```bash
apprise -vv -t "Info" -b "Deployment finished." \
   "pushward://hlk_xxxxxxxxxxxx?info=passive&failure=critical"
```

Repeat a notification every 2 minutes, for up to 30 minutes, until someone acknowledges it:

```bash
apprise -vv -t "Disk Full" -b "Only 5% left." \
   "pushward://hlk_xxxxxxxxxxxx?ack=yes&repeat=120&expire=1800"
```

Offer snooze buttons and group the notifications together:

```bash
apprise -vv -t "Backup Done" -b "Nightly backup finished." \
   "pushward://hlk_xxxxxxxxxxxx?snooze=15,60&thread=backups"
```

Example YAML configuration:

```yaml
urls:
  - pushward://hlk_xxxxxxxxxxxx?level=time-sensitive
  - pushward://hlk_xxxxxxxxxxxx?info=passive&warning=time-sensitive&failure=critical
```
