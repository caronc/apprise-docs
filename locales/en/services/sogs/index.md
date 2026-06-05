---
title: "Session Open Group Server Notifications"
description: "Send notifications to a Session Open Group Server (SOGS) room."
sidebar:
  label: "Session Open Group Server"

source: https://github.com/session-foundation/session-pysogs

schemas:
  - sessions
  - sogs
  - session: insecure

has_chat: true
has_selfhosted: true

sample_urls:
  - sessions://{public_key}:{seed}@{hostname}/{room}
  - sessions://{public_key}:{seed}@{hostname}:{port}/{room}
  - session://{public_key}:{seed}@{hostname}/{room}
---

## Session Open Group Server

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Session](https://getsession.org/) is a private, decentralised messaging
application. A **Session Open Group Server** (SOGS) hosts publicly accessible
community rooms. This plugin lets you post messages into one or more SOGS rooms
using a bot identity.

You need two pieces of information: the **server_key** (the server's public
key) and a **seed** (your bot's private Ed25519 seed). Both are 64 lowercase
hex characters.

### Step 1 -- Generate a bot seed

The bot's identity is a **64-hex Ed25519 seed** (32 random bytes). Generate
one in Python:

```python
import os
print(os.urandom(32).hex())
# example output: a1b2c3d4e5f6...  (64 hex chars)
```

Keep this value secret -- it is your `seed`. Anyone who holds it can post to
any room your bot has been granted write access to.

### Step 2 -- Find the server_key

Every SOGS instance advertises a **64-hex Curve25519 server_key**. You can
find it in any Session group join link:

```text
https://open.getsession.org/discussion?public_key=a03c383cf63c3c4e...
```

The `public_key=` value is the `server_key` you supply in the Apprise URL.

### Step 3 -- Find the room token

The room token is the path segment of the join link above (`discussion` in the
example). It is a short alphanumeric slug that uniquely identifies the room on
that server.

### Step 4 -- Grant the bot write access

A server administrator must add the bot's Ed25519 public key to the room's
allowed list. The bot's public key is derived automatically from your `seed`;
you can display it with:

```python
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat

seed = bytes.fromhex("your_seed_here")
key  = Ed25519PrivateKey.from_private_bytes(seed)
print("00" + key.public_key().public_bytes(Encoding.Raw, PublicFormat.Raw).hex())
```

## Syntax

Valid syntax is as follows:

- `sessions://{public_key}:{seed}@{hostname}/{room}`
- `sessions://{public_key}:{seed}@{hostname}:{port}/{room}`
- `sessions://{public_key}:{seed}@{hostname}/{room1}/{room2}`
- `sogs://{public_key}:{seed}@{hostname}/{room}`
- `session://{public_key}:{seed}@{hostname}/{room}`

Query-string form (useful in config files where embedding credentials in the
URL authority is awkward):

- `sessions://{hostname}/{room}?key={public_key}&seed={seed}`
- `sessions://{hostname}/{room}?public_key={public_key}&seed={seed}`

Multiple rooms can be specified as additional path segments, or via `?to=`:

- `sessions://{public_key}:{seed}@{hostname}?to={room1},{room2}`

## Parameter Breakdown

| Variable | Required | Description                                                                                                                       |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| hostname | Yes      | The hostname (or IP address) of the SOGS server.                                                                                  |
| port     | No       | The port the server listens on. Defaults to **443** for `sessions://` and **80** for `session://`.                                |
| key      | Yes      | The 64-hex Curve25519 public key of the SOGS server (from the Session join link `?public_key=`). Also accepted as `?public_key=`. |
| seed     | Yes      | The 64-hex Ed25519 seed that identifies the bot account. Treat it like a password -- keep it secret.                              |
| room     | Yes      | One or more room tokens identifying the SOGS rooms to post into.                                                                  |
| to       | No       | Comma-separated list of additional room tokens (alias for room path segments).                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Post a notification to a public SOGS room over HTTPS:

```bash
# Assuming:
#   {public_key} = a03c383cf63c3c4ead6c4f0a29...  (64 hex chars, from join link)
#   {seed}       = a1b2c3d4e5f6...  (64 hex chars, your bot seed)
#   {hostname}   = open.getsession.org
#   {room}       = discussion

apprise -vv -t "Hello" -b "Test notification from Apprise" \
   "sessions://a03c383c...:a1b2c3d4...@open.getsession.org/discussion"
```

Post to two rooms in one command:

```bash
apprise -vv -b "Broadcast message" \
   "sessions://a03c383c...:a1b2c3d4...@open.getsession.org/room1/room2"
```

Use the plain HTTP schema for a locally hosted server without TLS:

```bash
apprise -vv -b "Local SOGS test" \
   "session://a03c383c...:a1b2c3d4...@localhost:8080/discussion"
```

Query-string style (useful in config files):

```bash
apprise -vv -b "Config-file style" \
   "sessions://open.getsession.org/discussion?key=a03c383c...&seed=a1b2c3d4..."
```
