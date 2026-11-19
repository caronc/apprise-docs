---
title: "Notifications Azure Communication Services"
description: "Envoyer des courriels avec Azure Communication Services."
sidebar:
  label: "Azure Communication Services"

source: https://azure.microsoft.com/products/communication-services

schemas:
  - acs

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

keywords: "microsoft"

sample_urls:
  - acs://{from_email}/{access_key}/{endpoint}
  - acs://{from_email}/{access_key}/{endpoint}/{to_email}
  - acs://{from_email}/{access_key}/{endpoint}/{to_email1}/{to_email2}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

1. Dans le portail Azure, créez une ressource **Email Communication Services**.
2. Ajoutez-y un domaine. Un domaine géré par Azure fonctionne.
3. Créez une ressource **Communication Services**.
4. Connectez le domaine de courriel à la ressource Communication Services.
5. Dans la ressource Communication Services, ouvrez **Keys**.
6. Copiez l'**Endpoint** et une **Access Key**.
7. Dans le domaine de courriel, ouvrez **MailFrom addresses** et choisissez l'expéditeur à utiliser, par exemple `DoNotReply@xxxx.azurecomm.net`.

:::tip
`azure://` est un service différent. Il envoie depuis une boîte aux lettres [Microsoft 365](/services/office365/). Utilisez `acs://` pour Azure Communication Services.
:::

## Syntaxe

Les syntaxes valides sont les suivantes :

- `acs://{from_email}/{access_key}/{endpoint}`
- `acs://{from_email}/{access_key}/{endpoint}/{to_email}`
- `acs://{from_email}/{access_key}/{endpoint}/{to_email1}/{to_email2}`

Si la clé d'accès contient `//`, écrivez chaque `/` sous la forme `%2F`, ou utilisez `?key=`.

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                             |
| ---------- | ----------- | --------------------------------------------------------------------------------------- |
| from_email | Oui         | Une adresse d'expéditeur du domaine connecté. Aussi `from=`.                            |
| access_key | Oui         | La clé d'accès de la page **Keys**. Aussi `key=`.                                       |
| endpoint   | Oui         | L'hôte de l'endpoint, par exemple `contoso.communication.azure.com`. Aussi `endpoint=`. |
| to_email   | Non         | Un ou plusieurs destinataires. Sans destinataire, le courriel est envoyé à from_email.  |
| cc         | Non         | Adresses en copie carbone. Vous pouvez ajouter un nom : `Nom <email>`.                  |
| bcc        | Non         | Adresses en copie carbone invisible.                                                    |
| reply      | Non         | Adresses de réponse. Vous pouvez ajouter un nom : `Nom <email>`.                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un courriel :

```bash
apprise -vv -t "Test Title" -b "Test Body" \
   "acs://DoNotReply@xxxx.azurecomm.net/{access_key}/contoso.communication.azure.com/you@example.com"
```
