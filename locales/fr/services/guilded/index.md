---
title: "Notifications Guilded"
description: "Envoyer des notifications Guilded."
sidebar:
  label: "Guilded"

source: https://guilded.gg/

schemas:
  - guilded

has_image: true
has_attachments: true

sample_urls:
  - https://media.guilded.gg/webhooks/{WebhookID}/{WebhookToken}
  - guilded://{WebhookID}/{WebhookToken}/
  - guilded://{botname}@{WebhookID}/{WebhookToken}/

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Commencez par creer un compte Guilded sur le site web. Ensuite, vous devrez generer un webhook.

Le webhook ressemblera a quelque chose comme ceci :
`https://media.guilded.gg/webhooks/4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js`

Cela correspond en pratique a :
`https://media.guilded.gg/webhooks/{WebhookID}/{WebhookToken}`

**Remarque :** Apprise prend cette URL en charge _telle quelle_, _depuis la v0.7.7_. Vous n'avez donc plus besoin de l'analyser davantage. Cela dit, il y a un peu moins de surcharge interne si vous le faites.

La derniere partie de l'URL fournie constitue les 2 jetons dont vous avez besoin pour envoyer des notifications. Dans l'exemple ci-dessus, les jetons sont les suivants :

1. **WebhookID** vaut `4174216298`
2. **WebhookToken** vaut `JHMHI8qBe7bk2ZwO5U711o3dV_js`

## Syntaxe

La syntaxe valide est la suivante :

- `https://media.guilded.gg/webhooks/{WebhookID}/{WebhookToken}`
- `guilded://{WebhookID}/{WebhookToken}/`
- `guilded://{botname}@{WebhookID}/{WebhookToken}/`

Guilded prend egalement en charge differents arguments web. Les valeurs ci-dessous correspondent aux valeurs par defaut et n'ont donc pas besoin d'etre precisees, sauf si vous souhaitez les remplacer :

- `guilded://{WebhookID}/{WebhookToken}/?tts=No&avatar=Yes&footer=No&image=Yes`

## Détail des Paramètres

| Variable     | Obligatoire | Description                                                                                                                                                                            |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebhookID    | Oui         | Premiere partie des 2 jetons qui vous sont fournis apres la creation d'un _incoming-webhook_.                                                                                          |
| WebhookToken | Oui         | Seconde partie des 2 jetons qui vous sont fournis apres la creation d'un _incoming-webhook_.                                                                                           |
| botname      | Non         | Nom du bot qui doit publier le message. Si aucune valeur n'est fournie, la valeur par defaut consiste a utiliser simplement votre compte, associe a l'_incoming-webhook_.              |
| tts          | Non         | Active le Text-To-Speech. La valeur par defaut est **No**.                                                                                                                             |
| footer       | Non         | Inclut un pied de message. La valeur par defaut est **No**.                                                                                                                            |
| image        | Non         | Inclut une image dans le message afin de representer le type de notification. La valeur par defaut est **Yes**.                                                                        |
| avatar       | Non         | Remplace l'icone d'avatar Guilded par defaut par une icone identifiant le type de notification. La valeur par defaut est **Yes**.                                                      |
| avatar_url   | Non         | Remplace l'URL de l'icone d'avatar Guilded par defaut. Si elle n'est pas definie, Apprise choisit dynamiquement l'URL en fonction du type de message, info, success, warning ou error. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Guilded :

```bash
# Supposons que notre {WebhookID} soit 4174216298
# Supposons que notre {WebhookToken} soit JHMHI8qBe7bk2ZwO5U711o3dV_js
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "guilded://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js"
```

Si vous souhaitez utiliser votre propre URL d'avatar personnalisee, deja hebergee sur un autre site web, vous pouvez definir ceci :

```bash
# Supposons que notre {WebhookID} soit 4174216298
# Supposons que notre {WebhookToken} soit JHMHI8qBe7bk2ZwO5U711o3dV_js
# Supposons que notre {AvatarURL} soit https://i.imgur.com/FsEpmwg.jpeg
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "guilded://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js?avatar_url=https://i.imgur.com/FsEpmwg.jpeg"
```
