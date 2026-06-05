---
title: "Notifications Google Chat"
description: "Envoyer des notifications Google Chat."
sidebar:
  label: "Google Chat"

source: https://chat.google.com/

schemas:
  - gchat

has_chat: true

sample_urls:
  - https://chat.googleapis.com/v1/spaces/{workspace}/messages?key={webhook_key}&token={webhook_token}
  - gchat://{workspace}/{webhook_key}/{webhook_token}

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Pour que cela fonctionne correctement, vous avez besoin d'un compte GSuite (des essais gratuits existent si vous n'en avez pas). Vous devez ensuite créer un webhook, comme suit :

1. [Ouvrez Google Chat dans votre navigateur](https://chat.google.com/)
1. Accédez à la salle à laquelle vous souhaitez ajouter un robot.
1. Dans le menu de la salle en haut de la page, sélectionnez **Manage webhooks**.
1. Donnez-lui un nom et un avatar facultatif, puis cliquez sur **SAVE**
1. Copiez l'URL associée à votre nouveau webhook.
1. Cliquez en dehors de la boîte de dialogue pour fermer.

Une fois l'opération terminée, vous obtiendrez une URL ressemblant à ceci :

```text
https://chat.googleapis.com/v1/spaces/AAAAkM/messages?key=AIzaSSjMm-WEfqKqqsHI&token=O7bnyri_WEXKcyFk%3D
                                      ^    ^              ^                  ^       ^                 ^
                                      |    |              |                  |       |                 |
                                     workspace             ... webhook_key...         ..webhook_token..
```

Sous une forme simplifiée, cela donne :

- `https://chat.googleapis.com/v1/spaces/WORKSPACE/messages?key=WEBHOOK_KEY&token=WEBHOOK_TOKEN`

Il est important de noter que, même si ce plugin Apprise utilise `gchat://`, vous pouvez aussi utiliser directement l'URL exactement telle qu'elle vous a été fournie par Google lors du copier-coller. C'est également une URL Google Chat Apprise parfaitement valide.

## Syntaxe

La syntaxe valide est la suivante :

- `https://chat.googleapis.com/v1/spaces/{workspace}/messages?key={webhook_key}&token={webhook_token}`
- `gchat://{workspace}/{webhook_key}/{webhook_token}`

## Détail des Paramètres

| Variable      | Requis | Description                                                                                                       |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| workspace     | Oui    | L'espace de travail associé à votre compte Google Chat.                                                           |
| webhook_key   | Oui    | La clé webhook associée à votre compte Google Chat.                                                               |
| webhook_token | Oui    | Le jeton webhook associé à votre compte Google Chat.                                                              |
| thread        | Non    | Vous pouvez facultativement spécifier une `ThreadKey` dans l'URL afin de concentrer les notifications sur ce fil. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Google Chat :

```bash
# Supposons que notre {workspace} soit AAAAkM
# Supposons que notre {webhook_key} soit AIzaSSjMm-WEfqKqqsHI
# Supposons que notre {webhook_token} soit O7bnyri_WEXKcyFk%3D

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   gchat://AAAAkM/AIzaSSjMm-WEfqKqqsHI/O7bnyri_WEXKcyFk%3D
```

Rappel : vous pouvez aussi utiliser directement l'URL telle qu'elle vous a été fournie lors de la configuration de votre webhook. Envoyer une notification Google Chat :

```bash
# Supposons que notre {workspace} soit AAAAkM
# Supposons que notre {webhook_key} soit AIzaSSjMm-WEfqKqqsHI
# Supposons que notre {webhook_token} soit O7bnyri_WEXKcyFk%3D

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   https://chat.googleapis.com/v1/spaces/AAAAkM/messages?key=AIzaSSjMm-WEfqKqqsHI&token=O7bnyri_WEXKcyFk%3D
```

Vous souhaitez cibler une `threadKey` précise ? Faites simplement ceci :

```bash
# Supposons que notre {workspace} soit AAAAkM
# Supposons que notre {webhook_key} soit AIzaSSjMm-WEfqKqqsHI
# Supposons que notre {webhook_token} soit O7bnyri_WEXKcyFk%3D
# Supposons que notre {threadkey} soit ABC

apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   gchat://AAAAkM/AIzaSSjMm-WEfqKqqsHI/O7bnyri_WEXKcyFk%3D/?thread=ABC
```
