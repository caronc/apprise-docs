---
title: "Notifications MacOS X Desktop"
description: "Envoyer des notifications MacOS X Desktop."

group: desktop
schemas:
  - macosx: insecure

sample_urls:
  - macosx://

limits:
  max_chars: 250
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Affichez des notifications directement sur votre bureau Mac OS X a condition d'utiliser la version 10.8 ou superieure et d'avoir installe [terminal-notifier](https://github.com/julienXX/terminal-notifier). Cela ne fonctionne que si vous envoyez la notification vers le systeme que vous utilisez actuellement. Cette notification ne peut donc pas etre envoyee d'un PC a un autre.

```bash
# Assurez-vous que terminal-notifier est installe sur votre systeme
brew install terminal-notifier
```

## Syntaxe

Il n'existe actuellement aucune option obligatoire pour ce type de notification ; sa reference est donc tres simple.

La syntaxe valide est la suivante :

- `macosx://`

Vous pouvez aussi definir un son a jouer, par exemple `default` :

- `macosx://_/?sound=default`

La valeur `sound` peut correspondre a n'importe quel nom de son liste dans les _Preferences Son_ de votre Mac OS.

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                       |
| -------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| sound    | Non         | La valeur `sound` peut correspondre a n'importe quel nom de son liste dans les _Preferences Son_ de votre Mac OS. |
| image    | Non         | Associe une image au message. Cette option est activee par defaut.                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Nous pouvons nous envoyer une notification de la facon suivante :

```bash
# Nous envoyer une notification de bureau MacOS
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "macosx://"

# Nous envoyer une notification de bureau MacOS avec le son par defaut
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "macosx://_/?sound=default"

```
