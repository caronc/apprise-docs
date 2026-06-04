---
title: "Notifications Bark"
description: "Envoyer des notifications Bark."
sidebar:
  label: "Bark"

source: https://github.com/Finb/Bark

schemas:
  - bark: insecure
  - barks

sample_urls:
  - barks://{host}/{device_key}
  - barks://{host}:{port}/{device_key}

has_selfhosted: true
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Bark est une application iOS qui vous permet d'envoyer des notifications personnalisées sur votre iPhone. Téléchargez également le serveur si vous souhaitez une solution auto-hébergée.

## Syntaxe

La syntaxe valide est la suivante :

- `bark://{host}/{device_key}`
- `bark://{host}:{port}/{device_key}`

Les versions sécurisées :

- `barks://{host}/{device_key}`
- `barks://{host}:{port}/{device_key}`

Vous pouvez également notifier plusieurs appareils à la fois :

- `bark://{host}:{port}/{device_key1}/{device_key2}/{device_keyN}/`

## Prise en Charge du Format des Messages

Bark prend en charge la réception de contenu en texte brut ou en Markdown.

Apprise enverra automatiquement l'un des champs de charge utile suivants, selon le format de message utilisé :

- **Texte brut** (par défaut) : le contenu est envoyé via le champ `body`.
- **Markdown** : le contenu est envoyé via le champ `markdown`.

Pour contrôler explicitement ce comportement, définissez le format de message Apprise. Par exemple :

- `?format=text` force le traitement en texte brut.
- `?format=markdown` active le traitement Markdown.

Notez que la gestion de `format` est effectuée par Apprise et influe sur la manière dont la notification est assemblée puis remise à Bark.

## Détail des Paramètres

| Variable   | Requis | Description                                                                                                                                                                            |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| device_key | Oui    | La clé de l'appareil que vous souhaitez notifier.                                                                                                                                      |
| sound      | Non    | Permet facultativement de définir un fichier son à jouer avec la notification envoyée. Les sons pris en charge sont identifiés [ici](https://github.com/Finb/Bark/tree/master/Sounds). |
| click      | Non    | Fournit un lien hypertexte à associer à la notification.                                                                                                                               |
| level      | Non    | Précise le niveau du message. Peut être **active**, **timeSensitive** ou **passive**.                                                                                                  |
| volume     | Non    | Précise un volume entre 0 et 10, inclus.                                                                                                                                               |
| badge      | Non    | Fournit une valeur numérique égale ou supérieure à 0 pour associer un badge à l'icône Bark sur l'appareil iOS.                                                                         |
| category   | Non    | Associe une catégorie à votre notification.                                                                                                                                            |
| group      | Non    | Associe un groupe à votre notification.                                                                                                                                                |
| icon       | Non    | Définit une URL d'icône personnalisée pour la notification. Si elle n'est pas précisée, Apprise peut utiliser son image de notification par défaut, sauf si elle est désactivée.       |
| image      | Non    | Définissez cette valeur sur `no` si vous ne souhaitez pas que le niveau d'alerte Apprise soit utilisé comme icône associée au message.                                                 |
| call       | Non    | Entrée de type booléen. Accepte `yes/no`, `true/false`, `1/0`, `+/-`. Lorsqu'elle est activée, la charge utile inclut `1`.                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Bark à tous les appareils associés à un projet :

```bash
# Supposons :
#  - que notre {hostname} soit localhost
#  - que notre {port} soit 8080
#  - que notre {device_key} soit j300012fl9y0b5AW9g9Nsejb8P
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P
```

Envoyer une notification Bark au format Markdown :

```bash
# Le contenu Markdown est envoyé via le champ `markdown` de Bark
apprise -vv -t "Build Statut" -b "# Success\n\nDeployment completed." \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=markdown
```

Forcer le comportement en texte brut, même si votre configuration Apprise par défaut utilise un autre format :

```bash
apprise -vv -t "Plain Text" -b "**This will not be bold**" \
   bark://localhost:8080/j300012fl9y0b5AW9g9Nsejb8P?format=text
```
