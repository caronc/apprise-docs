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

There are currently no options you can specify for this kind of notification, so it's really easy to reference.

Valid syntax is as follows:

- `macosx://`

You can also choose to set a sound to play (such as `default`):

- `macosx://_/?sound=default`

The `sound` can be set any of the sound names listed in _Sound Preferences_ of your Mac OS.

## Parameter Breakdown

| Variable | Required | Description                                                                                 |
| -------- | -------- | ------------------------------------------------------------------------------------------- |
| sound    | No       | The `sound` can be set any of the sound names listed in _Sound Preferences_ of your Mac OS. |
| image    | No       | Associate an image with the message. By default this is enabled.                            |

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

```
