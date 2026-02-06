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

Secure connections should be referenced using **xmpps://**, whereas insecure connections should be referenced using **xmpp://**.

If no target is specified, Apprise sends the notification to the authenticated account itself (`{user}@{host}`).

Targets may also be supplied using the `to=` query argument (comma-separated).

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                                  |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| user     | **Yes**  | XMPP username (localpart), combined with `host` to form the login JID                                                                                                                                                                                        |
| password | **Yes**  | Password for the XMPP account                                                                                                                                                                                                                                |
| host     | **Yes**  | XMPP server hostname (domain)                                                                                                                                                                                                                                |
| port     | No       | Server port (defaults: 5222 for `xmpp`, 5223 for `xmpps`)                                                                                                                                                                                                    |
| mode     | No       | Transport secure mode override; possible values are `none`, `starttls`, or `tls`                                                                                                                                                                             |
| roster   | No       | Retrieves roster from server after connection to it; default is `no`                                                                                                                                                                                         |
| subject  | No       | Messages are sent as `mtype=chat` which do not typically use the built in XMPP `subject=` field. Setting this to `yes` redirect any title provied into the `subject=` field instead of concatinating it to the body (default behavior which is `subject=no`) |
| to       | No       | Alternate way to specify target JIDs (comma-separated)                                                                                                                                                                                                       |
| target   | No       | Recipient JID                                                                                                                                                                                                                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Secure Modes

The **`mode`** parameter explicitly controls how the XMPP connection is established and **overrides the schema (`xmpp://` or `xmpps://`) default**.

| Mode       | Description                                |
| ---------- | ------------------------------------------ |
| `none`     | Plaintext connection (no TLS)              |
| `starttls` | STARTTLS upgrade on a plaintext connection |
| `tls`      | Direct TLS connection                      |

:::note
the XMPP plugin takes the most secure option when presented with an ambiguous situation. Here are the scenarios:

1. Setting your Apprise URL to a secure mode (such as `xmpps://` or `?secure=yes`) while at the same time setting the (secure) `mode` to `none`. In this circumstance, the `secure=yes` prevails and the default mode used is `starttls`
1. Setting your Apprise URL to an insecure mode (such as `xmpp://` or `?secure=no`) while at the same time setting the (secure) `mode` to something other than `none`. In this circumstance, the secure mode is turned on, and the mode you identified prevails.

   :::

### Default behaviour

- `xmpp://` defaults to `mode=none`
- `xmpps://` defaults to `mode=starttls`

### JID Assembly

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

Send a STARTTLS-secured notification (recommended):

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
