---
title: "Notifications Super Toasty"
description: "Envoyer des notifications Super Toasty."
sidebar:
  label: "Super Toasty"

source: http://supertoasty.com/
schemas:
  - toasty

has_image: true
sample_urls:
  - toasty://{user_id}@{device_id}
  - toasty://{user_id}@{device_id1}/{device_id2}/{device_idN}

ended: 2016
---

:::note

## Raison de Fin du Service

Il est difficile de trouver des informations detaillees sur ce projet, ou meme de savoir s'il existe encore sous une forme ou une autre.

Voici le projet open source qui s'appuyait dessus : <https://github.com/JohnPersano/SuperToasts>.

💡 Ce service a ete retire d'Apprise dans [apprise/46](https://github.com/caronc/apprise/issues/46)
:::

<!-- SERVICE:DETAILS -->

## Configuration du compte

La configuration des notifications Super Toasty est tres simple. Le message est essentiellement transmis a votre compte Super Toasty en ligne, puis relaye vers les appareils que vous y avez configures.

## Syntaxe

La syntaxe valide est la suivante :

- `toasty://{user_id}@{device_id}`
- `toasty://{user_id}@{device_id1}/{device_id2}/{device_idN}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                  |
| --------- | ----------- | ------------------------------------------------------------ |
| user_id   | Oui         | Identifiant utilisateur associe a votre compte Super Toasty. |
| device_id | Non         | Identifiant de l'appareil auquel envoyer votre notification. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Super Toasty a un appareil configure :

```bash
# Supposons que notre {user_id} soit nuxref
# Supposons que notre {device_id} soit abcdefghijklmnop-abcdefg
apprise toasty://nuxref@abcdefghijklmnop-abcdefg
```
