---
title: "Notifications Synology"
description: "Envoyer des notifications Synology Chat."
sidebar:
  label: "Synology"

source: https://kb.synology.com/en-au/DSM/help/Chat/chat_integration?version=7

schemas:
  - synology: insecure
  - synologys

sample_urls:
  - synologys://{hostname}/{token}
  - synology://{hostname}:{port}/{token}
  - synologys://{user}:{password}@{hostname}/{token}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `synology://{hostname}}/{token}`
- `synology://{hostname}:{port}/{token}`
- `synology://{user}:{password}@{hostname}/{token}`
- `synology://{user}:{password}@{hostname}:{port}/{token}`

Les versions securisees, en HTTPS :

- `synologys://{hostname}/{token}`
- `synologys://{hostname}:{port}/{token}`
- `synologys://{user}:{password}@{hostname}/{token}`
- `synologys://{user}:{password}@{hostname}:{port}/{token}`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                            |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hostname | Oui         | Nom d'hote du serveur web.                                                                                                                             |
| token    | Oui         | Jeton entrant Synology Chat genere.                                                                                                                    |
| port     | Non         | Port sur lequel votre serveur web ecoute. La valeur par defaut est **80** pour **synology://** et **443** pour toutes les references **synologys://**. |
| user     | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _username_ pour vous authentifier.                                      |
| password | Non         | Si votre systeme est configure pour utiliser HTTP-AUTH, vous pouvez fournir le _password_ pour vous authentifier.                                      |

|

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Synology a tous les appareils associes a un projet :

```bash
# Supposons :
#  - que notre {hostname} soit synology.home.arpa
#  - que notre {port} soit 5000
#  - que notre {token} soit j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   synology://synology.home.arpa:5000/j300012fl9y0b5AW9g9Nsejb8P
```
