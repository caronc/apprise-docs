---
title: "Notifications Pushplus"
description: "Envoyer des notifications Pushplus."
sidebar:
  label: "Pushplus"

source: https://www.pushplus.plus/

schemas:
  - pushplus

sample_urls:
  - https://www.pushplus.plus/send?token={token}
  - pushplus://{token}

limits:
  max_chars: 20000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pushplus est une plateforme de notification chinoise utilisée pour envoyer des alertes vers WeChat ou des points de terminaison de navigateur. Elle utilise un système de webhook basé sur des tokens pour distribuer les messages.

Une fois que vous avez créé un compte et souscrit à un canal, un **token** vous sera attribué pour l'envoi des messages.

1. Inscrivez-vous ou connectez-vous à votre compte sur [Pushplus](https://www.pushplus.plus/).
2. Depuis votre tableau de bord, copiez votre **Token** sous la section « Push ».
3. Configurez optionnellement l'application Pushplus dans WeChat pour la livraison mobile.

Votre URL de notification ressemblera à ceci :

```text
https://www.pushplus.plus/send?token=abc123def456ghi789jkl012mno345pq
```

Apprise prend en charge à la fois l'URL native complète du webhook Pushplus et sa version simplifiée.

## Syntaxe

La syntaxe valide est la suivante :

- `https://www.pushplus.plus/send?token={token}`
- `pushplus://{token}`

## Détail des Paramètres

| Variable | Requis | Description                                                             |
| -------- | ------ | ----------------------------------------------------------------------- |
| token    | Oui    | Votre token Pushplus personnel disponible dans les paramètres du compte |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Utilisation de l'URL Apprise simplifiée :

```bash
apprise -vv -t "Title" -b "Ceci est le Corps du Message" \
    pushplus://abc123def456ghi789jkl012mno345pq
```

Utilisation du token en tant que paramètre de requête :

```bash
apprise -vv -t "Title" -b "Ceci est le Corps du Message" \
    pushplus://?token=abc123def456ghi789jkl012mno345pq
```

Utilisation de l'URL native complète du webhook :

```bash
apprise -vv -t "Title" -b "Ceci est le Corps du Message" \
    https://www.pushplus.plus/send?token=abc123def456ghi789jkl012mno345pq
```
