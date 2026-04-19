---
title: "Notifications Octopush"
description: "Envoyer Octopush notifications."
sidebar:
  label: "Octopush"

source: https://octopush.com/

schemas:
  - octopush

has_sms: true

sample_urls:
  - octopush://{api_login}/{api_key}/{phone_no}
  - octopush://{api_login}/{api_key}/{phone_no1}/{phone_no2}/{phone_noN}
  - octopush://{sender}:{api_login}/{api_key}/{phone_no}
  - octopush://_?login={api_login}&key={api_key}&sender={sender}&to={phone_no}

limits:
  max_chars: 1224
---

<!-- SERVICE:DETAILS -->

## Account setup

To use Octopush, you will need your _API Login_ and _API Key_. The API login
is the email address associated with your Octopush account.

You can also optionally configure a _Sender_ value. Octopush accepts an
alphanumeric sender of 3 to 11 characters for supported routes.

## Syntaxe

La syntaxe valide est la suivante :

- `octopush://{api_login}/{api_key}/{phone_no}`
- `octopush://{api_login}/{api_key}/{phone_no1}/{phone_no2}/{phone_noN}`
- `octopush://{sender}:{api_login}/{api_key}/{phone_no}`
- `octopush://{sender}:{api_login}/{api_key}/{phone_no1}/{phone_no2}?batch=yes`

You can also pass values as query parameters:

- `octopush://_?login={api_login}&key={api_key}&to={phone_no}`
- `octopush://_?login={api_login}&key={api_key}&sender={sender}&to={phone_no}&type=sms_low_cost`

## Detail des parametres

| Variable  | Required | Description                                                                                                                                                                                                                                                      |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_login | Yes      | The _API Login_ associated with your Octopush account. This must be a valid email address.                                                                                                                                                                       |
| api_key   | Yes      | The _API Key_ associated with your Octopush account.                                                                                                                                                                                                             |
| sender    | No       | An optional sender ID to display when your Octopush route supports it.                                                                                                                                                                                           |
| phone_no  | Yes      | At least one phone number must be identified to use this plugin. This field is also very friendly and supports brackets, spaces, and hyphens in the event you want to format the number in an easy to read fashion.                                              |
| batch     | No       | Octopush allows a batch mode. If you identify more than one phone number, you can send all of the phone numbers you identify in the URL in a single shot instead of the normal Apprise approach, which sends them one by one. By default batch mode is disabled. |
| replies   | No       | When set to `yes`, Apprise requests reply handling through Octopush. By default this is `no`.                                                                                                                                                                    |
| purpose   | No       | The message purpose. Supported values are `alert` and `wholesale`. By default this is `alert`.                                                                                                                                                                   |
| type      | No       | The message type. Supported values are `sms_premium` and `sms_low_cost`. By default this is `sms_premium`.                                                                                                                                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer an Octopush notification as an SMS:

```bash
# Assuming our {api_login} is user@example.com
# Assuming our {api_key} is my-api-key
# Assuming our {phone_no} is in the US making our country code +1
#                         and identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "octopush://user@example.com/my-api-key/18005551223"

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "octopush://user@example.com/my-api-key/1-(800) 555-1223"
```

Envoyer via a sender ID and the low-cost route:

```bash
# Assuming our {api_login} is user@example.com
# Assuming our {api_key} is my-api-key
# Assuming our {sender} is MyCompany
# Assuming our {phone_no} is +33-6-00-01-02-03
apprise -vv -b "Your order has shipped" \
   "octopush://MyCompany:user@example.com/my-api-key/33600010203?type=sms_low_cost"
```

Envoyer one message to multiple targets using Octopush batch mode:

```bash
# Assuming our {api_login} is user@example.com
# Assuming our {api_key} is my-api-key
# Assuming our {sender} is MyCompany
# Assuming our {phone_no1} is +33-6-00-01-02-03
# Assuming our {phone_no2} is +33-6-00-01-02-04
apprise -vv -b "System maintenance starts in 15 minutes" \
   "octopush://MyCompany:user@example.com/my-api-key/33600010203/33600010204?batch=yes&purpose=alert"
```
