---
title: "Notifications Signalgrid"
description: "Envoyer des notifications push aux appareils iOS et Android avec Signalgrid"
sidebar:
  label: "Signalgrid"

source: https://signalgrid.co/
group: general

schemas:
  - signalgrid

sample_urls:
  - signalgrid://{client_key}/{channel}
  - signalgrid://{client_key}/{channel1}/{channel2}
  - signalgrid://{client_key}/{channel}?critical=true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser Signalgrid avec Apprise :

1. Connectez-vous à votre compte Signalgrid.
2. Récupérez votre clé client (client key) Signalgrid.
3. Créez ou sélectionnez un canal et copiez son jeton de canal.
4. Utilisez la clé client et le jeton de canal dans votre URL Apprise.

Une documentation supplémentaire sur l'intégration Signalgrid est disponible ici :
[Guide d'intégration Apprise de Signalgrid](https://docs.signalgrid.co/integrations/apprise/).

## Syntaxe

La syntaxe valide est la suivante :

- `signalgrid://{client_key}/{channel}`
- `signalgrid://{client_key}/{channel1}/{channel2}`
- `signalgrid://{client_key}/{channel}?critical=true`

Vous pouvez également fournir des canaux supplémentaires avec le paramètre
`to=`, à la place ou en complément du chemin de l'URL :

- `signalgrid://{client_key}/{channel}?to={channel2},{channel3}`

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                |
| ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| client_key | oui    | Votre clé client Signalgrid.                                                                                                               |
| channel    | oui    | Un ou plusieurs jetons de canal Signalgrid à notifier. Chaque canal reçoit sa propre notification.                                         |
| to         | non    | Liste de jetons de canal supplémentaires à notifier, séparés par des virgules, fournie sous forme de paramètre de requête.                 |
| critical   | non    | Indique si la notification doit être livrée comme une notification critique. Accepte `true` ou `false` ; la valeur par défaut est `false`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Types de Notification

Les types de notification Apprise sont automatiquement associés aux types de notification Signalgrid :

| Apprise | Signalgrid |
| ------- | ---------- |
| info    | INFO       |
| success | SUCCESS    |
| warning | WARN       |
| failure | CRIT       |

Le type de notification et le paramètre `critical` sont indépendants. Par exemple, une notification peut utiliser le type Signalgrid `CRIT` sans être livrée comme une notification critique.

## Exemples

Envoyer une notification normale :

```bash
apprise -vv \
   -t "Server Status" \
   -b "Server is online" \
   "signalgrid://CLIENT_KEY/CHANNEL?critical=false"
```

Envoyer une notification d'échec critique :

```bash
apprise -vv \
   -t "Server Down" \
   -b "The server is unreachable" \
   -n failure \
   "signalgrid://CLIENT_KEY/CHANNEL?critical=true"
```

Envoyer la même notification à plusieurs canaux à la fois :

```bash
apprise -vv \
   -t "Deployment Complete" \
   -b "The latest release is live" \
   "signalgrid://CLIENT_KEY/CHANNEL1/CHANNEL2"
```
