---
title: "httpSMS Notifications"
description: "Send httpSMS notifications."
sidebar:
  label: "httpSMS"

source: https://httpsms.com/

schemas:
  - httpsms

has_sms: true

sample_urls:
  - httpsms://{apikey}@{fromPhoneNo}
  - httpsms://{apikey}@{fromPhoneNo}/{target}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Sign up for httpSMS [from here](https://httpsms.com/). You will be then be able to access the /settings section of your account to obtain your API Key which you will need to use the Apprise Integration with (as `{apikey}`)

## Syntax

Valid syntax is as follows:

- `httpsms://{apikey}@{fromPhoneNo}`
- `httpsms://{apikey}@{fromPhoneNo}/{target}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | The API Key associated with your httpSMS Account ([visit here](https://httpsms.com/settings) to acquire it).                                                    |
| to       | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`. |
| from     | **\*No** | Specify the phone number you registered with httpSMS you wish the message to be identified as being sent from.                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a httpSMS Message:

```bash
# Assuming our {apikey} is hard-to-guess
# Assuming our {PhoneNo} associated with our account is +1800-555-4444
# Assuming our {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   httpsms://hard-to-guess@+1800-555-4444/+134-555-1223
```
