---
title: "Notifications APRS"
description: "Envoyer des notifications APRS."
sidebar:
  label: "APRS"

source: http://www.aprs.org/

schemas:
  - aprs

sample_urls:
  - aprs://{userid}:{password}@{callsign}
  - aprs://{userid}:{password}@{callsign}?locale={locale_code}
  - aprs://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}

limits:
  max_chars: 67
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

- Vous devez etre radioamateur licence pour utiliser ce plugin.
- Vous devez disposer de votre propre code d'acces APRS-IS. Si vous ne savez pas ce que c'est ni comment l'obtenir, alors ce plugin n'est probablement pas pour vous.

## Syntaxe

La syntaxe valide est la suivante :

- `aprs://{userid}:{password}@{callsign}`
- `aprs://{userid}:{password}@{callsign}?locale={locale_code}`
- `aprs://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}`
- `aprs://{userid}:{password}@{callsign1}/{callsign2}/{callsignN}?locale={locale_code}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userid   | Oui         | Votre indicatif APRS. C'est cet indicatif qui enverra le message.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| password | Oui         | Code d'acces APRS numerique correspondant a `userid`. L'acces en lecture seule a APRS-IS, `passcode == -1`, n'est pas pris en charge.                                                                                                                                                                                                                                                                                                                                                     |
| callsign | Oui         | Un ou plusieurs indicatifs radioamateur cibles sont requis pour envoyer une notification.                                                                                                                                                                                                                                                                                                                                                                                                 |
| delay    | Non         | Les messages sont deja envoyes avec une temporisation de `0.8` seconde pour tenir compte des envois multiples. Dans certains cas, vous pouvez souhaiter augmenter davantage cette valeur. Toute valeur fournie au parametre `delay` s'ajoute aux `0.8s` deja definies. La valeur minimale, qui est aussi la valeur par defaut, est `0.0`. Vous pouvez toutefois preciser une valeur allant jusqu'a `5.0`, en secondes. Les valeurs entieres sont aussi acceptees, par exemple `2` ou `4`. |
| locale   | Non         | Code de la region de votre serveur APRS-IS T2 le plus proche, voir [https://www.aprs2.net](https://www.aprs2.net). Les valeurs valides sont `NOAM`, `SOAM`, `EURO`, `AUNZ`, `ASIA`. Vous pouvez aussi selectionner `ROTA` pour `rotate.aprs2.net` si vous ne souhaitez pas cibler une region APRS particuliere. La valeur par defaut est `EURO`. Indiquez uniquement le code court de la region ; le plugin fera ensuite la correspondance avec l'URL serveur appropriee.                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Contraintes

- Les caracteres de controle APRS, `{}|~`, [voir APRS101.pdf chapitre 14 page 71](http://www.aprs.org/doc/APRS101.PDF), seront supprimes du corps du message s'ils sont presents.
- Si votre message depasse 67 caracteres, le plugin tronquera automatiquement le contenu a la longueur maximale de message APRS.
- Pour les messages, il est recommande de rester sur l'alphabet anglais car APRS est limite a l'ASCII 7 bits. Le plugin essaiera de "traduire" tout message UTF-8 en ASCII simple a l'aide du module [unidecode](https://pypi.org/project/Unidecode/), mais rien ne garantit que le resultat sera exploitable.
- Ce plugin respecte bien les SSID des indicatifs, ce qui signifie que des cibles comme DF1JSL-1 et DF1JSL-9 ne sont pas identiques et produiront deux messages APRS distincts.
- Tous les messages generes par ce plugin seront depourvus d'identifiant de message APRS, [voir APRS101.pdf chapitre 14 page 71](http://www.aprs.org/doc/APRS101.PDF). Comme la communication de ce plugin avec APRS-IS est unidirectionnelle, Apprise ne pourra pas tenir compte des reponses APRS ack ou rej envoyees par l'indicatif cible, c'est-a-dire l'equipement radioamateur destinataire.
- Les bulletins APRS, [voir APRS101.pdf chapitre 14 page 73](http://www.aprs.org/doc/APRS101.PDF), ne sont pas pris en charge.
- Un grand pouvoir radioamateur implique de grandes responsabilites ; n'utilisez pas ce plugin pour envoyer du spam a d'autres radioamateurs. Tout ce que vous envoyez au serveur APRS-IS sera diffuse sur le reseau APRS et radioamateur.
- Pour acceder a APRS-IS, vous devez etre radioamateur licence.
- Le plugin utilise son propre identifiant d'appareil APRS, `APPRIS`, voir [https://github.com/aprsorg/aprs-deviceid](https://github.com/aprsorg/aprs-deviceid) pour les details. Cet identifiant est unique pour chaque logiciel ou appareil autorise a communiquer avec le reseau APRS et **ne doit pas etre modifie** de quelque facon que ce soit, SAUF si vous clonez ce plugin et utilisez son code en dehors d'Apprise ; dans ce cas, demandez votre propre identifiant d'appareil.
- Contraintes techniques supplementaires : voir la section d'en-tete du plugin. En general, vous ne devriez pas avoir besoin de modifier ces parametres.

## Exemples

Envoyer une notification APRS :

```bash
# Supposons que notre {userid} soit df1jsl-15
# Supposons que notre {password} soit 12345
# Supposons que notre {callsign} soit df1jsl-9
# {locale} n'est pas defini ; utilisation de 'euro.aprs2.net' comme serveur cible par defaut
#
apprise -vv -b "Corps du Message de Test" \
   "aprs://df1jsl-15:12345@df1jsl-9"

# Supposons que notre {userid} soit df1jsl-15
# Supposons que notre {password} soit 12345
# Supposons que nos {callsign}s soient df1jsl-9, df1jsl-8 et df1jsl-7
# {locale} n'est pas defini ; utilisation de 'euro.aprs2.net' comme serveur cible par defaut
#
# Cela produira trois indicatifs cibles car le plugin
# respectera les informations de SSID de l'indicatif
#
apprise -vv -b "Corps du Message de Test" \
   aprs://df1jsl-15:12345@df1jsl-9/df1jsl-8/df1jsl-7

# Supposons que notre {userid} soit df1jsl-15
# Supposons que notre {password} soit 12345
# Supposons que notre {callsign} soit df1jsl-9
# Supposons que notre {locale} soit NOAM --> correspond a l'URL serveur 'noam.aprs2.net', voir https://www.aprs2.net/
apprise -vv -b "Corps du Message de Test" \
   "aprs://df1jsl-15:12345@df1jsl-9?locale=NOAM"
```
