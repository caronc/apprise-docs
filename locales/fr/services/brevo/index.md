---
title: "Notifications Brevo"
description: "Envoyer des notifications Brevo."
sidebar:
  label: "Brevo"

source: https://www.brevo.com

schemas:
  - brevo

has_attachments: true

sample_urls:
  - brevo://APIToken:FromEmail/ToEmail
  - brevo://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Brevo est une plateforme d'e-mail transactionnel qui expose une API HTTP JSON pour l'envoi de messages. Le plugin `NotifyBrevo` intègre cette API à Apprise avec un schéma d'URL cohérent avec d'autres fournisseurs d'e-mail comme SendGrid et Resend.

1. Rendez-vous sur [https://www.brevo.com/](https://www.brevo.com/) et connectez-vous à votre compte Brevo.
2. Accédez à **SMTP & API** dans votre compte, puis créez une **Transactional email API key** avec la permission d'envoyer des e-mails.
3. Copiez la **API key** générée. Elle sera utilisée comme partie `APIToken` de votre URL Apprise.
4. Assurez-vous d'avoir au moins une adresse d'expéditeur vérifiée, ou un domaine d'envoi authentifié, configuré dans Brevo. L'adresse **From Email** utilisée dans Apprise doit être un expéditeur valide, sinon Brevo rejettera la requête.
5. Construisez votre URL `brevo://` à l'aide de la syntaxe ci-dessous, en remplaçant la clé API, l'adresse d'expédition et les destinataires cibles.
6. Utilisez cette URL dans votre fichier de configuration Apprise ou dans vos appels CLI.

⚠️ Brevo peut vous envoyer un e-mail de confirmation, `subject: Security Alert: Verify a new IP`, indiquant que `Someone tried to use your organization account and make an API call with an IP address you have never used before. We wanted to check this activity with you.`. Vous devrez alors utiliser le lien de confirmation pour approuver l'adresse IP concernée. À partir de ce moment, Apprise devrait fonctionner sans interruption.

---

## Syntaxe

La syntaxe valide est la suivante :

- Expéditeur unique, destinataire par défaut, auto-notification. Notez que le champ `From Email` doit déjà être un `Verified Sender` chez Brevo pour que cette syntaxe fonctionne.
  - `brevo://APIToken:FromEmail`

- Destinataires explicites :
  - `brevo://APIToken:FromEmail/ToEmail`
  - `brevo://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN`

- Paramètres supplémentaires :
  - `?to=extra1@example.com,extra2@example.com`
  - `?cc=cc1@example.com,cc2@example.com`
  - `?bcc=bcc1@example.com,bcc2@example.com`
  - `?reply=Reply Name <reply@example.com>`

Le modèle d'URL du plugin est :

- `brevo://{apikey}:{from_email}`
- `brevo://{apikey}:{from_email}/{targets}`

## Détail des Paramètres

| Variable    | Requis | Description                                                                                           |
| ----------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `APIToken`  | Oui    | Clé API transactionnelle Brevo, valeur de l'en-tête `api-key`.                                        |
| `FromEmail` | Oui    | Adresse e-mail d'expéditeur vérifiée dans Brevo, `sender.email`.                                      |
| `ToEmail`   | Non    | Une ou plusieurs adresses e-mail destinataires dans le chemin URL.                                    |
| `to`        | Non    | Destinataires supplémentaires sous forme de liste séparée par des virgules dans la chaîne de requête. |
| `cc`        | Non    | Destinataires en copie, séparés par des virgules.                                                     |
| `bcc`       | Non    | Destinataires en copie cachée, séparés par des virgules.                                              |
| `reply`     | Non    | En-tête Reply-To, facultativement avec un nom d'affichage.                                            |
| `format`    | Non    | Remplace le format par défaut, `html` ou `text`, de manière cohérente avec le noyau Apprise.          |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Brevo simple à vous-même, From et To identiques :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   brevo://APIToken:user@example.com
```

Envoyer un e-mail de `user@example.com` à un destinataire unique :

```bash
apprise -vv -t "Deploiement Termine" -b "La publication s'est terminee avec succes." \
    brevo://APIToken:user@example.com/ops@example.com
```

Envoyer à plusieurs destinataires avec CC, BCC et un en-tête Reply-To :

```bash
apprise -vv -t "Rapport d'Incident" -b "Voir les journaux ci-joints pour plus de details." \
   "brevo://APIToken:alerts@example.com/oncall@example.com?to=dev1@example.com,dev2@example.com&cc=teamlead@example.com&bcc=manager@example.com&reply=Support%20Desk%20<support@example.com>"
```

Envoyer avec une pièce jointe :

```bash
apprise -vv -t "Rapport Nocturne" -b "Le dernier rapport est joint." \
   --attach /path/to/report.pdf   \
   brevo://APIToken:reports@example.com/recipient@example.com
```
