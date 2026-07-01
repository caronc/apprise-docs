---
title: "Notifications Kook"
description: "Envoyez des notifications aux canaux et messages directs Kook."
sidebar:
  label: "Kook"

source: https://www.kookapp.cn/

schemas:
  - kook

has_attachments: true
has_chat: true

sample_urls:
  - kook://{BotToken}/{ChannelID}
  - kook://{BotToken}/{ChannelID1}/{ChannelID2}
  - kook://{BotToken}/@{UserID}
  - kook://{WebhookKey}?mode=webhook

limits:
  - name: "API Bot"
    max_chars: 5000
  - name: "Webhook"
    max_chars: 5000
---

<!-- SERVICE:DETAILS -->

Kook (anciennement Kaihei / 开黑啦) est une plateforme de communication
axée sur les jeux vidéo similaire à Discord, proposant des canaux texte,
des canaux vocaux et la messagerie directe.

<!-- SPONSORS:BANNER -->

## Configuration du compte

### Mode Bot (Recommandé)

Le mode bot offre un accès complet à l'API, y compris la prise en charge
des pièces jointes.

1. Rendez-vous sur [https://developer.kookapp.cn](https://developer.kookapp.cn) et connectez-vous.
2. Cliquez sur **Créer une application** et donnez-lui un nom (ex. : « Apprise »).
3. Sous votre nouvelle application, cliquez sur **Bot** dans la barre latérale gauche.
4. Cliquez sur **Ajouter un bot** puis copiez le **Token** affiché.
5. Invitez le bot sur votre serveur via la page **OAuth2** en lui accordant les permissions requises (au minimum : **Envoyer des messages**).
6. Activez le mode développeur dans Kook : **Paramètres → Autres → Mode développeur**.
7. Faites un clic droit sur un canal et sélectionnez **Copier l'ID** pour obtenir son identifiant numérique.

### Mode Webhook

Le mode webhook est plus simple mais ne prend pas en charge les pièces jointes.

1. Dans Kook, ouvrez **Paramètres du serveur → Intégrations → Webhooks**.
2. Cliquez sur **Créer un webhook** pour le canal souhaité.
3. Copiez la **clé webhook** depuis l'URL générée (la partie après `/incoming/`).

## Syntaxe

Les syntaxes valides sont les suivantes :

- `kook://{token}/{channel_id}`
- `kook://{token}/{channel_id1}/{channel_id2}/...`
- `kook://{token}/@{user_id}`
- `kook://{token}/{channel_id}/@{user_id}`
- `kook://{webhook_key}?mode=webhook`

:::note
Préfixez une cible avec `@` pour envoyer un **message direct** à un
utilisateur plutôt que de publier dans un canal.
:::

## Detail des parametres

| Variable     | Requis | Description                                                                       |
| ------------ | ------ | --------------------------------------------------------------------------------- |
| `token`      | \*Oui  | Votre token bot (mode bot) ou clé webhook (mode webhook).                         |
| `channel_id` | Non    | Identifiant numérique du canal cible. Peut être répété pour plusieurs canaux.     |
| `user_id`    | Non    | Identifiant numérique d'un utilisateur pour un message direct. Préfixez avec `@`. |
| `mode`       | Non    | Mode de fonctionnement : `bot` (par défaut) ou `webhook`.                         |
| `msg_type`   | Non    | Format du message : `kmarkdown` (par défaut) ou `text`.                           |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification KMarkdown à un canal :

```bash
apprise -vv -t "Titre" -b "Bonjour depuis **Apprise** !" \
    kook://BOT_TOKEN/CHANNEL_ID
```

Envoyer à plusieurs canaux :

```bash
apprise -vv -t "Alerte" -b "Corps du message" \
    kook://BOT_TOKEN/CHANNEL_ID1/CHANNEL_ID2
```

Envoyer un message direct à un utilisateur :

```bash
apprise -vv -t "MP" -b "Message privé" \
    kook://BOT_TOKEN/@USER_ID
```

Envoyer via webhook entrant :

```bash
apprise -vv -b "Notification webhook" \
    "kook://WEBHOOK_KEY?mode=webhook"
```

Forcer le format texte brut :

```bash
apprise -vv -b "Message texte brut" \
    "kook://BOT_TOKEN/CHANNEL_ID?msg_type=text"
```
