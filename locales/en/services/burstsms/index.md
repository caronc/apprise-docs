---
title: "Burst SMS Notifications"
description: "Send Burst SMS notifications."
sidebar:
  label: "Burst SMS"

source: https://burstsms.com/

schemas:
  - burstsms

has_sms: true

sample_urls:
  - burstsms://{api_key}:{secret}@{sender_id}/{targets}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Account Setup

You need to have an account with [Burst SMS](https://burstsms.com/). Visit your profile options and create a `Secret` to associate with your account. You'll notice that there is already an `API Key` present. These will be used for your credentials.

Burst SMS will set you up with a Sender ID that you're notifications will originate from. This must be provided as part of the Apprise URL as well.

## Syntax

Valid syntax is as follows:

- `burstsms://{api_key}:{secret}@{sender_id}/{targets}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                                                                  |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| api_key   | Yes      | This is the **API Key** associated with your Bulk SMS Account                                                                                                                                                |
| secret    | Yes      | This is the **Client Secret** associated with your Bulk SMS Account                                                                                                                                          |
| sender_id | Yes      | This is the **Phone Number** associated with your Bulk SMS Account.                                                                                                                                          |
| targets   | Yes      | Optionally identify the phone numbers you wish to send your **SMS** Message to.                                                                                                                              |
| country   | No       | Optionally specify the `countrycode` which is either `en`, `gb`, `au` or `nz`. By default this is set to `us`                                                                                                |
| validity  | No       | Optionally define how long an unsent SMS message is valid for (and will be attempted to be resent). By default this is set to zero (0) for the maximum amount of validity. This value is defined in minutes. |
| batch     | No       | Optionally send notifications in a batch (vs individually). By default this is set to `No`.                                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Burst SMS Notification:

```bash
# Assuming our {APIKey} is bc1451bd
# Assuming our {APISecret} is gank339l7jk3cjaE
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   burstsms://bc1451bd:gank339l7jk3cjaE@19005559999/18005551223
```
