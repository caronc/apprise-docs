---
title: "PushMe Notifications"
description: "Send PushMe notifications."
sidebar:
  label: "PushMe"

source: https://push.i-i.me/

schemas:
  - pushme

sample_urls:
  - pushme://{token}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

You need to have an account with [PushMe](https://push.i-i.me/) and have downloaded the Phone App.

## Syntax

Valid syntax is as follows:

- `pushme://{token}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                      |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Yes      | This is the **push_key** associated with your PushMe Account                                                                                     |
| status   | No       | Optionally include a small little ASCII string representing the notification status being sent (inline with it) by default this is set to `yes`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a PushMe notification:

```bash
# Assuming our {token} (or {push_key}) is abc123

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushme://abc123
```
