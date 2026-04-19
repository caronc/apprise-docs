---
title: "Notifications Clickatell"
description: "Envoyer Clickatell notifications."
sidebar:
  label: "Clickatell"

source: https://www.clickatell.com/

schemas:
  - clickatell

has_sms: true

sample_urls:
  - clickatell://{source}@{apikey}/{PhoneNo}
  - clickatell://{source}@{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}
  - clickatell://{apikey}/{PhoneNo}
  - clickatell://{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a BulkSMS account [from here](https://www.clickatell.com/). You will be provided to create a user and password to associate with your account. From here you can generate an apikey; this is all you need to use this through Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `clickatell://{source}@{apikey}/{PhoneNo}`
- `clickatell://{source}@{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `clickatell://{apikey}/{PhoneNo}`
- `clickatell://{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Detail des parametres

| Variable | Required | Description                                                  |
| -------- | -------- | ------------------------------------------------------------ |
| apikey   | **Yes**  | The API Key you generated as part of your Clickatell account |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification to your Clickatell account:

```bash
# Assuming our {apikey} is token
# Assuming our {PhoneNo} is 1-800-555-1234
apprise -vv --body="Test Message" \
   "clickatell://token/1-800-555-1234"
```
