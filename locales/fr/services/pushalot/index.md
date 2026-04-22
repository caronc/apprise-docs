---
title: "Notifications Pushalot"
description: "Envoyer des notifications Pushalot."
sidebar:
  label: "Pushalot"

source: https://pushalot.com
schemas:
  - palot

has_image: true
sample_urls:
  - palot://{authorizationtoken}

ended: 2016-11
---

:::note

## Raison de Fin de Service

Il n'y a pas grand-chose à dire ici ; voici leur [dernier tweet public](https://twitter.com/pushalotapp/status/534758031431860224) publié le 18 novembre 2014 :<br/>
![pushalot-last-tweet](./images/53437921-a07a6c00-39cc-11e9-95cc-a120476f292e.png)

Il existe également [cette publication Reddit](https://www.reddit.com/r/pushalot/comments/5ctstq/pushalot_gone/) qui laisse entendre que la fermeture définitive a eu lieu début novembre 2016.

Le service n'a vraisemblablement jamais été rétabli et ils ont simplement fermé boutique.

💡Le service a été retiré d'Apprise dans [apprise/46](https://github.com/caronc/apprise/issues/46)
:::

<!-- SERVICE:DETAILS -->

## Configuration du Compte

La configuration des notifications Pushalot est assez simple. Le message est essentiellement transmis à votre compte Pushalot en ligne, puis relayé vers vos appareils Microsoft.

## Syntaxe

La syntaxe valide est la suivante :

- `palot://{authorizationtoken}`

## Détail des Paramètres

| Variable           | Requis | Description                                                                                                                      |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| authorizationtoken | Oui    | Le jeton d'autorisation associé à votre compte Pushalot. Il s'agit d'une chaîne alphanumérique (d'une longueur de 32 caractères) |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Pushalot :

```bash
# Assuming our {authorizationtoken} is 1f418df7577e32b89ac6511f2eb9aa68
apprise palot://1f418df7577e32b89ac6511f2eb9aa68
```
