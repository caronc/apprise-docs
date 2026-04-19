---
title: "Notifications ServerChan"
description: "Envoyer ServerChan notifications."
sidebar:
  label: "ServerChan"

source: https://sct.ftqq.com/

schemas:
  - schan

sample_urls:
  - schan://{sendkey}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Register your own account on the [ServerChan Official Website](https://sct.ftqq.com/). After configure the notify channel, you will be provided the sendkey/token used for notifications.

## Syntaxe

La syntaxe valide est la suivante :

- `schan://{sendkey}`

## Detail des parametres

| Variable | Required | Description                                                    |
| -------- | -------- | -------------------------------------------------------------- |
| sendkey  | Yes      | This is token provided to you through your SimpleChan account. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une SimpleChan notification:

```bash
# Assume:
#  - our {sendkey} is ABC123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   schan://ABC123
```
