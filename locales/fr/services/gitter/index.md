---
title: "Notifications Gitter"
description: "Envoyer des notifications Gitter."
sidebar:
  label: "Gitter"

source: https://gitter.im/

schemas:
  - gitter

ended: 2023-02-13

has_image: true

sample_urls:
  - gitter://{token}/{room}/
  - gitter://{token}/{room1}/{room2}/{roomN}/
  - gitter://{token}/{room}/?image=Yes
---

:::caution

Gitter utilise Matrix et ne dispose plus de son propre service personnalisé. Toutes les informations ci-dessous concernent sa configuration héritée pour ceux qui l'hébergent encore.
:::

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Il n'est pas difficile de créer un compte Gitter [sur leur site web](https://gitter.im/).

À partir de là, vous avez simplement besoin de votre **Jeton d'Accès Personnel** Gitter, ce qui est aussi simple que de visiter leur [site de développement](https://developer.gitter.im/apps) et de vous connecter (si ce n'est pas déjà fait). Presque immédiatement, une boîte de dialogue devrait apparaître vous fournissant votre jeton.

\*\*Remarque : Vous pouvez ignorer la fonctionnalité de génération d'application ici, car elle n'est pas pertinente pour l'envoi d'une notification Apprise.

La dernière chose à savoir est que vous devez avoir déjà rejoint le canal vers lequel vous souhaitez envoyer des notifications. Le **Jeton d'Accès Personnel** vous représente, donc même si vous rejoignez un canal et fermez votre navigateur web, vous faites toujours partie de ce canal (jusqu'à ce que vous vous reconnectiez et quittiez le canal).

Les canaux s'identifient sous la forme **name**/community ; vous n'avez besoin de vous concentrer que sur le nom. Ainsi, si le canal était [**apprise**/community](https://gitter.im/apprise-notifications/community), le nom du canal peut être supposé être **apprise** lors de l'utilisation de ce script.

## Syntaxe

La syntaxe valide est la suivante :

- `gitter://{token}/{room}/`
- `gitter://{token}/{room1}/{room2}/{roomN}/`
- `gitter://{token}/{room}/?image=Yes`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                              |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui    | Le Jeton d'Accès Personnel associé à votre compte. Il est disponible après connexion sur leur [site de développement](https://developer.gitter.im/apps). |
| room     | Non    | La salle que vous souhaitez notifier. Vous pouvez en spécifier autant que vous le souhaitez dans l'URL.                                                  |
| image    | Non    | Envoyer une image représentant le type de message avant d'envoyer le corps du message. Cette option est désactivée par défaut.                           |
| to       | Non    | Ceci est un alias de la variable room.                                                                                                                   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Gitter vers le canal _apprise/community_ :

```bash
# Assuming our {token} is abcdefghij1234567890
# Assuming our {room} is apprise/community
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   gitter:///abcdefghij1234567890/apprise
```
