---
title: "Notifications Société Française du Radiotéléphone (SFR)"
description: "Envoyer Société Française du Radiotéléphone (SFR) notifications."
sidebar:
  label: "Société Française du Radiotéléphone (SFR)"

source: https://www.sfr.fr/

schemas:
  - sfr

has_sms: true

sample_urls:
  - sfr://{user}:{password}@{space_id}/{PhoneNo}
  - sfr://{user}:{password}@{space_id}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `sfr://{user}:{password}@{space_id}/{PhoneNo}`
- `sfr://{user}:{password}@{space_id}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Detail des parametres

| Variable | Required               | Description                                                                                                                                              |
| -------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Yes                    | The user associated with your SFR account.                                                                                                               |
| password | Yes                    | The password associated with your SFR account.                                                                                                           |
| space_id | Yes                    | The Space ID associated with your SFR account.                                                                                                           |
| PhoneNo  | **\*No**               | The phone number you wish to notify                                                                                                                      |
| to       | Yes                    | This is the Phone Number that will receive the notification; this is an alias of PhoneNo                                                                 |
| lang     | No (default value set) | This is required by SFR when sending an SMS. Default to `fr_FR`                                                                                          |
| from     | no                     | This is the sender name that will be seen when people receive the sms. It _MUST_ be registered previously in the SFR Business DMC Account                |
| timeout  | No                     | This is the time after which the SMS will be dropped by SFR. Default to `2880` minutes                                                                   |
| voice    | No                     | This is the voice used when SMS is encoded as a vocal. Not applicable in apprise, but must be set for API compatibility reasons. Default to `claire08s`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une SFR Notification:

```bash
# Assuming our {user} is foo
# Assuming our {password} is bar
# Assuming our {space_id} is 1234
# Assuming our {PhoneNo} - is in the US somewhere making our country code +1
#                        - identifies as 800-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sfr://foo:bar@1234/18005551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   sfr://foo:bar@1234//1-(800) 555-1223
```
