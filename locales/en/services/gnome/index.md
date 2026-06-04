---
title: "Gnome Desktop Notifications"
description: "Send Gnome Desktop notifications."
sidebar:
  label: "Gnome Desktop Notifications"

group: desktop

schemas:
  - gnome: insecure

has_image: true

sample_urls:
  - gnome://

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Display notifications right on your Gnome desktop. This only works if you're sending the notification to the same system you're currently accessing. Hence this notification can not be sent from one PC to another.

## Syntax

There are currently no options you can specify for this kind of notification, so it's really easy to reference.

Valid syntax is as follows:

- `gnome://`

## Parameter Breakdown

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Assuming we're on an OS that allows us to host the Gnome Desktop, we can send a notification to ourselves like so:

```bash
# Send ourselves a Gnome desktop notification
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   gnome://
```
