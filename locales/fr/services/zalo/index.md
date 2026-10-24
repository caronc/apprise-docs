---
title: "Notifications Zalo"
description: "Envoyez des notifications à des utilisateurs et des groupes Zalo grâce à un Bot Zalo."
sidebar:
  label: "Zalo"

source: https://zalo.me

schemas:
  - zalo

has_chat: true

body_formats:
  - markdown
  - text

sample_urls:
  - zalo://{bot_token}/{chat_id}
  - zalo://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}

limits:
  max_chars: 2000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Apprise envoie les messages Zalo grâce à un Bot Zalo.

1. Dans l'application Zalo, recherchez le compte **Zalo Bot Manager**.
2. Choisissez **Create bot** (Créer un bot) dans son menu. Le nom du bot doit commencer par `Bot` (par exemple `Bot Apprise`).
3. Zalo vous envoie un message contenant votre **Bot Token**. Il ressemble à `123456789:abcdefghijKLMNOPqrst`.

Ensuite, trouvez le Chat ID de chaque personne ou groupe à notifier :

1. Demandez-leur d'envoyer un message quelconque à votre bot.
2. Ouvrez le lien suivant dans votre navigateur, avec votre propre Bot Token :

   ```text
   https://bot-api.zaloplatforms.com/bot{bot_token}/getUpdates
   ```

3. Le Chat ID est la valeur `id` qui se trouve dans la section `chat` de la réponse.

:::note
Le lien `getUpdates` ne fonctionne pas si un webhook est déjà configuré pour votre bot.
:::

:::note
Les pièces jointes ne sont pas prises en charge. Zalo n'accepte que des photos déjà hébergées en ligne, et non des fichiers envoyés.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `zalo://{bot_token}/{chat_id}`
- `zalo://{bot_token}/{chat_id1}/{chat_id2}/{chat_idN}`

## Détail des Paramètres

| Variable  | Requis | Description                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| bot_token | Oui    | Le Bot Token que Zalo vous a envoyé lors de la création du bot. Il ressemble à `123456789:abcdef`.                           |
| chat_id   | Oui    | Le Chat ID d'une personne ou d'un groupe à notifier. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique. |
| format    | Non    | Utilisez `markdown` (par défaut) pour le gras, l'italique, les titres et les listes, ou `text` pour du texte brut.           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message à une personne :

```bash
# Remplacez 123456789:abcdefghij par votre Bot Token
# Remplacez abc.xyz par le Chat ID à notifier
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
    zalo://123456789:abcdefghij/abc.xyz
```

Envoyer un message en texte brut à deux discussions :

```bash
apprise -vv -b "Sauvegarde terminée." \
    "zalo://123456789:abcdefghij/abc.xyz/def.uvw?format=text"
```
