---
title: "Threema Gateway Notifications"
description: "Send Threema Gateway notifications."
sidebar:
  label: "Threema Gateway"

source: https://gateway.threema.ch/

schemas:
  - threema

sample_urls:
  - threema://{gateway_id}@{secret}/{user}
  - threema://{gateway_id}@{secret}/{email}
  - threema://{gateway_id}@{secret}/{phone}

limits:
  max_chars: 3500
---

<!-- SERVICE:DETAILS -->

## Account Setup

You need to set up a [Threema Gateway](https://gateway.threema.ch/) account
first. Once registered, you can request one or more 8-character **Gateway
IDs** (each starting with an asterisk, e.g. `*MYGWYID`).

Apprise supports two modes:

### Basic Mode (default)

This is the simplest option. Threema handles all encryption on their servers;
you do not need to manage any keys.

1. Sign up at <https://gateway.threema.ch/> and confirm your e-mail address.
2. Obtain credits (ask Threema support at <support-gateway@threema.ch> for a
   small number of test credits, or purchase them through your account).
3. [Request a Basic Gateway ID](https://gateway.threema.ch/en/id-request?type=simple).
   Threema will review it (usually within one or two business days) and create
   the ID. The corresponding **API secret** appears on the ID overview page.

You can now send to any recipient by their Threema ID, phone number, or
e-mail address.

### End-to-End Encrypted Mode (`?mode=e2e`)

In E2E mode your messages are encrypted on your own machine before being
sent; Threema's servers never see the plaintext.

**What you need beforehand:**

1. [Request an E2E Gateway ID](https://gateway.threema.ch/en/id-request?type=e2e)
   instead of a Basic one.
2. During setup the Threema Gateway portal will generate a **Curve25519 key
   pair** for you and display (or let you download) your private key. It
   looks like this:

   ```text
   private:aabbccddeeff00112233445566778899aabbccddeeff00112233445566778899
   ```

   The part after `private:` is your 64-character hex private key. Keep this
   secret -- anyone with it can send messages as your Gateway ID.

3. Install the required Python library (one-time setup):

   ```bash
   pip install PyNaCl
   ```

**Note:** E2E mode only supports **Threema ID** targets (8-character IDs
like `ABCD1234`). Phone numbers and e-mail addresses are not supported in
this mode.

## Syntax

Valid syntax is as follows:

- `threema://{gateway_id}@{secret}/{user}`
- `threema://{gateway_id}@{secret}/{user1}/{user2}/{user3}/{userN}`
- `threema://{gateway_id}@{secret}/{email}`
- `threema://{gateway_id}@{secret}/{email1}/{email2}/{email3}/{emailN}`
- `threema://{gateway_id}@{secret}/{phone}`
- `threema://{gateway_id}@{secret}/{phone1}/{phone2}/{phone3}/{phoneN}`

You can also freely mix target types:

- `threema://{gateway_id}@{secret}/{phone1}/{user1}/{email1}/...`

For end-to-end encrypted mode (Threema IDs only):

- `threema://{gateway_id}@{secret}/{user}?mode=e2e&privkey={privkey}`
- `threema://{gateway_id}@{secret}/{user1}/{user2}?mode=e2e&privkey={privkey}`

The `{privkey}` value is your 64-character hex private key. You can paste it
in either of these two equivalent forms:

- Raw hex (just the 64 characters): `?privkey=aabbcc...`
- Full SDK format (with the `private:` prefix): `?privkey=private:aabbcc...`

Both forms are accepted.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                        |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gateway_id | Yes      | Your 8-character Gateway ID starting with `*`, e.g. `*MYGWYID`. Aliases: `?from=` or `?gwid=`.                                                                     |
| secret     | Yes      | The API secret shown on your Gateway ID overview page. Alias: `?secret=`.                                                                                          |
| target     | No       | Who to notify: a Threema ID (8 chars), phone number, or e-mail address. No limit on the number of targets. Alias: `?to=`. E2E mode accepts Threema IDs only.       |
| mode       | No       | Set to `e2e` to enable end-to-end encrypted messaging (requires PyNaCl and an E2E Gateway ID). Defaults to `basic`.                                                |
| privkey    | No       | Your Curve25519 private key as a 64-character hex string. Required when `mode=e2e`. Accepts raw hex (`aabbcc...`) or the Threema SDK format (`private:aabbcc...`). |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Basic notification to a recipient by their Threema ID:

```bash
# Assume:
#  - your {gateway_id} is *MYGWYID
#  - your {secret} is abc123-2345
#  - the recipient {toThreemaID} is FRIENDID
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   threema://*MYGWYID@abc123-2345/FRIENDID
```

Send a Basic notification by phone number:

```bash
# Assume:
#  - your {gateway_id} is *MYGWYID
#  - your {secret} is abc123-2345
#  - the recipient phone number is +1 613 555 1234
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   threema://*MYGWYID@abc123-2345/16135551234
```

Send an end-to-end encrypted notification (E2E mode):

```bash
# Assume:
#  - your {gateway_id} is *MYGWYID  (must be an E2E Gateway ID)
#  - your {secret} is abc123-2345
#  - your private key (from the Threema Gateway portal) is:
#      private:aabbccddeeff001122...  (64 hex chars after "private:")
#  - the recipient {toThreemaID} is FRIENDID
#
# Option 1: paste the key exactly as shown in the Threema portal
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "threema://*MYGWYID@abc123-2345/FRIENDID?mode=e2e&privkey=private:aabbccddeeff001122334455667788990011223344556677889900112233445566"

# Option 2: paste just the 64-character hex part (without "private:")
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "threema://*MYGWYID@abc123-2345/FRIENDID?mode=e2e&privkey=aabbccddeeff001122334455667788990011223344556677889900112233445566"
```
