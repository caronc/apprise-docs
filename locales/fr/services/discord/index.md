---
title: "Notifications Discord"
description: "Envoyer des notifications Discord."
sidebar:
  label: "Discord"

source: https://discordapp.com/
schemas:
  - discord

sample_urls:
  - https://discordapp.com/api/webhooks/{WebhookID}/{WebhookToken}
  - discord://{WebhookID}/{WebhookToken}
  - discord://{botname}@{WebhookID}/{WebhookToken}

has_attachments: true
has_image: true

limits:
  max_chars: 2000
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Creer un compte Discord est simple. La seule etape demandant un peu plus de travail intervient une fois votre salon configure, Discord vous place par defaut dans un salon `#General`. Cliquez sur l'icone en forme d'engrenage, Settings, puis activez les webhooks a partir de la.

Le webhook ressemblera a quelque chose comme ceci :
`https://discordapp.com/api/webhooks/4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js`

Cela correspond en pratique a :
`https://discordapp.com/api/webhooks/{WebhookID}/{WebhookToken}`

**Remarque :** Apprise prend cette URL en charge _telle quelle_, _depuis la v0.7.7_. Vous n'avez donc plus besoin de l'analyser davantage. Cela dit, il y a un peu moins de surcharge interne si vous le faites.

La derniere partie de l'URL fournie constitue les 2 jetons dont vous avez besoin pour envoyer des notifications. Dans l'exemple ci-dessus, les jetons sont les suivants :

1. **WebhookID** est `4174216298`
2. **WebhookToken** est `JHMHI8qBe7bk2ZwO5U711o3dV_js`

### Mentionner des roles, tags et utilisateurs

Le corps du message Discord peut contenir des elements comme les suivants pour declencher les pings appropries :

- **user**: `<@123>`
- **role**: `<@&456>`
- **tag**: `@everyone`

## Syntaxe

La syntaxe valide est la suivante :

- `https://discordapp.com/api/webhooks/{WebhookID}/{WebhookToken}`
- `discord://{WebhookID}/{WebhookToken}/`
- `discord://{botname}@{WebhookID}/{WebhookToken}/`

Discord prend egalement en charge differents arguments web. Les valeurs ci-dessous correspondent aux valeurs par defaut et n'ont donc pas besoin d'etre precisees, sauf si vous souhaitez les remplacer :

- `discord://{WebhookID}/{WebhookToken}/?tts=No&avatar=Yes&footer=No&image=Yes`

## Détail des Paramètres

| Variable     | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                         |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebhookID    | Oui         | Premiere partie des 2 jetons qui vous sont fournis apres la creation d'un _incoming-webhook_.                                                                                                                                                                                                                                                                       |
| WebhookToken | Oui         | Seconde partie des 2 jetons qui vous sont fournis apres la creation d'un _incoming-webhook_.                                                                                                                                                                                                                                                                        |
| botname      | Non         | Nom du robot qui doit publier le message. Si aucune valeur n'est fournie, la valeur par defaut consiste a utiliser simplement votre compte, associe a l'_incoming-webhook_.                                                                                                                                                                                         |
| tts          | Non         | Active le Text-To-Speech. La valeur par defaut est **No**.                                                                                                                                                                                                                                                                                                          |
| footer       | Non         | Inclut un pied de message. La valeur par defaut est **No**.                                                                                                                                                                                                                                                                                                         |
| image        | Non         | Inclut une image dans le message afin de representer le type de notification. La valeur par defaut est **Yes**.                                                                                                                                                                                                                                                     |
| avatar       | Non         | Remplace l'icone d'avatar Discord par defaut par une icone identifiant le type de notification. La valeur par defaut est **Yes**.                                                                                                                                                                                                                                   |
| avatar_url   | Non         | Remplace l'URL de l'icone d'avatar Discord par defaut. Si elle n'est pas definie, Apprise choisit dynamiquement l'URL en fonction du type de message, info, success, warning ou error.                                                                                                                                                                              |
| format       | Non         | La valeur par defaut est _text_. Si vous souhaitez toutefois gerer vous-meme le formatage, vous pouvez definir cette valeur sur _markdown_. Si le mode est defini sur markdown, Apprise analysera les lignes d'en-tete, generalement seules et entourees de hashtags `#`, puis les placera dans des objets embarques afin d'obtenir une presentation plus elegante. |
| href         | Non         | Definit une URL vers laquelle le titre doit pointer lors de la publication de la notification Discord. Cela force le message au format `markdown` afin de tirer parti de la section `embeds` de Discord. Vous pouvez aussi utiliser `url=` comme alias.                                                                                                             |
| thread       | Non         | Permet facultativement de definir le `thread_id` auquel appliquer votre message.                                                                                                                                                                                                                                                                                    |
| ping         | Non         | Permet facultativement d'indiquer un role, un utilisateur ou un nom interprete, comme `everyone`, qui devra toujours etre pingue lors de l'envoi du message. Suivez la syntaxe [identifiee ci-dessus](https://github.com/caronc/apprise/wiki/Notify_discord/#pinging-roles-tags-and-users) pour le format attendu.                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Discord :

```bash
# Supposons que notre {WebhookID} soit 4174216298
# Supposons que notre {WebhookToken} soit JHMHI8qBe7bk2ZwO5U711o3dV_js
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js"
```

Si vous souhaitez utiliser votre propre URL d'avatar personnalisee, deja hebergee sur un autre site web, vous pouvez definir ceci :

```bash
# Supposons que notre {WebhookID} soit 4174216298
# Supposons que notre {WebhookToken} soit JHMHI8qBe7bk2ZwO5U711o3dV_js
# Supposons que notre {AvatarURL} soit https://i.imgur.com/FsEpmwg.jpeg
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js?avatar_url=https://i.imgur.com/FsEpmwg.jpeg"
```

Envoyer une notification qui notifie `@everyone` dans le salon :

```bash
# Supposons que notre {WebhookID} soit 4174216298
# Supposons que notre {WebhookToken} soit JHMHI8qBe7bk2ZwO5U711o3dV_js
apprise -vv -t "Bonjour a Tous" -b "Message de Test that pings @everyone" \
   "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js"
```

Envoyer une notification exploitant la prise en charge integree de `markdown` par Discord :

```bash
# Supposons que notre {WebhookID} soit 4174216298
# Supposons que notre {WebhookToken} soit JHMHI8qBe7bk2ZwO5U711o3dV_js
cat << _EOF | apprise -vv "discord://4174216298/JHMHI8qBe7bk2ZwO5U711o3dV_js?format=markdown"
# Title

- Bullet 1
- Bullet 2
- Bullet 3
_EOF
```
