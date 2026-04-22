---
title: "Notifications Gnome Desktop"
description: "Envoyer des notifications Gnome Desktop."
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

Affichez des notifications directement sur votre bureau Gnome. Cela ne fonctionne que si vous envoyez la notification vers le systeme que vous utilisez actuellement. Cette notification ne peut donc pas etre envoyee d'un PC a un autre.

## Syntaxe

Il n'existe actuellement aucune option a preciser pour ce type de notification ; sa reference est donc tres simple.

La syntaxe valide est la suivante :

- `gnome://`

## Détail des Paramètres

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Si nous sommes sur un systeme capable d'heberger le bureau Gnome, nous pouvons nous envoyer une notification ainsi :

```bash
# Nous envoyer une notification de bureau Gnome
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   gnome://
```
