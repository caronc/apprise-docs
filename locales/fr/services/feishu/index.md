---
title: "Notifications Feishu"
description: "Envoyer des notifications Feishu."
sidebar:
  label: "Feishu"

source: https://open.feishu.cn/

schemas:
  - feishu

has_chat: true

body_formats:
  - text: default
  - markdown

sample_urls:
  - feishu://{token}

limits:
  max_chars: 19985
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous sur [Feishu](https://open.feishu.cn/), puis [suivez ces instructions](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot) pour creer un bot personnalise et recuperer le jeton dont vous avez besoin.

## Syntaxe

La syntaxe valide est la suivante :

- `feishu://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                 |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | **Oui**     | Jeton genere lors de la creation de votre bot personnalise Feishu depuis votre compte.                                                                                                                      |
| format   | Non         | Accepte `text` (par défaut) ou `markdown`. Le Markdown est envoyé sous forme de carte qui affiche la mise en forme, avec le titre dans l'en-tête de la carte, dont la couleur suit le type de notification. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification a votre compte Feishu :

```bash
# Supposons que notre {token} soit token
apprise -vv --body="Message de Test" \
   "feishu://token"
```

Envoyer une notification Markdown sous forme de carte :

```bash
apprise -vv -t "Alerte disque" --body="**/var** est plein à 95 %" \
   "feishu://token?format=markdown"
```
