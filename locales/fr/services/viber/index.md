---
title: "Notifications Viber"
description: "Envoyer des notifications Viber."
sidebar:
  label: "Viber"

source: https://www.viber.com/

schemas:
  - viber

sample_urls:
  - viber://{token}/{receiver}
  - viber://{token}/{receiver1}/{receiver2}/{receiverN}

limits:
  max_chars: 30000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Les notifications Viber sont transmises via l'**API REST Viber Bot (compte public)**.  
L'authentification est geree a l'aide d'un unique jeton d'authentification de robot.

Important : les robots Viber ne peuvent **envoyer des messages qu'aux utilisateurs abonnes au robot**. Vous ne pouvez pas contacter des utilisateurs arbitraires ni des numeros de telephone quelconques.

Pour commencer :

1. creez un robot Viber via le portail developpeur Viber ;
2. recuperez votre **jeton d'authentification du robot**, parfois appele cle applicative ;
3. relevez un ou plusieurs **identifiants de destinataire** depuis les evenements de rappel du robot, comme `subscribed` ou `message` ;
4. utilisez ensuite le jeton et les identifiants de reception avec l'URL Apprise `viber://`.

## Syntaxe

La syntaxe valide est la suivante :

- `viber://{token}/{receiver}`
- `viber://{token}/{receiver1}/{receiver2}/{receiverN}`

Les valeurs `{receiver}` correspondent aux identifiants Viber des utilisateurs abonnes a votre robot.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                        |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui         | Jeton d'authentification du robot Viber, envoye comme `X-Viber-Auth-Token`.                                                        |
| receiver | Oui         | Un ou plusieurs identifiants de reception Viber, c'est-a-dire des abonnes au robot.                                                |
| from     | Non         | Nom d'expediteur affiche dans Viber. Par defaut, le nom de l'application Apprise est utilise et tronque a 28 caracteres si besoin. |
| avatar   | Non         | URL d'une image d'avatar pour l'expediteur.                                                                                        |
| to       | Non         | Alias pour les identifiants `receiver`. Accepte une liste separee par des virgules pour plus de praticite.                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message a un destinataire unique :

```bash
apprise -vv -b "Bonjour d'Apprise" \
  "viber://MYTOKEN/RECEIVER_ID"
```

Envoyer un message a plusieurs destinataires :

```bash
apprise -vv -b "Deployment completed successfully" \
  "viber://MYTOKEN/ID1/ID2/ID3"
```

Envoyer un message en utilisant l'alias `to=` et des details expediteur personnalises :

```bash
apprise -vv -b "System Alert" \
  "viber://MYTOKEN/?to=ID1,ID2&from=Apprise&avatar=https://example.com/avatar.png"
```
