---
title: "Notifications Pushy"
description: "Envoyer des notifications Pushy."
sidebar:
  label: "Pushy"

source: https://pushy.me/

schemas:
  - pushy

sample_urls:
  - pushy://{apikey}/{Device}
  - pushy://{apikey}/#{topic}
limits:
  max_chars: 4096
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez disposer d'un compte chez [Pushy](https://pushy.me/) et y creer une App.

## Syntaxe

La syntaxe valide est la suivante :

- `pushy://{apikey}/{targets}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                            |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Oui         | Il s'agit de la **Secret API Key** associee a votre application Pushy.                                                                                                                                 |
| targets  | Oui         | Il peut s'agir soit d'un **Topic**, soit d'un **Device**. Les sujets doivent etre prefixes par `#` et les appareils par `@`. Si aucun prefixe n'est indique, la valeur est interpretee comme un Topic. |
| sound    | Non         | Permet facultativement de specifier un son que vous avez defini, par exemple `alarm.aiff`.                                                                                                             |
| badge    | Non         | Permet de fournir une valeur numerique egale ou superieure a 0 pour associer un badge a l'icone sur les appareils iOS.                                                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Pushy :

```bash
# Supposons que notre {apikey} soit abcdefghijklmnopqrstuvwxyzabc
# Supposons que notre {target} soit un appareil portant l'identifiant abcabcabc
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushy://abcdefghijklmnopqrstuvwxyzabc/@abcabcabc
```
