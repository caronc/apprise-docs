---
title: "Kavenegar Notifications"
description: "Send Kavenegar notifications."
sidebar:
  label: "Kavenegar"

source: https://kavenegar.com

schemas:
  - kavenegar

has_sms: true

sample_urls:
  - kavenegar://{apikey}/{to_phone_no}
  - kavenegar://{from_phone_no}@{apikey}/{to_phone_no}
  - kavenegar://{apikey}/{to_phone_no}/{to_phone_no2}/{to_phone_noN}/

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use Kavenegar, first register an account on [their website](https://kavenegar.com/). After you've done so, you can get your API Key from the [account profile](https://panel.kavenegar.com/client/setting/account) section.

## Syntax

Valid syntax is as follows:

- `kavenegar://{apikey}/{to_phone_no}`
- `kavenegar://{from_phone_no}@{apikey}/{to_phone_no}`
- `kavenegar://{apikey}/{to_phone_no}/{to_phone_no2}/{to_phone_noN}/`
- `kavenegar://{from_phone_no}@{apikey}/{to_phone_no}/{to_phone_no2}/{to_phone_noN}/`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                                                              |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey      | Yes      | The _API Key_ associated with your Kavengar account. This is available to you via the [account profile](https://panel.kavenegar.com/client/setting/account) section of their website (after logging in). |
| ToPhoneNo   | Yes      | Kavengar does not handle the `+` in front of the country codes. You need to substitute the correct amount of zero's in front of the outbound number in order for the call to be completed.               |
| FromPhoneNo | No       | The number you wish to identify your call is coming from. This argument is optional.                                                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Kavenegar Notification as an SMS:

```bash
# Assuming our {ApiKey} is gank339l7jk3cjaE
# Assuming our {PhoneNo} - is in the US somewhere making our country code 001
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   kavenegar://gank339l7jk3cjaE/0018005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   kavenegar://gank339l7jk3cjaE/001 - (800) 555-1223
```
