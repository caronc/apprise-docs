---
title: "Matrix Notifications"
description: "Send Matrix notifications."
sidebar:
  label: "Matrix"

source: https://matrix.org/

schemas:
  - matrix: insecure
  - matrixs

has_chat: true
has_selfhosted: true
has_attachments: true
has_image: true

sample_urls:
  - matrix://{user}:{password}@{hostname}/#{room_alias}
  - matrixs://{user}:{password}@{hostname}/!{room_id}
  - matrixs://{token}@{hostname}/#{room_alias}
  - matrixs://{user}:{password}@{hostname}/@{target_user}

limits:
  - name: "Unencrypted Plain Text Body"
    max_chars: 60000
  - name: "Unencrypted HTML/Markdown Body"
    max_chars: 29000
  - name: "E2EE Plain Text Body"
    max_chars: 40000
  - name: "E2EE HTML/Markdown Body"
    max_chars: 19000
  - name: "Webhook Body"
    max_chars: 65000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

By default, Apprise communicates directly with your Matrix server using the official Client API.

Alternatively, you may use webhook mode instead of the Matrix Client API. Webhook usage is enabled by specifying **?mode=matrix**, **?mode=slack**, or **?mode=hookshot** depending on the webhook service you have configured.

## Message Size and Format

Matrix limits the complete event to 65,536 bytes. Apprise v1 uses conservative character limits for direct messages and applies a final byte check before sending.

- Plain text carries one body; HTML and Markdown also carry a fallback body.
- E2EE uses smaller limits to leave room for encryption.
- `overflow=split` keeps the remaining content in additional messages.

Apprise v1 supports one output format per Matrix URL: `text`, `html`, or `markdown`. When code calls the plugin without an input `body_format`, Matrix treats that content as already formatted and leaves its fallback unchanged.

:::note
Apprise v1 chooses the E2EE limit before checking each room. The E2EE limit therefore applies whenever E2EE is available and enabled, even if a specific room is later found to be unencrypted.
:::

## Syntax

Valid syntax is as follows:

Using a username and password:

- `matrix://{user}:{password}@{hostname}/#{room_alias}`
- `matrixs://{user}:{password}@{hostname}/!{room_id}`

Using a pre-generated access token (no username or password required):

- `matrix://{token}@{hostname}/#{room_alias}`
- `matrixs://{token}@{hostname}/!{room_id}`

You may also supply the token as a query parameter:

- `matrixs://{hostname}/#{room_alias}?token={token}`

### Room Alias Targets

Room aliases are prefixed with `#`. You may specify multiple room aliases by separating them with a forward slash:

- `matrixs://{user}:{password}@{hostname}/#{room_alias}`
- `matrixs://{user}:{password}@{hostname}/#{room_alias1}/#{room_alias2}`
- `matrixs://{token}@{hostname}/#{room_alias1}/#{room_alias2}`

### Room ID Targets

Room IDs are prefixed with `!`. You may specify multiple room IDs in the same way:

- `matrixs://{user}:{password}@{hostname}/!{room_id}`
- `matrixs://{user}:{password}@{hostname}/!{room_id1}/!{room_id2}`
- `matrixs://{token}@{hostname}/!{room_id1}/!{room_id2}`

### Direct Message Targets

To send a direct message (DM) to a Matrix user, prefix the target with `@`. You may optionally include the homeserver component on the target:

- `matrixs://{user}:{password}@{hostname}/@{target_user}`
- `matrixs://{user}:{password}@{hostname}/@{target_user}:{homeserver}`
- `matrixs://{token}@{hostname}/@{target_user}`
- `matrixs://{token}@{hostname}/@{target_user}:{homeserver}`

You may notify multiple DM users in a single URL:

- `matrixs://{user}:{password}@{hostname}/@{user1}/@{user2}`
- `matrixs://{token}@{hostname}/@{user1}/@{user2}`

:::note
When you write `@alice` without a server name, Apprise fills it in automatically using your homeserver. To reach someone on a different server, write their full address instead: `@alice:otherhost.com`. If direct messages are not going through, try adding `?hsreq=no` to your URL -- this helps on some self-hosted server setups (see below).
:::

### Mixing Target Types

Room aliases (`#`), room IDs (`!`), and DM users (`@`) can be freely mixed and matched in any order in a single URL:

- `matrixs://{user}:{password}@{hostname}/#{room_alias}/@{target_user}`
- `matrixs://{user}:{password}@{hostname}/#{room_alias}/!{room_id}/@{target_user}`
- `matrixs://{token}@{hostname}/#{room_alias}/!{room_id}/@{target_user}`

:::note
If no user and/or password is specified, the Matrix registration process may be invoked. Some Matrix servers allow automatic registration of temporary users, depending on server configuration. In most production environments you should always provide both **`{user}`** and **`{password}`**, or a pre-generated **`{token}`**.
:::

## Room Identifiers and Homeserver Behaviour

Matrix supports both:

- **Room aliases** (prefixed with `#`)
- **Room IDs** (prefixed with `!`)

Room identifiers may include a homeserver component (for example `:example.com`). In Matrix, room aliases are typically written with a homeserver, and room IDs are generally expected to include one as well.

Examples:

- `#general`
- `#general:example.com`
- `!abc123`
- `!abc123:example.com`

### Default Behaviour (Recommended)

By default, Apprise **enforces** a homeserver on room identifiers when it is missing.

If you provide:

- `#room`: it is internally interpreted as `#room:{hostname}`
- `!room`: it is internally interpreted as `!room:{hostname}`

If you explicitly include a homeserver component, Apprise honours it exactly as specified.

### Opt-out Behaviour (Compatibility Mode)

Most people will never need this. If your notifications are working, skip ahead.

If things are not working -- particularly if you see 404 errors when Apprise tries to join a room -- try adding `?hsreq=no` to your URL. This tells Apprise to use room names and IDs exactly as you typed them, without automatically adding your server name to the end:

- `#room` is used exactly as provided.
- `!room` is used exactly as provided.

Given this URL:

```text
matrix://user:pass@localhost/#room/!abc123
```

With the default setting:

- `#room` becomes `#room:localhost`
- `!abc123` becomes `!abc123:localhost`

With `?hsreq=no`:

```text
matrix://user:pass@localhost/#room/!abc123?hsreq=no
```

- `#room` stays `#room`
- `!abc123` stays `!abc123`

This also applies to DM targets. The person you are messaging is always looked up with their full address (for example `@alice:localhost`) -- that part does not change. But if DM delivery is failing anyway, adding `?hsreq=no` can help on certain servers. It is worth trying before anything else.

## Webhook Mode

When specifying the **?mode=** argument, the plugin switches entirely to webhook behaviour and the syntax changes:

- `matrix://{user}:{token}@{hostname}?mode=matrix`
- `matrixs://{token}@{hostname}:{port}?mode=matrix`
- `matrix://{user}:{token}@{hostname}?mode=slack&format=markdown`
- `matrixs://{token}@{hostname}?mode=slack&format=markdown`
- `matrix://{user}:{token}@{hostname}?mode=hookshot`
- `matrixs://{user}:{token}@{hostname}?mode=hookshot&path=/webhook`

When using **matrix-hookshot**, the webhook path is configurable and defaults to **/webhook**:

- `matrixs://{user}:{token}@{hostname}?mode=hookshot`
- `matrixs://{user}:{token}@{hostname}?mode=hookshot&path=/public-hooks`

If you use [**t2bot.io**](https://t2bot.io/), you may use:

- `matrix://{t2bot_webhook_token}`
- `matrix://{user}@{t2bot_webhook_token}`

Or directly:

- `https://webhooks.t2bot.io/api/v1/matrix/hook/{t2bot_webhook_token}`

## Parameter Breakdown

| Variable            | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| hostname            | \*Yes    | The Matrix server you wish to connect to.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| t2bot_webhook_token | \*Yes    | Used when leveraging t2bot webhook mode. Acts as hostname in this case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| user                | No       | The user to authenticate (and/or register) with the Matrix server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| password            | No       | The password to authenticate (and/or register) with the Matrix server.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| token               | No       | A pre-generated Matrix access token. Use this instead of **user** and **password** when your server disables password login (for example, SSO-only deployments). May also be supplied as `?token=` in the URL. When used without a username, place the token in the user position: `matrix://{token}@{hostname}/`.                                                                                                                                                                                                                                                                                                                               |
| port                | No       | The server port Matrix is listening on. By default **matrixs://** uses port **443**, while **matrix://** uses port **80**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| room_alias          | No       | The room alias to join and notify. It is recommended to prefix with **#**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| room_id             | No       | The room ID to join and notify. You must prefix this with **!**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| thumbnail           | No       | Displays an image before each notification identifying the notification type. Default is **False**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| mode                | No       | Enables webhook mode. Valid values are **matrix**, **slack**, **t2bot**, and **hookshot**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| path                | No       | Used with **hookshot** mode to define the public webhook path. Defaults to **/webhook**. For example, if your hookshot instance is exposed at `https://hookshot.example/public-hooks/{token}`, then set `?mode=hookshot&path=/public-hooks`.                                                                                                                                                                                                                                                                                                                                                                                                     |
| format              | No       | Selects the Matrix output format: **text**, **html**, or **markdown**. Apprise v1 uses one configured output format per URL. Default is **text**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| msgtype             | No       | Matrix message type: **text** or **notice**. Default is **text**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| version             | No       | Overrides the Matrix Client API version. Supported values are **2** and **3**. Default is **3**. May also be supplied as `?v=`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| hsreq               | No       | When enabled (the default), Apprise automatically appends the authenticated homeserver to room identifiers that do not already include one. For example, `#room` becomes `#room:hostname`. Set to **no** to disable this and use room identifiers exactly as provided.                                                                                                                                                                                                                                                                                                                                                                           |
| e2ee                | No       | Controls end-to-end encryption using the Matrix Olm/MegOLM protocol. When enabled (the default), Apprise automatically detects whether each room has encryption configured and encrypts both messages and attachments for those that do, while sending others as plain text. When Apprise creates a new room with `e2ee=yes`, it sets `m.room.encryption` at creation time so the room is encrypted from the very first message. Requires the `cryptography` Python package and a **matrixs://** (HTTPS) connection. Not supported in webhook mode. Set to **no** to always send unencrypted and to skip E2EE room creation. Default is **yes**. |
| target_user         | No       | A Matrix user ID to notify via direct message. Must be prefixed with **@**, for example **@alice** or **@alice:homeserver**. Apprise looks up (or creates) a DM room with that user automatically. Not supported in webhook mode.                                                                                                                                                                                                                                                                                                                                                                                                                |
| discovery           | No       | When enabled (the default), Apprise performs a `.well-known/matrix/client` server-discovery lookup on first use to resolve the actual homeserver base URL. Set to **no** to skip discovery and connect directly to the specified hostname. Automatically disabled in webhook mode. Default is **yes**.                                                                                                                                                                                                                                                                                                                                           |

:::note
If neither a **`{room_alias}`**, **`{room_id}`**, nor a **`{target_user}`** is specified, Apprise will query the server for currently joined rooms and notify all of them.
:::

:::note
When sending to a **`{target_user}`**, Apprise looks up an existing DM room via `m.direct` account data, or creates one if none exists. If the target user later leaves that room, Apprise will continue sending to it (the messages are accepted by the server but the user will not see them). There is no automatic re-invite. To recover, the target user should rejoin, or you should clear Apprise persistent storage so that a new DM room is created on the next send.
:::

:::note
E2EE requires both a **matrixs://** (HTTPS) URL and the `cryptography` Python package (`pip install cryptography`). On plain **matrix://** (HTTP) connections E2EE is silently skipped and messages are sent unencrypted, regardless of the `e2ee` setting.
:::

:::tip
Apprise caches E2EE session keys and room encryption state in its persistent storage to avoid redundant network round-trips. If a room's encryption configuration changes after the first send (for example, encryption is enabled on a previously unencrypted room), Apprise will continue to use the cached state until the storage is reset. To force a fresh key exchange and room state lookup, clear the Apprise persistent storage for this plugin instance.
:::

:::note[Rooms created by Apprise when e2ee=yes]
When `e2ee=yes` (the default) and Apprise creates a new room -- because a room alias does not yet exist or a new DM room is needed -- Apprise creates that room **with** the `m.room.encryption` state event set to `m.megolm.v1.aes-sha2`.

- Encryption is **irreversible** once set on a room; Apprise encrypts new rooms up front so every message, including the very first, is protected.
- Clients that do not support E2EE (older or non-standard clients) can still **join** the room, but they will not be able to read encrypted messages.
- If you need a room that non-E2EE clients can read, either pre-create the room in your Matrix client (without enabling encryption) before pointing Apprise at it, or use `e2ee=no` in your Apprise URL.

For rooms Apprise did **not** create, it checks the `m.room.encryption` state on every send and automatically encrypts messages for rooms that already have it set, regardless of how the room was originally created. Rooms that have no encryption state are always sent as plain text, even when `e2ee=yes`.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a secure Matrix notification using a username and password:

```bash
# Assuming {hostname} is matrix.example.com
# Assuming {user} is nuxref
# Assuming {password} is abc123
# Notify #general and #apprise
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/#general/#apprise
```

Send a notification using a pre-generated access token (useful when
password login is disabled on the server):

```bash
# Assuming {hostname} is matrix.example.com
# Assuming {token} is syt_abc123...
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "matrixs://syt_abc123@matrix.example.com/#general"
```

If a room or DM target is not being found (try running with `-vv` to see the error), add `?hsreq=no` to stop Apprise from appending the server name automatically:

```bash
# Room ID target
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/!abc123?hsreq=no

# DM target -- also worth trying if @bob delivery fails
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/@bob?hsreq=no
```

Use API v2 (required for attachments in some deployments):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/#general?v=2
```

E2EE is enabled by default when the `cryptography` package is installed and the room supports it. To explicitly disable E2EE (always send unencrypted):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "matrixs://nuxref:abc123@matrix.example.com/#general?e2ee=no"
```

Send a direct message to a Matrix user:

```bash
# Assuming {hostname} is matrix.example.com
# Assuming {user} is nuxref, {password} is abc123
# DM @bob on the same homeserver
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrixs://nuxref:abc123@matrix.example.com/@bob
```

Send a direct message using a pre-generated access token:

```bash
# Assuming {hostname} is matrix.example.com
# Assuming {token} is syt_abc123...
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "matrixs://syt_abc123@matrix.example.com/@bob"
```

Send a **t2bot.io** webhook request:

```bash
# Assuming {webhook} is ABCDEFG12345
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   matrix://ABCDEFG12345
```

Send a **matrix-hookshot** webhook request:

```bash
# Assuming {hostname} is hookshot.example.com
# Assuming {token} is ABCDEFG12345
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "matrixs://apprise:ABCDEFG12345@hookshot.example.com?mode=hookshot"
```

If your hookshot instance is exposed behind a custom public webhook path:

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "matrixs://apprise:ABCDEFG12345@hookshot.example.com?mode=hookshot&path=/public-hooks"
```
