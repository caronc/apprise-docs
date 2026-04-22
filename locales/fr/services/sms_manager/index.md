---
title: "Notifications SMS Manager"
description: "Envoyer des notifications SMS Manager."
sidebar:
  label: "SMS Manager"

source: https://smsmanager.cz

schemas:
  - smsmgr

has_sms: true

sample_urls:
  - smsmgr://{apikey}@/{toPhoneNo}
  - smsmgr://{apikey}@/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a SMS Manager [ici](https://smsmanager.cz). Vous pouvez recuperer votre cle API depuis la section de gestion de votre compte.

## Syntaxe

La syntaxe valide est la suivante :

- `smsmgr://{apikey}@/{toPhoneNo}`
- `smsmgr://{apikey}@/{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

`smsmanager://` peut aussi etre utilise comme alias de `smsmgr://` si vous le souhaitez.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                        |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey   | Oui         | Cle API associee a votre compte SMS Manager.                                                                                                                                                                                                       |
| to       | **\*Non**   | Numero de telephone et/ou groupe auquel vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. Il s'agit d'un alias de `targets`.                                                            |
| from     | **\*Non**   | Cette option requiert l'approbation de l'administrateur et fournit une valeur `sender` dans la charge utile. Elle ne peut pas depasser 11 caracteres selon la documentation. Vous pouvez aussi utiliser `?sender=` pour definir cette meme valeur. |
| batch    | Non         | Envoie plusieurs notifications precisees dans un seul lot, soit une seule publication vers le serveur distant. Par defaut, cette option vaut `no`.                                                                                                 |
| gateway  | Non         | SMS Manager prend en charge les passerelles suivantes : `high`, `economy`, `low` et `direct`. Par defaut, la valeur `high` est utilisee si rien n'est precise.                                                                                     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message SMS Manager :

```bash
# Supposons que notre {apikey} soit hard-to-guess
# Supposons que le {PhoneNo} a notifier soit +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   smsmgr://hard-to-guess@+134-555-1223
```
