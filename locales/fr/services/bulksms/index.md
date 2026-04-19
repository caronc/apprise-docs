---
title: "Notifications BulkSMS"
description: "Envoyer BulkSMS notifications."
sidebar:
  label: "BulkSMS"

source: https://bulksms.com

schemas:
  - bulksms

has_sms: true

sample_urls:
  - bulksms://{user}:{password}@{phoneNo}
  - bulksms://{user}:{password}@{phoneNo1}/{phoneNo2}/{phoneNoN}
  - bulksms://{user}:{password}@{group}
  - bulksms://{user}:{password}@{group1}/@{group2}/@{groupN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a BulkSMS account [from here](https://bulksms.com). You will be provided to create a user and password to associate with your account. This is all you need to use this through Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `bulksms://{user}:{password}@{target}`

A `target` can be either a phone number, or if prefixed with `@` it becomes a group.

- `bulksms://{user}:{password}@{phoneNo}`
- `bulksms://{user}:{password}@{phoneNo1}/{phoneNo2}/{phoneNoN}`
- `bulksms://{user}:{password}@{group}`
- `bulksms://{user}:{password}@{group1}/@{group2}/@{groupN}`

Vous pouvez aussi melanger les formats

- `bulksms://{user}:{password}@{to_phone1}/@{group1}`

For ambiguity, if you do not provide a valid phone number, and the information parsed does not exclusively have a`@` in front of it, then it is first interpreted as phone number. However if alphanumeric characters are detected in it, then it is switched to a group.

## Detail des parametres

| Variable | Required | Description                                                                                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Yes      | The username associated with your BulkSMS Account.                                                                                                              |
| password | Yes      | The password associated with your BulkSMS Account.                                                                                                              |
| to       | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`. |
| from     | **\*No** | Specify the phone number you registered with BulkSMS you wish the message to be identified as being sent from.                                                  |
| batch    | No       | Envoyer multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                                 |
| route    | No       | Can be set to either `ECONOMY`, `STANDARD`, or `PREMIUM` (not case sensitive). If not otherwise provided, this assumes to be `STANDARD` by default.             |
| unicode  | No       | Optionally tell Apprise to not mark your text message as having unicode characters in it. The message mode changes to `TEXT` if this is set to `No`             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une BulkSMS Message:

```bash
# Assuming our {user} is joe
# Assuming our {password} is hard-to-guess
# Assuming the {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bulksms://joe:hard-to-guess@+134-555-1223
```
