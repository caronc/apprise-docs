---
title: "Notifications QQ Push"
description: "Envoyer QQ Push notifications."
sidebar:
  label: "QQ Push"

source: https://github.com/songquanpeng/message-pusher

schemas:
  - qq

sample_urls:
  - https://qmsg.zendee.cn/send/{token}
  - qq://{token}

limits:
  max_chars: 10000
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

QQ Push is a third-party gateway for sending notifications to QQ users via services like [qmsg.zendee.cn](https://qmsg.zendee.cn/).

To use it with Apprise, you'll need to register and obtain a personal **Token**.

1. Visit [qmsg.zendee.cn](https://qmsg.zendee.cn/) and sign in using your QQ account.
2. Once logged in, generate and copy your **token**.
3. You’ll receive a webhook URL like this:

```text
https://qmsg.zendee.cn/send/abc123def456ghi789jkl012mno345pq
```

You can use the full native webhook or a simplified Apprise URL.

## Syntaxe

La syntaxe valide est la suivante :

- `https://qmsg.zendee.cn/send/{token}`
- `qq://{token}`
- `qq://?token={token}`

## Detail des parametres

| Variable | Required | Description                                     |
| -------- | -------- | ----------------------------------------------- |
| token    | Yes      | Your personal QQ Push token from qmsg.zendee.cn |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Using the simplified Apprise URL:

```bash
apprise -vv -t "QQ Title" -b "Message content" \
    qq://abc123def456ghi789jkl012mno345pq
```

Using the query parameter form:

```bash
apprise -vv -t "QQ Title" -b "Message content" \
    qq://?token=abc123def456ghi789jkl012mno345pq
```

Using the native webhook URL:

```bash
apprise -vv -t "QQ Title" -b "Message content" \
    https://qmsg.zendee.cn/send/abc123def456ghi789jkl012mno345pq
```
