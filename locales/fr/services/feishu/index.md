---
title: "Notifications Feishu"
description: "Envoyer Feishu notifications."
sidebar:
  label: "Feishu"

source: https://open.feishu.cn/

schemas:
  - feishu

sample_urls:
  - feishu://{token}

limits:
  max_chars: 19985
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Register your account with [Feishu](https://open.feishu.cn/) and then [follow these instructions](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot) to create a custom bot (and acquire the token you need).

## Syntaxe

La syntaxe valide est la suivante :

- `feishu://{token}`

## Detail des parametres

| Variable | Required | Description                                                                           |
| -------- | -------- | ------------------------------------------------------------------------------------- |
| token    | **Yes**  | The token you generated as part of your Fieshu Custom Bot Creation (via your account) |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification to your Feishu account:

```bash
# Assuming our {token} is token
apprise -vv --body="Test Message" \
   "feishu://token"
```
