---
title: "ServerChan Notifications"
description: "Send ServerChan notifications."
sidebar:
  label: "ServerChan"

source: https://sct.ftqq.com/

schemas:
  - schan

sample_urls:
  - schan://{sendkey}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Register your own account on the [ServerChan Official Website](https://sct.ftqq.com/). After configure the notify channel, you will be provided the sendkey/token used for notifications.

## Syntax

Valid syntax is as follows:

- `schan://{sendkey}`

## Parameter Breakdown

| Variable | Required | Description                                                    |
| -------- | -------- | -------------------------------------------------------------- |
| sendkey  | Yes      | This is token provided to you through your SimpleChan account. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a SimpleChan notification:

```bash
# Assume:
#  - our {sendkey} is ABC123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   schan://ABC123
```
