---
title: "Signalgrid Notifications"
description: "Send push notifications to iOS and Android devices using Signalgrid"
sidebar:
  label: "Signalgrid"

source: https://signalgrid.co/
group: general

schemas:
  - signalgrid

sample_urls:
  - signalgrid://{client_key}/{channel}
  - signalgrid://{client_key}/{channel1}/{channel2}
  - signalgrid://{client_key}/{channel}?critical=true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use Signalgrid with Apprise:

1. Sign in to your Signalgrid account.
2. Obtain your Signalgrid client key.
3. Create or select a channel and copy its channel token.
4. Use the client key and channel token in your Apprise URL.

Additional Signalgrid integration documentation is available at:
[Signalgrid Apprise integration guide](https://docs.signalgrid.co/integrations/apprise/).

## Syntax

Valid syntax is as follows:

- `signalgrid://{client_key}/{channel}`
- `signalgrid://{client_key}/{channel1}/{channel2}`
- `signalgrid://{client_key}/{channel}?critical=true`

You can also supply extra channels with the `to=` parameter instead of (or
in addition to) the URL path:

- `signalgrid://{client_key}/{channel}?to={channel2},{channel3}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| client_key | yes      | Your Signalgrid client key.                                                                                                 |
| channel    | yes      | One or more Signalgrid channel tokens to notify. Each channel receives its own notification.                                |
| to         | no       | A comma-separated list of additional channel tokens to notify, provided as a query argument instead of the URL path.        |
| critical   | no       | Whether the notification should be delivered as a critical notification. Accepts `true` or `false` and defaults to `false`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Notification Types

Apprise notification types are automatically mapped to Signalgrid notification types:

| Apprise | Signalgrid |
| ------- | ---------- |
| info    | INFO       |
| success | SUCCESS    |
| warning | WARN       |
| failure | CRIT       |

The notification type and the `critical` parameter are independent. For example, a notification may use Signalgrid type `CRIT` without being delivered as a critical notification.

## Examples

Send a normal notification:

```bash
apprise -vv \
   -t "Server Status" \
   -b "Server is online" \
   "signalgrid://CLIENT_KEY/CHANNEL?critical=false"
```

Send a critical failure notification:

```bash
apprise -vv \
   -t "Server Down" \
   -b "The server is unreachable" \
   -n failure \
   "signalgrid://CLIENT_KEY/CHANNEL?critical=true"
```

Send the same notification to more than one channel at once:

```bash
apprise -vv \
   -t "Deployment Complete" \
   -b "The latest release is live" \
   "signalgrid://CLIENT_KEY/CHANNEL1/CHANNEL2"
```
