---
title: "Notifications Gnome Desktop"
description: "Envoyer Gnome Desktop notifications."
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

<!-- SERVICE:DETAILS -->

## Configuration du compte

Display notifications right on your Gnome desktop. This only works if you're sending the notification to the same system you're currently accessing. Hence this notification can not be sent from one PC to another.

## Syntaxe

There are currently no options you can specify for this kind of notification, so it's really easy to reference.

La syntaxe valide est la suivante :

- `gnome://`

## Detail des parametres

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Assuming we're on an OS that allows us to host the Gnome Desktop, we can send a notification to ourselves like so:

```bash
# Send ourselves a Gnome desktop notification
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   gnome://
```
