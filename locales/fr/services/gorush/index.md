---
title: "Notifications Gorush"
description: "Envoyez des notifications push vers des appareils iOS, Android et Huawei avec votre propre serveur Gorush."
sidebar:
  label: "Gorush"

source: https://github.com/appleboy/gorush

schemas:
  - gorush: insecure
  - gorushs

has_selfhosted: true

body_formats:
  - text

sample_urls:
  - gorush://{host}:{port}/{device_token}
  - gorush://{host}:{port}/{device_token1}/{device_token2}?platform=ios
  - gorushs://{user}:{password}@{host}/{device_token}

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[Gorush](https://github.com/appleboy/gorush) est un serveur de notifications push que vous hébergez vous-même. Il transmet vos messages aux appareils Apple (APNs), Android (Firebase Cloud Messaging) et Huawei (HMS).

1. Installez et démarrez Gorush en suivant son [guide d'installation](https://github.com/appleboy/gorush#run-gorush-web-server). Il écoute sur le port `8088` par défaut.
2. Dans le fichier de configuration de Gorush, activez et configurez chaque plateforme que vous comptez utiliser (`ios`, `android` et/ou `huawei`).
3. Récupérez les jetons d'appareil que votre application mobile a enregistrés pour les notifications push.

Gorush n'a pas d'identifiant de connexion propre. Si vous l'avez placé derrière un proxy inverse qui demande un nom d'utilisateur et un mot de passe, ajoutez-les à votre URL Apprise.

Tous les jetons d'appareil d'une même URL doivent appartenir à la même plateforme. Pour joindre à la fois des iPhone et des téléphones Android, ajoutez une URL par plateforme.

:::tip
Gorush n'indique quels appareils ont échoué que si `sync: true` est défini dans la section `core` de sa configuration. Avec cette option, Apprise peut vous signaler les appareils qui n'ont pas reçu le message, et un `?retry=` n'envoie qu'à ces appareils.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `gorush://{host}/{device_token}`
- `gorush://{host}:{port}/{device_token}`
- `gorush://{user}:{password}@{host}:{port}/{device_token}`
- `gorushs://{user}:{password}@{host}/{device_token}`

Vous pouvez envoyer à autant d'appareils que vous le souhaitez :

- `gorush://{host}:{port}/{device_token1}/{device_token2}/{device_tokenN}`

Utilisez `gorushs://` lorsque Gorush est accessible en HTTPS, par exemple derrière un proxy inverse.

## Détail des paramètres

| Variable     | Requis | Description                                                                                                                                                                                    |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host         | Oui    | Le nom d'hôte ou l'adresse IP de votre serveur Gorush.                                                                                                                                         |
| port         | Non    | Le port d'écoute de Gorush. Gorush utilise **8088** sauf si vous l'avez modifié. Par défaut **80** pour `gorush://` et **443** pour `gorushs://`.                                              |
| user         | Non    | Le nom d'utilisateur, si un proxy inverse placé devant Gorush en demande un.                                                                                                                   |
| password     | Non    | Le mot de passe, si un proxy inverse placé devant Gorush en demande un.                                                                                                                        |
| device_token | Oui    | Le jeton push d'un appareil à notifier. Ajoutez-en autant que vous le souhaitez.                                                                                                               |
| platform     | Non    | La plateforme des jetons d'appareil : `ios`, `android` ou `huawei`. Vous pouvez aussi utiliser `apns`, `fcm`, `hms` ou les numéros Gorush `1`, `2` et `3`. La valeur par défaut est `android`. |
| mode         | Non    | Un autre nom pour `platform`.                                                                                                                                                                  |
| priority     | Non    | La priorité du push : `normal` ou `high`. Si elle n'est pas définie, Gorush utilise sa propre valeur par défaut.                                                                               |
| topic        | Non    | Le sujet à envoyer avec le push. Sur iOS, il s'agit de l'identifiant de bundle de votre application, par exemple `com.example.app`.                                                            |
| sound        | Non    | Le son à jouer à l'arrivée de la notification, par exemple `default`.                                                                                                                          |
| badge        | Non    | Le nombre à afficher sur l'icône de l'application (iOS uniquement).                                                                                                                            |
| to           | Non    | Une autre façon de lister les jetons d'appareil, séparés par des virgules.                                                                                                                     |

Vous pouvez aussi transmettre des données supplémentaires à votre application mobile en ajoutant `+clé=valeur` à l'URL. Par exemple, `?+screen=alerts` envoie `screen` avec la valeur `alerts`.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification à un appareil Android via Gorush sur la même machine :

```bash
# En supposant que Gorush écoute sur localhost:8088
# En supposant que notre jeton d'appareil est abcdef1234567890
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gorush://localhost:8088/abcdef1234567890"
```

Envoyer à deux iPhone avec un son, un badge et l'identifiant de bundle de votre application :

```bash
# En supposant que nos jetons d'appareil sont token1 et token2
apprise -vv -t "Alert" -b "Server is down!" \
   "gorush://localhost:8088/token1/token2?platform=ios&topic=com.example.app&sound=default&badge=1"
```

Envoyer via un proxy inverse HTTPS qui demande un identifiant :

```bash
# En supposant que notre proxy est push.example.com et l'identifiant admin/secret
apprise -vv -b "Backup finished" \
   "gorushs://admin:secret@push.example.com/abcdef1234567890?priority=high"
```
