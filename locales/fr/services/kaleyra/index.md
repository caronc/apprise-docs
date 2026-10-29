---
title: "Notifications Kaleyra"
description: "Envoyez des notifications par SMS grâce à Kaleyra."
sidebar:
  label: "Kaleyra"

source: https://www.kaleyra.com

schemas:
  - kaleyra
  - klr

has_sms: true

body_formats:
  - text

sample_urls:
  - kaleyra://{sid}:{apikey}@{sender}/{phone_no}
  - kaleyra://{sid}:{apikey}@{sender}/{phone_no1}/{phone_no2}/{phone_noN}

limits:
  max_chars: 4000
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Créez un [compte Kaleyra.io](https://www.kaleyra.io/).
2. Connectez-vous et ouvrez la section **Developers**.
3. Copiez votre **Account SID** (il ressemble à `HXAP16XXXXXX97IN`) et créez une **API Key**. Ce sont votre `{sid}` et votre `{apikey}`.
4. Notez l'identifiant d'expéditeur (**Sender ID**) que Kaleyra a approuvé pour votre compte (par exemple `KLRHXA`). C'est votre `{sender}`. Pour les SMS bidirectionnels, utilisez plutôt le numéro de téléphone acheté auprès de Kaleyra.

Kaleyra héberge chaque compte dans une seule région. Apprise utilise par défaut les serveurs de Singapour. Si votre compte se trouve en Inde ou en Europe, ajoutez `?region=in` ou `?region=eu`.

:::note
Les comptes indiens doivent envoyer avec un modèle DLT enregistré. Ajoutez son identifiant avec `?template=` et assurez-vous que votre message correspond au texte du modèle.
:::

:::note
Les pièces jointes ne sont pas prises en charge, car l'API SMS de Kaleyra ne transporte que du texte.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `kaleyra://{sid}:{apikey}@{sender}/{phone_no}`
- `kaleyra://{sid}:{apikey}@{sender}/{phone_no1}/{phone_no2}/{phone_noN}`
- `kaleyra://{sid}:{apikey}@{sender}/{phone_no}?region={region}`
- `kaleyra://{sid}:{apikey}@{sender}/{phone_no}?region=in&template={template_id}`

Vous pouvez raccourcir `kaleyra://` en `klr://`.

## Détail des Paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                 |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid      | Oui    | Votre Account SID Kaleyra. Il peut aussi être indiqué avec `?sid=`.                                                                                                                                                                         |
| apikey   | Oui    | Votre clé d'API Kaleyra. Elle peut aussi être indiquée avec `?key=`.                                                                                                                                                                        |
| sender   | Oui    | L'identifiant d'expéditeur (ou le numéro bidirectionnel) du message. Il peut aussi être indiqué avec `?from=`.                                                                                                                              |
| phone_no | Oui    | Le numéro de téléphone à notifier, avec l'indicatif du pays. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique.                                                                                                        |
| region   | Non    | La région de votre compte Kaleyra : `sg` (Singapour), `in` (Inde) ou `eu` (Europe). La valeur par défaut est `sg`.                                                                                                                          |
| type     | Non    | Le type de route utilisé : `default`, `txn` (transactionnel), `txnd`, `mkt` (marketing) ou `otp` (mots de passe à usage unique). Les comptes indiens utilisent `txn`, `txnd`, `mkt` ou `otp`. S'il n'est pas défini, Kaleyra en choisit un. |
| template | Non    | L'identifiant d'un modèle DLT enregistré. Il est obligatoire pour les comptes indiens.                                                                                                                                                      |
| flash    | Non    | Mettez `yes` pour envoyer un SMS flash, qui s'affiche à l'écran sans être enregistré. La valeur par défaut est `no`.                                                                                                                        |
| batch    | Non    | Mettez `yes` pour envoyer jusqu'à 100 numéros de téléphone en une seule requête. La valeur par défaut est `no`.                                                                                                                             |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS à un numéro de téléphone :

```bash
# Remplacez HXAP16XXXXXX97IN par votre Account SID
# Remplacez abcd1234 par votre clé d'API
# Remplacez KLRHXA par votre Sender ID
# Remplacez 15551234567 par le numéro de téléphone à notifier
apprise -vv -b "Sauvegarde terminée." \
    kaleyra://HXAP16XXXXXX97IN:abcd1234@KLRHXA/15551234567
```

Envoyer un SMS à deux numéros de téléphone en une seule requête :

```bash
apprise -vv -t "Alerte" -b "Quelque chose s'est produit." \
    "klr://HXAP16XXXXXX97IN:abcd1234@KLRHXA/15551234567/15557654321?batch=yes"
```

Envoyer depuis un compte indien avec un modèle DLT :

```bash
apprise -vv -b "Votre sauvegarde s'est terminée avec succès." \
    "kaleyra://HXAP16XXXXXX97IN:abcd1234@KLRHXA/919876543210?region=in&type=txn&template=1107160000000000000"
```
