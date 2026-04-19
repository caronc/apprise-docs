---
title: "Notifications Prowl"
description: "Envoyer Prowl notifications."
sidebar:
  label: "Prowl"

source: https://www.prowlapp.com/

schemas:
  - prowl

sample_urls:
  - prowl://{apikey}
  - prowl://{apikey}/{providerkey}
  - prowl://{apikey}/?priority={priority}

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Prowl requires users to pre-register themselves at [prowlapp.com](https://www.prowlapp.com/) first.

## Syntaxe

La syntaxe valide est la suivante :

- `prowl://{apikey}`
- `prowl://{apikey}/{providerkey}`
- `prowl://{apikey}/?priority={priority}`

## Detail des parametres

| Variable    | Required | Description                                                                                                                    |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| apikey      | Yes      | The API Key provided to you after you create yourself a Prowl account.                                                         |
| providerkey | No       | The Provider Key is only required if you have been whitelisted.                                                                |
| priority    | No       | Can be **low**, **moderate**, **normal**, **high**, or **emergency**; the default is **normal** if a priority isn't specified. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Prowl notification to our server

```bash
# Assuming our {apikey} is adf9dfjkj24jkafkljkf6f
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   prowl://adf9dfjkj24jkafkljkf6f
```
