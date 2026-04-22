---
title: "Notifications Feishu"
description: "Envoyer des notifications Feishu."
sidebar:
  label: "Feishu"

source: https://open.feishu.cn/

schemas:
  - feishu

sample_urls:
  - feishu://{token}

limits:
  max_chars: 19985
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous sur [Feishu](https://open.feishu.cn/), puis [suivez ces instructions](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot) pour creer un bot personnalise et recuperer le jeton dont vous avez besoin.

## Syntaxe

La syntaxe valide est la suivante :

- `feishu://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                            |
| -------- | ----------- | -------------------------------------------------------------------------------------- |
| token    | **Oui**     | Jeton genere lors de la creation de votre bot personnalise Feishu depuis votre compte. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification a votre compte Feishu :

```bash
# Supposons que notre {token} soit token
apprise -vv --body="Message de Test" \
   "feishu://token"
```
