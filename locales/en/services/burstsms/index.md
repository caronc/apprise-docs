---
title: "Kudosity Notifications"
description: "Send Kudosity (formerly Burst SMS) notifications."
sidebar:
  label: "Kudosity"

keywords: "burstsms, kudosity"

source: https://kudosity.com/

schemas:
  - burstsms
  - kudosity

has_sms: true

sample_urls:
  - burstsms://{api_key}:{secret}@{sender_id}/{targets}
  - kudosity://{api_key}:{secret}@{sender_id}/{targets}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

You need to have an account with [Kudosity](https://kudosity.com/). Burst SMS is now Kudosity, so an existing Burst SMS account works as is.

In your account, open **Settings** and then **API Settings**. You'll notice that there is already an `API Key` present. Create a `Secret` to go with it. These will be used for your credentials.

Kudosity will set you up with a Sender ID that your notifications will originate from. This must be provided as part of the Apprise URL as well.

Both `burstsms://` and `kudosity://` work the same way.

## Syntax

Valid syntax is as follows:

- `burstsms://{api_key}:{secret}@{sender_id}/{targets}`
- `kudosity://{api_key}:{secret}@{sender_id}/{targets}`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                                                                  |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| api_key   | Yes      | This is the **API Key** associated with your Kudosity Account                                                                                                                                                |
| secret    | Yes      | This is the **Client Secret** associated with your Kudosity Account                                                                                                                                          |
| sender_id | Yes      | This is the **Phone Number** associated with your Kudosity Account.                                                                                                                                          |
| targets   | Yes      | Optionally identify the phone numbers you wish to send your **SMS** Message to.                                                                                                                              |
| country   | No       | Optionally specify the `countrycode` which is either `us`, `gb`, `au` or `nz`. By default this is set to `us`                                                                                                |
| validity  | No       | Optionally define how long an unsent SMS message is valid for (and will be attempted to be resent). By default this is set to zero (0) for the maximum amount of validity. This value is defined in minutes. |
| batch     | No       | Optionally send notifications in a batch (vs individually). By default this is set to `No`.                                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Kudosity Notification:

```bash
# Assuming our {APIKey} is bc1451bd
# Assuming our {APISecret} is gank339l7jk3cjaE
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   burstsms://bc1451bd:gank339l7jk3cjaE@19005559999/18005551223
```
