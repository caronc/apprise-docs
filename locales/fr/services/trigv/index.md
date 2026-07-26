---
title: "Notifications Trigv"
description: "Envoyer des alertes vers un ou plusieurs canaux d'un espace de travail Trigv."
sidebar:
  label: "Trigv"

source: https://trigv.com/

schemas:
  - trigv: insecure
  - trigvs

has_image: true
has_selfhosted: true

sample_urls:
  - trigvs://{api_key}
  - trigvs://{api_key}/{channel}
  - trigvs://{api_key}/{channel1}/{channel2}
  - trigv://{api_key}@{host}/{channel}

limits:
  - name: "Titre"
    max_chars: 255
  - name: "Corps"
    max_chars: 1000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour utiliser ce plugin, vous devez disposer d'un espace de travail [Trigv](https://trigv.com/) et d'une clé API d'ingestion.

1. Connectez-vous à votre espace de travail Trigv.
2. Dans les paramètres de l'espace de travail, générez une **clé API** d'ingestion. Elle ressemble à `trgv_AbCdEfGh_0123456789abcdef0123456789abcdef`.
3. Choisissez le ou les canaux (channels) vers lesquels les alertes doivent être envoyées. Si vous n'en indiquez aucun, les alertes sont envoyées vers le canal `general`.

## Syntaxe

La syntaxe valide est la suivante :

- `trigvs://{api_key}`
- `trigvs://{api_key}/{channel}`

Plusieurs canaux peuvent être notifiés en un seul appel en les séparant par une barre oblique :

- `trigvs://{api_key}/{channel1}/{channel2}`

Si vous exploitez votre propre passerelle d'ingestion Trigv auto-hébergée, vous pouvez y connecter Apprise directement, avec un port optionnel :

- `trigv://{api_key}@{hostname}/{channel}`
- `trigvs://{api_key}@{hostname}:{port}/{channel}`

`trigv://` communique avec votre nom d'hôte en HTTP simple ; `trigvs://` (utilisé par défaut lorsqu'aucun nom d'hôte n'est fourni) utilise toujours HTTPS.

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                      |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api_key    | Oui         | Votre clé API d'ingestion de l'espace de travail Trigv.                                                                                                          |
| channel    | Non         | Un ou plusieurs canaux vers lesquels envoyer l'alerte (séparez plusieurs canaux par un `/` dans le chemin de l'URL). Par défaut `general` si aucun n'est fourni. |
| to         | Non         | Une liste de canaux supplémentaires à notifier, séparés par des virgules, fournie via l'argument `?to=`.                                                         |
| url        | Non         | Une URL supplémentaire à joindre à l'alerte (par ex. un lien vers un tableau de bord ou une exécution).                                                          |
| image_url  | Non         | Une URL d'image publiquement accessible à afficher avec l'alerte.                                                                                                |
| urgency    | Non         | Force le niveau d'urgence de livraison à `standard` ou `time_sensitive`. Par défaut, les échecs sont automatiquement escaladés vers `time_sensitive`.            |
| event_type | Non         | Une étiquette de type d'événement libre associée à l'alerte (par ex. `backup.failed`).                                                                           |
| priority   | Non         | Une priorité de style Pushover. Toute valeur de `1` ou plus est traitée comme `?urgency=time_sensitive`.                                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une alerte simple vers le canal par défaut :

```bash
apprise -vv -t "Cron" -b "Échec de la sauvegarde" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef"
```

Envoyer vers un canal spécifique avec un lien supplémentaire :

```bash
apprise -vv -t "Déploiement terminé" -b "v2.4.1 livrée en production" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef/deploys/?url=https://ci.example.com/runs/42"
```

Notifier plusieurs canaux en une seule fois :

```bash
apprise -vv -t "Disque presque plein" -b "/var est à 95 %" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef/ops/oncall"
```

Forcer une livraison urgente :

```bash
apprise -vv -t "Disque presque plein" -b "/var est à 95 %" \
   "trigvs://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef/?urgency=time_sensitive"
```

Utiliser une passerelle d'ingestion auto-hébergée sur un port personnalisé au lieu de api.trigv.com :

```bash
apprise -vv -t "Test" -b "Bonjour depuis une passerelle locale" \
   "trigv://trgv_AbCdEfGh_0123456789abcdef0123456789abcdef@trigv.internal.example.com:8080/general"
```
