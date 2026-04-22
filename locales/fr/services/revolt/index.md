---
title: "Notifications Revolt"
description: "Envoyer des notifications Revolt."
sidebar:
  label: "Revolt"

source: https://revolt.chat

schemas:
  - revolt

has_image: true

sample_urls:
  - revolt://{bot_token}/{channel_id}
  - revolt://{bot_token}/{channel_id1}/{channel_id2}/{channel_id3}

limits:
  max_chars: 2000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Configurez votre compte sur [Revolt Chat](https://revolt.chat/) puis generez un jeton de robot.

## Syntaxe

La syntaxe valide est la suivante :

- `revolt://{bot_token}/{channel_id}`
- `revolt://{bot_token}/{channel_id1}/{channel_id2}/{channel_id3}`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| bot_token  | Oui         | Jeton identifiant le robot que vous avez cree depuis l'interface d'administration Revolt.                                  |
| channel_id | Oui         | Identifie les canaux auxquels votre robot doit remettre vos notifications. Vous devez preciser au moins un `_channel_id_`. |
| url        | Non         | Permet facultativement de specifier une URL d'embed a utiliser avec l'API.                                                 |
| icon_url   | Non         | Permet facultativement de specifier l'URL d'une image pour remplacer l'icone par defaut.                                   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Revolt a `lead2gold` :

```bash
# Supposons que notre {bot_token} soit 123456789:abcdefg_hijklmnop
# Supposons que le {channel} associe a lead2gold soit 12315544
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   revolt://123456789:abcdefg_hijklmnop/12315544/
```
