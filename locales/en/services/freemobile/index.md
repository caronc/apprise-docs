---
title: "Free-Mobile Notifications"
description: "Send Free-Mobile notifications."
sidebar:
  label: "Free-Mobile"

source: https://mobile.free.fr

schemas:
  - freemobile

has_sms: true

sample_urls:
  - freemobile://{user}@{password}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign up with Free Mobile ([link](https://mobile.free.fr/)) and use your credentials (user and pass) to send a notification.

## Syntax

Valid syntax is as follows:

- `freemobile://{user}@{password}`

## Parameter Breakdown

| Variable | Required | Description                                                                      |
| -------- | -------- | -------------------------------------------------------------------------------- |
| user     | Yes      | The user associated with your [Free-Mobile Account](https://mobile.free.fr/)     |
| password | Yes      | The password associated with your [Free-Mobile Account](https://mobile.free.fr/) |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Free-Mobile Notification:

```bash
# Assuming our {user} is abc123
# Assuming our {password} is 98765
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "freemobile://abc123@98765"
```
