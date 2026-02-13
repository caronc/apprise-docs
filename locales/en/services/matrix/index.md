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

By default, Apprise communicates directly with your Matrix server using the official Client API.

Alternatively, you may use the [Matrix Webhook service](https://matrix.org/docs/projects/bot/matrix-webhook.html). At the time of writing, this is still considered late beta. Webhook usage is enabled by specifying **?mode=matrix** or **?mode=slack**, assuming you have configured the webhook service (for example via <https://github.com/turt2live/matrix-appservice-webhooks>).

## Syntax

Valid syntax is as follows:

- `matrix://{user}:{password}@{hostname}/#{room_alias}`
- `matrixs://{user}:{password}@{hostname}/!{room_id}`

You may specify multiple rooms:

- `matrixs://{user}:{password}@{matrixhost}/!{room_id}/#{room_alias}/`

**Note:** If no user and/or password is specified, the Matrix registration process may be invoked. Some Matrix servers allow automatic registration of temporary users, depending on server configuration. In most production environments you should always provide both **{user}** and **{password}**.

## Room Identifiers and Homeserver Behaviour

Matrix supports both:

- **Room aliases** (prefixed with `#`)
- **Room IDs** (prefixed with `!`)

Room identifiers may or may not include a homeserver component (for example `:example.com`). Modern Matrix room versions may omit the homeserver portion entirely.

Examples:

- `#general`
- `#general:example.com`
- `!abc123`
- `!abc123:example.com`

### Default Behaviour (Recommended)

By default, Apprise does **not** enforce a homeserver on room identifiers.

If you provide:

- `#room`: it is used exactly as provided.
- `!room`: it is used exactly as provided.

However Federated rooms identifiers are fully supported by Apprise. If you explicitly include a homeserver component, Apprise honours it exactly as specified.

This behaviour aligns with newer Matrix room versions where room IDs may not include a homeserver component.

### Legacy Behaviour

You may restore the previous Apprise behaviour by specifying:

- `?hsreq=yes`

When `hsreq=yes` is set:

- `#room` is internally interpreted as `#room:{hostname}`
- `!room` is internally interpreted as `!room:{hostname}`

This may be required for older Matrix deployments that expect room identifiers to always include a homeserver.

### Example

Given:

```text
matrix://user:pass@localhost/#room/!abc123
```

With default behaviour (`hsreq=no`):

- `#room` is used as `#room`
- `!abc123` is used as `!abc123`

With legacy enforcement:

```text
matrix://user:pass@localhost/#room/!abc123?hsreq=yes
```

- `#room` becomes `#room:localhost`
- `!abc123` becomes `!abc123:localhost`

## Webhook Mode

When specifying the **?mode=** argument, the plugin switches entirely to webhook behaviour and the syntax changes:

- `matrix://{user}:{token}@{hostname}?mode=matrix`
- `matrixs://{token}@{hostname}:{port}?mode=matrix`
- `matrix://{user}:{token}@{hostname}?mode=slack&format=markdown`
- `matrixs://{token}@{hostname}?mode=slack&format=markdown`

If you use [**t2bot.io**](https://t2bot.io/), you may use:

- `matrix://{t2bot_webhook_token}`
- `matrix://{user}@{t2bot_webhook_token}`

Or directly:

- `https://webhooks.t2bot.io/api/v1/matrix/hook/{t2bot_webhook_token}`

## Parameter Breakdown

| Variable            | Required | Description                                                                                                                               |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| hostname            | \*Yes    | The Matrix server you wish to connect to.                                                                                                 |
| t2bot_webhook_token | \*Yes    | Used when leveraging t2bot webhook mode. Acts as hostname in this case.                                                                   |
| user                | No       | The user to authenticate (and/or register) with the Matrix server.                                                                        |
| password            | No       | The password to authenticate (and/or register) with the Matrix server.                                                                    |
| port                | No       | The server port Matrix is listening on. By default **matrixs://** uses port **443**, while **matrix://** uses port **80**.                |
| room_alias          | No       | The room alias to join and notify. It is recommended to prefix with **#**.                                                                |
| room_id             | No       | The room ID to join and notify. You must prefix this with **!**.                                                                          |
| thumbnail           | No       | Displays an image before each notification identifying the notification type. Default is **False**.                                       |
| mode                | No       | Enables webhook mode. Valid values are **matrix** or **slack**.                                                                           |
| msgtype             | No       | Matrix message type: **text** or **notice**. Default is **text**.                                                                         |
| version             | No       | Overrides the Matrix Client API version. Supported values are **2** and **3**. Default is **3**. This does not affect room ID formatting. |
| hsreq               | No       | Enforces homeserver inclusion on room identifiers. Set to **yes** to restore legacy behaviour. Default is **no**.                         |

**Note:** If neither a **{room_alias}** nor a **{room_id}** is specified, Apprise will query the server for currently joined rooms and notify all of them.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure Matrix notification:

```bash
# Assuming {hostname} is matrix.example.com
# Assuming {user} is nuxref
# Assuming {password} is abc123
# Notify #general and #apprise
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/#general/#apprise
```

Force legacy homeserver enforcement:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/!abc123?hsreq=yes
```

Use API v2 (required for attachments in some deployments):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/#general?v=2
```

Send a **t2bot.io** webhook request:

```bash
# Assuming {webhook} is ABCDEFG12345
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrix://ABCDEFG12345
```
