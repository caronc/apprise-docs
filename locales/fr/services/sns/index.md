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

Vous devrez d'abord créer un compte Amazon Web Service (AWS) pour utiliser ce service. Si vous n'en avez pas encore, une carte bancaire sera nécessaire, même si les 12 premiers mois sont gratuits. Si vous avez déjà un compte, ou si vous l'utilisez via votre entreprise, vous pouvez passer à l'étape suivante.

L'étape suivante consiste à générer un _Access Key ID_ et un _Secret Access Key_ :

1. Depuis la [AWS Management Console](https://console.aws.amazon.com), recherchez **IAM** dans la section _AWS services_ ou cliquez simplement [ici](https://console.aws.amazon.com/iam/home?#/security_credentials).
1. Développez la section **Access keys (access key ID and secret access key)**.
1. Cliquez sur **Create New Access Key**.
1. Les informations s'afficheront à l'écran et vous pourrez aussi télécharger un fichier contenant les mêmes données. Il est recommandé de le faire, car il ne sera plus possible de récupérer cette clé plus tard, sauf à la supprimer puis à en créer une nouvelle.

À ce stade, on suppose donc que tout est configuré et que vous disposez bien de votre _Access Key ID_ et de votre _Secret Access Key_.

Vous avez maintenant tout ce qu'il faut pour envoyer des SMS.

Si vous souhaitez envoyer vos notifications vers des _topics_, recherchez **Simple Notification Service** dans la [AWS Management Console](https://console.aws.amazon.com), section _AWS services_, puis configurez autant de topics que nécessaire. Vous pourrez ensuite les référencer avec ce service de notification.

### Identifiants temporaires (Session Token)

Les rôles d'exécution AWS Lambda, les rôles IAM assumés via STS (`aws sts assume-role`) et d'autres sources d'identifiants de courte durée fournissent un troisième composant en plus du _Access Key ID_ et du _Secret Access Key_ : le **Session Token** (`AWS_SESSION_TOKEN`). Ce jeton doit être inclus lors de la signature des requêtes, sans quoi AWS les rejettera avec une erreur d'autorisation.

Apprise prend en charge les jetons de session de deux façons :

- **Paramètre de requête** (recommandé) : ajoutez `?token={SessionToken}` à n'importe quelle URL SNS -- le jeton est accepté exactement tel qu'AWS le fournit, sans échappement nécessaire.
- **Préfixe dans l'URL** : placez le jeton avant le _Access Key ID_ en les séparant par `@` : `sns://{SessionToken}@{AccessKeyID}/...` -- tout caractère `/` dans le jeton doit être encodé en `%2F`.

:::tip
Les jetons de session AWS sont encodés en base64 et contiennent fréquemment des caractères `/`. L'utilisation de `?token=` évite d'avoir à les échapper.
:::

## Syntaxe

La syntaxe valide est la suivante :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/+{PhoneNo2}/+{PhoneNoN}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic1}/#{Topic2}/#{TopicN}`
- `sns://{SessionToken}@{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo}`
- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/#{Topic}?token={SessionToken}`

Vous pouvez aussi mélanger numéros de téléphone et topics :

- `sns://{AccessKeyID}/{AccessKeySecret}/{Region}/+{PhoneNo1}/#{Topic1}`

Le fait de préfixer les _topics_ par un hashtag (`#`) et les numéros de téléphone par un signe plus (`+`) permet d'éviter les ambiguïtés, par exemple lorsqu'un _topic_ ne contient que des chiffres. Ces caractères restent purement facultatifs.

### Modes de fonctionnement

Le comportement de SNS varie selon le type de cibles :

| Mode           | Quand il s'applique                                                 | Gestion du titre                                | Limite du corps |
| -------------- | ------------------------------------------------------------------- | ----------------------------------------------- | --------------- |
| `sms` (défaut) | Numéros de téléphone présents, ou mélange numéros + topics          | Le titre est ajouté au début du corps           | 160 caractères  |
| `topic`        | Cibles uniquement des topics (auto-détecté), ou `?mode=topic` forcé | Le titre est envoyé comme champ SNS **Subject** | 256 Ko          |

Le mode est **auto-détecté** à partir de votre URL : si toutes les cibles sont des topics, le mode `topic` est utilisé ; si des numéros de téléphone sont présents, le mode `sms` est utilisé. Vous pouvez forcer le mode avec `?mode=sms` ou `?mode=topic`.

:::note
En mode `topic`, le titre devient le champ SNS **Subject**. Les abonnés par e-mail au topic recevront une ligne d'objet appropriée. Les points de terminaison SMS abonnés au topic ne reçoivent pas de champ Subject -- il s'agit d'une contrainte de l'API AWS.

AWS n'accepte qu'un objet sur une seule ligne et de moins de 100 caractères : Apprise remplace donc les retours à la ligne de votre titre par des espaces et le raccourcit à 99 caractères si nécessaire.
:::

## Détail des Paramètres

| Variable        | Obligatoire | Description                                                                                                                                                                                                     |
| --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccessKeyID     | \*Oui       | _Access Key ID_ généré depuis la AWS Management Console.                                                                                                                                                        |
| AccessKeySecret | \*Oui       | _Access Key Secret_ généré depuis la AWS Management Console.                                                                                                                                                    |
| Region          | \*Oui       | Code de région, par exemple **us-east-1**, **us-west-2**, **cn-north-1**.                                                                                                                                       |
| PhoneNo         | Non         | Le numéro de téléphone doit inclure l'indicatif du pays. Vous pouvez facultativement le préfixer par `+`. Les parenthèses, espaces et tirets sont acceptés.                                                     |
| Topic           | Non         | Nom d'un topic SNS. Vous pouvez facultativement le préfixer par `#`.                                                                                                                                            |
| SessionToken    | Non         | Jeton de session AWS pour les identifiants temporaires/IAM (`AWS_SESSION_TOKEN`). Privilégiez `?token=` -- les jetons contiennent souvent des `/` qui doivent être échappés en `%2F` dans la forme préfixe `@`. |
| mode            | Non         | Définissez `sms` ou `topic` pour remplacer la détection automatique. Par défaut `sms` si des numéros de téléphone sont présents ; `topic` si seuls des topics sont listés.                                      |
| key             | Non         | Alias pour **AccessKeyID** (`?key=`). Utile dans les configurations YAML.                                                                                                                                       |
| access          | Non         | Ancien alias pour **AccessKeyID** (`?access=`).                                                                                                                                                                 |
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
#   - se trouve aux États-Unis, donc avec l'indicatif pays +1
#   - corresponde au numéro 800-555-1223
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223

# la variante suivante aurait aussi fonctionné
# les espaces, parenthèses et tirets sont acceptés dans un numéro :
apprise -vv -t "Titre du Message de Test" -b "Corps du Message de Test" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+1(800)555-1223
```

Envoyer vers un topic SNS (le titre devient le champ Subject pour les abonnés par e-mail) :

```bash
# Le mode topic est auto-détecté quand seuls des topics sont listés
apprise -vv -t "Sujet de l'Alerte" -b "Corps de l'Alerte" \
   sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/#MonTopicAlertes

# Forcer explicitement le mode topic
apprise -vv -t "Sujet de l'Alerte" -b "Corps de l'Alerte" \
   "sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/#MonTopicAlertes?mode=topic"
```

Envoyer avec des identifiants temporaires depuis un rôle IAM ou Lambda :

```bash
# Recommandé : ?token= accepte le jeton exactement tel qu'AWS le fournit,
# sans échappement même si le jeton contient des caractères /
apprise -vv -b "Alerte Lambda déclenchée" \
   "sns://AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223?token=MonJetonDeSession"

# Alternative : jeton en position de préfixe dans l'URL -- tout / dans le jeton
# doit être encodé en %2F
apprise -vv -b "Alerte Lambda déclenchée" \
   "sns://MonJetonDeSession@AHIAJGNT76XIMXDBIJYA/bu1dHSdO22pfaaVy/wmNsdljF4C07D3bndi9PQJ9/us-east-2/+18005551223"
```

Exemple de configuration YAML avec des paramètres nommés :

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
