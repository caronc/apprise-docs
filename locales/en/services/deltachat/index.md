---
title: "Delta Chat Notifications"
description: "Send Delta Chat notifications over SMTP."
sidebar:
  label: "Delta Chat"

source: https://delta.chat/

schemas:
  - deltachat
  - deltachats

has_chat: true
has_selfhosted: true
has_attachments: true

body_formats:
  - text

keywords: "chatmail"

sample_urls:
  - deltachat://user:pass@smtp.example.com/friend@example.org
  - deltachats://user:pass@smtp.example.com:465/friend@example.org?mode=ssl
  - deltachat://user:pass@smtp.example.com/friend1@example.org/friend2@example.org
  - deltachat://user:pass@smtp.example.com/friend@example.org?pgp=sign&wkd=yes
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

[Delta Chat](https://delta.chat/) is a messenger built on email. Apprise sends
chat-compatible messages through your bot account's SMTP server, without a
bridge or another local service.

1. Choose a mailbox for your bot:
   - **A regular email account.** Chatmail recipients may reject messages
     unless PGP encryption is available; see the caution below.
   - **A public [chatmail relay](https://chatmail.at/relays).** Choose a
     username and strong password. The relay creates the address on its first
     login. Public relays are best suited to light, personal use.
   - **Your own [self-hosted chatmail relay](https://chatmail.at/doc/relay/getting_started.html).**
     It also creates addresses on first login and gives you control of capacity.
2. Note the account's SMTP host, port, username, and password.
3. Ask each recipient to add the bot as a contact or send it a message first.
   Messages from unknown senders may appear under **Contact Requests** until
   accepted.

:::caution[Some servers require encryption]
Chatmail relays require end-to-end encryption. If either account uses one,
configure PGP and key discovery as described in [PGP Security](#pgp-security).
:::

## Syntax

Valid syntax is as follows:

- `deltachat://{user}:{password}@{host}/{targets}`
- `deltachat://{user}:{password}@{host}:{port}/{targets}`

`deltachat://` sends over an unencrypted connection by default. Adding an
`s` to the schema (`deltachats://`) switches the default transport to
STARTTLS instead; use `?mode=ssl` for implicit SSL/TLS (see
[Transport Security](#transport-security)):

- `deltachats://{user}:{password}@{host}/{targets}`
- `deltachats://{user}:{password}@{host}:{port}/{targets}`

`{targets}` is one or more recipient email addresses. Each one is the
Delta Chat identity of the person or bot you're notifying:

- `deltachat://{user}:{password}@{host}/{target1}/{target2}/{targetN}`

If you omit `{targets}`, Apprise sends the notification to your own bot's
address. This is a handy way to send yourself a personal alert or test a
setup without needing a second Delta Chat contact.

`{host}` should be your bot's own address domain (it becomes part of your
Delta Chat identity)—not necessarily the SMTP server you actually
connect to. If those differ, such as a corporate or third-party relay,
add `?smtp={smtp-host}` to specify the real submission server while
keeping your identity's domain in `{host}`:

```text
deltachat://bot:pass@example.com/friend@example.org?smtp=smtp-relay.company.com
```

See the Email plugin's
[Using Custom SMTP Servers](/services/email/#using-custom-smtp-servers)
section for more on this.

## Message Format

Apprise sends plain-text bodies with the `Chat-Version: 1.0` header required
by the [email-chat protocol](https://github.com/deltachat/spec). Subjects begin
with `Chat:` as recommended by the protocol. Encrypted messages use the generic
`Chat: Encrypted message` subject so protected text is not exposed.

## Transport Security

| Mode     | `?mode=` value | Default port | Notes                                              |
| -------- | -------------- | ------------ | -------------------------------------------------- |
| None     | `insecure`     | 25           | Default for `deltachat://`; most servers reject it |
| STARTTLS | `starttls`     | 587          | Default for `deltachats://`                        |
| SSL/TLS  | `ssl`          | 465          | Set explicitly with `?mode=ssl`                    |

## PGP Security

Delta Chat uses the Email plugin's `pgp`, `pgppub`, `pgpprv`, and `wkd`
options. When PGP is enabled and Apprise has a compatible private key, it
advertises the matching public key so recipients can encrypt replies.

Apprise does not read incoming messages. If it generated this key, import the
private file into the client that will read encrypted replies.

Key generation is limited to the bot's sender key during an encrypted
self-send. Apprise never generates keys for external recipients.

| Mode          | What it does                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `pgp=no`      | No PGP (default).                                                                                                    |
| `pgp=sign`    | Signs the message with your private key. Opportunistically also encrypts if a recipient public key is already known. |
| `pgp=encrypt` | Encrypts the message with the recipient's public key. Fails the send if no key can be found.                         |

Both protected modes require [PGPy](https://pypi.org/project/pgpy/)
(`pip install pgpy`). When PGP is requested but unavailable, the send fails
instead of silently sending an unprotected message.

Using `wkd=yes` without `pgp=` enables encryption. Set `pgp=no` explicitly to
keep PGP disabled.

```text
deltachat://user:pass@smtp.example.com/friend@example.org?pgp=sign&pgpprv=/path/to/my-prv.asc
deltachat://user:pass@smtp.example.com/friend@example.org?pgp=encrypt&pgppub=/path/to/recipient-pub.asc
deltachat://user:pass@smtp.example.com/friend@example.org?pgp=sign&wkd=yes&pgpprv=/path/to/my-prv.asc
```

See the Email plugin's [PGP Security](/services/email/#pgp-security) section
for key discovery, generated keys, and Web Key Directory lookups.

## Troubleshooting

**Apprise reports success, but nothing appears.** Ask the recipient to check
**Contact Requests**. Messages from unknown senders may wait there for approval.

**The send fails.** Check these common causes:

- Double-check `mode=` against what your provider expects;
  see [Transport Security](#transport-security). Most providers use
  STARTTLS on 587; a handful use implicit SSL on 465.
- If either account uses a chatmail relay, configure PGP and recipient key
  discovery.
- Run with `-vv` (`apprise -vv ...`) to see the actual SMTP error Apprise
  received back from the server.

**PGP encryption fails (`pgp=encrypt`).** Apprise needs the recipient's public
key from `pgppub=`, `wkd=yes`, or its cache. With `pgp=sign`, Apprise sends a
signed message when no recipient key is known and encrypts when one is found.

**Authentication fails with a "wrong" login or sender address.** If your
bot authenticates against a relay whose domain differs from its own
address (e.g. `bot@example.com` sending through
`smtp-relay.company.com`), put your identity's domain in `{host}` and the
relay in `?smtp=`—see the note in [Syntax](#syntax). Putting the
relay's hostname directly in `{host}` makes Apprise treat _that_ domain
as your identity, which breaks both login and the `From:` address.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                         |
| -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| user     | \*Yes    | SMTP login name, often the full email address.                                                                                      |
| password | \*Yes    | SMTP password.                                                                                                                      |
| host     | Yes      | Your bot's own address domain (part of its Delta Chat identity).                                                                    |
| port     | No       | SMTP port. Defaults per `mode=` (see [Transport Security](#transport-security)).                                                    |
| targets  | No       | One or more recipient email addresses. Also settable via `?to=`. If omitted, sends to your own bot's address.                       |
| from     | No       | Sender email override. Accepts an email or a `Name <email>` value.                                                                  |
| name     | No       | Override the sender's display name.                                                                                                 |
| mode     | No       | Transport security: `insecure`, `starttls`, or `ssl` (see [Transport Security](#transport-security) for the schema-based defaults). |
| smtp     | No       | The actual SMTP submission server, when it differs from `host` (e.g. a relay).                                                      |
| pgp      | No       | PGP mode: `no` (default), `sign`, or `encrypt`.                                                                                     |
| pgppub   | No       | Path to a recipient's PGP public key.                                                                                               |
| pgpprv   | No       | Path to your own PGP private key.                                                                                                   |
| wkd      | No       | Enable Web Key Directory public key discovery (`yes`/`no`).                                                                         |

**\*** Not required if your server accepts anonymous/unauthenticated
relaying.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a plain message to a single Delta Chat contact:

```bash
apprise -vv -t "Server Alert" -b "Disk usage is at 92%" \
    "deltachat://bot:app-password@smtp.example.com/friend@example.org"
```

Notify multiple recipients at once:

```bash
apprise -vv -t "Deploy finished" -b "Build #482 is live" \
    "deltachat://bot:app-password@smtp.example.com/team1@example.org/team2@example.org"
```

Use implicit SSL/TLS on a custom port:

```bash
apprise -vv -t "Test" -b "Hello from Apprise" \
    "deltachats://bot:app-password@smtp.example.com:465/friend@example.org?mode=ssl"
```

Sign every message, and opportunistically encrypt when a recipient's key
is already known:

```bash
apprise -vv -t "Test" -b "Hello from Apprise" \
    "deltachat://bot:app-password@smtp.example.com/friend@example.org?pgp=sign&wkd=yes&pgpprv=/home/user/.gnupg/my-prv.asc"
```
