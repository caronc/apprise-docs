---
title: "Notifications Groundmail"
description: "Envoyer des notifications par e-mail via l'API d'e-mail transactionnel Groundmail."
sidebar:
  label: "Groundmail"

source: https://groundmail.dev/

schemas:
  - groundmail

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

sample_urls:
  - groundmail://{apikey}:{from_email}
  - groundmail://{apikey}:{from_email}/{to_email}
  - groundmail://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

La création d'un compte [Groundmail](https://groundmail.dev/) est gratuite, et l'offre gratuite inclut 3 000 e-mails par mois.

Créez ensuite une **clé API** depuis la section [API Keys](https://app.groundmail.dev/api-keys) de votre tableau de bord. Les clés commencent par `gm_`.

Pour envoyer des notifications uniquement à vous-même (l'adresse e-mail de votre compte Groundmail), aucune configuration de domaine n'est nécessaire : utilisez `noreply@mail.groundmail.dev` comme `{from_email}`.

Pour envoyer à d'autres destinataires, ajoutez et vérifiez votre domaine depuis la section [Domains](https://app.groundmail.dev/domains) de votre tableau de bord, puis utilisez une adresse de ce domaine comme `{from_email}`. L'envoi à d'autres destinataires nécessite aussi l'ajout d'un moyen de paiement. L'offre gratuite n'est jamais facturée.

## Syntaxe

La syntaxe valide est la suivante :

- `groundmail://{apikey}:{from_email}`
- `groundmail://{apikey}:{from_email}/{to_email}`
- `groundmail://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}`

Chaque `{to_email}` reçoit sa propre copie du message.

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                               |
| ---------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Oui         | La [clé API](https://app.groundmail.dev/api-keys) générée depuis votre tableau de bord Groundmail.                                                                                                                                        |
| from_email | Oui         | L'adresse _From_. Utilisez une adresse d'un domaine vérifié chez Groundmail, ou `noreply@mail.groundmail.dev` pour envoyer uniquement à l'adresse e-mail de votre compte. Vous pouvez aussi utiliser la syntaxe `A User<user@email.com>`. |
| to_email   | Non         | L'adresse _To_. Si aucune n'est indiquée, `from_email` est utilisée à la place.                                                                                                                                                           |
| cc         | Non         | La partie _Carbon Copy_ (CC:) de l'e-mail. Elle est entièrement facultative.                                                                                                                                                              |
| bcc        | Non         | La partie _Blind Carbon Copy_ (BCC:) de l'e-mail. Elle est entièrement facultative.                                                                                                                                                       |
| name       | Non         | Un nom d'affichage pour `{from_email}`. Ne le combinez pas avec la syntaxe `A User<user@email.com>`.                                                                                                                                      |
| reply      | Non         | Une ou plusieurs adresses Reply-To. Plusieurs valeurs peuvent être séparées par des espaces et/ou des virgules.                                                                                                                           |
| format     | Non         | Groundmail envoie toujours une version HTML et une version texte brut de chaque e-mail. Ce paramètre indique dans laquelle votre message est rédigé : `html` (par défaut) ou `text`. L'autre version est créée à partir de celle-ci.      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Groundmail à vous-même (aucune configuration de domaine nécessaire) :

```bash
# Supposons que notre {apikey} soit gm_abc123
# Supposons que l'adresse e-mail de notre compte Groundmail soit me@example.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   groundmail://gm_abc123:noreply@mail.groundmail.dev/me@example.com
```

Envoyer à votre équipe depuis un domaine vérifié :

```bash
# Supposons que notre domaine vérifié soit example.com
apprise -vv -t "Échec de la sauvegarde" -b "La sauvegarde nocturne ne s'est pas terminée." \
   "groundmail://gm_abc123:alerts@example.com/ops@example.com?name=Backups&cc=lead@example.com"
```
