---
title: "Notifications SendGrid"
description: "Envoyer des notifications SendGrid."
sidebar:
  label: "SendGrid"

source: https://sendgrid.com/

schemas:
  - sendgrid

has_attachments: true

sample_urls:
  - sendgrid://{apikey}:{from_email}
  - sendgrid://{apikey}:{from_email}/{to_email}
  - sendgrid://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

La creation d'un compte SendGrid est gratuite et peut se faire depuis leur page principale.

Une fois votre compte cree et l'acces a [votre tableau de bord](https://app.sendgrid.com/) obtenu, vous devez vous assurer d'avoir correctement **authentifie vos domaines** chez eux. Cette operation se fait dans la section [Sender Authentication](https://app.sendgrid.com/settings/sender_auth) de votre tableau de bord, accessible via **Settings** > **Sender Authentication**.

La derniere etape consiste a generer une **API Key** disposant au minimum de la permission **Mail Send**. Cela peut egalement etre fait depuis la section [API Keys](https://app.sendgrid.com/settings/api_keys) de votre tableau de bord, accessible via **Settings** > **API Keys**.

## Syntaxe

La syntaxe valide est la suivante :

- `sendgrid://{apikey}:{from_email}`
- `sendgrid://{apikey}:{from_email}/{to_email}`
- `sendgrid://{apikey}:{from_email}/{to_email1}/{to_email2}/{to_email3}`

La prise en charge des modeles est egalement disponible. Il vous suffit d'indiquer dans l'URL l'UUID qui lui a ete assigne :

- `sendgrid://{apikey}:{from_email}/{to_email}?template={template_uuid}`

Si vous souhaitez tirer parti des variables `dynamic_template_data`, creez simplement des arguments prefixes par un plus, `+`, par exemple :

- `sendgrid://{apikey}:{from_email}/{to_email}?template={template_uuid}&+{sub1}=value&+{sub2}=value2`

## Détail des Paramètres

| Variable   | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apikey     | Oui         | [API Key](https://app.sendgrid.com/settings/api_keys) que vous avez generee depuis votre tableau de bord SendGrid.                                                                                                                                                                                                                                                                                                                                                                 |
| from_email | Oui         | Adresse e-mail identifiant l'origine du message, c'est-a-dire l'adresse _From_. Cette adresse **doit** appartenir a un domaine deja authentifie avec votre compte SendGrid, voir [Domain Authentication](https://app.sendgrid.com/settings/sender_auth).                                                                                                                                                                                                                           |
| to_email   | Non         | Adresse e-mail identifiant la destination du message, c'est-a-dire l'adresse _To_. Si aucune valeur n'est fournie, `from_email` est utilise a la place.                                                                                                                                                                                                                                                                                                                            |
| template   | Non         | Vous pouvez facultativement specifier l'UUID d'un modele dynamique SendGrid deja genere comme base pour l'e-mail.                                                                                                                                                                                                                                                                                                                                                                  |
| cc         | Non         | Partie _Carbon Copy_, CC:, de l'e-mail. Elle est entierement facultative. Il faut noter que SendGrid rejette immediatement les e-mails dont la liste _cc_ contient une adresse deja presente dans les listes _to_ ou _bcc_. Pour eviter ces problemes, Apprise elimine automatiquement et silencieusement ces doublons lorsqu'ils sont detectes.                                                                                                                                   |
| bcc        | Non         | Partie _Blind Carbon Copy_, BCC:, de l'e-mail. Elle est entierement facultative. Il faut noter que SendGrid rejette immediatement les e-mails dont la liste _bcc_ contient une adresse deja presente dans les listes _to_ ou _cc_. Pour eviter ces problemes, Apprise elimine automatiquement et silencieusement ces doublons lorsqu'ils sont detectes. Si une meme adresse est detectee a la fois dans CC et BCC, elle est conservee dans BCC et supprimee automatiquement de CC. |

<!-- TEMPLATE:SERVICE-PARAMS -->

### Données de Modèle Dynamiques

Les modeles vous permettent de definir des `{{variables}}` qui seront remplacees dynamiquement lors de l'envoi de l'e-mail. Vous pouvez identifier et definir ces variables avec Apprise en ajoutant simplement un plus, `+`, devant n'importe quel parametre precise dans votre URL.

Considerez le modele suivant : `d-e624763c71314ea2a1fae38d7fa64a4a`

```text
This is a test email about {{what}}.

You can take a mapped variable on a SendGrid template
and easily swap it with whatever you want using {{app}}.
```

Dans l'exemple ci-dessus, nous avons defini les variables suivantes : `what` et `app`.

Une URL Apprise peut ressembler a ceci :<br/>
`sendgrid://myapikey:noreply@example.com?template=d-e624763c71314ea2a1fae38d7fa64a4a&+what=templates&+app=Apprise`

L'URL ci-dessus produirait le resultat suivant :

```text
This is a test email about templates.

You can take a mapped variable on a SendGrid template
and easily swap it with whatever you want using Apprise.
```

## Exemples

Envoyer une notification SendGrid :

```bash
# Supposons que notre {apikey} soit abcd123-xyz
# Supposons que notre domaine authentifie soit example.com, et que nous voulions
# definir notre {from_email} sur noreply@example.com
# Supposons que notre {to_email} soit someone@microsoft.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sendgrid:///abcd123-xyz:noreply@example.com/someone@microsoft.com
```
