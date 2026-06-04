---
title: "Parse Platform Notifications"
description: "Send Parse Platform notifications."
sidebar:
  label: "Parse Platform"

source: https://parseplatform.org/

schemas:
  - parsep: insecure
  - parseps

has_selfhosted: true

sample_urls:
  - parsep://{app_id}:{master_key}@{hostname}
  - parseps://{app_id}:{master_key}@{hostname}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

## Syntax

Channels are optional; if no channel is specified then you are just personally notified.

Valid syntax is as follows:

- `parsep://{app_id}:{master_key}@{hostname}`
- `parseps://{app_id}:{master_key}@{hostname}`

## Parameter Breakdown

| Variable   | Required | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| app_id     | Yes      | The Application ID                                  |
| master_key | Yes      | This is the Master Key associated with your account |
| hostname   | Yes      | The Hostname of your Parse Platform Server          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Parse Platform notification

```bash
# Assume:
#  - our {app_id} is abc123
#  - our {master_key} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
#  - our {hostname} is parseplatform.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   parsep://app_id:master_key@parseplatform.local
```
