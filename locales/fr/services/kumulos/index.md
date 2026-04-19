---
title: "Notifications Kumulos"
description: "Envoyer Kumulos notifications."
sidebar:
  label: "Kumulos"

source: https://kumulos.com/

schemas:
  - kumulos

sample_urls:
  - kumulos://{ApiKey}/{ServerKey}

limits:
  max_chars: 240
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

To use this plugin, you must have a Kumulos account set up. Add at least 1 client and link it with your phone using the phone app (using your _Companion App_ option in the profile menu area):

- [Android App](https://play.google.com/store/apps/details?id=com.kumulos.companion)
- [iOS](https://apps.apple.com/us/app/kumulos/id1463947782)

To use Kumulos, you will need to acquire your _API Key_ and _Server Key_. Both of these are accessible via the Kumulos Dashboard.

## Syntaxe

La syntaxe valide est la suivante :

- `kumulos://{ApiKey}/{ServerKey}`

## Detail des parametres

| Variable  | Required | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| ApiKey    | Yes      | The _API Key_ associated with your Kumulos account.       |
| ServerKey | Yes      | The _Server Secret_ associated with your Kumulos account. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une Kumulos Notification:

```bash
# Assuming our {APIKey} is 8b799edf-6f98-4d3a-9be7-2862fb4e5752
# Assuming our {ServerKey} is aNe8IVQvUay79KEOt8jEh2GPWOwRKAXG+lP7
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   kumulos://8b799edf-6f98-4d3a-9be7-2862fb4e5752/aNe8IVQvUay79KEOt8jEh2GPWOwRKAXG+lP7
```
