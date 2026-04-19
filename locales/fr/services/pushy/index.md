---
title: "Notifications Pushy"
description: "Envoyer Pushy notifications."
sidebar:
  label: "Pushy"

source: https://pushy.me/

schemas:
  - pushy

sample_urls:
  - pushy://{apikey}/{Device}
  - pushy://{apikey}/#{topic}
limits:
  max_chars: 4096
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez disposer d’un compte chez [Pushy](https://pushy.me/) and create an App.

## Syntaxe

La syntaxe valide est la suivante :

- `pushy://{apikey}/{targets}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                                          |
| -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Yes      | This is the **Secret API Key** associated with your Pushy App                                                                                                        |
| targets  | Yes      | This must be either a **Topic** or a **Device**. Sujets should be prefixed with a `#` and Devices a `@`. If no prefix is specified, then it is assumed to be a Topic |
| sound    | No       | Optionally specify a sound you defined such as `alarm.aiff`.                                                                                                         |
| badge    | No       | Provide a numerical value of 0 (zero) or greater to associate a badge with the bark icon on the iOS device.                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Pushy notification:

```bash
# Assuming our {apikey} is abcdefghijklmnopqrstuvwxyzabc
# Assuming our {target} is a device with the id abcabcabc
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushy://abcdefghijklmnopqrstuvwxyzabc/@abcabcabc
```
