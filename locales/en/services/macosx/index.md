---
title: "MacOS X Desktop Notifications"
description: "Send MacOS X Desktop notifications."

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

Display notifications right on your Mac OS X desktop provided you're running version 10.8 or higher and have installed [terminal-notifier](https://github.com/julienXX/terminal-notifier). This only works if you're sending the notification to the same system you're currently accessing. Hence this notification can not be sent from one PC to another.

```bash
# Make sure terminal-notifier is installed into your system
brew install terminal-notifier
```

## Syntax

Valid syntax is as follows:

- `macosx://`
- `macosx://{sender}`

You can also choose to set a sound to play (such as `default`):

- `macosx://_/?sound=default`

The `sound` can be set any of the sound names listed in _Sound Preferences_ of your Mac OS.

Notifications identify themselves to `terminal-notifier` as a `sender`, which is needed for them to show up on some systems. Apprise picks a sensible default on its own, but you can set your own directly in the URL:

- `macosx://myapp/`

`terminal-notifier` comes in two flavours, `2` and `3`. Apprise defaults to `2` unless it detects you're running macOS 26 (Tahoe) or higher, in which case it defaults to `3` instead. You can force a specific version yourself:

- `macosx://_/?version=3`

The `sender` and `image` options are only supported by `terminal-notifier` version `2`; they're silently ignored when `version=3` is in effect.

## Parameter Breakdown

| Variable | Required | Description                                                                                                                                                                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sound    | No       | The `sound` can be set any of the sound names listed in _Sound Preferences_ of your Mac OS.                                                                                                                                                       |
| image    | No       | Associate an image with the message. By default this is enabled. Only applies to `terminal-notifier` `version=2`.                                                                                                                                 |
| sender   | No       | Identifies your script to `terminal-notifier`. Can be set directly in the URL (`macosx://myapp/`) or with `?sender=`. Defaults to your Apprise `app_id` (`Apprise`, unless you've set your own). Only applies to `terminal-notifier` `version=2`. |
| version  | No       | The `terminal-notifier` version you have installed: `2` or `3`. Defaults to `2`, or `3` if Apprise detects you're on macOS 26 (Tahoe) or higher.                                                                                                  |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

We can send a notification to ourselves like so:

```bash
# Send ourselves a MacOS desktop notification
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://"

# Send ourselves a MacOS desktop notification with the default sound
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://_/?sound=default"

# Send ourselves a notification, identifying ourselves as "myapp"
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://myapp/"

# Send ourselves a notification, forcing terminal-notifier version 3
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   "macosx://_/?version=3"

```
