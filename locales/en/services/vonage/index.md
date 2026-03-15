---
title: "Vonage (formerly Nexmo) Notifications"
description: "Send Vonage (formerly Nexmo) notifications."
sidebar:
  label: "Vonage (formerly Nexmo)"

source: https://nexmo.com/

schemas:
  - nexmo
  - vonage

has_sms: true

sample_urls:
  - vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo}
  - vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Account Setup

To use Vonage, you will need to acquire your _API Key_ and _API Secret_. Both of these are accessible via the [Vonage Dashboard](https://dashboard.nexmo.com/getting-started-guide).

The **{FromPhoneNo}** must be a number provided to you through Nexmo

## Syntax

Valid syntax is as follows (both `vonage://` and `nexmo://` are accepted aliases; `nexmo://` is the legacy name):

- `vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo}`
- `vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

If no _ToPhoneNo_ is specified, then the _FromPhoneNo_ will be messaged instead; hence the following is a valid URL:

- `vonage://{ApiKey}:{ApiSecret}@{FromPhoneNo}/`

## Parameter Breakdown

| Variable    | Required | Description                                                                                                                                                                                                                         |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey      | Yes      | The _API Key_ associated with your Nexmo account. This is available to you via the [Vonage Dashboard](https://dashboard.nexmo.com/getting-started-guide).                                                                           |
| ApiSecret   | Yes      | The _API Secret_ associated with your Nexmo account. This is available to you via the [Vonage Dashboard](https://dashboard.nexmo.com/getting-started-guide).                                                                        |
| FromPhoneNo | Yes      | This must be a _From Phone Number_ that has been provided to you from the Vonage website.                                                                                                                                           |
| PhoneNo     | **\*No** | A phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Vonage Notification as an SMS:

```bash
# Assuming our {APIKey} is bc1451bd
# Assuming our {APISecret} is gank339l7jk3cjaE
# Assuming our {FromPhoneNo} is +1-900-555-9999
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   vonage://bc1451bd:gank339l7jk3cjaE@19005559999/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   vonage://bc1451bd:gank339l7jk3cjaE@1-(900) 555-9999/1-(800) 555-1223
```
