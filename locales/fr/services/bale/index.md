---
title: "Notifications Bale"
description: "Envoyez des notifications à des utilisateurs, des groupes et des canaux Bale grâce à un Bot Bale."
sidebar:
  label: "Bale"

source: https://bale.ai

schemas:
  - bale

has_attachments: true
has_chat: true

body_formats:
  - text

sample_urls:
  - bale://{bot_token}/{chat_id}
  - bale://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}
  - bale://{bot_token}/@{channel}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Apprise envoie les messages Bale grâce à un Bot Bale.

1. Dans l'application Bale, ouvrez une discussion avec le compte **@botfather**.
2. Envoyez-lui `/newbot` et suivez les instructions pour nommer votre bot.
3. @botfather vous répond avec votre **Bot Token**. Il ressemble à `123456789:abcdefghijKLMNOPqrst`.

Ensuite, trouvez le Chat ID de chaque personne ou groupe à notifier :

1. Demandez-leur d'envoyer un message quelconque à votre bot.
2. Ouvrez le lien suivant dans votre navigateur, avec votre propre Bot Token :

   ```text
   https://tapi.bale.ai/bot{bot_token}/getUpdates
   ```

3. Le Chat ID est la valeur `id` qui se trouve dans la section `chat` de la réponse. Les Chat ID de groupe commencent par un signe moins (`-`).

Pour publier dans un canal public, ajoutez votre bot au canal en tant qu'administrateur et utilisez le nom d'utilisateur du canal (par exemple `@mychannel`) à la place d'un Chat ID.

:::note
Le lien `getUpdates` ne fonctionne pas si un webhook est déjà configuré pour votre bot.
:::

:::note
Bale lit chaque message comme du Markdown, donc des caractères comme `*` et `_` peuvent modifier l'apparence de votre texte.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `bale://{bot_token}/{chat_id}`
- `bale://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}`
- `bale://{bot_token}/@{channel}`

## Détail des Paramètres

| Variable  | Requis | Description                                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| bot_token | Oui    | Le Bot Token que @botfather vous a envoyé lors de la création du bot. Il ressemble à `123456789:abcdef`.                                          |
| chat_id   | Oui    | Le Chat ID d'une personne ou d'un groupe, ou le `@nom` d'un canal public. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique. |
| to        | Non    | Une autre façon d'indiquer les Chat ID à notifier, séparés par une virgule. Pratique dans les fichiers de configuration.                          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message à une personne :

```bash
# Remplacez 123456789:abcdefghij par votre Bot Token
# Remplacez 987654321 par le Chat ID à notifier
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
    bale://123456789:abcdefghij/987654321
```

Envoyer un message à un groupe et à un canal, avec une photo jointe :

```bash
apprise -vv -b "Sauvegarde terminée." --attach=/path/to/photo.jpg \
    "bale://123456789:abcdefghij/-987654321/@mychannel"
```
