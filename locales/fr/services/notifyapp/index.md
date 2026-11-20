---
title: "Notifications Notify!"
description: "Envoyer des notifications push vers iPhone, iPad, Mac et navigateurs web avec Notify!."
sidebar:
  label: "Notify!"

source: https://getnotifyapp.com

schemas:
  - notifyapp

has_image: true

body_formats:
  - text

keywords: "pingie"

sample_urls:
  - notifyapp://{device_id}/{token}
  - notifyapp://{group_id}/{token}

limits:
  - name: "Title"
    max_chars: 2048
  - name: "Body"
    max_chars: 16384
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Installez [Notify!](https://getnotifyapp.com) sur votre iPhone, iPad ou Mac, ou ouvrez l'application web dans votre navigateur (c'est ainsi que les appareils Android, Windows et Linux reçoivent les notifications).
1. Ouvrez l'application pour trouver votre **Device ID** et votre **Token**.

### Groupes d'Appareils

Un groupe d'appareils permet à une seule notification d'atteindre tous les appareils qu'il contient. Créez-en un dans l'application, puis ouvrez **Devices** -> **Device Groups** et choisissez votre groupe pour trouver son **Group ID** (il commence par `GRP`) et son propre **Token**. Utilisez-les à la place d'un Device ID et de son Token.

## Syntaxe

La syntaxe valide est la suivante :

- `notifyapp://{device_id}/{token}`
- `notifyapp://{group_id}/{token}`

Vous pouvez aussi coller directement dans Apprise l'URL fournie par l'application Notify! :

- `https://push.getnotifyapp.com/notify/{device_id}?token={token}`

## Détail des Paramètres

| Variable  | Obligatoire | Description                                                                                                                                                   |
| --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device_id | Oui         | Le Device ID affiché dans l'application Notify!, ou un identifiant de groupe d'appareils (commençant par `GRP`).                                              |
| token     | Oui         | Le Token associé à votre Device ID ou à votre identifiant de groupe d'appareils.                                                                              |
| image     | Non         | Affiche une icône correspondant au type de notification à côté du titre. Définissez cette valeur sur `no` pour la désactiver. La valeur par défaut est `yes`. |
| thread    | Non         | Regroupe sur votre appareil les notifications qui partagent le même nom de fil.                                                                               |
| urgent    | Non         | Envoie la notification comme urgente (Time Sensitive) afin qu'elle puisse passer outre les modes Concentration. La valeur par défaut est `no`.                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Notify! :

```bash
# Supposons que notre {device_id} soit IOabcd1234efgh56
# Supposons que notre {token} soit aB3dE5fG7hJ9kL2
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   notifyapp://IOabcd1234efgh56/aB3dE5fG7hJ9kL2
```

Envoyer une notification urgente à un groupe d'appareils, dans son propre fil :

```bash
# Supposons que notre {group_id} soit GRPA1B2C
# Supposons que notre {token} soit aB3dE5fG7hJ9kL2
apprise -vv -t "Échec de la Sauvegarde" -b "La sauvegarde de nuit ne s'est pas terminée" \
   "notifyapp://GRPA1B2C/aB3dE5fG7hJ9kL2?thread=backups&urgent=yes"
```
