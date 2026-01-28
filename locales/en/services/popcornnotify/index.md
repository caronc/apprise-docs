---
title: "PopcornNotify Notifications"
description: "Send PopcornNotify notifications."
sidebar:
  label: "PopcornNotify"

source: https://popcornnotify.com

schemas:
  - popcorn

sample_urls:
  - popcorn://{ApiKey}/{PhoneNo}/
  - popcorn://{ApiKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}/
  - popcorn://{ApiKey}/{Email}/
  - popcorn://{ApiKey}/{Email1}/{Email2}/{EmailN}/
---

<!-- SERVICE:DETAILS -->

## Account Setup

Get yourself an API Key from [their website](https://popcornnotify.com/) and you're already to use the service.

## Syntax

Valid syntax is as follows:

- `popcorn://{ApiKey}/{PhoneNo}/`
- `popcorn://{ApiKey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}/`
- `popcorn://{ApiKey}/{Email}/`
- `popcorn://{ApiKey}/{Email1}/{Email2}/{EmailN}/`

You can mix and match the information too:

- `popcorn://{ApiKey}/{PhoneNo1}/{Email1}/{EmailN}/{PhoneNoN}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                                                                                   |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey   | Yes      | The Personal API Token associated with your account.                                                                                                                                                                                                                                                                          |
| PhoneNo  | No       | A Phone Number you wish to notify (via SMS).                                                                                                                                                                                                                                                                                  |
| Email    | No       | The Email address you wish to notify                                                                                                                                                                                                                                                                                          |
| to       | No       | This is an alias to the Phone/Email variable.                                                                                                                                                                                                                                                                                 |
| batch    | No       | PopcornNotify allows a batch mode. If you identify more then one phone number and/or email, you can send all of these targets you identify on the URL in a single shot instead of the normal _Apprise_ approach (which sends them one by one). Enabling batch mode has both pros and cons. By default batch mode is disabled. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a PopcornNotify notification as an SMS:

```bash
# Assuming our {ApiKey} is abc123456
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   popcorn:///abc123456/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   popcorn:///abc123456/1-(800) 555-1223
```

You can also send emails just as easily:

```bash
# Assuming our {ApiKey} is abc123456
# Assuming our {Email} is user@example.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   popcorn:///abc123456/user@example.com
```
