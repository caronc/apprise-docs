---
title: "Notifications Kudosity"
description: "Envoyer des notifications Kudosity (anciennement Burst SMS)."
sidebar:
  label: "Kudosity"

keywords: "burstsms, kudosity"

source: https://kudosity.com/

schemas:
  - burstsms
  - kudosity

has_sms: true

sample_urls:
  - burstsms://{api_key}:{secret}@{sender_id}/{targets}
  - kudosity://{api_key}:{secret}@{sender_id}/{targets}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Vous devez disposer d'un compte chez [Kudosity](https://kudosity.com/). Burst SMS s'appelle desormais Kudosity, donc un compte Burst SMS existant fonctionne tel quel.

Dans votre compte, ouvrez **Settings** puis **API Settings**. Vous remarquerez qu'une `cle API` est deja presente. Creez un `Secret` a lui associer. Ces deux valeurs seront utilisees comme informations d'identification.

Kudosity vous attribuera egalement un Sender ID a partir duquel vos notifications seront envoyees. Cette valeur doit aussi etre fournie dans l'URL Apprise.

`burstsms://` et `kudosity://` fonctionnent de la meme maniere.

## Syntaxe

La syntaxe valide est la suivante :

- `burstsms://{api_key}:{secret}@{sender_id}/{targets}`
- `kudosity://{api_key}:{secret}@{sender_id}/{targets}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                                                                                         |
| --------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key   | Oui         | **Cle API** associee a votre compte Kudosity.                                                                                                                                                                                       |
| secret    | Oui         | **Client Secret** associe a votre compte Kudosity.                                                                                                                                                                                  |
| sender_id | Oui         | **Phone Number** associe a votre compte Kudosity.                                                                                                                                                                                   |
| targets   | Oui         | Permet d'identifier les numeros de telephone auxquels vous souhaitez envoyer votre message **SMS**.                                                                                                                                 |
| country   | Non         | Permet facultativement de preciser le `countrycode`, `us`, `gb`, `au` ou `nz`. La valeur par defaut est `us`.                                                                                                                       |
| validity  | Non         | Permet facultativement de definir pendant combien de temps un SMS non envoye reste valide, et continuera donc d'etre retente. La valeur par defaut est zero, `0`, pour une validite maximale. Cette valeur est exprimee en minutes. |
| batch     | Non         | Permet facultativement d'envoyer les notifications en lot, au lieu de maniere individuelle. Par defaut, cette option est definie sur `No`.                                                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Kudosity :

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
