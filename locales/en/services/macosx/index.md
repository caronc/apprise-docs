---
title: "macOS Desktop Notifications"
description: "Send macOS desktop notifications."

group: desktop
schemas:
  - macosx: insecure

has_local: true
has_image: true

sample_urls:
  - macosx://

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Display local notifications with [terminal-notifier](https://github.com/julienXX/terminal-notifier). Version `3` requires macOS 10.14 or later, while version `2` requires macOS 10.10. OS X 10.8 and 10.9 need an older compatible release. Notifications cannot be sent to another computer.

```bash
# Make sure terminal-notifier is installed into your system
brew install terminal-notifier
```

## Syntax

Valid syntax is as follows:

- `macosx://`

You can also choose to set a sound to play (such as `default`):

- `macosx://_/?sound=default`

Set `sound` to any name listed in your Mac's _Sound Preferences_.

`terminal-notifier` versions `2` and `3` use slightly different options. Apprise detects the installed version automatically. You can override it if needed:

- `macosx://_/?version=3`

Version `2` uses a `sender` value to identify notifications. Apprise uses its `app_id` by default, but you can set your own:

- `macosx://_/?sender=myapp`

Version `3` does not support `sender`, so it ignores this option.

## Troubleshooting

With version `3`, run this command if notifications are not authorized or nothing appears:

```bash
terminal-notifier -diagnose
```

It checks permissions, Focus modes, Scheduled Summary, and other common problems. Version `2` does not provide this command.

:::note
macOS asks for notification permission once, but an OS upgrade can reset it. The permission belongs to `terminal-notifier`, not Apprise.
:::

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                     |
| -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sound    | No       | A sound name listed in your Mac's _Sound Preferences_.                                                                                                          |
| image    | No       | Associate an image with the message. By default this is enabled. Version `2` uses it as the notification icon; version `3` attaches it inside the notification. |
| click    | No       | A URL to open when the notification is clicked.                                                                                                                 |
| sender   | No       | Identifies your script to `terminal-notifier`. Defaults to your Apprise `app_id` (`Apprise`, unless you've set your own). Only applies to `version=2`.          |
| version  | No       | The `terminal-notifier` version you have installed: `2` or `3`. Detected from the program itself when you don't set it.                                         |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

We can send a notification to ourselves like so:

```bash
# Send ourselves a macOS desktop notification
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://"

# Send ourselves a macOS desktop notification with the default sound
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://_/?sound=default"

# Send ourselves a notification, identifying ourselves as "myapp"
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://_/?sender=myapp"

# Send ourselves a notification, forcing terminal-notifier version 3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://_/?version=3"

```
