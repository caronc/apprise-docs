---
title: "Matrix Notifications"
description: "Send Matrix notifications."
sidebar:
  label: "Matrix"

source: https://matrix.org/

schemas:
  - matrix: insecure
  - matrixs

has_image: true
has_attachments: true

sample_urls:
  - matrix://{user}:{password}@{hostname}/#{room_alias}
  - matrixs://{user}:{password}@{hostname}/!{room_id}

limits:
  max_chars: 65000
---

<!-- SERVICE:DETAILS -->

## Account Setup

By default the Apprise Integration of Matrix occurs using its built in API.

However, [the webhook service](https://matrix.org/docs/projects/bot/matrix-webhook.html) also works for those wishing to use it too. At the time, this is still identified as being in its _late beta_ state.
This can be done by specifying **?mode=matrix** or **?mode=slack**. Presuming you've [set it up](https://github.com/turt2live/matrix-appservice-webhooks).

## Syntax

Valid syntax is as follows:

- `matrix://{user}:{password}@{hostname}/#{room_alias}`
- `matrixs://{user}:{password}@{hostname}/!{room_id}`

You can mix and match as many rooms as you wish:

- `matrixs://{user}:{password}@{matrixhost}/!{room_id}/#{room_alias}/`

**Note:** If no user and/or password is specified, then the matrix registration process is invoked. The matrix servers actually allow this (if enabled to do so in their configuration) to connect as a temporary user with/without a password and/or user-name. Under normal circumstances you should probably always supply a **{user}** and **{password}**.

**Note:** Federated rooms identifiers are fully supported by Apprise. If no hostname is found in the _{room_id}_ and/or _{room_alias}_ entries specified, then apprise automatically uses the hostname returned to it (internally) upon login. For example, assume the following url: <br/>`matrix://user:pass@localhost/#room/#room:example.com/!abc123/!def456:example.com`:

- **#room** is internally interpreted as **#room:localhost** before it is accessed.
- **#room:example.com** is not altered and is directly notified as such
- **!abc123** is internally interpreted as **!abc123:localhost**
- **!def456:example.com** is not altered and is directly notified as such

When you specify the **?mode=** argument you immediately shift entirely how this plugin works and the syntax becomes:

- `matrix://{user}:{token}@{hostname}?mode=matrix`
- `matrixs://{token}@{hostname}:{port}?mode=matrix`
- `matrix://{user}:{token}@{hostname}?mode=slack&format=markdown`
- `matrixs://{token}@{hostname}?mode=slack&format=markdown`

If you use [**t2bot.io**](https://t2bot.io/), then you can use the following URLs:

- `matrix://{t2bot_webhook_token}`
- `matrix://{user}@{t2bot_webhook_token}`

You can also just use the t2bot URL as they share it with you from their website:

- `https://webhooks.t2bot.io/api/v1/matrix/hook/{t2bot_webhook_token}`

## Parameter Breakdown

| Variable            | Required | Description                                                                                                                                                                                                                                                                                                   |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hostname            | \*Yes    | The matrix server you wish to connect to.                                                                                                                                                                                                                                                                     |
| t2bot_webhook_token | \*Yes    | This is effectively the hostname but acts as the t2bot webhook token if the mode is set to t2bot. Apprise is smart enough to determine the mode provided you follow the t2bot URL examples explained above. This field becomes the `hostname` in all other cases.                                             |
| user                | No       | The user to authenticate (and/or register) with the matrix server                                                                                                                                                                                                                                             |
| password            | No       | The password to authenticate (and/or register) with the matrix server                                                                                                                                                                                                                                         |
| port                | No       | The server port Matrix is listening on. By default **matrixs://** uses a secure port port of **443** while **matrix://** uses port **80**.                                                                                                                                                                    |
| room_alias          | No       | The room alias you wish to join (if not there already) and broadcast your notification. For ambiguity purposes _you should_ prefix these locations with a pound/hashtag symbol **#** although it is not required.                                                                                             |
| room_id             | No       | The room id you wish to join (if not there already) and broadcast your notification. For ambiguity purposes, _you MUST_ prefix these locations with a exclamation symbol **!** (_otherwise it is interpreted as a room_alias instead_)                                                                        |
| thumbnail           | No       | Displays an image before each notification is sent that identifies the notification type (warning, info, error, success). By default this option is set to **False**.                                                                                                                                         |
| mode                | No       | This is optional and allows you to specify a webhook mode instead. Setting this to **matrix** or **slack** allows you to leverage [this webhook service](https://matrix.org/docs/projects/bot/matrix-webhook.html) instead of directly communicating with the matrix server. By default no webhooks are used. |
| msgtype             | No       | This is optional and allows you to specify a Matrix message type to use. Possible options are **text** and **notice**. By default all messages are sent as **text**.                                                                                                                                          |
| version             | No       | Optionally over-ride the API version of matrix to use. Possible values are _2_ and _3_. By default the version is set to **3**.                                                                                                                                                                               |

**Note**: If neither a **{room_alias}** or a **{room_id}** is specified on the URL then upon connecting to the matrix server, a list of currently joined channels will be polled. Each and every channel the account is currently part of will automatically be notified.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure Matrix.org notification to our server

```bash
# Assuming our {hostname} is matrix.example.com
# Assuming our {user} is nuxref
# Assuming our {password} is abc123
# Assuming the {room_alias} we want to notify is #general and #apprise
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/#general/#apprise

# Attachments do not work using the Matrix v3 version; use the
# following to fall back to an earlier API version:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/#general/#apprise?v=2
```

Send a [**t2bot.io**](https://t2bot.io/webhooks/) request:

```bash
# Assuming our {webhook} is ABCDEFG12345
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrix://ABCDEFG12345
```
