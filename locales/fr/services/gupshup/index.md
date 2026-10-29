---
title: "Notifications Gupshup"
description: "Envoyer des notifications WhatsApp avec Gupshup."
sidebar:
  label: "Gupshup"

source: https://www.gupshup.io

schemas:
  - gupshup

has_chat: true

body_formats:
  - text

sample_urls:
  - gupshup://{app}:{apikey}@{source}/{phone_no}
  - gupshup://{app}:{apikey}@{source}/{phone_no1}/{phone_no2}/{phone_noN}
  - gupshup://{app}:{apikey}@{source}/{phone_no}?template={template_id}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Créez un [compte Gupshup](https://www.gupshup.io/) et connectez-vous à la console.
2. Créez une application WhatsApp. Le nom que vous lui donnez (par exemple `DemoAPI`) est votre `{app}`.
3. Copiez la **clé API** affichée en haut à droite de la console. C'est votre `{apikey}`.
4. Notez le numéro WhatsApp Business associé à votre application, avec l'indicatif du pays. C'est votre `{source}`. Pendant vos tests dans le bac à sable, utilisez le numéro de Gupshup `917834811114`.

:::note
WhatsApp ne livre un message ordinaire qu'aux personnes qui ont écrit à votre numéro au cours des dernières 24 heures. Pour joindre quelqu'un en dehors de cette période, créez un modèle de message dans la console Gupshup, attendez son approbation, puis indiquez son identifiant avec `?template=`.
:::

:::note
Les pièces jointes ne sont pas prises en charge. L'interface de Gupshup par clé API n'accepte que des fichiers déjà hébergés à une adresse web publique.
:::

## Syntaxe

Les syntaxes valides sont les suivantes :

- `gupshup://{app}:{apikey}@{source}/{phone_no}`
- `gupshup://{app}:{apikey}@{source}/{phone_no1}/{phone_no2}/{phone_noN}`
- `gupshup://{app}:{apikey}@{source}/{phone_no}?template={template_id}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| app      | Oui    | Le nom de votre application Gupshup. Il peut aussi être fourni avec `?app=`.                                                           |
| apikey   | Oui    | Votre clé API Gupshup. Elle peut aussi être fournie avec `?key=`.                                                                      |
| source   | Oui    | Le numéro WhatsApp Business depuis lequel votre application envoie, avec l'indicatif du pays. Il peut aussi être fourni avec `?from=`. |
| phone_no | Oui    | Le numéro de téléphone à notifier, avec l'indicatif du pays. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique.   |
| template | Non    | L'identifiant d'un modèle de message approuvé à envoyer à la place d'un message ordinaire.                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Variables de modèle

Les modèles contiennent des emplacements tels que `{{1}}` et `{{2}}`. Remplissez-les avec le préfixe `:` (deux-points) :

- `:1=du texte` place un texte fixe dans `{{1}}`.
- `:body=2` place le corps du message Apprise dans `{{2}}`.
- `:type=3` place le type de notification (`info`, `success`, `warning` ou `failure`) dans `{{3}}`.

Si aucun emplacement n'est indiqué, le modèle est envoyé tel quel et le corps du message n'est pas utilisé.

## Exemples

Envoyer un message WhatsApp à un numéro de téléphone :

```bash
# Remplacez DemoAPI par le nom de votre application
# Remplacez abcd1234 par votre clé API
# Remplacez 917834811114 par le numéro depuis lequel votre application envoie
# Remplacez 15551234567 par le numéro de téléphone à notifier
apprise -vv -b "Sauvegarde terminée." \
    gupshup://DemoAPI:abcd1234@917834811114/15551234567
```

Envoyer un message WhatsApp à deux numéros de téléphone :

```bash
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
    gupshup://DemoAPI:abcd1234@917834811114/15551234567/15557654321
```

Envoyer un modèle approuvé en plaçant le corps du message dans `{{1}}` :

```bash
apprise -vv -b "Le disque est plein." \
    "gupshup://DemoAPI:abcd1234@917834811114/15551234567?template=c6aecef6-bcb0-4fb1-8100-28c094e3bc6b&:body=1"
```
