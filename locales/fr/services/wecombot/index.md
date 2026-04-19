---
title: "Notifications WeCom Bot"
description: "Envoyer WeCom Bot notifications."
sidebar:
  label: "WeCom Bot"

source: https://weixin.qq.com/

schemas:
  - wecombot

sample_urls:
  - wecombot://{botkey}
  - https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Inscrivez-vous a WeChat [from here](https://weixin.qq.com/). You will be provided to create a user and password to associate with your account. This is all you need to use this through Apprise.

### WeCom for PC

1. On WeCom for PC, find the target WeCom group for receiving alarm notifications.
1. Right-click the WeCom group. In the window that appears, click "Add Group Bot".
1. In the window that appears, click Create a Bot.
1. In the window that appears, enter a custom bot name and click Add.
1. You will be provided a Webhook URL that looks like:
   - `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd`

### WeCom for Web

1. On WebCom for Web, open the target WeCom group for receiving alarm notifications.
1. Click the group settings icon in the upper-right corner.
1. On the group settings page, choose Group Bots > Add a Bot.
1. On the management page for adding bots, enter a custom name for the new bot.
1. Click Add
1. You will be provided a Webhook URL that looks like:
   - `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd`

## Syntaxe

La syntaxe valide est la suivante :

- `wecombot://{botkey}`
- `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=abcd`

## Detail des parametres

| Variable | Required | Description                                                                                                                              |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| key      | No       | Can optionally use the `?key` instead of passing the key in the `hostname` field. This has more value when defining configuration files. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une WeCom Bot Notification:

```bash
# Assuming our {botkey} is abc123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "wecombot://abc123"
```
