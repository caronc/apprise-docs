---
title: "Notifications Prowl"
description: "Envoyer des notifications Prowl."
sidebar:
  label: "Prowl"

source: https://www.prowlapp.com/

schemas:
  - prowl

sample_urls:
  - prowl://{apikey}
  - prowl://{apikey}/{providerkey}
  - prowl://{apikey}/?priority={priority}

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Prowl exige que vous créiez d'abord un compte sur [prowlapp.com](https://www.prowlapp.com/).

## Syntaxe

La syntaxe valide est la suivante :

- `prowl://{apikey}`
- `prowl://{apikey}/{providerkey}`
- `prowl://{apikey}/?priority={priority}`

## Détail des Paramètres

| Variable    | Required | Description                                                                                                                         |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| apikey      | Yes      | La clé API qui vous est fournie après la création de votre compte Prowl.                                                            |
| providerkey | No       | La clé fournisseur n'est requise que si vous avez été explicitement autorisé.                                                       |
| priority    | No       | Peut être **low**, **moderate**, **normal**, **high** ou **emergency** ; la valeur par défaut est **normal** si rien n'est précisé. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Prowl à notre serveur

```bash
# Assuming our {apikey} is adf9dfjkj24jkafkljkf6f
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   prowl://adf9dfjkj24jkafkljkf6f
```
