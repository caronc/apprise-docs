---
title: "Notifications Twist"
description: "Envoyer des notifications Twist."
sidebar:
  label: "Twist"

source: https://twist.com

schemas:
  - twist

has_chat: true

sample_urls:
  - twist://{password}:{email}
  - twist://{email}/{password}
  - twist://{password}:{email}/#{channel}
  - twist://{email}/{password}/#{channel}

limits:
  max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

[Connectez-vous](https://twist.com/login) ou [créez un compte](https://twist.com/signup) auprès du [service Twist](https://twist.com) si vous n'en avez pas encore un.

L'essentiel avec le service Twist est que vous vous authentifiez toujours avec un **`{email}`** et un **`{password}`**. Apprise peut fonctionner avec Twist en connaissant simplement ces deux valeurs.

## Syntaxe

La syntaxe valide est la suivante :

- `twist://{password}:{email}`
- `twist://{email}/{password}`

**Remarque :** Si aucun canal n'est spécifié, le canal **#General** est utilisé par défaut.

Vous pouvez également envoyer des messages à un ou plusieurs canaux :

- `twist://{password}:{email}/#{channel}`
- `twist://{email}/{password}/#{channel}`
- `twist://{password}:{email}/#{channel1}/#{channel2}`
- `twist://{email}/{password}/#{channel1}/#{channel2}`

Twist associe toujours votre compte à une _équipe par défaut_. Apprise la détermine pour vous et notifie par défaut les canaux que vous spécifiez au sein de celle-ci. Cependant, comme il est possible que votre identifiant/mot de passe soit associé à plusieurs **équipes**, vous pouvez utiliser le deux-points (:) comme délimiteur pour identifier explicitement l'équipe/canal à contacter.

- `twist://{password}:{email}/#{team}:{channel}`
- `twist://{email}/{password}/#{team}:{channel}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                                                                 |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email    | Oui    | L'adresse e-mail associée à votre compte Twist lors de votre inscription.                                                                                                                                                                                                                                                                   |
| password | Oui    | Le mot de passe défini lors de votre inscription à Twist.                                                                                                                                                                                                                                                                                   |
| channel  | Non    | Le canal que vous souhaitez notifier. Si aucun n'est spécifié, le canal _#General_ sera utilisé par défaut au sein de votre équipe par défaut. Vous pouvez optionnellement utiliser un deux-points (:) placé devant le nom du canal pour forcer l'envoi du message vers une équipe spécifique (si vous faites partie de plusieurs équipes). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Twist vers le canal #general associé à notre équipe par défaut.

```bash
# Assume:
#  - our {email} is test@example.com
#  - our {password} is abc123
#  - The {channel} is #general
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   twist://abc123:test@example.com/#general
```
