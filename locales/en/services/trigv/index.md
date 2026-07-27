---
title: "Trigv Notifications"
description: "Send alerts to one or more Trigv workspace channels."
sidebar:
  label: "Trigv"

source: https://trigv.com/

schemas:
  - trigv: insecure
  - trigvs

has_image: true
has_selfhosted: true

sample_urls:
  - trigvs://{api_key}
  - trigvs://{api_key}/{channel}
  - trigvs://{api_key}/{channel1}/{channel2}
  - trigv://{api_key}@{host}/{channel}

limits:
  - name: "Title"
    max_chars: 255
  - name: "Body"
    max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use this plugin you need a [Trigv](https://trigv.com/) workspace and an ingest API key.

1. Sign in to your Trigv workspace.
2. Under workspace settings, generate an ingest **API key**. It looks like `trgv_AbCdEfGh_0123456789abcdef0123456789abcdef`.
3. Decide which channel slug(s) you want alerts delivered to. If you don't specify one, alerts go to the `general` channel.

## Syntax

Valid syntax is as follows:

- `trigvs://{api_key}`
- `trigvs://{api_key}/{channel}`

Multiple channels can be notified in a single call by separating them with a slash:

- `trigvs://{api_key}/{channel1}/{channel2}`

If you're running your own self-hosted Trigv ingest gateway, you can point Apprise at it directly, with an optional port:

- `trigv://{api_key}@{hostname}/{channel}`
- `trigvs://{api_key}@{hostname}:{port}/{channel}`

`trigv://` talks to your hostname over plain HTTP; `trigvs://` (the default when no hostname is supplied) always uses HTTPS.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                   |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key    | Yes      | Your Trigv workspace ingest API key.                                                                                                          |
| channel    | No       | One or more channel slugs to deliver to (separate multiple channels with a `/` in the URL path). Defaults to `general` when none is supplied. |
| to         | No       | A comma-separated list of additional channel slugs to notify, supplied as a `?to=` query argument.                                            |
| url        | No       | A supplemental URL to attach to the alert (e.g. a link to a dashboard or run).                                                                |
| image_url  | No       | A publicly reachable image URL to display alongside the alert.                                                                                |
| urgency    | No       | Force the delivery urgency to either `standard` or `time_sensitive`. When omitted, failures are automatically escalated to `time_sensitive`.  |
| event_type | No       | A free-form event type label attached to the alert (e.g. `backup.failed`).                                                                    |
| priority   | No       | A Pushover-style priority. Any value of `1` or higher is treated the same as `?urgency=time_sensitive`.                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a simple alert to the default channel:

```bash
apprise -vv -t "Cron" -b "Backup failed" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef"
```

Send to a specific channel with a supplemental link:

```bash
apprise -vv -t "Deploy complete" -b "v2.4.1 shipped to prod" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef/deploys/?url=https://ci.example.com/runs/42"
```

Notify multiple channels at once:

```bash
apprise -vv -t "Disk almost full" -b "/var is at 95%" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef/ops/oncall"
```

Force time-sensitive delivery:

```bash
apprise -vv -t "Disk almost full" -b "/var is at 95%" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef/?urgency=time_sensitive"
```

Talk to a self-hosted ingest gateway on a custom port instead of api.trigv.com:

```bash
apprise -vv -t "Test" -b "Hello from a local gateway" \
   "trigv://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef@trigv.internal.example.com:8080/general"
```
