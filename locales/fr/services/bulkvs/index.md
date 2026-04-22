---
title: "Notifications BulkVS"
description: "Envoyer BulkVS notifications."
sidebar:
  label: "BulkVS"

source: https://www.bulkvs.com

schemas:
  - bulkvs

has_sms: true

sample_urls:
  - bulkvs://{user}:{password}@{fromPhoneNo}
  - bulkvs://{user}:{password}@{fromPhoneNo}/{target}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a BulkVS [ici](https://www.bulkvs.com/). Un identifiant utilisateur et un mot de passe associes a votre compte vous seront fournis. C'est tout ce dont vous avez besoin pour utiliser ce service avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `bulkvs://{user}:{password}@{fromPhoneNo}`
- `bulkvs://{user}:{password}@{fromPhoneNo}/{target}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                     |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user     | Oui         | Nom d'utilisateur associe a votre compte BulkVS.                                                                                                                                                |
| password | Oui         | Mot de passe associe a votre compte BulkVS.                                                                                                                                                     |
| to       | **\*Non**   | Numero(s) de telephone et/ou groupe(s) auxquels vous souhaitez envoyer votre notification. Vous pouvez utiliser des virgules pour separer plusieurs entrees. Il s'agit d'un alias de `targets`. |
| from     | **\*Non**   | Numero de telephone enregistre chez BulkVS que vous souhaitez utiliser comme expediteur du message.                                                                                             |
| batch    | Non         | Envoie plusieurs notifications specifiees dans un seul lot, soit 1 publication amont vers le serveur final. Par defaut, cette option est definie sur `no`.                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message BulkVS :

```bash
# Supposons que notre {user} soit joe
# Supposons que notre {password} soit hard-to-guess
# Supposons que le {PhoneNo} que nous voulons notifier soit +134-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bulkvs://joe:hard-to-guess@+134-555-1223
```
