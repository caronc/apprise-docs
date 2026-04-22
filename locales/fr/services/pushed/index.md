---
title: "Notifications Pushed"
description: "Envoyer des notifications Pushed."
sidebar:
  label: "Pushed"

source: https://pushed.co/

schemas:
  - pushed

has_sms: true

sample_urls:
  - pushed://{app_key}/{app_secret}
  - pushed://{app_key}/{app_secret}/@{user_pushed_id}
  - pushed://{app_key}/{app_secret}/#{channel_alias}

limits:
  max_chars: 160
---

<!-- SERVICE:DETAILS -->

## Configuration du compte

Lors de votre premiere connexion au site, vous devrez demander l'option _Request Developer Access_. Pensez a verifier votre e-mail, car vous devrez valider votre compte.

Une fois cela fait, vous aurez acces a la section [apps](https://account.pushed.co/apps), ou vous pourrez creer une nouvelle application si vous n'en avez pas encore.

Vous aurez alors acces aux informations suivantes :

- Application Key: **{app_key}**
- Application Secret: **{app_secret}**

Vous devrez aussi disposer d'une cible a notifier. Une fois votre compte et votre application crees, telechargez egalement leur application mobile, sur [Android](https://play.google.com/store/apps/details?id=co.pushed.GetPushed) ou [iOS](https://itunes.apple.com/us/app/get-pushed/id804777699?mt=8&uo=6&at=&ct=), puis connectez-vous.

Abonnez-vous a cette application ; un _Subscription Link_ est disponible directement dans la page de parametres de l'application que vous venez de creer. Vous aurez besoin d'au moins un abonnement pour utiliser ce service de notification.

## Syntaxe

La syntaxe valide est la suivante :

- `pushed://{app_key}/{app_secret}`
- `pushed://{app_key}/{app_secret}/@{user_pushed_id}`
- `pushed://{app_key}/{app_secret}/@{user_pushed_id1}/@{user_pushed_id2}/@{user_pushed_idN}`
- `pushed://{app_key}/{app_secret}/#{channel_alias}`
- `pushed://{app_key}/{app_secret}/#{channel_alias1}/#{channel_alias2}/#{channel_aliasN}`

Vous pouvez egalement combiner les formes ci-dessus et effectuer les mises a jour depuis une seule URL :

- `pushed://{app_key}/{app_secret}/@{user_pushed_id}/#{channel_alias}/`

Si ni **@{user_pushed_id}** ni **#{channel}** ne sont precises, la configuration par defaut consiste a envoyer simplement vers l'_App_ pour laquelle vous avez fourni les cles.

## Détail des Paramètres

| Variable       | Obligatoire | Description                                                                                                                                                                                                                                                                                                                 |
| -------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_key        | Oui         | Application Key generee depuis la page de parametres de votre compte Pushed. Vous devez disposer d'une application key pour utiliser ce service de notification.                                                                                                                                                            |
| app_secret     | Oui         | Application Secret generee depuis la page de parametres de votre compte Pushed. Vous devez disposer d'une application secret pour utiliser ce service de notification.                                                                                                                                                      |
| user_pushed_id | Non         | Les utilisateurs doivent etre prefixes par un caractere arobase, `@`, sinon ils seront ignores. Vous pouvez ici identifier les utilisateurs par leur Pushed ID.                                                                                                                                                             |
| channel_alias  | Non         | Les canaux doivent etre prefixes par un hashtag, `#`, sinon ils seront ignores. Les canaux doivent aussi etre enregistres dans votre compte Pushed pour fonctionner. Il doit s'agir de l'alias du canal lui-meme, et non du canal. Cet alias peut etre recupere depuis les parametres du canal dans votre compte pushed.io. |

<!-- TEMPLATE:SERVICE-PARAMS -->

## Exemples

Envoyer une notification Pushed :

```bash
# Supposons que notre {app_key} soit sopJo0dVKVC9YK1F5wDQ
# Supposons que notre {app_secret} soit KWEtXxVm1PtDTTrKaEM49DhBd8MJvSMCHSvunPerbCf1MaNLO300roqOL0F8HErAl
apprise -vv -t "Test Message Title" -b "Test Message Body" \
   pushed://sopJo0dVKVC9YK1F5wDQ/KWEtXxVm1PtDTTrKaEM49DhBd8MJvSMCHSvunPerbCf1MaNLO300roqOL0F8HErAl
```
