---
title: "Notifications ServerChan"
description: "Envoyer des notifications ServerChan."
sidebar:
  label: "ServerChan"

source: https://sct.ftqq.com/

schemas:
  - schan

sample_urls:
  - schan://{sendkey}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Creez votre compte sur le [site officiel de ServerChan](https://sct.ftqq.com/). Une fois votre canal de notification configure, vous recevrez le `sendkey`, ou jeton, utilise pour les notifications.

## Syntaxe

La syntaxe valide est la suivante :

- `schan://{sendkey}`

## Détail des Paramètres

| Variable | Obligatoire | Description                               |
| -------- | ----------- | ----------------------------------------- |
| sendkey  | Oui         | Jeton fourni par votre compte ServerChan. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification ServerChan :

```bash
# Supposons que :
#  - notre {sendkey} soit ABC123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   schan://ABC123
```
