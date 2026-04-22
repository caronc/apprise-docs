---
title: "Notifications Pushbullet"
description: "Envoyer des notifications Pushbullet."
sidebar:
  label: "Pushbullet"

source: https://www.pushbullet.com

schemas:
  - pbul

has_attachments: true

sample_urls:
  - pbul://{accesstoken}
  - pbul://{accesstoken}/{device_id}
  - pbul://{accesstoken}/#{channel}
  - pbul://{accesstoken}/{email}
---

<!-- SERVICE:DETAILS -->

## Configuration du Compte

Les comptes Pushbullet sont gratuits ; l'extension Pro est facultative et vous donne une limite de message plus elevee ainsi que quelques fonctionnalites supplementaires. Une fois inscrit sur <https://www.pushbullet.com/>, vous pouvez generer votre cle API en accedant a vos [parametres de compte](https://www.pushbullet.com/#settings) puis en cliquant sur **Create Access Token**.

## Syntaxe

La syntaxe valide est la suivante :

- `pbul://{accesstoken}`
- `pbul://{accesstoken}/{device_id}`
- `pbul://{accesstoken}/#{channel}`
- `pbul://{accesstoken}/{email}`

Vous pouvez egalement combiner les formes ci-dessus et effectuer les mises a jour depuis une seule URL :

- `pbul://{accesstoken}/{device_id}/#{channel}/{email}`

Si aucun **{device_id}**, **#{channel}** ou **{email}** n'est precise, alors la configuration par defaut enverra la notification a tous vos appareils configures.

## Détail des Paramètres

| Variable    | Obligatoire | Description                                                                                                                                                                                   |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accesstoken | Oui         | Le jeton d'acces peut etre genere depuis la page **Settings** de votre compte Pushbullet. Vous devez disposer d'un jeton d'acces pour que ce service de notification fonctionne.              |
| device_id   | Non         | Les appareils associes a votre compte Pushbullet peuvent etre trouves dans les parametres de votre compte.                                                                                    |
| channel     | Non         | Les canaux doivent etre prefixes par un croisillon `#`, sinon ils seront interpretes comme un `device_id`. Les canaux doivent etre enregistres dans votre compte Pushbullet pour fonctionner. |
| email       | Non         | Les e-mails ne fonctionnent que si vous les avez enregistres dans votre compte Pushbullet.                                                                                                    |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Pushbullet a tous les appareils :

```bash
# Supposons que notre {accesstoken} soit abcdefghijklmno
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pbul://abcdefghijklmno
```
