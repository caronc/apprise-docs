---
title: "Notifications Free-Mobile"
description: "Envoyer des notifications Free-Mobile."
sidebar:
  label: "Free-Mobile"

source: https://mobile.free.fr

schemas:
  - freemobile

has_sms: true

sample_urls:
  - freemobile://{user}@{password}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous chez Free Mobile ([lien](https://mobile.free.fr/)) puis utilisez vos identifiants, `user` et `password`, pour envoyer une notification.

## Syntaxe

La syntaxe valide est la suivante :

- `freemobile://{user}@{password}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                 |
| -------- | ----------- | --------------------------------------------------------------------------- |
| user     | Oui         | Identifiant associe a votre [compte Free-Mobile](https://mobile.free.fr/).  |
| password | Oui         | Mot de passe associe a votre [compte Free-Mobile](https://mobile.free.fr/). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Free-Mobile :

```bash
# Supposons que notre {user} soit abc123
# Supposons que notre {password} soit 98765
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "freemobile://abc123@98765"
```
