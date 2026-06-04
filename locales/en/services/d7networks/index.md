---
title: "Direct 7 (D7) Networks Notifications"
description: "Send D7 Networks notifications."
sidebar:
  label: "Direct 7 (D7) Networks"

source: https://d7networks.com

schemas:
  - d7sms

has_sms: true

sample_urls:
  - d7sms://{token}@{PhoneNo}
  - d7sms://{token}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

To use this service you will need a D7 Networks account from their [website](https://d7networks.com/)

After you've established your account you can get your API Token from the API Details section from within your [account profile area](https://d7networks.com/accounts/profile/).

## Syntax

Valid syntax is as follows:

- `d7sms://{token}@{PhoneNo}`
- `d7sms://{token}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                        |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Yes      | The _API Token_ associated with your D7 Networks account. This is available to you via the **API Details** section from within your [account profile area](https://d7networks.com/accounts/profile/).                                                                                                              |
| PhoneNo  | Yes      | At least one phone number MUST identified to use this plugin. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion.                                                                                                    |
| from     | No       | Originating address,In cases where the rewriting of the sender's address is supported or permitted by the SMS-C. This is used to transmit the message, this number is transmitted as the originating address and is completely optional.                                                                           |
| unicode  | No       | Message should be set to `unicode`. By default this is set `False`. When set to `False` (default), in the background: an `auto` switch is specified allowing D7 Networks to detect the message type on its own. Set this to `True` if you want to enforce all messages to be of type `unicode`.                    |
| batch    | No       | D7 Networks allows a batch mode. If you identify more then one phone number, you can send all of the phone numbers you identify on the URL in a single shot instead of the normal _Apprise_ approach (which sends them one by one). Enabling batch mode has both pros and cons. By default batch mode is disabled. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a SMS message through D7 Networks:

```bash
# Assuming our {token} is AJfkafjA4Baghkr0Zkjk
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "d7sms://AJfkafjA4Baghkr0Zkjk@18005551223"

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "d7sms://AJfkafjA4Baghkr0Zkjk@1-(800) 555-1223"
```
