---
title: "Notifications de bureau macOS"
description: "Envoyer des notifications sur le bureau macOS."

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

## Configuration du compte

Affichez des notifications locales avec [terminal-notifier](https://github.com/julienXX/terminal-notifier). La version `3` nécessite macOS 10.14 ou une version ultérieure, tandis que la version `2` nécessite macOS 10.10. OS X 10.8 et 10.9 exigent une version antérieure compatible. Les notifications ne peuvent pas être envoyées vers un autre ordinateur.

```bash
# Assurez-vous que terminal-notifier est installé sur votre système
brew install terminal-notifier
```

## Syntaxe

La syntaxe valide est la suivante :

- `macosx://`

Vous pouvez aussi définir un son à jouer, par exemple `default` :

- `macosx://_/?sound=default`

Définissez `sound` sur un nom proposé dans les _Préférences Son_ de votre Mac.

Les versions `2` et `3` de `terminal-notifier` utilisent des options légèrement différentes. Apprise détecte automatiquement la version installée. Vous pouvez la remplacer si nécessaire :

- `macosx://_/?version=3`

La version `2` utilise une valeur `sender` pour identifier les notifications. Apprise utilise son `app_id` par défaut, mais vous pouvez définir le vôtre :

- `macosx://_/?sender=myapp`

La version `3` ne prend pas en charge `sender` et ignore donc cette option.

## Dépannage

Avec la version `3`, lancez cette commande si les notifications ne sont pas autorisées ou si rien ne s'affiche :

```bash
terminal-notifier -diagnose
```

Elle vérifie les autorisations, les modes de concentration, le résumé programmé et d'autres problèmes courants. La version `2` ne propose pas cette commande.

:::note
macOS ne demande l'autorisation de notification qu'une seule fois, mais une mise à niveau du système peut la réinitialiser. Cette autorisation appartient à `terminal-notifier`, et non à Apprise.
:::

## Détail des paramètres

| Variable | Obligatoire | Description                                                                                                                                                                       |
| -------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sound    | Non         | Un nom proposé dans les _Préférences Son_ de votre Mac.                                                                                                                           |
| image    | Non         | Associe une image au message. Cette option est activée par défaut. La version `2` l'utilise comme icône de notification ; la version `3` la joint au message.                     |
| click    | Non         | Une URL à ouvrir lorsque vous cliquez sur la notification.                                                                                                                        |
| sender   | Non         | Identifie votre script auprès de `terminal-notifier`. Utilise votre `app_id` Apprise par défaut (`Apprise`, sauf si vous l'avez modifié). S'applique uniquement à la version `2`. |
| version  | Non         | La version de `terminal-notifier` installée : `2` ou `3`. Apprise la détecte automatiquement si vous ne la définissez pas.                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Nous pouvons nous envoyer une notification de la façon suivante :

```bash
# Nous envoyer une notification de bureau macOS
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "macosx://"

# Nous envoyer une notification de bureau macOS avec le son par défaut
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "macosx://_/?sound=default"

# Nous envoyer une notification en nous identifiant comme "myapp"
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "macosx://_/?sender=myapp"

# Nous envoyer une notification en forçant la version 3 de terminal-notifier
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "macosx://_/?version=3"

```
