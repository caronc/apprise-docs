---
title: "Notifications XBMC"
description: "Envoyer des notifications XBMC."
sidebar:
  label: "XBMC"

source: http://kodi.tv/

schemas:
  - xbmc: insecure

has_image: true

sample_urls:
  - xbmc://{hostname}
  - xbmc://{hostname}:{port}
  - xbmc://{userid}:{password}@{hostname}
  - xbmc://{userid}:{password}@{hostname}:{port}

limits:
  max_chars: 250
---

<!-- SERVICE:DETAILS -->

:::note
XBMC est un produit historique qui a ete remplace par [[KODI|Notify_kodi]]. Cependant, pour les systemes qui ne peuvent pas etre mis a jour, comme un Apple TV2 jailbreake, vous pouvez encore utiliser ce protocole.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `xbmc://{hostname}`
- `xbmc://{hostname}:{port}`
- `xbmc://{userid}:{password}@{hostname}`
- `xbmc://{userid}:{password}@{hostname}:{port}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                     |
| -------- | ----------- | --------------------------------------------------------------- |
| hostname | Oui         | Serveur sur lequel XBMC ecoute.                                 |
| port     | Non         | Port sur lequel XBMC ecoute. La valeur par defaut est **8080**. |
| userid   | Non         | Identifiant de connexion a votre serveur XBMC.                  |
| password | Non         | Mot de passe associe a votre serveur XBMC.                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification XBMC a notre serveur a l'ecoute sur le port `8080` :

```bash
# Supposons que notre {hostname} soit xbmc.server.local
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xbmc://xbmc.server.local"

# Il est possible qu'un utilisateur et un mot de passe protegent votre serveur XBMC ;
# dans ce cas, la variante suivante permet aussi de le joindre :
# Supposons que notre {hostname} soit xbmc.server.local
# Supposons que notre {userid} soit xbmc
# Supposons que notre {password} soit xbmc
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "xbmc://xbmc:xbmc@xbmc.server.local"
```
