---
title: "Notifications AWS End User Messaging Social (WhatsApp)"
description: "Envoyer des notifications WhatsApp via AWS."
sidebar:
  label: "AWS End User Messaging Social (WhatsApp)"

source: https://aws.amazon.com/end-user-messaging/

schemas:
  - awswhatsapp

has_chat: true
has_attachments: true

sample_urls:
  - awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}
  - awswhatsapp://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}

limits:
  max_chars: 1024
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

Ce service envoie des messages WhatsApp via AWS End User Messaging Social en utilisant vos identifiants AWS. Si vous préférez passer directement par Meta avec un jeton d'accès Meta, consultez [WhatsApp](../whatsapp/).

## Configuration du compte

1. Dans la console AWS End User Messaging Social, associez votre compte WhatsApp Business et enregistrez un numéro de téléphone expéditeur. Consultez le [guide de configuration AWS](https://docs.aws.amazon.com/social-messaging/latest/userguide/what-is-service.html).
1. Copiez l'**identifiant du numéro de téléphone** de l'expéditeur. Il ressemble à `phone-number-id-01234567890123456789012345678901`. Ce n'est pas votre véritable numéro de téléphone.
1. Générez un _Access Key ID_ et un _Secret Access Key_ pour un utilisateur IAM autorisé à appeler `social-messaging:SendWhatsAppMessage`. La page [SNS](../sns/) explique comment créer ces clés d'accès.

WhatsApp n'autorise l'envoi d'un message libre qu'à une personne qui vous a écrit au cours des dernières 24 heures. En dehors de cette fenêtre, vous devez envoyer un modèle approuvé (voir [Modèles](#modèles)).

### Identifiants temporaires (Session Token)

Les identifiants de courte durée (par exemple obtenus avec `aws sts assume-role` ou un rôle AWS Lambda) comportent une troisième valeur, le **Session Token**. Apprise l'accepte de deux façons :

- **Paramètre de requête** (recommandé) : ajoutez `?token={SessionToken}`. Le jeton peut être utilisé exactement tel qu'AWS le fournit.
- **Préfixe d'URL** : `awswhatsapp://{SessionToken}@{AccessKeyID}/...`. Tout `/` dans le jeton doit être écrit `%2F`.

## Syntaxe

La syntaxe valide est la suivante :

- `awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}`
- `awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo1}/{PhoneNo2}/{PhoneNoN}`
- `awswhatsapp://{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}?template={Template}`
- `awswhatsapp://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/{FromPhoneID}/{PhoneNo}`

## Détail des Paramètres

| Variable        | Requis | Description                                                                                                      |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| AccessKeyID     | Oui    | L'_Access Key ID_ fourni par la console AWS.                                                                     |
| AccessKeySecret | Oui    | Le _Secret Access Key_ fourni par la console AWS.                                                                |
| Region          | Oui    | La région AWS de votre expéditeur, par exemple **us-east-1**.                                                    |
| FromPhoneID     | Oui    | L'identifiant AWS de l'expéditeur, commençant par `phone-number-id-`.                                            |
| PhoneNo         | Oui    | Un ou plusieurs numéros de destinataires avec l'indicatif du pays. Parenthèses, espaces et tirets sont acceptés. |
| SessionToken    | Non    | Un jeton de session pour les identifiants temporaires. Préférez `?token=`.                                       |
| template        | Non    | Le nom d'un modèle approuvé à envoyer à la place d'un message libre.                                             |
| lang            | Non    | La langue du modèle ; elle doit correspondre au modèle approuvé. Par défaut `en_US`.                             |
| bucket          | Non    | Un compartiment S3 privé utilisé pour envoyer des pièces jointes. Voir [Pièces jointes](#pièces-jointes).        |
| key             | Non    | Un alias de **AccessKeyID** (`?key=`).                                                                           |
| access          | Non    | Un alias de **AccessKeyID** (`?access=`).                                                                        |
| secret          | Non    | Un alias de **AccessKeySecret** (`?secret=`).                                                                    |
| token           | Non    | Un alias de **SessionToken** (`?token=`).                                                                        |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Modèles

Les paramètres d'un modèle se remplissent de la même façon qu'avec le service [WhatsApp](../whatsapp/) :

- `:1=Production` place le texte `Production` dans `{{1}}`.
- `:body=2` place le corps de la notification dans `{{2}}`.
- `:type=3` place le type de notification (`info`, `success`, `warning` ou `failure`) dans `{{3}}`.

Sans paramètres, le modèle est envoyé tel quel, ce qui convient aux modèles statiques comme `hello_world`.

## Pièces jointes

Ajoutez `?bucket={Bucket}` pour envoyer des pièces jointes. Chaque fichier est brièvement déposé dans le dossier `apprise/` de ce compartiment le temps que WhatsApp le copie, puis il est supprimé.

- Le compartiment doit être privé et se trouver dans le **même compte et la même région AWS** que votre expéditeur.
- Votre utilisateur IAM a aussi besoin de `social-messaging:PostWhatsAppMessageMedia`, ainsi que de `s3:PutObject`, `s3:GetObject` et `s3:DeleteObject` sur `apprise/*`.

Les images, l'audio et la vidéo sont envoyés comme tels ; tout autre fichier est envoyé comme document. Chaque pièce jointe est envoyée dans son propre message après le texte. Les [limites de types et de tailles de fichiers](https://docs.aws.amazon.com/social-messaging/latest/userguide/supported-media-types.html) de WhatsApp s'appliquent.

## Exemples

Envoyer un message WhatsApp :

```bash
# Supposons que notre {AccessKeyID} soit AHIAJGNT76XIMXDBIJYA
# Supposons que notre {AccessKeySecret} soit bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Supposons que notre {Region} soit us-east-1
# Supposons que notre {FromPhoneID} soit phone-number-id-0123456789abcdef0123456789abcdef
# Supposons que notre {PhoneNo} soit +1 555-555-0123
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   awswhatsapp://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-1/phone-number-id-0123456789abcdef0123456789abcdef/15555550123
```

Envoyer un modèle approuvé `system_alert` avec le corps placé dans `{{1}}` :

```bash
apprise -vv -b "La sauvegarde a échoué" \
   "awswhatsapp://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-1/phone-number-id-0123456789abcdef0123456789abcdef/15555550123?template=system_alert&:body=1"
```

Envoyer une pièce jointe :

```bash
apprise -vv -b "Votre rapport est prêt" -a rapport.pdf \
   "awswhatsapp://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-1/phone-number-id-0123456789abcdef0123456789abcdef/15555550123?bucket=my-staging-bucket"
```
