---
title: "Notifications Resend"
description: "Envoyer des notifications Resend."
sidebar:
  label: "Resend"

source: https://resend.com/

schemas:
  - resend

has_email: true
has_attachments: true

sample_urls:
  - resend://{apikey}:{from_email}
  - resend://{apikey}:{from_email}/{to_email}
  - resend://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

La creation d'un compte Resend est gratuite et peut se faire depuis leur page principale.

Une fois votre compte cree et l'acces a [votre tableau de bord](https://resend.com/) obtenu, vous devez vous assurer d'avoir correctement **authentifie vos domaines** chez eux. Cette operation se fait depuis la section [Domains](https://resend.com/domains) de votre tableau de bord.

La derniere etape consiste a generer une **cle API** disposant au minimum de la permission **Sending**. Cela peut egalement etre fait depuis la section [API Keys](https://resend.com/api-keys) de votre tableau de bord.

## Syntaxe

La syntaxe valide est la suivante :

- `resend://{apikey}:{from_email}`
- `resend://{apikey}:{from_email}/{to_email}`
- `resend://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Oui         | [Cle API](https://resend.com/api-keys) generee depuis votre tableau de bord Resend.                                                                                                                                                                                                                                                                                                                                                                                              |
| from_email | Oui         | Adresse e-mail identifiant l'origine du message, c'est-a-dire l'adresse _From_. Cette adresse **doit** appartenir a un domaine deja authentifie avec votre compte Resend. Voir la section [Domain](https://resend.com/domains) de l'API.                                                                                                                                                                                                                                         |
| to_email   | Non         | Adresse e-mail identifiant le destinataire du message, c'est-a-dire l'adresse _To_. Si aucune valeur n'est fournie, `from_email` est utilise a la place.                                                                                                                                                                                                                                                                                                                         |
| cc         | Non         | Partie _Carbon Copy_, CC:, de l'e-mail. Elle est entierement facultative. Il faut noter que Resend rejette immediatement les e-mails dont la liste _cc_ contient une adresse deja presente dans les listes _to_ ou _bcc_. Pour eviter ces problemes, Apprise elimine automatiquement et silencieusement ces doublons lorsqu'ils sont detectes.                                                                                                                                   |
| bcc        | Non         | Partie _Blind Carbon Copy_, BCC:, de l'e-mail. Elle est entierement facultative. Il faut noter que Resend rejette immediatement les e-mails dont la liste _bcc_ contient une adresse deja presente dans les listes _to_ ou _cc_. Pour eviter ces problemes, Apprise elimine automatiquement et silencieusement ces doublons lorsqu'ils sont detectes. Si une meme adresse est detectee a la fois dans CC et BCC, elle est conservee dans BCC et supprimee automatiquement de CC. |
| name       | Non         | Concernant `{from_email}`, cela vous permet de fournir un nom avec votre adresse _Reply-To_. <br/>**Remarque :** ce champ est devenu redondant et est desormais synonyme de `from=`. Il se comporte encore comme dans les versions precedentes, mais vous pouvez aussi utiliser la syntaxe `A User<user@email.com>`. Pour lever toute ambiguite, les valeurs analysees depuis `from=` auront toujours priorite sur `name=`.                                                      |
| reply      | Non         | Permet de fournir une ou plusieurs adresses Reply-To. Plusieurs valeurs peuvent etre separees par des espaces et/ou des virgules.                                                                                                                                                                                                                                                                                                                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Resend :

```bash
# Supposons que notre {apikey} soit re_bcd123-xyz
# Supposons que notre domaine authentifie soit example.com, et que nous voulions
# definir notre {from_email} sur noreply@example.com
# Supposons que notre {to_email} soit someone@microsoft.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   resend:///re_bcd123-xyz:noreply@example.com/someone@microsoft.com
```
