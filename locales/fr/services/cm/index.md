---
title: "Notifications CM.com"
description: "Envoyez des notifications par SMS grâce à CM.com."
sidebar:
  label: "CM.com"

source: https://www.cm.com

schemas:
  - cm

has_sms: true

body_formats:
  - text

sample_urls:
  - cm://{token}/{phone_no}
  - cm://{sender}@{token}/{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 1224
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Créez un [compte CM.com](https://www.cm.com/register/).
2. Ouvrez l'[application Channels](https://www.cm.com/app/channels) et copiez votre **Product Token** depuis les paramètres de l'API. Il ressemble à `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` et correspond à votre `{token}`.

Les messages sont envoyés par SMS par défaut. D'autres canaux, comme WhatsApp ou Viber, peuvent être choisis avec `?channels=` une fois que CM.com les a activés sur votre compte.

:::note
Les messages longs sont envoyés comme un seul SMS composé d'au plus 8 parties. Les messages contenant des caractères hors de l'alphabet SMS standard (comme des emoji ou des lettres grecques) contiennent moins de caractères par partie.
:::

:::note
Les pièces jointes ne sont pas prises en charge, car CM.com n'accepte les médias que sous forme de lien vers un fichier déjà en ligne.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `cm://{token}/{phone_no}`
- `cm://{token}/{phone_no1}/{phone_no2}/{phone_noN}`
- `cm://{sender}@{token}/{phone_no}`
- `cm://{token}/{phone_no}?channels={channel1},{channel2}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                        |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| token    | Oui    | Votre Product Token CM.com, tirets compris.                                                                                                                                                                        |
| phone_no | Oui    | Le numéro de téléphone à notifier, avec l'indicatif du pays. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique.                                                                               |
| sender   | Non    | L'expéditeur du message. Il peut s'agir d'un nom d'au plus 11 lettres et chiffres, ou d'un numéro de téléphone d'au plus 16 chiffres. Il peut aussi être défini avec `?from=`. La valeur par défaut est `Apprise`. |
| channels | Non    | Les canaux que CM.com peut utiliser pour livrer le message, séparés par une virgule. Choisissez parmi `sms`, `whatsapp`, `viber` et `rcs`. La valeur par défaut est `sms`.                                         |
| batch    | Non    | Envoie à jusqu'à 1000 numéros de téléphone en une seule requête lorsqu'il vaut `yes`. La valeur par défaut est `no`.                                                                                               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS à un numéro de téléphone :

```bash
# Remplacez 0123abcd-4567-89ef-abcd-0123456789ab par votre Product Token
# Remplacez 15551234567 par le numéro de téléphone à notifier
apprise -vv -b "Sauvegarde terminée." \
    cm://0123abcd-4567-89ef-abcd-0123456789ab/15551234567
```

Envoyer à deux numéros de téléphone depuis un expéditeur nommé :

```bash
apprise -vv -t "Alerte" -b "Il s'est passé quelque chose." \
    "cm://Alerts@0123abcd-4567-89ef-abcd-0123456789ab/15551234567/15557654321"
```

Laisser CM.com livrer par WhatsApp ou par SMS :

```bash
apprise -vv -b "Le serveur est de nouveau en ligne." \
    "cm://0123abcd-4567-89ef-abcd-0123456789ab/15551234567?channels=whatsapp,sms"
```
