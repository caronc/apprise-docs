---
title: "Notifications Microsoft Windows"
description: "Envoyer des notifications Microsoft Windows."
sidebar:
  label: "Microsoft Windows Notifications"

group: desktop

schemas:
  - windows: insecure

has_image: true

sample_urls:
  - windows://

limits:
  max_chars: 250
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Affichez des notifications directement dans votre application Windows. Cela ne fonctionne que si vous envoyez la notification au même système Windows auquel vous accédez actuellement. Cette notification ne peut donc pas être envoyée d'un PC à un autre.

Vous devrez peut-être installer une dépendance sur votre système Windows pour que cela fonctionne. Exécutez simplement :

```bash
# windows:// minimum requirements
pip install pywin32
```

## Syntaxe

Il n'existe actuellement aucune option à spécifier pour ce type de notification, ce qui le rend très simple à référencer.

La syntaxe valide est la suivante :

- `windows://`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                       |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| duration | Non    | Définit facultativement la durée du message contextuel en secondes. Par défaut, cette valeur est définie sur `12` |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

En supposant que nous sommes sur un ordinateur Windows, nous pouvons nous envoyer une notification Windows :

```bash
# Send ourselves a windows notification
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   "windows://"
```

Voici un exemple où nous réduisons la durée d'affichage de la fenêtre contextuelle :

```bash
# Send ourselves a windows notification
apprise -vv -b "A 5 second popup" "windows://?duration=5"
```
