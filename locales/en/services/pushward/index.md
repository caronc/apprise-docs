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
  - pushward://{apikey}?key={key}

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
- `pushward://{apikey}?key={key}`

The notification level may be set explicitly via `?level=` to force the same level for every notification, or you may fine-tune each Apprise type individually using `?info=`, `?success=`, `?warning=`, and `?failure=`. When omitted, the level is derived automatically from the Apprise notification type using the following defaults:

| Apprise Type | PushWard Level   |
| ------------ | ---------------- |
| `info`       | `active`         |
| `success`    | `active`         |
| `warning`    | `time-sensitive` |
| `failure`    | `time-sensitive` |

## Encryption

PushWard can end-to-end encrypt your notifications so that neither the PushWard server nor Apple's push service sees the title, subtitle, body or link.

1. In the PushWard app (1.17.0 or later), open **Settings > End-to-End Encryption**, create a key and copy it.
2. Add that key to your Apprise URL with `?key=`. It is 64 hexadecimal characters.

```bash
apprise -vv -t "Disk Full" -b "Only 5% left." \
   "pushward://hlk_xxxxxxxxxxxx?key=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
```

The level, sender and options such as `ack`, `thread` and `snooze` stay readable, because the server needs them to deliver the notification.

:::note
Encryption requires the `cryptography` Python package:

```bash
pip install cryptography
```

Once a `key` is set, Apprise never sends your message unencrypted. If `cryptography` is not installed, the key is not 64 hexadecimal characters, or `key=` is left blank, Apprise refuses to load the URL. An encrypted notification holds about 2240 characters of title and body together; a longer one is not sent and Apprise logs a warning.
:::

:::caution
Anyone with your encryption key can read your notifications. Keep it as private as your integration key.
:::

See PushWard's [encryption documentation](https://pushward.app/docs/notifications/encryption) for more on how it works.

## Parameter Breakdown

| Variable                           | Required | Description                                                                                                                                                      |
| ---------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey                             | \*Yes    | Your PushWard integration key (begins with `hlk_`). It may also be supplied as a `?apikey=` query argument.                                                      |
| level                              | No       | Forces this level for every notification: `passive`, `active`, `time-sensitive`, or `critical`. Short-forms work too (e.g. `crit`).                              |
| info / success / warning / failure | No       | Override the level used for that notification type (defaults: `active` / `active` / `time-sensitive` / `time-sensitive`). e.g. `?info=passive&failure=critical`. |
| volume                             | No       | The alert volume (`0.0`–`1.0`); only applied when the resolved level is `critical`.                                                                              |
| ack                                | No       | Set to `yes` to repeat the notification until someone taps **Acknowledge**. The default is `no`.                                                                 |
| repeat                             | No       | Seconds between repeats, from `30` to `3600`. The default is `60`. Only used with `ack`.                                                                         |
| expire                             | No       | Seconds before the repeats stop, from `60` to `10800`. The default is `3600`. Only used with `ack`.                                                              |
| url                                | No       | A link opened when the notification is tapped, up to 2048 characters.                                                                                            |
| subtitle                           | No       | A line shown under the title, up to 256 characters.                                                                                                              |
| thread                             | No       | Groups notifications that share the same value, up to 128 characters.                                                                                            |
| collapse                           | No       | A later notification with the same value replaces this one, up to 64 characters.                                                                                 |
| snooze                             | No       | Adds up to 3 snooze buttons, given as different durations in minutes from `1` to `1440`. For example `?snooze=15,60`. Cannot be combined with `ack`.             |
| key                                | No       | The encryption key from the PushWard app, 64 hexadecimal characters. Requires the `cryptography` Python package. See [Encryption](#encryption) above.            |
| e2ee                               | No       | Set to `no` to send readable text even though a `key` is set. The default is `yes`.                                                                              |

:::note
With `ack=yes`:

- PushWard sends at most 50 repeats, and an account can have up to 25 notifications repeating at once.
- A notification sent at the `passive` level is delivered without repeating, since PushWard does not allow it at that level.
- `ack` cannot be combined with `snooze`.

:::

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
