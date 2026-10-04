---
title: "Notifications OneBot (QQ)"
description: "Envoyez des notifications QQ avec un bot OneBot 11 auto-hébergé comme NapCat, LLOneBot ou Lagrange."
sidebar:
  label: "OneBot (QQ)"

source: https://github.com/botuniverse/onebot-11

schemas:
  - onebot: insecure
  - onebots

has_attachments: true
has_chat: true
has_selfhosted: true

body_formats:
  - text

keywords: "napcat, llonebot, lagrange, go-cqhttp, cqhttp"

sample_urls:
  - onebot://{host}:{port}/{user_id}
  - onebot://{token}@{host}:{port}/@{user_id}/#{group_id}
  - onebots://{token}@{host}/@{user_id}/#{group_id}

limits:
  max_chars: 4500
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

[OneBot 11](https://github.com/botuniverse/onebot-11) est pris en charge par des programmes de bot QQ tels que [NapCat](https://napneko.github.io/), LLOneBot, Lagrange.OneBot et go-cqhttp. Apprise se connecte au serveur HTTP du programme et envoie les notifications depuis votre compte QQ.

1. Installez l'un des programmes ci-dessus et connectez-vous avec le compte QQ qui doit envoyer vos notifications.
2. Dans ses paramètres, activez le **serveur HTTP** OneBot 11. Notez le port d'écoute (NapCat utilise souvent `3000`, go-cqhttp utilise `5700`).
3. Vous pouvez aussi définir un **jeton d'accès**, puis l'ajouter à votre URL Apprise.
4. Trouvez le numéro QQ de chaque personne à contacter, ainsi que le numéro de chaque groupe. Chaque personne doit avoir ajouté le compte du bot à ses amis, et celui-ci doit être membre de chaque groupe.

Les images, les messages vocaux et les vidéos sont envoyés comme médias QQ. Tout autre fichier est envoyé sous forme de fichier QQ, ce que NapCat, LLOneBot et Lagrange prennent en charge. Chaque pièce jointe arrive dans un message séparé.

## Syntaxe

La syntaxe valide est la suivante :

- `onebot://{host}/{user_id}`
- `onebot://{host}:{port}/@{user_id}/#{group_id}`
- `onebot://{token}@{host}:{port}/@{user_id}/#{group_id}`
- `onebots://{token}@{host}:{port}/@{user_id}/#{group_id}`

Vous pouvez combiner autant d'utilisateurs et de groupes que vous le souhaitez :

- `onebot://{token}@{host}:{port}/@{user_id1}/@{user_id2}/#{group_id1}/#{group_idN}`

Utilisez `onebots://` lorsque votre bot est accessible en HTTPS, par exemple derrière un proxy inverse. Le jeton d'accès et le message sont ainsi chiffrés pendant leur transfert vers le bot.

## Détail des paramètres

| Variable | Requis | Description                                                                                                                                                            |
| -------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| host     | Oui    | Le nom d'hôte ou l'adresse IP de la machine qui exécute votre programme OneBot.                                                                                        |
| port     | Non    | Le port du serveur HTTP OneBot. Par défaut **80** pour `onebot://` et **443** pour `onebots://`.                                                                       |
| token    | Non    | Le jeton d'accès défini dans votre programme OneBot, le cas échéant.                                                                                                   |
| user_id  | \*Oui  | Le numéro QQ d'une personne à contacter, jusqu'à 19 chiffres. Le `@` devant est facultatif.                                                                            |
| group_id | \*Oui  | Le numéro d'un groupe QQ à contacter, jusqu'à 19 chiffres. Il doit commencer par `#`.                                                                                  |
| to       | Non    | Une autre façon de lister les utilisateurs et les groupes, séparés par des virgules. Écrivez le `#` d'un groupe sous la forme `%23`, par exemple `?to=12345,%2367890`. |

\*Au moins un utilisateur ou un groupe est requis.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message à un utilisateur QQ via NapCat sur la même machine :

```bash
# Le serveur HTTP OneBot écoute sur localhost:3000
# Le numéro QQ à contacter est 12345678
apprise -vv -t "Message de test" -b "Corps du message de test" \
   "onebot://localhost:3000/12345678"
```

Envoyer à un utilisateur et à un groupe avec un jeton d'accès :

```bash
# Le {token} est abc123secret
# Le numéro QQ est 12345678 et le numéro du groupe est 87654321
apprise -vv -t "Alerte" -b "Le serveur est indisponible !" \
   "onebot://abc123secret@localhost:3000/@12345678/#87654321"
```

Envoyer une image à un groupe en HTTPS :

```bash
# Le bot est accessible à l'adresse bot.example.com en HTTPS
apprise -vv -b "Graphique du jour" --attach=graph.png \
   "onebots://abc123secret@bot.example.com/#87654321"
```
