---
title: "Notifications PushMe"
description: "Envoyer PushMe notifications."
sidebar:
  label: "PushMe"

source: https://push.i-i.me/

schemas:
  - pushme

sample_urls:
  - pushme://{token}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez disposer d’un compte chez [PushMe](https://push.i-i.me/) and have downloaded the Phone App.

## Syntaxe

La syntaxe valide est la suivante :

- `pushme://{token}`

## Detail des parametres

| Variable | Required | Description                                                                                                                                      |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Yes      | This is the **push_key** associated with your PushMe Account                                                                                     |
| status   | No       | Optionally include a small little ASCII string representing the notification status being sent (inline with it) by default this is set to `yes`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une PushMe notification:

```bash
# Assuming our {token} (or {push_key}) is abc123

apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushme://abc123
```
