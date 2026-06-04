---
title: "Notifications DBus Desktop"
description: "Envoyer des notifications de bureau DBus."

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

## Configuration du compte

Affichez des notifications directement sur votre bureau Gnome ou KDE. Cela ne fonctionne que si vous envoyez la notification vers le systeme que vous utilisez actuellement. Cette notification ne peut donc pas etre envoyee d'un PC a un autre.

Ce plugin repose sur des appels de bas niveau similaires au fonctionnement de l'outil _notify-send_, fourni avec certaines distributions Linux. Il s'appuie sur le _Desktop Bus_, DBus, et ecrit directement le message pour les notifications de bureau QT et GLib.

## Syntaxe

Il n'existe actuellement aucune option a preciser pour ce type de notification ; sa reference est donc tres simple.

La syntaxe valide est la suivante :

- `dbus://`
  - Il s'agit probablement du meilleur mode d'utilisation de ce plugin, car il tentera d'abord de se connecter a un DBus QT, generalement base sur KDE, puis, si cela echoue, il essaiera un DBus GLib, generalement base sur Gnome ou Unity.
- `qt://`
  - Cette variante tente explicitement d'acceder uniquement au DBus QT, meme si un DBus GLib est egalement present.
- `kde://`
  - Il s'agit simplement d'un alias de `qt://` pour plus de simplicite. Comme `qt://`, il tente uniquement d'acceder au DBus QT, meme si un DBus GLib est present.
- `glib://`
  - Cette variante tente explicitement d'acceder uniquement au DBus GLib, meme si un DBus QT est present. Aucun alias `gnome://` n'a ete cree, car la prise en charge de Gnome existe deja via une approche plus recente et plus mature definie dans [[here|Notify_gnome]].

## Détail des Paramètres

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Si nous sommes sur un systeme capable d'heberger le bureau Gnome, nous pouvons nous envoyer une notification ainsi :

```bash
# Nous envoyer une notification de bureau via DBus
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   dbus://
```
