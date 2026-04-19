---
title: "Notifications Seven"
description: "Envoyer Seven notifications."
sidebar:
  label: "Seven"

source: https://www.seven.io/

schemas:
  - seven

has_sms: true

sample_urls:
  - seven://{token}/{target}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Signup [from here](https://www.seven.io/). It is from the device you can access its web interface and configure your access token.

## Syntaxe

La syntaxe valide est la suivante :

- `seven://{token}/{target}`

## Detail des parametres

| Variable | Required | Description                                                             |
| -------- | -------- | ----------------------------------------------------------------------- |
| token    | Yes      | This is your generated Access Token associated with your Seven account. |
| target   | Yes      | One or more phone number(s) you wish to send your notification to.      |
| flash    | No       | Flash mode (default is `no` ); specify `yes` to enable                  |
| label    | No       | Defines a label                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Seven notification:

```bash
# Assuming our {AccessToken} is abcd123
# Assuming we want to notify 555221237, and +18005551234
# Test out the changes with the following command:
apprise -t "Test Title" -b "Test Message" \
 seven://abcd123/555221237/+18005551234

```
