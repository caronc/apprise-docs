---
title: "Notifications Direct 7 (D7) Networks"
description: "Envoyer des notifications D7 Networks."
sidebar:
  label: "Direct 7 (D7) Networks"

source: https://d7networks.com

schemas:
  - d7sms

has_sms: true

sample_urls:
  - d7sms://{token}@{PhoneNo}
  - d7sms://{token}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser ce service, vous devez disposer d'un compte D7 Networks cree depuis leur [site web](https://d7networks.com/).

Une fois votre compte cree, vous pouvez recuperer votre jeton API depuis la section des details de l'API, dans votre [espace profil](https://d7networks.com/accounts/profile/).

## Syntaxe

La syntaxe valide est la suivante :

- `d7sms://{token}@{PhoneNo}`
- `d7sms://{token}@{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                                                                           |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui         | _Jeton API_ associe a votre compte D7 Networks. Il est disponible via la section **API Details** dans votre [espace profil](https://d7networks.com/accounts/profile/).                                                                                                                                                                |
| PhoneNo  | Oui         | Au moins un numero de telephone doit etre precise pour utiliser ce plugin. Ce champ est assez tolerant et accepte aussi les parentheses, les espaces et les tirets si vous souhaitez formater le numero de maniere plus lisible.                                                                                                      |
| from     | Non         | Adresse d'origine. Dans les cas ou la reecriture de l'adresse expediteur est prise en charge ou autorisee par le SMS-C, cette valeur est utilisee pour transmettre le message ; ce numero est alors transmis comme adresse d'origine et reste entierement facultatif.                                                                 |
| unicode  | Non         | Le message peut etre force en `unicode`. Par defaut, cette valeur est `False`. Lorsqu'elle vaut `False`, un mode `auto` est indique en arriere-plan afin de permettre a D7 Networks de detecter lui-meme le type de message. Definissez cette valeur sur `True` si vous souhaitez forcer tous les messages au type `unicode`.         |
| batch    | Non         | D7 Networks permet un mode lot. Si vous indiquez plus d'un numero de telephone, vous pouvez envoyer tous les numeros identifies dans l'URL en une seule fois, au lieu de l'approche habituelle d'_Apprise_, qui les envoie un par un. L'activation du mode lot a des avantages comme des inconvenients. Par defaut, il est desactive. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS via D7 Networks :

```bash
# Supposons que notre {token} soit AJfkafjA4Baghkr0Zkjk
# Supposons que notre {PhoneNo}
#  - se trouve aux Etats-Unis, donc avec l'indicatif +1
#  - corresponde a 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "d7sms://AJfkafjA4Baghkr0Zkjk@18005551223"

# l'exemple suivant aurait egalement fonctionne, les espaces,
# parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "d7sms://AJfkafjA4Baghkr0Zkjk@1-(800) 555-1223"
```
