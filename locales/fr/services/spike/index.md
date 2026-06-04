---
title: "Notifications Spike.sh"
description: "Envoyer des notifications Spike.sh."
sidebar:
  label: "Spike.sh"

source: https://www.spike.sh

schemas:
  - spike

sample_urls:
  - https://api.spike.sh/v1/alerts/{integration_key}
  - spike://{integration_key}

limits:
  max_chars: 20000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Une fois votre source d'alerte creee dans Spike.sh, le service vous fournira une URL webhook ressemblant a ceci :

```text
https://api.spike.sh/v1/alerts/1234567890abcdef1234567890abcdef
```

Cette longue cle a la fin est votre `integration_key`, que vous pouvez utiliser directement dans Apprise.

---

### Instructions de Configuration

1. Connectez-vous a votre [tableau de bord Spike.sh](https://www.spike.sh/).
2. Ouvrez **Alert Sources** puis creez une nouvelle source, par exemple pour un outil de supervision.
3. Copiez l'**URL de webhook** fournie, et plus precisement son `integration_key`.

Une fois la source d'alerte creee, Spike.sh vous fournira une URL webhook comme celle-ci :

```text
https://api.spike.sh/v1/alerts/1234567890abcdef1234567890abcdef
                              |     integration_key           |
```

Cette longue cle finale est votre `integration_key`, utilisable directement dans Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `https://api.spike.sh/v1/alerts/{integration_key}`
- `spike://{integration_key}`

## Détail des Paramètres

| Variable        | Obligatoire | Description                                                                          |
| --------------- | ----------- | ------------------------------------------------------------------------------------ |
| integration_key | Oui         | Jeton de 32 caracteres identifiant de maniere unique votre source d'alerte Spike.sh. |
| token           | Non         | Alias de `integration_key`.                                                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Utilisation de l'URL Apprise simplifiee :

```bash
# Supposons que notre jeton soit 1234567890abcdef1234567890abcdef

apprise -vv -t "Alerte Spike" -b "Incident survenu" \
   spike://1234567890abcdef1234567890abcdef
```

Utilisation du jeton comme parametre d'URL :

```bash
apprise -vv -t "Alerte Spike" -b "Incident survenu" \
   spike://?token=1234567890abcdef1234567890abcdef
```

Utilisation de l'URL webhook native complete :

```bash
apprise -vv -t "Alerte Spike" -b "Incident survenu" \
   https://api.spike.sh/v1/alerts/1234567890abcdef1234567890abcdef
```
