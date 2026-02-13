---
title: "XMPP Notifications"
description: "Send XMPP notifications."
sidebar:
  label: "XMPP"

source: https://xmpp.org/

schemas:
  - xmpp: insecure
  - xmpps

has_selfhosted: true

sample_urls:
  - xmpp://{user}/{password}@{hostname}
  - xmpps://{user}/{password}@{hostname}/{jid}
  - xmpps://{user}/{password}@{hostname}/{jid1}/{jid2}/{jidN}
---

<!-- SERVICE:DETAILS -->

## Account Setup

XMPP support requires **slixmpp version 1.10.0 or newer**:

```bash
pip install "slixmpp>=1.10.0"
```

From here, you will need:

1. An existing XMPP account username (on a self-hosted or remotely hosted XMPP server).
1. The password associated with that account.
1. The hostname of your XMPP server.
1. (Optional) The port the XMPP server listens on.

In Apprise, the **login JID is automatically constructed as `{user}@{host}`**. You do not need to explicitly provide a full JID. Authentication credentials are supplied using `{user}:{password}@{host}`, but the resulting login identity is always normalized to `{user}@{host}`.

## Syntax

Valid syntax is as follows:

- `xmpp://{user}:{password}@{host}`
- `xmpps://{user}:{password}@{host}`
- `xmpp://{user}:{password}@{host}:{port}`
- `xmpp://{user}:{password}@{host}/{jid}`
- `xmpp://{user}:{password}@{host}/{jid1}/{jid2}`
- `xmpps://{user}:{password}@{host}/{jid}?verify=no`

Secure connections should be referenced using **`xmpps://`**, whereas
insecure connections should be referenced using **`xmpp://`**.

If no target is specified, Apprise sends the notification to the authenticated account itself (`{user}@{host}`).

Targets may also be supplied using the `to=` query argument (comma-separated).

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user      | **Yes**  | XMPP username (localpart), combined with `host` to form the login JID                                                                                                                                                                                                                                                                                                                                                                                                        |
| password  | **Yes**  | Password for the XMPP account                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| host      | **Yes**  | XMPP server hostname (domain)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| port      | No       | Server port (defaults: 5222 for `xmpp`, 5223 for `xmpps`)                                                                                                                                                                                                                                                                                                                                                                                                                    |
| mode      | No       | Transport secure mode override; possible values are `none`, `starttls`, or `tls`                                                                                                                                                                                                                                                                                                                                                                                             |
| roster    | No       | Retrieves roster from the server after connection; default is `no`                                                                                                                                                                                                                                                                                                                                                                                                           |
| keepalive | No       | Enables XMPP keepalive mode to maintain a persistent connection between notifications. This is only effective when Apprise remains resident in memory (for example, in long-running applications). It has no practical effect when using the Apprise CLI or API in one-shot mode, as the instance is created, sends the notification, and is then destroyed. Even with `?keepalive=yes`, the connection closes once the Apprise instance goes out of scope. Default is `no`. |
| subject   | No       | Messages are sent as `mtype=chat`, which do not typically use the built-in XMPP `subject=` field. Setting this to `yes` redirects any title provied into the `subject=` field instead of concatinating it to the body (default behavior which is `subject=no`).                                                                                                                                                                                                              |
| to        | No       | Alternate way to specify target JIDs (comma-separated)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| target    | No       | Recipient JID                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Secure Modes

The **`mode`** parameter explicitly controls how the XMPP connection is established and **overrides the schema (`xmpp://` or `xmpps://`) default**.

| Mode       | Description                                |
| ---------- | ------------------------------------------ |
| `none`     | Plaintext connection (no TLS)              |
| `starttls` | STARTTLS upgrade on a plaintext connection |
| `tls`      | Direct TLS connection                      |

:::note
The XMPP plugin takes the most secure option when presented with an ambiguous situation:

1. If you use a secure schema (`xmpps://`) while also setting
   `mode=none`, the secure schema prevails and `starttls` is used.
1. If you use an insecure schema (`xmpp://`) while setting
   `mode=starttls` or `mode=tls`, the secure mode you specified prevails.

   :::

   :::

### Default behaviour

- `xmpp://` defaults to `mode=none`
- `xmpps://` defaults to `mode=starttls`

## Keepalive Mode

Keepalive mode is intended for long-running applications that reuse a
single Apprise instance.

When enabled:

- The XMPP connection remains open between notifications.
- Multiple messages reuse the same session.
- Connection overhead is reduced.

When using the CLI or a one-shot execution model, keepalive provides no
benefit because the process exits immediately after sending.

Example of enabling keepalive:

```bash
apprise -vv -b "Persistent Message" \
  xmpps://user:password@chat.example.com?keepalive=yes
```

In embedded usage:

```python
from apprise import Apprise

a = Apprise()
a.add("xmpps://user:password@chat.example.com?keepalive=yes")

a.notify(body="First message")
a.notify(body="Second message")
```

In this scenario, the connection is reused between notifications.

## JID Assembly

Apprise normalizes JIDs to ensure consistent and predictable behaviour, even when shorthand forms are used.

Consider the following Apprise XMPP URL:

```text
         xmpp://user:pass@example.ca
                              ^
                              |
                         default_host
```

:::tip[Defining Resources]
Use `%2F` to represent a resource (acts as `/`) when specifying resources in the URL path, for example: `jason@example.ca%2Fresource`.

Alternatively, use the `to=` query argument, which eliminates the need to URL-encode `/`. For example: `?to=jason@example.ca/resource`.
:::

| URL                                                         | JIDs Notified                           |
| ----------------------------------------------------------- | --------------------------------------- |
| `xmpps://user:pass@example.ca`                              | `user@example.ca`                       |
| `xmpps://user:pass@example.ca/jane`                         | `jane@example.ca`                       |
| `xmpps://user:pass@example.ca/jane/joe`                     | `jane@example.ca`, and `joe@example.ca` |
| `xmpps://user:pass@example.ca/jane@foobar.ca`               | `jane@foobar.ca`                        |
| `xmpps://user:pass@example.ca/jason%2Fmobile`               | `jason@example.ca/mobile`               |
| `xmpps://user:pass@example.ca/jane@foobar.ca%2Fworkstation` | `jane@foobar.ca/workstation`            |

## Examples

Send a plaintext XMPP notification:

```bash
apprise -vv -b "Test Message" \
  xmpp://user:password@localhost
```

Send a STARTTLS-secured notification:

```bash
apprise -vv -b "Secure Message" \
  xmpp://user:password@localhost?mode=starttls
```

Send a direct TLS notification:

```bash
apprise -vv -b "TLS Message" \
  xmpps://user:password@chat.example.com
```

Send a message to a specific recipient:

```bash
apprise -vv -t "Test Title" -b "Hello from Apprise" \
  xmpps://user:password@chat.example.com/alice@example.net
```

Send a message to multiple recipients using the `to=` argument:

```bash
apprise -vv -b "Group Message" \
  xmpps://user:password@chat.example.com?to=alice@example.net,bob@example.org
```

Disable TLS certificate verification:

```bash
apprise -vv -b "Test Message" \
  xmpps://user:password@chat.example.com/alice@example.net?verify=no
```

Send a notification to a resource:

```bash
apprise -vv -b "Test Message" \
  xmpps://user:password@chat.example.com/?to=alice@example.net/mobile
```
