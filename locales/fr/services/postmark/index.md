---
title: "Notifications Postmark"
description: "Envoyer des notifications par e-mail transactionnel via Postmark."
sidebar:
  label: "Postmark"

source: https://postmarkapp.com

schemas:
  - postmark

limits:
  max_chars: 10485760

has_email: true
has_attachments: true

sample_urls:
  - postmark://APIToken:FromEmail/ToEmail
  - postmark://APIToken:FromEmail/ToEmail1/ToEmail2/ToEmailN
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du Compte

Postmark est un service de livraison d'e-mails transactionnels avec une API HTTP JSON. Pour l'utiliser avec Apprise :

1. Rendez-vous sur [https://account.postmarkapp.com/](https://account.postmarkapp.com/) et connectez-vous (ou créez un compte).
2. Créez un **Serveur** (ou sélectionnez-en un existant) depuis le tableau de bord Postmark.
3. Dans les paramètres du serveur, cliquez sur **API Tokens** dans la barre latérale gauche.
4. Copiez le **Server API Token** affiché sur cette page. Ce jeton est utilisé comme `APIToken` dans votre URL Apprise.
5. Assurez-vous que votre adresse d'expédition est vérifiée. Rendez-vous sur [Sender Signatures](https://account.postmarkapp.com/signature_domains) et ajoutez votre domaine d'envoi ou une adresse d'expéditeur spécifique. Postmark rejettera les e-mails provenant d'expéditeurs non vérifiés.

---

## Syntaxe

La syntaxe valide est la suivante :

- `postmark://{APIToken}:{FromEmail}`
- `postmark://{APIToken}:{FromEmail}/{ToEmail}`
- `postmark://{APIToken}:{FromEmail}/{ToEmail1}/{ToEmail2}/{ToEmailN}`

## Détail des Paramètres

| Variable    | Requis | Description                                                                                                                                          |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APIToken`  | \*Oui  | Le Server API Token trouvé sur la page API Tokens de votre serveur Postmark.                                                                         |
| `FromEmail` | \*Oui  | Une adresse e-mail ou un domaine d'expéditeur vérifié. Postmark rejette les e-mails provenant d'expéditeurs non vérifiés.                            |
| `ToEmail`   | Non    | Une ou plusieurs adresses e-mail destinataires placées dans le chemin URL. Si omis, la notification est envoyée à `FromEmail`.                       |
| `to`        | Non    | Destinataires supplémentaires sous forme de liste séparée par des virgules (`?to=a@example.com,b@example.com`).                                      |
| `name`      | Non    | Nom d'affichage de l'expéditeur (`?name=Alice`).                                                                                                     |
| `cc`        | Non    | Destinataires en copie, séparés par des virgules (`?cc=cc@example.com`). Les destinataires nommés sont pris en charge : `?cc=Alice<cc@example.com>`. |
| `bcc`       | Non    | Destinataires en copie cachée, séparés par des virgules (`?bcc=bcc@example.com`).                                                                    |
| `reply`     | Non    | Adresse de réponse, avec nom d'affichage optionnel (`?reply=support@example.com` ou `?reply=Support<support@example.com>`).                          |
| `format`    | Non    | Remplace le format du corps par défaut. Définissez `text` pour envoyer du texte brut au lieu de HTML.                                                |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification de base à soi-même (expéditeur et destinataire identiques) :

```bash
apprise -vv -t "Titre de Test" -b "Message de Test" \
   postmark://APIToken:user@example.com
```

Envoyer depuis une adresse vers un destinataire unique :

```bash
apprise -vv -t "Deploiement Termine" -b "La publication s'est terminee avec succes." \
    postmark://APIToken:alerts@example.com/ops@example.com
```

Envoyer a plusieurs destinataires avec CC, BCC et un nom d'expéditeur personnalisé :

```bash
apprise -vv -t "Rapport d'Incident" -b "Voir les journaux ci-joints pour plus de details." \
   "postmark://APIToken:alerts@example.com/oncall@example.com/dev@example.com?cc=lead@example.com&bcc=manager@example.com&name=Systeme+d+Alertes"
```

Envoyer avec une pièce jointe :

```bash
apprise -vv -t "Rapport Nocturne" -b "Le dernier rapport est joint." \
   --attach /path/to/report.pdf \
   postmark://APIToken:reports@example.com/recipient@example.com
```

Envoyer en texte brut au lieu de HTML :

```bash
apprise -vv -t "Alerte Texte Brut" -b "Quelque chose s'est produit." \
   "postmark://APIToken:user@example.com?format=text"
```
