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
  - sns://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}

limits:
  - name: "SMS"
    max_chars: 160
  - name: "Topic"
    max_chars: 256000
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

Vous avez maintenant tout ce qu'il faut pour envoyer des SMS.

Si vous souhaitez envoyer vos notifications vers des _topics_, recherchez **Simple Notification Service** dans la [AWS Management Console](https://console.aws.amazon.com), section _AWS services_, puis configurez autant de topics que necessaire. Vous pourrez ensuite les referencer avec ce service de notification.

### Identifiants temporaires (Session Token)

Les roles d'execution AWS Lambda, les roles IAM assumes via STS (`aws sts assume-role`) et d'autres sources d'identifiants de courte duree fournissent un troisieme composant en plus du _Access Key ID_ et du _Secret Access Key_ : le **Session Token** (`AWS_SESSION_TOKEN`). Ce jeton doit etre inclus lors de la signature des requetes, sans quoi AWS les rejettera avec une erreur d'autorisation.

Apprise prend en charge les jetons de session de deux facons :

- **Parametre de requete** (recommande) : ajoutez `?token={SessionToken}` a n'importe quelle URL SNS -- le jeton est accepte exactement tel qu'AWS le fournit, sans echappement necessaire.
- **Prefixe dans l'URL** : placez le jeton avant le _Access Key ID_ en les separant par `@` : `sns://{SessionToken}@{AccessKeyID}/...` -- tout caractere `/` dans le jeton doit etre encode en `%2F`.

:::tip
Les jetons de session AWS sont encodes en base64 et contiennent frequemment des caracteres `/`. L'utilisation de `?token=` evite d'avoir a les echapper.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/+{PhoneNo2}/+{PhoneNoN}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic1}/#{Topic2}/#{TopicN}`
- `sns://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}?token={SessionToken}`

Vous pouvez aussi melanger numeros de telephone et topics :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/#{Topic1}`

Le fait de prefixer les _topics_ par un hashtag, `#`, et les numeros de telephone par un plus, `+`, permet d'eviter les ambiguites, par exemple lorsqu'un _topic_ ne contient que des chiffres. Ces caracteres restent purement facultatifs.

### Modes de fonctionnement

Le comportement de SNS varie selon le type de cibles :

| Mode           | Quand il s'applique                                                 | Gestion du titre                                | Limite du corps |
| -------------- | ------------------------------------------------------------------- | ----------------------------------------------- | --------------- |
| `sms` (defaut) | Cibles avec numeros de telephone, ou melange                        | Le titre est prepend au corps                   | 160 caracteres  |
| `topic`        | Cibles uniquement des topics (auto-detecte), ou `?mode=topic` force | Le titre est envoye comme champ SNS **Subject** | 256 Ko          |

Le mode est **auto-detecte** a partir de votre URL : si toutes les cibles sont des topics, le mode `topic` est utilise ; si des numeros de telephone sont presents, le mode `sms` est utilise. Vous pouvez forcer le mode avec `?mode=sms` ou `?mode=topic`.

:::note
En mode `topic`, le titre devient le champ SNS **Subject**. Les abonnes par e-mail au topic recevront une ligne d'objet appropriee. Les points de terminaison SMS abonnes au topic ne recoivent pas de champ Subject -- il s'agit d'une contrainte de l'API AWS.
:::

## Detail des Parametres

| Variable        | Obligatoire | Description                                                                                                                                                                                                     |
| --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccessKeyID     | \*Oui       | _Access Key ID_ genere depuis la AWS Management Console.                                                                                                                                                        |
| AccessKeySecret | \*Oui       | _Access Key Secret_ genere depuis la AWS Management Console.                                                                                                                                                    |
| Region          | \*Oui       | Code region, par exemple **us-east-1**, **us-west-2**, **cn-north-1**.                                                                                                                                          |
| PhoneNo         | Non         | Le numero de telephone doit inclure le prefixe d'appel du pays. Vous pouvez facultativement le prefixer par `+`. Les parentheses, espaces et tirets sont acceptes.                                              |
| Topic           | Non         | Nom d'un topic SNS. Vous pouvez facultativement le prefixer par `#`.                                                                                                                                            |
| SessionToken    | Non         | Jeton de session AWS pour les identifiants temporaires/IAM (`AWS_SESSION_TOKEN`). Privilegiez `?token=` -- les jetons contiennent souvent des `/` qui doivent etre echappes en `%2F` dans la forme prefixe `@`. |
| mode            | Non         | Definissez `sms` ou `topic` pour remplacer la detection automatique. Par defaut `sms` si des numeros de telephone sont presents ; `topic` si seuls des topics sont listes.                                      |
| key             | Non         | Alias pour **AccessKeyID** (`?key=`). Utile dans les configurations YAML.                                                                                                                                       |
| access          | Non         | Alias legacy pour **AccessKeyID** (`?access=`).                                                                                                                                                                 |
| secret          | Non         | Alias pour **AccessKeySecret** (`?secret=`).                                                                                                                                                                    |
| token           | Non         | Alias pour **SessionToken** (`?token=`). Utile dans les configurations YAML.                                                                                                                                    |

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

Envoyer vers un topic SNS (le titre devient le champ Subject pour les abonnes par e-mail) :

```bash
# Le mode topic est auto-detecte quand seuls des topics sont listes
apprise -vv -t "Sujet de l'Alerte" -b "Corps de l'Alerte" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/#MonTopicAlertes

# Forcer explicitement le mode topic
apprise -vv -t "Sujet de l'Alerte" -b "Corps de l'Alerte" \
   "sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/#MonTopicAlertes?mode=topic"
```

Envoyer avec des identifiants temporaires depuis un role IAM ou Lambda :

```bash
# Recommande : ?token= accepte le jeton exactement tel qu'AWS le fournit,
# sans echappement meme si le jeton contient des caracteres /
apprise -vv -b "Alerte Lambda declenchee" \
   "sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223?token=MonJetonDeSession"

# Alternatif : jeton en position de prefixe dans l'URL -- tout / dans le jeton
# doit etre encode en %2F
apprise -vv -b "Alerte Lambda declenchee" \
   "sns://MonJetonDeSession@AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223"
```

Exemple de configuration YAML avec des parametres nommes :

```yaml
urls:
  - sns://:
      - access_key_id: AHIAJGNT76XIMXDBIJYA
        secret_access_key: bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9
        region: us-east-2
        to: "+18005551223,#MonTopicAlertes"
        token: MonJetonDeSession
        mode: topic
```
