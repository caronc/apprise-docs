---
title: "Notifications WeCom Bot"
description: "Envoyer des notifications WeCom Bot."
sidebar:
  label: "WeCom Bot"

source: https://weixin.qq.com/

schemas:
  - wecombot

sample_urls:
  - wecombot://{botkey}
  - https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Inscrivez-vous a WeChat [ici](https://weixin.qq.com/). Un utilisateur et un mot de passe associes a votre compte vous seront fournis. C'est tout ce dont vous avez besoin pour utiliser ce service via Apprise.

### WeCom pour PC

1. Dans WeCom pour PC, trouvez le groupe WeCom cible qui recevra les notifications d'alerte.
1. Faites un clic droit sur le groupe WeCom. Dans la fenetre qui apparait, cliquez sur "Add Group Bot".
1. Dans la fenetre qui apparait, cliquez sur "Create a Bot".
1. Dans la fenetre qui apparait, saisissez un nom personnalise pour le bot puis cliquez sur "Add".
1. Une URL webhook ressemblant a ceci vous sera fournie :
   - `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd`

### WeCom pour le Web

1. Dans WeCom Web, ouvrez le groupe WeCom cible qui recevra les notifications d'alerte.
1. Cliquez sur l'icone des parametres du groupe en haut a droite.
1. Dans la page des parametres du groupe, choisissez "Group Bots > Add a Bot".
1. Dans la page de gestion pour l'ajout de bots, saisissez un nom personnalise pour le nouveau bot.
1. Cliquez sur Add.
1. Une URL webhook ressemblant a ceci vous sera fournie :
   - `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd`

## Syntaxe

La syntaxe valide est la suivante :

- `wecombot://{botkey}`
- `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                                               |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key      | Non         | Vous pouvez facultativement utiliser `?key` au lieu de passer la cle dans le champ `hostname`. Cela est surtout utile lors de la definition de fichiers de configuration. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Voir Aussi

Apprise propose deux integrations WeCom/WeChat complementaires :

- **[WeChat (WeCom)](../wechat/)** -- envoie directement aux utilisateurs, departements et etiquettes WeCom via l'API de messages de l'application WeCom ; necessite un CorpID, un Secret d'Application et un AgentID depuis la console d'administration WeCom.
- **[PushPlus](../pushplus/)** -- achemine les notifications via la plateforme PushPlus, qui prend en charge la livraison via WeChat, WeCom, email et SMS depuis un seul token personnel.

## Exemples

Envoyer une notification WeCom Bot :

```bash
# Supposons que notre {botkey} soit abc123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "wecombot://abc123"
```
