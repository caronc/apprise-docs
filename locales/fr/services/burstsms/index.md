---
title: "Notifications Burst SMS"
description: "Envoyer des notifications Burst SMS."
sidebar:
  label: "Burst SMS"

source: https://burstsms.com/

schemas:
  - burstsms

has_sms: true

sample_urls:
  - burstsms://{api_key}:{secret}@{sender_id}/{targets}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous devez disposer d'un compte chez [Burst SMS](https://burstsms.com/). Rendez-vous dans les options de votre profil et creez un `Secret` a associer a votre compte. Vous remarquerez qu'une `cle API` est deja presente. Ces deux valeurs seront utilisees comme informations d'identification.

Burst SMS vous attribuera egalement un Sender ID a partir duquel vos notifications seront envoyees. Cette valeur doit aussi etre fournie dans l'URL Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `burstsms://{api_key}:{secret}@{sender_id}/{targets}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                         |
| --------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key   | Oui         | **Cle API** associee a votre compte Burst SMS.                                                                                                                                                                                      |
| secret    | Oui         | **Client Secret** associe a votre compte Burst SMS.                                                                                                                                                                                 |
| sender_id | Oui         | **Phone Number** associe a votre compte Burst SMS.                                                                                                                                                                                  |
| targets   | Oui         | Permet d'identifier les numeros de telephone auxquels vous souhaitez envoyer votre message **SMS**.                                                                                                                                 |
| country   | Non         | Permet facultativement de preciser le `countrycode`, `en`, `gb`, `au` ou `nz`. La valeur par defaut est `us`.                                                                                                                       |
| validity  | Non         | Permet facultativement de definir pendant combien de temps un SMS non envoye reste valide, et continuera donc d'etre retente. La valeur par defaut est zero, `0`, pour une validite maximale. Cette valeur est exprimee en minutes. |
| batch     | Non         | Permet facultativement d'envoyer les notifications en lot, au lieu de maniere individuelle. Par defaut, cette option est definie sur `No`.                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Burst SMS :

```bash
# Supposons que notre {APIKey} soit bc1451bd
# Supposons que notre {APISecret} soit gank339l7jk3cjaE
# Supposons que notre {FromPhoneNo} soit +1-900-555-9999
# Supposons que notre {PhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   burstsms://bc1451bd:gank339l7jk3cjaE@19005559999/18005551223
```
