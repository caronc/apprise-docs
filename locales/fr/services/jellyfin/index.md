---
title: "Notifications Jellyfin"
description: "Envoyer des notifications Jellyfin, messages a l'ecran compatibles Emby."
sidebar:
  label: "Jellyfin"

source: https://jellyfin.org

has_selfhosted: true

schemas:
  - jellyfin: insecure
  - jellyfins

sample_urls:
  - jellyfins://{hostname}
  - jellyfin://{hostname}:{port}
  - jellyfin://{userid}:{password}@{hostname}
  - jellyfins://{userid}:{password}@{hostname}:{port}
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `jellyfin://{hostname}`
- `jellyfin://{hostname}:{port}`
- `jellyfin://{userid}:{password}@{hostname}`
- `jellyfin://{userid}:{password}@{hostname}:{port}`
- `jellyfins://{hostname}`
- `jellyfins://{hostname}:{port}`
- `jellyfins://{userid}:{password}@{hostname}`
- `jellyfins://{userid}:{password}@{hostname}:{port}`

Les connexions securisees, via HTTPS, doivent etre referencees avec **jellyfins://**, tandis que les connexions non securisees, via HTTP, doivent utiliser **jellyfin://**.

## Compatibilite Emby

Jellyfin est un fork d'Emby, et Apprise le traite comme une cible de notification compatible Emby.

Si vous utilisez aussi Emby, vous pouvez employer le schema **Emby** de la meme facon :

- `emby://...`
- `embys://...`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                            |
| -------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Serveur sur lequel Jellyfin ecoute.                                                                                    |
| port     | Non         | Port sur lequel le serveur ecoute. Par defaut, il s'agit de **8096** pour **jellyfin://** comme pour **jellyfins://**. |
| userid   | Oui         | Identifiant de connexion a votre serveur Jellyfin.                                                                     |
| password | Non         | Mot de passe associe a votre serveur Jellyfin.                                                                         |
| modal    | Non         | Definit si la notification doit apparaitre sous forme de fenetre modale. Par defaut, cette valeur vaut `No`.           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification a un serveur a l'ecoute sur le port par defaut, `8096` :

```bash
# Supposons que notre {hostname} soit media.server.local
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jellyfin://user:password@media.server.local"
```

Envoyer une notification a un serveur a l'ecoute sur un port non standard :

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jellyfin://user:password@media.server.local:8097"
```

Envoyer une notification securisee, en HTTPS :

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "jellyfins://user:password@media.server.local"
```
