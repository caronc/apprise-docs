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

MailerSend est une plateforme d'e-mail transactionnel qui expose une API HTTP JSON pour l'envoi de messages. Le plugin `NotifyMailerSend` integre cette API a Apprise avec un schema d'URL coherent avec d'autres fournisseurs comme Brevo, Resend et SendGrid.

1. Rendez-vous sur [https://www.mailersend.com/](https://www.mailersend.com/) et connectez-vous ou creez un compte gratuit.
2. Accedez a **Settings -> API Tokens** et cliquez sur **Create Token**. Donnez-lui un nom et accordez au moins la permission **Email** (envoi). Copiez le token genere -- il s'agit de votre `APIToken`.
3. Verifiez un domaine d'envoi dans **Email -> Domains**, ou ajoutez au moins une adresse d'expediteur verifiee. L'adresse **From Email** utilisee dans Apprise doit appartenir a un domaine verifie dans MailerSend, sinon l'API rejettera la requete.
4. Construisez votre URL `mailersend://` a l'aide de la syntaxe ci-dessous et ajoutez-la a votre configuration Apprise.

---

## Syntaxe

La syntaxe valide est la suivante :

- Expediteur unique, destinataire par defaut (envoi a soi-meme) :
  - `mailersend://APIToken:FromEmail`

- Destinataire(s) explicite(s) :
  - `mailersend://APIToken:FromEmail/ToEmail`
  - `mailersend://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN`

- Destinataires supplementaires et options via la chaine de requete :
  - `?to=extra1@example.com,extra2@example.com`
  - `?cc=cc1@example.com,cc2@example.com`
  - `?bcc=bcc1@example.com,bcc2@example.com`
  - `?reply=reply@example.com`

## Detail des Parametres

| Variable    | Requis | Description                                                                                                     |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `APIToken`  | Oui    | Votre token API MailerSend avec au moins la permission d'envoi Email.                                           |
| `FromEmail` | Oui    | Adresse d'expediteur verifiee. Doit appartenir a un domaine verifie dans MailerSend.                            |
| `ToEmail`   | Non    | Une ou plusieurs adresses e-mail destinataires dans le chemin URL.                                              |
| `to`        | Non    | Destinataires supplementaires sous forme de liste separee par des virgules.                                     |
| `cc`        | Non    | Destinataires en copie, separes par des virgules.                                                               |
| `bcc`       | Non    | Destinataires en copie cachee, separes par des virgules.                                                        |
| `reply`     | Non    | Adresse e-mail de reponse (Reply-To).                                                                           |
| `format`    | Non    | MailerSend envoie du HTML par défaut. Définissez cette valeur sur `text` pour envoyer un message en texte brut. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification MailerSend simple a vous-meme (From et To identiques) :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   mailersend://APIToken:expediteur@example.com
```

Envoyer un e-mail de `expediteur@example.com` a un destinataire unique :

```bash
apprise -vv -t "Deploiement Termine" -b "La publication s'est terminee avec succes." \
    mailersend://APIToken:expediteur@example.com/destinataire@example.com
```

Envoyer a plusieurs destinataires avec CC, BCC et un en-tete Reply-To :

```bash
apprise -vv -t "Rapport d'Incident" -b "Voir les journaux ci-joints pour plus de details." \
   "mailersend://APIToken:alertes@example.com/oncall@example.com?to=dev1@example.com,dev2@example.com&cc=teamlead@example.com&bcc=manager@example.com&reply=support@example.com"
```

Envoyer avec une piece jointe :

```bash
apprise -vv -t "Rapport Nocturne" -b "Le dernier rapport est joint." \
   --attach /path/to/report.pdf \
   mailersend://APIToken:rapports@example.com/destinataire@example.com
```
