---
title: "XMPP Notification Testing"
description: "Testing XMPP Notifications"
sidebar:
  label: "XMPP Testing"
---

## Prosody

### Server Setup

```bash
docker run --rm -d \
  --name prosody-test \
  -p 5222:5222 \
  -e PROSODY_VIRTUAL_HOSTS=localhost \
  -e PROSODY_LOGLEVEL=debug \
  prosodyim/prosody:13.0
```

### Create Test Users

```bash
docker exec -it prosody-test prosodyctl register apprise localhost password123
docker exec -it prosody-test prosodyctl register receiver localhost password123

```

### Install the Client

Download and install [Gajim](https://gajim.org/)

```bash
sudo dnf install gajim
```

Log in as `receiver@localhost` and password `password123`

### Test Apprise

Send a notification

```bash
# starttls setup below:
tox -e apprise -- -vv -b 'test message' \
   'xmpps://apprise:password123@localhost/receiver?verify=no'
```

## SCRAM-PLUS and the Python TLS Ecosystem

### The "Invalid channel binding" error

When connecting to certain XMPP servers you may see authentication fail with:

```text
Authentication failed: not-authorized
Invalid channel binding
```

This is caused by SASL SCRAM-PLUS mechanisms (`SCRAM-SHA-256-PLUS`,
`SCRAM-SHA-1-PLUS`). These are the highest-scored SASL mechanisms and
slixmpp selects them automatically when the server advertises them. They
embed TLS channel-binding data into the authentication exchange for extra
protection against man-in-the-middle attacks.

The problem arises from a mismatch between what the client can supply and
what the server expects:

- **`tls-unique`** -- the traditional channel-binding type -- is forbidden
  on TLS 1.3 connections (RFC 9266).
- **`tls-exporter`** -- the TLS 1.3 replacement -- requires Python 3.13+
  and is not yet accepted by all server implementations.

When neither type is available or accepted, authentication fails with
"Invalid channel binding."

### Quick fix: disable SCRAM-PLUS

Add `?scramplus=no` to your Apprise URL to fall back to plain SCRAM
mechanisms. The connection remains fully TLS-encrypted; only the extra
channel-binding step is skipped.

```bash
apprise -vv -b "Test" \
  "xmpps://user:password@chat.example.com/recipient?scramplus=no"
```

Apprise automatically logs a targeted warning when it detects this error
and suggests adding `?scramplus=no`.

### Background: a widespread Python ecosystem issue

This is not an Apprise-specific problem. The SASL SCRAM-PLUS breakage
affects a large number of Python libraries and projects. The community
member who first reported this issue to Apprise has been tracking every
affected library at:

> **<https://github.com/scram-sasl/info/issues/1>**

That page documents the full scope of the problem across the Python
ecosystem and has been used to file upstream issues in Python and in many
libraries. If this problem is affecting you, consider adding a comment or
a thumbs-up there to help raise visibility and accelerate an upstream fix.
