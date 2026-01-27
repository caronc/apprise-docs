---
title: "ClickSend Notifications"
description: "Send ClickSend notifications."
sidebar:
  label: "ClickSend"

source: https://clicksend.com

schemas:
  - clicksend

has_sms: true

sample_urls:
  - clicksend://{user}:{password}@{PhoneNo}
  - clicksend://{user}:{password}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Account Setup

Sign up for ClickSend account [from here](https://clicksend.com). You will be provided to create a user and password to associate with your account. This is all you need to use this through Apprise.

## Syntax

Valid syntax is as follows:

- `clicksend://{user}:{password}@{PhoneNo}`
- `clicksend://{user}:{password}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                            |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Yes      | The _username_ associated with your ClickSend account.                                                                                                                                                                                                                                                                 |
| password | Yes      | The _password_ associated with your ClickSend account.                                                                                                                                                                                                                                                                 |
| PhoneNo  | Yes      | At least one phone number MUST identified to use this plugin. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion.                                                                                                        |
| batch    | No       | ClickSend allows a batch mode. If you identify more then one phone number, you can send all of the phone numbers you identify on the URL in a single shot instead of the normal _Apprise_ approach (which sends them one by one). Enabling batch mode has both pros and cons. By default batch mode is disabled. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a ClickSend Notification as an SMS:

```bash
# Assuming our {user} is l2g
# Assuming our {password} is appriseIsAwesome
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "clicksend://l2g:appriseIsAwesome@18005551223"

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "clicksend://l2g:appriseIsAwesome@1-(800) 555-1223"
```
