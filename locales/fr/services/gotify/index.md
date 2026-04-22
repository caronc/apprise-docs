---
title: "Notifications Gotify"
description: "Envoyer des notifications Gotify."
sidebar:
  label: "Gotify"

source: https://github.com/gotify/server

schemas:
  - gotify: insecure
  - gotifys

has_selfhosted: true

sample_urls:
  - gotify://{hostname}/{token}
  - gotifys://{hostname}:{port}/{token}
  - gotifys://{hostname}:{port}/{path}/{token}
  - gotifys://{hostname}/{token}/?priority=high
---

<!-- SERVICE:DETAILS -->

## Syntaxe

La syntaxe valide est la suivante :

- `gotify://{hostname}/{token}`
- `gotifys://{hostname}/{token}`
- `gotifys://{hostname}:{port}/{token}`
- `gotifys://{hostname}/{path}/{token}`
- `gotifys://{hostname}:{port}/{path}/{token}`
- `gotifys://{hostname}/{token}/?priority=high`

Les connexions securisees, via HTTPS, doivent etre referencees avec **gotifys://**, tandis que les connexions non securisees, via HTTP, doivent etre referencees avec **gotify://**.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                                                                                                           |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Oui         | Serveur Gotify auquel vous envoyez votre notification.                                                                                                                                                                                                |
| token    | Oui         | Application Token que vous avez genere sur votre serveur Gotify.                                                                                                                                                                                      |
| port     | Non         | Port sur lequel le serveur Gotify ecoute. La valeur par defaut est **80** pour **gotify://** et **443** pour toutes les references **gotifys://**.                                                                                                    |
| path     | Non         | Pour les personnes hebergeant leur serveur Gotify sur un hote necessitant un prefixe de chemin supplementaire, il suffit de l'inclure dans l'URL. La valeur par defaut est '**/**'. L'important est que la derniere entree de l'URL reste le _token_. |
| priority | Non         | Niveau de priorite avec lequel transmettre le message. Les valeurs possibles sont **low**, **moderate**, **normal** et **high**. Si aucune priorite n'est precisee, **normal** est utilise.                                                           |
| format   | Non         | Format de message a annoncer a Gotify. Par defaut, toutes les informations sont identifiees comme `text`. Vous pouvez toutefois definir cette valeur sur `markdown`.                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message Gotify :

```bash
# Supposons que notre {hostname} soit localhost
# Supposons que notre {token} soit abcdefghijklmn
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gotify://gotify.server.local/abcdefghijklmn"

# Si votre serveur est heberge ailleurs et exige un chemin supplementaire
# pour y acceder, vous pouvez le notifier comme suit :
# Supposons que notre {hostname} soit localhost
# Supposons que notre {token} soit abcdefghijklmn
# Supposons que notre {path} soit /my/gotify/path/
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gotify://gotify.server.local/my/gotify/path/abcdefghijklmn"
```

Il existe aussi une prise en charge de **markdown** si vous souhaitez l'exploiter ; ajoutez simplement `format=markdown` a votre URL :

```bash
# Supposons que notre {hostname} soit localhost
# Supposons que notre {token} soit abcdefghijklmn
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "gotify://gotify.server.local/abcdefghijklmn?format=markdown"
#                                                ^      ^
#                                                |      |
```
