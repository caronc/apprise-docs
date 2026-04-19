---
title: "Notifications Africas Talking"
description: "Envoyer Africas Talking notifications."
sidebar:
  label: "Africas Talking"

source: https://africastalking.com/

schemas:
  - atalk

sample_urls:
  - atalk://{appuser}@{apikey}/{toPhoneNo}
  - atalk://{appuser}@{apikey}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

has_sms: true

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a Africas Talking [from here](https://africastalking.com/). You can access your API Key from the management section from your account.

## Syntaxe

La syntaxe valide est la suivante :

- `atalk://{appuser}@{apikey}/{toPhoneNo}`
- `atalk://{appuser}@{apikey}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | The API Key associated with your SMS Manager Account.                                                                                                           |
| to       | **\*No** | A phone number and/or group you wish to send your notification to. You can use comma's to separate multiple entries if you wish. This is an alias to `targets`. |
| from     | **\*No** | Your registered short code or alphanumeric; Defaults to `AFRICASTKNG`                                                                                           |
| batch    | No       | Envoyer multiple specified notifications in a single batch (1 upstream post to the end server). By default this is set to `no`.                                 |
| mode     | No       | Allows you to send your SMS under different modes; options are `bulksms` (default), `premium`, or `sandbox`.                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une SMS Manager Message:

```bash
# Assuming our {appuser} is user123
# Assuming our {apikey} is hard-to-guess
# Assuming our {PhoneNo} we wish to notify is +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   atalk://user123@hard-to-guess/+134-555-1223
```
