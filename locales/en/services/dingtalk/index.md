---
title: "DingTalk Notifications"
description: "Send DingTalk notifications."
sidebar:
  label: "DingTalk"

source: https://www.dingtalk.com/

schemas:
  - dingtalk

has_sms: true

sample_urls:
  - dingtalk://{ApiKey}/{ToPhoneNo}
  - dingtalk://{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}
  - dingtalk://{Secret}@{ApiKey}/{ToPhoneNo}
  - dingtalk://{Secret}@{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use DingTalk, you will need to acquire your _API Key_.

## Syntax

Valid syntax is as follows:

- `dingtalk://{ApiKey}/{ToPhoneNo}`
- `dingtalk://{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`
- `dingtalk://{Secret}@{ApiKey}/{ToPhoneNo}`
- `dingtalk://{Secret}@{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                               |
| --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| ApiKey    | Yes      | The _API Key_ associated with your DingTalk account. This is available to you via the DingTalk Dashboard. |
| ToPhoneNo | No       | A phone number to send your notification to                                                               |
| Secret    | No       | The optional secret key to associate with the message signing                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send an SMS message via DingTalk:

```bash
# Assuming our {APIKey} is gank339l7jk3cjaE
# Assuming our {ToPhoneNo} - is in the US somewhere making our country code +1
#                            - identifies as 1-123-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   dingtalk://gank339l7jk3cjaE/11235551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   dingtalk://gank339l7jk3cjaE/1-(123) 555-1223
```
