---
title: "Notifications Amazon Web Service (AWS) - Simple Notification Service (SNS)"
description: "Envoyer des notifications Simple Notification Service (SNS)."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Notification Service (SNS)"

source: https://aws.amazon.com/sns/

schemas:
  - sns

has_sms: true

sample_urls:
  - sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}
  - sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}

limits:
  max_chars: 160
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

Vous avez maintenant tout ce qu'il faut pour envoyer des SMS.

Si vous souhaitez envoyer vos notifications vers des _topics_, recherchez **Simple Notification Service** dans la [AWS Management Console](https://console.aws.amazon.com), section _AWS services_, puis configurez autant de topics que necessaire. Vous pourrez ensuite les referencer avec ce service de notification.

## Syntaxe

La syntaxe valide est la suivante :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/+{PhoneNo2}/+{PhoneNoN}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic1}/#{Topic2}/#{TopicN}`

Vous pouvez aussi melanger ces entrees :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/#{Topic1}`

Le fait de prefixer les _topics_ par un hashtag, `#`, et les numeros de telephone par un plus, `+`, permet d'eviter les ambiguities, par exemple lorsqu'un _topic_ ne contient que des chiffres. Ces caracteres restent purement facultatifs.

## Détail des Paramètres

| Variable        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                         |
| --------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccessKeyID     | Oui         | _Access Key ID_ genere depuis la AWS Management Console.                                                                                                                                                                                                                                                                            |
| AccessKeySecret | Oui         | _Access Key Secret_ genere depuis la AWS Management Console.                                                                                                                                                                                                                                                                        |
| Region          | Oui         | Code region, par exemple **us-east-1**, **us-west-2**, **cn-north-1**, etc.                                                                                                                                                                                                                                                         |
| PhoneNo         | Non         | Le numero de telephone doit inclure le prefixe d'appel du pays. Vous pouvez facultativement prefixer tout le numero avec un plus, `+`, pour forcer son interpretation comme numero de telephone si la detection automatique ne suffit pas. Ce champ accepte aussi les parentheses, espaces et tirets pour une meilleure lisibilite. |
| Topic           | Non         | Topic vers lequel publier votre message.                                                                                                                                                                                                                                                                                            |

:::note
Ce service de notification n'utilise pas le champ `title` ; seul le _body_ est transmis.
:::

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un message SMS :

```bash
# Supposons que notre {AccessKeyID} soit AHIAJGNT76XIMXDBIJYA
# Supposons que notre {AccessKeySecret} soit bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Supposons que notre {Region} soit us-east-2
# Supposons que notre {PhoneNo}
#   - se trouve aux Etats-Unis, donc avec l'indicatif pays +1
#   - corresponde au numero 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223

# la variante suivante aurait aussi fonctionne
# les espaces, parentheses et tirets sont acceptes dans un numero :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+1(800)555-1223

```
