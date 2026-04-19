---
title: "Notifications Chanify"
description: "Envoyer Chanify notifications."
sidebar:
  label: "Chanify"

source: https://chanify.net/

schemas:
  - chanify

sample_urls:
  - chanify://{token}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a Chanify [from here](https://chanify.net/). You will be provided to create a user and password to associate with your account. From here you can generate a token; this is all you need to use this through Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `chanify://{token}`

## Detail des parametres

| Variable | Required | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| token    | **Yes**  | The token you generated as part of your Chanify account |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification to your Chanify account:

```bash
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "chanify://token"
```
