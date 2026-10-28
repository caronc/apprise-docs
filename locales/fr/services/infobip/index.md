---
title: "Notifications Infobip"
description: "Envoyez des notifications par SMS grâce à Infobip."
sidebar:
  label: "Infobip"

source: https://www.infobip.com

schemas:
  - infobip

has_sms: true

body_formats:
  - text

sample_urls:
  - infobip://{apikey}@{base_url}/{phone_no}
  - infobip://{apikey}@{base_url}/{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Créez un [compte Infobip](https://www.infobip.com/signup).
2. Ouvrez la page [API Keys](https://portal.infobip.com/dev/api-keys) et créez une clé d'API avec la portée `sms:message:send`. C'est votre `{apikey}`.
3. Trouvez votre **Base URL** personnelle. Elle s'affiche en haut de la [documentation de l'API Infobip](https://www.infobip.com/docs/api) une fois connecté, et ressemble à `xxxxxx.api.infobip.com`.

Seule la première partie de la Base URL (la partie `xxxxxx`) est nécessaire. Apprise ajoute `.api.infobip.com` pour vous. La Base URL complète fonctionne aussi.

:::note
Les comptes d'essai gratuits ne peuvent envoyer qu'aux numéros de téléphone vérifiés dans votre compte Infobip.
:::

:::note
Les pièces jointes ne sont pas prises en charge, car les SMS ne peuvent pas transporter de fichiers.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `infobip://{apikey}@{base_url}/{phone_no}`
- `infobip://{apikey}@{base_url}/{phone_no1}/{phone_no2}/{phone_noN}`
- `infobip://{apikey}@{base_url}/{phone_no}?from={sender}`

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                    |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Oui    | Votre clé d'API Infobip. Elle doit avoir la portée `sms:message:send`.                                                                                                         |
| base_url | Oui    | Votre Base URL Infobip personnelle. Vous pouvez indiquer la première partie (`xxxxxx`) ou la Base URL complète `xxxxxx.api.infobip.com`.                                       |
| phone_no | Oui    | Le numéro de téléphone à notifier, avec l'indicatif du pays. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique.                                           |
| from     | Non    | L'expéditeur du message. Il peut s'agir d'un numéro de téléphone ou d'un nom que votre compte est autorisé à utiliser. S'il n'est pas défini, Infobip en choisit un pour vous. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS à un numéro de téléphone :

```bash
# Remplacez abcd1234 par votre clé d'API
# Remplacez xyz123 par la première partie de votre Base URL
# Remplacez 15551234567 par le numéro de téléphone à notifier
apprise -vv -b "Sauvegarde terminée." \
    infobip://abcd1234@xyz123/15551234567
```

Envoyer un SMS à deux numéros de téléphone avec un expéditeur nommé :

```bash
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
    "infobip://abcd1234@xyz123/15551234567/15557654321?from=Alertes"
```
