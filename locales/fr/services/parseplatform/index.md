---
title: "Notifications Parse Platform"
description: "Envoyer des notifications Parse Platform."
sidebar:
  label: "Parse Platform"

source: https://parseplatform.org/

schemas:
  - parsep: insecure
  - parseps

has_selfhosted: true

sample_urls:
  - parsep://{app_id}:{master_key}@{hostname}
  - parseps://{app_id}:{master_key}@{hostname}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

## Syntaxe

Les canaux sont facultatifs ; si aucun canal n'est spécifié, vous êtes simplement notifié personnellement.

La syntaxe valide est la suivante :

- `parsep://{app_id}:{master_key}@{hostname}`
- `parseps://{app_id}:{master_key}@{hostname}`

## Détail des Paramètres

| Variable   | Requis | Description                                   |
| ---------- | ------ | --------------------------------------------- |
| app_id     | Oui    | L'identifiant de l'application                |
| master_key | Oui    | La Master Key associée à votre compte         |
| hostname   | Oui    | Le nom d'hôte de votre serveur Parse Platform |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Parse Platform :

```bash
# Assume:
#  - our {app_id} is abc123
#  - our {master_key} is a6k4ABnck26hDh8AA3EDHoOVdDEUlw3nty
#  - our {hostname} is parseplatform.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   parsep://app_id:master_key@parseplatform.local
```
