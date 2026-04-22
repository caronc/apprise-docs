---
title: "Notifications PushDeer"
description: "Envoyer des notifications PushDeer."
sidebar:
  label: "PushDeer"

source: https://www.pushdeer.com/

schemas:
  - pushdeer: insecure
  - pushdeers

has_selfhosted: true

sample_urls:
  - pushdeer://{push_key}
  - pushdeers://{hostname}/{push_key}
  - pushdeer://{hostname}:{port}/{push_key}
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devez disposer de l'application [PushDeer](https://www.pushdeer.com/) et obtenir une `PushKey`.
Vous pouvez aussi heberger vous-meme le service a partir du projet open source [PushDeer](https://github.com/easychen/pushdeer).

## Syntaxe

La syntaxe valide est la suivante :

- `pushdeer://{push_key}`
- `pushdeers://{push_key}`
- `pushdeer://{hostname}/{push_key}`
- `pushdeers://{hostname}/{push_key}`
- `pushdeer://{hostname}:{port}/{push_key}`
- `pushdeers://{hostname}:{port}/{push_key}`

## Détail des Paramètres

| Variable | Obligatoire | Description                       |
| -------- | ----------- | --------------------------------- |
| push_key | Oui         | Push key obtenue depuis PushDeer. |
| hostname | Non         | Hote de service personnalise.     |
| port     | Non         | Port de service personnalise.     |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification PushDeer :

```bash
# Supposons que notre {push_key} pushdeer.com soit abcdefghijklmnop-abcdefg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pushdeers://abcdefghijklmnop-abcdefg"

# Pour un hebergement autonome :
# Supposons que notre {push_key} soit abcdefghijklmnop-abcdefg
# Supposons que notre {hostname} soit myserver.example.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushdeers://myserver.example.com/abcdefghijklmnop-abcdefg
```
