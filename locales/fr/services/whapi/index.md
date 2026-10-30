---
title: "Notifications Whapi.Cloud"
description: "Envoyer des notifications WhatsApp depuis votre propre numéro via Whapi.Cloud."
sidebar:
  label: "Whapi.Cloud"

source: https://whapi.cloud

schemas:
  - whapi

has_attachments: true
has_chat: true

body_formats:
  - markdown

sample_urls:
  - whapi://{token}/{phone_no}
  - whapi://{token}/{phone_no1}/{group_id}/{phone_noN}

limits:
  max_chars: 4096
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

:::note
Whapi.Cloud envoie les messages depuis votre propre numéro WhatsApp en le liant de la même façon que WhatsApp Web. Il peut joindre des groupes et ne demande ni vérification d'entreprise Meta ni modèles de message. Si vous préférez utiliser le service officiel WhatsApp Business de Meta, consultez [WhatsApp](../whatsapp/). Si vous préférez héberger vous-même ce type de liaison, consultez [Evolution API](../evolution/).
:::

## Configuration du compte

1. Inscrivez-vous sur [Whapi.Cloud](https://panel.whapi.cloud/) et ouvrez (ou créez) un **Channel**.
2. Sur votre téléphone, ouvrez WhatsApp et allez dans **Paramètres** > **Appareils connectés** > **Connecter un appareil**, puis scannez le code QR affiché sur la page du Channel.
3. Copiez l'**API Token** affiché sur la page du Channel. C'est votre `{token}`.

Pour envoyer à un groupe, il vous faut son identifiant. Vous pouvez le trouver avec l'appel **Get groups** de la [référence de l'API Whapi.Cloud](https://whapi.readme.io/reference/getgroups). Il ressemble à `120363042829563251@g.us`.

## Syntaxe

La syntaxe valide est la suivante :

- `whapi://{token}/{phone_no}`
- `whapi://{token}/{group_id}`
- `whapi://{token}/{phone_no1}/{group_id}/{phone_noN}`

## Détail des paramètres

| Variable | Requis | Description                                                                                                                                                                                                                                     |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| token    | Oui    | Le jeton d'API de votre Channel Whapi.Cloud. Il peut aussi être fourni avec `?token=`.                                                                                                                                                          |
| phone_no | Non    | Un numéro de téléphone à notifier, indicatif du pays compris.                                                                                                                                                                                   |
| group_id | Non    | Un groupe à notifier. Indiquez le numéro seul (`120363042829563251`) ou l'identifiant complet (`120363042829563251@g.us`). Tout autre identifiant de discussion, comme une chaîne WhatsApp se terminant par `@newsletter`, est envoyé tel quel. |
| preview  | Non    | Mettez `no` pour que WhatsApp n'affiche pas d'aperçu du premier lien du message. La valeur par défaut est `yes`.                                                                                                                                |

Au moins un numéro de téléphone ou un groupe doit être fourni. Ajoutez-en autant que vous le souhaitez, séparés par une barre oblique.

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message WhatsApp à un numéro de téléphone :

```bash
# Remplacez abcd1234 par votre API Token
# Remplacez 15551234567 par le numéro de téléphone à notifier
apprise -vv -t "Alerte" -b "Sauvegarde terminée." \
    whapi://abcd1234/15551234567
```

Envoyer un message WhatsApp à un numéro de téléphone et à un groupe, avec une pièce jointe :

```bash
apprise -vv -b "Voici le rapport du jour." \
    --attach=/chemin/vers/rapport.pdf \
    whapi://abcd1234/15551234567/120363042829563251
```

Envoyer un message WhatsApp sans aperçu de lien :

```bash
apprise -vv -b "Page d'état : https://example.com/status" \
    "whapi://abcd1234/15551234567?preview=no"
```
