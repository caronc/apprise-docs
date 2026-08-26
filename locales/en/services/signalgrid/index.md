---
title: "Signalgrid Notifications"
description: "Send push notifications to iOS and Android devices using Signalgrid"
sidebar:
  label: "Signalgrid"

source: https://signalgrid.co/
group: general

schemas:
  - signalgrid://

sample_urls:
  - signalgrid://{client_key}/{channel}
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
- `signalgrid://{client_key}/{channel}?critical=true`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                 |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| client_key | yes      | Your Signalgrid client key.                                                                                                 |
| channel    | yes      | The Signalgrid channel token that receives the notification.                                                                |
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
