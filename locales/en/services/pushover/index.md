---
title: "Pushover Notifications"
description: "Send Pushover notifications."
sidebar:
  label: "Pushover"

source: https://pushover.net/

schemas:
  - pover

has_attachments: true

sample_urls:
  - pover://{user_key}@{token}
  - pover://{user_key}@{token}/{device_id}
  - pover://{user_key}@{token}/{device_id1}/{device_id2}/{device_idN}
  - pover://{user_key}@{token}/#{group_key}
  - pover://{user_key}@{token}/{device_id}/#{group_key}

limits:
  max_chars: 512
---

<!-- SERVICE:DETAILS -->

## Account Setup

There isn't too much configuration for Pushover notifications. The message is basically just passed to your online Pushover account and then gets relayed to your device(s) you've setup from there.

### Getting Your User Key

Once you log into [the website](https://pushover.net/), your dashboard will present your **{user_key}** in front of you.

### Getting Your API Token

On the dashboard after logging in, if you scroll down you'll have the ability to generate an application. Upon doing so, you will be provided an API Token to associate with this application you generated. This will become your **{token}**.

## Syntax

Valid syntax is as follows:

- `pover://{user_key}@{token}`
- `pover://{user_key}@{token}/{device_id}`
- `pover://{user_key}@{token}/{device_id1}/{device_id2}/{device_idN}`
- `pover://{user_key}@{token}/#{group_key}`
- `pover://{user_key}@{token}/{device_id}/#{group_key}`
- `pover://{user_key}@{token}?priority={priority}`
- `pover://{user_key}@{token}?priority=emergency&expire={expire}&interval={interval}`
- `pover://{user_key}@{token}?key={encryption_key}`
- `pover://{user_key}@{token}?key={encryption_key}&e2ee=no`

## Parameter Breakdown

| Variable  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| user_key  | Yes      | The user key identifier associated with your Pushover account. This is NOT your email address. The key can be acquired from your Pushover dashboard.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| token     | Yes      | The token associated with your Pushover account.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| device_id | No       | The device identifier to send your notification to. By default if one isn't specified then all of devices associated with your account are notified.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| group_key | No       | A Pushover [delivery group](https://pushover.net/api/groups) key, prefixed with `#`. Group keys look identical to user keys and allow broadcasting a message to all members of a group with a single key. Multiple groups may be specified. Groups and devices can be mixed in the same URL.                                                                                                                                                                                                                                                                             |
| priority  | No       | Can be **low**, **moderate**, **normal**, **high**, or **emergency**; the default is **normal** if a priority isn't specified. <br/>To send an emergency-priority notification, the `interval` and `expire` parameters _should_ be supplied. You may also set the priorities as documented on the [Pushover API](https://pushover.net/api#priority) where `-2` is **low**, `-1` is **moderate**, `0` is **normal**, `1` is **high** and `2` is **emergency**                                                                                                             |
| expire    | No       | The expire parameter specifies how many seconds your notification will continue to be retried for (every `interval` seconds). If the notification has not been acknowledged in `expire` seconds, it will be marked as expired and will stop being sent to the user. Note that the notification is still shown to the user after it is expired, but it will not prompt the user for acknowledgement. This parameter has a maximum value of at most 10800 seconds (3 hours). The default is 3600 seconds (1 hr) if nothing is otherwise specified.                         |
| interval  | No       | Specifies how often (in seconds) the Pushover servers will resend the same emergency notification to the user. In a situation where your user might be in a noisy environment or sleeping, retrying the notification (with sound and vibration) will help get his or her attention. This parameter must have a value of at least 30 seconds between retries. The default is 900 seconds (15 minutes) if nothing is otherwise specified. Note: this is distinct from Apprise's own `retry` mechanism which controls how many times Apprise re-attempts a failed delivery. |
| sound     | No       | Can optionally identify one of the optional sound effects identified [here](https://pushover.net/api#sounds). The default sound is **pushover**.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| url       | No       | Can optionally provide a Supplementary URL to go with your message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| url_title | No       | Can optionally provide a Supplementary URL Title to go with your message                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| key       | No       | A 64-character hexadecimal string representing a 256-bit AES key used for [end-to-end encryption](https://pushover.net/api#e2ee). When set, the `message`, `title`, `url`, and `url_title` fields are each encrypted client-side before being transmitted. Requires the `cryptography` Python package (`pip install cryptography`). If the package is absent, Apprise falls back to sending the message unencrypted with a warning.                                                                                                                                      |
| e2ee      | No       | Controls whether end-to-end encryption is applied when a `key` is configured. Defaults to **yes**. Set to **no** to temporarily send plaintext even when a key is present.                                                                                                                                                                                                                                                                                                                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## End-to-End Encryption (E2EE)

Pushover supports [client-side end-to-end encryption](https://pushover.net/api#e2ee). When enabled, the `message`, `title`, `url`, and `url_title` fields are encrypted on the Apprise side using **AES-256-CBC** before being sent to the Pushover API. Pushover servers never see the plaintext content.

### Generating an Encryption Key

The key is a 256-bit value you create yourself, represented as a **64 hexadecimal character string**. You must also configure the same key in the Pushover app on every device that should be able to read the notifications. Refer to [Pushover's documentation](https://pushover.net/api#e2ee) for the app-side setup.

A quick way to generate a key on Linux/macOS:

```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Requirements

E2EE requires the `cryptography` Python package. Install it with:

```bash
pip install cryptography
```

If the package is not installed and a `key` is configured, Apprise logs a warning and sends the message **unencrypted** as a graceful fallback. Set `e2ee=no` to intentionally send plaintext while keeping the key stored in the URL for future use.

:::caution
Store your encryption key securely. Anyone with the key can decrypt the notifications. Treat it with the same care as your API token.
:::

## Custom Sounds

Pushover integration constrains notification sounds to a predefined list. This change adds support for custom sound in notifications, which must be uploaded and given a name. This change updates the pushover integration to allow for that name to be specified instead of throwing an error.

1. Go to Settings -> Alert Settings -> Manage custom sounds -> Upload a sound
1. Upload a sound and specify a name (e.g. "mysound").
1. Validate the sound is accessible and present in the sounds list for your app via <https://api.pushover.net/1/sounds.json?token={app-token}>
1. Specify a sound in your pover call, i.e. apprise -vv -t "title" -b "test message" pover://user@app?sound=mysound

You should hear your custom sound on the notification. In cases where the custom sound name is not found, the default pushover notification sound will play.

## Examples

Send a Pushover notification to all of our configured devices:

```bash
# Assuming our {user_key} is 435jdj3k78435jdj3k78435jdj3k78
# Assuming our {token} is abcdefghijklmnop-abcdefg
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg
```

Send a Pushover notification to a delivery group:

```bash
# Assuming our {user_key} is 435jdj3k78435jdj3k78435jdj3k78
# Assuming our {token} is abcdefghijklmnop-abcdefg
# Assuming our {group_key} is gznej3rKEVAvPUxu9vvNnqpmZpokzF
# The # prefix identifies it as a group key
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg/#gznej3rKEVAvPUxu9vvNnqpmZpokzF"
```

Send a Pushover notification with the Emergency Priority:

```bash
# Emergency priority advises you to also specify the expire and
# interval values.
# Assuming our {user_key} is 435jdj3k78435jdj3k78435jdj3k78
# Assuming our {token} is abcdefghijklmnop-abcdefg
# The following will set a 1hr expiry and attempt to resend
# the message every 10 minutes:
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg?priority=emergency&interval=600&expire=3600
```

Send an end-to-end encrypted Pushover notification:

```bash
# Assuming our {user_key} is 435jdj3k78435jdj3k78435jdj3k78
# Assuming our {token} is abcdefghijklmnop-abcdefg
# Assuming our 64-char hex encryption key is aabbcc...
# (generate one with: python3 -c "import secrets; print(secrets.token_hex(32))")
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "pover://435jdj3k78435jdj3k78435jdj3k78@abcdefghijklmnop-abcdefg?key=aabbccdd11223344aabbccdd11223344aabbccdd11223344aabbccdd11223344"
```
