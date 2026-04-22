---
title: "Notifications Africas Talking"
description: "Envoyer des notifications Africa's Talking."
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

## Configuration du Compte

Inscrivez-vous a Africas Talking [ici](https://africastalking.com/). Vous pouvez recuperer votre cle API depuis la section de gestion de votre compte.

## Syntaxe

La syntaxe valide est la suivante :

- `atalk://{appuser}@{apikey}/{toPhoneNo}`
- `atalk://{appuser}@{apikey}/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui         | Cle API associee a votre compte SMS Manager.                                                                                                                                                    |
| to       | **\*Non**   | Numero(s) de telephone et/ou groupe(s) auxquels vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. Il s'agit d'un alias de `targets`. |
| from     | **\*Non**   | Votre shortcode ou identifiant alphanumerique enregistre ; la valeur par defaut est `AFRICASTKNG`.                                                                                              |
| batch    | Non         | Envoie plusieurs notifications specifiees dans un seul lot, soit 1 publication amont vers le serveur final. Par defaut, cette option est definie sur `no`.                                      |
| mode     | Non         | Permet d'envoyer votre SMS selon differents modes ; les options sont `bulksms`, par defaut, `premium` ou `sandbox`.                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message SMS Manager :

```bash
# Supposons que notre {appuser} soit user123
# Supposons que notre {apikey} soit hard-to-guess
# Supposons que le {PhoneNo} que nous voulons notifier soit +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   atalk://user123@hard-to-guess/+134-555-1223
```
