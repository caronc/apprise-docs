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

XMPP Support requires **slixmpp** to work:

```bash
pip install slixmpp
```

From here, you will need:

1. An existing XMPP account username (on a self hosted or remotely hosted XMPP Server).
1. The password associated with that account.
1. The hostname of your XMPP server.
1. (Optional) The port the XMPP server listens on.

In Apprise, the **login JID is automatically constructed as `{user}@{host}`**. You do not need to explicitly provide a full JID. If your XMPP server requires authentication, the JID is still assembled from `{user}:{password}@{host}` back into `{user}@{host}`.

## Syntax

Valid syntax is as follows:

- `xmpp://{user}/{password}@{hostname}`
- `xmpps://{user}/{password}@{hostname}`
- `xmpp://{user}/{password}@{hostname}/{jid}`
- `xmpp://{user}/{password}@{hostname}/{jid1}/{jid2}/{jidN}`

Secure connections should be referenced using **xmpps://** where as insecure connections should be referenced via **xmpp://**.

If no target is specified, Apprise will send the notification to the
authenticated account itself (`{user}@{host}`).

Targets may also be supplied using the `to=` query argument.

## Parameter Breakdown

| Variable | Required | Description                                                           |
| -------- | -------- | --------------------------------------------------------------------- |
| user     | **Yes**  | XMPP username (localpart); combined with `host` to form the login JID |
| password | **Yes**  | Password for the XMPP account                                         |
| host     | **Yes**  | XMPP server hostname (domain)                                         |
| port     | No       | Server port (defaults: 5222 for `xmpp`, 5223 for `xmpps`)             |
| target   | No       | Recipient JID                                                         |
| verify   | No       | Enable TLS certificate verification (default: yes)                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a XMPP notification to our server listening on port 5223:

```bash
# Assuming the xmpp {hostname} is localhost
# Assuming the jid is user@localhost
#  - constructed using {hostname} and {userid}
# Assuming the xmpp {password} is abc123
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   xmpp://user:abc123@localhost
```

Send a message to a specific recipient:

```bash
apprise -vv -t "Test Title" -b "Hello from Apprise" \
  xmpps://me:password@chat.example.com/alice@example.net
```

Send a message to multiple recipients using the `to=` argument:

```bash
apprise -vv -b "Group Message" \
  xmpps://me:password@chat.example.com?to=alice@example.net,bob@example.org
```

Disable TLS certificate verification:

```bash
apprise -vv -b "Test Message" \
  xmpps://me:password@chat.example.com/alice@example.net?verify=no
```
