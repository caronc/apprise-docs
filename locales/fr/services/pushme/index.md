---
title: "Notifications PushMe"
description: "Envoyer des notifications PushMe."
sidebar:
  label: "PushMe"

source: https://push.i-i.me/

schemas:
  - pushme

sample_urls:
  - pushme://{token}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez disposer d'un compte chez [PushMe](https://push.i-i.me/) et avoir telecharge l'application mobile.

## Syntaxe

La syntaxe valide est la suivante :

- `pushme://{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                        |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Oui         | Il s'agit de la **push_key** associee a votre compte PushMe.                                                                                                       |
| status   | Non         | Permet facultativement d'inclure une petite chaine ASCII representant l'etat de la notification envoyee, integree au message. Par defaut, cette option vaut `yes`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification PushMe :

```bash
# Supposons que notre {token}, ou {push_key}, soit abc123

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   pushme://abc123
```
