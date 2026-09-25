---
title: "Notifications MailerSend"
description: "Envoyer des notifications par e-mail via MailerSend."
sidebar:
  label: "MailerSend"

source: https://www.mailersend.com

schemas:
  - mailersend

has_email: true
has_attachments: true

body_formats:
  - html: default
  - text

sample_urls:
  - mailersend://APIToken:FromEmail/ToEmail
  - mailersend://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

MailerSend est une plateforme d'e-mail transactionnel qui expose une API HTTP JSON pour l'envoi de messages. Le plugin `NotifyMailerSend` intègre cette API à Apprise avec un schéma d'URL cohérent avec d'autres fournisseurs comme Brevo, Resend et SendGrid.

1. Rendez-vous sur [https://www.mailersend.com/](https://www.mailersend.com/) et connectez-vous ou créez un compte gratuit.
2. Accédez à **Settings -> API Tokens** et cliquez sur **Create Token**. Donnez-lui un nom et accordez au moins la permission **Email** (envoi). Copiez le jeton généré : il s'agit de votre `APIToken`.
3. Vérifiez un domaine d'envoi dans **Email -> Domains**, ou ajoutez au moins une adresse d'expéditeur vérifiée. L'adresse **From Email** utilisée dans Apprise doit appartenir à un domaine vérifié dans MailerSend, sinon l'API rejettera la requête.
4. Construisez votre URL `mailersend://` à l'aide de la syntaxe ci-dessous et ajoutez-la à votre configuration Apprise.

---

## Syntaxe

La syntaxe valide est la suivante :

- Expéditeur unique, destinataire par défaut (envoi à soi-même) :
  - `mailersend://APIToken:FromEmail`

- Destinataire(s) explicite(s) :
  - `mailersend://APIToken:FromEmail/ToEmail`
  - `mailersend://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN`

- Destinataires supplémentaires et options dans la chaîne de requête :
  - `?to=extra1@example.com,extra2@example.com`
  - `?cc=cc1@example.com,cc2@example.com`
  - `?bcc=bcc1@example.com,bcc2@example.com`
  - `?reply=reply@example.com`

## Détail des Paramètres

| Variable    | Requis | Description                                                                                                     |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `APIToken`  | Oui    | Votre jeton API MailerSend avec au moins la permission d'envoi d'e-mails.                                       |
| `FromEmail` | Oui    | Adresse d'expéditeur vérifiée. Elle doit appartenir à un domaine vérifié dans MailerSend.                       |
| `ToEmail`   | Non    | Une ou plusieurs adresses e-mail destinataires dans le chemin URL.                                              |
| `to`        | Non    | Destinataires supplémentaires sous forme de liste séparée par des virgules.                                     |
| `cc`        | Non    | Destinataires en copie, séparés par des virgules.                                                               |
| `bcc`       | Non    | Destinataires en copie cachée, séparés par des virgules.                                                        |
| `reply`     | Non    | Adresse e-mail de réponse (Reply-To).                                                                           |
| `format`    | Non    | MailerSend envoie du HTML par défaut. Définissez cette valeur sur `text` pour envoyer un message en texte brut. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification MailerSend simple à vous-même (From et To identiques) :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   mailersend://APIToken:expediteur@example.com
```

Envoyer un e-mail de `expediteur@example.com` à un destinataire unique :

```bash
apprise -vv -t "Déploiement terminé" -b "La publication s'est terminée avec succès." \
    mailersend://APIToken:expediteur@example.com/destinataire@example.com
```

Envoyer à plusieurs destinataires avec CC, BCC et un en-tête Reply-To :

```bash
apprise -vv -t "Rapport d'incident" -b "Voir les journaux ci-joints pour plus de détails." \
   "mailersend://APIToken:alertes@example.com/oncall@example.com?to=dev1@example.com,dev2@example.com&cc=teamlead@example.com&bcc=manager@example.com&reply=support@example.com"
```

Envoyer avec une pièce jointe :

```bash
apprise -vv -t "Rapport Nocturne" -b "Le dernier rapport est joint." \
   --attach /path/to/report.pdf \
   mailersend://APIToken:rapports@example.com/destinataire@example.com
```
