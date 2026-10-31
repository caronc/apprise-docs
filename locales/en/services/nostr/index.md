---
title: "Nostr Notifications"
description: "Post public notes or send private direct messages on Nostr."
sidebar:
  label: "Nostr"

source: https://nostr.com/

schemas:
  - nostr

has_attachments: true
has_chat: true
has_selfhosted: true

body_formats:
  - text

keywords: "damus, primal, amethyst, 0xchat"

sample_urls:
  - nostr://{secret_key}
  - nostr://{secret_key}/{npub}
  - nostr://{secret_key}/{name}@{domain}

limits:
  max_chars: 8192
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Nostr is an open, decentralized social network. Your messages are signed with your own key and published to relays (servers) that anyone can run, so there is no account to sign up for.

1. Create a Nostr account in any client, such as [Damus](https://damus.io/), [Primal](https://primal.net/), [Amethyst](https://github.com/vitorpamplona/amethyst) or [0xchat](https://0xchat.com/). A separate account just for notifications is a good idea.
1. Find the option to export or back up your private key in the client's settings. It starts with `nsec1`. A key written as 64 hexadecimal characters also works.
1. Keep this key secret. Anyone who has it can post as you.

Apprise can send two kinds of messages:

- **A public note:** with no recipients, the message is posted to your public feed for your followers to see.
- **A direct message:** add one or more recipients and each gets a private, encrypted message. A recipient is a public key (starting with `npub1`) or a Nostr address such as `alice@example.com`.

Direct messages use the private NIP-17 format by default, which hides who is talking to whom. Use `?mode=nip04` for an older client that only understands NIP-04 messages.

:::note
Direct messages need the `cryptography` package (`pip install cryptography`). Public notes work without it.
:::

### Relays

Messages are sent to a few well-known public relays unless you choose your own with `?relay=`. A relay address starts with `wss://`. If you leave this out, `wss://` is assumed. Apprise reports success as long as at least one relay accepts the message.

A NIP-17 direct message only goes to the relays the recipient has listed for receiving messages (up to 3 of them). If the recipient has not published such a list, the message fails, because they would never see it. `?mode=nip04` can reach them instead. If your own account lists relays like this too, Apprise keeps a copy of each message there so it shows up in your other Nostr clients.

### Attachments

Attachments are uploaded to a [Blossom](https://github.com/hzrd149/blossom) media server and linked in the message. Apprise uses the server set with `?blossom=`. Without one, it uses the first server from the Blossom server list in your Nostr profile, and falls back to `https://nostr.download` if there is none.

In a NIP-17 direct message, each file is encrypted before it is uploaded, so only the recipient can open it. Public notes and NIP-04 messages link to the file as it is, so anyone with the link can view it.

## Syntax

Valid syntax is as follows:

- `nostr://{secret_key}`
- `nostr://{secret_key}/{npub}`
- `nostr://{secret_key}/{name}@{domain}`
- `nostr://{secret_key}/{npub1}/{npub2}/{npubN}`
- `nostr://{secret_key}/{npub}?mode=nip04`
- `nostr://{secret_key}?relay={relay1},{relay2}`

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                       |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secret_key | Yes      | Your private key, starting with `nsec1` or written as 64 hexadecimal characters. It can also be set with `?key=`.                                                                                 |
| target     | No       | One or more recipients for a direct message. Each is a public key (`npub1...` or 64 hexadecimal characters) or a Nostr address such as `alice@example.com`. Without one, a public note is posted. |
| to         | No       | An alias of `target`. Separate multiple recipients with commas.                                                                                                                                   |
| mode       | No       | How direct messages are sent: `nip17` (private messages) or `nip04` (older encrypted messages). The default is `nip17`.                                                                           |
| relay      | No       | One or more relays to publish to, separated by commas. The default is `wss://relay.damus.io`, `wss://nos.lol` and `wss://relay.primal.net`.                                                       |
| blossom    | No       | The Blossom server attachments are uploaded to, such as `https://blossom.example.com`. The default is the first server listed in your Nostr profile, or `https://nostr.download`.                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Post a public note:

```bash
apprise -vv -b "The backup finished" \
   "nostr://nsec1yourprivatekey"
```

Send a private direct message to two people:

```bash
apprise -vv -t "Backup" -b "The backup finished" \
   "nostr://nsec1yourprivatekey/npub1yourfriendskey/alice@example.com"
```

Send a photo as an older NIP-04 direct message through your own relay:

```bash
apprise -vv -b "Someone is at the door" --attach=/tmp/door.jpg \
   "nostr://nsec1yourprivatekey/npub1yourfriendskey?mode=nip04&relay=relay.example.com"
```
