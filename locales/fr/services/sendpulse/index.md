---
title: "Notifications SendPulse"
description: "Envoyer des notifications SendPulse."
sidebar:
  label: "SendPulse"

source: https://sendpulse.com/

schemas:
  - sendpulse

has_email: true
has_attachments: true

body_formats:
  - html
  - text

sample_urls:
  - sendpulse://{user}@{host}/{client_id}/{client_secret}
  - sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}
  - sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email1}/{to_email2}/{to_email3}
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Format du message

SendPulse envoie des e-mails HTML par défaut. Définissez `?format=text` si vous voulez envoyer un e-mail en texte brut.

## Configuration du compte

Une fois votre compte cree et l'acces a [votre tableau de bord](https://app.sendpulse.com/) obtenu, vous devrez recuperer votre `Client ID` et votre `Client Secret` afin de construire les URL Apprise.

## Syntaxe

La syntaxe valide est la suivante :

- `sendpulse://{user}@{host}/{client_id}/{client_secret}`
- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}`
- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email1}/{to_email2}/{to_email3}`

La prise en charge des modeles est egalement disponible. Il vous suffit d'indiquer dans l'URL l'entier qui lui a ete assigne :

- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}?template={template_int}`

Si vous souhaitez exploiter les variables `dynamic_template_data`, creez simplement des arguments prefixes par un plus, `+`, par exemple :

- `sendpulse://{user}@{host}/{client_id}/{client_secret}/{to_email}?template={template_int}&+{sub1}=value&+{sub2}=value2`

## Détail des Paramètres

| Variable      | Obligatoire | Description                                                                                                                                                           |
| ------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user          | Oui         | Combine a `host`, il construit l'adresse e-mail configuree avec votre compte SendPulse.                                                                               |
| host          | Oui         | Combine a `user`, il construit l'adresse e-mail configuree avec votre compte SendPulse.                                                                               |
| client_id     | Oui         | Client ID associe a votre compte SendPulse.                                                                                                                           |
| client_secret | Oui         | Client Secret associe a votre compte SendPulse.                                                                                                                       |
| from          | Non         | Permet facultativement de definir l'expediteur de l'e-mail.                                                                                                           |
| to_email      | Non         | Adresse e-mail identifiant la destination du message, c'est-a-dire l'adresse _To_. Si aucune valeur n'est fournie, l'adresse de l'expediteur est utilisee a la place. |
| template      | Non         | Vous pouvez facultativement specifier l'entier identifiant un modele SendPulse deja genere comme base pour l'e-mail.                                                  |
| cc            | Non         | Partie _Carbon Copy_, CC:, de l'e-mail. Elle est entierement facultative.                                                                                             |
| bcc           | Non         | Partie _Blind Carbon Copy_, BCC:, de l'e-mail. Elle est entierement facultative.                                                                                      |

### Données de Modèle Dynamiques

Apprise prend en charge les modeles SendPulse. Il suffit de definir `?template=` ainsi que les arguments facultatifs que vous souhaitez transmettre. Vous pouvez identifier et definir ces variables dans Apprise en ajoutant simplement un plus, `+`, devant tout parametre precise dans votre URL.

Considerez le modele suivant : `1234`

Une URL Apprise peut ressembler a ceci :<br/>
`sendpulse://user@example.com?template=1234&+what=templates&+app=Apprise`

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification SendPulse :

```bash
# Supposons que notre {user} soit user@example.com
# Supposons que notre {client_id} soit client_id
# Supposons que notre {client_secret} soit client_secret
# Supposons que nous voulions envoyer un e-mail a target@example.com
# Supposons que notre {to_email} soit someone@microsoft.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sendpulse:///user@example.com/client_id/client_secret/target@example.com
```
