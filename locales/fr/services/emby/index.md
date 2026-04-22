---
title: "Notifications Emby"
description: "Envoyer des notifications Emby, messages a l'ecran."
sidebar:
  label: "Emby"

source: https://emby.media

has_selfhosted: true

schemas:
  - emby: insecure
  - embys

sample_urls:
  - embys://{hostname}
  - emby://{hostname}:{port}
  - emby://{userid}:{password}@{hostname}
  - embys://{userid}:{password}@{hostname}:{port}
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `emby://{hostname}`
- `emby://{hostname}:{port}`
- `emby://{userid}:{password}@{hostname}`
- `emby://{userid}:{password}@{hostname}:{port}`
- `embys://{hostname}`
- `embys://{hostname}:{port}`
- `embys://{userid}:{password}@{hostname}`
- `embys://{userid}:{password}@{hostname}:{port}`

Les connexions securisees, via HTTPS, doivent etre referencees avec **embys://**, tandis que les connexions non securisees, via HTTP, doivent utiliser **emby://**.

## Compatibilite Jellyfin

Le plugin de notification **Emby** d'Apprise fonctionne egalement avec **Jellyfin**.

Si vous souhaitez rendre votre intention plus explicite dans les fichiers de configuration, vous pouvez aussi utiliser les schemas Jellyfin, par exemple :

- `jellyfin://...`
- `jellyfins://...`

Si vous ciblez Jellyfin, privilegiez ces schemas et consultez la [documentation du service Jellyfin](../jellyfin/) pour les exemples et les details.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                    |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Serveur sur lequel Emby ecoute.                                                                                |
| port     | Non         | Port sur lequel le serveur ecoute. Par defaut, il s'agit de **8096** pour **emby://** comme pour **embys://**. |
| userid   | Oui         | Identifiant de connexion a votre serveur Emby.                                                                 |
| password | Non         | Mot de passe associe a votre serveur Emby.                                                                     |
| modal    | Non         | Definit si la notification doit apparaitre sous forme de fenetre modale. Par defaut, cette valeur vaut `No`.   |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification a un serveur a l'ecoute sur le port par defaut, `8096` :

```bash
# Supposons que notre {hostname} soit media.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "emby://user:password@media.server.local"
```

Envoyer une notification securisee, en HTTPS :

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "embys://user:password@media.server.local"
```
