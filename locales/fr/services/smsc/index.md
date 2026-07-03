---
title: "Notifications SMSC"
description: "Envoyer des notifications SMS et MMS via SMSC (smsc.ru)."
sidebar:
  label: "SMSC"

source: https://smsc.ru/

schemas:
  - smsc: insecure

has_sms: true
has_attachments: true

keywords: "smsc.ru, smsc.kz"

sample_urls:
  - smsc://{login}:{password}@{toPhoneNo}
  - smsc://{login}:{password}@{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}

limits:
  max_chars: 160
---

<!-- SPONSORS:BANNER -->
<!-- SERVICE:DETAILS -->

## Configuration du compte

1. Creez un compte sur [smsc.ru](https://smsc.ru/) (egalement disponible sur [smsc.kz](https://smsc.kz/)).
2. Alimentez votre compte -- chaque appel API consomme des credits.
3. Votre **login** et votre **mot de passe** sont les memes identifiants que vous utilisez pour vous connecter au portail web SMSC.

Aucune cle API supplementaire ni enregistrement d'application n'est requis.

:::note
Lorsqu'une ou plusieurs pieces jointes sont incluses dans la notification, le plugin envoie automatiquement un **MMS** au lieu d'un SMS. Aucune configuration supplementaire n'est necessaire.
:::

## Syntaxe

Les syntaxes valides sont les suivantes :

- `smsc://{login}:{password}@{toPhoneNo}`
- `smsc://{login}:{password}@{toPhoneNo1}/{toPhoneNo2}/{toPhoneNoN}`

## Detail des parametres

| Variable  | Requis | Description                                                                                                                                                        |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| login     | \*Oui  | Votre identifiant de compte SMSC.                                                                                                                                  |
| password  | \*Oui  | Votre mot de passe de compte SMSC.                                                                                                                                 |
| toPhoneNo | \*Oui  | Un ou plusieurs numeros de telephone destinataires au format E.164. Separez plusieurs numeros par un `/` dans le chemin de l'URL, ou utilisez le parametre `?to=`. |
| sender    | Non    | Identifiant expediteur affiche aux destinataires. Jusqu'a 11 caracteres alphanumeriques ou 15 chiffres, sous reserve d'approbation par SMSC.                       |
| translit  | Non    | Definir a `yes` pour translitterer les caracteres cyrilliques en latin avant l'envoi. Par defaut : `no`.                                                           |
| to        | Non    | Alias pour les numeros de telephone cibles. Accepte une liste separee par des virgules et peut etre combine avec des cibles dans le chemin de l'URL.               |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer un SMS via SMSC :

```bash
# login=monlogin, password=monmotdepasse, destinataire : +7-123-456-7890
apprise -vv -t "Titre test" -b "Corps du message" \
   "smsc://monlogin:monmotdepasse@+71234567890"
```

Envoyer a plusieurs destinataires :

```bash
apprise -vv -t "Alerte" -b "Serveur hors ligne" \
   "smsc://monlogin:monmotdepasse@+71234567890/+79876543210"
```

Envoyer avec un identifiant expediteur personalise et la translitteration activee :

```bash
apprise -vv -b "Bonjour le monde" \
   "smsc://monlogin:monmotdepasse@+71234567890?sender=MonBiz&translit=yes"
```

Envoyer en MMS en joignant un fichier (detection automatique) :

```bash
apprise -vv -b "Voir l'image ci-jointe" \
   --attach /chemin/vers/image.png \
   "smsc://monlogin:monmotdepasse@+71234567890"
```
