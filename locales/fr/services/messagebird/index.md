---
title: "Notifications MessageBird"
description: "Envoyer MessageBird notifications."
sidebar:
  label: "MessageBird"

source: https://messagebird.com

schemas:
  - msgbird

has_sms: true

sample_urls:
  - msgbird://{ApiKey}/{FromPhoneNo}
  - msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo}
  - msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}
limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use MessageBird, you will need to acquire your _API Key_. This is accessible via the [MessageBird Dashboard](https://dashboard.messagebird.com/en/user/index).

## Syntaxe

La syntaxe valide est la suivante :

- `msgbird://{ApiKey}/{FromPhoneNo}`
- `msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo}`
- `msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`

## Detail des parametres

| Variable    | Required | Description                                                                                                                                                                                                                                                                                                           |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey      | Yes      | The _API Key_ associated with your MessageBird account. This is available to you via the [MessageBird Dashboard](https://dashboard.messagebird.com/en/user/index).                                                                                                                                                    |
| FromPhoneNo | Yes      | A from phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion. This MUST be the the number you registered with your _MessageBird_ account. |
| ToPhoneNo   | No       | A to phone number MUST include the country codes dialling prefix as well when placed. This field is also very friendly and supports brackets, spaces and hyphens in the event you want to format the number in an easy to read fashion. If no _ToPhoneNo_ is specified, then the _FromPhoneNo_ is notified instead.   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une MessageBird Notification as an SMS:

```bash
# Assuming our {APIKey} is gank339l7jk3cjaE
# Assuming our {FromPhoneNo} - is in the US somewhere making our country code +1
#                            - identifies as 1-123-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   msgbird://gank339l7jk3cjaE/11235551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   msgbird://gank339l7jk3cjaE/1-(123) 555-1223
```
