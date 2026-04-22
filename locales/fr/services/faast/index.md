---
title: "Notifications Faast"
description: "Envoyer des notifications Faast."
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

## Raison de Fin du Service

Inconnue

💡 Ce service a ete retire d'Apprise dans [apprise/1022](https://github.com/caronc/apprise/issues/1222)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

La configuration des notifications Faast est tres simple. Le message est essentiellement transmis a votre compte Faast en ligne, puis relaye vers les appareils que vous y avez configures.

## Syntaxe

La syntaxe valide est la suivante :

- `faast://{authorizationtoken}`

## Détail des Paramètres

| Variable           | Obligatoire | Description                                                        |
| ------------------ | ----------- | ------------------------------------------------------------------ |
| authorizationtoken | Oui         | Jeton d'autorisation associe a votre compte Faast.                 |
| image              | Non         | Associe une image au message. Cette option est activee par defaut. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Faast :

```bash
# Supposons que notre {authorizationtoken} soit abcdefghijklmnop-abcdefg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   faast://abcdefghijklmnop-abcdefg
```
