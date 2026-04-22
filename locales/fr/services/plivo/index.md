---
title: "Notifications Plivo"
description: "Envoyer des notifications Plivo."
sidebar:
  label: "Plivo"

source: https://plivo.com

schemas:
  - plivo

has_sms: true

sample_urls:
  - plivo://{auth_id}@{token}/{from_phone}/
  - plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo}
  - plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}

limits:
  max_chars: 140
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a Plivo [ici](https://plivo.com). Depuis votre compte, vous pourrez generer a la fois votre **Auth ID** et votre **Auth Token**.

## Syntaxe

La syntaxe valide est la suivante :

- `plivo://{auth_id}@{token}/{from_phone}/`
- `plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo}`
- `plivo://{auth_id}@{token}/{from_phone}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`

**Remarque** : si aucun numero cible n'est precise, alors c'est `{source_phone}` qui sera notifie.

**Remarque** : tous les numeros de telephone doivent etre au format E.164, par exemple `+14151234567`.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth_id  | Oui         | **Auth ID** associe a votre compte Plivo.                                                                                                                  |
| token    | Oui         | Jeton d'acces genere associe a votre compte Plivo.                                                                                                         |
| from     | Oui         | Numero de telephone associe a votre compte a partir duquel vous souhaitez envoyer le SMS.                                                                  |
| to       | Non         | Numeros de telephone que vous souhaitez notifier.                                                                                                          |
| batch    | Non         | Envoie plusieurs notifications specifiees dans un seul lot, soit 1 publication amont vers le serveur final. Par defaut, cette option est definie sur `no`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Plivo :

```bash
# Supposons que notre {auth_id} soit abcd123
# Supposons que notre {token} soit 9876test
# Supposons que notre {from_no} soit +1555229999
# Supposons que nous voulions notifier 1555221237 et +18005551234
# Testez les changements avec la commande suivante :
apprise -t "Test Title" -b "Test Message" \
 "plivo://abcd123@9876test/1555229999/+1555221237/+18005551234"

```
