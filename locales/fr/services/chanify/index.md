---
title: "Notifications Chanify"
description: "Envoyer des notifications Chanify."
sidebar:
  label: "Chanify"

source: https://chanify.net/

schemas:
  - chanify

sample_urls:
  - chanify://{token}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a Chanify [ici](https://chanify.net/). Vous pourrez ensuite generer un jeton ; c'est tout ce dont vous avez besoin pour utiliser ce service avec Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `chanify://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                       |
| -------- | ----------- | ----------------------------------------------------------------- |
| token    | **Oui**     | Jeton que vous avez genere dans le cadre de votre compte Chanify. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification vers votre compte Chanify :

```bash
# Supposons que notre {token} soit token
apprise -vv --body="Test Message" \
   "chanify://token"
```
