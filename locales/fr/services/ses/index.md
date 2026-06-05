---
title: "Notifications Amazon Web Service (AWS) - Simple Email Service (SES)"
description: "Envoyer des notifications Simple Email Service (SES)."
sidebar:
  label: "Amazon Web Service (AWS) - Simple Email Service (SES)"

source: https://aws.amazon.com/ses/

schemas:
  - ses

has_email: true
has_attachments: true

sample_urls:
  - ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/
  - ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/{ToEmail1}/{ToEmail2}/
  - ses://{FromUser}:{SessionToken}@{FromDomain}/{AccessKeyID}/{SecretKey}/{Region}/
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

Vous devrez d'abord creer un compte Amazon Web Service, AWS, pour utiliser ce service. Si vous n'en avez pas encore, une carte bancaire sera necessaire, meme si les 12 premiers mois sont gratuits. Si vous avez deja un compte, ou si vous l'utilisez via votre entreprise, vous pouvez passer a l'etape suivante.

L'etape suivante consiste a generer un _Access Key ID_ et un _Secret Access Key_ :

1. Depuis la [AWS Management Console](https://console.aws.amazon.com), recherchez **IAM** dans la section _AWS services_ ou cliquez simplement [ici](https://console.aws.amazon.com/iam/home?#/security_credentials).
1. Developpez la section **Access keys (access key ID and secret access key)**.
1. Cliquez sur **Create New Access Key**.
1. Les informations s'afficheront a l'ecran et vous pourrez aussi telecharger un fichier contenant les memes donnees. Il est recommande de le faire, car il ne sera plus possible de recuperer cette cle plus tard, sauf a la supprimer puis en creer une nouvelle.

A ce stade, on suppose donc que tout est configure et que vous disposez bien de votre _Access Key ID_ et de votre _Secret Access Key_.

Vous devez egalement disposer d'une identite d'expediteur verifiee dans SES. Depuis la [AWS Management Console](https://console.aws.amazon.com), recherchez **Simple Email Service** dans la section _AWS services_, puis rendez-vous dans **Verified identities** pour verifier l'adresse e-mail ou le domaine depuis lequel vous souhaitez envoyer.

### Identifiants temporaires (Session Token)

Les roles d'execution AWS Lambda, les roles IAM assumes via STS (`aws sts assume-role`) et d'autres sources d'identifiants de courte duree fournissent un troisieme composant en plus du _Access Key ID_ et du _Secret Access Key_ : le **Session Token** (`AWS_SESSION_TOKEN`). Ce jeton doit etre inclus lors de la signature des requetes, sans quoi AWS les rejettera avec une erreur d'autorisation.

Apprise prend en charge les jetons de session de deux facons :

- **Parametre de requete** (recommande) : ajoutez `?token={SessionToken}` a n'importe quelle URL SES -- le jeton est accepte exactement tel qu'AWS le fournit, sans echappement necessaire.
- **Champ mot de passe de l'URL** : placez le jeton dans la position mot de passe de l'URL : `ses://{user}:{SessionToken}@{host}/...` -- tout caractere `/` dans le jeton doit etre encode en `%2F`.

:::tip
Les jetons de session AWS sont encodes en base64 et contiennent frequemment des caracteres `/`. L'utilisation de `?token=` evite d'avoir a les echapper.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/`
- `ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/{ToEmail1}/{ToEmail2}/{ToEmailN}/`
- `ses://{FromUser}:{SessionToken}@{FromDomain}/{AccessKeyID}/{SecretKey}/{Region}/`
- `ses://{FromEmail}/{AccessKeyID}/{SecretKey}/{Region}/?token={SessionToken}`

Si aucune adresse e-mail cible n'est precisee, Apprise envoie le message a l'adresse `{FromEmail}` elle-meme.

## Detail des Parametres

| Variable     | Obligatoire | Description                                                                                                                                                                                                                     |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FromEmail    | \*Oui       | Adresse e-mail de l'expediteur depuis laquelle AWS envoie le message. AWS la validera par rapport a vos identites verifiees.                                                                                                    |
| AccessKeyID  | \*Oui       | _Access Key ID_ genere depuis la AWS Management Console.                                                                                                                                                                        |
| SecretKey    | \*Oui       | _Secret Access Key_ genere depuis la AWS Management Console.                                                                                                                                                                    |
| Region       | \*Oui       | Code region, par exemple **us-east-1**, **us-west-2**, **cn-north-1**.                                                                                                                                                          |
| ToEmail      | Non         | Une ou plusieurs adresses e-mail destinataires separees par des slashs. Si omises, l'adresse `FromEmail` est notifiee.                                                                                                          |
| SessionToken | Non         | Jeton de session AWS pour les identifiants temporaires/IAM (`AWS_SESSION_TOKEN`). Privilegiez `?token=` -- les jetons contiennent souvent des `/` qui doivent etre echappes en `%2F` dans la forme champ mot de passe de l'URL. |
| reply        | Non         | Definit une adresse _Reply-To_ differente de l'adresse de l'expediteur.                                                                                                                                                         |
| to           | Non         | Force ou remplace l'adresse To. Generalement deduite automatiquement.                                                                                                                                                           |
| name         | Non         | Nom d'affichage associe a l'adresse de l'expediteur.                                                                                                                                                                            |
| cc           | Non         | Adresse(s) e-mail en Carbon Copy. Plusieurs valeurs peuvent etre separees par des virgules.                                                                                                                                     |
| bcc          | Non         | Adresse(s) e-mail en Blind Carbon Copy. Plusieurs valeurs peuvent etre separees par des virgules.                                                                                                                               |
| key          | Non         | Alias pour **AccessKeyID** (`?key=`). Utile dans les configurations YAML.                                                                                                                                                       |
| access       | Non         | Alias legacy pour **AccessKeyID** (`?access=`).                                                                                                                                                                                 |
| secret       | Non         | Alias pour **SecretKey** (`?secret=`).                                                                                                                                                                                          |
| token        | Non         | Alias pour **SessionToken** (`?token=`). Utile dans les configurations YAML.                                                                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un e-mail SES basique :

```bash
# Supposons que notre {AccessKeyID} soit AHIAJGNT76XIMXDBIJYA
# Supposons que notre {SecretKey} soit bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
# Supposons que notre {Region} soit us-east-2
# Supposons que notre expediteur soit sender@example.com
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   ses://sender@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/

# Envoyer a un destinataire different
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   ses://sender@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/recipient@example.com
```

Envoyer avec des identifiants temporaires depuis un role IAM ou Lambda :

```bash
# Recommande : ?token= accepte le jeton exactement tel qu'AWS le fournit,
# sans echappement meme si le jeton contient des caracteres /
apprise -vv -b "Alerte Lambda declenchee" \
   "ses://sender@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/recipient@example.com?token=MonJetonDeSession"

# Alternatif : jeton dans le champ mot de passe de l'URL -- tout / dans le jeton
# doit etre encode en %2F
apprise -vv -b "Alerte Lambda declenchee" \
   "ses://sender:MonJetonDeSession@example.com/AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/recipient@example.com"
```

Exemple de configuration YAML avec des parametres nommes :

```yaml
urls:
  - ses://:
      - key: AHIAJGNT76XIMXDBIJYA
        secret: bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
        region: us-east-2
        from: sender@example.com
        to: recipient@example.com
        token: MonJetonDeSession
```
