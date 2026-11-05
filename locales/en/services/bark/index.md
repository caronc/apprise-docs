---
title: "Bark Notifications"
description: "Send Bark notifications."
sidebar:
  label: "Bark"

source: https://github.com/Finb/Bark

schemas:
  - bark: insecure
  - barks

sample_urls:
  - barks://{host}/{device_key}
  - barks://{host}:{port}/{device_key}

has_selfhosted: true
has_image: true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Bark is an iOS App which allows you to push custom notifications to your iPhone. Download the server for a self-hosted solution.

## Syntax

Valid syntax is as follows:

- `bark://{host}/{device_key}`
- `bark://{host}:{port}/{device_key}`

The secure versions:

- `barks://{host}/{device_key}`
- `barks://{host}:{port}/{device_key}`

You can also notify more than one device at a time:

- `bark://{host}:{port}/{device_key1}/{device_key2}/{device_keyN}/`

## Message Format Support

Bark supports receiving content as either plain text or Markdown.

Apprise will automatically send one of the following payload fields,
depending on the message format in use:

- **Plain text** (default): content is sent using the `body` field.
- **Markdown**: content is sent using the `markdown` field.

To explicitly control this behaviour, set the Apprise message format.
For example:

- `?format=text` forces plain text handling.
- `?format=markdown` enables Markdown handling.

Note that the `format` handling is done by Apprise and affects how the
notification is assembled and delivered to Bark.

## Encryption

Bark can end-to-end encrypt your notifications with AES-GCM so that
neither the Bark server nor Apple's push service ever sees the
plaintext title or body.

1. Open the Bark app on your iPhone.
2. Find **Encrypted Push** on the home screen and tap into its settings.
3. Choose the **AES-GCM** algorithm and enter a key that is exactly
   16, 24, or 32 characters long (these map to AES-128, AES-192, and
   AES-256).
4. Add that same key to your Apprise URL with `?key=`.

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?key=1234567890123456"
```

Every notification is encrypted with a fresh, randomly generated IV,
so sending the same message twice never produces the same ciphertext.

:::note
Encryption requires the `cryptography` Python package:

```bash
pip install cryptography
```

Unlike the plain-text side of this plugin, encryption is not optional
once a `key` is set. If `cryptography` is not installed, or the key is
not exactly 16, 24, or 32 characters, Apprise refuses to load the URL
rather than silently falling back to sending your message unencrypted.
:::

:::caution
Anyone with your encryption key can read your notifications. Keep it
as private as your device key or an API token, and use the same key
you configured in the Bark app's Encrypted Push settings.
:::

See Bark's own [encryption documentation](https://github.com/Finb/Bark/blob/master/docs/encryption.md)
for more background on how encrypted push works.

## Replacing and Deleting Notifications

Give a notification an `id` and you can update or remove it later. This suits status messages, such as a build that fails and later passes.

1. Send a notification with `?id=build-42`.
2. Send another one with the same `id` to replace it. The new notification takes the place of the old one instead of adding a second one.
3. Send one with `?id=build-42&delete=yes` to remove it from Notification Center and from the Bark app's history.

This requires Bark v1.5.2 and bark-server v2.2.5 or newer.

:::note
Bark delivers a delete as a silent push. Turn on **Settings > General > Background App Refresh** for Bark, or the delete is ignored. Apprise still needs a message body to send it, but the body is never shown.
:::

When `key=` is set, the `id` and the delete flag are sent unencrypted next to the encrypted message, because the Bark server needs them to find the notification on your device. Avoid putting anything private in the `id`.

## Parameter Breakdown

| Variable   | Required | Description                                                                                                                                                                                                                                                |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device_key | Yes      | The device key you wish to notify                                                                                                                                                                                                                          |
| sound      | No       | Optionally set a sound file to be played with notification sent. Supported sounds are identified [here](https://github.com/Finb/Bark/tree/master/Sounds)                                                                                                   |
| click      | No       | Provide a hyperlink that should be associated with the notification                                                                                                                                                                                        |
| level      | No       | Specify the message level. Can be either **active**, **timeSensitive**, or **passive**.                                                                                                                                                                    |
| volume     | No       | Specify a volume between 0 and 10 (inclusive).                                                                                                                                                                                                             |
| badge      | No       | Provide a numerical value of 0 (zero) or greater to associate a badge with the bark icon on the iOS device.                                                                                                                                                |
| category   | No       | Associate a category with your notification                                                                                                                                                                                                                |
| group      | No       | Associate a group with your notification                                                                                                                                                                                                                   |
| icon       | No       | Set a custom icon URL for the notification. If not specified, Apprise may use its default notify image (unless disabled).                                                                                                                                  |
| image      | No       | Set to `no` if you do not want the Apprise alert level being placed as the icon associated with the message.                                                                                                                                               |
| call       | No       | Boolean-like input. Accepts `yes/no`, `true/false`, `1/0`, `+/-`. When enabled, payload includes `1`.                                                                                                                                                      |
| subtitle   | No       | A line of text shown between the title and the body.                                                                                                                                                                                                       |
| copy       | No       | The text copied when you copy the notification on your device, instead of the body. Handy for one-time codes.                                                                                                                                              |
| action     | No       | What happens when you tap the notification. `alert` opens the app with a popup to copy or share the message. `none` only opens the app. A `click` URL takes priority over this.                                                                            |
| archive    | No       | Set to `yes` to save the notification in the Bark app's history, or `no` to skip it. If not set, the app's own setting decides (it saves by default).                                                                                                      |
| ttl        | No       | How many seconds a saved notification is kept. Once it expires, Bark removes it from the app's history and from Notification Center. Only applies to notifications saved in the history.                                                                   |
| id         | No       | A unique ID for the notification. Sending another notification with the same `id` replaces the earlier one. Requires Bark v1.5.2 and bark-server v2.2.5 or newer. See [Replacing and Deleting Notifications](#replacing-and-deleting-notifications) above. |
| delete     | No       | Set to `yes` to delete the notification matching `id` instead of showing a new one. Requires `id`. The default is `no`.                                                                                                                                    |
| key        | No       | A 16-, 24-, or 32-character AES-GCM encryption key matching the one configured in the Bark app's Encrypted Push settings. Requires the `cryptography` Python package. See [Encryption](#encryption) above.                                                 |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Send a Bark notification to all devices associated with a project:

```bash
# Assume:
#  - our {hostname} is localhost
#  - our {port} is 8080
#  - our {device_key} is j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P
```

Send a Markdown formatted Bark notification:

```bash
# Markdown content is sent using Bark's `markdown` field
apprise -vv -t "Build Status" -b "# Success\n\nDeployment completed." \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=markdown
```

Force plain text behaviour (even if your Apprise configuration defaults
to another format):

```bash
apprise -vv -t "Plain Text" -b "**This will not be bold**" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=text
```

Send an end-to-end encrypted Bark notification (see
[Encryption](#encryption) above):

```bash
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?key=1234567890123456"
```

Send a notification with a subtitle, and copy only the code when you copy it on your device:

```bash
apprise -vv -t "Sign In" -b "Your login code is 123456" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?subtitle=MyApp&copy=123456"
```

Save a notification in the app's history and have Bark remove it after an hour:

```bash
apprise -vv -t "Reminder" -b "The door is still open" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?archive=yes&ttl=3600"
```

Show a build status, replace it when the build finishes, then remove it (see [Replacing and Deleting Notifications](#replacing-and-deleting-notifications) above):

```bash
# Show the status
apprise -vv -t "Build" -b "Running" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?id=build-42"

# Replace it
apprise -vv -t "Build" -b "Passed" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?id=build-42"

# Remove it
apprise -vv -b "delete" \
   "bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?id=build-42&delete=yes"
```
