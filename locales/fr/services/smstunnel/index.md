---
title: "Notifications SMSTunnel"
description: "Envoyez des SMS depuis votre propre téléphone Android et votre propre numéro avec SMSTunnel."
sidebar:
  label: "SMSTunnel"

source: https://smstunnel.io

schemas:
  - smstunnel

has_sms: true

body_formats:
  - text

sample_urls:
  - smstunnel://{apikey}/{phone_no}
  - smstunnel://{apikey}/{phone_no1}/{phone_no2}/{phone_noN}
  - smstunnel://{apikey}/{phone_no}?device={device_id}

limits:
  max_chars: 1600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

SMSTunnel envoie vos notifications sous forme de SMS depuis votre propre téléphone Android, avec votre propre numéro. Les personnes que vous notifiez voient un numéro qu'elles connaissent déjà et peuvent y répondre.

Apprise transmet chaque SMS à votre compte SMSTunnel, puis l'application SMSTunnel de votre téléphone l'envoie avec la carte SIM du téléphone. Chaque numéro de téléphone indiqué reçoit son propre SMS. Le titre de la notification est placé au début du texte, car un SMS n'a pas de titre.

## Configuration du compte

1. Installez l'[application SMSTunnel depuis Google Play](https://play.google.com/store/apps/details?id=io.smstunnel.app) sur votre téléphone Android et connectez-vous.
2. Connectez-vous sur [smstunnel.io](https://smstunnel.io) avec le même compte. Votre téléphone apparaît sous **Phones**.
3. Ouvrez **Apps** dans le tableau de bord et choisissez **Add an app**. Sa clé peut envoyer des SMS (la permission `sms:send`). La clé commence par `sk_live_`. C'est votre `{apikey}`.

Si plusieurs téléphones sont liés à votre compte, vous pouvez choisir celui qui envoie avec `?device=`. Le Device ID est l'`id` de chaque téléphone dans la liste que renvoie SMSTunnel :

```bash
curl -H "X-API-Key: {apikey}" https://smstunnel.io/api/v1/devices
```

Si votre téléphone est hors ligne, SMSTunnel garde le SMS et votre téléphone l'envoie dès qu'il est de nouveau en ligne.

:::note
Les conditions de votre opérateur s'appliquent à chaque SMS envoyé par votre téléphone. N'envoyez que des SMS que les destinataires attendent de vous, comme des alertes pour vous-même ou votre équipe.
:::

:::note
Les pièces jointes ne sont pas prises en charge, car SMSTunnel n'envoie que des SMS.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `smstunnel://{apikey}/{phone_no}`
- `smstunnel://{apikey}/{phone_no1}/{phone_no2}/{phone_noN}`
- `smstunnel://{apikey}/{phone_no}?device={device_id}`
- `smstunnel://{apikey}/{local_phone_no}?country={country_code}`
- `smstunnel://?key={apikey}&to={phone_no1},{phone_no2}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                                                                                  |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Oui    | Votre clé d'API SMSTunnel. Elle doit avoir la permission `sms:send`. Elle peut aussi être indiquée avec `?key=`.                                                                                                                                                                                             |
| phone_no | Oui    | Le numéro de téléphone à notifier, avec l'indicatif du pays (par exemple `+14155550123`). Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique. Vous pouvez aussi utiliser `?to=` avec des virgules entre les numéros.                                                                     |
| device   | Non    | Le Device ID du téléphone qui envoie le SMS. S'il n'est pas indiqué, SMSTunnel choisit l'un des téléphones liés à votre compte.                                                                                                                                                                              |
| country  | Non    | Un indicatif téléphonique de pays, comme `1` ou `40`. Il vous permet aussi d'écrire les numéros sous leur forme locale : un numéro qui ne commence ni par `+` ni par `00` reçoit cet indicatif devant lui (un `0` initial est d'abord retiré). Sans lui, chaque numéro doit inclure l'indicatif de son pays. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS à un numéro de téléphone :

```bash
# Remplacez abcd1234 par votre clé d'API
# Remplacez +14155550123 par le numéro de téléphone à notifier
apprise -vv -t "Sauvegarde" -b "La sauvegarde de la nuit est terminée." \
    smstunnel://abcd1234/+14155550123
```

Envoyer la même notification à deux numéros de téléphone (un SMS chacun) :

```bash
apprise -vv -b "Le site web est hors service." \
    smstunnel://abcd1234/+14155550123/+14155550124
```

Choisir lequel de vos téléphones envoie le SMS :

```bash
apprise -vv -b "L'espace disque est faible." \
    "smstunnel://abcd1234/+14155550123?device=6650f0c2a1b2c3d4e5f60718"
```

Écrire des numéros locaux et laisser Apprise ajouter l'indicatif du pays (`0712 345 678` devient `+40712345678`) :

```bash
apprise -vv -b "La porte a été ouverte." \
    "smstunnel://abcd1234/0712345678?country=40"
```
