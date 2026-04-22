---
title: "Notifications DingTalk"
description: "Envoyer des notifications DingTalk."
sidebar:
  label: "DingTalk"

source: https://www.dingtalk.com/

schemas:
  - dingtalk

has_sms: true

sample_urls:
  - dingtalk://{ApiKey}/{ToPhoneNo}
  - dingtalk://{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}
  - dingtalk://{Secret}@{ApiKey}/{ToPhoneNo}
  - dingtalk://{Secret}@{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser DingTalk, vous devez recuperer votre _API Key_.

## Syntaxe

La syntaxe valide est la suivante :

- `dingtalk://{ApiKey}/{ToPhoneNo}`
- `dingtalk://{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`
- `dingtalk://{Secret}@{ApiKey}/{ToPhoneNo}`
- `dingtalk://{Secret}@{ApiKey}/{ToPhoneNo1}/{ToPhoneNo2}/{ToPhoneNoN}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                      |
| --------- | ----------- | ------------------------------------------------------------------------------------------------ |
| ApiKey    | Oui         | _API Key_ associee a votre compte DingTalk. Elle est disponible via le Tableau de Bord DingTalk. |
| ToPhoneNo | Non         | Numero de telephone auquel envoyer votre notification.                                           |
| Secret    | Non         | Cle secrete facultative a associer a la signature du message.                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS via DingTalk :

```bash
# Supposons que notre {APIKey} soit gank339l7jk3cjaE
# Supposons que notre {ToPhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 1-123-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   dingtalk://gank339l7jk3cjaE/11235551223

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   dingtalk://gank339l7jk3cjaE/1-(123) 555-1223
```
