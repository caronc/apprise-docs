---
title: "Notifications MessageBird"
description: "Envoyer des notifications MessageBird."
sidebar:
  label: "MessageBird"

source: https://messagebird.com

schemas:
  - msgbird

has_sms: true

sample_urls:
  - msgbird://{ApiKey}/{FromPhoneNo}
  - msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo}
  - msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}
limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser MessageBird, vous devez obtenir votre _Clé API_. Elle est accessible via le [Tableau de bord MessageBird](https://dashboard.messagebird.com/en/user/index).

## Syntaxe

La syntaxe valide est la suivante :

- `msgbird://{ApiKey}/{FromPhoneNo}`
- `msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo}`
- `msgbird://{ApiKey}/{FromPhoneNo}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`

## Détail des Paramètres

| Variable    | Requis | Description                                                                                                                                                                                                                                                                                                                      |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ApiKey      | Oui    | La _Clé API_ associée à votre compte MessageBird. Elle est disponible via le [Tableau de bord MessageBird](https://dashboard.messagebird.com/en/user/index).                                                                                                                                                                     |
| FromPhoneNo | Oui    | Un numéro de téléphone expéditeur DOIT inclure le préfixe de composition du code pays lors de sa saisie. Ce champ est très flexible et accepte les parenthèses, espaces et tirets si vous souhaitez formater le numéro de manière lisible. Ce DOIT être le numéro que vous avez enregistré avec votre compte _MessageBird_.      |
| ToPhoneNo   | Non    | Un numéro de téléphone destinataire DOIT inclure le préfixe de composition du code pays lors de sa saisie. Ce champ est très flexible et accepte les parenthèses, espaces et tirets si vous souhaitez formater le numéro de manière lisible. Si aucun _ToPhoneNo_ n'est spécifié, le _FromPhoneNo_ est alors notifié à la place. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification MessageBird par SMS :

```bash
# Assuming our {APIKey} is gank339l7jk3cjaE
# Assuming our {FromPhoneNo} - is in the US somewhere making our country code +1
#                            - identifies as 1-123-555-1223
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   msgbird://gank339l7jk3cjaE/11235551223

# the following would also have worked (spaces, brackets,
# dashes are accepted in a phone no field):
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   msgbird://gank339l7jk3cjaE/1-(123) 555-1223
```
