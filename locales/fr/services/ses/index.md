---
title: "Notifications Amazon Web Service (AWS) - Simple Email Service (SES)"
description: "Envoyer des notifications Simple Email Service (SES)."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Email Service (SES)"

source: https://aws.amazon.com/ses/

schemas:
  - ses

has_attachments: true

sample_urls:
  - ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/
  - ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/{ToEmail1}/{ToEmail2}/{ToEmailN}/
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devrez d'abord creer un compte Amazon Web Service, AWS, pour utiliser ce service. Si vous n'en avez pas encore, une carte bancaire sera necessaire, meme si les 12 premiers mois sont gratuits. Si vous avez deja un compte, ou si vous l'utilisez via votre entreprise, vous pouvez passer a l'etape suivante.

L'etape suivante consiste a generer un _Access Key ID_ et un _Secret Access Key_ :

1. Depuis la [AWS Management Console](https://console.aws.amazon.com), recherchez **IAM** dans la section _AWS services_ ou cliquez simplement [ici](https://console.aws.amazon.com/iam/home?#/security_credentials).
1. Developpez la section **Access keys (access key ID and secret access key)**.
1. Cliquez sur **Create New Access Key**.
1. Les informations s'afficheront a l'ecran et vous pourrez aussi telecharger un fichier contenant les memes donnees. Il est recommande de le faire, car il ne sera plus possible de recuperer cette cle plus tard, sauf a la supprimer puis en creer une nouvelle.

A ce stade, on suppose donc que tout est configure et que vous disposez bien de votre _Access Key ID_ et de votre _Secret Access Key_.

Vous avez maintenant tout ce qu'il faut pour envoyer des messages SES, c'est-a-dire des e-mails.

Si vous souhaitez tirer parti d'envois vers des _topics_, recherchez **Simple Notification Service** dans la [AWS Management Console](https://console.aws.amazon.com), section _AWS services_, puis configurez autant de topics que necessaire. Vous pourrez ensuite aussi les referencer avec ce service de notification.

## Syntaxe

La syntaxe valide est la suivante :

- `ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/`
- `ses://{from}/{aws_access_key}/{aws_secret_key}/{region}/{ToEmail1}/{ToEmail2}/{ToEmailN}/`

## Détail des Paramètres

| Variable      | Obligatoire | Description                                                                                                                                                                                              |
| ------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | Oui         | Adresse e-mail source depuis laquelle AWS envoie le message. AWS la validera par rapport a votre compte lorsque vous l'associez a `aws_access_key` et `aws_secret_key`.                                  |
| access        | Oui         | _Access Key ID_ genere depuis la AWS Management Console.                                                                                                                                                 |
| secret        | Oui         | _Access Key Secret_ genere depuis la AWS Management Console.                                                                                                                                             |
| region        | Oui         | Code region, par exemple **us-east-1**, **us-west-2**, **cn-north-1**, etc.                                                                                                                              |
| target_emails | Oui         | Une ou plusieurs adresses e-mail separees par des slashs auxquelles remettre votre notification. Si aucune adresse n'est precisee, l'adresse `from` sera notifiee.                                       |
| reply         | Non         | Si vous souhaitez que l'adresse _ReplyTo_ soit differente de votre propre adresse e-mail, vous pouvez la specifier ici.                                                                                  |
| to            | Non         | Permet de forcer, ou definir, l'adresse **To** de l'e-mail. Cela n'est necessaire que dans certains cas particuliers. Le script de notification est generalement assez intelligent pour le deduire seul. |
| name          | Non         | Relativement a `{from_email}`, permet d'associer un nom a votre adresse _ReplyTo_.                                                                                                                       |
| cc            | Non         | Adresse(s) e-mail en Carbon Copy. Plusieurs valeurs peuvent etre separees par des espaces et/ou des virgules.                                                                                            |
| bcc           | Non         | Adresse(s) e-mail en Blind Carbon Copy. Plusieurs valeurs peuvent etre separees par des espaces et/ou des virgules.                                                                                      |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un e-mail SES :

```bash
# Supposons que notre {AccessKeyID} soit AHIAJGNT76XIMXDBIJYA
# Supposons que notre {AccessKeySecret} soit bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Supposons que notre {Region} soit us-east-2
# Supposons que notre {Email} soit test@test.com
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   ses://test@test.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/
```
