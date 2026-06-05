---
title: "Notifications Kodi"
description: "Envoyer des notifications Kodi."
sidebar:
  label: "Kodi"

source: http://kodi.tv/

schemas:
  - kodi: insecure
  - kodis

has_image: true
has_selfhosted: true

sample_urls:
  - kodis://{hostname}
  - kodi://{hostname}:{port}
  - kodi://{userid}:{password}@{hostname}
  - kodis://{userid}:{password}@{hostname}:{port}

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `kodi://{hostname}`
- `kodi://{hostname}:{port}`
- `kodi://{userid}:{password}@{hostname}`
- `kodi://{userid}:{password}@{hostname}:{port}`
- `kodis://{hostname}`
- `kodis://{hostname}:{port}`
- `kodis://{userid}:{password}@{hostname}`
- `kodis://{userid}:{password}@{hostname}:{port}`

Les connexions securisees, via HTTPS, doivent etre referencees avec **kodis://**, tandis que les connexions non securisees, via HTTP, doivent utiliser **kodi://**.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                       |
| -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Serveur sur lequel Kodi ecoute.                                                                                                   |
| port     | Non         | Port sur lequel Kodi ecoute. La valeur par defaut est **80** pour **kodi://** et **443** pour toutes les references **kodis://**. |
| userid   | Non         | Identifiant de connexion a votre serveur Kodi.                                                                                    |
| password | Non         | Mot de passe associe a votre serveur Kodi.                                                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Kodi a notre serveur a l'ecoute sur le port 80 :

```bash
# Supposons que notre {hostname} soit kodi.server.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "kodi://kodi.server.local"
```
