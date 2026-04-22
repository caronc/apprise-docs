---
title: "Notifications Clickatell"
description: "Envoyer des notifications Clickatell."
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

## Configuration du Compte

Inscrivez-vous a un compte Clickatell [ici](https://www.clickatell.com/). Les informations de votre compte vous permettront ensuite de generer une apikey ; c'est tout ce dont vous avez besoin pour utiliser ce service avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `clickatell://{source}@{apikey}/{PhoneNo}`
- `clickatell://{source}@{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `clickatell://{apikey}/{PhoneNo}`
- `clickatell://{apikey}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                             |
| -------- | ----------- | ----------------------------------------------------------------------- |
| apikey   | **Oui**     | Cle API que vous avez generee dans le cadre de votre compte Clickatell. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification vers votre compte Clickatell :

```bash
# Supposons que notre {apikey} soit token
# Supposons que notre {PhoneNo} soit 1-800-555-1234
apprise -vv --body="Test Message" \
   "clickatell://token/1-800-555-1234"
```
