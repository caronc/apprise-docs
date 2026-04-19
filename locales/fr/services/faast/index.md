---
title: "Notifications Faast"
description: "Envoyer Faast notifications."
sidebar:
  label: "Faast"

source: http://www.faast.io/
schemas:
  - faast

has_image: true
sample_urls:
  - faast://{authorizationtoken}

ended: 2022
---

:::note

## Service End Reason

Unknown

💡The Service was removed from Apprise in [apprise/1022](https://github.com/caronc/apprise/issues/1222)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

There isn't too much configuration for Faast notifications. The message is basically just passed to your online Faast account and then gets relayed to your device(s) you've setup from there.

## Syntaxe

La syntaxe valide est la suivante :

- `faast://{authorizationtoken}`

## Detail des parametres

| Variable           | Required | Description                                                      |
| ------------------ | -------- | ---------------------------------------------------------------- |
| authorizationtoken | Yes      | The authorization token associated with your Faast account.      |
| image              | No       | Associate an image with the message. By default this is enabled. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Faast notification

```bash
# Assuming our {authorizationtoken} is abcdefghijklmnop-abcdefg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   faast://abcdefghijklmnop-abcdefg
```
