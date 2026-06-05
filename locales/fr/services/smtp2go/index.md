---
title: "Notifications SMTP2Go"
description: "Envoyer des notifications SMTP2Go."
sidebar:
  label: "SMTP2Go"

source: https://www.smtp2go.com/

schemas:
  - smtp2go

has_email: true
has_attachments: true

sample_urls:
  - smtp2go://{user}@{domain}/{apikey}/
  - smtp2go://{user}@{domain}/{apikey}/{email}
  - smtp2go://{user}@{domain}/{apikey}/{email1}/{email2}/{emailN}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous pouvez creer un compte gratuitement [sur leur site web](https://www.smtp2go.com/).

L'etape suivante consiste simplement a generer une **cle API** associee a votre compte depuis votre tableau de bord, [ici](https://app.smtp2go.com/settings/apikeys/).

## Syntaxe

La syntaxe valide est la suivante :

- `smtp2go://{user}@{domain}/{apikey}/`
- `smtp2go://{user}@{domain}/{apikey}/{email}`
- `smtp2go://{user}@{domain}/{apikey}/{email1}/{email2}/{emailN}`

Vous pouvez egalement ajuster le nom associe a l'adresse e-mail `From` :

- `smtp2go://{user}@{domain}/{apikey}/?name=Luke%20Skywalker`

## Détail des Paramètres

| Variable | Obligatoire | Description                                                                                                                                      |
| -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| apikey   | Oui         | Cle API associee a votre compte SMTP2Go. Vous pouvez la recuperer depuis votre tableau de bord [ici](https://app.smtp2go.com/settings/apikeys/). |
| domain   | Oui         | Domaine associe au compte e-mail expediteur.                                                                                                     |
| user     | Oui         | L'utilisateur est combine au domaine precise dans l'URL pour former l'adresse **From** visible par vos destinataires.                            |
| email    | Non         | Vous pouvez specifier autant d'adresses e-mail que vous le souhaitez. Chaque adresse indiquee representera le champ **To**.                      |
| from     | Non         | Permet de definir le nom associe a l'adresse e-mail **From** lors de l'envoi.                                                                    |
| to       | Non         | Alias de la variable `email`. Vous pouvez y ajouter autant d'adresses **To** que souhaite, separees par des virgules et/ou des espaces.          |
| cc       | Non         | Identifie les utilisateurs a ajouter en Carbon Copy.                                                                                             |
| bcc      | Non         | Identifie les utilisateurs a ajouter en Blind Carbon Copy.                                                                                       |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification SMTP2Go a l'adresse e-mail `bill.gates@microsoft.com` :

```bash
# Supposons que le {domain} configure dans notre compte SMTP2Go soit example.com
# Supposons que notre {apikey} soit api-60F0DD0AB5BA11ABA421F23C91C88EF4
# Supposons que notre {email} de destination soit bill.gates@microsoft.com
# Supposons que nous voulions envoyer depuis noreply@example.com
apprise smtp2go:///noreply@example.com/api-60F0DD0AB5BA11ABA421F23C91C88EF4/bill.gates@microsoft.com
```
