---
title: "DBus Desktop Notifications"
description: "Send DBus desktop notifications."

group: desktop

schemas:
  - dbus: insecure
  - kde: insecure
  - qt: insecure
  - glib: insecure

has_image: true

sample_urls:
  - dbus://
  - kde://
  - qt://
  - glib://

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Account Setup

Display notifications right on your Gnome or KDE desktop. This only works if you're sending the notification to the same system you're currently accessing. Hence this notification can not be sent from one PC to another.

This plugin was based on lower level calls similar to how the _notify-send_ tool works that ships with some Linux distributions. It taps into the _Desktop Bus_ (DBus) and directly writes the message for QT and GLib Desktop notifications.

## Syntax

There are currently no options you can specify for this kind of notification, so it's really easy to reference.

Valid syntax is as follows:

- `dbus://`
  - This is the probably best use of this plugin as it will attempt to connect to a QT DBus (usually KDE based) if it can, otherwise it will secondly try to connect to a glib DBus (usually Gnome/Unity based).
- `qt://`
  - This will explicitly only attempt to access the QT DBus (even if the GLib one is present).
- `kde://`
  - This is just an alias to qt:// for simplicity purposes. Like qt://, this explicitly only attempt to access the QT DBus (even if the GLib one is present).
- `glib://`
  - This will explicitly only attempt to access the GLib DBus (even if the QT one is present). A gnome:// alias was not created as Gnome support is already handled using a more mature/newer approach defined [[here|Notify_gnome]].

## Parameter Breakdown

<!-- TEMPLATE:SERVICE-PARAMS -->

## Examples

Assuming we're on an OS that allows us to host the Gnome Desktop, we can send a notification to ourselves like so:

```bash
# Send ourselves a DBus related desktop notification
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   dbus://
```
