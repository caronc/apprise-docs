---
title: "Viber Notifications"
description: "Send Viber Bot notifications."
sidebar:
  label: "Viber"

source: https://www.viber.com/

schemas:
  - viber

sample_urls:
  - viber://{token}/{receiver}
  - viber://{token}/{receiver1}/{receiver2}/{receiverN}

limits:
  max_chars: 30000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Viber notifications are delivered using the **Viber Bot (Public Account) REST API**.  
Authentication is handled using a single bot authentication token.

Important: Viber bots may **only send messages to users who have subscribed to the bot**. You cannot message arbitrary users or phone numbers.

To get started:

1. Create a Viber Bot using the Viber Developers portal.
2. Retrieve your **Bot Authentication Token** (also referred to as an app key).
3. Capture one or more **receiver IDs** from bot callback events such as `subscribed` or `message`.
4. Use the token and receiver IDs with the `viber://` Apprise URL.

## Syntax

Valid syntax is as follows:

- `viber://{token}/{receiver}`
- `viber://{token}/{receiver1}/{receiver2}/{receiverN}`

Where `{receiver}` values are Viber receiver IDs associated with users who have subscribed to your bot.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                 |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| token    | Yes      | Viber bot authentication token (sent as `X-Viber-Auth-Token`).                                                              |
| receiver | Yes      | One or more Viber receiver IDs (bot subscribers).                                                                           |
| from     | No       | Sender display name shown in Viber. Defaults to the Apprise application name and is truncated to 28 characters if required. |
| avatar   | No       | URL to an avatar image for the sender.                                                                                      |
| to       | No       | Alias for receiver IDs. Accepts a comma-separated list for convenience.                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a message to a single receiver:

```bash
apprise -vv -b "Hello from Apprise" \
  "viber://MYTOKEN/RECEIVER_ID"
```

Send a message to multiple receivers:

```bash
apprise -vv -b "Deployment completed successfully" \
  "viber://MYTOKEN/ID1/ID2/ID3"
```

Send a message using the `to=` alias and custom sender details:

```bash
apprise -vv -b "System Alert" \
  "viber://MYTOKEN/?to=ID1,ID2&from=Apprise&avatar=https://example.com/avatar.png"
```
