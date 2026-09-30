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

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

- Vous devez être radioamateur titulaire d'une licence pour utiliser ce plugin.
- Vous devez disposer de votre propre code d'accès APRS-IS. Si vous ne savez pas ce que c'est ni comment l'obtenir, alors ce plugin n'est probablement pas pour vous.

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
| password | Oui         | Code d'accès APRS numérique correspondant à `userid`. L'accès en lecture seule à APRS-IS, `passcode == -1`, n'est pas pris en charge.                                                                                                                                                                                                                                                                                                                                                     |
| callsign | Oui         | Un ou plusieurs indicatifs radioamateur cibles sont requis pour envoyer une notification.                                                                                                                                                                                                                                                                                                                                                                                                 |
| delay    | Non         | Les messages sont déjà envoyés avec une temporisation de `0.8` seconde pour tenir compte des envois multiples. Dans certains cas, vous pouvez souhaiter augmenter davantage cette valeur. Toute valeur fournie au paramètre `delay` s'ajoute aux `0.8s` déjà définies. La valeur minimale, qui est aussi la valeur par défaut, est `0.0`. Vous pouvez toutefois préciser une valeur allant jusqu'à `5.0`, en secondes. Les valeurs entières sont aussi acceptées, par exemple `2` ou `4`. |
| locale   | Non         | Code de la région de votre serveur APRS-IS T2 le plus proche, voir [https://www.aprs2.net](https://www.aprs2.net). Les valeurs valides sont `NOAM`, `SOAM`, `EURO`, `AUNZ`, `ASIA`. Vous pouvez aussi sélectionner `ROTA` pour `rotate.aprs2.net` si vous ne souhaitez pas cibler une région APRS particulière. La valeur par défaut est `EURO`. Indiquez uniquement le code court de la région ; le plugin fera ensuite la correspondance avec l'URL du serveur appropriée.              |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Contraintes

- Les caractères de contrôle APRS, `{}|~`, [voir APRS101.pdf chapitre 14 page 71](http://www.aprs.org/doc/APRS101.PDF), seront supprimés du corps du message s'ils sont présents.
- Si votre message dépasse 67 caractères, le plugin tronquera automatiquement le contenu à la longueur maximale de message APRS.
- Un message APRS tient sur une seule ligne : le titre et chaque ligne de votre message sont donc réunis, séparés par un espace, avant que la limite de 67 caractères ne soit appliquée.
- Pour les messages, il est recommandé de s'en tenir à l'alphabet anglais, car APRS est limité à l'ASCII 7 bits. Le plugin essaiera de "traduire" tout message UTF-8 en ASCII simple à l'aide du module [unidecode](https://pypi.org/project/Unidecode/), mais rien ne garantit que le résultat sera exploitable.
- Ce plugin respecte bien les SSID des indicatifs, ce qui signifie que des cibles comme DF1JSL-1 et DF1JSL-9 ne sont pas identiques et produiront deux messages APRS distincts.
- Tous les messages générés par ce plugin seront dépourvus d'identifiant de message APRS, [voir APRS101.pdf chapitre 14 page 71](http://www.aprs.org/doc/APRS101.PDF). Comme la communication de ce plugin avec APRS-IS est unidirectionnelle, Apprise ne pourra pas tenir compte des réponses APRS ack ou rej envoyées par l'indicatif cible, c'est-à-dire l'équipement radioamateur destinataire.
- Les bulletins APRS, [voir APRS101.pdf chapitre 14 page 73](http://www.aprs.org/doc/APRS101.PDF), ne sont pas pris en charge.
- Un grand pouvoir radioamateur implique de grandes responsabilités ; n'utilisez pas ce plugin pour envoyer du spam à d'autres radioamateurs. Tout ce que vous envoyez au serveur APRS-IS sera diffusé sur le réseau APRS et radioamateur.
- Pour accéder à APRS-IS, vous devez être radioamateur titulaire d'une licence.
- Le plugin utilise son propre identifiant d'appareil APRS, `APPRIS`, voir [https://github.com/aprsorg/aprs-deviceid](https://github.com/aprsorg/aprs-deviceid) pour les détails. Cet identifiant est unique pour chaque logiciel ou appareil autorisé à communiquer avec le réseau APRS et **ne doit pas être modifié** de quelque façon que ce soit, SAUF si vous clonez ce plugin et utilisez son code en dehors d'Apprise ; dans ce cas, demandez votre propre identifiant d'appareil.
- Contraintes techniques supplémentaires : voir la section d'en-tête du plugin. En général, vous ne devriez pas avoir besoin de modifier ces paramètres.

## Exemples

Envoyer une notification APRS :

```bash
# Supposons que notre {userid} soit df1jsl-15
# Supposons que notre {password} soit 12345
# Supposons que notre {callsign} soit df1jsl-9
# {locale} n'est pas défini ; utilisation de 'euro.aprs2.net' comme serveur cible par défaut
#
apprise -vv -b "Corps du Message de Test" \
   "aprs://df1jsl-15:12345@df1jsl-9"

# Supposons que notre {userid} soit df1jsl-15
# Supposons que notre {password} soit 12345
# Supposons que nos {callsign}s soient df1jsl-9, df1jsl-8 et df1jsl-7
# {locale} n'est pas défini ; utilisation de 'euro.aprs2.net' comme serveur cible par défaut
#
# Cela produira trois indicatifs cibles car le plugin
# respectera les informations de SSID de l'indicatif
#
apprise -vv -b "Corps du Message de Test" \
   aprs://df1jsl-15:12345@df1jsl-9/df1jsl-8/df1jsl-7

# Supposons que notre {userid} soit df1jsl-15
# Supposons que notre {password} soit 12345
# Supposons que notre {callsign} soit df1jsl-9
# Supposons que notre {locale} soit NOAM --> correspond à l'URL du serveur 'noam.aprs2.net', voir https://www.aprs2.net/
apprise -vv -b "Corps du Message de Test" \
   "aprs://df1jsl-15:12345@df1jsl-9?locale=NOAM"
```
