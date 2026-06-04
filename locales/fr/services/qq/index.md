---
title: "Notifications QQ Push"
description: "Envoyer des notifications QQ Push."
sidebar:
  label: "QQ Push"

source: https://github.com/songquanpeng/message-pusher

schemas:
  - qq

sample_urls:
  - https://qmsg.zendee.cn/send/{token}
  - qq://{token}

limits:
  max_chars: 10000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

QQ Push est une passerelle tierce permettant d'envoyer des notifications aux utilisateurs QQ via des services comme [qmsg.zendee.cn](https://qmsg.zendee.cn/).

Pour l'utiliser avec Apprise, vous devez vous inscrire et obtenir un **Token** personnel.

1. Rendez-vous sur [qmsg.zendee.cn](https://qmsg.zendee.cn/) et connectez-vous avec votre compte QQ.
2. Une fois connecté, générez et copiez votre **token**.
3. Vous recevrez une URL webhook ressemblant à ceci :

```text
https://qmsg.zendee.cn/send/abc123def456ghi789jkl012mno345pq
```

Vous pouvez utiliser le webhook natif complet ou une URL Apprise simplifiée.

## Syntaxe

La syntaxe valide est la suivante :

- `https://qmsg.zendee.cn/send/{token}`
- `qq://{token}`
- `qq://?token={token}`

## Détail des Paramètres

| Variable | Requis | Description                                                |
| -------- | ------ | ---------------------------------------------------------- |
| token    | Oui    | Votre token QQ Push personnel obtenu depuis qmsg.zendee.cn |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

En utilisant l'URL Apprise simplifiée :

```bash
apprise -vv -t "Titre QQ" -b "Contenu du Message" \
    qq://abc123def456ghi789jkl012mno345pq
```

En utilisant la forme avec paramètre de requête :

```bash
apprise -vv -t "Titre QQ" -b "Contenu du Message" \
    qq://?token=abc123def456ghi789jkl012mno345pq
```

En utilisant l'URL webhook native :

```bash
apprise -vv -t "Titre QQ" -b "Contenu du Message" \
    https://qmsg.zendee.cn/send/abc123def456ghi789jkl012mno345pq
```
