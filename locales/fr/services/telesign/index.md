---
title: "Notifications Telesign"
description: "Envoyez des notifications par SMS grâce à Telesign."
sidebar:
  label: "Telesign"

source: https://www.telesign.com

schemas:
  - telesign

has_sms: true

body_formats:
  - text

sample_urls:
  - telesign://{customer_id}:{apikey}@{phone_no}
  - telesign://{customer_id}:{apikey}@{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 1600
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Créez un [compte Telesign](https://www.telesign.com/).
2. Connectez-vous au [portail Telesign](https://portal.telesign.com/).
3. Copiez votre **Customer ID** et votre **API Key** depuis le tableau de bord. Ce sont votre `{customer_id}` et votre `{apikey}`.

Les clés d'API Telesign contiennent souvent une barre oblique (`/`), un plus (`+`) ou un signe égal (`=`). Écrivez-les `%2F`, `%2B` et `%3D` dans l'URL, ou passez la clé avec `?key=`.

:::note
Les comptes d'essai ne peuvent envoyer qu'aux numéros de téléphone vérifiés dans votre compte Telesign.
:::

:::note
Les pièces jointes ne sont pas prises en charge, car l'API SMS de Telesign ne transporte que du texte.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `telesign://{customer_id}:{apikey}@{phone_no}`
- `telesign://{customer_id}:{apikey}@{phone_no1}/{phone_no2}/{phone_noN}`
- `telesign://{customer_id}:{apikey}@{phone_no}?from={sender}`
- `telesign://{customer_id}:{apikey}@{phone_no}?type={type}`

## Détail des Paramètres

| Variable    | Requis | Description                                                                                                                                                       |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| customer_id | Oui    | Votre Customer ID Telesign.                                                                                                                                       |
| apikey      | Oui    | Votre clé d'API Telesign. Elle peut aussi être indiquée avec `?key=`.                                                                                             |
| phone_no    | Oui    | Le numéro de téléphone à notifier, avec l'indicatif du pays. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique.                              |
| from        | Non    | L'identifiant d'expéditeur (Sender ID) du message, jusqu'à 20 lettres et chiffres. Telesign doit d'abord l'activer sur votre compte.                              |
| type        | Non    | Le type de message envoyé : `arn` (alertes, rappels et notifications), `otp` (mots de passe à usage unique) ou `mkt` (marketing). La valeur par défaut est `arn`. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS à un numéro de téléphone :

```bash
# Remplacez FFFFFFFF-EEEE-DDDD-1234-AB1234567890 par votre Customer ID
# Remplacez abcd1234 par votre clé d'API
# Remplacez 15551234567 par le numéro de téléphone à notifier
apprise -vv -b "Sauvegarde terminée." \
    telesign://FFFFFFFF-EEEE-DDDD-1234-AB1234567890:abcd1234@15551234567
```

Envoyer un SMS à deux numéros de téléphone avec un Sender ID :

```bash
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
    "telesign://FFFFFFFF-EEEE-DDDD-1234-AB1234567890:abcd1234@15551234567/15557654321?from=Alertes"
```

Passer une clé d'API contenant une barre oblique avec `?key=` :

```bash
apprise -vv -b "Sauvegarde terminée." \
    "telesign://FFFFFFFF-EEEE-DDDD-1234-AB1234567890@15551234567?key=abc%2Fdef%3D%3D"
```
