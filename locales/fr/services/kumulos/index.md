---
title: "Notifications Kumulos"
description: "Envoyer des notifications Kumulos."
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

Pour utiliser ce plugin, vous devez disposer d'un compte Kumulos configure. Ajoutez au moins un client puis associez-le a votre telephone a l'aide de l'application mobile, via l'option _Companion App_ dans le menu de profil :

- [Android App](https://play.google.com/store/apps/details?id=com.kumulos.companion)
- [iOS](https://apps.apple.com/us/app/kumulos/id1463947782)

Pour utiliser Kumulos, vous devrez recuperer votre _API Key_ et votre _Server Key_. Toutes deux sont accessibles depuis le tableau de bord Kumulos.

## Syntaxe

La syntaxe valide est la suivante :

- `kumulos://{ApiKey}/{ServerKey}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                     |
| --------- | ----------- | ----------------------------------------------- |
| ApiKey    | Oui         | _API Key_ associee a votre compte Kumulos.      |
| ServerKey | Oui         | _Server Secret_ associe a votre compte Kumulos. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Kumulos :

```bash
# Supposons que notre {APIKey} soit 8b799edf-6f98-4d3a-9be7-2862fb4e5752
# Supposons que notre {ServerKey} soit aNe8IVQvUay79KEOt8jEh2GPWOwRKAXG+lP7
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   kumulos://8b799edf-6f98-4d3a-9be7-2862fb4e5752/aNe8IVQvUay79KEOt8jEh2GPWOwRKAXG+lP7
```
